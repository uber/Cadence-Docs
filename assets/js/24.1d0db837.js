(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{328:function(e,t,a){"use strict";a.r(t);a(104);var s={props:{name:{type:String,default:"default"},isolated:{type:Boolean,default:!1},languages:{type:Object,required:!1}},data(){return{selectedLanguage:this.languages?Object.keys(this.languages)[0]:null,actualLanguages:this.languages}},computed:{root(){let e,t=this;for(;e=t.$parent;)t=e;return t},localStorageKey(){return"vuepress-plugin-code-switcher@"+this.name}},methods:{switchLanguage(e){if(this.isolated)return this.selectedLanguage=e;"undefined"!=typeof localStorage&&localStorage.setItem(this.localStorageKey,e),this.root.$emit("change",{name:this.name,value:e})},setConfiguredDefaultLanguages(){if(this.languages)return;const e=this.$page.codeSwitcherOptions;e&&e.groups&&e.groups[this.name]&&(this.actualLanguages=e.groups[this.name],this.selectedLanguage=Object.keys(this.actualLanguages)[0])}},created(){if(!this.isolated){if(this.setConfiguredDefaultLanguages(),!this.actualLanguages)throw new Error('You must specify either the "languages" prop or use the "groups" option when configuring the plugin.');if("undefined"!=typeof localStorage){let e=localStorage.getItem(this.localStorageKey);e&&-1!==Object.keys(this.actualLanguages).indexOf(e)&&(this.selectedLanguage=e)}this.root.$on("change",({name:e,value:t})=>{e===this.name&&(this.selectedLanguage=t)})}}},n=a(0),u=Object(n.a)(s,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"code-switcher"},[t("div",{staticClass:"tab-header"},[t("ul",e._l(e.actualLanguages,(function(a,s){return t("li",{key:s,class:{active:e.selectedLanguage===s},on:{click:function(t){return e.switchLanguage(s)}}},[e._v(" "+e._s(a)+"\n            ")])})),0)]),e._v(" "),e._l(e.actualLanguages,(function(a,s){return t("div",{directives:[{name:"show",rawName:"v-show",value:s===e.selectedLanguage,expression:"shorthand === selectedLanguage"}],key:s,staticClass:"tab-content"},[e._t(s)],2)}))],2)}),[],!1,null,null,null);t.default=u.exports}}]);