---
layout: default
title: Server Installation
permalink: /docs/get-started/installation
---

# Install Cadence Service Locally

## Install docker

Follow the Docker installation instructions found here: [https://docs.docker.com/engine/installation/](https://docs.docker.com/engine/installation/)

## Run Cadence Server Using Docker Compose

Download the Cadence docker-compose file:
```bash

> curl -O https://raw.githubusercontent.com/uber/cadence/master/docker/docker-compose.yml && curl -O https://raw.githubusercontent.com/uber/cadence/master/docker/prometheus/prometheus.yml

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1264  100  1264    0     0   4461      0 --:--:-- --:--:-- --:--:--  4698
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    14  100    14    0     0     71      0 --:--:-- --:--:-- --:--:--    76
> ls
docker-compose.yml      prometheus
```
Start Cadence Service:
```bash
> docker-compose up
Creating network "quick_start_default" with the default driver
Pulling cadence (ubercadence/server:0.5.8)...
0.5.8: Pulling from ubercadence/server
db0035920883: Pull complete
...
...
27ec3755f89c: Pull complete
0a5d2a29a5e5: Pull complete
Creating quick_start_statsd_1    ... done
Creating quick_start_cassandra_1 ... done
Creating quick_start_cadence_1   ... done
Creating quick_start_cadence-web_1 ... done
Attaching to quick_start_cassandra_1, quick_start_statsd_1, quick_start_cadence_1, quick_start_cadence-web_1
statsd_1       | *** Running /etc/my_init.d/00_regen_ssh_host_keys.sh...
statsd_1       | *** Running /etc/my_init.d/01_conf_init.sh...
cadence_1      | + CADENCE_HOME=/cadence
cadence_1      | + DB=cassandra
...
...
...
cadence_1      | {"level":"info","ts":"2019-06-06T15:26:38.199Z","msg":"Get dynamic config","name":"matching.longPollExpirationInterval","value":"1m0s","default-value":"1m0s","logging-call-at":"config.go:57"}
cadence_1      | {"level":"info","ts":"2019-06-06T15:26:38.199Z","msg":"Get dynamic config","name":"matching.updateAckInterval","value":"1m0s","default-value":"1m0s","logging-call-at":"config.go:57"}
...
...
cadence_1      | {"level":"info","ts":"2019-06-06T15:27:24.905Z","msg":"Get dynamic config","name":"history.timerProcessorCompleteTimerFailureRetryCount","value":"10","default-value":"10","logging-call-at":"config.go:57"}
```
## Register a Domain Using the CLI
From a different console window:
```bash
> docker run --network=host --rm ubercadence/cli:master --do test-domain domain register -rd 1
Unable to find image 'ubercadence/cli:master' locally
master: Pulling from ubercadence/cli
22dc81ace0ea: Pull complete
...
...
da2cfe74be81: Pull complete
5320bde81c0c: Pull complete
Digest: sha256:f5e5e708347909c8d3f74c47878b201d91606994394e94eaede9a80e3b9f077b
Status: Downloaded newer image for ubercadence/cli:master
Domain test-domain successfully registered.
>
```
Check that the domain is indeed registered:
```bash
> docker run --network=host --rm ubercadence/cli:master --do test-domain domain describe
Name: test-domain
Description:
OwnerEmail:
DomainData: map[]
Status: REGISTERED
RetentionInDays: 1
EmitMetrics: false
ActiveClusterName: active
Clusters: active
ArchivalStatus: DISABLED
Bad binaries to reset:
+-----------------+----------+------------+--------+
| BINARY CHECKSUM | OPERATOR | START TIME | REASON |
+-----------------+----------+------------+--------+
+-----------------+----------+------------+--------+
>
```

## Troubleshooting 
There can be various reasons that `docker-compose up` cannot succeed:
* In case of the image being too old, update the docker image by `docker pull ubercadence/server:master-auto-setup` and retry
* In case of the local docker env is messed up: `docker system prune --all` and retry (see [details about it](https://docs.docker.com/config/pruning/) )
* See logs of different container:
  * If Cassandra is not able to get up: `docker logs -f docker_cassandra_1` 
  * If Cadence is not able to get up: `docker logs -f docker_cadence_1`
  * If Cadence Web is not able to get up: `docker logs -f docker_cadence-web_1`

If the above is still not working, [open an issue in Server(main) repo](https://github.com/uber/cadence/issues/new/choose ). 
## What's Next
Go to [Java HelloWorld](/docs/get-started/java-hello-world) or [Golang HelloWorld](/docs/get-started/golang-hello-world).
