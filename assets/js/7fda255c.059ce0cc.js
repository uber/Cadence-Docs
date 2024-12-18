"use strict";(self.webpackChunkcadence=self.webpackChunkcadence||[]).push([[4978],{7786:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>c,contentTitle:()=>s,default:()=>h,frontMatter:()=>a,metadata:()=>t,toc:()=>l});var t=n(9426),r=n(4848),o=n(8453);const a={title:"Cadence non-derministic errors common question Q&A (part 1)",date:new Date("2024-03-10T00:00:00.000Z"),authors:"chopincode",tags:["deep-dive"]},s=void 0,c={authorsImageUrls:[void 0]},l=[{value:"If I change code logic inside an Cadence activity (for example, my activity is calling database A but now I want it to call database B),  will it trigger an non-deterministic error?",id:"if-i-change-code-logic-inside-an-cadence-activity-for-example-my-activity-is-calling-database-a-but-now-i-want-it-to-call-database-b--will-it-trigger-an-non-deterministic-error",level:3},{value:"Does changing the workflow definition trigger non-determinstic errors?",id:"does-changing-the-workflow-definition-trigger-non-determinstic-errors",level:3},{value:"Does changing activity definitions trigger non-determinstic errors?",id:"does-changing-activity-definitions-trigger-non-determinstic-errors",level:3},{value:"What changes inside workflows may potentially trigger non-deterministic errors?",id:"what-changes-inside-workflows-may-potentially-trigger-non-deterministic-errors",level:3},{value:"Are Cadence signals replayed? If definition of signal is changed, will it trigger non-deterministic errors?",id:"are-cadence-signals-replayed-if-definition-of-signal-is-changed-will-it-trigger-non-deterministic-errors",level:3},{value:"If I have new business requirement and really need to change the definition of a workflow, what should I do?",id:"if-i-have-new-business-requirement-and-really-need-to-change-the-definition-of-a-workflow-what-should-i-do",level:3},{value:"Does changes to local activities&#39; definition trigger non-deterministic errors?",id:"does-changes-to-local-activities-definition-trigger-non-deterministic-errors",level:3}];function d(e){const i={a:"a",h3:"h3",li:"li",p:"p",ul:"ul",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.h3,{id:"if-i-change-code-logic-inside-an-cadence-activity-for-example-my-activity-is-calling-database-a-but-now-i-want-it-to-call-database-b--will-it-trigger-an-non-deterministic-error",children:"If I change code logic inside an Cadence activity (for example, my activity is calling database A but now I want it to call database B),  will it trigger an non-deterministic error?"}),"\n",(0,r.jsxs)(i.p,{children:[(0,r.jsx)("b",{children:"NO"}),". This change will not trigger non-deterministic error."]}),"\n",(0,r.jsx)(i.p,{children:"An Activity is the smallest unit of execution for Cadence and what happens inside activities are not recorded as historical events and therefore will not be replayed. In short, this change is deterministic and it is fine to modify logic inside activities."}),"\n",(0,r.jsx)(i.h3,{id:"does-changing-the-workflow-definition-trigger-non-determinstic-errors",children:"Does changing the workflow definition trigger non-determinstic errors?"}),"\n",(0,r.jsxs)(i.p,{children:[(0,r.jsx)("b",{children:"YES"}),". This is a very typical non-deterministic error."]}),"\n",(0,r.jsx)(i.p,{children:"When a new workflow code change is deployed, Cadence will find if it is compatible with\nCadence history. Changes to workflow definition will fail the replay process of Cadence\nas it finds the new workflow definition imcompatible with previous historical events."}),"\n",(0,r.jsx)(i.p,{children:"Here is a list of common workflow definition changes."}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Changing workflow parameter counts"}),"\n",(0,r.jsx)(i.li,{children:"Changing workflow parameter types"}),"\n",(0,r.jsx)(i.li,{children:"Changing workflow return types"}),"\n"]}),"\n",(0,r.jsx)(i.p,{children:"The following changes are not categorized as definition changes and therefore will not\ntrigger non-deterministic errors."}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Changes of workflow return values"}),"\n",(0,r.jsx)(i.li,{children:"Changing workflow parameter names as they are just positional"}),"\n"]}),"\n",(0,r.jsx)(i.h3,{id:"does-changing-activity-definitions-trigger-non-determinstic-errors",children:"Does changing activity definitions trigger non-determinstic errors?"}),"\n",(0,r.jsxs)(i.p,{children:[(0,r.jsx)("b",{children:"YES"}),". Similar to workflow definition change, this is also a very typical non-deterministic error."]}),"\n",(0,r.jsx)(i.p,{children:"Activities are also recorded and replayed by Cadence. Therefore, changes to activity must also be compatible with Cadence history. The following changes are common ones that trigger non-deterministic errors."}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Changing activity parameter counts"}),"\n",(0,r.jsx)(i.li,{children:"Changing activity parameter types"}),"\n",(0,r.jsx)(i.li,{children:"Changing activity return types"}),"\n"]}),"\n",(0,r.jsx)(i.p,{children:"As activity paremeters are also positional, these two changes will NOT trigger non-deterministic errors."}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Changes of activity return values"}),"\n",(0,r.jsx)(i.li,{children:"Changing activity parameter names"}),"\n"]}),"\n",(0,r.jsx)(i.p,{children:"Activity return values inside workflows are not recorded and replayed."}),"\n",(0,r.jsx)(i.h3,{id:"what-changes-inside-workflows-may-potentially-trigger-non-deterministic-errors",children:"What changes inside workflows may potentially trigger non-deterministic errors?"}),"\n",(0,r.jsx)(i.p,{children:"Cadence records each execution of a workflow and activity execution inside each of them.Therefore, new changes must be compatible with execution orders inside the workflow. The following changes will fail the non-deterministic check."}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Append another activity"}),"\n",(0,r.jsx)(i.li,{children:"Delete an existing activity"}),"\n",(0,r.jsx)(i.li,{children:"Reordering activities"}),"\n"]}),"\n",(0,r.jsx)(i.p,{children:"If you really need to change the activity implementation based on new business requirements, you may consider using versioning your workflow."}),"\n",(0,r.jsx)(i.h3,{id:"are-cadence-signals-replayed-if-definition-of-signal-is-changed-will-it-trigger-non-deterministic-errors",children:"Are Cadence signals replayed? If definition of signal is changed, will it trigger non-deterministic errors?"}),"\n",(0,r.jsx)(i.p,{children:"Yes. If a signal is used in a workflow, it becomes a critical component of your workflow. Because signals also involve I/O to your workflow, it is also recorded and replayed. Modifications on signal definitions or usage may yield to non-deterministic errors, for instance, changing return type of a signal."}),"\n",(0,r.jsx)(i.h3,{id:"if-i-have-new-business-requirement-and-really-need-to-change-the-definition-of-a-workflow-what-should-i-do",children:"If I have new business requirement and really need to change the definition of a workflow, what should I do?"}),"\n",(0,r.jsxs)(i.p,{children:["You may introduce a new workflow registered to your worker and divert traffic to it or use versioning for your workflow. Check out ",(0,r.jsx)(i.a,{href:"https://cadenceworkflow.io/docs/go-client/workflow-versioning/",children:"Cadence website"})," for more information about versioning."]}),"\n",(0,r.jsx)(i.h3,{id:"does-changes-to-local-activities-definition-trigger-non-deterministic-errors",children:"Does changes to local activities' definition trigger non-deterministic errors?"}),"\n",(0,r.jsx)(i.p,{children:"Yes. Local activities are recorded and therefore replayed by Cadence. Imcompatible changes on local activity definitions will yield to non-deterministic errors."})]})}function h(e={}){const{wrapper:i}={...(0,o.R)(),...e.components};return i?(0,r.jsx)(i,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,i,n)=>{n.d(i,{R:()=>a,x:()=>s});var t=n(6540);const r={},o=t.createContext(r);function a(e){const i=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function s(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),t.createElement(o.Provider,{value:i},e.children)}},9426:e=>{e.exports=JSON.parse('{"permalink":"/Cadence-Docs/blog/2024/02/15/cadence-non-deterministic-common-qa","editUrl":"https://github.com/cadence-workflow/Cadence-Docs/tree/master/blog/2024-02-15-cadence-non-deterministic-common-qa.md","source":"@site/blog/2024-02-15-cadence-non-deterministic-common-qa.md","title":"Cadence non-derministic errors common question Q&A (part 1)","description":"If I change code logic inside an Cadence activity (for example, my activity is calling database A but now I want it to call database B),  will it trigger an non-deterministic error?","date":"2024-03-10T00:00:00.000Z","tags":[{"inline":false,"label":"Deep Dives","permalink":"/Cadence-Docs/blog/tags/deep-dives","description":"Deep Dives tag description"}],"readingTime":2.625,"hasTruncateMarker":true,"authors":[{"name":"Chris Qin","title":"Applications Developer @ Uber","url":"https://www.linkedin.com/in/chrisqin0610/","page":{"permalink":"/Cadence-Docs/blog/authors/chopincode"},"socials":{"linkedin":"https://www.linkedin.com/in/chrisqin0610/","github":"https://github.com/chopincode"},"imageURL":"https://github.com/chopincode.png","key":"chopincode"}],"frontMatter":{"title":"Cadence non-derministic errors common question Q&A (part 1)","date":"2024-03-10T00:00:00.000Z","authors":"chopincode","tags":["deep-dive"]},"unlisted":false,"prevItem":{"title":"2024 Cadence Yearly Roadmap Update","permalink":"/Cadence-Docs/blog/2024/07/11/2024-07-11-yearly-roadmap-update/yearly-roadmap-update"},"nextItem":{"title":"Cadence Community Spotlight Update - November 2023","permalink":"/Cadence-Docs/blog/2023/11/30/community-spotlight-update-november-2023"}}')}}]);