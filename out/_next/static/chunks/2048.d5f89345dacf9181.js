(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2048],{92048:function(t,e,a){var r,n,i; /**
 * @license Highstock JS v10.3.3 (2023-01-20)
 *
 * Indicator series type for Highstock
 *
 * (c) 2010-2021 Rafal Sebestjanski
 *
 * License: www.highcharts.com/license
 */ i=function(t){"use strict";var e=t?t._modules:{};function a(t,e,a,r){t.hasOwnProperty(e)||(t[e]=r.apply(null,a),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}a(e,"Stock/Indicators/DisparityIndex/DisparityIndexIndicator.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){var a,r=this&&this.__extends||(a=function(t,e){return(a=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var a in e)e.hasOwnProperty(a)&&(t[a]=e[a])})(t,e)},function(t,e){function r(){this.constructor=t}a(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),n=t.seriesTypes.sma,i=e.correctFloat,o=e.defined,s=e.extend,p=e.isArray,u=e.merge,c=function(e){function a(){var t=null!==e&&e.apply(this,arguments)||this;return t.averageIndicator=void 0,t.data=void 0,t.options=void 0,t.points=void 0,t}return r(a,e),a.prototype.init=function(){var e=arguments,a=this,r=e[1].params,i=r&&r.average?r.average:void 0;a.averageIndicator=t.seriesTypes[i]||n,a.averageIndicator.prototype.init.apply(a,e)},a.prototype.calculateDisparityIndex=function(t,e){return i(t-e)/e*100},a.prototype.getValues=function(t,e){var a=e.index,r=t.xData,n=t.yData,i=n?n.length:0,s=[],u=[],c=[],d=this.averageIndicator,y=p(n[0]),l=d.prototype.getValues(t,e),f=l.yData,v=r.indexOf(l.xData[0]);if(f&&0!==f.length&&o(a)&&!(n.length<=v)){for(var h=v;h<i;h++){var g=this.calculateDisparityIndex(y?n[h][a]:n[h],f[h-v]);s.push([r[h],g]),u.push(r[h]),c.push(g)}return{values:s,xData:u,yData:c}}},a.defaultOptions=u(n.defaultOptions,{params:{average:"sma",index:3},marker:{enabled:!1},dataGrouping:{approximation:"averages"}}),a}(n);return s(c.prototype,{nameBase:"Disparity Index",nameComponents:["period","average"]}),t.registerSeriesType("disparityindex",c),c}),a(e,"masters/indicators/disparity-index.src.js",[],function(){})},t.exports?(i.default=i,t.exports=i):void 0===(n=(function(t){return i(t),i.Highcharts=t,i}).apply(e,[a(78840),a(50496)]))||(t.exports=n)}}]);