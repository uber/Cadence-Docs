"use strict";(self.webpackChunkcadence=self.webpackChunkcadence||[]).push([[1347],{120:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>n,toc:()=>d});var n=i(9559),a=i(4848),s=i(8453);const o={title:"Minimizing blast radius in Cadence: Introducing Workflow ID-based Rate Limits",date:new Date("2024-09-05T00:00:00.000Z"),authors:"jakobht",tags:["deep-dive"]},r=void 0,l={authorsImageUrls:[void 0]},d=[{value:"Why Workflow ID-based Rate Limits?",id:"why-workflow-id-based-rate-limits",level:2}];function c(e){const t={a:"a",h2:"h2",li:"li",ol:"ol",p:"p",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(t.p,{children:["At Uber, we run several big multitenant Cadence clusters with hundreds of domains in each. The clusters being multi-tenant means potential ",(0,a.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/Cloud_computing_issues#Performance_interference_and_noisy_neighbors",children:"noisy neighbor"})," effects between domains."]}),"\n",(0,a.jsx)(t.p,{children:"An essential aspect of avoiding this is managing how workflows interact with our infrastructure to prevent any single workflow from causing instability for the whole cluster. To this end, we are excited to introduce Workflow ID-based rate limits \u2014 a new feature designed to protect our clusters from problematic workflows and ensure stability across the board."}),"\n",(0,a.jsx)(t.h2,{id:"why-workflow-id-based-rate-limits",children:"Why Workflow ID-based Rate Limits?"}),"\n",(0,a.jsx)(t.p,{children:"We already have rate limits for how many requests can be sent to a domain. However, since Cadence is sharded on the workflow ID, a user-provided input, an overused workflow with a particular id might overwhelm a shard by making too many requests. There are two main ways this happens:"}),"\n",(0,a.jsxs)(t.ol,{children:["\n",(0,a.jsx)(t.li,{children:"A user starts, or signals the same workflow ID too aggressively,"}),"\n",(0,a.jsx)(t.li,{children:"A workflow starts too many activities over a short period of time (e.g. thousands of activities in seconds)."}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},8453:(e,t,i)=>{i.d(t,{R:()=>o,x:()=>r});var n=i(6540);const a={},s=n.createContext(a);function o(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),n.createElement(s.Provider,{value:t},e.children)}},9559:e=>{e.exports=JSON.parse('{"permalink":"/blog/2024/09/05/workflow-specific-rate-limits","editUrl":"https://github.com/cadence-workflow/Cadence-Docs/tree/master/blog/2024-09-05-workflow-specific-rate-limits.md","source":"@site/blog/2024-09-05-workflow-specific-rate-limits.md","title":"Minimizing blast radius in Cadence: Introducing Workflow ID-based Rate Limits","description":"At Uber, we run several big multitenant Cadence clusters with hundreds of domains in each. The clusters being multi-tenant means potential noisy neighbor effects between domains.","date":"2024-09-05T00:00:00.000Z","tags":[{"inline":false,"label":"Deep Dives","permalink":"/blog/tags/deep-dives","description":"Deep Dives tag description"}],"readingTime":6.335,"hasTruncateMarker":true,"authors":[{"name":"Jakob Haahr Taankvist","title":"Software Engineer II @ Uber","url":"https://www.linkedin.com/in/jakob-taankvist/","page":{"permalink":"/blog/authors/jakobht"},"socials":{"linkedin":"https://www.linkedin.com/in/jakob-taankvist/","github":"https://github.com/jakobht"},"imageURL":"https://github.com/jakobht.png","key":"jakobht"}],"frontMatter":{"title":"Minimizing blast radius in Cadence: Introducing Workflow ID-based Rate Limits","date":"2024-09-05T00:00:00.000Z","authors":"jakobht","tags":["deep-dive"]},"unlisted":false,"prevItem":{"title":"Announcement: Cadence Helm Charts v0 Release","permalink":"/blog/2024/10/01/announcing-cadence-helm-charts-v0"},"nextItem":{"title":"2024 Cadence Yearly Roadmap Update","permalink":"/blog/2024/07/11/2024-07-11-yearly-roadmap-update/yearly-roadmap-update"}}')}}]);