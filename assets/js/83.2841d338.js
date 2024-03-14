(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{389:function(t,e,n){"use strict";n.r(e);var s=n(0),a=Object(s.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"side-effect"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#side-effect"}},[t._v("#")]),t._v(" Side effect")]),t._v(" "),e("p",[e("code",[t._v("workflow.SideEffect")]),t._v(" is useful for short, nondeterministic code snippets, such as getting a random\nvalue or generating a UUID. It executes the provided function once and records its result into the\n"),e("Term",{attrs:{term:"workflow"}}),t._v(" history. "),e("code",[t._v("workflow.SideEffect")]),t._v(' does not re-execute upon replay, but instead returns the\nrecorded result. It can be seen as an "inline" '),e("Term",{attrs:{term:"activity"}}),t._v(". Something to note about "),e("code",[t._v("workflow.SideEffect")]),t._v("\nis that, unlike the Cadence guarantee of at-most-once execution for "),e("Term",{attrs:{term:"activity",show:"activities"}}),t._v(", there is no such\nguarantee with "),e("code",[t._v("workflow.SideEffect")]),t._v(". Under certain failure conditions, "),e("code",[t._v("workflow.SideEffect")]),t._v(" can\nend up executing a function more than once.")],1),t._v(" "),e("p",[t._v("The only way to fail "),e("code",[t._v("SideEffect")]),t._v(" is to panic, which causes a "),e("Term",{attrs:{term:"decision_task"}}),t._v(" failure. After the\ntimeout, Cadence reschedules and then re-executes the "),e("Term",{attrs:{term:"decision_task"}}),t._v(", giving "),e("code",[t._v("SideEffect")]),t._v(" another chance\nto succeed. Do not return any data from "),e("code",[t._v("SideEffect")]),t._v(" other than through its recorded return value.")],1),t._v(" "),e("p",[t._v("The following sample demonstrates how to use "),e("code",[t._v("SideEffect")]),t._v(":")]),t._v(" "),e("div",{staticClass:"language-go extra-class"},[e("pre",{pre:!0,attrs:{class:"language-go"}},[e("code",[t._v("encodedRandom "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("SideEffect")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx cadence"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Context"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" rand"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Intn")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" random "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),t._v("\nencodedRandom"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Get")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("random"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" random "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("50")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);e.default=a.exports}}]);