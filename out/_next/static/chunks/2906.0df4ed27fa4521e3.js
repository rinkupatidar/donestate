(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2906],{42906:function(t,e,n){var o,r,i; /**
 * @license Highstock JS v10.3.3 (2023-01-20)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Kacper Madej
 *
 * License: www.highcharts.com/license
 */ i=function(t){"use strict";var e=t?t._modules:{};function n(t,e,n,o){t.hasOwnProperty(e)||(t[e]=o.apply(null,n),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}n(e,"Stock/Indicators/ROC/ROCIndicator.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){var n,o=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),r=t.seriesTypes.sma,i=e.isArray,s=e.merge,a=e.extend;function u(t,e,n,o,r){var i,s;return s=r<0?(i=e[n-o])?(e[n]-i)/i*100:null:(i=e[n-o][r])?(e[n][r]-i)/i*100:null,[t[n],s]}var p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.data=void 0,e.options=void 0,e.points=void 0,e}return o(e,t),e.prototype.getValues=function(t,e){var n,o,r=e.period,s=t.xData,a=t.yData,p=a?a.length:0,c=[],f=[],l=[],d=-1;if(!(s.length<=r)){for(i(a[0])&&(d=e.index),n=r;n<p;n++)o=u(s,a,n,r,d),c.push(o),f.push(o[0]),l.push(o[1]);return{values:c,xData:f,yData:l}}},e.defaultOptions=s(r.defaultOptions,{params:{index:3,period:9}}),e}(r);return a(p.prototype,{nameBase:"Rate of Change"}),t.registerSeriesType("roc",p),p}),n(e,"masters/indicators/roc.src.js",[],function(){})},t.exports?(i.default=i,t.exports=i):void 0===(r=(function(t){return i(t),i.Highcharts=t,i}).apply(e,[n(78840),n(50496)]))||(t.exports=r)}}]);