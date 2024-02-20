(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5962],{5962:function(o,t,e){var r,n,i; /**
 * @license Highstock JS v10.3.3 (2023-01-20)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */ i=function(o){"use strict";var t=o?o._modules:{};function e(o,t,e,r){o.hasOwnProperty(t)||(o[t]=r.apply(null,e),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:t,module:o[t]}})))}e(t,"Stock/Indicators/Supertrend/SupertrendIndicator.js",[t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"],t["Core/Chart/StockChart.js"]],function(o,t,e){var r,n=this&&this.__extends||(r=function(o,t){return(r=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(o,t){o.__proto__=t}||function(o,t){for(var e in t)t.hasOwnProperty(e)&&(o[e]=t[e])})(o,t)},function(o,t){function e(){this.constructor=o}r(o,t),o.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}),i=o.seriesTypes,l=i.atr,s=i.sma,p=t.addEvent,a=t.correctFloat,c=t.isArray,d=t.extend,u=t.merge,h=t.objectEach;function y(o,t,e){return{index:t,close:o.yData[t][e],x:o.xData[t]}}var f=function(o){function t(){var t=null!==o&&o.apply(this,arguments)||this;return t.data=void 0,t.linkedParent=void 0,t.options=void 0,t.points=void 0,t}return n(t,o),t.prototype.init=function(){s.prototype.init.apply(this,arguments);var o,t=this,r=p(e,"afterLinkSeries",function(){if(t.options){var e=t.options;o=t.linkedParent.options,e.cropThreshold=o.cropThreshold-(e.params.period-1)}r()},{order:1})},t.prototype.drawGraph=function(){for(var o,t,e,r,n,i,l,p,a,c=this,d=c.options,f=c.linkedParent,g=f?f.points:[],x=c.points,C=c.graph,m=x.length,v=g.length-m,T=v>0?v:0,S={options:{gapSize:d.gapSize}},_={top:[],bottom:[],intersect:[]},D={top:{styles:{lineWidth:d.lineWidth,lineColor:d.fallingTrendColor||d.color,dashStyle:d.dashStyle}},bottom:{styles:{lineWidth:d.lineWidth,lineColor:d.risingTrendColor||d.color,dashStyle:d.dashStyle}},intersect:d.changeTrendLine};m--;)o=x[m],t=x[m-1],e=g[m-1+T],r=g[m-2+T],n=g[m+T],i=g[m+T+1],l=o.options.color,p={x:o.x,plotX:o.plotX,plotY:o.plotY,isNull:!1},!r&&e&&f.yData[e.index-1]&&(r=y(f,e.index-1,3)),!i&&n&&f.yData[n.index+1]&&(i=y(f,n.index+1,3)),!e&&r&&f.yData[r.index+1]?e=y(f,r.index+1,3):!e&&n&&f.yData[n.index-1]&&(e=y(f,n.index-1,3)),o&&e&&n&&r&&o.x!==e.x&&(o.x===n.x?(r=e,e=n):o.x===r.x?(e=r,r={close:f.yData[e.index-1][3],x:f.xData[e.index-1]}):i&&o.x===i.x&&(e=i,r=n)),t&&r&&e?(a={x:t.x,plotX:t.plotX,plotY:t.plotY,isNull:!1},o.y>=e.close&&t.y>=r.close?(o.color=l||d.fallingTrendColor||d.color,_.top.push(p)):o.y<e.close&&t.y<r.close?(o.color=l||d.risingTrendColor||d.color,_.bottom.push(p)):(_.intersect.push(p),_.intersect.push(a),_.intersect.push(u(a,{isNull:!0})),o.y>=e.close&&t.y<r.close?(o.color=l||d.fallingTrendColor||d.color,t.color=l||d.risingTrendColor||d.color,_.top.push(p),_.top.push(u(a,{isNull:!0}))):o.y<e.close&&t.y>=r.close&&(o.color=l||d.risingTrendColor||d.color,t.color=l||d.fallingTrendColor||d.color,_.bottom.push(p),_.bottom.push(u(a,{isNull:!0}))))):e&&(o.y>=e.close?(o.color=l||d.fallingTrendColor||d.color,_.top.push(p)):(o.color=l||d.risingTrendColor||d.color,_.bottom.push(p)));h(_,function(o,t){c.points=o,c.options=u(D[t].styles,S),c.graph=c["graph"+t+"Line"],s.prototype.drawGraph.call(c),c["graph"+t+"Line"]=c.graph}),c.points=x,c.options=d,c.graph=C},t.prototype.getValues=function(o,t){var e,r,n,i,s,p,d,u,h,y=t.period,f=t.multiplier,g=o.xData,x=o.yData,C=[],m=[],v=[],T=[],S=0===y?0:y-1,_=[],D=[];if(!(g.length<=y)&&c(x[0])&&4===x[0].length&&!(y<0)){for(h=0,C=l.prototype.getValues.call(this,o,{period:y}).yData;h<C.length;h++)u=x[S+h],d=x[S+h-1]||[],i=_[h-1],s=D[h-1],p=T[h-1],0===h&&(i=s=p=0),e=a((u[1]+u[2])/2+f*C[h]),r=a((u[1]+u[2])/2-f*C[h]),e<i||d[3]>i?_[h]=e:_[h]=i,r>s||d[3]<s?D[h]=r:D[h]=s,p===i&&u[3]<_[h]||p===s&&u[3]<D[h]?n=_[h]:(p===i&&u[3]>_[h]||p===s&&u[3]>D[h])&&(n=D[h]),m.push([g[S+h],n]),v.push(g[S+h]),T.push(n);return{values:m,xData:v,yData:T}}},t.defaultOptions=u(s.defaultOptions,{params:{index:void 0,multiplier:3,period:10},risingTrendColor:"#06b535",fallingTrendColor:"#f21313",changeTrendLine:{styles:{lineWidth:1,lineColor:"#333333",dashStyle:"LongDash"}}}),t}(s);return d(f.prototype,{nameBase:"Supertrend",nameComponents:["multiplier","period"]}),o.registerSeriesType("supertrend",f),f}),e(t,"masters/indicators/supertrend.src.js",[],function(){})},o.exports?(i.default=i,o.exports=i):void 0===(n=(function(o){return i(o),i.Highcharts=o,i}).apply(t,[e(78840),e(50496)]))||(o.exports=n)}}]);