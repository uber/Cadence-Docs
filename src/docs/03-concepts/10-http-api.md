---
layout: default
title: HTTP API
permalink: /docs/concepts/http-api
---

# Using HTTP API
Cadence allows you to interact with server using HTTP API. What does it mean?  HTTP/JSON communication is a versatile way to interact with servers. For Cadence, it means you can expose a list of RPC methods to be invoked using HTTP protocol. This opens possibilities to interact with Cadence server using any programming language with HTTP support. This can be used to start or terminate workflows from your bash scripts, observe cluster status or invoke any other operation supported by Cadence RPC declaration. 

 

## Setup 

Updating Cadence configuration files 

To enable “start workflow” HTTP API, add http section to Cadence RPC configuration settings: 

```yaml
services: 
  frontend: 
    rpc: 
      <...> 
      http: 
        port: 8808 
        procedures: 
          - uber.cadence.api.v1.WorkflowAPI::StartWorkflowExecution 
```


 

## Using “docker run” command 

Refer to instructions described here: https://github.com/uber/cadence/tree/master/docker#using-docker-image-for-production 

Additionally add two more environment variables: 
```bash
docker run
<...>
    -e FRONTEND_HTTP_PORT=8808                          -- HTTP PORT TO LISTEN 
    -e FRONTEND_HTTP_PROCEDURES=uber.cadence.api.v1.WorkflowAPI::StartWorkflowExecution  -- List of API methods exposed
    ubercadence/server:<tag> 
```


 

## Using docker-compose 

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
   - "8808:8808" 
  environment: 
    - "CASSANDRA_SEEDS=cassandra" 
    - "PROMETHEUS_ENDPOINT_0=0.0.0.0:8000" 
    - "PROMETHEUS_ENDPOINT_1=0.0.0.0:8001" 
    - "PROMETHEUS_ENDPOINT_2=0.0.0.0:8002" 
    - "PROMETHEUS_ENDPOINT_3=0.0.0.0:8003" 
    - "DYNAMIC_CONFIG_FILE_PATH=config/dynamicconfig/development.yaml" 
    - "FRONTEND_HTTP_PORT=8808" 
    - "FRONTEND_HTTP_PROCEDURES=uber.cadence.api.v1.WorkflowAPI::StartWorkflowExecution" 
```


 

## Using HTTP API 

Start a workflow using curl command 

```bash
 $ curl  http://0.0.0.0:8808   -H 'context-ttl-ms: 2000' \ 
      -H 'rpc-caller: rpc-client-name' \ 
      -H 'rpc-service: cadence-frontend' \ 
      -H 'rpc-encoding: json' \ 
      -H 'rpc-procedure: uber.cadence.api.v1.WorkflowAPI::StartWorkflowExecution' \ 
      -X POST --data @data.json 
```


 Where data.json content looks something like this: 
```json
{
  "domain": "samples-domain", 
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
curl http://0.0.0.0:8808 \ 
  -H 'context-ttl-ms: 2000' \ 
  -H 'rpc-caller: curl-client' \ 
  -H 'rpc-service: cadence-frontend' \ 
  -H 'rpc-encoding: json' \ 
  -H 'rpc-procedure: uber.cadence.admin.v1.AdminAPI::DescribeCluster' \ 
  -X POST 
```

 ## Reference

<table>
<tr>
<td> Procedure </td> <td> Example </td>
</tr>
<tr>
<td>
uber.cadence.api.v1.WorkflowAPI::StartWorkflowExecution
</td>
<td>

```bash
curl http://0.0.0.0:8800 -H 'context-ttl-ms: 2000' -H 'rpc-caller: hello-client'  -H 'rpc-service: cadence-frontend' -H 'rpc-encoding: json'  -H 'rpc-procedure: uber.cadence.api.v1.WorkflowAPI::StartWorkflowExecution'  -X POST -d '{ 
  "domain":"samples-domain", 
  "workflowId":"helloWorldGroup", 
  "execution_start_to_close_timeout": "11s", 
  "task_start_to_close_timeout": "10s", 
  "workflowType":{"name":"helloWorldWorkflow"}, 
  "taskList":{"name":"helloWorldGroup"}, 
  "identity": "client-name-visible-in-history", 
  "requestId": "8049B932-6C2F-415A-9BB2-241DCF4CFC9C", 
  "input": {"data":"IkN1cmwhIg=="} 
}' 

{"runId":"3b448520-70aa-464f-ad8d-b8fcabf13628"}% 
```

</td>
</tr>
<tr>
<td>
uber.cadence.api.v1.WorkflowAPI::SignalWorkflowExecution
</td>
<td>

```bash
curl http://0.0.0.0:8800 -H 'context-ttl-ms: 2000' -H 'rpc-caller: curl-client'  -H 'rpc-service: cadence-frontend' -H 'rpc-encoding: json'  -H 'rpc-procedure: uber.cadence.api.v1.WorkflowAPI::SignalWorkflowExecution'  -X POST -d '{ 
  "domain":"samples-domain", 
  "workflow_execution": { 
    "workflow_id": "long_running_signal_waiting", 
    "run_id": "44eb0ca6-e929-442b-9587-390689232541" <- optional, allows to signal a specific run 
  }, 
  "signal_name":"channelA", 
  "signal_input":{"data":"MTA="} 
}' 
```

</td>
</tr>
</table>