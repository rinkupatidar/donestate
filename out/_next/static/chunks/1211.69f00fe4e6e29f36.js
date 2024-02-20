(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1211],{51211:function(t,e,o){var i,r,n; /**
 * @license Highcharts Stock JS v10.3.3 (2023-01-20)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Karol Kolodziej
 *
 * License: www.highcharts.com/license
 */ n=function(t){"use strict";var e=t?t._modules:{};function o(t,e,o,i){t.hasOwnProperty(e)||(t[e]=i.apply(null,o),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}o(e,"Stock/Indicators/MultipleLinesComposition.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){var o,i=t.seriesTypes.sma.prototype,r=e.defined,n=e.error,a=e.merge;return function(t){var e=[],o=["bottomLine"],s=["top","bottom"],p=["top"];function l(t){return"plot"+t.charAt(0).toUpperCase()+t.slice(1)}function u(t,e){var o=[];return(t.pointArrayMap||[]).forEach(function(t){t!==e&&o.push(l(t))}),o}function c(){var t,e=this,o=e.pointValKey,s=e.linesApiNames,p=e.areaLinesNames,c=e.points,h=e.options,f=e.graph,g={options:{gapSize:h.gapSize}},d=[],y=u(e,o),v=c.length;if(y.forEach(function(e,o){for(d[o]=[];v--;)t=c[v],d[o].push({x:t.x,plotX:t.plotX,plotY:t[e],isNull:!r(t[e])});v=c.length}),e.userOptions.fillColor&&p.length){var m=d[y.indexOf(l(p[0]))],A=1===p.length?c:d[y.indexOf(l(p[1]))],P=e.color;e.points=A,e.nextPoints=m,e.color=e.userOptions.fillColor,e.options=a(c,g),e.graph=e.area,e.fillGraph=!0,i.drawGraph.call(e),e.area=e.graph,delete e.nextPoints,delete e.fillGraph,e.color=P}s.forEach(function(t,o){d[o]?(e.points=d[o],h[t]?e.options=a(h[t].styles,g):n('Error: "There is no '+t+' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names."'),e.graph=e["graph"+t],i.drawGraph.call(e),e["graph"+t]=e.graph):n('Error: "'+t+" doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")}),e.points=c,e.options=h,e.graph=f,i.drawGraph.call(e)}function h(t){var e,o=[],r=[];if(t=t||this.points,this.fillGraph&&this.nextPoints){if((e=i.getGraphPath.call(this,this.nextPoints))&&e.length){e[0][0]="L",o=i.getGraphPath.call(this,t),r=e.slice(0,o.length);for(var n=r.length-1;n>=0;n--)o.push(r[n])}}else o=i.getGraphPath.apply(this,arguments);return o}function f(t){var e=[];return(this.pointArrayMap||[]).forEach(function(o){e.push(t[o])}),e}function g(){var t,e=this,o=this.pointArrayMap,r=[];r=u(this),i.translate.apply(this,arguments),this.points.forEach(function(i){o.forEach(function(o,n){t=i[o],e.dataModify&&(t=e.dataModify.modifyValue(t)),null!==t&&(i[r[n]]=e.yAxis.toPixels(t,!0))})})}t.compose=function(t){if(-1===e.indexOf(t)){e.push(t);var i=t.prototype;i.linesApiNames=i.linesApiNames||o.slice(),i.pointArrayMap=i.pointArrayMap||s.slice(),i.pointValKey=i.pointValKey||"top",i.areaLinesNames=i.areaLinesNames||p.slice(),i.drawGraph=c,i.getGraphPath=h,i.toYData=f,i.translate=g}return t}}(o||(o={})),o}),o(e,"Stock/Indicators/Klinger/KlingerIndicator.js",[e["Stock/Indicators/MultipleLinesComposition.js"],e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e,o){var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),n=e.seriesTypes,a=n.ema,s=n.sma,p=o.correctFloat,l=o.error,u=o.extend,c=o.isArray,h=o.merge,f=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.data=void 0,e.points=void 0,e.options=void 0,e.volumeSeries=void 0,e}return r(e,t),e.prototype.calculateTrend=function(t,e){return t[e][1]+t[e][2]+t[e][3]>t[e-1][1]+t[e-1][2]+t[e-1][3]?1:-1},e.prototype.isValidData=function(t){var e=this.chart,o=this.options,i=this.linkedParent,r=c(t)&&4===t.length,n=this.volumeSeries||(this.volumeSeries=e.get(o.params.volumeSeriesID));return n||l("Series "+o.params.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,i.chart),!!([i,n].every(function(t){return t&&t.xData&&t.xData.length>=o.params.slowAvgPeriod})&&r)},e.prototype.getCM=function(t,e,o,i,r){return p(e+(o===i?t:r))},e.prototype.getDM=function(t,e){return p(t-e)},e.prototype.getVolumeForce=function(t){for(var e,o,i,r=[],n=0,a=1,s=0,p=t[0][1]-t[0][2],l=0;a<t.length;a++)i=this.calculateTrend(t,a),e=this.getDM(t[a][1],t[a][2]),n=this.getCM(s,e,i,l,p),o=this.volumeSeries.yData[a]*i*Math.abs(2*(e/n-1))*100,r.push([o]),l=i,s=n,p=e;return r},e.prototype.getEMA=function(t,e,o,i,r,n,s){return a.prototype.calculateEma(s||[],t,void 0===n?1:n,i,e,void 0===r?-1:r,o)},e.prototype.getSMA=function(t,e,o){return a.prototype.accumulatePeriodPoints(t,e,o)/t},e.prototype.getValues=function(t,e){var o,i,r=[],n=t.xData,a=t.yData,s=[],l=[],u=[],c=0,h=0,f=void 0,g=void 0,d=null;if(this.isValidData(a[0])){for(var y=this.getVolumeForce(a),v=this.getSMA(e.fastAvgPeriod,0,y),m=this.getSMA(e.slowAvgPeriod,0,y),A=2/(e.fastAvgPeriod+1),P=2/(e.slowAvgPeriod+1);c<a.length;c++)c>=e.fastAvgPeriod&&(f=h=this.getEMA(y,f,v,A,0,c,n)[1]),c>=e.slowAvgPeriod&&(g=i=this.getEMA(y,g,m,P,0,c,n)[1],o=p(h-i),u.push(o),u.length>=e.signalPeriod&&(d=u.slice(-e.signalPeriod).reduce(function(t,e){return t+e})/e.signalPeriod),r.push([n[c],o,d]),s.push(n[c]),l.push([o,d]));return{values:r,xData:s,yData:l}}},e.defaultOptions=h(s.defaultOptions,{params:{fastAvgPeriod:34,slowAvgPeriod:55,signalPeriod:13,volumeSeriesID:"volume"},signalLine:{styles:{lineWidth:1,lineColor:"#ff0000"}},dataGrouping:{approximation:"averages"},tooltip:{pointFormat:'<span style="color: {point.color}">●</span><b> {series.name}</b><br/><span style="color: {point.color}">Klinger</span>: {point.y}<br/><span style="color: {point.series.options.signalLine.styles.lineColor}">Signal</span>: {point.signal}<br/>'}}),e}(s);return u(f.prototype,{areaLinesNames:[],linesApiNames:["signalLine"],nameBase:"Klinger",nameComponents:["fastAvgPeriod","slowAvgPeriod"],pointArrayMap:["y","signal"],parallelArrays:["x","y","signal"],pointValKey:"y"}),t.compose(f),e.registerSeriesType("klinger",f),f}),o(e,"masters/indicators/klinger.src.js",[],function(){})},t.exports?(n.default=n,t.exports=n):void 0===(r=(function(t){return n(t),n.Highcharts=t,n}).apply(e,[o(78840),o(50496)]))||(t.exports=r)}}]);