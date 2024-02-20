(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7296],{67296:function(t,e,o){var i,n,r;r=function(t){function e(t,e,o,i){t.hasOwnProperty(e)||(t[e]=i.apply(null,o),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}e(t=t?t._modules:{},"Stock/Indicators/ArrayUtilities.js",[],function(){return{getArrayExtremes:function(t,e,o){return t.reduce(function(t,i){return[Math.min(t[0],i[e]),Math.max(t[1],i[o])]},[Number.MAX_VALUE,-Number.MAX_VALUE])}}}),e(t,"Stock/Indicators/MultipleLinesComposition.js",[t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(t,e){var o,i=t.seriesTypes.sma.prototype,n=e.defined,r=e.error,a=e.merge;return function(t){function e(t){return"plot"+t.charAt(0).toUpperCase()+t.slice(1)}function o(t,o){var i=[];return(t.pointArrayMap||[]).forEach(function(t){t!==o&&i.push(e(t))}),i}function s(){var t,s=this,p=s.linesApiNames,l=s.areaLinesNames,c=s.points,h=s.options,u=s.graph,f={options:{gapSize:h.gapSize}},d=[],y=o(s,s.pointValKey),m=c.length;if(y.forEach(function(e,o){for(d[o]=[];m--;)t=c[m],d[o].push({x:t.x,plotX:t.plotX,plotY:t[e],isNull:!n(t[e])});m=c.length}),s.userOptions.fillColor&&l.length){var g=y.indexOf(e(l[0]));g=d[g],l=1===l.length?c:d[y.indexOf(e(l[1]))],y=s.color,s.points=l,s.nextPoints=g,s.color=s.userOptions.fillColor,s.options=a(c,f),s.graph=s.area,s.fillGraph=!0,i.drawGraph.call(s),s.area=s.graph,delete s.nextPoints,delete s.fillGraph,s.color=y}p.forEach(function(t,e){d[e]?(s.points=d[e],h[t]?s.options=a(h[t].styles,f):r('Error: "There is no '+t+' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names."'),s.graph=s["graph"+t],i.drawGraph.call(s),s["graph"+t]=s.graph):r('Error: "'+t+" doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")}),s.points=c,s.options=h,s.graph=u,i.drawGraph.call(s)}function p(t){var e,o=[];if(t=t||this.points,this.fillGraph&&this.nextPoints){if((e=i.getGraphPath.call(this,this.nextPoints))&&e.length){e[0][0]="L",o=i.getGraphPath.call(this,t),e=e.slice(0,o.length);for(var n=e.length-1;0<=n;n--)o.push(e[n])}}else o=i.getGraphPath.apply(this,arguments);return o}function l(t){var e=[];return(this.pointArrayMap||[]).forEach(function(o){e.push(t[o])}),e}function c(){var t,e=this,n=this.pointArrayMap,r=[];r=o(this),i.translate.apply(this,arguments),this.points.forEach(function(o){n.forEach(function(i,n){t=o[i],e.dataModify&&(t=e.dataModify.modifyValue(t)),null!==t&&(o[r[n]]=e.yAxis.toPixels(t,!0))})})}var h=[],u=["bottomLine"],f=["top","bottom"],d=["top"];t.compose=function(t){if(-1===h.indexOf(t)){h.push(t);var e=t.prototype;e.linesApiNames=e.linesApiNames||u.slice(),e.pointArrayMap=e.pointArrayMap||f.slice(),e.pointValKey=e.pointValKey||"top",e.areaLinesNames=e.areaLinesNames||d.slice(),e.drawGraph=s,e.getGraphPath=p,e.toYData=l,e.translate=c}return t}}(o||(o={})),o}),e(t,"Stock/Indicators/PC/PCIndicator.js",[t["Stock/Indicators/ArrayUtilities.js"],t["Stock/Indicators/MultipleLinesComposition.js"],t["Core/Color/Palettes.js"],t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(t,e,o,i,n){var r,a=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),s=i.seriesTypes.sma,p=n.merge;n=n.extend;var l=function(e){function i(){var t=null!==e&&e.apply(this,arguments)||this;return t.data=void 0,t.options=void 0,t.points=void 0,t}return a(i,e),i.prototype.getValues=function(e,o){o=o.period;var i,n=e.xData,r=(e=e.yData)?e.length:0,a=[],s=[],p=[];if(!(r<o)){for(i=o;i<=r;i++){var l=n[i-1],c=e.slice(i-o,i),h=t.getArrayExtremes(c,2,1);c=h[1];var u=h[0];h=(c+u)/2,a.push([l,c,h,u]),s.push(l),p.push([c,h,u])}return{values:a,xData:s,yData:p}}},i.defaultOptions=p(s.defaultOptions,{params:{index:void 0,period:20},lineWidth:1,topLine:{styles:{lineColor:o.colors[2],lineWidth:1}},bottomLine:{styles:{lineColor:o.colors[8],lineWidth:1}},dataGrouping:{approximation:"averages"}}),i}(s);return n(l.prototype,{areaLinesNames:["top","bottom"],nameBase:"Price Channel",nameComponents:["period"],linesApiNames:["topLine","bottomLine"],pointArrayMap:["top","middle","bottom"],pointValKey:"middle"}),e.compose(l),i.registerSeriesType("pc",l),l}),e(t,"masters/indicators/price-channel.src.js",[],function(){})},t.exports?(r.default=r,t.exports=r):void 0!==(n=(function(t){return r(t),r.Highcharts=t,r}).apply(e,[o(78840),o(50496)]))&&(t.exports=n)}}]);