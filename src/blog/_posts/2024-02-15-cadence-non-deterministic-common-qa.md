---
title: Cadence non-derministic errors common question Q&A (part 1)

date: 2023-08-27
author: Chris Qin
authorlink: https://www.linkedin.com/in/chrisqin0610/
---

We will post a series of common Q&A blogs about Cadence non-deterministic errors to
better help developers understand why they happens and how to troubleshoot at the first place.

#### If I change code logic inside an Cadence activity (for example, my activity is calling database A but now I want it to call database B),  will it trigger an non-deterministic error?

NO. This change will not trigger non-deterministic error.

An Activity is the smallest unit of execution for Cadence and what happens inside activities are not recorded as historical events and therefore will not be replayed. In short, this change is deterministic and it is fine to modify logic inside activities.

#### Does changing the activity parameter count make my workflow non-deterministic?

Yes. This is a very typical non-deterministic error. Say you have an activity definition something like

```Go
func ActivityA(ctx context.Context, paramA int) error
```

Then you have new business requirements and you want to add one more parameter and modify the activity to something like

```Go
func ActivityA(ctx context.Context, paramA, paramB int) error
```

Cadence is expecting to see ActivityA with only one parameter when replaying the events but two parameters are seen. This change is not compatible with history and therefore will trigger a non-deterministic error.

What if you just really want to change the definition of your activity? Consider using versioning your workflow to give Cadence guidance on the specific version of activity your code logic wants to go.
