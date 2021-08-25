---
layout: default
title: Cluster Maintenance
permalink: /docs/operation-guide/maintain
---

# Cluster Maintenance
This includes how to use and maintain a Cadence cluster for both clients and server clusters.

## Scale up & down Cluster
* When CPU/Memory is getting bottleneck on Cadence instances, you may scale up or add more instances.
* Watch [Cadence metrics](/docs/operation-guide/monitor/)
  * See if the external traffic to frontend is normal
  * If the slowness is due to too many tasks on a tasklist, you may need to [scale up the tasklist](/docs/operation-guide/maintain/#scale-up-a-tasklist-using-scalable-tasklist-feature)
  * If persistence latency is getting too high, try scale up your DB instance
* Never change the [`numOfShards` of a cluster](/docs/operation-guide/setup/#static-configuration). If you need that because the current one is too small, follow the instructions to [migrate your cluster to a new one](/docs/operation-guide/maintain/#migrate-cadence-cluster).  

## Scale up a tasklist using `Scalable tasklist` feature
By default a tasklist is not scalable enough to support hundreds of tasks per second. That’s mainly because each tasklist is assigned to a Matching service node, and dispatching tasks in a tasklist is in sequence.

In the past, Cadence recommended using multiple tasklists to start workflow/activity. You need to make a list of tasklists and randomly pick one when starting workflows. And then when starting workers, let them listen to all the tasklists.

Nowadays, Cadence has a feature called “Scalable tasklist”. It will divide a tasklist into multiple logical partitions, which can distribute tasks to multiple Matching service nodes. By default this feature is not enabled because there is some performance penalty on the server side, plus it’s not common that a tasklist needs to support more than hundreds tasks per second.

You must make a dynamic configuration change in Cadence server to use this feature:

**matching.numTasklistWritePartitions**

and

**matching.numTasklistReadPartitions**

matching.numTasklistWritePartitions is the number of partitions when a Cadence server sends a task to the tasklist.
matching.numTasklistReadPartitions is the number of partitions when your worker accepts a task from the tasklist.

There are a few things to know when using this feature:
* Always make sure `matching.numTasklistWritePartitions <= matching.numTasklistReadPartitions` . Otherwise there may be some tasks that are sent to a tasklist partition but no poller(worker) will be able to pick up.
* Because of above, when scaling down the number of partitions, you must decrease the WritePartitions first, to wait for a certain time to ensure that tasks are drained, and then decrease ReadPartitions.
* Both domain names and taskListName should be specified in the dynamic config. An example of using this feature. See more details about dynamic config format using file based [dynamic config](/docs/operation-guide/setup/#static-configs).

```
matching.numTasklistWritePartitions:
  - value: 10
    constraints:
      domainName: "samples-domain"
      taskListName: "aScalableTasklistName"
matching.numTasklistReadPartitions:
  - value: 10
    constraints:
      domainName: "samples-domain"
      taskListName: "aScalableTasklistName"
```

NOTE: the value must be integer without double quotes.

## Restarting Cluster
Make sure rolling restart to keep high availability.

## Optimize SQL Persistence
* Connection is shared within a Cadence server host
* For each host, The max number of connections it will consume is maxConn of defaultStore + maxConn of visibilityStore.
* The total max number of connections your Cadence cluster will consume is the summary from all hosts(from Frontend/Matching/History/SysWorker services)
* Frontend and history nodes need both default and visibility Stores, but matching and sys workers only need default Stores, they don't need to talk to visibility DBs.
* For default Stores, history service will take the most connection, then Frontend/Matching. SysWorker will use much less than others
* Default Stores is for Cadence’ core data model, which requires strong consistency. So it cannot use replicas.  VisibilityStore is not for core data models. It’s recommended to use a separate DB for visibility store if using DB based visibility.
* Visibility Stores usually take much less connection as the workload is much lightweight(less QPS and no explicit transactions).
* Visibility Stores require eventual consistency for read. So it can use replicas.
* MaxIdelConns should be less than MaxConns, so that the connections can be distributed better across hosts.


## Upgrading Server  
Things need to keep in mind before upgrading a cluster:
* Database schema changes need to apply first.
* Usually schema change is backward compatible. So rolling back usually is not a problem. It also means that Cadence allows running a mixed version of schema, as long as they are all greater than or equal to the required version of the server.
Other requirements for upgrading should be found in the release notes. It may contain information about config changes, or special rollback instructions if normal rollback may cause problems.
* It's recommended to upgrade one minor version at a time. E.g, if you are at 0.10, you should upgrade to 0.11, stabilize it with running some normal workload to make sure that the upgraded server is happy with the schema changes. After ~1 hour, then upgrade to 0.12. then 0.13. etc.
* The reason above is that for each minor upgrade, you should be able to follow the release notes about what you should do for upgrading. The release notes may require you to run some commands. This will also help to narrow down the cause when something goes wrong.
* Do not use “auto-setup” images to upgrade your schema. It's mainly for development. At most for initial setup only.
* Please subscribe the release of project by : Go to https://github.com/uber/cadence -> Click the right top "Watch" button -> Custom -> "Release". 


For how to upgrade database schema, refer to this doc: [SQL tool README](https://github.com/uber/cadence/tree/master/tools/sql)
[Cassandra tool README](https://github.com/uber/cadence/tree/master/tools/cassandra)

The tool makes use of a table called “schema_versions” to keep track of upgrading History. But there is no transaction guarantee for cross table operations. So in case of some error, you may need to fix or apply schema change manually.
Also, the schema tool by default will upgrade schema to the latest, so no manual is required. ( you can also specify to let it upgrade to any place, like 0.14).

Database schema changes are versioned in the folders: [Versioned Schema Changes](https://github.com/uber/cadence/tree/master/schema/mysql/v57/cadence/versioned) for Default Store
and [Versioned Schema Changes](https://github.com/uber/cadence/tree/master/schema/mysql/v57/visibility/versioned) for Visibility Store if you use database for basic visibility instead of ElasticSearch.

If you use homebrew, the schema files are located at `/usr/local/etc/cadence/schema/`. 

Alternatively, you can checkout the [repo](https://github.com/uber/cadence) and the release tag. E.g. `git checkout v0.21.0` and then the schema files is at `./schema/` 

## Migrate Cadence cluster
Migrating a Cadence cluster is rare, but could happen.
There could be some reasons like:
* Migrate to different storage, for example from Postgres/MySQL to Cassandra
* Split traffic
* Datacenter migration 
* Scale up -- move to a bigger cluster, with larger number of shards.

Below is two different approaches for migrating a cluster.

### Migrate in a naive approach 
NOTE: This is the only way to migrate a local domain, because a local domain cannot be converted to a global domain, even after a cluster enables XDC feature. 

1. Set up a new Cadence cluster
2. Connect client workers to both old and new clusters
3. Change workflow code to start new workflows only in the new cluster 
4. Wait for all old workflows to finish in the old cluster
5. Shutdown the old Cadence cluster and stop the client workers from connecting to it. 

### Migrate with XDC feature
NOTE: For now XDC feature requires to [use the same numOfShards between different clusters](https://github.com/uber/cadence/issues/4179) until this [PR](https://github.com/uber/cadence/pull/4239) is released to fix the bug. 

The below steps require to enable the [cross dc replication feature](/docs/concepts/cross-dc-replication/#running-in-production):

0. Assuming at the beginning, you have only one cluster.

1. Create your domain with the global domain feature(XDC). Since you only have one cluster, there is no replication happening. But you still need to tell the replication topology when creating your domain.

`cadence --do <domain_name> domain register --global_domain true  --clusters <initialClustersName> --active_cluster <initialClusterName>`

2. Later on, after you setting up a new cluster, you can add the cluster to domain replication config

`cadence --do <domain_name> domain update  --clusters <initialClusterName> <newClusterName>`

It will start replication right after for all the active workflows.

3. After you are sure the new cluster is healthy, you then switch the active cluster to the new cluster.

`cadence --do <domain_name> domain update  --active_cluster <newClusterName>`

4. After some time, you make sure the new cluster is running fine, then remove the old cluster from replication:

`cadence --do <domain_name> domain update  --clusters <newClusterName>`

NOTE: It’s better to enable the XDC feature from the beginning for all domains. Because a local domain cannot be converted to a global one.

If your current domain is NOT a global domain, you cannot use the XDC feature to migrate. The only way is to migrate in a [naive approach](/docs/operation-guide/maintain/#migrate-cadence-cluster)

## Stress/Bench Test a cluster

It's recommended to run bench test on your cluster following this [package](https://github.com/uber/cadence/tree/master/bench) to see the maximum throughput that it can take, whenever you change some setup.
