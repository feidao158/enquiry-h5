(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-information"],{"1b0d":function(t,n,i){"use strict";i.d(n,"b",(function(){return a})),i.d(n,"c",(function(){return o})),i.d(n,"a",(function(){return e}));var e={uniNavBar:i("c792").default,uCellGroup:i("da7c").default,uCellItem:i("d30a").default},a=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("v-uni-view",[i("v-uni-view",{staticClass:"example-body"},[i("uni-nav-bar",{attrs:{"left-icon":"arrowleft","right-text":"","left-text":"",title:"资讯中心"},on:{clickLeft:function(n){arguments[0]=n=t.$handleEvent(n),t.back.apply(void 0,arguments)},clickRight:function(n){arguments[0]=n=t.$handleEvent(n),t.rightlist.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"u-m-t-5"},t._l(t.list,(function(n,e){return i("u-cell-group",{key:e},[i("v-uni-view",[i("u-cell-item",{attrs:{icon:"",title:n.title},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.informationLise(e)}}},[i("v-uni-view",[t._v(t._s(n.createTime))])],1)],1)],1)})),1)],1)},o=[]},"345b":function(t,n,i){"use strict";var e=i("deb0a"),a=i.n(e);a.a},"455e":function(t,n,i){var e=i("24fb");n=e(!1),n.push([t.i,".example-body[data-v-67072cf4]{\ndisplay:block;\npadding:0}.u-cell[data-v-67072cf4]{padding:8px 16px}",""]),t.exports=n},"7a38":function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{list:[]}},onLoad:function(){this.informationList()},methods:{back:function(){uni.navigateBack({delta:1})},rightlist:function(){console.log(321),this.show=!0},informationLise:function(t){console.log(23,this.list),this.$store.commit("updateNoticeInfo",this.list[t]),uni.navigateTo({url:"./informationList"})},informationList:function(){var t=this;t.$u.get("chain-api/v1/notice/list",{page:1,size:100}).then((function(n){200==n.code?t.list=n.data.list:t.$refs.uToast.show({title:n.message})}))}}};n.default=e},"835e":function(t,n,i){"use strict";i.r(n);var e=i("1b0d"),a=i("a55f");for(var o in a)"default"!==o&&function(t){i.d(n,t,(function(){return a[t]}))}(o);i("345b");var u,c=i("f0c5"),l=Object(c["a"])(a["default"],e["b"],e["c"],!1,null,"67072cf4",null,!1,e["a"],u);n["default"]=l.exports},a55f:function(t,n,i){"use strict";i.r(n);var e=i("7a38"),a=i.n(e);for(var o in e)"default"!==o&&function(t){i.d(n,t,(function(){return e[t]}))}(o);n["default"]=a.a},deb0a:function(t,n,i){var e=i("455e");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var a=i("4f06").default;a("7c34364e",e,!0,{sourceMap:!1,shadowMode:!1})}}]);