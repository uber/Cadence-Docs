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

## Migrate with naive approach
NOTE: This is the only way to migrate a local domain, because a local domain cannot be converted to a global domain, even after a cluster enables XDC feature.

1. Set up a new Cadence cluster
2. Connect client workers to both old and new clusters
3. Change workflow code to start new workflows only in the new cluster
4. Wait for all old workflows to finish in the old cluster
5. Shutdown the old Cadence cluster and stop the client workers from connecting to it.

NOTE : Starting from [version 0.22.0](https://github.com/uber/cadence/releases/tag/v0.22.0), global domain is preferred/recommended. Please ensure you create and use global domains only.
If you are using local domains, an easy way is to create a global domain and migrate to the new global domain using the above steps.

## Migrate with [Global Domain Replication](/docs/concepts/cross-dc-replication/#running-in-production) feature
NOTE 1: If a domain are NOT a global domain, you cannot use the XDC feature to migrate. The only way is to migrate in a [naive approach](/docs/operation-guide/maintain/#migrate-cadence-cluster)

NOTE 2: Starting from [version 0.22.0](https://github.com/uber/cadence/releases/tag/v0.22.0) (by [PR](https://github.com/uber/cadence/pull/4239)), Cadence allows migrating to a cluster with higher value of numHistoryShards. Prior to the version, only migrating to the same numHistoryShards is allowed.

### Step 0 - Verify clusters' setup is correct

* Make sure the new cluster doesn’t already have the domain names that needs to be migrated (otherwise domain replication would fail).

To get all the domains from current cluster:
```
cadence --address <currentClusterAddress> admin domain list
```

Then
For each global domain.
```
cadence --address <newClusterAddress> --do <domain_name> domain describe
```
to make sure it doesn't exist in the new cluster.

* Target replication cluster should have numHistoryShards >= source cluster

* Target cluster should have the same search attributes enabled in dynamic configuration and in ElasticSearch.

  * Check the dynamic configuration to see if they have the same list of `frontend.validSearchAttributes`. If any is missing in the new cluster, update the dynamic config for the new cluster.

  * Check results of the below command to make sure that the ES fields matched with the dynamic configuration
```
curl -u <UNAME>:<PW> -X GET https://<ES_HOST_OF_NEW_CLUSTER>/cadence-visibility-index  -H 'Content-Type: application/json'| jq .
```
If any search attribute is missing, add the missing search attributes to target cluster.
```
cadence --address <newClusterAddress> adm cluster add-search-attr --search_attr_key <> --search_attr_type <>
```

### Step 1 - Connect the two clusters using global domain(replication) feature
Include the Cluster Information for both the old and new clusters in the ClusterMetadata config of both clusters.
Example config for currentCluster
```
      masterClusterName: "<newClusterName>"
      currentClusterName: "<currentClusterName>"
      clusterInformation:
        <currentClusterName>:
          enabled: true
          initialFailoverVersion: 1
          rpcName: "cadence-frontend"
          rpcAddress: "<currentClusterAddress>"
        <newClusterName>:
          enabled: true
          initialFailoverVersion: 0
          rpcName: "cadence-frontend"
          rpcAddress: "<newClusterAddress>"
```          
for newClusterName:
```
      masterClusterName: "<newClusterName>"
      currentClusterName: "<newClusterName>"
      clusterInformation:
        <currentClusterName>:
          enabled: true
          initialFailoverVersion: 1
          rpcName: "cadence-frontend"
          rpcAddress: "<currentClusterAddress>"
        <newClusterName>:
          enabled: true
          initialFailoverVersion: 0
          rpcName: "cadence-frontend"
          rpcAddress: "<newClusterAddress>"
```   

Deploy the config.
