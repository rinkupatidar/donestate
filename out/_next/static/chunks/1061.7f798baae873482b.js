(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1061],{41061:function(t,o,r){var e,n,s; /**
 * @license Highstock JS v10.3.3 (2023-01-20)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */ s=function(t){"use strict";var o=t?t._modules:{};function r(t,o,r,e){t.hasOwnProperty(o)||(t[o]=e.apply(null,r),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:o,module:t[o]}})))}r(o,"Stock/Indicators/AO/AOIndicator.js",[o["Core/Globals.js"],o["Core/Series/SeriesRegistry.js"],o["Core/Utilities.js"]],function(t,o,r){var e,n=this&&this.__extends||(e=function(t,o){return(e=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var r in o)o.hasOwnProperty(r)&&(t[r]=o[r])})(t,o)},function(t,o){function r(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}),s=t.noop,i=o.seriesTypes,a=i.column.prototype,p=i.sma,l=r.extend,u=r.merge,c=r.correctFloat,d=r.isArray,f=function(t){function o(){var o=null!==t&&t.apply(this,arguments)||this;return o.data=void 0,o.options=void 0,o.points=void 0,o}return n(o,t),o.prototype.drawGraph=function(){var t,o=this.options,r=this.points,e=this.userOptions.color,n=o.greaterBarColor,s=o.lowerBarColor,i=r[0];if(!e&&i)for(t=1,i.color=n;t<r.length;t++)r[t].y>r[t-1].y?r[t].color=n:r[t].y<r[t-1].y?r[t].color=s:r[t].color=r[t-1].color},o.prototype.getValues=function(t){var o,r,e,n,s,i,a,p=t.xData||[],l=t.yData||[],u=l.length,f=[],h=[],y=[],v=0,g=0;if(!(p.length<=34)&&d(l[0])&&4===l[0].length){for(i=0;i<33;i++)s=(l[i][1]+l[i][2])/2,i>=29&&(v=c(v+s)),g=c(g+s);for(a=33;a<u;a++)v=c(v+(s=(l[a][1]+l[a][2])/2)),g=c(g+s),r=c((o=v/5)-g/34),f.push([p[a],r]),h.push(p[a]),y.push(r),e=a+1-5,n=a+1-34,v=c(v-(l[e][1]+l[e][2])/2),g=c(g-(l[n][1]+l[n][2])/2);return{values:f,xData:h,yData:y}}},o.defaultOptions=u(p.defaultOptions,{params:{index:void 0,period:void 0},greaterBarColor:"#06b535",lowerBarColor:"#f21313",threshold:0,groupPadding:.2,pointPadding:.2,crisp:!1,states:{hover:{halo:{size:0}}}}),o}(p);return l(f.prototype,{nameBase:"AO",nameComponents:!1,markerAttribs:s,getColumnMetrics:a.getColumnMetrics,crispCol:a.crispCol,translate:a.translate,drawPoints:a.drawPoints}),o.registerSeriesType("ao",f),f}),r(o,"masters/indicators/ao.src.js",[],function(){})},t.exports?(s.default=s,t.exports=s):void 0===(n=(function(t){return s(t),s.Highcharts=t,s}).apply(o,[r(78840),r(50496)]))||(t.exports=n)}}]);