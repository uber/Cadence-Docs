"use strict";(self.webpackChunkcadence=self.webpackChunkcadence||[]).push([[734],{5913:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>l,contentTitle:()=>t,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"cli/index","title":"Introduction","description":"The Cadence is a command-line tool you can use to perform varioustasks: on a Cadence server. It can perform","source":"@site/docs/06-cli/index.md","sourceDirName":"06-cli","slug":"/cli/","permalink":"/Cadence-Docs/docs/cli/","draft":false,"unlisted":false,"editUrl":"https://github.com/cadence-workflow/Cadence-Docs/tree/master/docs/06-cli/index.md","tags":[],"version":"current","frontMatter":{"layout":"default","title":"Introduction","permalink":"/docs/cli"},"sidebar":"docsSidebar","previous":{"title":"Workflow Replay and Shadowing","permalink":"/Cadence-Docs/docs/go-client/workflow-replay-shadowing"},"next":{"title":"Overview","permalink":"/Cadence-Docs/docs/operation-guide/"}}');var s=o(4848),a=o(8453);const i={layout:"default",title:"Introduction",permalink:"/docs/cli"},t="Command Line Interface",l={},c=[{value:"Using the CLI",id:"using-the-cli",level:2},{value:"Homebrew",id:"homebrew",level:3},{value:"Docker",id:"docker",level:3},{value:"Build it yourself",id:"build-it-yourself",level:3},{value:"Documentation",id:"documentation",level:2},{value:"Environment variables",id:"environment-variables",level:2},{value:"Quick Start",id:"quick-start",level:2},{value:"Domain operation examples",id:"domain-operation-examples",level:3},{value:"Workflow operation examples",id:"workflow-operation-examples",level:3},{value:"Run workflow",id:"run-workflow",level:4},{value:"Show running workers of a tasklist",id:"show-running-workers-of-a-tasklist",level:4},{value:"Start workflow",id:"start-workflow",level:4},{value:"Reuse the same workflow id when starting/running a workflow",id:"reuse-the-same-workflow-id-when-startingrunning-a-workflow",level:5},{value:"Start a workflow with a memo",id:"start-a-workflow-with-a-memo",level:5},{value:"Show workflow history",id:"show-workflow-history",level:4},{value:"Show workflow execution information",id:"show-workflow-execution-information",level:4},{value:"List closed or open workflow executions",id:"list-closed-or-open-workflow-executions",level:4},{value:"Query workflow execution",id:"query-workflow-execution",level:4},{value:"Signal, cancel, terminate workflow",id:"signal-cancel-terminate-workflow",level:4},{value:"Signal, cancel, terminate workflows as a batch job",id:"signal-cancel-terminate-workflows-as-a-batch-job",level:4},{value:"Restart, reset workflow",id:"restart-reset-workflow",level:4},{value:"Recovery from bad deployment -- auto-reset workflow",id:"recovery-from-bad-deployment----auto-reset-workflow",level:4}];function d(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"command-line-interface",children:"Command Line Interface"})}),"\n",(0,s.jsx)(n.p,{children:"The Cadence CLI is a command-line tool you can use to perform various tasks on a Cadence server. It can perform\ndomain operations such as register, update, and describe as well as workflow operations like start\nworkflow, show workflow history, and signal workflow."}),"\n",(0,s.jsx)(n.h2,{id:"using-the-cli",children:"Using the CLI"}),"\n",(0,s.jsx)(n.h3,{id:"homebrew",children:"Homebrew"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"brew install cadence-workflow\n"})}),"\n",(0,s.jsx)(n.p,{children:"After the installation is done, you can use CLI:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cadence --help\n"})}),"\n",(0,s.jsxs)(n.p,{children:["This will always install the latest version. Follow ",(0,s.jsx)(n.a,{href:"https://github.com/cadence-workflow/cadence/discussions/4457",children:"this instructions"})," if you need to install older versions of Cadence CLI."]}),"\n",(0,s.jsx)(n.h3,{id:"docker",children:"Docker"}),"\n",(0,s.jsxs)(n.p,{children:["The Cadence CLI can be used directly from the Docker Hub image ",(0,s.jsx)(n.em,{children:"ubercadence/cli"})," or by building the CLI tool\nlocally."]}),"\n",(0,s.jsx)(n.p,{children:"Example of using the docker image to describe a "}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"docker run -it --rm ubercadence/cli:master --address <frontendAddress> --domain samples-domain domain describe\n"})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"master"})," will be the latest CLI binary from the project. But you can specify a version to best match your server version:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"docker run -it --rm ubercadence/cli:<version> --address <frontendAddress> --domain samples-domain domain describe\n"})}),"\n",(0,s.jsxs)(n.p,{children:["For example ",(0,s.jsx)(n.code,{children:"docker run --rm ubercadence/cli:0.21.3 --domain samples-domain domain describe"})," will be the CLI that is released as part of the ",(0,s.jsx)(n.a,{href:"https://github.com/cadence-workflow/cadence/releases/tag/v0.21.3",children:"v0.21.3 release"}),".\nSee ",(0,s.jsx)(n.a,{href:"https://hub.docker.com/r/ubercadence/cli/tags?page=1&ordering=last_updated",children:"docker hub page"})," for all the CLI image tags.\nNote that CLI versions of 0.20.0 works for all server versions of 0.12 to 0.19 as well. That's because ",(0,s.jsx)(n.a,{href:"https://stackoverflow.com/questions/68217385/what-is-clientversionnotsupportederror-and-how-to-resolve-it",children:"the CLI version doesn't change in those versions"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:['NOTE: On Docker versions 18.03 and later, you may get a "connection refused" error when connecting to local server. You can work around this by setting the host to "host.docker.internal" (see ',(0,s.jsx)(n.a,{href:"https://docs.docker.com/docker-for-mac/networking/#use-cases-and-workarounds",children:"here"})," for more info)."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"docker run -it --rm ubercadence/cli:master --address host.docker.internal:7933 --domain samples-domain domain describe\n"})}),"\n",(0,s.jsxs)(n.p,{children:["NOTE: Be sure to update your image when you want to try new features: ",(0,s.jsx)(n.code,{children:"docker pull ubercadence/cli:master "})]}),"\n",(0,s.jsx)(n.p,{children:"NOTE: If you are running docker-compose Cadence server, you can also logon to the container to execute CLI:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh-session",children:"# this logs you onto the Cadence docker container\n$ docker exec -it docker_cadence_1 /bin/bash\n\n# this command runs within the container\n% cadence --address $(hostname -i):7933 --do samples domain register\n"})}),"\n",(0,s.jsx)(n.h3,{id:"build-it-yourself",children:"Build it yourself"}),"\n",(0,s.jsxs)(n.p,{children:["To build the CLI tool locally, clone the ",(0,s.jsx)(n.a,{href:"https://github.com/cadence-workflow/cadence",children:"Cadence server repo"}),", check out the version tag (e.g. ",(0,s.jsx)(n.code,{children:"git checkout v0.21.3"}),") and run\n",(0,s.jsx)(n.code,{children:"make tools"}),". This produces an executable called ",(0,s.jsx)(n.code,{children:"cadence"}),". With a local build, the same command to\ndescribe a domain would look like this:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cadence --domain samples-domain domain describe\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Alternatively, you can build the CLI image, see ",(0,s.jsx)(n.a,{href:"https://github.com/cadence-workflow/cadence/blob/master/docker/README.md#diy-building-an-image-for-any-tag-or-branch",children:"instructions"})]}),"\n",(0,s.jsx)(n.h2,{id:"documentation",children:"Documentation"}),"\n",(0,s.jsxs)(n.p,{children:["CLI are documented by ",(0,s.jsx)(n.code,{children:"--help"})," or ",(0,s.jsx)(n.code,{children:"-h"})," in ANY tab of all levels:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh-session",children:"$ cadence --help\nNAME:\n   cadence - A command-line tool for cadence users\n\nUSAGE:\n   cadence [global options] command [command options] [arguments...]\n\nVERSION:\n   0.18.4\n\nCOMMANDS:\n   domain, d     Operate cadence domain\n   workflow, wf  Operate cadence workflow\n   tasklist, tl  Operate cadence tasklist\n   admin, adm    Run admin operation\n   cluster, cl   Operate cadence cluster\n   help, h       Shows a list of commands or help for one command\n\nGLOBAL OPTIONS:\n   --address value, --ad value          host:port for cadence frontend service [$CADENCE_CLI_ADDRESS]\n   --domain value, --do value           cadence workflow domain [$CADENCE_CLI_DOMAIN]\n   --context_timeout value, --ct value  optional timeout for context of RPC call in seconds (default: 5) [$CADENCE_CONTEXT_TIMEOUT]\n   --help, -h                           show help\n   --version, -v                        print the version\n"})}),"\n",(0,s.jsx)(n.p,{children:"And"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh-session",children:"$ cadence workflow -h\nNAME:\n   cadence workflow - Operate cadence workflow\n\nUSAGE:\n   cadence workflow command [command options] [arguments...]\n\nCOMMANDS:\n   activity, act       operate activities of workflow\n   show                show workflow history\n   showid              show workflow history with given workflow_id and run_id (a shortcut of `show -w <wid> -r <rid>`). run_id is only required for archived history\n   start               start a new workflow execution\n   run                 start a new workflow execution and get workflow progress\n   cancel, c           cancel a workflow execution\n   signal, s           signal a workflow execution\n   signalwithstart     signal the current open workflow if exists, or attempt to start a new run based on IDResuePolicy and signals it\n   terminate, term     terminate a new workflow execution\n   list, l             list open or closed workflow executions\n   listall, la         list all open or closed workflow executions\n   listarchived        list archived workflow executions\n   scan, sc, scanall   scan workflow executions (need to enable Cadence server on ElasticSearch). It will be faster than listall, but result are not sorted.\n   count, cnt          count number of workflow executions (need to enable Cadence server on ElasticSearch)\n   query               query workflow execution\n   stack               query workflow execution with __stack_trace as query type\n   describe, desc      show information of workflow execution\n   describeid, descid  show information of workflow execution with given workflow_id and optional run_id (a shortcut of `describe -w <wid> -r <rid>`)\n   observe, ob         show the progress of workflow history\n   observeid, obid     show the progress of workflow history with given workflow_id and optional run_id (a shortcut of `observe -w <wid> -r <rid>`)\n   reset, rs           reset the workflow, by either eventID or resetType.\n   reset-batch         reset workflow in batch by resetType: LastDecisionCompleted,LastContinuedAsNew,BadBinary,DecisionCompletedTime,FirstDecisionScheduled,LastDecisionScheduled,FirstDecisionCompletedTo get base workflowIDs/runIDs to reset, source is from input file or visibility query.\n   batch               batch operation on a list of workflows from query.\n\nOPTIONS:\n   --help, -h  show help\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh-session",children:"$ cadence wf signal -h\nNAME:\n   cadence workflow signal - signal a workflow execution\n\nUSAGE:\n   cadence workflow signal [command options] [arguments...]\n\nOPTIONS:\n   --workflow_id value, --wid value, -w value  WorkflowID\n   --run_id value, --rid value, -r value       RunID\n   --name value, -n value                      SignalName\n   --input value, -i value                     Input for the signal, in JSON format.\n   --input_file value, --if value              Input for the signal from JSON file.\n\n"})}),"\n",(0,s.jsx)(n.p,{children:"And etc."}),"\n",(0,s.jsxs)(n.p,{children:["The example commands below will use ",(0,s.jsx)(n.code,{children:"cadence"})," for brevity."]}),"\n",(0,s.jsx)(n.h2,{id:"environment-variables",children:"Environment variables"}),"\n",(0,s.jsx)(n.p,{children:"Setting environment variables for repeated parameters can shorten the CLI commands."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"CADENCE_CLI_ADDRESS"})," - host",":port"," for Cadence frontend service, the default is for the local server"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"CADENCE_CLI_DOMAIN"})," - default workflow domain, so you don't need to specify ",(0,s.jsx)(n.code,{children:"--domain"})]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"quick-start",children:"Quick Start"}),"\n",(0,s.jsxs)(n.p,{children:["Run ",(0,s.jsx)(n.code,{children:"cadence"})," for help on top level commands and global options\nRun ",(0,s.jsx)(n.code,{children:"cadence domain"})," for help on domain operations\nRun ",(0,s.jsx)(n.code,{children:"cadence workflow"})," for help on workflow operations\nRun ",(0,s.jsx)(n.code,{children:"cadence tasklist"})," for help on tasklist operations\n(",(0,s.jsx)(n.code,{children:"cadence help"}),", ",(0,s.jsx)(n.code,{children:"cadence help [domain|workflow]"})," will also print help messages)"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Note:"})," make sure you have a Cadence server running before using CLI"]}),"\n",(0,s.jsx)(n.h3,{id:"domain-operation-examples",children:"Domain operation examples"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:'Register a new domain named "samples-domain":'}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cadence --domain samples-domain domain register\n# OR using short alias\ncadence --do samples-domain d re\n"})}),"\n",(0,s.jsxs)(n.p,{children:["If your Cadence cluster has enable ",(0,s.jsx)(n.a,{href:"https://cadenceworkflow.io/docs/concepts/cross-dc-replication/",children:"global domain(XDC replication)"}),", then you have to specify the replicaiton settings when registering a domain:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cadence --domains amples-domain domain register --active_cluster clusterNameA --clusters clusterNameA clusterNameB\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:'View "samples-domain" details:'}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cadence --domain samples-domain domain describe\n"})}),"\n",(0,s.jsx)(n.h3,{id:"workflow-operation-examples",children:"Workflow operation examples"}),"\n",(0,s.jsx)(n.p,{children:"The following examples assume the CADENCE_CLI_DOMAIN environment variable is set."}),"\n",(0,s.jsx)(n.h4,{id:"run-workflow",children:"Run workflow"}),"\n",(0,s.jsx)(n.p,{children:"Start a workflow and see its progress. This command doesn't finish until workflow completes."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cadence workflow run --tl helloWorldGroup --wt main.Workflow --et 60 -i '\"cadence\"'\n\n# view help messages for workflow run\ncadence workflow run -h\n"})}),"\n",(0,s.jsx)(n.p,{children:"Brief explanation:\nTo run a workflow, the user must specify the following:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"Tasklist name (--tl)"}),"\n",(0,s.jsx)(n.li,{children:"Workflow type (--wt)"}),"\n",(0,s.jsx)(n.li,{children:"Execution start to close timeout in seconds (--et)"}),"\n",(0,s.jsx)(n.li,{children:"Input in JSON format (--i) (optional)"}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["s example uses ",(0,s.jsx)(n.a,{href:"https://github.com/cadence-workflow/cadence-samples/blob/master/cmd/samples/recipes/helloworld/helloworld_workflow.go",children:"this cadence-samples workflow"}),"\nand takes a string as input with the ",(0,s.jsx)(n.code,{children:"-i '\"cadence\"'"})," parameter. Single quotes (",(0,s.jsx)(n.code,{children:"''"}),") are used to wrap input as JSON."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Note:"})," You need to start the worker so that the workflow can make progress.\n(Run ",(0,s.jsx)(n.code,{children:"make && ./bin/helloworld -m worker"})," in cadence-samples to start the worker)"]}),"\n",(0,s.jsx)(n.h4,{id:"show-running-workers-of-a-tasklist",children:"Show running workers of a tasklist"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cadence tasklist desc --tl helloWorldGroup\n"})}),"\n",(0,s.jsx)(n.h4,{id:"start-workflow",children:"Start workflow"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'cadence workflow start --tl helloWorldGroup --wt main.Workflow --et 60 -i \'"cadence"\'\n\n# view help messages for workflow start\ncadence workflow start -h\n\n# for a workflow with multiple inputs, separate each json with space/newline like\ncadence workflow start --tl helloWorldGroup --wt main.WorkflowWith3Args --et 60 -i \'"your_input_string" 123 {"Name":"my-string", "Age":12345}\'\n'})}),"\n",(0,s.jsxs)(n.p,{children:["The workflow ",(0,s.jsx)(n.code,{children:"start"})," command is similar to the ",(0,s.jsx)(n.code,{children:"run"})," command, but immediately returns the workflow_id and\nrun_id after starting the workflow. Use the ",(0,s.jsx)(n.code,{children:"show"})," command to view the workflow's history/progress."]}),"\n",(0,s.jsx)(n.h5,{id:"reuse-the-same-workflow-id-when-startingrunning-a-workflow",children:"Reuse the same workflow id when starting/running a workflow"}),"\n",(0,s.jsxs)(n.p,{children:["Use option ",(0,s.jsx)(n.code,{children:"--workflowidreusepolicy"})," or ",(0,s.jsx)(n.code,{children:"--wrp"})," to configure the workflow_ID reuse policy.\n",(0,s.jsx)(n.strong,{children:"Option 0 AllowDuplicateFailedOnly:"})," Allow starting a workflow_execution using the same workflow_ID when a workflow with the same workflow_ID is not already running and the last execution close state is one of ",(0,s.jsx)(n.em,{children:"[terminated, cancelled, timedout, failed]"}),".\n",(0,s.jsx)(n.strong,{children:"Option 1 AllowDuplicate:"})," Allow starting a workflow_execution using the same workflow_ID when a workflow with the same workflow_ID is not already running.\n",(0,s.jsx)(n.strong,{children:"Option 2 RejectDuplicate:"})," Do not allow starting a workflow_execution using the same workflow_ID as a previous workflow."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'# use AllowDuplicateFailedOnly option to start a workflow\ncadence workflow start --tl helloWorldGroup --wt main.Workflow --et 60 -i \'"cadence"\' --wid "<duplicated workflow id>" --wrp 0\n\n# use AllowDuplicate option to run a workflow\ncadence workflow run --tl helloWorldGroup --wt main.Workflow --et 60 -i \'"cadence"\' --wid "<duplicated workflow id>" --wrp 1\n'})}),"\n",(0,s.jsx)(n.h5,{id:"start-a-workflow-with-a-memo",children:"Start a workflow with a memo"}),"\n",(0,s.jsxs)(n.p,{children:["Memos are immutable key/value pairs that can be attached to a workflow run when starting the workflow. These are\nvisible when listing workflows. More information on memos can be found\n",(0,s.jsx)(n.a,{href:"/docs/concepts/search-workflows/#memo-vs-search-attributes",children:"here"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cadence wf start -tl helloWorldGroup -wt main.Workflow -et 60 -i '\"cadence\"' -memo_key \u2018\u201cService\u201d \u201cEnv\u201d \u201cInstance\u201d\u2019 -memo \u2018\u201cserverName1\u201d \u201ctest\u201d 5\u2019\n"})}),"\n",(0,s.jsx)(n.h4,{id:"show-workflow-history",children:"Show workflow history"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cadence workflow show -w 3ea6b242-b23c-4279-bb13-f215661b4717 -r 866ae14c-88cf-4f1e-980f-571e031d71b0\n# a shortcut of this is (without -w -r flag)\ncadence workflow showid 3ea6b242-b23c-4279-bb13-f215661b4717 866ae14c-88cf-4f1e-980f-571e031d71b0\n\n# if run_id is not provided, it will show the latest run history of that workflow_id\ncadence workflow show -w 3ea6b242-b23c-4279-bb13-f215661b4717\n# a shortcut of this is\ncadence workflow showid 3ea6b242-b23c-4279-bb13-f215661b4717\n"})}),"\n",(0,s.jsx)(n.h4,{id:"show-workflow-execution-information",children:"Show workflow execution information"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cadence workflow describe -w 3ea6b242-b23c-4279-bb13-f215661b4717 -r 866ae14c-88cf-4f1e-980f-571e031d71b0\n# a shortcut of this is (without -w -r flag)\ncadence workflow describeid 3ea6b242-b23c-4279-bb13-f215661b4717 866ae14c-88cf-4f1e-980f-571e031d71b0\n\n# if run_id is not provided, it will show the latest workflow execution of that workflow_id\ncadence workflow describe -w 3ea6b242-b23c-4279-bb13-f215661b4717\n# a shortcut of this is\ncadence workflow describeid 3ea6b242-b23c-4279-bb13-f215661b4717\n"})}),"\n",(0,s.jsx)(n.h4,{id:"list-closed-or-open-workflow-executions",children:"List closed or open workflow executions"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cadence workflow list\n\n# default will only show one page, to view more items, use --more flag\ncadence workflow list -m\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Use ",(0,s.jsx)(n.strong,{children:"--query"})," to list workflows with SQL like "]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cadence workflow list --query \"WorkflowType='main.SampleParentWorkflow' AND CloseTime = missing \"\n"})}),"\n",(0,s.jsx)(n.p,{children:'This will return all open workflows with workflowType as "main.SampleParentWorkflow".'}),"\n",(0,s.jsx)(n.h4,{id:"query-workflow-execution",children:"Query workflow execution"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'# use custom query type\ncadence workflow query -w <wid> -r <rid> --qt <query-type>\n\n# use build-in query type "__stack_trace" which is supported by Cadence client library\ncadence workflow query -w <wid> -r <rid> --qt __stack_trace\n# a shortcut to query using __stack_trace is (without --qt flag)\ncadence workflow stack -w <wid> -r <rid>\n'})}),"\n",(0,s.jsx)(n.h4,{id:"signal-cancel-terminate-workflow",children:"Signal, cancel, terminate workflow"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# signal\ncadence workflow signal -w <wid> -r <rid> -n <signal-name> -i '\"signal-value\"'\n\n# cancel\ncadence workflow cancel -w <wid> -r <rid>\n\n# terminate\ncadence workflow terminate -w <wid> -r <rid> --reason\n"})}),"\n",(0,s.jsx)(n.p,{children:"Terminating a running workflow_execution will record a WorkflowExecutionTerminated event as the closing event in the history. No more decision_tasks will be scheduled for a terminated workflow_execution.\nCanceling a running workflow_execution will record a WorkflowExecutionCancelRequested event in the history, and a new decision_task will be scheduled. The workflow has a chance to do some clean up work after cancellation."}),"\n",(0,s.jsx)(n.h4,{id:"signal-cancel-terminate-workflows-as-a-batch-job",children:"Signal, cancel, terminate workflows as a batch job"}),"\n",(0,s.jsxs)(n.p,{children:["Batch job is based on List Workflow Query(",(0,s.jsx)(n.strong,{children:"--query"}),"). It supports signal, cancel and terminate as batch job type.\nFor terminating workflows as batch job, it will terminte the children recursively."]}),"\n",(0,s.jsx)(n.p,{children:"Start a batch job(using signal as batch type):"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'cadence --do samples-domain wf batch start --query "WorkflowType=\'main.SampleParentWorkflow\' AND CloseTime=missing" --reason "test" --bt signal --sig testname\nThis batch job will be operating on 5 workflows.\nPlease confirm[Yes/No]:yes\n{\n    "jobID": "<batch-job-id>",\n    "msg": "batch job is started"\n}\n\n'})}),"\n",(0,s.jsx)(n.p,{children:"You need to remember the JobID or use List command to get all your batch jobs:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cadence --do samples-domain wf batch list\n"})}),"\n",(0,s.jsx)(n.p,{children:"Describe the progress of a batch job:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cadence --do samples-domain wf batch desc -jid <batch-job-id>\n"})}),"\n",(0,s.jsx)(n.p,{children:"Terminate a batch job:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cadence --do samples-domain wf batch terminate -jid <batch-job-id>\n"})}),"\n",(0,s.jsx)(n.p,{children:"Note that the operation performed by a batch will not be rolled back by terminating the batch. However, you can use reset to rollback your workflows."}),"\n",(0,s.jsx)(n.h4,{id:"restart-reset-workflow",children:"Restart, reset workflow"}),"\n",(0,s.jsx)(n.p,{children:"The Reset command allows resetting a workflow to a particular point and continue running from there.\nThere are a lot of use cases:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Rerun a failed workflow from the beginning with the same start parameters."}),"\n",(0,s.jsx)(n.li,{children:"Rerun a failed workflow from the failing point without losing the achieved progress(history)."}),"\n",(0,s.jsx)(n.li,{children:"After deploying new code, reset an open workflow to let the workflow run to different flows."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"You can reset to some predefined event types:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'cadence workflow reset -w <wid> -r <rid> --reset_type <reset_type> --reason "some_reason"\n'})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"FirstDecisionCompleted: reset to the beginning of the history."}),"\n",(0,s.jsx)(n.li,{children:"LastDecisionCompleted: reset to the end of the history."}),"\n",(0,s.jsx)(n.li,{children:"LastContinuedAsNew: reset to the end of the history for the previous run."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"If you are familiar with the Cadence history event, You can also reset to any decision finish event by using:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'cadence workflow reset -w <wid> -r <rid> --event_id <decision_finish_event_id> --reason "some_reason"\n'})}),"\n",(0,s.jsx)(n.p,{children:"Some things to note:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"When reset, a new run will be kicked off with the same workflowID. But if there is a running execution for the workflow(workflowID), the current run will be terminated."}),"\n",(0,s.jsx)(n.li,{children:"decision_finish_event_id is the ID of events of the type: DecisionTaskComplete/DecisionTaskFailed/DecisionTaskTimeout."}),"\n",(0,s.jsx)(n.li,{children:"To restart a workflow from the beginning, reset to the first decision_task finish event."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"To reset multiple workflows, you can use batch reset command:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'cadence workflow reset-batch --input_file <file_of_workflows_to_reset> --reset_type <reset_type> --reason "some_reason"\n'})}),"\n",(0,s.jsx)(n.h4,{id:"recovery-from-bad-deployment----auto-reset-workflow",children:"Recovery from bad deployment -- auto-reset workflow"}),"\n",(0,s.jsx)(n.p,{children:"If a bad deployment lets a workflow run into a wrong state, you might want to reset the workflow to the point that the bad deployment started to run. But usually it is not easy to find out all the workflows impacted, and every reset point for each workflow. In this case, auto-reset will automatically reset all the workflows given a bad deployment identifier."}),"\n",(0,s.jsxs)(n.p,{children:["Let's get familiar with some concepts. Each deployment will have an identifier, we call it \"",(0,s.jsx)(n.strong,{children:"Binary Checksum"}),'" as it is usually generated by the md5sum of a binary file. For a workflow, each binary checksum will be associated with an ',(0,s.jsx)(n.strong,{children:"auto-reset point"}),", which contains a ",(0,s.jsx)(n.strong,{children:"runID"}),", an ",(0,s.jsx)(n.strong,{children:"eventID"}),", and the ",(0,s.jsx)(n.strong,{children:"created_time"})," that binary/deployment made the first decision for the workflow."]}),"\n",(0,s.jsxs)(n.p,{children:["To find out which ",(0,s.jsx)(n.strong,{children:"binary checksum"})," of the bad deployment to reset, you should be aware of at least one workflow running into a bad state. Use the describe command with ",(0,s.jsx)(n.strong,{children:"--reset_points_only"})," option to show all the reset points:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cadence wf desc -w <WorkflowID>  --reset_points_only\n+----------------------------------+--------------------------------+--------------------------------------+---------+\n|         BINARY CHECKSUM          |          CREATE TIME           |                RUNID                 | EVENTID |\n+----------------------------------+--------------------------------+--------------------------------------+---------+\n| c84c5afa552613a83294793f4e664a7f | 2019-05-24 10:01:00.398455019  | 2dd29ab7-2dd8-4668-83e0-89cae261cfb1 |       4 |\n| aae748fdc557a3f873adbe1dd066713f | 2019-05-24 11:01:00.067691445  | d42d21b8-2adb-4313-b069-3837d44d6ce6 |       4 |\n...\n...\n"})}),"\n",(0,s.jsx)(n.p,{children:"Then use this command to tell Cadence to auto-reset all workflows impacted by the bad deployment. The command will store the bad binary checksum into domain info and trigger a process to reset all your workflows."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'cadence --do <YourDomainName> domain update --add_bad_binary aae748fdc557a3f873adbe1dd066713f  --reason "rollback bad deployment"\n'})}),"\n",(0,s.jsx)(n.p,{children:"As you add the bad binary checksum to your domain, Cadence will not dispatch any decision_tasks to the bad binary. So make sure that you have rolled back to a good deployment(or roll out new bits with bug fixes). Otherwise your workflow can't make any progress after auto-reset."})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,n,o)=>{o.d(n,{R:()=>i,x:()=>t});var r=o(6540);const s={},a=r.createContext(s);function i(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);