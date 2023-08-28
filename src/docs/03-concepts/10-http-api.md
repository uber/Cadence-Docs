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
docker run -e CASSANDRA_SEEDS=10.x.x.x                  -- csv of cassandra server ipaddrs 
    -e CASSANDRA_USER=<username>                        -- Cassandra username 
    -e CASSANDRA_PASSWORD=<password>                    -- Cassandra password 
    -e KEYSPACE=<keyspace>                              -- Cassandra keyspace 
    -e VISIBILITY_KEYSPACE=<visibility_keyspace>        -- Cassandra visibility keyspace, if using basic visibility  
    -e KAFKA_SEEDS=10.x.x.x                             -- Kafka broker seed, if using ElasticSearch + Kafka for advanced visibility feature 
    -e CASSANDRA_PROTO_VERSION=<protocol_version>       -- Cassandra protocol version 
    -e ES_SEEDS=10.x.x.x                                -- ElasticSearch seed , if using ElasticSearch + Kafka for advanced visibility feature 
    -e RINGPOP_SEEDS=10.x.x.x,10.x.x.x                  -- csv of ipaddrs for gossip bootstrap 
    -e STATSD_ENDPOINT=10.x.x.x:8125                    -- statsd server endpoint 
    -e NUM_HISTORY_SHARDS=1024                          -- Number of history shards 
    -e SERVICES=history,matching                        -- Spinup only the provided services, separated by commas, options are frontend,history,matching and worker 
    -e LOG_LEVEL=debug,info                             -- Logging level 
    -e DYNAMIC_CONFIG_FILE_PATH=<dynamic_config_file>   -- Dynamic config file to be watched 

    -e FRONTEND_HTTP_PORT=8808                          -- HTTP PORT TO LISTEN 

    -e FRONTEND_HTTP_PROCEDURES=uber.cadence.api.v1.WorkflowAPI::StartWorkflowExecution 

    ubercadence/server:<tag> 
```


 

Using docker-compose 

Add HTTP environment variables to docker/docker-compose.yml configuration: 

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

 

Using HTTP API 

Start a workflow using curl command 

 $ curl  http://0.0.0.0:8808   -H 'context-ttl-ms: 2000' \ 

      -H 'rpc-caller: rpc-client-name' \ 

      -H 'rpc-service: cadence-frontend' \ 

      -H 'rpc-encoding: json' \ 

      -H 'rpc-procedure: uber.cadence.api.v1.WorkflowAPI::StartWorkflowExecution' \ 

      -X POST --data @data.json 

 

 Where data.json content looks something like this: 

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

 

 

Describe a cluster using curl command 

curl http://0.0.0.0:8808 \ 

  -H 'context-ttl-ms: 2000' \ 

  -H 'rpc-caller: curl-client' \ 

  -H 'rpc-service: cadence-frontend' \ 

  -H 'rpc-encoding: json' \ 

  -H 'rpc-procedure: uber.cadence.admin.v1.AdminAPI::DescribeCluster' \ 

    -X POST 

 