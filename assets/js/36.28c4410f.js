(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{483:function(e,t,i){"use strict";i.r(t);var s=i(8),a=Object(s.a)({},(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[i("p",[e._v("In the upcoming blog series, we will delve into a discussion about common bad practices and anti-patterns related to Cadence. As diverse teams often encounter distinct business use cases, it becomes imperative to address the most frequently reported issues in Cadence workflows. To provide valuable insights and guidance, the Cadence team has meticulously compiled these common challenges based on customer feedback.")]),e._v(" "),i("ul",[i("li",[e._v("Reusing the same workflow ID for very active/continuous running workflows")])]),e._v(" "),i("p",[e._v("Cadence organizes workflows based on their unique IDs, using a process called "),i("b",[e._v("partitioning")]),e._v(". If a workflow receives a large number of updates in a short period of time or frequently starts new runs using the "),i("code",[e._v("continueAsNew")]),e._v(' function, all these updates will be directed to the same shard. Unfortunately, the Cadence backend is not equipped to handle this concentrated workload efficiently. As a result, a situation known as a "hot shard" arises, overloading the Cadence backend and worsening the problem.')]),e._v(" "),i("p",[e._v("Solution:\nWell, the best way to avoid this is simply just design your workflow in the way such that each workflow owns a uniformly distributed workflow ID across your Cadence domain. This will make sure that Cadence backend is able to evenly distribute the traffic with proper partition on your workflowIDs.")]),e._v(" "),i("ul",[i("li",[e._v("Excessive batch jobs or an enormous number of timers triggered at the same time")])]),e._v(" "),i("p",[e._v("Cadence has the capability to handle a large number of concurrent tasks initiated simultaneously, but tampering with this feature can lead to issues within the Cadence system. Consider a scenario where millions of jobs are scheduled to start at the same time and are expected to finish within a specific time interval. Cadence faces the challenge of understanding the desired behavior of customers in such cases. It is uncertain whether the intention is to complete all jobs simultaneously, provide progressive updates in parallel, or finish all jobs before a given deadline. This ambiguity arises due to the independent nature of each job and the difficulty in predicting their outcomes.")]),e._v(" "),i("p",[e._v("Moreover, Cadence workers utilize a sticky cache by default to optimize the runtime of workflows. However, when an overwhelming number of parallel workflows cannot fit into the cache, it can result in "),i("b",[e._v("cache thrashing")]),e._v(". This, in turn, leads to a quadratic increase in runtime complexity, specifically O(n^2), exacerbating the overall performance of the system.")]),e._v(" "),i("p",[e._v("Solution:\nThere are multiple ways to address this issue. Customers can either run jobs in a smaller batch or use start workflow jitter to randomly distribute timers within certain timeframe.")])])}),[],!1,null,null,null);t.default=a.exports}}]);