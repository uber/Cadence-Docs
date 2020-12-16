---
layout: default
title: Worker service
permalink: /docs/operation-guide/setup
---

# Cluster Setup

This section will help to understand what you need for setting up a Cadence cluster.

Obviously, you need Cadence’s dependency --- a database and ElastiCache(if you need Advanced visibility feature), and metric server. But you also need to understand lots of config options in Cadence server. There are two main types of configs in Cadence server, static config and dynamic config.

## Cadence server configuration

### Static configs

There are lots of configs in Cadence. Usually the default values or the recommended values in development.yaml should be good to go. Here are the most basic configuration that you should understand.


|Config name|Explanation|Recommended value|
| --------- | --------- | ----------------- |
| numHistoryShards | This is the most important one in Cadence config.It will be a fixed number in the cluster forever. The only way to change it is to migrate to another cluster. Refer to Migrate cluster section. <br/>   <br/> Some facts about it: <br/> 1. Each workflow will be mapped to a single shard. Within a shard, all the workflow creation/updates are serialized.  <br/> 2. Each shard will be assigned to only one History node to own the shard, using a Consistent Hashing Ring. Each shard will consume a small amount of memory/CPU to do background processing. Therefore, a single History node cannot own too many shards. You may need to figure out a good number range based on your instance size(memory/CPU).  <br/> 3. Also, you can’t add an infinite number of nodes to a cluster because this config is fixed. When the number of History nodes is closed or equal to numHistoryShards, there will be some History nodes that have no shards assigned to it. This will be wasting resources.   <br/> <br/> Based on above, you don’t want to have a small number of shards which will limit the maximum size of your cluster. You also don’t want to have a too big number, which will require you to have a quite big initial size of the cluster.  <br/>  Also, typically a production cluster will start with a smaller number and then we add more nodes/hosts to it. But to keep high availability, it’s recommended to use at least 4 nodes for each service(Frontend/History/Matching) at the beginning.  | 1K~16K depending on the size ranges of the cluster you expect to run, and the instance size. |
| aa | bb | cc |
| aa | bb | cc |
| aa | bb | cc |
| aa | bb | cc |
| aa | bb | cc |
| aa | bb | cc |
| aa | bb | cc |
