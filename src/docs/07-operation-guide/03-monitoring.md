---
layout: default
title: Cluster Monitoring
permalink: /docs/operation-guide/monitor
---

# Cluster Monitoring

## Instructions

Cadence emits metrics for both Server and client libraries:

* Follow this example to emit [client side metrics for Golang client](https://github.com/uber-common/cadence-samples/pull/36).

* Follow this example to emit [client side metrics for Java client](https://github.com/uber/cadence-java-samples/pull/44/files#diff-573f38d2aa3389b6704ede52eafb46a67d9aad2b478788eb4ccc3819958a405f). Make sure you use v3.0.0 and above.

* For running Cadence services in production, please follow this [example of hemlchart](https://github.com/banzaicloud/banzai-charts/blob/master/cadence/templates/server-service-monitor.yaml) to emit server side metrics. Or you can follow [the example of local environment](https://github.com/uber/cadence/blob/master/config/development_prometheus.yaml#L40) to Prometheus. All services need to expose a HTTP port to provide metircs like below

```yaml
metrics:
  prometheus:
    timerType: "histogram"
    listenAddress: "0.0.0.0:8001"
```

The rest of the instruction uses local environment as an example.

For testing local server emitting metrics to Promethues, the easiest way is to use [docker-compose](https://github.com/uber/cadence/blob/master/docker/) to start a local Cadence instance.

Make sure to update the `prometheus_config.yml` to add "host.docker.internal:9098" to the scrape list before starting the docker-compose:
```yaml
global:
  scrape_interval: 5s
  external_labels:
    monitor: 'cadence-monitor'
scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: # addresses to scrape
          - 'cadence:9090'
          - 'cadence:8000'
          - 'cadence:8001'
          - 'cadence:8002'
          - 'cadence:8003'
          - 'host.docker.internal:9098'
```

Note: `host.docker.internal` [may not work for some docker versions](https://docs.docker.com/docker-for-mac/networking/#use-cases-and-workarounds)

* After updating the prometheus_config.yaml as above, run `docker-compose up` to start the local Cadence instance

* Go the the sample repo, build the helloworld sample `make helloworld` and run the worker `./bin/helloworld -m worker`, and then in another Shell start a workflow `./bin/helloworld`

* Go to your [local Prometheus dashboard](http://localhost:9090/), you should be able to check the metrics emitted by handler from client/frontend/matching/history/sysWorker and confirm your services are healthy through [targets](http://localhost:9090/targets)
<img width="1192" alt="Screen Shot 2021-02-20 at 11 31 11 AM" src="https://user-images.githubusercontent.com/4523955/108606555-8d0dfb80-736f-11eb-968d-7678df37455c.png">


* Go to [local Grafana](http://localhost:3000) , login as `admin/admin`.
* Configure Prometheus as datasource: use `http://host.docker.internal:9090` as URL of prometheus.
* Import the [Grafana dashboard tempalte](/docs/operation-guide/monitor/#grafana-dashboard-templates) as JSON files.

Client side dashboard looks like this:
<img width="1513" alt="Screen Shot 2021-02-20 at 12 32 23 PM" src="https://user-images.githubusercontent.com/4523955/108607838-b7fc4d80-7377-11eb-8fd9-edc0e58afaad.png">

And server basic dashboard:
<img width="1514" alt="Screen Shot 2021-02-20 at 12 31 54 PM" src="https://user-images.githubusercontent.com/4523955/108607843-baf73e00-7377-11eb-9759-e67a1a00f442.png">


<img width="1519" alt="Screen Shot 2021-02-20 at 11 06 54 AM" src="https://user-images.githubusercontent.com/4523955/108606577-b169d800-736f-11eb-8fcb-88801f23b656.png">


## DataDog dashboard templates

This [package](https://github.com/uber/cadence-docs/tree/master/src/datadog) contains examples of Cadence dashboards with DataDog.

* `Cadence-Client` is the dashboard that includes all the metrics to help you understand Cadence client behavior. Most of these metrics are emitted by the client SDKs, with a few exceptions from server side (for example, workflow timeout).

* `Cadence-Server` is the the server dashboard that you can use to monitor and undertand the health and status of your Cadence cluster.

To use DataDog with Cadence, follow [this instruction](https://docs.datadoghq.com/integrations/guide/prometheus-metrics/) to collect Prometheus metrics using DataDog agent.

## Grafana+Prometheus dashboard templates

This [package](https://github.com/uber/cadence-docs/tree/master/src/grafana/prometheus) contains examples of Cadence dashboards with Prometheus.

* `Cadence-Client` is the dashboard of client metrics, and a few server side metrics that belong to client side but have to be emitted by server(for example, workflow timeout).

* `Cadence-Server-Basic` is the the basic server dashboard to monitor/navigate the health/status of a Cadence cluster.

* Apart from the basic server dashboard, it's recommended to set up dashboards on different components for Cadence server: Frontend, History, Matching, Worker, Persistence, Archival, etc. Any [contribution](https://github.com/uber/cadence-docs) is always welcome to enrich the existing templates or new templates!


## Periodic tests(Canary) for health check

It's recommended that you run periodical test to get signals on the healthness of your cluster. Please following instructions in [our canary package](https://github.com/uber/cadence/tree/master/canary) to set these tests up.

## Server monitoring details
This section describes recommended dashboards for monitoring Cadence services in your cluster. The structure mostly follows the DataDog dashboard template listed above.

### Service Availability(server metrics)
* Meaning: the availability of Cadence server using server metrics.  
* Suggested monitor: below 95% > 5 min then alert, below 99% for > 5 min triggers a warning
* Monitor action: When fired, check if there is any persistence errors.  If so then check the healthness of the database(may need to restart or scale up). If not then check the error logs.
* Datadog query example
```
sum:cadence_frontend.cadence_errors{$env,$Availability_Zone}
sum:cadence_frontend.cadence_requests{$env,$Availability_Zone}
(1 - a / b) * 100
```

### StartWorkflow Per Second
* Meaning: how many workflows are started per second. This helps determine if your server is overloaded.
* Suggested monitor: This is a business metrics. No monitoring required.
* Datadog query example
```
sum:cadence_frontend.cadence_requests{$env AND $Availability_Zone AND (operation IN (startworkflowexecution,signalwithstartworkflowexecution))} by {operation}.as_rate()
```

### Activities Started Per Second
* Meaning: How many activities are started per second. Helps determine if the server is overloaded.
* Suggested monitor: This is a business metrics. No monitoring required.
* Datadog query example
```
sum:cadence_frontend.cadence_requests{$env,$Availability_Zone,operation:pollforactivitytask} by {operation}.as_rate()
```

### Decisions Started Per Second
* Meaning: How many workflow decisions are started per second. Helps determine if the server is overloaded.
* Suggested monitor: This is a business metrics. No monitoring required.
* Datadog query example
```
sum:cadence_frontend.cadence_requests{$env,$Availability_Zone,operation:pollforactivitytask} by {operation}.as_rate()
```

### Periodical Test Suite Success(aka Canary)
* Meaning: The success counter of canary test suite
* Suggested monitor: Monitor needed. If fired, look at the failed canary test case and investigate the reason of failure.
* Datadog query example
```
sum:cadence_history.workflow_success{workflowtype:workflow_sanity,$env} by {workflowtype}.as_count()
```

### Frontend all API per second
* Meaning: all API on frontend per second. Information only.
* Suggested monitor: This is a business metrics. No monitoring required.
* Datadog query example
```
sum:cadence_frontend.cadence_requests{$env,$Availability_Zone}.as_rate()
```

### Frontend API per second (breakdown per operation)
* Meaning: API on frontend per second. Information only.
* Suggested monitor: This is a business metrics. No monitoring required.
* Datadog query example
```
sum:cadence_frontend.cadence_requests{$env,$Availability_Zone} by {operation}.as_rate()
```

### Frontend API errors per second(breakdown per operation)
* Meaning: API error on frontend per second. Information only.
* Suggested monitor: This is to facilitate investigation. No monitoring required.  
* Datadog query example
```
sum:cadence_frontend.cadence_errors{$env,$Availability_Zone} by {operation}.as_rate()  : internal service errors
sum:cadence_frontend.cadence_errors_*{$env,$Availability_Zone} by {operation}.as_rate()  : client side errors
```
* [TODO](https://github.com/uber/cadence/issues/4572)

### Frontend Regular API Latency
* Meaning: The latency of regular core API -- excluding long-poll/queryWorkflow/getHistory/ListWorkflow/CountWorkflow API.
* Suggested monitor: 95% of all apis and of all operations that take over 1.5 seconds triggers a warning,  over 2 seconds triggers an alert
* Monitor action: If fired, investigate the database read/write latency. May need to throttle some spiky traffic from certain domains, or scale up the database
* Datadog query example
```
avg:cadence_frontend.cadence_latency.quantile{(operation NOT IN (pollfordecisiontask,pollforactivitytask,getworkflowexecutionhistory,queryworkflow,listworkflowexecutions,listclosedworkflowexecutions,listopenworkflowexecutions)) AND $env AND $Availability_Zone AND $pXXLatency} by {operation}
```

### Frontend ListWorkflow API Latency
* Meaning: The latency of ListWorkflow API.
* Monitor: 95% of all apis and of all operations that take over 2 seconds triggers a warning,  over 3 seconds triggers an alert
* Monitor action: If fired, investigate the ElasticSearch read latency. May need to throttle some spiky traffic from certain domains, or scale up ElasticSearch cluster.
* Datadog query example
```
avg:cadence_frontend.cadence_latency.quantile{(operation IN (listclosedworkflowexecutions,listopenworkflowexecutions,listworkflowexecutions,countworkflowexecutions)) AND $env AND $Availability_Zone AND $pXXLatency} by {operation}
```

### Frontend Long Poll API Latency
* Meaning: Long poll means that the worker is waiting for a task. The latency is an Indicator for how busy the worker is. Poll for activity task and poll for decision task are the types of long poll requests.The api call times out at 50 seconds if no task can be picked up.A very low latency could mean that more workers need to be added.
* Suggested monitor: No monitor needed as long latency is expected.
* Datadog query example
```
avg:cadence_frontend.cadence_latency.quantile{$env,$Availability_Zone,$pXXLatency,operation:pollforactivitytask} by {operation}
avg:cadence_frontend.cadence_latency.quantile{$env,$Availability_Zone,$pXXLatency,operation:pollfordecisiontask} by {operation}
```

### Frontend Get History/Query Workflow API Latency
* Meaning: GetHistory API acts like a long poll api, but there’s no explicit timeout. Long-poll of GetHistory is being used when WorkflowClient is waiting for the result of the workflow(essentially, WorkflowExecutionCompletedEvent).
This latency depends on the time it takes for the workflow to complete. QueryWorkflow API latency is also unpredictable as it depends on the availability and performance of workflow workers, which are owned by the application and workflow implementation(may require replaying history).
* Suggested monitor: No monitor needed
* Datadog query example
```
avg:cadence_frontend.cadence_latency.quantile{(operation IN (getworkflowexecutionhistory,queryworkflow)) AND $env AND $Availability_Zone AND $pXXLatency} by {operation}
```

### Frontend WorkflowClient API per seconds by domain
* Meaning: Shows which domains are making the most requests using WorkflowClient(excluding worker API like PollForDecisionTask and RespondDecisionTaskCompleted). Used for troubleshooting.
In the future it can be used to set some rate limiting per domain.
* Suggested monitor: No monitor needed.
* Datadog query example
```
sum:cadence_frontend.cadence_requests{(operation IN (signalwithstartworkflowexecution,signalworkflowexecution,startworkflowexecution,terminateworkflowexecution,resetworkflowexecution,requestcancelworkflowexecution,listworkflowexecutions)) AND $env AND $Availability_Zone} by {domain,operation}.as_rate()
```
