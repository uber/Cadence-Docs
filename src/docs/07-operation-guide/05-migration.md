---
layout: default
title: Cluster Migration
permalink: /docs/operation-guide/migration
---
# Migrate Cadence cluster.
There could be some reasons that you need to migrate Cadence clusters:
* Migrate to different storage, for example from Postgres/MySQL to Cassandra, or using multiple SQL database as a sharded SQL cluster for Cadence
* Split traffic
* Datacenter migration
* Scale up -- to change numOfHistoryShards.

Below is two different approaches for migrating a cluster.

## Migrate in a naive approach
NOTE: This is the only way to migrate a local domain, because a local domain cannot be converted to a global domain, even after a cluster enables XDC feature.

1. Set up a new Cadence cluster
2. Connect client workers to both old and new clusters
3. Change workflow code to start new workflows only in the new cluster
4. Wait for all old workflows to finish in the old cluster
5. Shutdown the old Cadence cluster and stop the client workers from connecting to it.

## Migrate with [Global Domain Replication](/docs/concepts/cross-dc-replication/) feature
NOTE: If your current domain is NOT a global domain, you cannot use the XDC feature to migrate. The only way is to migrate in a [naive approach](/docs/operation-guide/maintain/#migrate-cadence-cluster)

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
