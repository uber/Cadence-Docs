---
layout: default
title: HTTP API
permalink: /docs/concepts/http-api
---

# Using HTTP API

## Introduction

Cadence allows you to interact with server using HTTP API. What does it mean? HTTP/JSON communication is a versatile way
to interact with servers. For Cadence, it means you can expose a list of RPC methods to be invoked using HTTP protocol.
This opens possibilities to interact with Cadence server using any programming language with HTTP support. This can be
used to start or terminate workflows from your bash scripts, observe cluster status or invoke any other operation
supported by Cadence RPC declaration.

## Setup

### Updating Cadence configuration files

To enable “start workflow” HTTP API, add `http` section to Cadence RPC configuration settings:

```yaml
services:
  frontend:
    rpc:
      <...>
      http:
        port: 8800
        procedures:
          - uber.cadence.api.v1.WorkflowAPI::StartWorkflowExecution 
```

### Using “docker run” command

Refer to instructions described
here: https://github.com/uber/cadence/tree/master/docker#using-docker-image-for-production

Additionally add two more environment variables:

```bash
docker run
<...>
    -e FRONTEND_HTTP_PORT=8800                          -- HTTP PORT TO LISTEN 
    -e FRONTEND_HTTP_PROCEDURES=uber.cadence.api.v1.WorkflowAPI::StartWorkflowExecution  -- List of API methods exposed
    ubercadence/server:<tag> 
```

### Using docker-compose

Add HTTP environment variables to docker/docker-compose.yml configuration:

```yaml
cadence:
  image: ubercadence/server:master-auto-setup
  ports:
    - "8000:8000"
    - "8001:8001"
    - "8002:8002"
    - "8003:8003"
    - "7933:7933"
    - "7934:7934"
    - "7935:7935"
    - "7939:7939"
    - "7833:7833"
    - "8800:8800"
  environment:
    - "CASSANDRA_SEEDS=cassandra"
    - "PROMETHEUS_ENDPOINT_0=0.0.0.0:8000"
    - "PROMETHEUS_ENDPOINT_1=0.0.0.0:8001"
    - "PROMETHEUS_ENDPOINT_2=0.0.0.0:8002"
    - "PROMETHEUS_ENDPOINT_3=0.0.0.0:8003"
    - "DYNAMIC_CONFIG_FILE_PATH=config/dynamicconfig/development.yaml"
    - "FRONTEND_HTTP_PORT=8800"
    - "FRONTEND_HTTP_PROCEDURES=uber.cadence.api.v1.WorkflowAPI::StartWorkflowExecution" 
```

## Using HTTP API

Start a workflow using curl command

```bash
curl -X POST http://0.0.0.0:8800 \
    -H 'context-ttl-ms: 2000' \
    -H 'rpc-caller: rpc-client-name' \
    -H 'rpc-service: cadence-frontend' \
    -H 'rpc-encoding: json' \
    -H 'rpc-procedure: uber.cadence.api.v1.WorkflowAPI::StartWorkflowExecution' \
    -d @data.json 
```

Where `data.json` content looks something like this:

```json
{
  "domain": "sample-domain",
  "workflowId": "workflowid123",
  "execution_start_to_close_timeout": "11s",
  "task_start_to_close_timeout": "10s",
  "workflowType": {
    "name": "workflow_type"
  },
  "taskList": {
    "name": "tasklist-name"
  },
  "identity": "My custom caller identity",
  "requestId": "4D1E4058-6FCF-4BA8-BF16-8FA8B02F9651"
} 
```

Describe a cluster using curl command

```bash
curl -X POST http://0.0.0.0:8800 \
  -H 'context-ttl-ms: 2000' \
  -H 'rpc-caller: curl-client' \
  -H 'rpc-service: cadence-frontend' \
  -H 'rpc-encoding: json' \
  -H 'rpc-procedure: uber.cadence.admin.v1.AdminAPI::DescribeCluster'
```

## HTTP API Reference

### Admin API

------------------------------------------------------------------------------------------

<details>
<summary><code>POST</code> <code><b>uber.cadence.admin.v1.AdminAPI::AddSearchAttribute</b></code></summary>

#### Add search attributes to whitelist

##### Headers

| name           | example                                            |
|----------------|----------------------------------------------------|
| context-ttl-ms | 2000                                               |
| rpc-caller     | curl-client                                        |
| rpc-service    | cadence-frontend                                   |
| rpc-encoding   | json                                               |
| rpc-procedure  | uber.cadence.admin.v1.AdminAPI::AddSearchAttribute |

##### Example payload

```json
{
  "searchAttribute": {
    "custom_key": 1
  }
}
```

Search attribute types

| type     | value |
|----------|-------|
| String   | 1     |
| Keyword  | 2     |
| Int      | 3     |
| Double   | 4     |
| DateTime | 5     |

##### Example cURL

```bash
curl -X POST http://0.0.0.0:8800 \
    -H 'context-ttl-ms: 2000' \
    -H 'rpc-caller: curl-client' \
    -H 'rpc-service: cadence-frontend' \
    -H 'rpc-encoding: json' \
    -H 'rpc-procedure: uber.cadence.admin.v1.AdminAPI::AddSearchAttribute' \
    -d \
    '{
      "searchAttribute": {
        "custom_key": 1
      }
    }'
```

##### Example successful response

HTTP code: 200

```json
{}
```

</details>

------------------------------------------------------------------------------------------

<details>
<summary><code>POST</code> <code><b>uber.cadence.admin.v1.AdminAPI::CloseShard</b></code></summary>

#### Close a shard given a shard ID

##### Headers

| name           | example                                    |
|----------------|--------------------------------------------|
| context-ttl-ms | 2000                                       |
| rpc-caller     | curl-client                                |
| rpc-service    | cadence-frontend                           |
| rpc-encoding   | json                                       |
| rpc-procedure  | uber.cadence.admin.v1.AdminAPI::CloseShard |

##### Example payload

```json
{
  "shardID": 0
}
```

##### Example cURL

```bash
curl -X POST http://0.0.0.0:8800 \
    -H 'context-ttl-ms: 2000' \
    -H 'rpc-caller: curl-client' \
    -H 'rpc-service: cadence-frontend' \
    -H 'rpc-encoding: json' \
    -H 'rpc-procedure: uber.cadence.admin.v1.AdminAPI::CloseShard' \
    -d \
    '{ 
      "shardID": 0
    }'
```

##### Example successful response

HTTP code: 200

```json
{}
```

</details>

------------------------------------------------------------------------------------------

<details>
<summary><code>POST</code> <code><b>uber.cadence.admin.v1.AdminAPI::CountDLQMessages</b></code></summary>

#### Count DLQ messages

##### Headers

| name           | example                                          |
|----------------|--------------------------------------------------|
| context-ttl-ms | 2000                                             |
| rpc-caller     | curl-client                                      |
| rpc-service    | cadence-frontend                                 |
| rpc-encoding   | json                                             |
| rpc-procedure  | uber.cadence.admin.v1.AdminAPI::CountDLQMessages |

##### Example payload

None

##### Example cURL

```bash
curl -X POST http://0.0.0.0:8800 \
    -H 'context-ttl-ms: 2000' \
    -H 'rpc-caller: curl-client' \
    -H 'rpc-service: cadence-frontend' \
    -H 'rpc-encoding: json' \
    -H 'rpc-procedure: uber.cadence.admin.v1.AdminAPI::CountDLQMessages'
```

##### Example successful response

HTTP code: 200

```json
{
  "history": []
}
```

</details>

------------------------------------------------------------------------------------------

<details>
<summary><code>POST</code> <code><b>uber.cadence.admin.v1.AdminAPI::DescribeCluster</b></code></summary>

#### Describe cluster information

##### Headers

| name           | example                                         |
|----------------|-------------------------------------------------|
| context-ttl-ms | 2000                                            |
| rpc-caller     | curl-client                                     |
| rpc-service    | cadence-frontend                                |
| rpc-encoding   | json                                            |
| rpc-procedure  | uber.cadence.admin.v1.AdminAPI::DescribeCluster |

##### Example payload

None

##### Example cURL

```bash
curl -X POST http://0.0.0.0:8800 \
    -H 'context-ttl-ms: 2000' \
    -H 'rpc-caller: curl-client' \
    -H 'rpc-service: cadence-frontend' \
    -H 'rpc-encoding: json' \
    -H 'rpc-procedure: uber.cadence.admin.v1.AdminAPI::DescribeCluster'
```

##### Example successful response

HTTP code: 200

```json
{
  "supportedClientVersions": {
    "goSdk": "1.7.0",
    "javaSdk": "1.5.0"
  },
  "membershipInfo": {
    "currentHost": {
      "identity": "127.0.0.1:7933"
    },
    "reachableMembers": [
      "127.0.0.1:7933",
      "127.0.0.1:7934",
      "127.0.0.1:7935",
      "127.0.0.1:7939"
    ],
    "rings": [
      {
        "role": "cadence-frontend",
        "memberCount": 1,
        "members": [
          {
            "identity": "127.0.0.1:7933"
          }
        ]
      },
      {
        "role": "cadence-history",
        "memberCount": 1,
        "members": [
          {
            "identity": "127.0.0.1:7934"
          }
        ]
      },
      {
        "role": "cadence-matching",
        "memberCount": 1,
        "members": [
          {
            "identity": "127.0.0.1:7935"
          }
        ]
      },
      {
        "role": "cadence-worker",
        "memberCount": 1,
        "members": [
          {
            "identity": "127.0.0.1:7939"
          }
        ]
      }
    ]
  },
  "persistenceInfo": {
    "historyStore": {
      "backend": "shardedNosql"
    },
    "visibilityStore": {
      "backend": "cassandra",
      "features": [
        {
          "key": "advancedVisibilityEnabled"
        }
      ]
    }
  }
}
```

</details>

------------------------------------------------------------------------------------------

<details>
<summary><code>POST</code> <code><b>uber.cadence.admin.v1.AdminAPI::DescribeHistoryHost</b></code></summary>

#### Describe internal information of history host

##### Headers

| name           | example                                             |
|----------------|-----------------------------------------------------|
| context-ttl-ms | 2000                                                |
| rpc-caller     | curl-client                                         |
| rpc-service    | cadence-frontend                                    |
| rpc-encoding   | json                                                |
| rpc-procedure  | uber.cadence.admin.v1.AdminAPI::DescribeHistoryHost |

##### Example payload

```json
{
  "hostAddress": "127.0.0.1:7934"
}
```

```json
{
  "shardIdForHost": 0
}
```

```json
{
  "executionForHost": {
    "workflowId": "sample-workflow-id"
  }
}
```

##### Example cURL

```bash
curl -X POST http://0.0.0.0:8800 \
    -H 'context-ttl-ms: 2000' \
    -H 'rpc-caller: curl-client' \
    -H 'rpc-service: cadence-frontend' \
    -H 'rpc-encoding: json' \
    -H 'rpc-procedure: uber.cadence.admin.v1.AdminAPI::DescribeHistoryHost' \
    -d \
    '{
      "hostAddress": "127.0.0.1:7934"
    }'
```

##### Example successful response

HTTP code: 200

```json
{
  "numberOfShards": 4,
  "domainCache": {
    "numOfItemsInCacheByID": 5,
    "numOfItemsInCacheByName": 5
  },
  "shardControllerStatus": "started",
  "address": "127.0.0.1:7934"
}
```

</details>

------------------------------------------------------------------------------------------

<details>
<summary><code>POST</code> <code><b>uber.cadence.admin.v1.AdminAPI::DescribeQueue</b></code></summary>

#### Describe processing queue states

##### Headers

| name           | example                                       |
|----------------|-----------------------------------------------|
| context-ttl-ms | 2000                                          |
| rpc-caller     | curl-client                                   |
| rpc-service    | cadence-frontend                              |
| rpc-encoding   | json                                          |
| rpc-procedure  | uber.cadence.admin.v1.AdminAPI::DescribeQueue |

##### Example payload

```json
{
  "shardID": 0,
  "clusterName": "cluster0",
  "type": 3
}
```

Queue types

| type                | value |
|---------------------|-------|
| transfer queue      | 2     |
| timer queue         | 3     |
| cross-cluster queue | 6     |

##### Example cURL

```bash
curl -X POST http://0.0.0.0:8800 \
    -H 'context-ttl-ms: 2000' \
    -H 'rpc-caller: curl-client' \
    -H 'rpc-service: cadence-frontend' \
    -H 'rpc-encoding: json' \
    -H 'rpc-procedure: uber.cadence.admin.v1.AdminAPI::DescribeQueue' \
    -d \
    '{
      "shardID": 0,
      "clusterName": "cluster0",
      "type": 3
    }'
```

##### Example successful response

HTTP code: 200

```bash
TODO - Got the error "Request is nil."
```

</details>

------------------------------------------------------------------------------------------

<details>
<summary><code>POST</code> <code><b>uber.cadence.admin.v1.AdminAPI::DescribeShardDistribution</b></code></summary>

#### List shard distribution

##### Headers

| name           | example                                                   |
|----------------|-----------------------------------------------------------|
| context-ttl-ms | 2000                                                      |
| rpc-caller     | curl-client                                               |
| rpc-service    | cadence-frontend                                          |
| rpc-encoding   | json                                                      |
| rpc-procedure  | uber.cadence.admin.v1.AdminAPI::DescribeShardDistribution |

##### Example payload

```json
{
  "pageSize": 100,
  "pageID": 0
}
```

##### Example cURL

```bash
curl -X POST http://0.0.0.0:8800 \
    -H 'context-ttl-ms: 2000' \
    -H 'rpc-caller: curl-client' \
    -H 'rpc-service: cadence-frontend' \
    -H 'rpc-encoding: json' \
    -H 'rpc-procedure: uber.cadence.admin.v1.AdminAPI::DescribeShardDistribution' \
    -d \
    '{
      "pageSize": 100,
      "pageID": 0
    }'
```

##### Example successful response

HTTP code: 200

```json
{
  "numberOfShards": 4,
  "shards": {
    "0": "127.0.0.1:7934",
    "1": "127.0.0.1:7934",
    "2": "127.0.0.1:7934",
    "3": "127.0.0.1:7934"
  }
}
```

</details>

------------------------------------------------------------------------------------------

<details>
<summary><code>POST</code> <code><b>uber.cadence.admin.v1.AdminAPI::DescribeWorkflowExecution</b></code></summary>

#### List shard distribution

##### Headers

| name           | example                                                   |
|----------------|-----------------------------------------------------------|
| context-ttl-ms | 2000                                                      |
| rpc-caller     | curl-client                                               |
| rpc-service    | cadence-frontend                                          |
| rpc-encoding   | json                                                      |
| rpc-procedure  | uber.cadence.admin.v1.AdminAPI::DescribeWorkflowExecution |

##### Example payload

```json
{
  "domain": "sample-domain",
  "workflow_execution": {
    "workflow_id": "sample-workflow-id",
    "run_id": "cc09d5dd-b2fa-46d8-b426-54c96b12d18f"
  }
}
```

`run_id` is optional and allows to describe a specific run.

##### Example cURL

```bash
curl -X POST http://0.0.0.0:8800 \
    -H 'context-ttl-ms: 2000' \
    -H 'rpc-caller: curl-client' \
    -H 'rpc-service: cadence-frontend' \
    -H 'rpc-encoding: json' \
    -H 'rpc-procedure: uber.cadence.admin.v1.AdminAPI::DescribeWorkflowExecution' \
    -d \
    '{
      "domain": "sample-domain",
      "workflow_execution": {
        "workflow_id": "sample-workflow-id",
        "run_id": "cc09d5dd-b2fa-46d8-b426-54c96b12d18f"
      }
    }' | tr -d '\'
```

##### Example successful response

HTTP code: 200

```json
{
  "shardId": 3,
  "historyAddr": "127.0.0.1:7934",
  "mutableStateInDatabase": {
    "ActivityInfos": {},
    "TimerInfos": {},
    "ChildExecutionInfos": {},
    "RequestCancelInfos": {},
    "SignalInfos": {},
    "SignalRequestedIDs": {},
    "ExecutionInfo": {
      "DomainID": "d7aff879-f524-43a8-b340-5a223a69d75b",
      "WorkflowID": "sample-workflow-id",
      "RunID": "cc09d5dd-b2fa-46d8-b426-54c96b12d18f",
      "FirstExecutionRunID": "cc09d5dd-b2fa-46d8-b426-54c96b12d18f",
      "ParentDomainID": "",
      "ParentWorkflowID": "",
      "ParentRunID": "",
      "InitiatedID": -7,
      "CompletionEventBatchID": 3,
      "CompletionEvent": null,
      "TaskList": "sample-task-list",
      "WorkflowTypeName": "sample-workflow-type",
      "WorkflowTimeout": 11,
      "DecisionStartToCloseTimeout": 10,
      "ExecutionContext": null,
      "State": 2,
      "CloseStatus": 6,
      "LastFirstEventID": 3,
      "LastEventTaskID": 8388614,
      "NextEventID": 4,
      "LastProcessedEvent": -23,
      "StartTimestamp": "2023-09-08T05:13:04.24Z",
      "LastUpdatedTimestamp": "2023-09-08T05:13:15.247Z",
      "CreateRequestID": "8049b932-6c2f-415a-9bb2-241dcf4cfc9c",
      "SignalCount": 0,
      "DecisionVersion": 0,
      "DecisionScheduleID": 2,
      "DecisionStartedID": -23,
      "DecisionRequestID": "emptyUuid",
      "DecisionTimeout": 10,
      "DecisionAttempt": 0,
      "DecisionStartedTimestamp": 0,
      "DecisionScheduledTimestamp": 1694149984240504000,
      "DecisionOriginalScheduledTimestamp": 1694149984240503000,
      "CancelRequested": false,
      "CancelRequestID": "",
      "StickyTaskList": "",
      "StickyScheduleToStartTimeout": 0,
      "ClientLibraryVersion": "",
      "ClientFeatureVersion": "",
      "ClientImpl": "",
      "AutoResetPoints": {},
      "Memo": null,
      "SearchAttributes": null,
      "PartitionConfig": null,
      "Attempt": 0,
      "HasRetryPolicy": false,
      "InitialInterval": 0,
      "BackoffCoefficient": 0,
      "MaximumInterval": 0,
      "ExpirationTime": "0001-01-01T00:00:00Z",
      "MaximumAttempts": 0,
      "NonRetriableErrors": null,
      "BranchToken": null,
      "CronSchedule": "",
      "IsCron": false,
      "ExpirationSeconds": 0
    },
    "ExecutionStats": null,
    "BufferedEvents": [],
    "VersionHistories": {
      "CurrentVersionHistoryIndex": 0,
      "Histories": [
        {
          "BranchToken": "WQsACgAAACRjYzA5ZDVkZC1iMmZhLTQ2ZDgtYjQyNi01NGM5NmIxMmQxOGYLABQAAAAkYWM5YmIwMmUtMjllYy00YWEyLTlkZGUtZWQ0YWU1NWRhMjlhDwAeDAAAAAAA",
          "Items": [
            {
              "EventID": 3,
              "Version": 0
            }
          ]
        }
      ]
    },
    "ReplicationState": null,
    "Checksum": {
      "Version": 0,
      "Flavor": 0,
      "Value": null
    }
  }
}
```

</details>

------------------------------------------------------------------------------------------

### Domain API

------------------------------------------------------------------------------------------

<details>
<summary><code>POST</code> <code><b>uber.cadence.api.v1.DomainAPI::DescribeDomain</b></code></summary>

#### List shard distribution

##### Headers

| name           | example                                       |
|----------------|-----------------------------------------------|
| context-ttl-ms | 2000                                          |
| rpc-caller     | curl-client                                   |
| rpc-service    | cadence-frontend                              |
| rpc-encoding   | json                                          |
| rpc-procedure  | uber.cadence.api.v1.DomainAPI::DescribeDomain |

##### Example payload

```json
{
  "name": "sample-domain",
  "uuid": "d7aff879-f524-43a8-b340-5a223a69d75b"
}
```

`uuid` of the domain is optional.

##### Example cURL

```bash
curl -X POST http://0.0.0.0:8800 \
    -H 'context-ttl-ms: 2000' \
    -H 'rpc-caller: curl-client' \
    -H 'rpc-service: cadence-frontend' \
    -H 'rpc-encoding: json' \
    -H 'rpc-procedure: uber.cadence.api.v1.DomainAPI::DescribeDomain' \
    -d \
    '{
      "name": "sample-domain"
    }'
```

##### Example successful response

HTTP code: 200

```json
{
  "domain": {
    "id": "d7aff879-f524-43a8-b340-5a223a69d75b",
    "name": "sample-domain",
    "status": "DOMAIN_STATUS_REGISTERED",
    "data": {},
    "workflowExecutionRetentionPeriod": "259200s",
    "badBinaries": {
      "binaries": {}
    },
    "historyArchivalStatus": "ARCHIVAL_STATUS_ENABLED",
    "historyArchivalUri": "file:///tmp/cadence_archival/development",
    "visibilityArchivalStatus": "ARCHIVAL_STATUS_ENABLED",
    "visibilityArchivalUri": "file:///tmp/cadence_vis_archival/development",
    "activeClusterName": "cluster0",
    "clusters": [
      {
        "clusterName": "cluster0"
      }
    ],
    "isGlobalDomain": true,
    "isolationGroups": {}
  }
}
```

</details>

------------------------------------------------------------------------------------------

<details>
<summary><code>POST</code> <code><b>uber.cadence.api.v1.DomainAPI::ListDomains</b></code></summary>

#### List shard distribution

##### Headers

| name           | example                                    |
|----------------|--------------------------------------------|
| context-ttl-ms | 2000                                       |
| rpc-caller     | curl-client                                |
| rpc-service    | cadence-frontend                           |
| rpc-encoding   | json                                       |
| rpc-procedure  | uber.cadence.api.v1.DomainAPI::ListDomains |

##### Example payload

```json
{
  "pageSize": 100
}
```

##### Example cURL

```bash
curl -X POST http://0.0.0.0:8800 \
    -H 'context-ttl-ms: 2000' \
    -H 'rpc-caller: curl-client' \
    -H 'rpc-service: cadence-frontend' \
    -H 'rpc-encoding: json' \
    -H 'rpc-procedure: uber.cadence.api.v1.DomainAPI::ListDomains' \
    -d \
    '{
      "pageSize": 100
    }'
```

##### Example successful response

HTTP code: 200

```json
{
  "domains": [
    {
      "id": "3116607e-419b-4783-85fc-47726a4c3fe9",
      "name": "cadence-batcher",
      "status": "DOMAIN_STATUS_REGISTERED",
      "description": "Cadence internal system domain",
      "data": {},
      "workflowExecutionRetentionPeriod": "604800s",
      "badBinaries": {
        "binaries": {}
      },
      "historyArchivalStatus": "ARCHIVAL_STATUS_DISABLED",
      "visibilityArchivalStatus": "ARCHIVAL_STATUS_DISABLED",
      "activeClusterName": "cluster0",
      "clusters": [
        {
          "clusterName": "cluster0"
        }
      ],
      "failoverVersion": "-24",
      "isolationGroups": {}
    },
    {
      "id": "59c51119-1b41-4a28-986d-d6e377716f82",
      "name": "cadence-shadower",
      "status": "DOMAIN_STATUS_REGISTERED",
      "description": "Cadence internal system domain",
      "data": {},
      "workflowExecutionRetentionPeriod": "604800s",
      "badBinaries": {
        "binaries": {}
      },
      "historyArchivalStatus": "ARCHIVAL_STATUS_DISABLED",
      "visibilityArchivalStatus": "ARCHIVAL_STATUS_DISABLED",
      "activeClusterName": "cluster0",
      "clusters": [
        {
          "clusterName": "cluster0"
        }
      ],
      "failoverVersion": "-24",
      "isolationGroups": {}
    },
    {
      "id": "32049b68-7872-4094-8e63-d0dd59896a83",
      "name": "cadence-system",
      "status": "DOMAIN_STATUS_REGISTERED",
      "description": "cadence system workflow domain",
      "ownerEmail": "cadence-dev-group@uber.com",
      "data": {},
      "workflowExecutionRetentionPeriod": "259200s",
      "badBinaries": {
        "binaries": {}
      },
      "historyArchivalStatus": "ARCHIVAL_STATUS_DISABLED",
      "visibilityArchivalStatus": "ARCHIVAL_STATUS_DISABLED",
      "activeClusterName": "cluster0",
      "clusters": [
        {
          "clusterName": "cluster0"
        }
      ],
      "failoverVersion": "-24",
      "isolationGroups": {}
    },
    {
      "id": "d7aff879-f524-43a8-b340-5a223a69d75b",
      "name": "sample-domain",
      "status": "DOMAIN_STATUS_REGISTERED",
      "data": {},
      "workflowExecutionRetentionPeriod": "259200s",
      "badBinaries": {
        "binaries": {}
      },
      "historyArchivalStatus": "ARCHIVAL_STATUS_ENABLED",
      "historyArchivalUri": "file:///tmp/cadence_archival/development",
      "visibilityArchivalStatus": "ARCHIVAL_STATUS_ENABLED",
      "visibilityArchivalUri": "file:///tmp/cadence_vis_archival/development",
      "activeClusterName": "cluster0",
      "clusters": [
        {
          "clusterName": "cluster0"
        }
      ],
      "isGlobalDomain": true,
      "isolationGroups": {}
    }
  ],
  "nextPageToken": ""
}
```

</details>

------------------------------------------------------------------------------------------

### Meta API

------------------------------------------------------------------------------------------

### Visibility API

------------------------------------------------------------------------------------------

### Workflow API

------------------------------------------------------------------------------------------

<details>
<summary><code>POST</code> <code><b>uber.cadence.api.v1.WorkflowAPI::DescribeTaskList</b></code></summary>

#### Start a new workflow execution

##### Headers

| name           | example                                           |
|----------------|---------------------------------------------------|
| context-ttl-ms | 2000                                              |
| rpc-caller     | curl-client                                       |
| rpc-service    | cadence-frontend                                  |
| rpc-encoding   | json                                              |
| rpc-procedure  | uber.cadence.api.v1.WorkflowAPI::DescribeTaskList |

##### Example payload

```json
{
  "domain": "sample-domain",
  "taskList": {
    "name": "sample-task-list",
    "kind": 1
  },
  "taskListType": 1,
  "includeTaskListStatus": true
}
```

`taskList` kind is optional.

Task list kinds

| type               | value |
|--------------------|-------|
| TaskListKindNormal | 1     |
| TaskListKindSticky | 2     |

Task list types

| type                 | value |
|----------------------|-------|
| TaskListTypeDecision | 1     |
| TaskListTypeActivity | 2     |

##### Example cURL

```bash
curl -X POST http://0.0.0.0:8800 \
  -H 'context-ttl-ms: 2000' \
  -H 'rpc-caller: curl-client' \
  -H 'rpc-service: cadence-frontend' \
  -H 'rpc-encoding: json' \
  -H 'rpc-procedure: uber.cadence.api.v1.WorkflowAPI::DescribeTaskList' \
  -d \
  '{
    "domain": "sample-domain",
    "taskList": {
    "name": "sample-task-list"
    },
    "taskListType": 1,
    "includeTaskListStatus": true
  }'
```

##### Example successful response

HTTP code: 200

```json
{
  "taskListStatus": {
    "readLevel": "200000",
    "ratePerSecond": 100000,
    "taskIdBlock": {
      "startId": "200001",
      "endId": "300000"
    }
  }
}
```

</details>

------------------------------------------------------------------------------------------

<details>
<summary><code>POST</code> <code><b>uber.cadence.api.v1.WorkflowAPI::StartWorkflowExecution</b></code></summary>

#### Start a new workflow execution

##### Headers

| name           | example                                                 |
|----------------|---------------------------------------------------------|
| context-ttl-ms | 2000                                                    |
| rpc-caller     | curl-client                                             |
| rpc-service    | cadence-frontend                                        |
| rpc-encoding   | json                                                    |
| rpc-procedure  | uber.cadence.api.v1.WorkflowAPI::StartWorkflowExecution |

##### Example payload

```json
{
  "domain": "sample-domain",
  "workflowId": "sample-workflow-id",
  "execution_start_to_close_timeout": "11s",
  "task_start_to_close_timeout": "10s",
  "workflowType": {
    "name": "sample-workflow-type"
  },
  "taskList": {
    "name": "sample-task-list"
  },
  "identity": "client-name-visible-in-history",
  "requestId": "8049B932-6C2F-415A-9BB2-241DCF4CFC9C",
  "input": {
    "data": "IkN1cmwhIg=="
  }
}
```

##### Example cURL

```bash
curl -X POST http://0.0.0.0:8800 \
    -H 'context-ttl-ms: 2000' \
    -H 'rpc-caller: curl-client' \
    -H 'rpc-service: cadence-frontend' \
    -H 'rpc-encoding: json' \
    -H 'rpc-procedure: uber.cadence.api.v1.WorkflowAPI::StartWorkflowExecution' \
    -d \
    '{
      "domain": "sample-domain",
      "workflowId": "sample-workflow-id",
      "execution_start_to_close_timeout": "11s",
      "task_start_to_close_timeout": "10s",
      "workflowType": {
        "name": "sample-workflow-type"
      },
      "taskList": {
        "name": "sample-task-list"
      },
      "identity": "client-name-visible-in-history",
      "requestId": "8049B932-6C2F-415A-9BB2-241DCF4CFC9C",
      "input": {
        "data": "IkN1cmwhIg=="
      }
    }'
```

##### Example successful response

HTTP code: 200

```json
{
  "runId": "cc09d5dd-b2fa-46d8-b426-54c96b12d18f"
}
```

</details>

------------------------------------------------------------------------------------------

<details>
<summary><code>POST</code> <code><b>uber.cadence.api.v1.WorkflowAPI::SignalWorkflowExecution</b></code></summary>

#### Signal a workflow execution

##### Headers

| name           | example                                                  |
|----------------|----------------------------------------------------------|
| context-ttl-ms | 2000                                                     |
| rpc-caller     | curl-client                                              |
| rpc-service    | cadence-frontend                                         |
| rpc-encoding   | json                                                     |
| rpc-procedure  | uber.cadence.api.v1.WorkflowAPI::SignalWorkflowExecution |

##### Example payload

```json
{
  "domain": "sample-domain",
  "workflow_execution": {
    "workflow_id": "sample-workflow-id",
    "run_id": "cc09d5dd-b2fa-46d8-b426-54c96b12d18f"
  },
  "signal_name": "channelA",
  "signal_input": {
    "data": "MTA="
  }
}
```

`run_id` is optional and allows to signal a specific run.

##### Example cURL

```bash
curl -X POST http://0.0.0.0:8800 \
    -H 'context-ttl-ms: 2000' \
    -H 'rpc-caller: curl-client' \
    -H 'rpc-service: cadence-frontend' \
    -H 'rpc-encoding: json' \
    -H 'rpc-procedure: uber.cadence.api.v1.WorkflowAPI::SignalWorkflowExecution' \
    -d \
    '{
      "domain": "sample-domain",
      "workflow_execution": {
        "workflow_id": "sample-workflow-id",
        "run_id": "cc09d5dd-b2fa-46d8-b426-54c96b12d18f"
      },
      "signal_name": "channelA",
      "signal_input": {
        "data": "MTA="
      }
    }'
```

##### Example successful response

HTTP code: 200

```json
{}
```

</details>

------------------------------------------------------------------------------------------
