---
title: Introduction to Cadence Signals

date: 2023-08-06
author: Chris Qin
authorlink: https://www.linkedin.com/in/chrisqin0610/
---

In this blog, we will have a brief overview of Cadence signals, a critical feature that provides a way to directly send data to a running workflow. 

In previous blogs, we have gone through on how to implement a simple HelloWorld workflow, which takes a single string as workflow input and executes another activity to obtain the output. In that, you’ve learned two options to pass data to a workflow

* Via start parameters
* From return values of activities

There are some limitations on these two options. For start parameters, it can only be passed before workflow execution begins. After the execution is kicked off, there is no way for us to change the input parameters. For activity return values, we can not directly pass value to them. They may come from another third party application at runtime. 

Therefore, we will need a way to interact with the workflow without changing the input parameters or manipulating with activity return values, which may introduce unexpected complications. With Cadence signals, you may provide data asynchronously to your running workflow. 

Using signals is very straightforward. In general, you just need to specify the type definition of your signal payload and the name of your signal. In the following example, the workflow first takes a single input parameter name. Then it keeps listening to a signal called greeting to which you should pass your payload. 

```Go
func SignalGreeterWorkflow(ctx workflow.Context, name string) error {
   logger := workflow.GetLogger(ctx)
   logger.Info("Started BasicSignalHelloWorldWorkflow")
   for {
     s := workflow.NewSelector(ctx)
     s.AddReceive(workflow.GetSignalChannel(ctx, "greeting"), func(c      workflow.Channel, ok bool) {
     if ok {
        var greeting string
        c.Receive(ctx, &greeting)
        greetingMsg := fmt.Sprintf("%s %s!", greeting, name)
        logger.Info("Received signal on greeting channel.",     zap.String("Greeting", greetingMsg))
 }
})
s.Select(ctx)
```

Use the following cli to start the workflow. Note that we specify the workflow id for this command, but you don’t necessarily need to do so if you use the workflow id produced by default.

```bash
cadence --env development --domain cadence-samples-domain workflow start --workflow_type cadence_samples.SignalGreeterWorkflow --et 6000 --tl cadence-samples-worker --workflow_id test_id_1 --input '"Uber"'
```

Then run the following command to pass a greeting message to this running workflow.
```bash
cadence --env development --domain cadence-samples-domain workflow signal --workflow_id test_id_1 --name greeting --input '"Hello"'
```


You should see a log with greeting message
```bash
2023-07-23T20:02:37.423-0700    INFO    signal_sample/signal_workflow.go:21     Received signal on greeting channel.    {"Domain": "cadence-samples-domain", "TaskList": "cadence-samples-worker", "WorkerID": "23983@uber-C02F18EQMD6R@cadence-samples-worker@be20b54c-9415-41f5-8db7-6d6aca68478e", "WorkflowType": "cadence_samples.SignalGreeterWorkflow", "WorkflowID": "test_id_1", "RunID": "01fd3901-3acd-467e-81c0-1a9dc8c146d1", "Greeting": "Hello Uber!"}
```


Let’s give the signal a different greeting message this time
```bash
cadence --env development --domain cadence-samples-domain workflow signal --workflow_id test_id_1 --name greeting --input '"Hi"
```

```bash
2023-07-23T20:04:08.651-0700    INFO    signal_sample/signal_workflow.go:21     Received signal on greeting channel.    {"Domain": "cadence-samples-domain", "TaskList": "cadence-samples-worker", "WorkerID": "23983@uber-C02F18EQMD6R@cadence-samples-worker@be20b54c-9415-41f5-8db7-6d6aca68478e", "WorkflowType": "cadence_samples.SignalGreeterWorkflow", "WorkflowID": "test_id_1", "RunID": "01fd3901-3acd-467e-81c0-1a9dc8c146d1", "Greeting": "Hi Uber!"}
```
