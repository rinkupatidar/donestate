(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6653],{76653:function(t,e,o){var n,r,i; /**
 * @license Highstock JS v10.3.3 (2023-01-20)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Rafal Sebestjanski
 *
 * License: www.highcharts.com/license
 */ i=function(t){"use strict";var e=t?t._modules:{};function o(t,e,o,n){t.hasOwnProperty(e)||(t[e]=n.apply(null,o),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}o(e,"Stock/Indicators/TRIX/TRIXIndicator.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){var o,n=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=t.seriesTypes.tema,i=e.correctFloat,s=e.merge,u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.data=void 0,e.options=void 0,e.points=void 0,e}return n(e,t),e.prototype.getTemaPoint=function(t,e,o,n){if(n>e)return[t[n-3],0!==o.prevLevel3?i(o.level3-o.prevLevel3)/o.prevLevel3*100:null]},e.defaultOptions=s(r.defaultOptions),e}(r);return t.registerSeriesType("trix",u),u}),o(e,"masters/indicators/trix.src.js",[],function(){})},t.exports?(i.default=i,t.exports=i):void 0===(r=(function(t){return i(t),i.Highcharts=t,i}).apply(e,[o(78840),o(50496)]))||(t.exports=r)}}]);