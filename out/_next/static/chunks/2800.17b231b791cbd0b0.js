(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2800],{82800:function(t,o,e){var i,n,r; /**
 * @license Highstock JS v10.3.3 (2023-01-20)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */ r=function(t){"use strict";var o=t?t._modules:{};function e(t,o,e,i){t.hasOwnProperty(o)||(t[o]=i.apply(null,e),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:o,module:t[o]}})))}e(o,"Stock/Indicators/MultipleLinesComposition.js",[o["Core/Series/SeriesRegistry.js"],o["Core/Utilities.js"]],function(t,o){var e,i=t.seriesTypes.sma.prototype,n=o.defined,r=o.error,a=o.merge;return function(t){var o=[],e=["bottomLine"],s=["top","bottom"],p=["top"];function l(t){return"plot"+t.charAt(0).toUpperCase()+t.slice(1)}function c(t,o){var e=[];return(t.pointArrayMap||[]).forEach(function(t){t!==o&&e.push(l(t))}),e}function h(){var t,o=this,e=o.pointValKey,s=o.linesApiNames,p=o.areaLinesNames,h=o.points,u=o.options,f=o.graph,y={options:{gapSize:u.gapSize}},d=[],g=c(o,e),m=h.length;if(g.forEach(function(o,e){for(d[e]=[];m--;)t=h[m],d[e].push({x:t.x,plotX:t.plotX,plotY:t[o],isNull:!n(t[o])});m=h.length}),o.userOptions.fillColor&&p.length){var v=d[g.indexOf(l(p[0]))],A=1===p.length?h:d[g.indexOf(l(p[1]))],x=o.color;o.points=A,o.nextPoints=v,o.color=o.userOptions.fillColor,o.options=a(h,y),o.graph=o.area,o.fillGraph=!0,i.drawGraph.call(o),o.area=o.graph,delete o.nextPoints,delete o.fillGraph,o.color=x}s.forEach(function(t,e){d[e]?(o.points=d[e],u[t]?o.options=a(u[t].styles,y):r('Error: "There is no '+t+' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names."'),o.graph=o["graph"+t],i.drawGraph.call(o),o["graph"+t]=o.graph):r('Error: "'+t+" doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")}),o.points=h,o.options=u,o.graph=f,i.drawGraph.call(o)}function u(t){var o,e=[],n=[];if(t=t||this.points,this.fillGraph&&this.nextPoints){if((o=i.getGraphPath.call(this,this.nextPoints))&&o.length){o[0][0]="L",e=i.getGraphPath.call(this,t),n=o.slice(0,e.length);for(var r=n.length-1;r>=0;r--)e.push(n[r])}}else e=i.getGraphPath.apply(this,arguments);return e}function f(t){var o=[];return(this.pointArrayMap||[]).forEach(function(e){o.push(t[e])}),o}function y(){var t,o=this,e=this.pointArrayMap,n=[];n=c(this),i.translate.apply(this,arguments),this.points.forEach(function(i){e.forEach(function(e,r){t=i[e],o.dataModify&&(t=o.dataModify.modifyValue(t)),null!==t&&(i[n[r]]=o.yAxis.toPixels(t,!0))})})}t.compose=function(t){if(-1===o.indexOf(t)){o.push(t);var i=t.prototype;i.linesApiNames=i.linesApiNames||e.slice(),i.pointArrayMap=i.pointArrayMap||s.slice(),i.pointValKey=i.pointValKey||"top",i.areaLinesNames=i.areaLinesNames||p.slice(),i.drawGraph=h,i.getGraphPath=u,i.toYData=f,i.translate=y}return t}}(e||(e={})),e}),e(o,"Stock/Indicators/AroonOscillator/AroonOscillatorIndicator.js",[o["Stock/Indicators/MultipleLinesComposition.js"],o["Core/Series/SeriesRegistry.js"],o["Core/Utilities.js"]],function(t,o,e){var i,n=this&&this.__extends||(i=function(t,o){return(i=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)o.hasOwnProperty(e)&&(t[e]=o[e])})(t,o)},function(t,o){function e(){this.constructor=t}i(t,o),t.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)}),r=o.seriesTypes.aroon,a=e.extend,s=e.merge,p=function(t){function o(){var o=null!==t&&t.apply(this,arguments)||this;return o.data=void 0,o.options=void 0,o.points=void 0,o}return n(o,t),o.prototype.getValues=function(o,e){var i,n,r,a,s,p=[],l=[],c=[];for(s=0,i=t.prototype.getValues.call(this,o,e);s<i.yData.length;s++)a=(n=i.yData[s][0])-i.yData[s][1],p.push([i.xData[s],a]),l.push(i.xData[s]),c.push(a);return{values:p,xData:l,yData:c}},o.defaultOptions=s(r.defaultOptions,{tooltip:{pointFormat:'<span style="color:{point.color}">●</span><b> {series.name}</b>: {point.y}'}}),o}(r);return a(p.prototype,{nameBase:"Aroon Oscillator",linesApiNames:[],pointArrayMap:["y"],pointValKey:"y"}),t.compose(r),o.registerSeriesType("aroonoscillator",p),p}),e(o,"masters/indicators/aroon-oscillator.src.js",[],function(){})},t.exports?(r.default=r,t.exports=r):void 0===(n=(function(t){return r(t),r.Highcharts=t,r}).apply(o,[e(78840),e(50496)]))||(t.exports=n)}}]);