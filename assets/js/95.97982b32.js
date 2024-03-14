(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{402:function(e,t,a){"use strict";a.r(t);var s=a(0),o=Object(s.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"cluster-maintenance"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#cluster-maintenance"}},[e._v("#")]),e._v(" Cluster Maintenance")]),e._v(" "),t("p",[e._v("This includes how to use and maintain a Cadence cluster for both clients and server clusters.")]),e._v(" "),t("h2",{attrs:{id:"scale-up-down-cluster"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#scale-up-down-cluster"}},[e._v("#")]),e._v(" Scale up & down Cluster")]),e._v(" "),t("ul",[t("li",[e._v("When CPU/Memory is getting bottleneck on Cadence instances, you may scale up or add more instances.")]),e._v(" "),t("li",[e._v("Watch "),t("RouterLink",{attrs:{to:"/docs/operation-guide/monitor/"}},[e._v("Cadence metrics")]),e._v(" "),t("ul",[t("li",[e._v("See if the external traffic to frontend is normal")]),e._v(" "),t("li",[e._v("If the slowness is due to too many tasks on a tasklist, you may need to "),t("RouterLink",{attrs:{to:"/docs/operation-guide/maintain/#scale-up-a-tasklist-using-scalable-tasklist-feature"}},[e._v("scale up the tasklist")])],1),e._v(" "),t("li",[e._v("If persistence latency is getting too high, try scale up your DB instance")])])],1),e._v(" "),t("li",[e._v("Never change the "),t("RouterLink",{attrs:{to:"/docs/operation-guide/setup/#static-configuration"}},[t("code",[e._v("numOfShards")]),e._v(" of a cluster")]),e._v(". If you need that because the current one is too small, follow the instructions to "),t("RouterLink",{attrs:{to:"/docs/operation-guide/maintain/#migrate-cadence-cluster"}},[e._v("migrate your cluster to a new one")]),e._v(".")],1)]),e._v(" "),t("h2",{attrs:{id:"scale-up-a-tasklist-using-scalable-tasklist-feature"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#scale-up-a-tasklist-using-scalable-tasklist-feature"}},[e._v("#")]),e._v(" Scale up a tasklist using "),t("code",[e._v("Scalable tasklist")]),e._v(" feature")]),e._v(" "),t("p",[e._v("By default a tasklist is not scalable enough to support hundreds of tasks per second. That’s mainly because each tasklist is assigned to a Matching service node, and dispatching tasks in a tasklist is in sequence.")]),e._v(" "),t("p",[e._v("In the past, Cadence recommended using multiple tasklists to start workflow/activity. You need to make a list of tasklists and randomly pick one when starting workflows. And then when starting workers, let them listen to all the tasklists.")]),e._v(" "),t("p",[e._v("Nowadays, Cadence has a feature called “Scalable tasklist”. It will divide a tasklist into multiple logical partitions, which can distribute tasks to multiple Matching service nodes. By default this feature is not enabled because there is some performance penalty on the server side, plus it’s not common that a tasklist needs to support more than hundreds tasks per second.")]),e._v(" "),t("p",[e._v("You must make a dynamic configuration change in Cadence server to use this feature:")]),e._v(" "),t("p",[t("strong",[e._v("matching.numTasklistWritePartitions")])]),e._v(" "),t("p",[e._v("and")]),e._v(" "),t("p",[t("strong",[e._v("matching.numTasklistReadPartitions")])]),e._v(" "),t("p",[e._v("matching.numTasklistWritePartitions is the number of partitions when a Cadence server sends a task to the tasklist.\nmatching.numTasklistReadPartitions is the number of partitions when your worker accepts a task from the tasklist.")]),e._v(" "),t("p",[e._v("There are a few things to know when using this feature:")]),e._v(" "),t("ul",[t("li",[e._v("Always make sure "),t("code",[e._v("matching.numTasklistWritePartitions <= matching.numTasklistReadPartitions")]),e._v(" . Otherwise there may be some tasks that are sent to a tasklist partition but no poller(worker) will be able to pick up.")]),e._v(" "),t("li",[e._v("Because of above, when scaling down the number of partitions, you must decrease the WritePartitions first, to wait for a certain time to ensure that tasks are drained, and then decrease ReadPartitions.")]),e._v(" "),t("li",[e._v("Both domain names and taskListName should be specified in the dynamic config. An example of using this feature. See more details about dynamic config format using file based "),t("RouterLink",{attrs:{to:"/docs/operation-guide/setup/#static-configs"}},[e._v("dynamic config")]),e._v(".")],1)]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('matching.numTasklistWritePartitions:\n  - value: 10\n    constraints:\n      domainName: "samples-domain"\n      taskListName: "aScalableTasklistName"\nmatching.numTasklistReadPartitions:\n  - value: 10\n    constraints:\n      domainName: "samples-domain"\n      taskListName: "aScalableTasklistName"\n')])])]),t("p",[e._v("NOTE: the value must be integer without double quotes.")]),e._v(" "),t("h2",{attrs:{id:"restarting-cluster"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#restarting-cluster"}},[e._v("#")]),e._v(" Restarting Cluster")]),e._v(" "),t("p",[e._v("Make sure rolling restart to keep high availability.")]),e._v(" "),t("h2",{attrs:{id:"optimize-sql-persistence"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#optimize-sql-persistence"}},[e._v("#")]),e._v(" Optimize SQL Persistence")]),e._v(" "),t("ul",[t("li",[e._v("Connection is shared within a Cadence server host")]),e._v(" "),t("li",[e._v("For each host, The max number of connections it will consume is maxConn of defaultStore + maxConn of visibilityStore.")]),e._v(" "),t("li",[e._v("The total max number of connections your Cadence cluster will consume is the summary from all hosts(from Frontend/Matching/History/SysWorker services)")]),e._v(" "),t("li",[e._v("Frontend and history nodes need both default and visibility Stores, but matching and sys workers only need default Stores, they don't need to talk to visibility DBs.")]),e._v(" "),t("li",[e._v("For default Stores, history service will take the most connection, then Frontend/Matching. SysWorker will use much less than others")]),e._v(" "),t("li",[e._v("Default Stores is for Cadence’ core data model, which requires strong consistency. So it cannot use replicas.  VisibilityStore is not for core data models. It’s recommended to use a separate DB for visibility store if using DB based visibility.")]),e._v(" "),t("li",[e._v("Visibility Stores usually take much less connection as the workload is much lightweight(less QPS and no explicit transactions).")]),e._v(" "),t("li",[e._v("Visibility Stores require eventual consistency for read. So it can use replicas.")]),e._v(" "),t("li",[e._v("MaxIdelConns should be less than MaxConns, so that the connections can be distributed better across hosts.")])]),e._v(" "),t("h2",{attrs:{id:"upgrading-server"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#upgrading-server"}},[e._v("#")]),e._v(" Upgrading Server")]),e._v(" "),t("p",[e._v('To get notified about release, please subscribe the release of project by : Go to https://github.com/uber/cadence -> Click the right top "Watch" button -> Custom -> "Release".')]),e._v(" "),t("p",[e._v("It's recommended to upgrade one minor version at a time. E.g, if you are at 0.10, you should upgrade to 0.11, stabilize it with running some normal workload to make sure that the upgraded server is happy with the schema changes. After ~1 hour, then upgrade to 0.12. then 0.13. etc.")]),e._v(" "),t("p",[e._v("The reason is that for each minor upgrade, you should be able to follow the release notes about what you should do for upgrading. The release notes may require you to run some commands. This will also help to narrow down the cause when something goes wrong.")]),e._v(" "),t("h3",{attrs:{id:"how-to-upgrade"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#how-to-upgrade"}},[e._v("#")]),e._v(" How to upgrade:")]),e._v(" "),t("p",[e._v("Things that you may need to do for upgrading a minor version(patch version upgrades should not need it):")]),e._v(" "),t("ul",[t("li",[e._v("Schema(DB/ElasticSearch) changes")]),e._v(" "),t("li",[e._v("Configuration format/layout changes")]),e._v(" "),t("li",[e._v("Data migration -- this is very rare. For example, "),t("a",{attrs:{href:"https://github.com/uber/cadence/releases/tag/v0.16.0",target:"_blank",rel:"noopener noreferrer"}},[e._v("upgrading from 0.15.x to 0.16.0 requires a data migration"),t("OutboundLink")],1),e._v(".")])]),e._v(" "),t("p",[e._v("You should read through the release instruction for each minor release to understand what needs to be done.")]),e._v(" "),t("ul",[t("li",[e._v("Schema changes need to be applied before upgrading server\n"),t("ul",[t("li",[e._v("Upgrade MySQL/Postgres schema if applicable")]),e._v(" "),t("li",[e._v("Upgrade Cassandra schema if applicable")]),e._v(" "),t("li",[e._v("Upgrade ElasticSearch schema if applicable")])])]),e._v(" "),t("li",[e._v("Usually schema change is backward compatible. So rolling back usually is not a problem. It also means that Cadence allows running a mixed version of schema, as long as they are all greater than or equal to the required version of the server.\nOther requirements for upgrading should be found in the release notes. It may contain information about config changes, or special rollback instructions if normal rollback may cause problems.")]),e._v(" "),t("li",[e._v("Similarly, data migration should be done before upgrading the server binary.")])]),e._v(" "),t("p",[e._v("NOTE: Do not use “auto-setup” images to upgrade your schema. It's mainly for development. At most for initial setup only.")]),e._v(" "),t("h3",{attrs:{id:"how-to-apply-db-schema-changes"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#how-to-apply-db-schema-changes"}},[e._v("#")]),e._v(" How to apply DB schema changes")]),e._v(" "),t("p",[e._v("For how to apply database schema, refer to this doc: "),t("a",{attrs:{href:"https://github.com/uber/cadence/tree/master/tools/sql",target:"_blank",rel:"noopener noreferrer"}},[e._v("SQL tool README"),t("OutboundLink")],1),e._v(" "),t("a",{attrs:{href:"https://github.com/uber/cadence/tree/master/tools/cassandra",target:"_blank",rel:"noopener noreferrer"}},[e._v("Cassandra tool README"),t("OutboundLink")],1)]),e._v(" "),t("p",[e._v("The tool makes use of a table called “schema_versions” to keep track of upgrading History. But there is no transaction guarantee for cross table operations. So in case of some error, you may need to fix or apply schema change manually.\nAlso, the schema tool by default will upgrade schema to the latest, so no manual is required. ( you can also specify to let it upgrade to any place, like 0.14).")]),e._v(" "),t("p",[e._v("Database schema changes are versioned in the folders: "),t("a",{attrs:{href:"https://github.com/uber/cadence/tree/master/schema/mysql/v57/cadence/versioned",target:"_blank",rel:"noopener noreferrer"}},[e._v("Versioned Schema Changes"),t("OutboundLink")],1),e._v(" for Default Store\nand "),t("a",{attrs:{href:"https://github.com/uber/cadence/tree/master/schema/mysql/v57/visibility/versioned",target:"_blank",rel:"noopener noreferrer"}},[e._v("Versioned Schema Changes"),t("OutboundLink")],1),e._v(" for Visibility Store if you use database for basic visibility instead of ElasticSearch.")]),e._v(" "),t("p",[e._v("If you use homebrew, the schema files are located at "),t("code",[e._v("/usr/local/etc/cadence/schema/")]),e._v(".")]),e._v(" "),t("p",[e._v("Alternatively, you can checkout the "),t("a",{attrs:{href:"https://github.com/uber/cadence",target:"_blank",rel:"noopener noreferrer"}},[e._v("repo"),t("OutboundLink")],1),e._v(" and the release tag. E.g. "),t("code",[e._v("git checkout v0.21.0")]),e._v(" and then the schema files is at "),t("code",[e._v("./schema/")])])])}),[],!1,null,null,null);t.default=o.exports}}]);