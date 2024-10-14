(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{371:function(t,e,a){"use strict";a.r(e);var r=a(0),s=Object(r.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"queries"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#queries"}},[t._v("#")]),t._v(" Queries")]),t._v(" "),e("p",[t._v("Query is to expose this internal state to the external world Cadence provides a synchronous "),e("Term",{attrs:{term:"query"}}),t._v(" feature. From the "),e("Term",{attrs:{term:"workflow"}}),t._v(" implementer point of view the "),e("Term",{attrs:{term:"query"}}),t._v(" is exposed as a synchronous callback that is invoked by external entities. Multiple such callbacks can be provided per "),e("Term",{attrs:{term:"workflow"}}),t._v(" type exposing different information to different external systems.")],1),t._v(" "),e("p",[e("Term",{attrs:{term:"query",show:"Query"}}),t._v(" callbacks must be read-only not mutating the "),e("Term",{attrs:{term:"workflow"}}),t._v(" state in any way. The other limitation is that the "),e("Term",{attrs:{term:"query"}}),t._v(" callback cannot contain any blocking code. Both above limitations rule out ability to invoke "),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v(" from the "),e("Term",{attrs:{term:"query"}}),t._v(" handlers.")],1),t._v(" "),e("h2",{attrs:{id:"built-in-query-stack-trace"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#built-in-query-stack-trace"}},[t._v("#")]),t._v(" Built-in Query: Stack Trace")]),t._v(" "),e("p",[t._v("If a "),e("Term",{attrs:{term:"workflow_execution"}}),t._v(" has been stuck at a state for longer than an expected period of time, you\nmight want to "),e("Term",{attrs:{term:"query"}}),t._v(" the current call stack. You can use the Cadence "),e("Term",{attrs:{term:"CLI"}}),t._v(" to perform this "),e("Term",{attrs:{term:"query"}}),t._v(". For\nexample:")],1),t._v(" "),e("p",[e("code",[t._v("cadence-cli --domain samples-domain workflow query -w my_workflow_id -r my_run_id -qt __stack_trace")])]),t._v(" "),e("p",[t._v("This command uses "),e("code",[t._v("__stack_trace")]),t._v(", which is a built-in "),e("Term",{attrs:{term:"query"}}),t._v(" type supported by the Cadence client\nlibrary. You can add custom "),e("Term",{attrs:{term:"query"}}),t._v(" types to handle "),e("Term",{attrs:{term:"query",show:"queries"}}),t._v(" such as "),e("Term",{attrs:{term:"query",show:"querying"}}),t._v(" the current state of a\n"),e("Term",{attrs:{term:"workflow"}}),t._v(", or "),e("Term",{attrs:{term:"query",show:"querying"}}),t._v(" how many "),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v(" the "),e("Term",{attrs:{term:"workflow"}}),t._v(" has completed.")],1),t._v(" "),e("h2",{attrs:{id:"customized-query"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#customized-query"}},[t._v("#")]),t._v(" Customized Query")]),t._v(" "),e("p",[t._v("Cadence provides a "),e("Term",{attrs:{term:"query"}}),t._v(" feature that supports synchronously returning any information from a "),e("Term",{attrs:{term:"workflow"}}),t._v(" to an external caller.")],1),t._v(" "),e("p",[t._v("Interface "),e("a",{attrs:{href:"https://www.javadoc.io/doc/com.uber.cadence/cadence-client/latest/com/uber/cadence/workflow/QueryMethod.html",target:"_blank",rel:"noopener noreferrer"}},[e("strong",[t._v("QueryMethod")]),e("OutboundLink")],1),t._v(" indicates that the method is a query method. Query method can be used to query a workflow state by external process at any time during its execution. This annotation applies only to workflow interface methods.")]),t._v(" "),e("p",[t._v("See the "),e("a",{attrs:{href:"https://github.com/uber/cadence-java-samples/blob/master/src/main/java/com/uber/cadence/samples/hello/HelloQuery.java",target:"_blank",rel:"noopener noreferrer"}},[e("Term",{attrs:{term:"workflow"}}),e("OutboundLink")],1),t._v(" example code :")]),t._v(" "),e("div",{staticClass:"language-java extra-class"},[e("pre",{pre:!0,attrs:{class:"language-java"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("HelloWorld")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@WorkflowMethod")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("sayHello")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" name"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@SignalMethod")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("updateGreeting")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" greeting"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@QueryMethod")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("getCount")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("HelloWorldImpl")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("implements")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("HelloWorld")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" greeting "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Hello"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" count "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Override")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("sayHello")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" name"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Bye"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("equals")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("greeting"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            logger"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("info")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),t._v("count "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('": "')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" greeting "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('" "')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" name "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"!"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" oldGreeting "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" greeting"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Workflow")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("await")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Objects")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("equals")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("greeting"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" oldGreeting"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        logger"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("info")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),t._v("count "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('": "')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" greeting "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('" "')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" name "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"!"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Override")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("updateGreeting")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" greeting"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("greeting "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" greeting"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Override")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("getCount")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" count"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("The new "),e("code",[t._v("getCount")]),t._v(" method annotated with "),e("code",[t._v("@QueryMethod")]),t._v(" was added to the "),e("Term",{attrs:{term:"workflow"}}),t._v(" interface definition. It is allowed\nto have multiple "),e("Term",{attrs:{term:"query"}}),t._v(" methods per "),e("Term",{attrs:{term:"workflow"}}),t._v(" interface.")],1),t._v(" "),e("p",[t._v("The main restriction on the implementation of the "),e("Term",{attrs:{term:"query"}}),t._v(" method is that it is not allowed to modify "),e("Term",{attrs:{term:"workflow"}}),t._v(" state in any form.\nIt also is not allowed to block its thread in any way. It usually just returns a value derived from the fields of the "),e("Term",{attrs:{term:"workflow"}}),t._v(" object.")],1),t._v(" "),e("h2",{attrs:{id:"run-query-from-command-line"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#run-query-from-command-line"}},[t._v("#")]),t._v(" Run Query from Command Line")]),t._v(" "),e("p",[t._v("Let's run the updated "),e("Term",{attrs:{term:"worker"}}),t._v(" and send a couple "),e("Term",{attrs:{term:"signal",show:"signals"}}),t._v(" to it:")],1),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("cadence: "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" run "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--network")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("host "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--rm")]),t._v(" ubercadence/cli:master "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--do")]),t._v(" test-domain workflow start  "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--workflow_id")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"HelloQuery"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--tasklist")]),t._v(" HelloWorldTaskList "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--workflow_type")]),t._v(" HelloWorld::sayHello "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--execution_timeout")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("3600")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--input")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v('"World'),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v('"\nStarted Workflow Id: HelloQuery, run Id: 1925f668-45b5-4405-8cba-74f7c68c3135\ncadence: '),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" run "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--network")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("host "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--rm")]),t._v(" ubercadence/cli:master "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--do")]),t._v(" test-domain workflow signal "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--workflow_id")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"HelloQuery"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--name")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"HelloWorld::updateGreeting"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--input")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v('"Hi'),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v('"\nSignal workflow succeeded.\ncadence: '),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" run "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--network")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("host "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--rm")]),t._v(" ubercadence/cli:master "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--do")]),t._v(" test-domain workflow signal "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--workflow_id")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"HelloQuery"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--name")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"HelloWorld::updateGreeting"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--input")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v('"Welcome'),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v('"\nSignal workflow succeeded.\n')])])]),e("p",[t._v("The "),e("Term",{attrs:{term:"worker"}}),t._v(" output:")],1),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token number"}},[t._v("17")]),t._v(":35:50.485 "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("workflow-root"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" INFO  c.u.c.samples.hello.GettingStarted - "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(": Hello World"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("17")]),t._v(":36:10.483 "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("workflow-root"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" INFO  c.u.c.samples.hello.GettingStarted - "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(": Hi World"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("17")]),t._v(":36:16.204 "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("workflow-root"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" INFO  c.u.c.samples.hello.GettingStarted - "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v(": Welcome World"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("\n")])])]),e("p",[t._v("Now let's "),e("Term",{attrs:{term:"query"}}),t._v(" the "),e("Term",{attrs:{term:"workflow"}}),t._v(" using the "),e("Term",{attrs:{term:"CLI",show:""}})],1),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("cadence: "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" run "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--network")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("host "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--rm")]),t._v(" ubercadence/cli:master "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--do")]),t._v(" test-domain workflow query "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--workflow_id")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"HelloQuery"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--query_type")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"HelloWorld::getCount"')]),t._v("\n:query:Query: result as JSON:\n"),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v("\n")])])]),e("p",[t._v("One limitation of the "),e("Term",{attrs:{term:"query"}}),t._v(" is that it requires a "),e("Term",{attrs:{term:"worker"}}),t._v(" process running because it is executing callback code.\nAn interesting feature of the "),e("Term",{attrs:{term:"query"}}),t._v(" is that it works for completed "),e("Term",{attrs:{term:"workflow",show:"workflows"}}),t._v(" as well. Let's complete the "),e("Term",{attrs:{term:"workflow"}}),t._v(' by sending "Bye" and '),e("Term",{attrs:{term:"query"}}),t._v(" it.")],1),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("cadence: "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" run "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--network")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("host "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--rm")]),t._v(" ubercadence/cli:master "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--do")]),t._v(" test-domain workflow signal "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--workflow_id")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"HelloQuery"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--name")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"HelloWorld::updateGreeting"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--input")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v('"Bye'),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v('"\nSignal workflow succeeded.\ncadence: '),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" run "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--network")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("host "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--rm")]),t._v(" ubercadence/cli:master "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--do")]),t._v(" test-domain workflow query "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--workflow_id")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"HelloQuery"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--query_type")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"HelloWorld::getCount"')]),t._v("\n:query:Query: result as JSON:\n"),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),t._v("\n")])])]),e("p",[t._v("The "),e("Term",{attrs:{term:"query",show:"Query"}}),t._v(" method can accept parameters. This might be useful if only part of the "),e("Term",{attrs:{term:"workflow"}}),t._v(" state should be returned.")],1),t._v(" "),e("h2",{attrs:{id:"run-query-from-external-application-code"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#run-query-from-external-application-code"}},[t._v("#")]),t._v(" Run Query from external application code")]),t._v(" "),e("p",[t._v("The "),e("a",{attrs:{href:"https://www.javadoc.io/static/com.uber.cadence/cadence-client/2.7.9-alpha/com/uber/cadence/client/WorkflowClient.html#newWorkflowStub-java.lang.Class-java.lang.String-",target:"_blank",rel:"noopener noreferrer"}},[t._v("WorkflowStub"),e("OutboundLink")],1),t._v(" without WorkflowOptions is for signal or "),e("a",{attrs:{href:"/docs/java-client/queries"}},[t._v("query")])]),t._v(" "),e("h2",{attrs:{id:"consistent-query"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#consistent-query"}},[t._v("#")]),t._v(" Consistent Query")]),t._v(" "),e("p",[e("Term",{attrs:{term:"query",show:"Query"}}),t._v(" has two consistency levels, eventual and strong. Consider if you were to "),e("Term",{attrs:{term:"signal"}}),t._v(" a "),e("Term",{attrs:{term:"workflow"}}),t._v(" and then\nimmediately "),e("Term",{attrs:{term:"query"}}),t._v(" the "),e("Term",{attrs:{term:"workflow",show:""}})],1),t._v(" "),e("p",[e("code",[t._v("cadence-cli --domain samples-domain workflow signal -w my_workflow_id -r my_run_id -n signal_name -if ./input.json")])]),t._v(" "),e("p",[e("code",[t._v("cadence-cli --domain samples-domain workflow query -w my_workflow_id -r my_run_id -qt current_state")])]),t._v(" "),e("p",[t._v("In this example if "),e("Term",{attrs:{term:"signal"}}),t._v(" were to change "),e("Term",{attrs:{term:"workflow"}}),t._v(" state, "),e("Term",{attrs:{term:"query"}}),t._v(" may or may not see that state update reflected\nin the "),e("Term",{attrs:{term:"query"}}),t._v(" result. This is what it means for "),e("Term",{attrs:{term:"query"}}),t._v(" to be eventually consistent.")],1),t._v(" "),e("p",[e("Term",{attrs:{term:"query",show:"Query"}}),t._v(" has another consistency level called strong consistency. A strongly consistent "),e("Term",{attrs:{term:"query"}}),t._v(" is guaranteed\nto be based on "),e("Term",{attrs:{term:"workflow"}}),t._v(" state which includes all "),e("Term",{attrs:{term:"event",show:"events"}}),t._v(" that came before the "),e("Term",{attrs:{term:"query"}}),t._v(" was issued. An "),e("Term",{attrs:{term:"event"}}),t._v("\nis considered to have come before a "),e("Term",{attrs:{term:"query"}}),t._v(" if the call creating the external "),e("Term",{attrs:{term:"event"}}),t._v(" returned success before\nthe "),e("Term",{attrs:{term:"query"}}),t._v(" was issued. External "),e("Term",{attrs:{term:"event",show:"events"}}),t._v(" which are created while the "),e("Term",{attrs:{term:"query"}}),t._v(" is outstanding may or may not\nbe reflected in the "),e("Term",{attrs:{term:"workflow"}}),t._v(" state the "),e("Term",{attrs:{term:"query"}}),t._v(" result is based on.")],1),t._v(" "),e("p",[t._v("In order to run consistent "),e("Term",{attrs:{term:"query"}}),t._v(" through the "),e("Term",{attrs:{term:"CLI"}}),t._v(" do the following:")],1),t._v(" "),e("p",[e("code",[t._v("cadence-cli --domain samples-domain workflow query -w my_workflow_id -r my_run_id -qt current_state --qcl strong")])]),t._v(" "),e("p",[t._v("In order to run a "),e("Term",{attrs:{term:"query"}}),t._v(" using application code, you need to use "),e("a",{attrs:{href:"https://www.javadoc.io/doc/com.uber.cadence/cadence-client/latest/com/uber/cadence/WorkflowService.Iface.html#SignalWorkflowExecution-com.uber.cadence.SignalWorkflowExecutionRequest-",target:"_blank",rel:"noopener noreferrer"}},[t._v("service client"),e("OutboundLink")],1),t._v(".")],1),t._v(" "),e("p",[t._v("When using strongly consistent "),e("Term",{attrs:{term:"query"}}),t._v(" you should expect higher latency than eventually consistent "),e("Term",{attrs:{term:"query"}}),t._v(".")],1)])}),[],!1,null,null,null);e.default=s.exports}}]);