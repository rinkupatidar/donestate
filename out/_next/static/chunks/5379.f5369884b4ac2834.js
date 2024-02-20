(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5379],{55379:function(t,e,n){var o,i,r; /**
 * @license Highstock JS v10.3.3 (2023-01-20)
 *
 * (c) 2010-2021 Highsoft AS
 * Author: Sebastian Domas
 *
 * License: www.highcharts.com/license
 */ r=function(t){"use strict";var e=t?t._modules:{};function n(t,e,n,o){t.hasOwnProperty(e)||(t[e]=o.apply(null,n),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}n(e,"Stock/Indicators/CMF/CMFIndicator.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){var n,o=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=t.seriesTypes.sma,r=e.merge,s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.data=void 0,e.options=void 0,e.points=void 0,e.volumeSeries=void 0,e.linkedParent=void 0,e.yData=void 0,e.nameBase="Chaikin Money Flow",e}return o(e,t),e.prototype.isValid=function(){var t=this.chart,e=this.options,n=this.linkedParent,o=this.volumeSeries||(this.volumeSeries=t.get(e.params.volumeSeriesID)),i=n&&n.yData&&4===n.yData[0].length;function r(t){return t.xData&&t.xData.length>=e.params.period}return!!(n&&o&&r(n)&&r(o)&&i)},e.prototype.getValues=function(t,e){if(this.isValid())return this.getMoneyFlow(t.xData,t.yData,this.volumeSeries.yData,e.period)},e.prototype.getMoneyFlow=function(t,e,n,o){var i,r,s=e.length,a=[],u=0,l=0,p=[],c=[],h=[],f=-1;function d(t,e){var n,o,r,s=t[1],a=t[2],u=t[3];return null!==e&&null!==s&&null!==a&&null!==u&&s!==a?(u-a-(s-u))/(s-a)*e:(f=i,null)}if(o>0&&o<=s){for(i=0;i<o;i++)a[i]=d(e[i],n[i]),u+=n[i],l+=a[i];for(p.push(t[i-1]),c.push(i-f>=o&&0!==u?l/u:null),h.push([p[0],c[0]]);i<s;i++)a[i]=d(e[i],n[i]),u-=n[i-o],u+=n[i],l-=a[i-o],l+=a[i],r=[t[i],i-f>=o?l/u:null],p.push(r[0]),c.push(r[1]),h.push([r[0],r[1]])}return{values:h,xData:p,yData:c}},e.defaultOptions=r(i.defaultOptions,{params:{index:void 0,volumeSeriesID:"volume"}}),e}(i);return t.registerSeriesType("cmf",s),s}),n(e,"masters/indicators/cmf.src.js",[],function(){})},t.exports?(r.default=r,t.exports=r):void 0===(i=(function(t){return r(t),r.Highcharts=t,r}).apply(e,[n(78840),n(50496)]))||(t.exports=i)}}]);