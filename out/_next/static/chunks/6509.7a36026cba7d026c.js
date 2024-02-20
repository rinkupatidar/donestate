(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6509],{66509:function(t,e,o){var r,n,i;i=function(t){function e(t,e,o,r){t.hasOwnProperty(e)||(t[e]=r.apply(null,o),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}e(t=t?t._modules:{},"Stock/Indicators/APO/APOIndicator.js",[t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(t,e){var o,r=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),n=t.seriesTypes.ema,i=e.extend,s=e.merge,a=e.error;return i((e=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.data=void 0,e.options=void 0,e.points=void 0,e}return r(e,t),e.prototype.getValues=function(t,e){var o=e.periods,r=e.index;e=[];var i,s=[],p=[];if(2!==o.length||o[1]<=o[0])a('Error: "APO requires two periods. Notice, first period should be lower than the second one."');else{var u=n.prototype.getValues.call(this,t,{index:r,period:o[0]});if(t=n.prototype.getValues.call(this,t,{index:r,period:o[1]}),u&&t){for(i=0,o=o[1]-o[0];i<t.yData.length;i++)r=u.yData[i+o]-t.yData[i],e.push([t.xData[i],r]),s.push(t.xData[i]),p.push(r);return{values:e,xData:s,yData:p}}}},e.defaultOptions=s(n.defaultOptions,{params:{period:void 0,periods:[10,20]}}),e}(n)).prototype,{nameBase:"APO",nameComponents:["periods"]}),t.registerSeriesType("apo",e),e}),e(t,"masters/indicators/apo.src.js",[],function(){})},t.exports?(i.default=i,t.exports=i):void 0!==(n=(function(t){return i(t),i.Highcharts=t,i}).apply(e,[o(78840),o(50496)]))&&(t.exports=n)}}]);