(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{394:function(t,e,a){"use strict";a.r(e);var s=a(4),n=Object(s.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("p",[t._v("At Uber, we run several big multitenant Cadence clusters with hundreds of domains in each. The clusters being multi-tenant means potential "),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Cloud_computing_issues#Performance_interference_and_noisy_neighbors",target:"_blank",rel:"noopener noreferrer"}},[t._v("noisy neighbor"),e("OutboundLink")],1),t._v(" effects between domains.")]),t._v(" "),e("p",[t._v("An essential aspect of avoiding this is managing how workflows interact with our infrastructure to prevent any single workflow from causing instability for the whole cluster. To this end, we are excited to introduce Workflow ID-based rate limits — a new feature designed to protect our clusters from problematic workflows and ensure stability across the board.")]),t._v(" "),e("h2",{attrs:{id:"why-workflow-id-based-rate-limits"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#why-workflow-id-based-rate-limits"}},[t._v("#")]),t._v(" Why Workflow ID-based Rate Limits?")]),t._v(" "),e("p",[t._v("We already have rate limits for how many requests can be sent to a domain. However, since Cadence is sharded on the workflow ID, a user-provided input, an overused workflow with a particular id might overwhelm a shard by making too many requests. There are two main ways this happens:")]),t._v(" "),e("ol",[e("li",[t._v("A user starts, or signals the same workflow ID too aggressively,")]),t._v(" "),e("li",[t._v("A workflow starts too many activities over a short period of time (e.g. thousands of activities in seconds).")])]),t._v(" "),e("p",[t._v("For example, the following workflow would cause issues for Cadence. It would create huge amounts of traffic to a single shard in a very small time frame:")]),t._v(" "),e("div",{staticClass:"language-go extra-class"},[e("pre",{pre:!0,attrs:{class:"language-go"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Workflow")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx workflow"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Context"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" input sampleInput"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" elem "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("range")]),t._v(" longList "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\terr "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" workflow"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("ExecuteActivity")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" QuickActivity"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" elem"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Get")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("This heavy load creates what we call "),e("em",[t._v("hot shards")]),t._v(". Hot shards degrade performance not just for the workflow causing the issue, but for all workflows that interact with the affected shard. This can grow to a point where the whole cluster becomes unstable.")]),t._v(" "),e("p",[t._v("Now, with Workflow ID-based rate limits, we limit the number of external calls and actions per second for each individual workflow, reducing the blast radius (impact on the cluster) of a badly behaved workflow to an absolute minimum where only the offending workflow is impacted.")]),t._v(" "),e("h2",{attrs:{id:"why-not-shard-rate-limits"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#why-not-shard-rate-limits"}},[t._v("#")]),t._v(" Why "),e("em",[t._v("not")]),t._v(" Shard Rate Limits?")]),t._v(" "),e("p",[t._v("An obvious question is “why don’t we rate limit the requests to the shard?”. After all, the shard is what we want to protect. We have several reasons for choosing to rate limit the workflow ID instead of the shard:")]),t._v(" "),e("ul",[e("li",[e("strong",[t._v("Hashing")]),t._v(" The workflow ID to shard is random. This means that rate limiting a workflow is a good proxy for rate limiting a shard. The likelihood that many requests from different workflows hit the same shard is very low.")]),t._v(" "),e("li",[e("strong",[t._v("Communication")]),t._v(" It is easy to explain to a user that their domain is rate limited because they are sending too many requests to a specific workflow ID. Shards are an internal implementation detail that users should not have to worry about.")]),t._v(" "),e("li",[e("strong",[t._v("Noisy neighbors")]),t._v(" Shards are shared across the different domains in a Cadence cluster. If a user is sending too many requests to a shard, we would choose to rate limit requests to that shard. Since other users in other domains are also using the shard, they will also be rate limited.\nRate limiting users of a healthy domain because of requests from a completely different domain goes against the isolation the domains are meant to ensure.")])]),t._v(" "),e("h2",{attrs:{id:"how-does-it-work"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#how-does-it-work"}},[t._v("#")]),t._v(" How Does It Work?")]),t._v(" "),e("p",[t._v("Workflow ID-based rate limits are set for all workflow IDs in a domain. If the external limit for a domain is e.g. set to 100 it means that any single workflow ID in that domain can at most be signaled 100 times a second. The rate limits are implemented in two main areas:")]),t._v(" "),e("ol",[e("li",[e("p",[e("strong",[t._v("External Calls")]),t._v(" Cadence limits the number of requests per second for each workflow ID, which includes operations like starting, querying, or signaling a workflow. If this limit is exceeded, a ServiceBusyError with message “Too many requests for the workflow ID” is triggered, indicating that the rate limit for the workflow has been reached.")])]),t._v(" "),e("li",[e("p",[e("strong",[t._v("Actions Within a Workflow")]),t._v(" This limit controls the number of tasks processed per second within a workflow, focusing on managing decision tasks and activity tasks. When these limits are reached, Cadence slows down task processing without requiring any intervention from the user, though they might notice an increase in task execution time, eventually causing timeouts.")])])]),t._v(" "),e("h3",{attrs:{id:"how-do-i-enable-it"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#how-do-i-enable-it"}},[t._v("#")]),t._v(" How do I Enable It?")]),t._v(" "),e("p",[t._v("The limits are controlled using six dynamic config properties, three for the internal limits, and a corresponding three for the external limits, all with a domain filter, so the limits can be controlled for each domain.")]),t._v(" "),e("ul",[e("li",[t._v("history.workflowIDCacheInternalEnabled"),e("br"),t._v("\nhistory.workflowIDCacheExternalEnabled\n"),e("ul",[e("li",[t._v("Controls if the statistics needed to do the rate limiting should be collected. The feature keeps an in-memory record in the history service for each workflow ID.")])])]),t._v(" "),e("li",[t._v("history.workflowIDInternalRPS"),e("br"),t._v("\nhistory.workflowIDExternalRPS\n"),e("ul",[e("li",[t._v("Sets the number of requests allowed per second per workflow in a particular domain.")])])]),t._v(" "),e("li",[t._v("history.workflowIDExternalRateLimitEnabled"),e("br"),t._v("\nhistory.workflowIDInternalRateLimitEnabled\n"),e("ul",[e("li",[t._v("Set whether rate limiting should happen. Setting this to false allows us to see which domains "),e("em",[t._v("would have")]),t._v(" been rate limited and adjust them before enforcing the limits.")])])])]),t._v(" "),e("p",[t._v("An example configuration using the file based dynamic configuration could look like this:")]),t._v(" "),e("div",{staticClass:"language-yaml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-yaml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("history.workflowIDCacheExternalEnabled")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("value")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("constraints")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("history.workflowIDExternalRateLimitEnabled")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("value")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("false")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("constraints")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("domainName")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" samples"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("domain\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("value")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("constraints")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("history.workflowIDExternalRPS")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("value")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("constraints")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("Here only the external rate limits are enabled. The internal rate limits have the same structure. We see that ‌the rate limiting is enabled for all domains, with a max RPS of 100. The domain samples-domain is however running in shadow mode, so its requests are not rate limited, but metrics and logs are still emitted.")]),t._v(" "),e("p",[t._v("The exact RPS to set for a specific domain and cluster, depends on many things, such as the number of shards, the selected persistent layer, the general load on the cluster etc.")]),t._v(" "),e("h2",{attrs:{id:"monitoring-and-troubleshooting"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#monitoring-and-troubleshooting"}},[t._v("#")]),t._v(" Monitoring and Troubleshooting")]),t._v(" "),e("p",[t._v("The new feature introduces both new metrics and new logs. The new logs help us find workflows that are being rate limited, while the new metrics let us see if domains are being rate limited, and how close to being rate limited they are.")]),t._v(" "),e("p",[t._v("There are four new metrics, two for internal limits and two corresponding metrics for external limits, all emitted from history.")]),t._v(" "),e("ul",[e("li",[t._v("workflow_id_external_requests_ratelimited"),e("br"),t._v("\nworkflow_id_internal_requests_ratelimited\n"),e("ul",[e("li",[t._v("This is a counter that counts the number of rate limited requests. The metric is tagged with the domain, so we can track the rate limiting per domain.")])])]),t._v(" "),e("li",[t._v("workflow_id_external_requests_max_requests_per_second"),e("br"),t._v("\nworkflow_id_internal_requests_max_requests_per_second\n"),e("ul",[e("li",[t._v("This is a timer metric. The upper series gives the max number of requests to a single workflow ID. This is again tagged with the domain, so we can for each domain see how close its workflows are to the limit.")])])])]),t._v(" "),e("p",[t._v("These metrics let us monitor and alert on the new rate limits. Additionally, when breaking a rate limit, the history service will emit an info log with the message “Rate limiting workflowID”, these logs are tagged with the workflowID that is being limited, so it is easy to find the offending workflow. An example log would look like this:")]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"level"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"info"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ts"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2024-09-02T08:47:12.843Z"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"msg"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Rate limiting workflowID"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"service"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"cadence-history"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"request-type"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"external"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"wf-domain-id"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"fc0c7fcb-5796-4c80-b0d7-10bbbc66614e"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"wf-domain-name"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"samples-domain"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"wf-id"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"logging-call-at"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"cache.go:175"')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("h2",{attrs:{id:"conclusion"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#conclusion"}},[t._v("#")]),t._v(" Conclusion")]),t._v(" "),e("p",[t._v("Implementing these rate limits highly improves the reliability of a Cadence cluster, as users now cannot send too many requests to a single shard. This fine-grained control helps in maintaining optimal performance and enhances the ability to forecast and mitigate potential issues before they impact the service.")]),t._v(" "),e("p",[t._v("Workflow ID-based rate limits are a significant step forward in our ongoing effort to provide a robust and efficient workflow management service. By preventing hot shards and ensuring equitable resource distribution, we can offer more reliable performance, even under peak loads. We encourage all Cadence users to familiarize themselves with these new limits and adjust their workflow configurations to achieve optimal results.")])])}),[],!1,null,null,null);e.default=n.exports}}]);