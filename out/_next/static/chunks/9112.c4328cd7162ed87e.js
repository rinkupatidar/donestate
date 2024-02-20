(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9112],{39112:function(o,t,s){var e,i,n; /**
 * @license Highstock JS v10.3.3 (2023-01-20)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */ n=function(o){"use strict";var t=o?o._modules:{};function s(o,t,s,e){o.hasOwnProperty(t)||(o[t]=e.apply(null,s),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:t,module:o[t]}})))}s(t,"Stock/Indicators/MACD/MACDIndicator.js",[t["Core/Globals.js"],t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(o,t,s){var e,i=this&&this.__extends||(e=function(o,t){return(e=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(o,t){o.__proto__=t}||function(o,t){for(var s in t)t.hasOwnProperty(s)&&(o[s]=t[s])})(o,t)},function(o,t){function s(){this.constructor=o}e(o,t),o.prototype=null===t?Object.create(t):(s.prototype=t.prototype,new s)}),n=o.noop,r=t.seriesTypes,p=(r.column,r.sma),a=s.extend,l=s.correctFloat,h=s.defined,c=s.merge,d=function(s){function e(){var o=null!==s&&s.apply(this,arguments)||this;return o.data=void 0,o.options=void 0,o.points=void 0,o.currentLineZone=void 0,o.graphmacd=void 0,o.graphsignal=void 0,o.macdZones=void 0,o.signalZones=void 0,o}return i(e,s),e.prototype.init=function(){t.seriesTypes.sma.prototype.init.apply(this,arguments);var o=this.color,s=this.userOptions._colorIndex;this.options&&(h(this.userOptions._colorIndex)&&(this.options.signalLine&&this.options.signalLine.styles&&!this.options.signalLine.styles.lineColor&&(this.userOptions._colorIndex++,this.getCyclic("color",void 0,this.chart.options.colors),this.options.signalLine.styles.lineColor=this.color),this.options.macdLine&&this.options.macdLine.styles&&!this.options.macdLine.styles.lineColor&&(this.userOptions._colorIndex++,this.getCyclic("color",void 0,this.chart.options.colors),this.options.macdLine.styles.lineColor=this.color)),this.macdZones={zones:this.options.macdLine.zones,startIndex:0},this.signalZones={zones:this.macdZones.zones.concat(this.options.signalLine.zones),startIndex:this.macdZones.zones.length},this.resetZones=!0),this.color=o,this.userOptions._colorIndex=s},e.prototype.toYData=function(o){return[o.y,o.signal,o.MACD]},e.prototype.translate=function(){var t=this,s=["plotSignal","plotMACD"];o.seriesTypes.column.prototype.translate.apply(t),t.points.forEach(function(o){[o.signal,o.MACD].forEach(function(e,i){null!==e&&(o[s[i]]=t.yAxis.toPixels(e,!0))})})},e.prototype.destroy=function(){this.graph=null,this.graphmacd=this.graphmacd&&this.graphmacd.destroy(),this.graphsignal=this.graphsignal&&this.graphsignal.destroy(),t.seriesTypes.sma.prototype.destroy.apply(this,arguments)},e.prototype.drawGraph=function(){for(var o,s=this,e=s.points,i=e.length,n=s.options,r=s.zones,p={options:{gapSize:n.gapSize}},a=[[],[]];i--;)h((o=e[i]).plotMACD)&&a[0].push({plotX:o.plotX,plotY:o.plotMACD,isNull:!h(o.plotMACD)}),h(o.plotSignal)&&a[1].push({plotX:o.plotX,plotY:o.plotSignal,isNull:!h(o.plotMACD)});["macd","signal"].forEach(function(o,e){s.points=a[e],s.options=c(n[o+"Line"].styles,p),s.graph=s["graph"+o],s.currentLineZone=o+"Zones",s.zones=s[s.currentLineZone].zones,t.seriesTypes.sma.prototype.drawGraph.call(s),s["graph"+o]=s.graph}),s.points=e,s.options=n,s.zones=r,s.currentLineZone=null},e.prototype.getZonesGraphs=function(o){var t=s.prototype.getZonesGraphs.call(this,o),e=t;return this.currentLineZone&&((e=t.splice(this[this.currentLineZone].startIndex+1)).length?e.splice(0,0,o[0]):e=[o[0]]),e},e.prototype.applyZones=function(){var o=this.zones;this.zones=this.signalZones.zones,t.seriesTypes.sma.prototype.applyZones.call(this),this.graphmacd&&this.options.macdLine.zones.length&&this.graphmacd.hide(),this.zones=o},e.prototype.getValues=function(o,s){var e,i,n,r=s.longPeriod-s.shortPeriod,p=0,a=[],c=[],d=[],u=[];if(!(o.xData.length<s.longPeriod+s.signalPeriod)){for(n=0,e=t.seriesTypes.ema.prototype.getValues(o,{period:s.shortPeriod,index:s.index}),i=t.seriesTypes.ema.prototype.getValues(o,{period:s.longPeriod,index:s.index}),e=e.values,i=i.values;n<=e.length;n++)h(i[n])&&h(i[n][1])&&h(e[n+r])&&h(e[n+r][0])&&a.push([e[n+r][0],0,null,e[n+r][1]-i[n][1]]);for(n=0;n<a.length;n++)c.push(a[n][0]),d.push([0,null,a[n][3]]);for(n=0,u=(u=t.seriesTypes.ema.prototype.getValues({xData:c,yData:d},{period:s.signalPeriod,index:2})).values;n<a.length;n++)a[n][0]>=u[0][0]&&(a[n][2]=u[p][1],d[n]=[0,u[p][1],a[n][3]],null===a[n][3]?(a[n][1]=0,d[n][0]=0):(a[n][1]=l(a[n][3]-u[p][1]),d[n][0]=l(a[n][3]-u[p][1])),p++);return{values:a,xData:c,yData:d}}},e.defaultOptions=c(p.defaultOptions,{params:{shortPeriod:12,longPeriod:26,signalPeriod:9,period:26},signalLine:{zones:[],styles:{lineWidth:1,lineColor:void 0}},macdLine:{zones:[],styles:{lineWidth:1,lineColor:void 0}},threshold:0,groupPadding:.1,pointPadding:.1,crisp:!1,states:{hover:{halo:{size:0}}},tooltip:{pointFormat:'<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>Value: {point.MACD}<br/>Signal: {point.signal}<br/>Histogram: {point.y}<br/>'},dataGrouping:{approximation:"averages"},minPointLength:0}),e}(p);return a(d.prototype,{nameComponents:["longPeriod","shortPeriod","signalPeriod"],pointArrayMap:["y","signal","MACD"],parallelArrays:["x","y","signal","MACD"],pointValKey:"y",markerAttribs:n,getColumnMetrics:o.seriesTypes.column.prototype.getColumnMetrics,crispCol:o.seriesTypes.column.prototype.crispCol,drawPoints:o.seriesTypes.column.prototype.drawPoints}),t.registerSeriesType("macd",d),d}),s(t,"masters/indicators/macd.src.js",[],function(){})},o.exports?(n.default=n,o.exports=n):void 0===(i=(function(o){return n(o),n.Highcharts=o,n}).apply(t,[s(78840),s(50496)]))||(o.exports=i)}}]);