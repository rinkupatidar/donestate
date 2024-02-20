(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3840],{93840:function(t,e,o){var r,n,i; /**
 * @license Highstock JS v10.3.3 (2023-01-20)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */ i=function(t){"use strict";var e=t?t._modules:{};function o(t,e,o,r){t.hasOwnProperty(e)||(t[e]=r.apply(null,o),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}o(e,"Stock/Indicators/PPO/PPOIndicator.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){var o,r=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),n=t.seriesTypes.ema,i=e.correctFloat,s=e.extend,a=e.merge,p=e.error,u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.data=void 0,e.options=void 0,e.points=void 0,e}return r(e,t),e.prototype.getValues=function(t,e){var o,r,s,a,u,c=e.periods,d=e.index,l=[],f=[],h=[];if(2!==c.length||c[1]<=c[0]){p('Error: "PPO requires two periods. Notice, first period should be lower than the second one."');return}if(r=n.prototype.getValues.call(this,t,{index:d,period:c[0]}),s=n.prototype.getValues.call(this,t,{index:d,period:c[1]}),r&&s){for(u=0,o=c[1]-c[0];u<s.yData.length;u++)a=i((r.yData[u+o]-s.yData[u])/s.yData[u]*100),l.push([s.xData[u],a]),f.push(s.xData[u]),h.push(a);return{values:l,xData:f,yData:h}}},e.defaultOptions=a(n.defaultOptions,{params:{period:void 0,periods:[12,26]}}),e}(n);return s(u.prototype,{nameBase:"PPO",nameComponents:["periods"]}),t.registerSeriesType("ppo",u),u}),o(e,"masters/indicators/ppo.src.js",[],function(){})},t.exports?(i.default=i,t.exports=i):void 0===(n=(function(t){return i(t),i.Highcharts=t,i}).apply(e,[o(78840),o(50496)]))||(t.exports=n)}}]);