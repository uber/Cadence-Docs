---
title: How to write your first Cadence workflow in Java

date: 2023-09-17
author: Chris Qin
authorlink: https://www.linkedin.com/in/chrisqin0610/
---

In this blog, we will have a tutorial on how to write your very first Cadence workflow in Java. We have posted the implementation in Golang in a previous blog so check it out [here](./2023-07-16-write-your-first-workflow-with-cadence.md).

Similar to the Go implementation, to finish this tutorial, there are two prerequisites you need to finish first
1. Register a Cadence domain for your worker. For this tutorial, I've already registered a domain named `cadence-samples-domain`
2. Start the Cadence backend server in background.

By end of this tutorial, you should be able to

1. Write a simple Cadence worker in a Java binary
2. Write a Cadence HelloWorld workflow which invokes an activity
3. Interact with the workflow using Cadence CLI

In terms of the hosting technology, the worker can be implemented inside an existing service. For simplicity, we will use Spring Boot, a very popular Java framework for microservice development, to host our worker process. You may bootstrap a starter Spring Boot application [here](https://start.spring.io/). Don't worry about Java version and detailed configurations for now. Pick the one you feel most comfortable but it must be newers than **Java 8**.

### 1. Import Cadence client dependency
We will use Maven as our build system for the SpringBoot application. If you are using Gradle or other build systems, you may check us on Maven central repository [here](https://mvnrepository.com/artifact/com.uber.cadence/cadence-client) and pick the one that fit your own use cases.

First, make sure you have required dependencies in your `pom.xml` file.  For this tutorial, you only need two mandatory dependencies, one for Spring boot web and another is for Cadence client.

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
     </dependency>
    <dependency>
        <groupId>com.uber.cadence</groupId>
        <artifactId>cadence-client</artifactId>
        <version>3.8.1</version>
    </dependency>
</dependencies>
```

After importing these dependencies, try to run the SpringBoot binary on your local to see if you can hit `localhost:8080` on your brower. Also, check the log in your console to make sure your SpringBoot application is running properly. 

### 2. Configure the Cadence client for the worker
For this tutorial, I will structure my Java files as the following organization.

```
-- org.uber.cadence
    -- common
    -- models
    -- worker
    -- workflows
    -- CadenceSamplesApplication.java
```
First let's place the domain and tasklist as constants in the common folder.

```java
package org.uber.cadence.common;

public class Constant {
    public static final String DOMAIN = "cadence-samples-domain";

    public static final String TASK_LIST = "cadence-samples-worker";
}
```

Now let's create new file under the worker folder named `CadenceWorkflowClient.java`. We will write a worker client that polls the Cadence server on gRPC transport. 

```java
package org.uber.cadence.worker;

import com.uber.cadence.client.WorkflowClient;
import com.uber.cadence.client.WorkflowClientOptions;
import com.uber.cadence.internal.compatibility.Thrift2ProtoAdapter;
import com.uber.cadence.internal.compatibility.proto.serviceclient.IGrpcServiceStubs;
import com.uber.cadence.serviceclient.ClientOptions;
import com.uber.cadence.worker.WorkerFactory;

import static org.uber.cadence.common.Constant.DOMAIN;
import static org.uber.cadence.common.Constant.TASK_LIST;

public class CadenceWorkflowClient {
    public static void startCadenceWorker() {
        WorkflowClient workflowClient =
                WorkflowClient.newInstance(
                        new Thrift2ProtoAdapter(
                                IGrpcServiceStubs.newInstance(
                                        ClientOptions.newBuilder()
                                                .setPort(7833)
                                                .build())),
                        WorkflowClientOptions.newBuilder().setDomain(DOMAIN).build());

        // Make workers to poll the task list
        WorkerFactory workerFactory = WorkerFactory.newInstance(workflowClient);
        workerFactory.newWorker(TASK_LIST);
    }
}
```
Now in the `CadencSamplesApplication.java` file, start the worker in `main`.

```java
package org.uber.cadence;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.uber.cadence.worker.CadenceWorkflowClient;

@SpringBootApplication
public class CadenceSamplesApplication {
    public static void main(String[] args) {
        CadenceWorkflowClient.startCadenceWorker();
        SpringApplication.run(CadenceSamplesApplication.class, args);
    }
}
```

Start your SpringBoot application on your local too see if the binary runs properly.

### 3. Write a HelloWorld workflow. 
Let's write our first workflow that takes a JSON message and greet us as output.
First define a simple message in the models.

```java
package org.uber.cadence.models;

public class SampleMessage {
    String message;

    public SampleMessage() {}
    
    public String GetMessage() {
        return this.message;
    }
}
```

Then create a new folder under the workflows folder named `helloworld` and create a new interface file `HelloWorldWorkflow.java`. Define a method called `sayHello` which uses `SampleMessage` in the interface.

```java
package org.uber.cadence.workflows.helloworld;

import com.uber.cadence.workflow.WorkflowMethod;
import org.uber.cadence.models.SampleMessage;

public interface HelloWorldWorkflow {
    @WorkflowMethod(
            executionStartToCloseTimeoutSeconds = 60,
            taskStartToCloseTimeoutSeconds = 60)
    String sayHello(SampleMessage message);
}
```
Implement this interface in a new file in the same folder called `HelloWorldWorkflowImpl.java`

```java
package org.uber.cadence.workflows.helloworld;

import com.uber.cadence.workflow.Workflow;
import org.slf4j.Logger;
import org.uber.cadence.models.SampleMessage;

public class HelloWorldWorkflowImpl implements HelloWorldWorkflow{
    private final Logger logger = Workflow.getLogger(HelloWorldWorkflowImpl.class);
    @Override
    public String sayHello(SampleMessage message) {
        logger.info("executing HelloWorldWorkflow::sayHello");

        String result = "Hello, " + message.GetMessage();
        logger.info("output: " + result);
        return result;
    }
}
```

Don't forget to register this workflow in your worker. Edit the `CadenceWorkflowClient.java` file to register your workflow implementation.
```java
public class CadenceWorkflowClient {
    public static void startCadenceWorker() {
        ...

        // Make workers to poll the task list
        WorkerFactory workerFactory = WorkerFactory.newInstance(workflowClient);
        Worker worker = workerFactory.newWorker(TASK_LIST);
        worker.registerWorkflowImplementationTypes(HelloWorldWorkflowImpl.class);
        workerFactory.start();
    }
}
```

After applying changes above, restart your SprintBoot application.

### 4. Call this workflow using Cadence CLI
Try to run the following CLI on your local to interact with your very first Java workflow.
```bash
cadence --env development --domain cadence-samples-domain workflow start --et 60 --tl cadence-samples-worker --workflow_type HelloWorldWorkflow::sayHello --input '{"message": "uber"}'
```
Check if you see logs in your console as follows
```bash
2023-09-17 12:09:45.643  INFO 36136 --- [  workflow-root] o.u.c.w.h.HelloWorldWorkflowImpl         : executing HelloWorldWorkflow::sayHello
2023-09-17 12:09:45.644  INFO 36136 --- [  workflow-root] o.u.c.w.h.HelloWorldWorkflowImpl         : output: Hello, uber
```

If so, congraluations, you just successfully implemented your first Cadence workflow in Java from scratch. Next, let's introduce an activity to this workflow. 

### 5. Write a HelloWorld activity
Create a new interface file called `HelloWorldActivity.java` in the `helloworld` folder.
```java
package org.uber.cadence.workflows.helloworld;

import com.uber.cadence.activity.ActivityMethod;
import org.uber.cadence.models.SampleMessage;

public interface HelloWorldActivity {
    @ActivityMethod(scheduleToCloseTimeoutSeconds = 60)
    String composeGreeting(SampleMessage message);
}
```
Implement this interface in a seperate class `HelloWorldActivityImpl.java`. 

```java
package org.uber.cadence.workflows.helloworld;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.uber.cadence.models.SampleMessage;

public class HelloWorldActivityImpl implements HelloWorldActivity{
    private final Logger logger = LoggerFactory.getLogger(HelloWorldActivityImpl.class);
    @Override
    public String composeGreeting(SampleMessage message) {
        logger.info("executing HelloWorldActivity");
        return "Hello, " + message.GetMessage();
    }
}
```

Now let's use this activity in the `HelloWorldWorkflow.java` file to make the workflow invoke this activity.

```java
package org.uber.cadence.workflows.helloworld;

import com.uber.cadence.workflow.Workflow;
import org.slf4j.Logger;
import org.uber.cadence.models.SampleMessage;

public class HelloWorldWorkflowImpl implements HelloWorldWorkflow{
    private final Logger logger = Workflow.getLogger(HelloWorldWorkflowImpl.class);

    private final HelloWorldActivity helloWorldActivity = Workflow.newActivityStub(HelloWorldActivity.class);
    @Override
    public String sayHello(SampleMessage message) {
        logger.info("executing HelloWorldWorkflow::sayHello");

        String result = helloWorldActivity.composeGreeting(message);
        logger.info("output: " + result);
        return result;
    }
}

```
Please note that we are importing the interface rather than the implementation class into this file.
Also don't forget to register this activity into the worker client.
```java
public class CadenceWorkflowClient {
    public static void startCadenceWorker() {
        ...
        worker.registerWorkflowImplementationTypes(HelloWorldWorkflowImpl.class);
        worker.registerActivitiesImplementations(new HelloWorldActivityImpl());
        workerFactory.start();
    }
}
```
Restart the SpringBoot application and rerun the same CLI above. You should see one more log from the activity.
```bash
2023-09-17 12:26:29.354  INFO 36779 --- [  workflow-root] o.u.c.w.h.HelloWorldWorkflowImpl         : executing HelloWorldWorkflow::sayHello
2023-09-17 12:26:29.415  INFO 36779 --- [ples-domain": 1] o.u.c.w.h.HelloWorldActivityImpl         : executing HelloWorldActivity
2023-09-17 12:26:29.460  INFO 36779 --- [  workflow-root] o.u.c.w.h.HelloWorldWorkflowImpl         : output: Hello, uber
```

Hooray! You just finish the tutorial on Cadence workflow in Java from scratch. 

### Bonus point
For a bonus point, you may check your workflow history at `localhost:8088` on your browser. The Cadence backend server provides a nice UI to inspect your workflow histories. 





