---
layout: default
title: Golang hello world
permalink: /docs/get-started/golang-hello-world
---

# Golang Hello World
This section provides step-by-step instructions on how to write and run a HelloWorld workflow in Cadence with Golang. You will learn two critical building blocks of Cadence: activities and workflows. First, you will write an activity function that prints a "Hello World!" message in the log. Then, you will write a workflow function that executes this activity. 

## Prerequisite
To successfully run this hello world sample, follow this checklist of setting up Cadence environment
1. Your worker is running properly and you have registered the hello world activity and workflow to the worker
2. Your Cadence server is running (check your background docker container process)
3. You have successfully registered a domain for this workflow

## Step 0. Include Golang cadence-client dependency

To start with Cadence in your Go project, add cadence-client library to your project by running the command:

```bash
go get go.uber.org/cadence
```

## Step 1. Implement HelloWorld Actvity

```go
package main

import (
	"context"
	"time"

	"go.uber.org/cadence/activity"
	"go.uber.org/cadence/workflow"
	"go.uber.org/zap"
)

/**
 * This is the hello world workflow sample.
 */

// helloWorkflow workflow decider
func helloWorldWorkflow(ctx workflow.Context, name string) error {
	ao := workflow.ActivityOptions{
		ScheduleToStartTimeout: time.Minute,
		StartToCloseTimeout:    time.Minute,
		HeartbeatTimeout:       time.Second * 20,
	}
	ctx = workflow.WithActivityOptions(ctx, ao)

	logger := workflow.GetLogger(ctx)
	logger.Info("helloworld workflow started")
	var helloworldResult string
	err := workflow.ExecuteActivity(ctx, helloWorldActivity, name).Get(ctx, &helloworldResult)
	if err != nil {
		logger.Error("Activity failed.", zap.Error(err))
		return err
	}

	logger.Info("Workflow completed.", zap.String("Result", helloworldResult))

	return nil
}

func helloWorldActivity(ctx context.Context, name string) (string, error) {
	logger := activity.GetLogger(ctx)
	logger.Info("helloworld activity started")
	return "Hello " + name + "!", nil
}
```
## Implement Worker
Follow the [worker documentation](/docs/go-client/workers) or the [samples](https://github.com/uber-common/cadence-samples/blob/master/cmd/samples/recipes/helloworld/main.go) to implement the worker.

## Start the Worker and Workflow
Build the worker program with your project. You can follow the way in the [sample](https://github.com/uber-common/cadence-samples).

Then start the worker:
```bash
./bin/helloworld -m worker
```

And start a workflow:
```bash
./bin/helloworld
```

## What is Next
Now you have completed the tutorials. You can continue to explore the key [concepts](/docs/concepts) in Cadence, and also how to use them with [Go Client](/docs/go-client)

For complete, ready to build samples covering all the key Cadence concepts go to [Cadence-Samples](https://github.com/uber-common/cadence-samples) for more examples.

You can also review [Cadence-Client](https://github.com/uber-go/cadence-client/) and [go-docs](https://pkg.go.dev/go.uber.org/cadence) for more documentation.
