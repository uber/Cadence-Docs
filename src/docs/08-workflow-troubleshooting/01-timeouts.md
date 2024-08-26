---
layout: default
title: Timeouts
permalink: /docs/workflow-troubleshooting/timeouts
---

#  Timeouts

## Missing Pollers

Cadence workers are part of the service that hosts and executes the workflow. They are of two types: activity worker and workflow worker. Each of these workers are responsible for having pollers which are go-routines that poll for activity tasks and decision tasks respectively from the Cadence server. Without pollers, the workflow cannot proceed with the execution.

Mitigation: Make sure these workers are configured with the task lists that are used in the workflow and activities so the server can dispatch tasks to the cadence workers.

[Worker setup example](https://github.com/uber-common/cadence-samples/blob/master/cmd/samples/pageflow/main.go#L18)

## Tasklist backlog despite having pollers

If a tasklist has pollers but the backlog continues to grow then it is a supply-demand issue. The workflow is growing faster than what the workers can handle. The server wants to dispatch more tasks to the workers but they are not able to keep up.

Mitigation: Increase the number of cadence workers by horizontally scaling up the instances where the workflow is running.

Optionally you can also increase the number of pollers per worker by providing this via worker options.

[Link to options in go client](https://pkg.go.dev/go.uber.org/cadence@v1.2.9/internal#WorkerOptions)
[Link to options in java client](https://github.com/uber/cadence-java-client/blob/master/src/main/java/com/uber/cadence/internal/worker/PollerOptions.java#L124)

## Timeouts without heartbeating enabled

Activities time out StartToClose or ScheduleToClose if the activity took longer than the configured timeout.

[Link to description of timeouts](https://cadenceworkflow.io/docs/concepts/activities/#timeouts)

For long running activities, while the activity is executing, the worker can die due to regular deployments or host restarts or failures. Cadence doesn't know about this and will wait for  StartToClose or ScheduleToClose timeouts to kick in.

Mitigation: Consider enabling heartbeating

[Configuring heartbeat timeout example](https://github.com/uber-common/cadence-samples/blob/df6f7bdba978d6565ad78e9f86d9cd31dfac9f78/cmd/samples/expense/workflow.go#L23)

For short running activities, heart beating is not required but maybe consider increasing the timeout value to suit the actual activity execution time.

## Heartbeat Timeouts after enabling heartbeating

Activity has enabled heart beating but the activity timed out with heart beat timeout. This is because the server did not receive a heart beat in the time interval configured as the heart beat timeout.

Mitigation: Once heartbeat timeout is configured in activity options, you need to make sure the activity periodically sends a heart beat to the server to make sure the server is aware of the activity being alive.

[Example to send periodic heart beat](https://github.com/uber-common/cadence-samples/blob/df6f7bdba978d6565ad78e9f86d9cd31dfac9f78/cmd/samples/fileprocessing/activities.go#L111)

In go client, there is an option to register the activity with auto heart beating so that it is done automatically

[Enabling auto heart beat during activity registration example](https://pkg.go.dev/go.uber.org/cadence@v1.2.9/internal#WorkerOptions)
