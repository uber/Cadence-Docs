---
layout: default
title: Cluster Setup
permalink: /docs/operation-guide/setup
---

# Cluster Setup

This section will help to understand what you need for setting up a Cadence cluster.

You need to understand some key config options in Cadence server. There are two main types of configs in Cadence server, static config and dynamic config.

Also, you need understand Cadence’s dependency --- a database(Cassandra or SQL based like MySQL/Postgres) and a metric server(typically Prometheus). Cadence also needs ElastiCache+Kafka if you need [Advanced visibility feature to search workflows](/docs/concepts/search-workflows/). And Cadence also depends on a blob store like S3 if you need to enable [archival feature](/docs/concepts/archival/).

## Static configs

There are lots of configs in Cadence. Usually the default values or the recommended values in development.yaml should be good to go. Here are the most basic configuration that you should understand.


|Config name|Explanation|Recommended value|
| --------- | --------- | ----------------- |
| numHistoryShards | This is the most important one in Cadence config.It will be a fixed number in the cluster forever. The only way to change it is to migrate to another cluster. Refer to Migrate cluster section. <br/>   <br/> Some facts about it: <br/> 1. Each workflow will be mapped to a single shard. Within a shard, all the workflow creation/updates are serialized.  <br/> 2. Each shard will be assigned to only one History node to own the shard, using a Consistent Hashing Ring. Each shard will consume a small amount of memory/CPU to do background processing. Therefore, a single History node cannot own too many shards. You may need to figure out a good number range based on your instance size(memory/CPU).  <br/> 3. Also, you can’t add an infinite number of nodes to a cluster because this config is fixed. When the number of History nodes is closed or equal to numHistoryShards, there will be some History nodes that have no shards assigned to it. This will be wasting resources.   <br/> <br/> Based on above, you don’t want to have a small number of shards which will limit the maximum size of your cluster. You also don’t want to have a too big number, which will require you to have a quite big initial size of the cluster.  <br/>  Also, typically a production cluster will start with a smaller number and then we add more nodes/hosts to it. But to keep high availability, it’s recommended to use at least 4 nodes for each service(Frontend/History/Matching) at the beginning.  | 1K~16K depending on the size ranges of the cluster you expect to run, and the instance size. |
| ringpop | This is the config to let all nodes of all services connected to each other. ALL the bootstrap nodes MUST be reachable by ringpop when a service is starting up, within a MaxJoinDuration. defaultMaxJoinDuration is 2 minutes. <br/><br/> It’s not required that bootstrap nodes need to be Frontend/History or Matching. In fact, it can be running none of them as long as it runs Ringpop protocol.  | For dns mode: Recommended to put the DNS of Frontend service <br/><br/> For hosts or hostfile mode: A list of Frontend service node addresses if using hosts mode. Make sure all the bootstrap nodes are reachable at startup. |
| publicClient | The Cadence Frontend service addresses that internal Cadence system(like system workflows) need to talk to. <br/><br/> After connected, all nodes in Ringpop will form a ring with identifiers of what service they serve. Ideally Cadence should be able to get Frontend address from there. But Ringpop doesn’t expose this API yet. | Recommended be DNS of Frontend service, so that requests will be distributed to all Frontend nodes.  <br/><br/>Using localhost+Port or local container IP address+Port will not work if the IP/container is not running frontend |
| services.NAME.rpc | Configuration of how to listen to network ports and serve traffic. <br/><br/> bindOnLocalHost:true will bind on 127.0.0.1. It’s mostly for local development. In production usually you have to specify the IP that containers will use by using bindOnIP <br/><br/> NAME is the matter for the “--services” option in the server startup command.| Name: Use as recommended in development.yaml. bindOnIP : an IP address that the container will serve the traffic with |
| services.NAME.pprof | Golang profiling service , will bind on the same IP as RPC | a port that you want to serve pprof request |
| services.Name.metrics | See Metrics&Logging section | cc |
| clusterMetadata | Cadence cluster configuration. <br/><br/>enableGlobalDomain：true will enable Cadence Cross datacenter replication(aka XDC) feature.<br/><br/>failoverVersionIncrement: This decides the maximum clusters that you will have replicated to each other at the same time. For example 10 is sufficient for most cases.<br/><br/>masterClusterName: a master cluster must be one of the enabled clusters, usually the very first cluster to start. It is only meaningful for internal purposes.<br/><br/>currentClusterName: current cluster name using this config file. <br/><br/>clusterInformation is a map from clusterName to the cluster configure <br/><br/>initialFailoverVersion: each cluster must use a different value from 0 to failoverVersionIncrement-1. <br/><br/>rpcName: must be “cadence-frontend”. Can be improved in this issue. <br/><br/>rpcAddress: the address to talk to the Frontend of the cluster for inter-cluster replication. <br/><br/>Note that even if you don’t need XDC replication right now, if you want to migrate data stores in the future, you should enable xdc from every beginning. You just need to use the same name of cluster for both masterClusterName and  currentClusterName.  See more details in Migration section. | As explanation. |
| dcRedirectionPolicy | For allowing forwarding frontend requests from passive cluster to active clusters.  | “selected-apis-forwarding” |
| archival | This is for archival history feature, skip if you don’t need it. See more in History Archival section | N/A |
| blobstore | This is also for archival history feature Default cadence server is using file based blob store implementation.  | N/A |
| domainDefaults | default config for each domain. Right now only being used for Archival feature.  | N/A |
| dynamicConfigClient | Dynamic config is a config manager that you can change config without restarting servers. It’s a good way for Cadence to keep high availability and make things easy to configure. <br/><br/>Default cadence server is using FileBasedClientConfig. But you can implement the dynamic config interface if you have a better way to manage.| Same as the sample development config |
| persistence | Configuration for data store / persistence layer. <br/><br/>Values of DefaultStore VisibilityStore AdvancedVisibilityStore should be keys of map DataStores. <br/><br/>DefaultStore is for core Cadence functionality. <br/><br/>VisibilityStore is for basic visibility feature <br/><br/>AdvancedVisibilityStore is for advanced visibility<br/><br/> See [persistence documentation](https://github.com/uber/cadence/blob/master/docs/persistence.md) about using different database for Cadence| As explanation |


## Dynamic Configuration Overview

There are more dynamic configurations than static configurations. Dynamic configs can be changed at the run time without restarting any server instances. The format of dynamic configuration is defined [here](https://github.com/uber/cadence/tree/master/config/dynamicconfig).

>NOTE 0: As an example, if using Helm Chart to deploy Cadence, you update dynamic config [here](https://github.com/banzaicloud/banzai-charts/blob/be57e81c107fd2ccdfc6cf95dccf6cbab226920c/cadence/templates/server-configmap.yaml#L170)

>NOTE 1: the size related configuration numbers are based on byte.

>NOTE 2: current default dynamic configuration is implemented as file based configuration. This [feature](https://github.com/uber/cadence/issues/3602) will make it better to use as a real "dynamic" configuration.

>NOTE 3: for <frontend,history,matching>.persistenceMaxQPS versus <frontend,history,matching>.persistenceGlobalMaxQPS ---  persistenceMaxQPS is local for single node while persistenceGlobalMaxQPS is global for all node. persistenceGlobalMaxQPS is preferred if set as greater than zero. But by default it is zero so persistenceMaxQPS is being used.  



## Shared Dynamic Configuration

| Config Key | Explanation | Default Values |
| ---------- | ----------- | -------------- |
| system.enableGlobalDomain | key for enable global domain | based on static config value: clusterMetadata.EnableGlobalDomain|
| system.enableVisibilitySampling | key for enable visibility sampling | TRUE|
| system.enableReadFromClosedExecutionV2 | key for enable read from cadence_visibility.closed_executions_v2 | FALSE|
| system.advancedVisibilityWritingMode | key for how to write to advanced visibility | common.GetDefaultAdvancedVisibilityWritingMode ( isAdvancedVisConfigExist)|
| history.emitShardDiffLog | whether emit the shard diff log | FALSE|
| system.enableReadVisibilityFromES | key for enable read from elastic search | based on static config value: PersistenceConfig.AdvancedVisibilityStore|
| frontend.disableListVisibilityByFilter | config to disable list open/close workflow using filter | FALSE|
| system.historyArchivalStatus | key for the status of history archival | value from static config|
| system.enableReadFromHistoryArchival | key for enabling reading history from archival store | value from static config |
| system.visibilityArchivalStatus | key for the status of visibility archival | value from static config |
| system.enableReadFromVisibilityArchival | key for enabling reading visibility from archival store | value from static config |
| system.enableDomainNotActiveAutoForwarding | whether enabling DC auto forwarding to active cluster for signal / start / signal with start API if domain is not active | TRUE|
| system.enableGracefulFailover | whether enabling graceful failover | FALSE|
| system.transactionSizeLimit | the largest allowed transaction size to persistence | #N/A|
| system.minRetentionDays | the minimal allowed retention days for domain | 1|
| system.maxRetentionDays | the maximum allowed retention days for domain | 1|
| system.maxDecisionStartToCloseSeconds | the minimal allowed decision start to close timeout in seconds | 240|
| system.disallowQuery | the key to disallow query for a domain | FALSE|
| limit.blobSize.error | the per event blob size limit, exceeding this will reject requests | 2*1024*1024|
| limit.blobSize.warn | the per event blob size limit for warning | 256*1024|
| limit.historySize.error | the per workflow execution history size limit, exceeding this will kill workflows | 200*1024*1024|
| limit.historySize.warn | the per workflow execution history size limit for warning | 50*1024*1024|
| limit.historyCount.error | the per workflow execution history event count limit, exceeding this will kill workflows | 200*1024|
| limit.historyCount.warn | the per workflow execution history event count limit for warning | 50*1024|
| limit.maxIDLength | the length limit for various IDs, including: Domain, TaskList, WorkflowID, ActivityID, TimerID,WorkflowType, ActivityType, SignalName, MarkerName, ErrorReason/FailureReason/CancelCause, Identity, RequestID | 1000|
| limit.maxIDWarnLength | the warn length limit for various IDs, including: Domain, TaskList, WorkflowID, ActivityID, TimerID, WorkflowType, ActivityType, SignalName, MarkerName, ErrorReason/FailureReason/CancelCause, Identity, RequestID | 150|
|	system.persistenceErrorInjectionRate	|	rate for injecting random error in persistence	|	0	|
|	system.enableFailoverManager	|	indicates if failover manager is enabled	|	FALSE	|
|	system.enableDebugMode	|	for enabling debugging components, logs and metrics	|	FALSE	|
|	limit.maxRawTaskListNameLength	|	max length of user provided task list name (non-sticky and non-scalable)	|	1000	|

## Frontend Dynamic Configuration

| Config Key | Explanation | Default Values |
| ---------- | ----------- | -------------- |
| frontend.persistenceMaxQPS | the max qps frontend host can query DB | 2000|
| frontend.persistenceGlobalMaxQPS | the max qps frontend cluster can query DB | 0|
| frontend.visibilityMaxPageSize | default max size for ListWorkflowExecutions in one page | 1000|
| frontend.visibilityListMaxQPS | max qps frontend can list open/close workflows | 10|
| frontend.esVisibilityListMaxQPS | max qps frontend can list open/close workflows from ElasticSearch | 30|
| frontend.esIndexMaxResultWindow | ElasticSearch index setting max_result_window | 10000|
| frontend.historyMaxPageSize | default max size for GetWorkflowExecutionHistory in one page | common.GetHistoryMaxPageSize|
| frontend.rps | workflow rate limit per second | 1200|
| frontend.domainrps | workflow domain rate limit per second per domain per frontend instance | 1200|
| frontend.globalDomainrps | workflow domain rate limit per second for the whole Cadence cluster | 0|
| frontend.historyMgrNumConns | for persistence cluster.NumConns | 10|
| frontend.throttledLogRPS | the rate limit on number of log messages emitted per second for throttled logger | 20|
| frontend.shutdownDrainDuration | the duration of traffic drain during shutdown | 0|
| frontend.enableClientVersionCheck | enables client version check for frontend | FALSE|
| frontend.maxBadBinaries | the max number of bad binaries in domain config | domain.MaxBadBinaries|
| frontend.validSearchAttributes | legal indexed keys that can be used in list APIs | definition.GetDefaultIndexedKeys()|
| frontend.sendRawWorkflowHistory | whether to enable raw history retrieving | sendRawWorkflowHistory|
| frontend.searchAttributesNumberOfKeysLimit | the limit of number of keys | 100|
| frontend.searchAttributesSizeOfValueLimit | the size limit of each value | 2*1024|
| frontend.searchAttributesTotalSizeLimit | the size limit of the whole map | 40*1024|
| frontend.visibilityArchivalQueryMaxPageSize | the maximum page size for a visibility archival query | 10000|
| frontend.domainFailoverRefreshInterval | the domain failover refresh timer | 10*time.Second|
| frontend.domainFailoverRefreshTimerJitterCoefficient | the jitter for domain failover refresh timer jitter | 0.1|
|	admin.errorInjectionRate	|	rate for injecting random error in admin client	|	0	|
|	frontend.failoverCoolDown	|	duration between two domain failvoers	|	1 Minute	|
|	frontend.errorInjectionRate	|	rate for injecting random error in frontend client	|	0	|

## Matching Dynamic Configuration

| Config Key | Explanation | Default Values |
| ---------- | ----------- | -------------- |
| matching.rps | request rate per second for each matching host | 1200|
| matching.persistenceMaxQPS | the max qps matching host can query DB | 3000|
| matching.persistenceGlobalMaxQPS | the max qps matching cluster can query DB | 0|
| matching.minTaskThrottlingBurstSize | the minimum burst size for task list throttling | 1|
| matching.getTasksBatchSize | the maximum batch size to fetch from the task buffer | 1000|
| matching.longPollExpirationInterval | the long poll expiration interval in the matching service | time.Minute|
| matching.enableSyncMatch | to enable sync match | TRUE|
| matching.updateAckInterval | the interval for update ack | 1*time.Minute|
| matching.idleTasklistCheckInterval | the IdleTasklistCheckInterval | 5*time.Minute|
| matching.maxTasklistIdleTime | the max time tasklist being idle | 5*time.Minute|
| matching.outstandingTaskAppendsThreshold | the threshold for outstanding task appends | 250|
| matching.maxTaskBatchSize | max batch size for task writer | 100|
| matching.maxTaskDeleteBatchSize | the max batch size for range deletion of tasks | 100|
| matching.throttledLogRPS | the rate limit on number of log messages emitted per second for throttled logger | 20|
| matching.numTasklistWritePartitions | the number of write partitions for a task list. It’s a little tricky to use this config. See Client worker setup section. | 1|
| matching.numTasklistReadPartitions | the number of read partitions for a task list. It’s a little tricky to use this config. See Client worker setup section. | 1|
| matching.forwarderMaxOutstandingPolls | the max number of inflight polls from the forwarder | 1|
| matching.forwarderMaxOutstandingTasks | the max number of inflight addTask/queryTask from the forwarder | 1|
| matching.forwarderMaxRatePerSecond | the max rate at which add/query can be forwarded | 10|
| matching.forwarderMaxChildrenPerNode | the max number of children per node in the task list partition tree | 20|
| matching.shutdownDrainDuration | the duration of traffic drain during shutdown | 0|
|	matching.errorInjectionRate	|	rate for injecting random error in matching client	|	0	|
|	matching.enableTaskInfoLogByDomainID	|	enables info level logs for decision/activity task based on the request domainID	|	FALSE	|

## History Dynamic Configuration

| Config Key | Explanation | Default Values |
| ---------- | ----------- | -------------- |
| history.rps | request rate per second for each history host | 3000|
| history.persistenceMaxQPS | the max qps history host can query DB | 9000|
| history.persistenceGlobalMaxQPS | the max qps history cluster can query DB | 0|
| history.historyVisibilityOpenMaxQPS | max qps one history host can write visibility open_executions | 300|
| history.historyVisibilityClosedMaxQPS | max qps one history host can write visibility closed_executions | 300|
| history.longPollExpirationInterval | the long poll expiration interval in the history service | time.Second*20|
| history.cacheInitialSize | initial size of history cache | 128|
| history.cacheMaxSize | max size of history cache | 512|
| history.cacheTTL | TTL of history cache | time.Hour|
| history.shutdownDrainDuration | the duration of traffic drain during shutdown | 0|
| history.eventsCacheInitialSize | initial count of events cache | 128|
| history.eventsCacheMaxSize | max count of events cache | 512|
| history.eventsCacheMaxSizeInBytes | max size of events cache in bytes | 0|
| history.eventsCacheTTL | TTL of events cache | time.Hour|
| history.eventsCacheGlobalEnable | enables global cache over all history shards | FALSE|
| history.eventsCacheGlobalInitialSize | initial count of global events cache | 4096|
| history.eventsCacheGlobalMaxSize | max count of global events cache | 131072|
| history.acquireShardInterval | interval that timer used to acquire shard | time.Minute|
| history.acquireShardConcurrency | number of goroutines that can be used to acquire shards in the shard controller. | 1|
| history.standbyClusterDelay | the artificial delay added to standby cluster's view of active cluster's time | 5*time.Minute|
| history.standbyTaskMissingEventsResendDelay | the amount of time standby cluster's will wait (if events are missing)before calling remote for missing events | 15*time.Minute|
| history.standbyTaskMissingEventsDiscardDelay | the amount of time standby cluster's will wait (if events are missing)before discarding the task | 25*time.Minute|
| history.taskProcessRPS | the task processing rate per second for each domain | 1000|
| history.taskSchedulerType | the task scheduler type for priority task processor | int(task.SchedulerTypeWRR)|
| history.taskSchedulerWorkerCount | the number of workers per host in task scheduler | 200|
| history.taskSchedulerShardWorkerCount | the number of worker per shard in task scheduler | 0|
| history.taskSchedulerQueueSize | the size of task channel for host level task scheduler | 10000|
| history.taskSchedulerShardQueueSize | the size of task channel for shard level task scheduler | 200|
| history.taskSchedulerDispatcherCount | the number of task dispatcher in task scheduler (only applies to host level task scheduler) | 1|
| history.taskSchedulerRoundRobinWeight | the priority weight for weighted round robin task scheduler | common.ConvertIntMapToDynamicConfigMapProperty( DefaultTaskPriorityWeight)|
| history.activeTaskRedispatchInterval | the active task redispatch interval | 5*time.Second|
| history.standbyTaskRedispatchInterval | the standby task redispatch interval | 30*time.Second|
| history.taskRedispatchIntervalJitterCoefficient | the task redispatch interval jitter coefficient | 0.15|
| history.standbyTaskReReplicationContextTimeout | the context timeout for standby task re-replication | 3*time.Minute|
| history.queueProcessorEnableSplit | indicates whether processing queue split policy should be enabled | FALSE|
| history.queueProcessorSplitMaxLevel | the max processing queue level | 2 // 3 levels, start from 0|
| history.queueProcessorEnableRandomSplitByDomainID | indicates whether random queue split policy should be enabled for a domain | FALSE|
| history.queueProcessorRandomSplitProbability | the probability for a domain to be split to a new processing queue | 0.01|
| history.queueProcessorEnablePendingTaskSplitByDomainID | indicates whether pending task split policy should be enabled | FALSE|
| history.queueProcessorPendingTaskSplitThreshold | the threshold for the number of pending tasks per domain | common.ConvertIntMapToDynamicConfigMapProperty( DefaultPendingTaskSplitThreshold)|
| history.queueProcessorEnableStuckTaskSplitByDomainID | indicates whether stuck task split policy should be enabled | FALSE|
| history.queueProcessorStuckTaskSplitThreshold | the threshold for the number of attempts of a task | common.ConvertIntMapToDynamicConfigMapProperty( DefaultStuckTaskSplitThreshold)|
| history.queueProcessorSplitLookAheadDurationByDomainID | the look ahead duration when spliting a domain to a new processing queue | 20*time.Minute|
| history.queueProcessorPollBackoffInterval | the backoff duration when queue processor is throttled | 5*time.Second|
| history.queueProcessorPollBackoffIntervalJitterCoefficient | backoff interval jitter coefficient | 0.15|
| history.queueProcessorEnablePersistQueueStates | indicates whether processing queue states should be persisted | FALSE|
| history.queueProcessorEnableLoadQueueStates | indicates whether processing queue states should be loaded | FALSE|
| history.timerTaskBatchSize | batch size for timer processor to process tasks | 100|
| history.timerTaskWorkerCount | number of task workers for timer processor | 10|
| history.timerTaskMaxRetryCount | max retry count for timer processor | 100|
| history.timerProcessorGetFailureRetryCount | retry count for timer processor get failure operation | 5|
| history.timerProcessorCompleteTimerFailureRetryCount | retry count for timer processor complete timer operation | 10|
| history.timerProcessorUpdateAckInterval | update interval for timer processor | 30*time.Second|
| history.timerProcessorUpdateAckIntervalJitterCoefficient | the update interval jitter coefficient | 0.15|
| history.timerProcessorCompleteTimerInterval | complete timer interval for timer processor | 60*time.Second|
| history.timerProcessorFailoverMaxPollRPS | max poll rate per second for timer processor | 1|
| history.timerProcessorMaxPollRPS | max poll rate per second for timer processor | 20|
| history.timerProcessorMaxPollInterval | max poll interval for timer processor | 5*time.Minute|
| history.timerProcessorMaxPollIntervalJitterCoefficient | the max poll interval jitter coefficient | 0.15|
| history.timerProcessorSplitQueueInterval | the split processing queue interval for timer processor | 1*time.Minute|
| history.timerProcessorSplitQueueIntervalJitterCoefficient | the split processing queue interval jitter coefficient | 0.15|
| history.timerProcessorMaxRedispatchQueueSize | the threshold of the number of tasks in the redispatch queue for timer processor | 10000|
| history.timerProcessorEnablePriorityTaskProcessor | indicates whether priority task processor should be used for timer processor | TRUE|
| history.timerProcessorMaxTimeShift | the max shift timer processor can have | 1*time.Second|
| history.timerProcessorHistoryArchivalSizeLimit | the max history size for inline archival | 500*1024|
| history.timerProcessorArchivalTimeLimit | the upper time limit for inline history archival | 1*time.Second|
| history.transferTaskBatchSize | batch size for transferQueueProcessor | 100|
| history.transferProcessorFailoverMaxPollRPS | max poll rate per second for transferQueueProcessor | 1|
| history.transferProcessorMaxPollRPS | max poll rate per second for transferQueueProcessor | 20|
| history.transferTaskWorkerCount | number of worker for transferQueueProcessor | 10|
| history.transferTaskMaxRetryCount | max times of retry for transferQueueProcessor | 100|
| history.transferProcessorCompleteTransferFailureRetryCount | times of retry for failure | 10|
| history.transferProcessorMaxPollInterval | max poll interval for transferQueueProcessor | 1*time.Minute|
| history.transferProcessorMaxPollIntervalJitterCoefficient | the max poll interval jitter coefficient | 0.15|
| history.transferProcessorSplitQueueInterval | the split processing queue interval for transferQueueProcessor | 1*time.Minute|
| history.transferProcessorSplitQueueIntervalJitterCoefficient | the split processing queue interval jitter coefficient | 0.15|
| history.transferProcessorUpdateAckInterval | update interval for transferQueueProcessor | 30*time.Second|
| history.transferProcessorUpdateAckIntervalJitterCoefficient | the update interval jitter coefficient | 0.15|
| history.transferProcessorCompleteTransferInterval | complete timer interval for transferQueueProcessor | 60*time.Second|
| history.transferProcessorMaxRedispatchQueueSize | the threshold of the number of tasks in the redispatch queue for transferQueueProcessor | 10000|
| history.transferProcessorVisibilityArchivalTimeLimit | the upper time limit for archiving visibility records | 200*time.Millisecond|
| history.replicatorTaskBatchSize | batch size for ReplicatorProcessor | 100|
| history.replicatorTaskWorkerCount | number of worker for ReplicatorProcessor | 10|
| history.replicatorReadTaskMaxRetryCount | the number of read replication task retry time | 3|
| history.replicatorTaskMaxRetryCount | max times of retry for ReplicatorProcessor | 100|
| history.replicatorProcessorMaxPollRPS | max poll rate per second for ReplicatorProcessor | 20|
| history.replicatorProcessorMaxPollInterval | max poll interval for ReplicatorProcessor | 1*time.Minute|
| history.replicatorProcessorMaxPollIntervalJitterCoefficient | the max poll interval jitter coefficient | 0.15|
| history.replicatorProcessorUpdateAckInterval | update interval for ReplicatorProcessor | 5*time.Second|
| history.replicatorProcessorUpdateAckIntervalJitterCoefficient | the update interval jitter coefficient | 0.15|
| history.replicatorProcessorMaxRedispatchQueueSize | the threshold of the number of tasks in the redispatch queue for ReplicatorProcessor | 10000|
| history.replicatorProcessorEnablePriorityTaskProcessor | indicates whether priority task processor should be used for ReplicatorProcessor | FALSE|
| history.executionMgrNumConns | persistence connections number for ExecutionManager | 50|
| history.historyMgrNumConns | persistence connections number for HistoryManager | 50|
| history.maximumBufferedEventsBatch | max number of buffer event in mutable state | 100|
| history.maximumSignalsPerExecution | max number of signals supported by single execution | 10000|
| history.shardUpdateMinInterval | the minimal time interval which the shard info can be updated | 5*time.Minute|
| history.shardSyncMinInterval | the minimal time interval which the shard info should be sync to remote | 5*time.Minute|
| history.defaultEventEncoding | the encoding type for history events | string(common.EncodingTypeThriftRW)|
| history.numArchiveSystemWorkflows | key for number of archive system workflows running in total | 1000|
| history.archiveRequestRPS | the rate limit on the number of archive request per second | 300 // should be much smaller than frontend RPS|
| history.enableAdminProtection | whether to enable admin checking | FALSE|
| history.adminOperationToken | the token to pass admin checking | common.DefaultAdminOperationToken|
| history.historyMaxAutoResetPoints | the key for max number of auto reset points stored in mutableState | DefaultHistoryMaxAutoResetPoints|
| history.enableParentClosePolicy | whether to ParentClosePolicy | TRUE|
| history.parentClosePolicyThreshold | decides that parent close policy will be processed by sys workers(if enabled) ifthe number of children greater than or equal to this threshold | 10|
| history.numParentClosePolicySystemWorkflows | key for number of parentClosePolicy system workflows running in total | 10|
| history.throttledLogRPS | the rate limit on number of log messages emitted per second for throttled logger | 4|
| history.stickyTTL | to expire a sticky tasklist if no update more than this duration | time.Hour*24*365|
| history.decisionHeartbeatTimeout | for decision heartbeat | time.Minute*30|
| history.DropStuckTaskByDomain | whether stuck timer/transfer task should be dropped for a domain | FALSE|
|	history.transferProcessorEnableValidator	|	whether validator should be enabled for transferQueueProcessor	|	FALSE	|
|	history.transferProcessorValidationInterval	|	interval for performing transfer queue validation	|	30*time.Second	|
|	history.decisionRetryCriticalAttempts	|	decision attempt threshold for logging and emiting metrics	|	10	|
|	history.ReplicationTaskProcessorErrorSecondRetryWait	|	initial retry wait for the second phase retry	|	5*time.Second	|
|	history.ReplicationTaskProcessorErrorSecondRetryMaxWait	|	max wait time for the second phase retry	|	30*time.Second	|
|	history.ReplicationTaskProcessorErrorSecondRetryExpiration	|	expiration duration for the second phase retry	|	5*time.Minute	|
|	history.enableActivityLocalDispatchByDomain	|	allows worker to dispatch activity tasks through local tunnel after decisions are made. This is an performance optimization to skip activity scheduling efforts	|	FALSE	|
|	history.errorInjectionRate	|	rate for injecting random error in history client	|	0	|
|	history.enableTaskInfoLogByDomainID	|	enables info level logs for decision/activity task based on the request domainID	|	FALSE	|
|	history.activityMaxScheduleToStartTimeoutForRetry	|	maximum value allowed when overwritting the schedule to start timeout for activities with retry policy	|	30*time.Minute	|

## SysWorker Dynamic Configuration

| Config Key | Explanation | Default Values |
| ---------- | ----------- | -------------- |
| worker.persistenceMaxQPS | the max qps worker host can query DB | 500|
| worker.persistenceGlobalMaxQPS | the max qps worker cluster can query DB | 0|
| worker.replicationTaskMaxRetryDuration | the max retry duration for any task | 10*time.Minute|
| worker.indexerConcurrency | the max concurrent messages to be processed at any given time | 1000|
| worker.ESProcessorNumOfWorkers | num of workers for esProcessor | 1|
| worker.ESProcessorBulkActions | max number of requests in bulk for esProcessor | 1000|
| worker.ESProcessorBulkSize | max total size of bulk in bytes for esProcessor | 2<<24 // 16MB|
| worker.ESProcessorFlushInterval | flush interval for esProcessor | 1*time.Second|
| worker.ArchiverConcurrency | controls the number of coroutines handling archival work per archival workflow | 50|
| worker.ArchivalsPerIteration | controls the number of archivals handled in each iteration of archival workflow | 1000|
| worker.TimeLimitPerArchivalIteration | controls the time limit of each iteration of archival workflow | archiver.MaxArchivalIterationTimeout()|
| worker.throttledLogRPS | the rate limit on number of log messages emitted per second for throttled logger | 20|
| worker.scannerPersistenceMaxQPS | the maximum rate of persistence calls from worker.Scanner | 100|
| worker.scannerGetOrphanTasksPageSize | when cleaning the database of lingering tasks from deleted task lists, this is the maximum number returned from a single query | 1000 |
| worker.scannerMaxTasksProcessedPerTasklistJob | when cleaning the database of expired tasks for valid task lists, this is the maximum number of tasks returned from a single query | 16 |
| worker.scannerBatchSizeForCompleteTasksLessThanAckLevel | when cleaning the database of expired tasks for valid task lists, this is the maximum number processed for a single task list before giving other tasks lists a turn | 256 |
| worker.taskListScannerEnabled | indicates if task list scanner should be started as part of worker.Scanner | TRUE|
| worker.historyScannerEnabled | indicates if history scanner should be started as part of worker.Scanner | TRUE|
| worker.executionsScannerEnabled | indicates if executions scanner should be started as part of worker.Scanner | FALSE|
| worker.executionsScannerConcurrency | indicates the concurrency of concrete execution scanner | 25|
| worker.executionsScannerBlobstoreFlushThreshold | indicates the flush threshold of blobstore in concrete execution scanner | 100|
| worker.executionsScannerActivityBatchSize | indicates the batch size of scanner activities | 25|
| worker.executionsScannerPersistencePageSize | indicates the page size of execution persistence fetches in concrete execution scanner | 1000|
| worker.executionsScannerInvariantCollectionMutableState | indicates if mutable state invariant checks should be run | TRUE|
| worker.executionsScannerInvariantCollectionHistory | indicates if history invariant checks should be run | TRUE|
| worker.currentExecutionsScannerEnabled | indicates if current executions scanner should be started as part of worker.Scanner | FALSE|
| worker.currentExecutionsConcurrency | indicates the concurrency of current executions scanner | 25|
| worker.currentExecutionsBlobstoreFlushThreshold | indicates the flush threshold of blobstore in current executions scanner | 100|
| worker.currentExecutionsActivityBatchSize | indicates the batch size of scanner activities | 25|
| worker.currentExecutionsPersistencePageSize | indicates the page size of execution persistence fetches in current executions scanner | 1000|
| worker.currentExecutionsScannerInvariantCollectionHistory | indicates if history invariant checks should be run | FALSE|
| worker.currentExecutionsInvariantCollectionMutableState | indicates if mutable state invariant checks should be run | TRUE|
| worker.enableBatcher | decides whether start batcher in our worker | FALSE|
| system.enableParentClosePolicyWorker | decides whether or not enable system workers for processing parent close policy task | TRUE|
| system.enableStickyQuery | indicates if sticky query should be enabled per domain | TRUE|
|	worker.concreteExecutionFixerDomainAllow	|	which domains are allowed to be fixed by concrete fixer workflow	|	FALSE	|
|	worker.currentExecutionFixerDomainAllow	|	which domains are allowed to be fixed by current fixer workflow	|	FALSE	|
|	worker.concreteExecutionFixerEnabled	|	if concrete execution fixer workflow is enabled	|	FALSE	|
|	worker.currentExecutionFixerEnabled	|	if current execution fixer workflow is enabled	|	FALSE	|
|	worker.timersScannerEnabled	|	if timers scanner should be started as part of worker.Scanner	|	FALSE	|
|	worker.timersFixerEnabled	|	if timers fixer should be started as part of worker.Scanner	|	FALSE	|
|	worker.timersScannerConcurrency	|	the concurrency of timers scanner	|	5	|
|	worker.timersScannerPersistencePageSize	|	the page size of timers persistence fetches in timers scanner	|	1000	|
|	TimersScannerBlobstoreFlushThreshold	|	TimersScannerBlobstoreFlushThreshold	|	100	|
|	worker.timersScannerActivityBatchSize	|	TimersScannerActivityBatchSize	|	25	|
|	worker.timersScannerPeriodStart	|	interval start for fetching scheduled timers	|	24	|
|	worker.timersScannerPeriodEnd	|	interval end for fetching scheduled timers	|	3	|
|	worker.timersFixerDomainAllow	|	which domains are allowed to be fixed by timer fixer workflow	|	FALSE	|

## XDC Dynamic Configuration

| Config Key | Explanation | Default Values |
| ---------- | ----------- | -------------- |
| history.ReplicationTaskFetcherParallelism | determines how many go routines we spin up for fetching tasks | 1|
| history.ReplicationTaskFetcherAggregationInterval | determines how frequently the fetch requests are sent | 2*time.Second|
| history.ReplicationTaskFetcherTimerJitterCoefficient | the jitter for fetcher timer | 0.15|
| history.ReplicationTaskFetcherErrorRetryWait | the wait time when fetcher encounters error | time.Second|
| history.ReplicationTaskFetcherServiceBusyWait | the wait time when fetcher encounters service busy error | 60*time.Second|
| history.ReplicationTaskProcessorErrorRetryWait | the initial retry wait when we see errors in applying replication tasks | 50*time.Millisecond|
| history.ReplicationTaskProcessorErrorRetryMaxAttempts | the max retry attempts for applying replication tasks | 5|
| history.ReplicationTaskProcessorNoTaskInitialWait | the wait time when not ask is returned | 2*time.Second|
| history.ReplicationTaskProcessorCleanupInterval | determines how frequently the cleanup replication queue | 1*time.Minute|
| history.ReplicationTaskProcessorCleanupJitterCoefficient | the jitter for cleanup timer | 0.15|
| history.ReplicationTaskProcessorReadHistoryBatchSize | the batch size to read history events | 5|
| history.ReplicationTaskProcessorStartWait | the wait time before each task processing batch | 5*time.Second|
| history.ReplicationTaskProcessorStartWaitJitterCoefficient | the jitter for batch start wait timer | 0.9|
| history.ReplicationTaskProcessorHostQPS | the qps of task processing rate limiter on host level | 1500|
| history.ReplicationTaskProcessorShardQPS | the qps of task processing rate limiter on shard level | 5|
| history.ReplicationTaskGenerationQPS | the wait time between each replication task generation qps | 100|
| history.EnableConsistentQuery | indicates if consistent query is enabled for the cluster | TRUE|
| history.EnableConsistentQueryByDomain | indicates if consistent query is enabled for a domain | FALSE|
| history.MaxBufferedQueryCount | indicates the maximum number of queries which can be buffered at a given time for a single workflow | 1|
| history.mutableStateChecksumGenProbability | the probability [0-100] that checksum will be generated for mutable state | 0|
| history.mutableStateChecksumVerifyProbability | the probability [0-100] that checksum will be verified for mutable state | 0|
| history.mutableStateChecksumInvalidateBefore | the epoch timestamp before which all checksums are to be discarded | 0|
| history.ReplicationEventsFromCurrentCluster | a feature flag to allow cross DC replicate events that generated from the current cluster | FALSE|
| history.NotifyFailoverMarkerInterval | determines the frequency to notify failover marker | 5*time.Second|
| history.NotifyFailoverMarkerTimerJitterCoefficient | the jitter for failover marker notifier timer | 0.15|


## Deprecated Dynamic Configuration
Note that some of them are never used in open source repo. See reasons: TODO https://github.com/uber/cadence/issues/3861

| Config Key | Explanation | Default Values |
| ---------- | ----------- | -------------- |
| system.enableNewKafkaClient | key for using New Kafka client | #N/A|
| system.enablePriorityTaskProcessor | the key for enabling priority task processor | TRUE|
| history.transferProcessorUpdateShardTaskCount | update shard count for transferQueueProcessor | #N/A|
| history.transferProcessorEnablePriorityTaskProcessor | indicates whether priority task processor should be used for transferQueueProcessor | TRUE|
| history.timerProcessorEnableMultiCursorProcessor | indicates whether multi-cursor queue processor should be used for timer processor | FALSE|
| history.timerProcessorUpdateShardTaskCount | update shard count for timer processor | #N/A|
| history.replicatorProcessorUpdateShardTaskCount | update shard count for ReplicatorProcessor | #N/A|
| worker.replicatorMetaTaskConcurrency | the number of coroutine handling metadata related tasks | #N/A|
| worker.replicatorTaskConcurrency | the number of coroutine handling non metadata related tasks | #N/A|
| worker.replicatorMessageConcurrency | the max concurrent tasks provided by messaging client | #N/A|
| worker.replicatorActivityBufferRetryCount | the retry attempt when encounter retry error on activity | #N/A|
| worker.replicatorHistoryBufferRetryCount | the retry attempt when encounter retry error on history | #N/A|
| worker.replicationTaskMaxRetryCount | the max retry count for any task | #N/A|
| worker.replicationTaskContextDuration | the context timeout for apply replication tasks | #N/A|
| worker.workerReReplicationContextTimeout | the context timeout for end to end re-replication process | #N/A|
| worker.enableReplication | the feature flag for kafka replication | #N/A|
| worker.WorkerHistoryPageSize | indicates the page size of history fetched from persistence for archival | #N/A|
| worker.WorkerTargetArchivalBlobSize | indicates the target blob size in bytes for archival, actual blob size may vary | #N/A|
| worker.DeterministicConstructionCheckProbability | controls the probability of running a deterministic construction check for any given archival | #N/A|
| worker.BlobIntegrityCheckProbability | controls the probability of running an integrity check for any given archival | #N/A|
| system.enableAuthorization | the key to enable authorization for a doma
in | #N/A|
| worker.EnableArchivalCompression | indicates whether blobs are compressed before they are archived | #N/A|
| frontend.visibilityArchivalQueryMaxRangeInDays | the maximum number of days for a visibility archival query | #N/A|
| frontend.visibilityArchivalQueryMaxQPS | the timeout for a visibility archival query | #N/A|
