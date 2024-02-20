(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7243],{27243:function(t,e,r){var o,n,s;s=function(t){function e(t,e,r,o){t.hasOwnProperty(e)||(t[e]=o.apply(null,r),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}e(t=t?t._modules:{},"Stock/Indicators/VWAP/VWAPIndicator.js",[t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(t,e){var r,o=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function o(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),n=t.seriesTypes.sma,s=e.error,a=e.isArray,i=e.merge;return e=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.data=void 0,e.points=void 0,e.options=void 0,e}return o(e,t),e.prototype.getValues=function(t,e){var r=t.chart,o=t.xData;t=t.yData;var n,i=e.period,u=!0;if(n=r.get(e.volumeSeriesID))return a(t[0])||(u=!1),this.calculateVWAPValues(u,o,t,n,i);s("Series "+e.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,r)},e.prototype.calculateVWAPValues=function(t,e,r,o,n){var s=o.yData,a=o.xData.length,i=e.length;o=[];var u,p=[],c=[],l=[],f=[];for(a=i<=a?i:a,u=i=0;i<a;i++){var h=t?(r[i][1]+r[i][2]+r[i][3])/3:r[i];h*=s[i],h=u?o[i-1]+h:h;var v=u?p[i-1]+s[i]:s[i];o.push(h),p.push(v),f.push([e[i],h/v]),c.push(f[i][0]),l.push(f[i][1]),++u===n&&(u=0)}return{values:f,xData:c,yData:l}},e.defaultOptions=i(n.defaultOptions,{params:{index:void 0,period:30,volumeSeriesID:"volume"}}),e}(n),t.registerSeriesType("vwap",e),e}),e(t,"masters/indicators/vwap.src.js",[],function(){})},t.exports?(s.default=s,t.exports=s):void 0!==(n=(function(t){return s(t),s.Highcharts=t,s}).apply(e,[r(78840),r(50496)]))&&(t.exports=n)}}]);