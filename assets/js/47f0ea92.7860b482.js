"use strict";(self.webpackChunkcadence=self.webpackChunkcadence||[]).push([[4669],{6981:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>r,default:()=>h,frontMatter:()=>c,metadata:()=>o,toc:()=>l});const o=JSON.parse('{"id":"java-client/continue-as-new","title":"Continue As New","description":"Workflows: that need to rerun periodically could naively be implemented as a big for loop with","source":"@site/docs/04-java-client/15-continue-as-new.md","sourceDirName":"04-java-client","slug":"/java-client/continue-as-new","permalink":"/Cadence-Docs/docs/java-client/continue-as-new","draft":false,"unlisted":false,"editUrl":"https://github.com/cadence-workflow/Cadence-Docs/tree/master/docs/04-java-client/15-continue-as-new.md","tags":[],"version":"current","sidebarPosition":15,"frontMatter":{"layout":"default","title":"Continue As New","permalink":"/docs/java-client/continue-as-new"},"sidebar":"docsSidebar","previous":{"title":"Exception Handling","permalink":"/Cadence-Docs/docs/java-client/exception-handling"},"next":{"title":"Side Effect","permalink":"/Cadence-Docs/docs/java-client/side-effect"}}');var i=t(4848),a=t(8453);const c={layout:"default",title:"Continue As New",permalink:"/docs/java-client/continue-as-new"},r="Continue as new",s={},l=[];function d(e){const n={a:"a",code:"code",h1:"h1",header:"header",p:"p",pre:"pre",strong:"strong",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"continue-as-new",children:"Continue as new"})}),"\n",(0,i.jsxs)(n.p,{children:["Workflows that need to rerun periodically could naively be implemented as a big ",(0,i.jsx)(n.strong,{children:"for"})," loop with\na sleep where the entire logic of the workflow is inside the body of the ",(0,i.jsx)(n.strong,{children:"for"})," loop. The problem\nwith this approach is that the history for that workflow will keep growing to a point where it\nreaches the maximum size enforced by the service."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://www.javadoc.io/static/com.uber.cadence/cadence-client/2.7.9-alpha/com/cadence-workflow/cadence/workflow/Workflow.html#continueAsNew-java.lang.Object...-",children:(0,i.jsx)(n.strong,{children:"ContinueAsNew"})}),"\nis the low level construct that enables implementing such workflows without the\nrisk of failures down the road. The operation atomically completes the current execution and starts\na new execution of the workflow with the same ",(0,i.jsx)(n.strong,{children:"workflow_ID"}),". The new execution will not carry\nover any history from the old execution."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:'@Override\npublic void greet(String name) {\n  activities.greet("Hello " + name + "!");\n  Workflow.continueAsNew(name);\n}\n\n'})})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>c,x:()=>r});var o=t(6540);const i={},a=o.createContext(i);function c(e){const n=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),o.createElement(a.Provider,{value:n},e.children)}}}]);