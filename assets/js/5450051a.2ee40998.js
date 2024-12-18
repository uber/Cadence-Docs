"use strict";(self.webpackChunkcadence=self.webpackChunkcadence||[]).push([[9528],{8781:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>n,toc:()=>c});const n=JSON.parse('{"id":"operation-guide/maintain","title":"Cluster Maintenance","description":"This includes how to use and maintain a Cadence cluster for both clients and server clusters.","source":"@site/docs/07-operation-guide/02-maintain.md","sourceDirName":"07-operation-guide","slug":"/operation-guide/maintain","permalink":"/Cadence-Docs/docs/operation-guide/maintain","draft":false,"unlisted":false,"editUrl":"https://github.com/cadence-workflow/Cadence-Docs/tree/master/docs/07-operation-guide/02-maintain.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"layout":"default","title":"Cluster Maintenance","permalink":"/docs/operation-guide/maintain"},"sidebar":"docsSidebar","previous":{"title":"Cluster Configuration","permalink":"/Cadence-Docs/docs/operation-guide/setup"},"next":{"title":"Cluster Monitoring","permalink":"/Cadence-Docs/docs/operation-guide/monitoring"}}');var a=s(4848),i=s(8453);const o={layout:"default",title:"Cluster Maintenance",permalink:"/docs/operation-guide/maintain"},r="Cluster Maintenance",l={},c=[{value:"Scale up &amp; down Cluster",id:"scale-up--down-cluster",level:2},{value:"Scale up a tasklist using <code>Scalable tasklist</code> feature",id:"scale-up-a-tasklist-using-scalable-tasklist-feature",level:2},{value:"Restarting Cluster",id:"restarting-cluster",level:2},{value:"Optimize SQL Persistence",id:"optimize-sql-persistence",level:2},{value:"Upgrading Server",id:"upgrading-server",level:2},{value:"How to upgrade:",id:"how-to-upgrade",level:3},{value:"How to apply DB schema changes",id:"how-to-apply-db-schema-changes",level:3}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"cluster-maintenance",children:"Cluster Maintenance"})}),"\n",(0,a.jsx)(t.p,{children:"This includes how to use and maintain a Cadence cluster for both clients and server clusters."}),"\n",(0,a.jsx)(t.h2,{id:"scale-up--down-cluster",children:"Scale up & down Cluster"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"When CPU/Memory is getting bottleneck on Cadence instances, you may scale up or add more instances."}),"\n",(0,a.jsxs)(t.li,{children:["Watch ",(0,a.jsx)(t.a,{href:"/docs/operation-guide/monitoring/",children:"Cadence metrics"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"See if the external traffic to frontend is normal"}),"\n",(0,a.jsxs)(t.li,{children:["If the slowness is due to too many tasks on a tasklist, you may need to ",(0,a.jsx)(t.a,{href:"/docs/operation-guide/maintain/#scale-up-a-tasklist-using-scalable-tasklist-feature",children:"scale up the tasklist"})]}),"\n",(0,a.jsx)(t.li,{children:"If persistence latency is getting too high, try scale up your DB instance"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["Never change the ",(0,a.jsxs)(t.a,{href:"/docs/operation-guide/setup/#static-configuration",children:[(0,a.jsx)(t.code,{children:"numOfShards"})," of a cluster"]}),". If you need that because the current one is too small, follow the instructions to ",(0,a.jsx)(t.a,{href:"migration",children:"migrate your cluster to a new one"}),"."]}),"\n"]}),"\n",(0,a.jsxs)(t.h2,{id:"scale-up-a-tasklist-using-scalable-tasklist-feature",children:["Scale up a tasklist using ",(0,a.jsx)(t.code,{children:"Scalable tasklist"})," feature"]}),"\n",(0,a.jsx)(t.p,{children:"By default a tasklist is not scalable enough to support hundreds of tasks per second. That\u2019s mainly because each tasklist is assigned to a Matching service node, and dispatching tasks in a tasklist is in sequence."}),"\n",(0,a.jsx)(t.p,{children:"In the past, Cadence recommended using multiple tasklists to start workflow/activity. You need to make a list of tasklists and randomly pick one when starting workflows. And then when starting workers, let them listen to all the tasklists."}),"\n",(0,a.jsx)(t.p,{children:"Nowadays, Cadence has a feature called \u201cScalable tasklist\u201d. It will divide a tasklist into multiple logical partitions, which can distribute tasks to multiple Matching service nodes. By default this feature is not enabled because there is some performance penalty on the server side, plus it\u2019s not common that a tasklist needs to support more than hundreds tasks per second."}),"\n",(0,a.jsx)(t.p,{children:"You must make a dynamic configuration change in Cadence server to use this feature:"}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:"matching.numTasklistWritePartitions"})}),"\n",(0,a.jsx)(t.p,{children:"and"}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:"matching.numTasklistReadPartitions"})}),"\n",(0,a.jsx)(t.p,{children:"matching.numTasklistWritePartitions is the number of partitions when a Cadence server sends a task to the tasklist.\nmatching.numTasklistReadPartitions is the number of partitions when your worker accepts a task from the tasklist."}),"\n",(0,a.jsx)(t.p,{children:"There are a few things to know when using this feature:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:["Always make sure ",(0,a.jsx)(t.code,{children:"matching.numTasklistWritePartitions <= matching.numTasklistReadPartitions"})," . Otherwise there may be some tasks that are sent to a tasklist partition but no poller(worker) will be able to pick up."]}),"\n",(0,a.jsx)(t.li,{children:"Because of above, when scaling down the number of partitions, you must decrease the WritePartitions first, to wait for a certain time to ensure that tasks are drained, and then decrease ReadPartitions."}),"\n",(0,a.jsxs)(t.li,{children:["Both domain names and taskListName should be specified in the dynamic config. An example of using this feature. See more details about dynamic config format using file based ",(0,a.jsx)(t.a,{href:"/docs/operation-guide/setup/#static-configuration",children:"dynamic config"}),"."]}),"\n"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-yaml",children:'matching.numTasklistWritePartitions:\n  - value: 10\n    constraints:\n      domainName: "samples-domain"\n      taskListName: "aScalableTasklistName"\nmatching.numTasklistReadPartitions:\n  - value: 10\n    constraints:\n      domainName: "samples-domain"\n      taskListName: "aScalableTasklistName"\n'})}),"\n",(0,a.jsx)(t.p,{children:"NOTE: the value must be integer without double quotes."}),"\n",(0,a.jsx)(t.h2,{id:"restarting-cluster",children:"Restarting Cluster"}),"\n",(0,a.jsx)(t.p,{children:"Make sure rolling restart to keep high availability."}),"\n",(0,a.jsx)(t.h2,{id:"optimize-sql-persistence",children:"Optimize SQL Persistence"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"Connection is shared within a Cadence server host"}),"\n",(0,a.jsx)(t.li,{children:"For each host, The max number of connections it will consume is maxConn of defaultStore + maxConn of visibilityStore."}),"\n",(0,a.jsx)(t.li,{children:"The total max number of connections your Cadence cluster will consume is the summary from all hosts(from Frontend/Matching/History/SysWorker services)"}),"\n",(0,a.jsx)(t.li,{children:"Frontend and history nodes need both default and visibility Stores, but matching and sys workers only need default Stores, they don't need to talk to visibility DBs."}),"\n",(0,a.jsx)(t.li,{children:"For default Stores, history service will take the most connection, then Frontend/Matching. SysWorker will use much less than others"}),"\n",(0,a.jsx)(t.li,{children:"Default Stores is for Cadence\u2019 core data model, which requires strong consistency. So it cannot use replicas.  VisibilityStore is not for core data models. It\u2019s recommended to use a separate DB for visibility store if using DB based visibility."}),"\n",(0,a.jsx)(t.li,{children:"Visibility Stores usually take much less connection as the workload is much lightweight(less QPS and no explicit transactions)."}),"\n",(0,a.jsx)(t.li,{children:"Visibility Stores require eventual consistency for read. So it can use replicas."}),"\n",(0,a.jsx)(t.li,{children:"MaxIdelConns should be less than MaxConns, so that the connections can be distributed better across hosts."}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"upgrading-server",children:"Upgrading Server"}),"\n",(0,a.jsxs)(t.p,{children:["To get notified about release, please subscribe the release of project by : Go to ",(0,a.jsx)(t.a,{href:"https://github.com/cadence-workflow/cadence",children:"https://github.com/cadence-workflow/cadence"}),' -> Click the right top "Watch" button -> Custom -> "Release".']}),"\n",(0,a.jsx)(t.p,{children:"It's recommended to upgrade one minor version at a time. E.g, if you are at 0.10, you should upgrade to 0.11, stabilize it with running some normal workload to make sure that the upgraded server is happy with the schema changes. After ~1 hour, then upgrade to 0.12. then 0.13. etc."}),"\n",(0,a.jsx)(t.p,{children:"The reason is that for each minor upgrade, you should be able to follow the release notes about what you should do for upgrading. The release notes may require you to run some commands. This will also help to narrow down the cause when something goes wrong."}),"\n",(0,a.jsx)(t.h3,{id:"how-to-upgrade",children:"How to upgrade:"}),"\n",(0,a.jsx)(t.p,{children:"Things that you may need to do for upgrading a minor version(patch version upgrades should not need it):"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"Schema(DB/ElasticSearch) changes"}),"\n",(0,a.jsx)(t.li,{children:"Configuration format/layout changes"}),"\n",(0,a.jsxs)(t.li,{children:["Data migration -- this is very rare. For example, ",(0,a.jsx)(t.a,{href:"https://github.com/cadence-workflow/cadence/releases/tag/v0.16.0",children:"upgrading from 0.15.x to 0.16.0 requires a data migration"}),"."]}),"\n"]}),"\n",(0,a.jsx)(t.p,{children:"You should read through the release instruction for each minor release to understand what needs to be done."}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:["Schema changes need to be applied before upgrading server","\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"Upgrade MySQL/Postgres schema if applicable"}),"\n",(0,a.jsx)(t.li,{children:"Upgrade Cassandra schema if applicable"}),"\n",(0,a.jsx)(t.li,{children:"Upgrade ElasticSearch schema if applicable"}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(t.li,{children:"Usually schema change is backward compatible. So rolling back usually is not a problem. It also means that Cadence allows running a mixed version of schema, as long as they are all greater than or equal to the required version of the server.\nOther requirements for upgrading should be found in the release notes. It may contain information about config changes, or special rollback instructions if normal rollback may cause problems."}),"\n",(0,a.jsx)(t.li,{children:"Similarly, data migration should be done before upgrading the server binary."}),"\n"]}),"\n",(0,a.jsx)(t.p,{children:"NOTE: Do not use \u201cauto-setup\u201d images to upgrade your schema. It's mainly for development. At most for initial setup only."}),"\n",(0,a.jsx)(t.h3,{id:"how-to-apply-db-schema-changes",children:"How to apply DB schema changes"}),"\n",(0,a.jsxs)(t.p,{children:["For how to apply database schema, refer to this doc: ",(0,a.jsx)(t.a,{href:"https://github.com/cadence-workflow/cadence/tree/master/tools/sql",children:"SQL tool README"}),"\n",(0,a.jsx)(t.a,{href:"https://github.com/cadence-workflow/cadence/tree/master/tools/cassandra",children:"Cassandra tool README"})]}),"\n",(0,a.jsx)(t.p,{children:"The tool makes use of a table called \u201cschema_versions\u201d to keep track of upgrading History. But there is no transaction guarantee for cross table operations. So in case of some error, you may need to fix or apply schema change manually.\nAlso, the schema tool by default will upgrade schema to the latest, so no manual is required. ( you can also specify to let it upgrade to any place, like 0.14)."}),"\n",(0,a.jsxs)(t.p,{children:["Database schema changes are versioned in the folders: ",(0,a.jsx)(t.a,{href:"https://github.com/cadence-workflow/cadence/tree/master/schema/mysql/v57/cadence/versioned",children:"Versioned Schema Changes"})," for Default Store\nand ",(0,a.jsx)(t.a,{href:"https://github.com/cadence-workflow/cadence/tree/master/schema/mysql/v57/visibility/versioned",children:"Versioned Schema Changes"})," for Visibility Store if you use database for basic visibility instead of ElasticSearch."]}),"\n",(0,a.jsxs)(t.p,{children:["If you use homebrew, the schema files are located at ",(0,a.jsx)(t.code,{children:"/usr/local/etc/cadence/schema/"}),"."]}),"\n",(0,a.jsxs)(t.p,{children:["Alternatively, you can checkout the ",(0,a.jsx)(t.a,{href:"https://github.com/cadence-workflow/cadence",children:"repo"})," and the release tag. E.g. ",(0,a.jsx)(t.code,{children:"git checkout v0.21.0"})," and then the schema files is at ",(0,a.jsx)(t.code,{children:"./schema/"})]})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>o,x:()=>r});var n=s(6540);const a={},i=n.createContext(a);function o(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);