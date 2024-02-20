(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3574],{53574:function(t,e,o){var r,n,i; /**
 * @license Highstock JS v10.3.3 (2023-01-20)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */ i=function(t){"use strict";var e=t?t._modules:{};function o(t,e,o,r){t.hasOwnProperty(e)||(t[e]=r.apply(null,o),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}o(e,"Stock/Indicators/APO/APOIndicator.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){var o,r=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),n=t.seriesTypes.ema,i=e.extend,s=e.merge,a=e.error,p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.data=void 0,e.options=void 0,e.points=void 0,e}return r(e,t),e.prototype.getValues=function(t,e){var o,r,i,s,p,u=e.periods,c=e.index,d=[],l=[],f=[];if(2!==u.length||u[1]<=u[0]){a('Error: "APO requires two periods. Notice, first period should be lower than the second one."');return}if(r=n.prototype.getValues.call(this,t,{index:c,period:u[0]}),i=n.prototype.getValues.call(this,t,{index:c,period:u[1]}),r&&i){for(p=0,o=u[1]-u[0];p<i.yData.length;p++)s=r.yData[p+o]-i.yData[p],d.push([i.xData[p],s]),l.push(i.xData[p]),f.push(s);return{values:d,xData:l,yData:f}}},e.defaultOptions=s(n.defaultOptions,{params:{period:void 0,periods:[10,20]}}),e}(n);return i(p.prototype,{nameBase:"APO",nameComponents:["periods"]}),t.registerSeriesType("apo",p),p}),o(e,"masters/indicators/apo.src.js",[],function(){})},t.exports?(i.default=i,t.exports=i):void 0===(n=(function(t){return i(t),i.Highcharts=t,i}).apply(e,[o(78840),o(50496)]))||(t.exports=n)}}]);