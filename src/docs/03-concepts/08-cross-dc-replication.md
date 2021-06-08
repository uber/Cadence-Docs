---
layout: default
title: Cross DC replication
permalink: /docs/concepts/cross-dc-replication
---

# Cross-DC replication
The Cadence Global :domain:Domain: feature provides clients with the capability to continue their :workflow_execution: from another
cluster in the event of a datacenter failover. Although you can configure a Global :domain:Domain: to be replicated to any number of
clusters, it is only considered active in a single cluster.

## Global Domains Architecture
Cadence has introduced a new top level entity, Global :domain:Domains:, which provides support for replication of :workflow:
execution across clusters. Client applications need to run :worker:workers: polling on :activity:Activity:/:decision_task:Decision_tasks: on all clusters.
Cadence will only dispatch tasks on the current active cluster; :worker:workers: on the standby cluster will sit idle
until the Global :domain:Domain: is failed over.

Because Cadence is a service that provides highly consistent semantics, we only allow external :event:events: like
**StartWorkflowExecution**, **SignalWorkflowExecution**, etc. on an active cluster. Global :domain:Domains: relies on light-weight
transactions (paxos) on the local cluster (Local_Quorum) to update the :workflow_execution: state and create replication
:task:tasks: which are applied asynchronously to replicate state across clusters. If an application makes these API calls on a
cluster where Global :domain:Domain: is in standby mode, Cadence will reject those calls with **DomainNotActiveError**, which
contains the name of the current active cluster. It is the responsibility of the application to forward the external
:event: to the cluster that is currently active.

## New config for Global Domains

### IsGlobal
This config is used to distinguish :domain:domains: local to the cluster from the global :domain:. It controls the creation of
replication :task:tasks: on updates allowing the state to be replicated across clusters. This is a read-only setting that can
only be set when the :domain: is provisioned.

### Clusters
A list of clusters where the :domain: can fail over to, including the current active cluster.
This is also a read-only setting that can only be set when the :domain: is provisioned. A re-replication feature on the
roadmap will allow updating this config to add/remove clusters in the future.

### Active Cluster Name
Name of the current active cluster for the Global :domain:Domain:. This config is updated each time the Global :domain:Domain: is failed over to
another cluster.

### Failover Version
Unique failover version which also represents the current active cluster for Global :domain:Domain:. Cadence allows failover to
be triggered from any cluster, so failover version is designed in a way to not allow conflicts if failover is mistakenly
triggered simultaneously on two clusters.

## Conflict Resolution
Unlike local :domain:domains: which provide at-most-once semantics for :activity: execution, Global :domain:Domains: can only support at-least-once
semantics. Cadence XDC relies on asynchronous replication of :event:events: across clusters, so in the event of a failover
it is possible that :activity: gets dispatched again on the new active cluster due to a replication :task: lag. This also
means that whenever :workflow_execution: is updated after a failover by the new cluster, any previous replication :task:tasks:
for that execution cannot be applied. This results in loss of some progress made by the :workflow_execution: in the
previous active cluster. During such conflict resolution, Cadence re-injects any external :event:events: like :signal:Signals: to the
new history before discarding replication :task:tasks:. Even though some progress could rollback during failovers, Cadence
provides the guarantee that :workflow:workflows: won’t get stuck and will continue to make forward progress.

## Visibility API
All Visibility APIs are allowed on both active and standby clusters. This enables
[Cadence Web](https://github.com/uber/cadence-web) to work seamlessly for Global :domain:Domains: as all visibility records for
:workflow_execution:workflow_executions: can be queried from any cluster the :domain: is replicated to. Applications making API calls directly
to the Cadence Visibility API will continue to work even if a Global :domain:Domain: is in standby mode. However, they might see
a lag due to replication delay when :query:querying: the :workflow_execution: state from a standby cluster.

## CLI
The Cadence :CLI: can also be used to :query: the :domain: config or perform failovers. Here are some useful commands.

### Query Global Domain
The following command can be used to describe Global :domain:Domain: metadata:

```bash
$ cadence --do cadence-canary-xdc d desc
Name: cadence-canary-xdc
Description: cadence canary cross dc testing domain
OwnerEmail: cadence-dev@cadenceworkflow.io
DomainData:
Status: REGISTERED
RetentionInDays: 7
EmitMetrics: true
ActiveClusterName: dc1
Clusters: dc1, dc2
```

### Failover Global Domain
The following command can be used to failover Global :domain:Domain: *my-domain-global* to the *dc2* cluster:

```bash
$ cadence --do my-domain-global d up --ac dc2
```

## Running Locally

The best way is to use Cadence [docker-compose](https://github.com/uber/cadence/tree/master/docker):
`docker-compose -f docker-compose-multiclusters.yml up`


## Running in Production

Enable global domain feature needs to be enabled in [static config](/docs/operation-guide/setup/#static-configs).  

Here we use clusterDCA and clusterDCB as an example. We pick clusterDCA as the primary(used to called "master") cluster.
The only difference of being a primary cluster is that it is responsible for domain registration. Primary can be changed later but it needs to be the same across all clusters.

The ClusterMeta config of clusterDCA should be

```yaml
clusterMetadata:
  enableGlobalDomain: true
  failoverVersionIncrement: 10
  masterClusterName: "clusterDCA"
  currentClusterName: "clusterDCA"
  clusterInformation:
    clusterDCA:
      enabled: true
      initialFailoverVersion: 1
      rpcName: "cadence-frontend"
      rpcAddress: "<>:<>"
    clusterDCB:
      enabled: true
      initialFailoverVersion: 0
      rpcName: "cadence-frontend"
      rpcAddress: "<>:<>"
```

And ClusterMeta config of clusterDCB should be

```yaml
clusterMetadata:
  enableGlobalDomain: true
  failoverVersionIncrement: 10
  masterClusterName: "clusterDCA"
  currentClusterName: "clusterDCB"
  clusterInformation:
    clusterDCA:
      enabled: true
      initialFailoverVersion: 1
      rpcName: "cadence-frontend"
      rpcAddress: "<>:<>"
    clusterDCB:
      enabled: true
      initialFailoverVersion: 0

      rpcName: "cadence-frontend"
      rpcAddress: "<>:<>"
```

After the configuration is deployed:

1. Register a global domain
`cadence --do <domain_name> domain register --global_domain true  --clusters clusterDCA clusterDCB --active_cluster clusterDCA`


2. Run some workflow and failover domain from one to another
`cadence --do <domain_name> domain update  --active_cluster clusterDCB`

Then the domain should be failed over to clusterDCB. Now worklfows are read-only in clusterDCA. So your workers polling tasks from clusterDCA will become idle.  

Note 1: that even though clusterDCA is standy/read-only for this domain, it can be active for another domain. So being active/standy is per domain basis not per clusters. In other words, for example if you use XDC in case of DC failure of clusterDCA, you need to failover all domains from clusterDCA to clusterDCB.


Note 2: even though a domain is standy/read-only in a cluster, say clusterDCA, sending write requests(startWF, signalWF, etc) could still work because there is a forwarding component in the Frontend service. It will try to re-route the requests to an active cluster for the domain.


## FAQ

### What happens to outstanding activities after failover?
Cadence does not forward :activity: completions across clusters. Any outstanding :activity: will eventually timeout based
on the configuration. Your application should have retry logic in place so that the :activity: gets retried and dispatched
again to a :worker: after the failover to the new DC. Handling this is pretty much the same as :activity: timeout caused by
a :worker: restart even without Global :domain:Domains:.

### What happens when a start or signal API call is made to a standby cluster?
Cadence will to forward the API calls to active cluster if possible(some APIs are not forwardable, for example PollForDecisionTask).
General APIs like StartWorkflow/SignalWorkflow can be forwarded.
