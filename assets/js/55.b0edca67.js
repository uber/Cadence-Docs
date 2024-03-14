(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{360:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"workflow-interface"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#workflow-interface"}},[t._v("#")]),t._v(" Workflow interface")]),t._v(" "),s("p",[s("Term",{attrs:{term:"workflow",show:"Workflow"}}),t._v(" encapsulates the orchestration of "),s("Term",{attrs:{term:"activity",show:"activities"}}),t._v(" and child "),s("Term",{attrs:{term:"workflow",show:"workflows"}}),t._v(".\nIt can also answer synchronous "),s("Term",{attrs:{term:"query",show:"queries"}}),t._v(" and receive external "),s("Term",{attrs:{term:"event",show:"events"}}),t._v(" (also known as "),s("Term",{attrs:{term:"signal",show:"signals"}}),t._v(").")],1),t._v(" "),s("p",[t._v("A "),s("Term",{attrs:{term:"workflow"}}),t._v(" must define an interface class. All of its methods must have one of the following annotations:")],1),t._v(" "),s("ul",[s("li",[s("strong",[t._v("@WorkflowMethod")]),t._v(" indicates an entry point to a "),s("Term",{attrs:{term:"workflow"}}),t._v(". It contains parameters such as timeouts and a "),s("Term",{attrs:{term:"task_list"}}),t._v(".\nRequired parameters (such as "),s("code",[t._v("executionStartToCloseTimeoutSeconds")]),t._v(") that are not specified through the annotation must be provided at runtime.")],1),t._v(" "),s("li",[s("strong",[t._v("@SignalMethod")]),t._v(" indicates a method that reacts to external "),s("Term",{attrs:{term:"signal",show:"signals"}}),t._v(". It must have a "),s("code",[t._v("void")]),t._v(" return type.")],1),t._v(" "),s("li",[s("strong",[t._v("@QueryMethod")]),t._v(" indicates a method that reacts to synchronous "),s("Term",{attrs:{term:"query"}}),t._v(" requests.")],1)]),t._v(" "),s("p",[t._v("You can have more than one method with the same annotation (except @WorkflowMethod). For example:")]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("FileProcessingWorkflow")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@WorkflowMethod")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("executionStartToCloseTimeoutSeconds "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" taskList "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"file-processing"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("processFile")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Arguments")]),t._v(" args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@QueryMethod")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"history"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("List")]),s("span",{pre:!0,attrs:{class:"token generics"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getHistory")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@QueryMethod")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"status"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getStatus")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@SignalMethod")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("retryNow")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@SignalMethod")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("abandon")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("We recommended that you use a single value type argument for "),s("Term",{attrs:{term:"workflow"}}),t._v(" methods. In this way, adding new arguments as fields to the value type is a backwards-compatible change.")],1)])}),[],!1,null,null,null);s.default=e.exports}}]);