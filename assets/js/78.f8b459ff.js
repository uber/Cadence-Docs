(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{384:function(t,e,a){"use strict";a.r(e);var s=a(0),n=Object(s.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"executing-activities"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#executing-activities"}},[t._v("#")]),t._v(" Executing activities")]),t._v(" "),e("p",[t._v("The primary responsibility of a "),e("Term",{attrs:{term:"workflow"}}),t._v(" implementation is to schedule "),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v(" for execution. The\nmost straightforward way to do this is via the library method "),e("code",[t._v("workflow.ExecuteActivity")]),t._v(". The following\nsample code demonstrates making this call:")],1),t._v(" "),e("div",{staticClass:"language-go extra-class"},[e("pre",{pre:!0,attrs:{class:"language-go"}},[e("code",[t._v("ao "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" cadence"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ActivityOptions"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    TaskList"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("               "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sampleTaskList"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    ScheduleToCloseTimeout"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" time"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Second "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("60")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    ScheduleToStartTimeout"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" time"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Second "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("60")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    StartToCloseTimeout"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("    time"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Second "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("60")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    HeartbeatTimeout"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("       time"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Second "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    WaitForCancellation"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("    "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nctx "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" cadence"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("WithActivityOptions")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" ao"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nfuture "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" workflow"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("ExecuteActivity")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" SimpleActivity"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" value"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" result "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" err "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" future"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Get")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("result"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" err "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" err\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("Let's take a look at each component of this call.")]),t._v(" "),e("h2",{attrs:{id:"activity-options"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#activity-options"}},[t._v("#")]),t._v(" Activity options")]),t._v(" "),e("p",[t._v("Before calling "),e("code",[t._v("workflow.ExecuteActivity()")]),t._v(", you must configure "),e("code",[t._v("ActivityOptions")]),t._v(" for the\ninvocation. These options customize various execution timeouts, and are passed in by creating a child\ncontext from the initial context and overwriting the desired values. The child context is then passed\ninto the "),e("code",[t._v("workflow.ExecuteActivity()")]),t._v(" call. If multiple "),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v(" are sharing the same option\nvalues, then the same context instance can be used when calling "),e("code",[t._v("workflow.ExecuteActivity()")]),t._v(".")],1),t._v(" "),e("h2",{attrs:{id:"activity-timeouts"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#activity-timeouts"}},[t._v("#")]),t._v(" Activity timeouts")]),t._v(" "),e("p",[t._v("There can be various kinds of timeouts associated with an "),e("Term",{attrs:{term:"activity"}}),t._v(". Cadence guarantees that "),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v("\nare executed "),e("em",[t._v("at most once")]),t._v(", so an "),e("Term",{attrs:{term:"activity"}}),t._v(" either succeeds or fails with one of the following timeouts:")],1),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Timeout")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[e("code",[t._v("StartToCloseTimeout")])]),t._v(" "),e("td",[t._v("Maximum time that a worker can take to process a task after it has received the task.")])]),t._v(" "),e("tr",[e("td",[e("code",[t._v("ScheduleToStartTimeout")])]),t._v(" "),e("td",[t._v("Time a task can wait to be picked up by an "),e("Term",{attrs:{term:"activity_worker"}}),t._v(" after a "),e("Term",{attrs:{term:"workflow"}}),t._v(" schedules it. If there are no workers available to process this task for the specified duration, the task will time out.")],1)]),t._v(" "),e("tr",[e("td",[e("code",[t._v("ScheduleToCloseTimeout")])]),t._v(" "),e("td",[t._v("Time a task can take to complete after it is scheduled by a "),e("Term",{attrs:{term:"workflow"}}),t._v(". This is usually greater than the sum of "),e("code",[t._v("StartToClose")]),t._v(" and "),e("code",[t._v("ScheduleToStart")]),t._v(" timeouts.")],1)]),t._v(" "),e("tr",[e("td",[e("code",[t._v("HeartbeatTimeout")])]),t._v(" "),e("td",[t._v("If a task doesn't heartbeat to the Cadence service for this duration, it will be considered to have failed. This is useful for long-running tasks.")])])])]),t._v(" "),e("h2",{attrs:{id:"executeactivity-call"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#executeactivity-call"}},[t._v("#")]),t._v(" ExecuteActivity call")]),t._v(" "),e("p",[t._v("The first parameter in the call is the required "),e("code",[t._v("cadence.Context")]),t._v(" object. This type is a copy of\n"),e("code",[t._v("context.Context")]),t._v(" with the "),e("code",[t._v("Done()")]),t._v(" method returning "),e("code",[t._v("cadence.Channel")]),t._v(" instead of the native Go "),e("code",[t._v("chan")]),t._v(".")]),t._v(" "),e("p",[t._v("The second parameter is the function that we registered as an "),e("Term",{attrs:{term:"activity"}}),t._v(" function. This parameter can\nalso be a string representing the fully qualified name of the "),e("Term",{attrs:{term:"activity"}}),t._v(" function. The benefit of passing\nin the actual function object is that the framework can validate "),e("Term",{attrs:{term:"activity"}}),t._v(" parameters.")],1),t._v(" "),e("p",[t._v("The remaining parameters are passed to the "),e("Term",{attrs:{term:"activity"}}),t._v(" as part of the call. In our example, we have a\nsingle parameter: "),e("code",[t._v("value")]),t._v(". This list of parameters must match the list of parameters declared by\nthe "),e("Term",{attrs:{term:"activity"}}),t._v(" function. The Cadence client library will validate this.")],1),t._v(" "),e("p",[t._v("The method call returns immediately and returns a "),e("code",[t._v("cadence.Future")]),t._v(". This allows you to execute more\ncode without having to wait for the scheduled "),e("Term",{attrs:{term:"activity"}}),t._v(" to complete.")],1),t._v(" "),e("p",[t._v("When you are ready to process the results of the "),e("Term",{attrs:{term:"activity"}}),t._v(", call the "),e("code",[t._v("Get()")]),t._v(" method on the future\nobject returned. The parameters to this method are the "),e("code",[t._v("ctx")]),t._v(" object we passed to the\n"),e("code",[t._v("workflow.ExecuteActivity()")]),t._v(" call and an output parameter that will receive the output of the\n"),e("Term",{attrs:{term:"activity"}}),t._v(". The type of the output parameter must match the type of the return value declared by the\n"),e("Term",{attrs:{term:"activity"}}),t._v(" function. The "),e("code",[t._v("Get()")]),t._v(" method will block until the "),e("Term",{attrs:{term:"activity"}}),t._v(" completes and results are\navailable.")],1),t._v(" "),e("p",[t._v("You can retrieve the result value returned by "),e("code",[t._v("workflow.ExecuteActivity()")]),t._v(" from the future and use\nit like any normal result from a synchronous function call. The following sample code demonstrates how\nyou can use the result if it is a string value:")]),t._v(" "),e("div",{staticClass:"language-go extra-class"},[e("pre",{pre:!0,attrs:{class:"language-go"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" result "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" err "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" future"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Get")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx1"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("result"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" err "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" err\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("switch")]),t._v(" result "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"apple"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Do something.")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"banana"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Do something.")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" err\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("In this example, we called the "),e("code",[t._v("Get()")]),t._v(" method on the returned future immediately after "),e("code",[t._v("workflow.ExecuteActivity()")]),t._v(".\nHowever, this is not necessary. If you want to execute multiple "),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v(" in parallel, you can\nrepeatedly call "),e("code",[t._v("workflow.ExecuteActivity()")]),t._v(", store the returned futures, and then wait for all\n"),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v(" to complete by calling the "),e("code",[t._v("Get()")]),t._v(" methods of the future at a later time.")],1),t._v(" "),e("p",[t._v("To implement more complex wait conditions on returned future objects, use the "),e("code",[t._v("cadence.Selector")]),t._v(" class.")])])}),[],!1,null,null,null);e.default=n.exports}}]);