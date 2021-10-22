---
layout: default
title: Archival
permalink: /docs/concepts/archival
---

# Archival

:archival:Archival: is a feature that automatically moves :workflow: histories (history archival) and visibility records (visibility archival) from persistence to another location after the retention period. The purpose of archival is to be able to keep workflow histories and visibility records as long as needed while not overwhelming the primary persistence store. There are two reasons you may want to keep the histories after the retention period has past:
1. **Compliance:** For legal reasons histories may need to be stored for a long period of time.
2. **Debugging:** Old histories can still be accessed for debugging.

Currently there are two limits to the :archival:Archival: feature set:
1. **RunID Required:** In order to access an archived history, both workflowID and runID are required.
2. **Best Effort:** There are cases in which a history or visibility record can be deleted from persistence without being archived first. These cases are rare but are possible with the current state of :archival:. Please check the FAQ section for how to get notified when this happens.

## Concepts

- **Archiver:** Archiver is the component responsible for archiving and retrieving :workflow: histories or visibility records.  Its interface is quite generic and supports different kinds of :archival: locations: local file system, S3, Kafka, etc. Check [this README](https://github.com/uber/cadence/blob/master/common/archiver/README.md) for how to add a new archiver implementation.
- **URI:** An URI is used to specify the :archival: location. Based on the scheme part of an URI, the corresponding archiver will be selected by the system to perform :archival:.

## Configuring Archival

:archival:Archival: is controlled by both :domain: level config and cluster level config. History and visibility archival have separate domain/cluster config, but the meaning of those configs are the same.

### Cluster Archival Config

A Cadence cluster can be in one of three :archival: states:
  * **Disabled:** No :archival:archivals: will occur and the archivers will be not initialized on startup.
  * **Paused:** This state is not yet implemented. Currently setting cluster to paused is the same as setting it to disabled.
  * **Enabled:** :archival:Archivals: will occur.

Enabling the cluster for :archival: simply means histories are being archived. There is another config which controls whether archived histories or visibility records can be accessed. Both these configs have defaults defined in static yaml, and have dynamic config overwrites. Note, however, dynamic config will take effect only when :archival: is enabled in static yaml.

### Domain Archival Config

A :domain: includes two pieces of :archival: related config:
  * **Status:** Either enabled or disabled. If a :domain: is in the disabled state no :archival:archivals: will occur for that :domain:.
  A :domain: can safely switch between statuses.
  * **URI:** The scheme and location where histories or visibility records will be archived to. When a :domain: enables :archival: for the first time URI is set and can never be mutated. If URI is not specified when first enabling a :domain: for :archival:, a default URI from static config will be used.

## Running Locally

In order to run locally do the following:
1. `./cadence-server start`
2. `./cadence --do samples-domain domain register --gd false --history_archival_status enabled --visibility_archival_status enabled --retention 0`
3. Run the [helloworld cadence-sample](https://github.com/uber-common/cadence-samples) by following the README
4. Copy the workflowID the completed :workflow: from log output
5. Retrieve runID through archived visibility record `./cadence --do samples-domain wf listarchived -q 'WorkflowID = "<workflowID>"'`
6. Retrieve archived history `./cadence --do samples-domain wf show --wid <workflowID> --rid <runID>`

In step 2, we registered a new :domain: and enabled both history and visibility :archival: feature for that :domain:. Since we didn't provide an :archival: URI when registering the new :domain:, the default URI specified in `config/development.yaml` is used. The default URI is `file:///tmp/cadence_archival/development` for history archival and `"file:///tmp/cadence_vis_archival/development"` for visibility archival. You can find the archived :workflow: history under the `/tmp/cadence_archival/development` directory and archived visibility record under the `/tmp/cadence_vis_archival/development` directory.

## Running in Production
In production, Google Cloud and S3 is supported for archival.
Check documentation in [GCloud archival component](https://github.com/uber/cadence/tree/master/common/archiver/gcloud) and [S3 archival component](https://github.com/uber/cadence/tree/master/common/archiver/s3store).

Below is an example of S3 archival configuration:
```yaml 
archival:
  history:
    status: "enabled"
    enableRead: true
    provider:
      s3store:
        region: "us-east-2"
  visibility:
    status: "enabled"
    enableRead: true
    provider:
      s3store:
        region: "us-east-2"
domainDefaults:
  archival:
    history:
      status: "enabled"
      URI: "s3://dev-cad"
    visibility:
      status: "enabled"
      URI: "s3://dev-cad"
```

## FAQ

### When does archival happen?
In principle, both history and visibility archival should happen after workflow closes and retention period passes. However, due to some implementation details, only history archival happens after the retention period, while visibility archival currently happens immediately after workflow closes. Please treat this as an implementation details inside Cadence and do not relay on this fact. Archived data should only be checked after the retention period, and Cadence may change when visibility archival happens in the future.

### What's the query syntax for visibility archival?
The `listArchived` CLI command and API accept a SQL-like query for retrieving archived visibility records, similar to how the `listWorkflow` command works. Unfortunately, since different Archiver implementations have very different capability, there's currently no universal query syntax that works for all Archiver implementations. Please check the README (for example, [S3](https://github.com/uber/cadence/tree/master/common/archiver/s3store) and [GCP](https://github.com/uber/cadence/tree/master/common/archiver/gcloud)) of the Archiver used by your domain for the supported query syntax and limitations.

### How does archival interact with global domains?
When :archival: occurs it will first run on the active side and some time later it will run on the standby side as well.
For history archival, before uploading history, a check is done to see if it has already been uploaded, if so it is not re-uploaded. 
For visibility archival, there's no such check and duplicated visibility record will be uploaded. Depending on the Archiver implementation used, those duplicated upload may result in or may not be returned. 

### Can I specify multiple archival URIs?
No, each :domain: can only have one URI for history :archival: and one URI for visibility :archival:. Different :domain:domains:, however, can have different URIs (with different schemes).

### How does archival work with PII?
No cadence :workflow: should ever operate on clear text PII. Cadence can be thought of as a database and just as one would not store PII in a database PII should not be stored in Cadence. This is even more important when :archival: is enabled because these histories can be kept forever.

## Planned Future Work
* Support accessing histories without providing runID.
* Provide hard guarantee that no history or visibility record is deleted from persistence before being archived if :archival: is enabled.
* Implement **Paused** state. In this state no :archival:archivals: will occur but histories or visibility record also will not be deleted from persistence.
Once enabled again from paused state, all skipped :archival:archivals: will occur.
