"use strict";(self.webpackChunkcadence=self.webpackChunkcadence||[]).push([[3774],{79:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>r});const a=JSON.parse('{"id":"java-client/versioning","title":"Versioning","description":"As outlined in the Workflow Implementation Constraints section, code has to be deterministic by taking the same","source":"@site/docs/04-java-client/07-versioning.md","sourceDirName":"04-java-client","slug":"/java-client/versioning","permalink":"/Cadence-Docs/docs/java-client/versioning","draft":false,"unlisted":false,"editUrl":"https://github.com/cadence-workflow/Cadence-Docs/tree/master/docs/04-java-client/07-versioning.md","tags":[],"version":"current","sidebarPosition":7,"frontMatter":{"layout":"default","title":"Versioning","permalink":"/docs/java-client/versioning"},"sidebar":"docsSidebar","previous":{"title":"Activity interface","permalink":"/Cadence-Docs/docs/java-client/activity-interface"},"next":{"title":"Distributed CRON","permalink":"/Cadence-Docs/docs/java-client/distributed-cron"}}');var i=t(4848),s=t(8453);const o={layout:"default",title:"Versioning",permalink:"/docs/java-client/versioning"},c="Versioning",l={},r=[];function d(e){const n={code:"code",em:"em",h1:"h1",header:"header",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"versioning",children:"Versioning"})}),"\n",(0,i.jsxs)(n.p,{children:["As outlined in the ",(0,i.jsx)(n.em,{children:"Workflow Implementation Constraints"})," section, workflow code has to be deterministic by taking the same\ncode path when replaying history events. Any workflow code change that affects the order in which decisions are generated breaks\nthis assumption. The solution that allows updating code of already running workflows is to keep both the old and new code.\nWhen replaying, use the code version that the events were generated with and when executing a new code path, always take the\nnew code."]}),"\n",(0,i.jsxs)(n.p,{children:["Use the ",(0,i.jsx)(n.code,{children:"Workflow.getVersion"})," function to return a version of the code that should be executed and then use the returned\nvalue to pick a correct branch. Let's look at an example."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:"public void processFile(Arguments args) {\n    String localName = null;\n    String processedName = null;\n    try {\n        localName = activities.download(args.getSourceBucketName(), args.getSourceFilename());\n        processedName = activities.processFile(localName);\n        activities.upload(args.getTargetBucketName(), args.getTargetFilename(), processedName);\n    } finally {\n        if (localName != null) { // File was downloaded.\n            activities.deleteLocalFile(localName);\n        }\n        if (processedName != null) { // File was processed.\n            activities.deleteLocalFile(processedName);\n        }\n    }\n}\n"})}),"\n",(0,i.jsx)(n.p,{children:"Now we decide to calculate the processed file checksum and pass it to upload.\nThe correct way to implement this change is:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:'public void processFile(Arguments args) {\n    String localName = null;\n    String processedName = null;\n    try {\n        localName = activities.download(args.getSourceBucketName(), args.getSourceFilename());\n        processedName = activities.processFile(localName);\n        int version = Workflow.getVersion("checksumAdded", Workflow.DEFAULT_VERSION, 1);\n        if (version == Workflow.DEFAULT_VERSION) {\n            activities.upload(args.getTargetBucketName(), args.getTargetFilename(), processedName);\n        } else {\n            long checksum = activities.calculateChecksum(processedName);\n            activities.uploadWithChecksum(\n                args.getTargetBucketName(), args.getTargetFilename(), processedName, checksum);\n        }\n    } finally {\n        if (localName != null) { // File was downloaded.\n            activities.deleteLocalFile(localName);\n        }\n        if (processedName != null) { // File was processed.\n            activities.deleteLocalFile(processedName);\n        }\n    }\n}\n'})}),"\n",(0,i.jsx)(n.p,{children:"Later, when all workflows that use the old version are completed, the old branch can be removed."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:'public void processFile(Arguments args) {\n    String localName = null;\n    String processedName = null;\n    try {\n        localName = activities.download(args.getSourceBucketName(), args.getSourceFilename());\n        processedName = activities.processFile(localName);\n        // getVersion call is left here to ensure that any attempt to replay history\n        // for a different version fails. It can be removed later when there is no possibility\n        // of this happening.\n        Workflow.getVersion("checksumAdded", 1, 1);\n        long checksum = activities.calculateChecksum(processedName);\n        activities.uploadWithChecksum(\n            args.getTargetBucketName(), args.getTargetFilename(), processedName, checksum);\n    } finally {\n        if (localName != null) { // File was downloaded.\n            activities.deleteLocalFile(localName);\n        }\n        if (processedName != null) { // File was processed.\n            activities.deleteLocalFile(processedName);\n        }\n    }\n}\n'})}),"\n",(0,i.jsxs)(n.p,{children:["The ID that is passed to the ",(0,i.jsx)(n.code,{children:"getVersion"})," call identifies the change. Each change is expected to have its own ID. But if\na change spawns multiple places in the workflow code and the new code should be either executed in all of them or\nin none of them, then they have to share the ID."]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>c});var a=t(6540);const i={},s=a.createContext(i);function o(e){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),a.createElement(s.Provider,{value:n},e.children)}}}]);