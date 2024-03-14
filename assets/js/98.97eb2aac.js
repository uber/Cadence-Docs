(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{404:function(e,t,a){"use strict";a.r(t);var s=a(0),r=Object(s.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"migrate-cadence-cluster"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#migrate-cadence-cluster"}},[e._v("#")]),e._v(" Migrate Cadence cluster.")]),e._v(" "),t("p",[e._v("There could be some reasons that you need to migrate Cadence clusters:")]),e._v(" "),t("ul",[t("li",[e._v("Migrate to different storage, for example from Postgres/MySQL to Cassandra, or using multiple SQL database as a sharded SQL cluster for Cadence")]),e._v(" "),t("li",[e._v("Split traffic")]),e._v(" "),t("li",[e._v("Datacenter migration")]),e._v(" "),t("li",[e._v("Scale up -- to change numOfHistoryShards.")])]),e._v(" "),t("p",[e._v("Below is two different approaches for migrating a cluster.")]),e._v(" "),t("h2",{attrs:{id:"migrate-with-naive-approach"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#migrate-with-naive-approach"}},[e._v("#")]),e._v(" Migrate with naive approach")]),e._v(" "),t("ol",[t("li",[e._v("Set up a new Cadence cluster")]),e._v(" "),t("li",[e._v("Connect client workers to both old and new clusters")]),e._v(" "),t("li",[e._v("Change workflow code to start new workflows only in the new cluster")]),e._v(" "),t("li",[e._v("Wait for all old workflows to finish in the old cluster")]),e._v(" "),t("li",[e._v("Shutdown the old Cadence cluster and stop the client workers from connecting to it.")])]),e._v(" "),t("p",[e._v("NOTE 1: With this approach, workflow history/visibility will not be migrated to new cluster.")]),e._v(" "),t("p",[e._v("NOTE 2: This is the only way to migrate a local domain, because a local domain cannot be converted to a global domain, even after a cluster enables XDC feature.")]),e._v(" "),t("p",[e._v("NOTE 3: Starting from "),t("a",{attrs:{href:"https://github.com/uber/cadence/releases/tag/v0.22.0",target:"_blank",rel:"noopener noreferrer"}},[e._v("version 0.22.0"),t("OutboundLink")],1),e._v(", global domain is preferred/recommended. Please ensure you create and use global domains only.\nIf you are using local domains, an easy way is to create a global domain and migrate to the new global domain using the above steps.")]),e._v(" "),t("h2",{attrs:{id:"migrate-with-global-domain-replication-feature"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#migrate-with-global-domain-replication-feature"}},[e._v("#")]),e._v(" Migrate with "),t("RouterLink",{attrs:{to:"/docs/concepts/cross-dc-replication/#running-in-production"}},[e._v("Global Domain Replication")]),e._v(" feature")],1),e._v(" "),t("p",[e._v("NOTE 1: If a domain are NOT a global domain, you cannot use the XDC feature to migrate. The only way is to migrate in a "),t("RouterLink",{attrs:{to:"/docs/operation-guide/maintain/#migrate-cadence-cluster"}},[e._v("naive approach")])],1),e._v(" "),t("p",[e._v("NOTE 2: Starting from "),t("a",{attrs:{href:"https://github.com/uber/cadence/releases/tag/v0.22.0",target:"_blank",rel:"noopener noreferrer"}},[e._v("version 0.22.0"),t("OutboundLink")],1),e._v(" (by "),t("a",{attrs:{href:"https://github.com/uber/cadence/pull/4239",target:"_blank",rel:"noopener noreferrer"}},[e._v("PR"),t("OutboundLink")],1),e._v("), Cadence allows migrating to a cluster with higher value of numHistoryShards. Prior to the version, only migrating to the same numHistoryShards is allowed.")]),e._v(" "),t("h3",{attrs:{id:"step-0-verify-clusters-setup-is-correct"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#step-0-verify-clusters-setup-is-correct"}},[e._v("#")]),e._v(" Step 0 - Verify clusters' setup is correct")]),e._v(" "),t("ul",[t("li",[e._v("Make sure the new cluster doesn’t already have the domain names that needs to be migrated (otherwise domain replication would fail).")])]),e._v(" "),t("p",[e._v("To get all the domains from current cluster:")]),e._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[e._v("cadence "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--address")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("currentClusterAddress"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" admin domain list\n")])])]),t("p",[e._v("Then\nFor each global domain.")]),e._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[e._v("cadence "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--address")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("newClusterAddress"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--do")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("domain_name"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" domain describe\n")])])]),t("p",[e._v("to make sure it doesn't exist in the new cluster.")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("Target replication cluster should have numHistoryShards >= source cluster")])]),e._v(" "),t("li",[t("p",[e._v("Target cluster should have the same search attributes enabled in dynamic configuration and in ElasticSearch.")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("Check the dynamic configuration to see if they have the same list of "),t("code",[e._v("frontend.validSearchAttributes")]),e._v(". If any is missing in the new cluster, update the dynamic config for the new cluster.")])]),e._v(" "),t("li",[t("p",[e._v("Check results of the below command to make sure that the ES fields matched with the dynamic configuration")])])])])]),e._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[e._v("curl")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-u")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("UNAME"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(":"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("PW"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-X")]),e._v(" GET https://"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("ES_HOST_OF_NEW_CLUSTER"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v("/cadence-visibility-index  "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-H")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v("'Content-Type: application/json'")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" jq "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v(".")]),e._v("\n")])])]),t("p",[e._v("If any search attribute is missing, add the missing search attributes to target cluster.")]),e._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[e._v("cadence "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--address")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("newClusterAddress"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" adm cluster add-search-attr "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--search_attr_key")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<>")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--search_attr_type")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<>")]),e._v("\n")])])]),t("h3",{attrs:{id:"step-1-connect-the-two-clusters-using-global-domain-replication-feature"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#step-1-connect-the-two-clusters-using-global-domain-replication-feature"}},[e._v("#")]),e._v(" Step 1 - Connect the two clusters using global domain(replication) feature")]),e._v(" "),t("p",[e._v("Include the Cluster Information for both the old and new clusters in the ClusterMetadata config of both clusters.\nExample config for currentCluster")]),e._v(" "),t("div",{staticClass:"language-yaml extra-class"},[t("pre",{pre:!0,attrs:{class:"language-yaml"}},[t("code",[t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("dcRedirectionPolicy")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("policy")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"all-domain-apis-forwarding"')]),e._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# use selected-apis-forwarding if using older versions don't support this policy")]),e._v("\n\n"),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("clusterMetadata")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("enableGlobalDomain")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token boolean important"}},[e._v("true")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("failoverVersionIncrement")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[e._v("10")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("masterClusterName")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"<newClusterName>"')]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("currentClusterName")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"<currentClusterName>"')]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("clusterInformation")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("<currentClusterName>")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("enabled")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token boolean important"}},[e._v("true")]),e._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("initialFailoverVersion")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[e._v("1")]),e._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("rpcName")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"cadence-frontend"')]),e._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("rpcAddress")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"<currentClusterAddress>"')]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("<newClusterName>")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("enabled")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token boolean important"}},[e._v("true")]),e._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("initialFailoverVersion")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[e._v("0")]),e._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("rpcName")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"cadence-frontend"')]),e._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("rpcAddress")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"<newClusterAddress>"')]),e._v("\n")])])]),t("p",[e._v("for newClusterName:")]),e._v(" "),t("div",{staticClass:"language-yaml extra-class"},[t("pre",{pre:!0,attrs:{class:"language-yaml"}},[t("code",[t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("dcRedirectionPolicy")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("policy")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"all-domain-apis-forwarding"')]),e._v("\n\n"),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("clusterMetadata")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("enableGlobalDomain")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token boolean important"}},[e._v("true")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("failoverVersionIncrement")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[e._v("10")]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("masterClusterName")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"<newClusterName>"')]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("currentClusterName")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"<newClusterName>"')]),e._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("clusterInformation")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("<currentClusterName>")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("enabled")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token boolean important"}},[e._v("true")]),e._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("initialFailoverVersion")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[e._v("1")]),e._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("rpcName")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"cadence-frontend"')]),e._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("rpcAddress")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"<currentClusterAddress>"')]),e._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("<newClusterName>")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("enabled")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token boolean important"}},[e._v("true")]),e._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("initialFailoverVersion")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[e._v("0")]),e._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("rpcName")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"cadence-frontend"')]),e._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("rpcAddress")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"<newClusterAddress>"')]),e._v("\n")])])]),t("p",[e._v("Deploy the config.\nIn older versions(<= v0.22), only "),t("code",[e._v("selected-apis-forwarding")]),e._v(" is supported. This would require you to deploy a different set of workflow/activity connected to the new Cadence cluster during migration, if high availability/seamless migration is required. Because "),t("code",[e._v("selected-apis-forwarding")]),e._v(" only forwarding the non-worker APIs.")]),e._v(" "),t("p",[e._v("With "),t("code",[e._v("all-domain-apis-forwarding")]),e._v(" policy, all worker + non-worker APIs are forwarded by Cadence cluster. You don't need to make any deployment change to your workflow/activity workers during migration. Once migration, let all workers connect to the new Cadence cluster before removing/shutdown the old cluster.")]),e._v(" "),t("p",[e._v("Therefore, it's recommended to upgrade your Cadence cluster to a higher version with "),t("code",[e._v("all-domain-apis-forwarding")]),e._v(" policy supported. The below steps assuming you are using this policy.")]),e._v(" "),t("h3",{attrs:{id:"step-2-test-replicating-one-domain"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#step-2-test-replicating-one-domain"}},[e._v("#")]),e._v(" Step 2 - Test Replicating one domain")]),e._v(" "),t("p",[e._v("First of all, try replicating a single domain to make sure everything work. Here uses "),t("code",[e._v("domain update")]),e._v(" to failover, you can also use "),t("code",[e._v("managed failover")]),e._v(" feature to failover. You may use some testing domains for this like "),t("code",[e._v("cadence-canary")]),e._v(".")]),e._v(" "),t("ul",[t("li",[e._v("2.1 Assuming the domain only contain "),t("code",[e._v("currentCluster")]),e._v(" in the cluster list, let's add the new cluster to the domain.")])]),e._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[e._v("cadence "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--address")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("currentClusterAddress"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--do")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("domain_name"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" domain update "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--clusters")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("currentClusterName"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("newClusterName"),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v("\n")])])]),t("p",[e._v("Run the command below to refresh the domain after adding a new cluster to the cluster list; we need to update the active_cluster to the same value that it appears to be.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("cadence --address <currentClusterAddress> --do <domain_name> domain update --active_cluster <currentClusterName>\n")])])]),t("ul",[t("li",[e._v("2.2 failover the domain to be active in new cluster")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("cadence --address <currentClusterAddress> --do workflow-prototype domain update --active_cluster <newClusterName>\n")])])]),t("p",[e._v("Use the domain describe command to verify the entire domain is replicated to the new cluster.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("cadence --address <newClusterAddress> --do <domain_name> domain describe\n")])])]),t("p",[e._v("Find an open workflowID that we want to replicate (you can get it from the UI). Use this command to describe it to make sure it’s open and running:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("cadence --address <initialClusterAddress> --do <domain_name> workflow describe --workflow_id <wfID>\n")])])]),t("p",[e._v("Run a signal command against any workflow and check that it was replicated to the new cluster. Example:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("cadence --address <initialClusterAddress> --do <domain_name> workflow signal --workflow_id <wfID> --name <anything not functional, e.g. replicationTriggeringSignal>\n")])])]),t("p",[e._v("This command will send a noop signal to workflows to trigger a decision, which will trigger history replication if needed.")]),e._v(" "),t("p",[e._v("Verify the workflow is replicated in the new cluster")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("cadence --address <newClusterAddress> --st <adminOperationToken> --do <domain_name> workflow describe --workflow_id <wfID>\n")])])]),t("p",[e._v("Also compare the history between the two clusters:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("cadence --address <newClusterAddress> --do <domain_name> workflow show --workflow_id <wfID>\n")])])]),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("cadence --address <initialClusterAddress> --do <domain_name> workflow show --workflow_id <wfID>\n")])])]),t("h3",{attrs:{id:"step-3-start-to-replicate-all-domains"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#step-3-start-to-replicate-all-domains"}},[e._v("#")]),e._v(" Step 3 - Start to replicate all domains")]),e._v(" "),t("p",[e._v("You can repeat Step 2 for all the domains. Or you can use the managed failover feature to failover all the domains in the cluster with a single command. See more details in the "),t("a",{attrs:{href:"/docs/concepts/cross-dc-replication"}},[e._v("global domain documentation")]),e._v(".")]),e._v(" "),t("p",[e._v("Because replication cannot be triggered without a decision. Again best way is to send a garbage signal to all the workflows.")]),e._v(" "),t("p",[e._v("If advanced visibility is enabled, then use batch signal command to start a batch job to trigger replication for all open workflows:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("cadence --address <initialClusterAddress> --do <domain_name> workflow batch start --batch_type signal --query “CloseTime = missing” --signal_name <anything, e.g. xdcTest> --reason <anything> --input <anything> --yes\n")])])]),t("p",[e._v("Watch metrics & dashboard while this is happening. Also observe the signal batch job to make sure it's completed.")]),e._v(" "),t("h3",{attrs:{id:"step-4-complete-the-migration"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#step-4-complete-the-migration"}},[e._v("#")]),e._v(" Step 4 - Complete the migration")]),e._v(" "),t("p",[e._v("After a few days, make sure everything is stable on the new cluster. The old cluster should only be forwarding requests to new cluster.")]),e._v(" "),t("p",[e._v("A few things need to do in order to shutdown the old cluster.")]),e._v(" "),t("ul",[t("li",[e._v("Migrate all applications to connect to the frontend of new cluster instead of relying on the forwarding")]),e._v(" "),t("li",[e._v("Watch metric dashboard to make sure no any traffic is happening on the old cluster")]),e._v(" "),t("li",[e._v("Delete the old cluster from domain cluster list. This needs to be done for every domain.")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("cadence --address <newHostAddress> --do <domain_name> domain update --clusters <newClusterName>\n")])])]),t("ul",[t("li",[e._v("Delete the old cluster from the configuration of the new cluster.")])]),e._v(" "),t("p",[e._v("Once above is done, you can shutdown the old cluster safely.")])])}),[],!1,null,null,null);t.default=r.exports}}]);