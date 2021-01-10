---
layout: default
title: Worker service
permalink: /docs/go-client/workers
---

# Worker service

A :worker: or *:worker: service* is a service that hosts the :workflow: and :activity: implementations. The :worker: polls the *Cadence service* for :task:tasks:, performs those :task:tasks:, and communicates :task: execution results back to the *Cadence service*. :worker:Worker: services are developed, deployed, and operated by Cadence customers.

You can run a Cadence :worker: in a new or an existing service. Use the framework APIs to start the Cadence :worker: and link in all :activity: and :workflow: implementations that you require the service to execute.

```java
Worker.Factory factory = new Worker.Factory(DOMAIN,
            new Worker.FactoryOptions.Builder()
                    .setMaxWorkflowThreadCount(1000)
                    .setCacheMaximumSize(100)
                    .setDisableStickyExecution(false)
                    .build());
    Worker worker = factory.newWorker(TASK_LIST,
            new WorkerOptions.Builder()
                    .setMaxConcurrentActivityExecutionSize(100)
                    .setMaxConcurrentWorkflowExecutionSize(100)
                    .build());
    // Workflows are stateful. So you need a type to create instances.
    worker.registerWorkflowImplementationTypes(GreetingWorkflowImpl.class);
    // Activities are stateless and thread safe. So a shared instance is used.
    worker.registerActivitiesImplementations(new GreetingActivitiesImpl());
    // Start listening to the workflow and activity task lists.
    factory.start();
```
