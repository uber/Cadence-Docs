---
layout: default
title: Cluster Maintenance
permalink: /docs/operation-guide/maintain
---

# Cluster Maintenance
This includes how to use and maintain a Cadence cluster for both clients and server clusters.

## Client worker overview
Java and Go clients should have almost the same guidance for setup, except that the Java client has a few more configurations about threading. That’s because Java language doesn’t have native support for lightweight threading like Golang goroutines.

## Scalable tasklist
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

## Restarting Server
You may want to do rolling restart to keep high availability.

## Upgrading Server  
Things need to keep in mind before upgrading a cluster:
* Database schema changes need to apply first.
* Usually schema change is backward compatible. So rolling back usually is not a problem. It also means that Cadence allows running a mixed version of schema, as long as they are all greater than or equal to the required version of the server.
Other requirements for upgrading should be found in the release notes. It may contain information about config changes, or special rollback instructions if normal rollback may cause problems.
* It's recommended to upgrade one minor version at a time. E.g, if you are at 0.10, you should upgrade to 0.11, stabilize it with running some normal workload to make sure that the upgraded server is happy with the schema changes. After ~1 hour, then upgrade to 0.12. then 0.13. etc.
* The reason above is that for each minor upgrade, you should be able to follow the release notes about what you should do for upgrading. The release notes may require you to run some commands. This will also help to narrow down the cause when something goes wrong.
* Do not use “auto-setup” images to upgrade your schema. It's mainly for development. At most for initial setup only.


For how to upgrade database schema, refer to this doc: [SQL tool README](https://github.com/uber/cadence/tree/master/tools/sql)
[Cassandra tool README](https://github.com/uber/cadence/tree/master/tools/cassandra)

The tool makes use of a table called “schema_versions” to keep track of upgrading History. But there is no transaction guarantee for cross table operations. So in case of some error, you may need to fix or apply schema change manually.
Also, the schema tool by default will upgrade schema to the latest, so no manual is required. ( you can also specify to let it upgrade to any place, like 0.14).

Database schema changes are versioned in the folders: [Versioned Schema Changes](https://github.com/uber/cadence/tree/master/schema/mysql/v57/cadence/versioned) for Default Store
and [Versioned Schema Changes](https://github.com/uber/cadence/tree/master/schema/mysql/v57/visibility/versioned) for Visibility Store if you use database for basic visibility instead of ElasticSearch.
