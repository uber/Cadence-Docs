(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{466:function(e,t,s){"use strict";s.r(t);var r=s(13),n=Object(r.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"distributed-cron"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#distributed-cron"}},[e._v("#")]),e._v(" Distributed CRON")]),e._v(" "),s("p",[e._v("It is relatively straightforward to turn any Cadence "),s("Term",{attrs:{term:"workflow"}}),e._v(" into a Cron "),s("Term",{attrs:{term:"workflow"}}),e._v(". All you need\nis to supply a cron schedule when starting the "),s("Term",{attrs:{term:"workflow"}}),e._v(" using the CronSchedule\nparameter of\n"),s("a",{attrs:{href:"https://static.javadoc.io/com.uber.cadence/cadence-client/2.5.1/com/uber/cadence/client/WorkflowOptions.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("StartWorkflowOptions"),s("OutboundLink")],1),e._v(".")],1),e._v(" "),s("p",[e._v("You can also start a "),s("Term",{attrs:{term:"workflow"}}),e._v(" using the Cadence "),s("Term",{attrs:{term:"CLI"}}),e._v(" with an optional cron schedule using the "),s("code",[e._v("--cron")]),e._v(" argument.")],1),e._v(" "),s("p",[e._v("For "),s("Term",{attrs:{term:"workflow",show:"workflows"}}),e._v(" with CronSchedule:")],1),e._v(" "),s("ul",[s("li",[e._v('CronSchedule is based on UTC time. For example cron schedule "15 8 * * *"\nwill run daily at 8:15am UTC. Another example "*/2 * * * 5-6" will schedule a workflow every two minutes on fridays\nand saturdays.')]),e._v(" "),s("li",[e._v("If a "),s("Term",{attrs:{term:"workflow"}}),e._v(" failed and a RetryPolicy is supplied to the StartWorkflowOptions\nas well, the "),s("Term",{attrs:{term:"workflow"}}),e._v(" will retry based on the RetryPolicy. While the "),s("Term",{attrs:{term:"workflow"}}),e._v(" is\nretrying, the server will not schedule the next cron run.")],1),e._v(" "),s("li",[e._v("Cadence server only schedules the next cron run after the current run is\ncompleted. If the next schedule is due while a "),s("Term",{attrs:{term:"workflow"}}),e._v(" is running (or retrying),\nthen it will skip that schedule.")],1),e._v(" "),s("li",[e._v("Cron "),s("Term",{attrs:{term:"workflow",show:"workflows"}}),e._v(" will not stop until they are terminated or cancelled.")],1)]),e._v(" "),s("p",[e._v("Cadence supports the standard cron spec:")]),e._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// CronSchedule - Optional cron schedule for workflow. If a cron schedule is specified, the workflow will run")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// as a cron based on the schedule. The scheduling will be based on UTC time. The schedule for the next run only happens")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// after the current run is completed/failed/timeout. If a RetryPolicy is also supplied, and the workflow failed")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// or timed out, the workflow will be retried based on the retry policy. While the workflow is retrying, it won't")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// schedule its next run. If the next schedule is due while the workflow is running (or retrying), then it will skip that")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// schedule. Cron workflow will not stop until it is terminated or cancelled (by returning cadence.CanceledError).")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// The cron spec is as follows:")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// ┌───────────── minute (0 - 59)")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// │ ┌───────────── hour (0 - 23)")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// │ │ ┌───────────── day of the month (1 - 31)")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// │ │ │ ┌───────────── month (1 - 12)")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday)")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// │ │ │ │ │")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// │ │ │ │ │")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// * * * * *")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("CronSchedule")]),e._v(" string\n")])])]),s("p",[e._v("Cadence also supports more "),s("a",{attrs:{href:"https://pkg.go.dev/github.com/robfig/cron#hdr-CRON_Expression_Format",target:"_blank",rel:"noopener noreferrer"}},[e._v("advanced cron expressions"),s("OutboundLink")],1),e._v(".")]),e._v(" "),s("p",[e._v("The "),s("a",{attrs:{href:"https://crontab.guru/",target:"_blank",rel:"noopener noreferrer"}},[e._v("crontab guru site"),s("OutboundLink")],1),e._v(" is useful for testing your cron expressions.")]),e._v(" "),s("h2",{attrs:{id:"convert-an-existing-cron-workflow"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#convert-an-existing-cron-workflow"}},[e._v("#")]),e._v(" Convert an existing cron workflow")]),e._v(" "),s("p",[e._v("Before CronSchedule was available, the previous approach to implementing cron\n"),s("Term",{attrs:{term:"workflow",show:"workflows"}}),e._v(" was to use a delay timer as the last step and then return\n"),s("code",[e._v("ContinueAsNew")]),e._v(". One problem with that implementation is that if the "),s("Term",{attrs:{term:"workflow"}}),e._v("\nfails or times out, the cron would stop.")],1),e._v(" "),s("p",[e._v("To convert those "),s("Term",{attrs:{term:"workflow",show:"workflows"}}),e._v(" to make use of Cadence CronSchedule, all you need is to remove the delay timer and return without using\n"),s("code",[e._v("ContinueAsNew")]),e._v(". Then start the "),s("Term",{attrs:{term:"workflow"}}),e._v(" with the desired CronSchedule.")],1),e._v(" "),s("h2",{attrs:{id:"retrieve-last-successful-result"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#retrieve-last-successful-result"}},[e._v("#")]),e._v(" Retrieve last successful result")]),e._v(" "),s("p",[e._v("Sometimes it is useful to obtain the progress of previous successful runs.\nThis is supported by two new APIs in the client library:\n"),s("code",[e._v("HasLastCompletionResult")]),e._v(" and "),s("code",[e._v("GetLastCompletionResult")]),e._v(". Below is an example of how\nto use this in Java:")]),e._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("public")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("String")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("cronWorkflow")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("String")]),e._v(" lastProcessedFileName "),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("Workflow")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("getLastCompletionResult")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("String")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("class")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// Process work starting from the lastProcessedFileName.")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// Business logic implementation goes here.")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// Updates lastProcessedFileName to the new value.")]),e._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("return")]),e._v(" lastProcessedFileName"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),s("p",[e._v("Note that this works even if one of the cron schedule runs failed. The\nnext schedule will still get the last successful result if it ever successfully\ncompleted at least once. For example, for a daily cron "),s("Term",{attrs:{term:"workflow"}}),e._v(", if the first day\nrun succeeds and the second day fails, then the third day run will still get\nthe result from first day's run using these APIs.")],1)])}),[],!1,null,null,null);t.default=n.exports}}]);