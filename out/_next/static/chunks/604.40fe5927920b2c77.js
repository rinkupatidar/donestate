(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[604],{30604:function(t,e,r){var n,o,i; /**
 * @license Highstock JS v10.3.3 (2023-01-20)
 *
 * Money Flow Index indicator for Highcharts Stock
 *
 * (c) 2010-2021 Grzegorz Blachliński
 *
 * License: www.highcharts.com/license
 */ i=function(t){"use strict";var e=t?t._modules:{};function r(t,e,r,n){t.hasOwnProperty(e)||(t[e]=n.apply(null,r),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}r(e,"Stock/Indicators/MFI/MFIIndicator.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){var r,n=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=t.seriesTypes.sma,i=e.extend,s=e.merge,u=e.error,a=e.isArray;function p(t){return t.reduce(function(t,e){return t+e})}function c(t,e){return parseFloat(t.toFixed(e))}function f(t){return(t[1]+t[2]+t[3])/3}var l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.data=void 0,e.options=void 0,e.points=void 0,e}return n(e,t),e.prototype.getValues=function(t,e){var r,n,o,i,s,l,h,d,v,y,m,_,g=e.period,x=t.xData,w=t.yData,D=w?w.length:0,I=e.decimals,S=1,C=t.chart.get(e.volumeSeriesID),O=C&&C.yData,j=[],k=!1,E=[],F=[],b=[],M=[];if(!C){u("Series "+e.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,t.chart);return}if(!(x.length<=g)&&a(w[0])&&4===w[0].length&&O){for(s=f(w[S]);S<g+1;)l=s,k=(s=f(w[S]))>=l,r=s,h=r*(n=O[S]),b.push(k?h:0),M.push(k?0:h),S++;for(_=S-1;_<D;_++)_>S-1&&(b.shift(),M.shift(),l=s,k=(s=f(w[_]))>l,o=s,h=o*(i=O[_]),b.push(k?h:0),M.push(k?0:h)),d=p(M),y=p(b)/d,m=c(100-100/(1+y),I),j.push([x[_],m]),E.push(x[_]),F.push(m);return{values:j,xData:E,yData:F}}},e.defaultOptions=s(o.defaultOptions,{params:{index:void 0,volumeSeriesID:"volume",decimals:4}}),e}(o);return i(l.prototype,{nameBase:"Money Flow Index"}),t.registerSeriesType("mfi",l),l}),r(e,"masters/indicators/mfi.src.js",[],function(){})},t.exports?(i.default=i,t.exports=i):void 0===(o=(function(t){return i(t),i.Highcharts=t,i}).apply(e,[r(78840),r(50496)]))||(t.exports=o)}}]);