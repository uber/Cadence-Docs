---
layout: default
title: Cluster Configuration
permalink: /docs/operation-guide/setup
---

# Cluster Configuration

This section will help to understand what you need for setting up a Cadence cluster.

You need to understand some key config options in Cadence server. There are two main types of configs in Cadence server, static config and dynamic config.

Also, you need understand Cadence’s dependency --- a database(Cassandra or SQL based like MySQL/Postgres) and a metric server(typically Prometheus). Cadence also needs ElastiCache+Kafka if you need [Advanced visibility feature to search workflows](/docs/concepts/search-workflows/). And Cadence also depends on a blob store like S3 if you need to enable [archival feature](/docs/concepts/archival/).

## Static configs

### Understand the basic static configuration

There are quite many configs in Cadence. Here are the most basic configuration that you should understand.

|Config name|Explanation|Recommended value|
| --------- | --------- | ----------------- |
| numHistoryShards | This is the most important one in Cadence config.It will be a fixed number in the cluster forever. The only way to change it is to migrate to another cluster. Refer to Migrate cluster section. <br/>   <br/> Some facts about it: <br/> 1. Each workflow will be mapped to a single shard. Within a shard, all the workflow creation/updates are serialized.  <br/> 2. Each shard will be assigned to only one History node to own the shard, using a Consistent Hashing Ring. Each shard will consume a small amount of memory/CPU to do background processing. Therefore, a single History node cannot own too many shards. You may need to figure out a good number range based on your instance size(memory/CPU).  <br/> 3. Also, you can’t add an infinite number of nodes to a cluster because this config is fixed. When the number of History nodes is closed or equal to numHistoryShards, there will be some History nodes that have no shards assigned to it. This will be wasting resources.   <br/> <br/> Based on above, you don’t want to have a small number of shards which will limit the maximum size of your cluster. You also don’t want to have a too big number, which will require you to have a quite big initial size of the cluster.  <br/>  Also, typically a production cluster will start with a smaller number and then we add more nodes/hosts to it. But to keep high availability, it’s recommended to use at least 4 nodes for each service(Frontend/History/Matching) at the beginning.  | 1K~16K depending on the size ranges of the cluster you expect to run, and the instance size. |
| ringpop | This is the config to let all nodes of all services connected to each other. ALL the bootstrap nodes MUST be reachable by ringpop when a service is starting up, within a MaxJoinDuration. defaultMaxJoinDuration is 2 minutes. <br/><br/> It’s not required that bootstrap nodes need to be Frontend/History or Matching. In fact, it can be running none of them as long as it runs Ringpop protocol.  | For dns mode: Recommended to put the DNS of Frontend service <br/><br/> For hosts or hostfile mode: A list of Frontend service node addresses if using hosts mode. Make sure all the bootstrap nodes are reachable at startup. |
| publicClient | The Cadence Frontend service addresses that internal Cadence system(like system workflows) need to talk to. <br/><br/> After connected, all nodes in Ringpop will form a ring with identifiers of what service they serve. Ideally Cadence should be able to get Frontend address from there. But Ringpop doesn’t expose this API yet. | Recommended be DNS of Frontend service, so that requests will be distributed to all Frontend nodes.  <br/><br/>Using localhost+Port or local container IP address+Port will not work if the IP/container is not running frontend |
| services.NAME.rpc | Configuration of how to listen to network ports and serve traffic. <br/><br/> bindOnLocalHost:true will bind on 127.0.0.1. It’s mostly for local development. In production usually you have to specify the IP that containers will use by using bindOnIP <br/><br/> NAME is the matter for the “--services” option in the server startup command.| Name: Use as recommended in development.yaml. bindOnIP : an IP address that the container will serve the traffic with |
| services.NAME.pprof | Golang profiling service , will bind on the same IP as RPC | a port that you want to serve pprof request |
| services.Name.metrics | See Metrics&Logging section | cc |
| clusterMetadata | Cadence cluster configuration. <br/><br/>enableGlobalDomain：true will enable Cadence Cross datacenter replication(aka XDC) feature.<br/><br/>failoverVersionIncrement: This decides the maximum clusters that you will have replicated to each other at the same time. For example 10 is sufficient for most cases.<br/><br/>masterClusterName: a master cluster must be one of the enabled clusters, usually the very first cluster to start. It is only meaningful for internal purposes.<br/><br/>currentClusterName: current cluster name using this config file. <br/><br/>clusterInformation is a map from clusterName to the cluster configure <br/><br/>initialFailoverVersion: each cluster must use a different value from 0 to failoverVersionIncrement-1. <br/><br/>rpcName: must be “cadence-frontend”. Can be improved in this issue. <br/><br/>rpcAddress: the address to talk to the Frontend of the cluster for inter-cluster replication. <br/><br/>Note that even if you don’t need XDC replication right now, if you want to migrate data stores in the future, you should enable xdc from every beginning. You just need to use the same name of cluster for both masterClusterName and  currentClusterName. <br/><br/> Go to [cross dc replication](/docs/concepts/cross-dc-replication/#running-in-production) for how to configure replication in production | As explanation. |
| dcRedirectionPolicy | For allowing forwarding frontend requests from passive cluster to active clusters.  | “selected-apis-forwarding” |
| archival | This is for archival history feature, skip if you don’t need it. Go to [workflow archival](/docs/concepts/archival/#running-in-production) for how to configure archival in production | N/A |
| blobstore | This is also for archival history feature Default cadence server is using file based blob store implementation.  | N/A |
| domainDefaults | default config for each domain. Right now only being used for Archival feature.  | N/A |
| dynamicConfigClient | Dynamic config is a config manager that you can change config without restarting servers. It’s a good way for Cadence to keep high availability and make things easy to configure. <br/><br/>Default cadence server is using FileBasedClientConfig. But you can implement the dynamic config interface if you have a better way to manage.| Same as the sample development config |
| persistence | Configuration for data store / persistence layer. <br/><br/>Values of DefaultStore VisibilityStore AdvancedVisibilityStore should be keys of map DataStores. <br/><br/>DefaultStore is for core Cadence functionality. <br/><br/>VisibilityStore is for basic visibility feature <br/><br/>AdvancedVisibilityStore is for advanced visibility<br/><br/> Go to [advanced visibility](/docs/concepts/search-workflows/#running-in-production) for detailed configuration of advanced visibility. See [persistence documentation](https://github.com/uber/cadence/blob/master/docs/persistence.md) about using different database for Cadence| As explanation |

### The full list of static configuration

Starting from v0.21.0, all the static configuration are defined by GoDocs in details.
|Version|GoDocs Link|
| --------- | --------- |
| v0.21.0 | [Configuration Docs](https://pkg.go.dev/github.com/uber/cadence@v0.21.0/common/config#Config) |
| ... | ...Just replace the version in the URL |


For earlier versions, you can find all the configurations similarly:
|Version|GoDocs Link|
| --------- | --------- |
| v0.21.0 | [Configuration Docs](https://pkg.go.dev/github.com/uber/cadence@v0.20.0/common/service/config#Config) |
| v0.21.0 | [Configuration Docs](https://pkg.go.dev/github.com/uber/cadence@v0.19.0/common/service/config#Config) |
| v0.21.0 | [Configuration Docs](https://pkg.go.dev/github.com/uber/cadence@v0.18.0/common/service/config#Config) |
| v0.21.0 | [Configuration Docs](https://pkg.go.dev/github.com/uber/cadence@v0.17.0/common/service/config#Config) |
| ... | ...Just replace the version in the URL |

## Dynamic Configuration Overview

Dynamic configuration is for fine tuning a Cadence cluster.

There are a lot more dynamic configurations than static configurations. Most of the default values are good for small clusters. As a cluster is scaled up, you may look for tuning it for the optimal performance.

Starting from v0.21.0, all the dynamic configuration are well defined by GoDocs.
|Version|GoDocs Link|
| --------- | --------- |
| v0.21.0 | [Dynamic Configuration Docs](https://pkg.go.dev/github.com/uber/cadence@v0.21.0/common/dynamicconfig#Key) |
| ... | ...Just replace the version in the URL |

For earlier versions, you can find all the configurations similarly:
|Version|GoDocs Link|
| --------- | --------- |
| v0.20.0 | [Dynamic Configuration Docs](https://pkg.go.dev/github.com/uber/cadence@v0.20.0/common/service/dynamicconfig#Key) |
| v0.19.0 | [Dynamic Configuration Docs](https://pkg.go.dev/github.com/uber/cadence@v0.19.0/common/service/dynamicconfig#Key) |
| v0.18.0 | [Dynamic Configuration Docs](https://pkg.go.dev/github.com/uber/cadence@v0.18.0/common/service/dynamicconfig#Key) |
| v0.17.0 | [Dynamic Configuration Docs](https://pkg.go.dev/github.com/uber/cadence@v0.17.0/common/service/dynamicconfig#Key) |
| ... | ...Just replace the version in the URL |

However, the GoDocs in earlier versions don't contain detailed information. You need to look it up the newer version of GoDocs.  
For example, search for "EnableGlobalDomain" in [Dynamic Configuration Docs of v0.21.0](https://pkg.go.dev/github.com/uber/cadence@v0.21.0/common/dynamicconfig#Key), as the usage of DynamicConfiguration never changes.

NOTE 1: the size related configuration numbers are based on byte.

NOTE 2: for <frontend,history,matching>.persistenceMaxQPS versus <frontend,history,matching>.persistenceGlobalMaxQPS ---  persistenceMaxQPS is local for single node while persistenceGlobalMaxQPS is global for all node. persistenceGlobalMaxQPS is preferred if set as greater than zero. But by default it is zero so persistenceMaxQPS is being used.  

### How to update Dynamic Configuration
As an example of using Helm Chart to deploy Cadence, you can update dynamic config from [here](https://github.com/banzaicloud/banzai-charts/blob/be57e81c107fd2ccdfc6cf95dccf6cbab226920c/cadence/templates/server-configmap.yaml#L170)

## Configure Other Advanced Features of Cadence cluster
* Go to [advanced visibility](/docs/concepts/search-workflows/#running-in-production) for how to configure advanced visibility in production.

* Go to [workflow archival](/docs/concepts/archival/#running-in-production) for how to configure archival in production.

* Go to [cross dc replication](/docs/concepts/cross-dc-replication/#running-in-production) for how to configure replication in production.
