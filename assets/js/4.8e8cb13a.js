(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{287:function(t,e,a){},295:function(t,e,a){"use strict";a(287)},320:function(t,e,a){},321:function(t,e,a){"use strict";a.r(e);var s=a(119),o=a.n(s),r=a(285),n=a.n(r),i=a(6),l=a(293);o.a.extend(n.a);var u={name:"PostMeta",components:{NavigationIcon:i.n,ClockIcon:i.a,PostTag:l.default},props:{tags:{type:[Array,String]},author:{type:String},authorlink:{type:String},date:{type:String},location:{type:String}},computed:{resolvedDate(){return o.a.utc(this.date).format(this.$themeConfig.dateFormat||"ddd MMM DD YYYY")},resolvedTags(){return!this.tags||Array.isArray(this.tags)?this.tags:[this.tags]}}},p=(a(295),a(4)),c=Object(p.a)(u,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"post-meta"},[t.author?e("div",{staticClass:"post-meta-author",attrs:{itemprop:"publisher author",itemtype:"http://schema.org/Person",itemscope:""}},[e("NavigationIcon"),t._v(" "),t.authorlink?t._e():e("span",{attrs:{itemprop:"name"}},[t._v(t._s(t.author))]),t._v(" "),t.authorlink?e("a",{attrs:{itemprop:"name",href:t.authorlink}},[t._v(t._s(t.author))]):t._e(),t._v(" "),t.location?e("span",{attrs:{itemprop:"address"}},[t._v("   in "+t._s(t.location))]):t._e()],1):t._e(),t._v(" "),t.date?e("div",{staticClass:"post-meta-date"},[e("ClockIcon"),t._v(" "),e("time",{attrs:{pubdate:"",itemprop:"datePublished",datetime:t.date}},[t._v("\n      "+t._s(t.resolvedDate)+"\n    ")])],1):t._e(),t._v(" "),t.tags?e("ul",{staticClass:"post-meta-tags",attrs:{itemprop:"keywords"}},t._l(t.resolvedTags,(function(t){return e("PostTag",{key:t,attrs:{tag:t}})})),1):t._e()])}),[],!1,null,null,null);e.default=c.exports},337:function(t,e,a){"use strict";a(320)},358:function(t,e,a){"use strict";a.r(e);var s=a(322),o=a(321),r=a(310),n={components:{Toc:s.default,PostMeta:o.default,Comment:r.a,Newsletter:()=>Promise.all([a.e(0),a.e(3)]).then(a.bind(null,351))}},i=(a(337),a(4)),l=Object(i.a)(n,(function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"vuepress-theme-blog__post-layout"}},[e("article",{staticClass:"vuepress-blog-theme-content",attrs:{itemscope:"",itemtype:"https://schema.org/BlogPosting"}},[e("header",[e("h1",{staticClass:"post-title",attrs:{itemprop:"name headline"}},[t._v("\n        "+t._s(t.$frontmatter.title)+"\n      ")]),t._v(" "),e("PostMeta",{attrs:{tags:t.$frontmatter.tags,author:t.$frontmatter.author,authorlink:t.$frontmatter.authorlink,date:t.$frontmatter.date,location:t.$frontmatter.location}})],1),t._v(" "),e("Content",{attrs:{itemprop:"articleBody"}}),t._v(" "),e("footer",[t.$service.email.enabled?e("Newsletter"):t._e(),t._v(" "),e("hr"),t._v(" "),e("Comment")],1)],1),t._v(" "),e("Toc")],1)}),[],!1,null,null,null);e.default=l.exports}}]);