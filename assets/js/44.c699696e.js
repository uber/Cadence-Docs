(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{351:function(t,e,r){"use strict";r.r(e);var i=r(0),a=Object(i.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"activities"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#activities"}},[t._v("#")]),t._v(" Activities")]),t._v(" "),e("p",[t._v("Fault-oblivious stateful "),e("Term",{attrs:{term:"workflow"}}),t._v(" code is the core abstraction of Cadence. But, due to deterministic execution requirements, they are not allowed to call any external API directly.\nInstead they orchestrate execution of "),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v(". In its simplest form, a Cadence "),e("Term",{attrs:{term:"activity"}}),t._v(" is a function or an object method in one of the supported languages.\nCadence does not recover "),e("Term",{attrs:{term:"activity"}}),t._v(" state in case of failures. Therefore an "),e("Term",{attrs:{term:"activity"}}),t._v(" function is allowed to contain any code without restrictions.")],1),t._v(" "),e("p",[e("Term",{attrs:{term:"activity",show:"Activities"}}),t._v(" are invoked asynchronously through "),e("Term",{attrs:{term:"task_list",show:"task_lists"}}),t._v(". A "),e("Term",{attrs:{term:"task_list"}}),t._v(" is essentially a queue used to store an "),e("Term",{attrs:{term:"activity_task"}}),t._v(" until it is picked up by an available "),e("Term",{attrs:{term:"worker"}}),t._v(". The "),e("Term",{attrs:{term:"worker"}}),t._v(" processes an "),e("Term",{attrs:{term:"activity"}}),t._v(" by invoking its implementation function. When the function returns, the "),e("Term",{attrs:{term:"worker"}}),t._v(" reports the result back to the Cadence service which in turn notifies the "),e("Term",{attrs:{term:"workflow"}}),t._v(" about completion. It is possible to implement an "),e("Term",{attrs:{term:"activity"}}),t._v(" fully asynchronously by completing it from a different process.")],1),t._v(" "),e("h2",{attrs:{id:"timeouts"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#timeouts"}},[t._v("#")]),t._v(" Timeouts")]),t._v(" "),e("p",[t._v("Cadence does not impose any system limit on "),e("Term",{attrs:{term:"activity"}}),t._v(" duration. It is up to the application to choose the timeouts for its execution. These are the configurable "),e("Term",{attrs:{term:"activity"}}),t._v(" timeouts:")],1),t._v(" "),e("ul",[e("li",[e("code",[t._v("ScheduleToStart")]),t._v(" is the maximum time from a "),e("Term",{attrs:{term:"workflow"}}),t._v(" requesting "),e("Term",{attrs:{term:"activity"}}),t._v(" execution to a "),e("Term",{attrs:{term:"worker"}}),t._v(" starting its execution. The usual reason for this timeout to fire is all "),e("Term",{attrs:{term:"worker",show:"workers"}}),t._v(" being down or not being able to keep up with the request rate. We recommend setting this timeout to the maximum time a "),e("Term",{attrs:{term:"workflow"}}),t._v(" is willing to wait for an "),e("Term",{attrs:{term:"activity"}}),t._v(" execution in the presence of all possible "),e("Term",{attrs:{term:"worker"}}),t._v(" outages.")],1),t._v(" "),e("li",[e("code",[t._v("StartToClose")]),t._v(" is the maximum time an "),e("Term",{attrs:{term:"activity"}}),t._v(" can execute after it was picked by a "),e("Term",{attrs:{term:"worker"}}),t._v(".")],1),t._v(" "),e("li",[e("code",[t._v("ScheduleToClose")]),t._v(" is the maximum time from the "),e("Term",{attrs:{term:"workflow"}}),t._v(" requesting an "),e("Term",{attrs:{term:"activity"}}),t._v(" execution to its completion.")],1),t._v(" "),e("li",[e("code",[t._v("Heartbeat")]),t._v(" is the maximum time between heartbeat requests. See "),e("a",{attrs:{href:"#long-running-activities"}},[t._v("Long Running Activities")]),t._v(".")])]),t._v(" "),e("p",[t._v("Either "),e("code",[t._v("ScheduleToClose")]),t._v(" or both "),e("code",[t._v("ScheduleToStart")]),t._v(" and "),e("code",[t._v("StartToClose")]),t._v(" timeouts are required.")]),t._v(" "),e("p",[t._v("Timeouts are the key to manage activities. For more tips of how to set proper timeout, read this "),e("a",{attrs:{href:"https://stackoverflow.com/questions/65139178/how-to-set-proper-timeout-values-for-cadence-activitieslocal-and-regular-activi/65139179#65139179",target:"_blank",rel:"noopener noreferrer"}},[t._v("Stack Overflow QA"),e("OutboundLink")],1),t._v(".")]),t._v(" "),e("h2",{attrs:{id:"retries"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#retries"}},[t._v("#")]),t._v(" Retries")]),t._v(" "),e("p",[t._v("As Cadence doesn't recover an "),e("Term",{attrs:{term:"activity"}}),t._v("'s state and they can communicate to any external system, failures are expected. Therefore, Cadence supports automatic "),e("Term",{attrs:{term:"activity"}}),t._v(" retries. Any "),e("Term",{attrs:{term:"activity"}}),t._v(" when invoked can have an associated retry policy. Here are the retry policy parameters:")],1),t._v(" "),e("ul",[e("li",[e("code",[t._v("InitialInterval")]),t._v(" is a delay before the first retry.")]),t._v(" "),e("li",[e("code",[t._v("BackoffCoefficient")]),t._v(". Retry policies are exponential. The coefficient specifies how fast the retry interval is growing. The coefficient of 1 means that the retry interval is always equal to the "),e("code",[t._v("InitialInterval")]),t._v(".")]),t._v(" "),e("li",[e("code",[t._v("MaximumInterval")]),t._v(" specifies the maximum interval between retries. Useful for coefficients more than 1.")]),t._v(" "),e("li",[e("code",[t._v("MaximumAttempts")]),t._v(" specifies how many times to attempt to execute an "),e("Term",{attrs:{term:"activity"}}),t._v(" in the presence of failures. If this limit is exceeded, the error is returned back to the "),e("Term",{attrs:{term:"workflow"}}),t._v(" that invoked the "),e("Term",{attrs:{term:"activity"}}),t._v(". Not required if "),e("code",[t._v("ExpirationInterval")]),t._v(" is specified.")],1),t._v(" "),e("li",[e("code",[t._v("ExpirationInterval")]),t._v(" specifies for how long to attempt executing an "),e("Term",{attrs:{term:"activity"}}),t._v(" in the presence of failures. If this interval is exceeded, the error is returned back to the "),e("Term",{attrs:{term:"workflow"}}),t._v(" that invoked the "),e("Term",{attrs:{term:"activity"}}),t._v(". Not required if "),e("code",[t._v("MaximumAttempts")]),t._v(" is specified.")],1),t._v(" "),e("li",[e("code",[t._v("NonRetryableErrorReasons")]),t._v(" allows you to specify errors that shouldn't be retried. For example retrying invalid arguments error doesn't make sense in some scenarios.")])]),t._v(" "),e("p",[t._v("There are scenarios when not a single "),e("Term",{attrs:{term:"activity"}}),t._v(" but rather the whole part of a "),e("Term",{attrs:{term:"workflow"}}),t._v(" should be retried on failure. For example, a media encoding "),e("Term",{attrs:{term:"workflow"}}),t._v(" that downloads a file to a host, processes it, and then uploads the result back to storage. In this "),e("Term",{attrs:{term:"workflow"}}),t._v(", if the host that hosts the "),e("Term",{attrs:{term:"worker"}}),t._v(" dies, all three "),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v(" should be retried on a different host. Such retries should be handled by the "),e("Term",{attrs:{term:"workflow"}}),t._v(" code as they are very use case specific.")],1),t._v(" "),e("h2",{attrs:{id:"long-running-activities"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#long-running-activities"}},[t._v("#")]),t._v(" Long Running Activities")]),t._v(" "),e("p",[t._v("For long running "),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v(", we recommended that you specify a relatively short heartbeat timeout and constantly heartbeat. This way "),e("Term",{attrs:{term:"worker"}}),t._v(" failures for even very long running "),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v(" can be handled in a timely manner. An "),e("Term",{attrs:{term:"activity"}}),t._v(" that specifies the heartbeat timeout is expected to call the heartbeat method "),e("em",[t._v("periodically")]),t._v(" from its implementation.")],1),t._v(" "),e("p",[t._v("A heartbeat request can include application specific payload. This is useful to save "),e("Term",{attrs:{term:"activity"}}),t._v(" execution progress. If an "),e("Term",{attrs:{term:"activity"}}),t._v(" times out due to a missed heartbeat, the next attempt to execute it can access that progress and continue its execution from that point.")],1),t._v(" "),e("p",[t._v("Long running "),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v(" can be used as a special case of leader election. Cadence timeouts use second resolution. So it is not a solution for realtime applications. But if it is okay to react to the process failure within a few seconds, then a Cadence heartbeat "),e("Term",{attrs:{term:"activity"}}),t._v(" is a good fit.")],1),t._v(" "),e("p",[t._v("One common use case for such leader election is monitoring. An "),e("Term",{attrs:{term:"activity"}}),t._v(" executes an internal loop that periodically polls some API and checks for some condition. It also heartbeats on every iteration. If the condition is satisfied, the "),e("Term",{attrs:{term:"activity"}}),t._v(" completes which lets its "),e("Term",{attrs:{term:"workflow"}}),t._v(" to handle it. If the "),e("Term",{attrs:{term:"activity_worker"}}),t._v(" dies, the "),e("Term",{attrs:{term:"activity"}}),t._v(" times out after the heartbeat interval is exceeded and is retried on a different "),e("Term",{attrs:{term:"worker"}}),t._v(". The same pattern works for polling for new files in Amazon S3 buckets or responses in REST or other synchronous APIs.")],1),t._v(" "),e("h2",{attrs:{id:"cancellation"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#cancellation"}},[t._v("#")]),t._v(" Cancellation")]),t._v(" "),e("p",[t._v("A "),e("Term",{attrs:{term:"workflow"}}),t._v(" can request an "),e("Term",{attrs:{term:"activity"}}),t._v(" cancellation. Currently the only way for an "),e("Term",{attrs:{term:"activity"}}),t._v(" to learn that it was cancelled is through heart beating. The heartbeat request fails with a special error indicating that the "),e("Term",{attrs:{term:"activity"}}),t._v(" was cancelled. Then it is up to the "),e("Term",{attrs:{term:"activity"}}),t._v(" implementation to perform all the necessary cleanup and report that it is done with it. It is up to the "),e("Term",{attrs:{term:"workflow"}}),t._v(" implementation to decide if it wants to wait for the "),e("Term",{attrs:{term:"activity"}}),t._v(" cancellation confirmation or just proceed without waiting.")],1),t._v(" "),e("p",[t._v("Another common case for "),e("Term",{attrs:{term:"activity"}}),t._v(" heartbeat failure is that the "),e("Term",{attrs:{term:"workflow"}}),t._v(" that invoked it is in a completed state. In this case an "),e("Term",{attrs:{term:"activity"}}),t._v(" is expected to perform cleanup as well.")],1),t._v(" "),e("h2",{attrs:{id:"activity-task-routing-through-task-lists"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#activity-task-routing-through-task-lists"}},[t._v("#")]),t._v(" Activity Task Routing through Task Lists")]),t._v(" "),e("p",[e("Term",{attrs:{term:"activity",show:"Activities"}}),t._v(" are dispatched to "),e("Term",{attrs:{term:"worker",show:"workers"}}),t._v(" through "),e("Term",{attrs:{term:"task_list",show:"task_lists"}}),t._v(". "),e("Term",{attrs:{term:"task_list",show:"Task_lists"}}),t._v(" are queues that "),e("Term",{attrs:{term:"worker",show:"workers"}}),t._v(" listen on. "),e("Term",{attrs:{term:"task_list",show:"Task_lists"}}),t._v(" are highly dynamic and lightweight. They don't need to be explicitly registered. And it is okay to have one "),e("Term",{attrs:{term:"task_list"}}),t._v(" per "),e("Term",{attrs:{term:"worker"}}),t._v(" process. It is normal to have more than one "),e("Term",{attrs:{term:"activity"}}),t._v(" type to be invoked through a single "),e("Term",{attrs:{term:"task_list"}}),t._v(". And it is normal in some cases (like host routing) to invoke the same "),e("Term",{attrs:{term:"activity"}}),t._v(" type on multiple "),e("Term",{attrs:{term:"task_list",show:"task_lists"}}),t._v(".")],1),t._v(" "),e("p",[t._v("Here are some use cases for employing multiple "),e("Term",{attrs:{term:"activity_task_list",show:"activity_task_lists"}}),t._v(" in a single workflow:")],1),t._v(" "),e("ul",[e("li",[e("em",[t._v("Flow control")]),t._v(". A "),e("Term",{attrs:{term:"worker"}}),t._v(" that consumes from a "),e("Term",{attrs:{term:"task_list"}}),t._v(" asks for an "),e("Term",{attrs:{term:"activity_task"}}),t._v(" only when it has available capacity. So "),e("Term",{attrs:{term:"worker",show:"workers"}}),t._v(" are never overloaded by request spikes. If "),e("Term",{attrs:{term:"activity"}}),t._v(" executions are requested faster than "),e("Term",{attrs:{term:"worker",show:"workers"}}),t._v(" can process them, they are backlogged in the "),e("Term",{attrs:{term:"task_list"}}),t._v(".")],1),t._v(" "),e("li",[e("em",[t._v("Throttling")]),t._v(". Each "),e("Term",{attrs:{term:"activity_worker"}}),t._v(" can specify the maximum rate it is allowed to processes "),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v(" on a "),e("Term",{attrs:{term:"task_list"}}),t._v(". It does not exceed this limit even if it has spare capacity. There is also support for global "),e("Term",{attrs:{term:"task_list"}}),t._v(" rate limiting. This limit works across all "),e("Term",{attrs:{term:"worker",show:"workers"}}),t._v(" for the given "),e("Term",{attrs:{term:"task_list"}}),t._v(". It is frequently used to limit load on a downstream service that an "),e("Term",{attrs:{term:"activity"}}),t._v(" calls into.")],1),t._v(" "),e("li",[e("em",[t._v("Deploying a set of "),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v(" independently")],1),t._v(". Think about a service that hosts "),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v(" and can be deployed independently from other "),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v(" and "),e("Term",{attrs:{term:"workflow",show:"workflows"}}),t._v(". To send "),e("Term",{attrs:{term:"activity_task",show:"activity_tasks"}}),t._v(" to this service, a separate "),e("Term",{attrs:{term:"task_list"}}),t._v(" is needed.")],1),t._v(" "),e("li",[e("em",[e("Term",{attrs:{term:"worker",show:"Workers"}}),t._v(" with different capabilities")],1),t._v(". For example, "),e("Term",{attrs:{term:"worker",show:"workers"}}),t._v(" on GPU boxes vs non GPU boxes. Having two separate "),e("Term",{attrs:{term:"task_list",show:"task_lists"}}),t._v(" in this case allows "),e("Term",{attrs:{term:"workflow",show:"workflows"}}),t._v(" to pick which one to send "),e("Term",{attrs:{term:"activity"}}),t._v(" an execution request to.")],1),t._v(" "),e("li",[e("em",[t._v("Routing "),e("Term",{attrs:{term:"activity"}}),t._v(" to a specific host")],1),t._v(". For example, in the media encoding case the transform and upload "),e("Term",{attrs:{term:"activity"}}),t._v(" have to run on the same host as the download one.")],1),t._v(" "),e("li",[e("em",[t._v("Routing "),e("Term",{attrs:{term:"activity"}}),t._v(" to a specific process")],1),t._v(". For example, some "),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v(" load large data sets and caches it in the process. The "),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v(" that rely on this data set should be routed to the same process.")],1),t._v(" "),e("li",[e("em",[t._v("Multiple priorities")]),t._v(". One "),e("Term",{attrs:{term:"task_list"}}),t._v(" per priority and having a "),e("Term",{attrs:{term:"worker"}}),t._v(" pool per priority.")],1),t._v(" "),e("li",[e("em",[t._v("Versioning")]),t._v(". A new backwards incompatible implementation of an "),e("Term",{attrs:{term:"activity"}}),t._v(" might use a different "),e("Term",{attrs:{term:"task_list"}}),t._v(".")],1)]),t._v(" "),e("h2",{attrs:{id:"asynchronous-activity-completion"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#asynchronous-activity-completion"}},[t._v("#")]),t._v(" Asynchronous Activity Completion")]),t._v(" "),e("p",[t._v("By default an "),e("Term",{attrs:{term:"activity"}}),t._v(" is a function or a method depending on a client side library language. As soon as the function returns, an "),e("Term",{attrs:{term:"activity"}}),t._v(" completes. But in some cases an "),e("Term",{attrs:{term:"activity"}}),t._v(" implementation is asynchronous. For example it is forwarded to an external system through a message queue. And the reply comes through a different queue.")],1),t._v(" "),e("p",[t._v("To support such use cases, Cadence allows "),e("Term",{attrs:{term:"activity"}}),t._v(" implementations that do not complete upon "),e("Term",{attrs:{term:"activity"}}),t._v(" function completions. A separate API should be used in this case to complete the "),e("Term",{attrs:{term:"activity"}}),t._v(". This API can be called from any process, even in a different programming language, that the original "),e("Term",{attrs:{term:"activity_worker"}}),t._v(" used.")],1),t._v(" "),e("h2",{attrs:{id:"local-activities"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#local-activities"}},[t._v("#")]),t._v(" Local Activities")]),t._v(" "),e("p",[t._v("Some of the "),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v(" are very short lived and do not need the queing semantic, flow control, rate limiting and routing capabilities. For these Cadence supports so called "),e("em",[e("Term",{attrs:{term:"local_activity"}})],1),t._v(" feature. "),e("Term",{attrs:{term:"local_activity",show:"Local_activities"}}),t._v(" are executed in the same "),e("Term",{attrs:{term:"worker"}}),t._v(" process as the "),e("Term",{attrs:{term:"workflow"}}),t._v(" that invoked them.")],1),t._v(" "),e("p",[t._v("What you will trade off by using local activities")]),t._v(" "),e("ul",[e("li",[t._v("Less Debuggability: There is no ActivityTaskScheduled and ActivityTaskStarted events. So you would not able to see the input.")]),t._v(" "),e("li",[t._v("No tasklist dispatching: The worker is always the same as the workflow decision worker. You don't have a choice of using activity workers.")]),t._v(" "),e("li",[t._v("More possibility of duplicated execution. Though regular activity could also execute multiple times when using retry policy, local activity has more chance of ocurring. Because local activity result is not recorded into history until DecisionTaskCompleted. Also when executing multiple local activities in a row, SDK(Java+Golang) would optimize recording in a way that only recording by interval(before current decision task timeout).")]),t._v(" "),e("li",[t._v("No long running capability with record heartbeat")]),t._v(" "),e("li",[t._v("No Tasklist global ratelimiting")])]),t._v(" "),e("p",[t._v("Consider using "),e("Term",{attrs:{term:"local_activity",show:"local_activities"}}),t._v(" for functions that are:")],1),t._v(" "),e("ul",[e("li",[t._v("idempotent")]),t._v(" "),e("li",[t._v("no longer than a few seconds")]),t._v(" "),e("li",[t._v("do not require global rate limiting")]),t._v(" "),e("li",[t._v("do not require routing to specific "),e("Term",{attrs:{term:"worker",show:"workers"}}),t._v(" or pools of "),e("Term",{attrs:{term:"worker",show:"workers"}})],1),t._v(" "),e("li",[t._v("can be implemented in the same binary as the "),e("Term",{attrs:{term:"workflow"}}),t._v(" that invokes them")],1),t._v(" "),e("li",[t._v("non business critical so that losing some debuggability is okay(e.g. logging, loading config)")]),t._v(" "),e("li",[t._v("when you really need optimization. For example, if there are many timers firing at the same time to invoke activities, it could overload Cadence's server. Using local activities can help save the server capacity.")])]),t._v(" "),e("p",[t._v("The main benefit of "),e("Term",{attrs:{term:"local_activity",show:"local_activities"}}),t._v(" is that they are much more efficient in utilizing Cadence service resources and have much lower latency overhead comparing to the usual "),e("Term",{attrs:{term:"activity"}}),t._v(" invocation.")],1)])}),[],!1,null,null,null);e.default=a.exports}}]);