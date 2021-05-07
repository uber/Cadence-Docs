---
layout: default
title: Cluster Troubleshooting
permalink: /docs/operation-guide/troubleshooting
---
# Cluster Troubleshooting

This section is to cover some common operation issues as a RunBook. Feel free to add more, or raise issues in the to ask for more in [cadence-docs](https://github.com/uber/cadence-docs/issues) project.Or talk to us in Slack support channel!

We will keep adding more stuff. Any contribution is very welcome.

## Errors
* `Persistence Max QPS Reached for List Operations`
  * Check metrics to see how many List operations are performed per second on the domain. Alternatively you can enable `debug` log level to see more details of how a List request is ratelimited, if it's a staging/QA cluster.
  * Raise the ratelimiting for the domain if you believe the default ratelimit is too low

## Slowness

### API High Latency
* Check persistence API request volume and latency
  * If the request volume aligned with the traffic, consider [scale up the cluster](/docs/operation-guide/maintain/#scale-up-down-cluster)

### Task Processing Slowness
* Check [scale up cluster](/docs/operation-guide/maintain/#scale-up-down-cluster) section
