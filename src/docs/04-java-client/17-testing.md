---
layout: default
title: Testing
permalink: /docs/java-client/testing
---

## Activity Test Environment

[TestActivityEnvironment](https://www.javadoc.io/static/com.uber.cadence/cadence-client/2.7.9-alpha/com/uber/cadence/testing/TestActivityEnvironment.html) is the helper class for unit testing activity implementations. Supports calls to Activity methods from the tested activities. An example test:

```java

   public interface TestActivity {
     String activity1(String input);
   }

   private static class ActivityImpl implements TestActivity {
     @Override
     public String activity1(String input) {
       return Activity.getTask().getActivityType().getName() + "-" + input;
     }
   }

   @Test
   public void testSuccess() {
     testEnvironment.registerActivitiesImplementations(new ActivityImpl());
     TestActivity activity = testEnvironment.newActivityStub(TestActivity.class);
     String result = activity.activity1("input1");
     assertEquals("TestActivity::activity1-input1", result);
   }

```

## Workflow Test Environment
TestWorkflowEnvironment provides workflow unit testing capabilities.

Testing the workflow code is hard as it might be potentially very long running. The included in-memory implementation of the Cadence service supports an automatic time skipping. Anytime a workflow under the test as well as the unit test code are waiting on a timer (or sleep) the internal service time is automatically advanced to the nearest time that unblocks one of the waiting threads. This way a workflow that runs in production for months is unit tested in milliseconds. Here is an example of a test that executes in a few milliseconds instead of over two hours that are needed for the workflow to complete:

```java
public class SignaledWorkflowImpl implements SignaledWorkflow {
  private String signalInput;

  @Override
  public String workflow1(String input) {
    Workflow.sleep(Duration.ofHours(1));
    Workflow.await(() -> signalInput != null);
    Workflow.sleep(Duration.ofHours(1));
    return signalInput + "-" + input;
  }

  @Override
  public void processSignal(String input) {
    signalInput = input;
 }
}

@Test
public void testSignal() throws ExecutionException, InterruptedException {
 TestWorkflowEnvironment testEnvironment = TestWorkflowEnvironment.newInstance();

 // Creates a worker that polls tasks from the service owned by the testEnvironment.
 Worker worker = testEnvironment.newWorker(TASK_LIST);
 worker.registerWorkflowImplementationTypes(SignaledWorkflowImpl.class);
 worker.start();

 // Creates a WorkflowClient that interacts with the server owned by the testEnvironment.
 WorkflowClient client = testEnvironment.newWorkflowClient();
 SignaledWorkflow workflow = client.newWorkflowStub(SignaledWorkflow.class);

 // Starts a workflow execution
 CompletableFuture result = WorkflowClient.execute(workflow::workflow1, "input1");

 // The sleep forwards the service clock for 65 minutes without blocking.
 // This ensures that the signal is sent after the one hour sleep in the workflow code.
 testEnvironment.sleep(Duration.ofMinutes(65));
 workflow.processSignal("signalInput");

 // Blocks until workflow is complete. Workflow sleep forwards clock for one hour and
 // this call returns almost immediately.
 assertEquals("signalInput-input1", result.get());

 // Closes workers and releases in-memory service.
 testEnvironment.close();
}
```
