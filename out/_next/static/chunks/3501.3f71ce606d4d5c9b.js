(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3501],{73501:function(o,t,n){var e,i,p; /**
 * @license Highstock JS v10.3.3 (2023-01-20)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */ p=function(o){"use strict";var t=o?o._modules:{};function n(o,t,n,e){o.hasOwnProperty(t)||(o[t]=e.apply(null,n),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:t,module:o[t]}})))}n(t,"Stock/Indicators/IKH/IKHIndicator.js",[t["Extensions/DataGrouping/ApproximationRegistry.js"],t["Core/Color/Color.js"],t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(o,t,n,e){var i,p=this&&this.__extends||(i=function(o,t){return(i=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(o,t){o.__proto__=t}||function(o,t){for(var n in t)t.hasOwnProperty(n)&&(o[n]=t[n])})(o,t)},function(o,t){function n(){this.constructor=o}i(o,t),o.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),s=t.parse,r=n.seriesTypes.sma,a=e.defined,l=e.extend,h=e.isArray,u=e.isNumber,c=e.merge,f=e.objectEach;function k(o){var t,n;return{high:o.reduce(function(o,t){return Math.max(o,t[1])},-1/0),low:o.reduce(function(o,t){return Math.min(o,t[2])},1/0)}}function g(o,t,n,e){if(o&&t&&n&&e){var i=t.plotX-o.plotX,p=t.plotY-o.plotY,s=e.plotX-n.plotX,r=e.plotY-n.plotY,a=o.plotX-n.plotX,l=o.plotY-n.plotY,h=(-p*a+i*l)/(-s*p+i*r),u=(s*l-r*a)/(-s*p+i*r);if(h>=0&&h<=1&&u>=0&&u<=1)return{plotX:o.plotX+u*i,plotY:o.plotY+u*p}}}function y(o){var t=o.indicator;t.points=o.points,t.nextPoints=o.nextPoints,t.color=o.color,t.options=c(o.options.senkouSpan.styles,o.gap),t.graph=o.graph,t.fillGraph=!0,n.seriesTypes.sma.prototype.drawGraph.call(t)}var d=function(o){function t(){var t=null!==o&&o.apply(this,arguments)||this;return t.data=[],t.options={},t.points=[],t.graphCollection=[],t}return p(t,o),t.prototype.init=function(){o.prototype.init.apply(this,arguments),this.options=c({tenkanLine:{styles:{lineColor:this.color}},kijunLine:{styles:{lineColor:this.color}},chikouLine:{styles:{lineColor:this.color}},senkouSpanA:{styles:{lineColor:this.color,fill:s(this.color).setOpacity(.5).get()}},senkouSpanB:{styles:{lineColor:this.color,fill:s(this.color).setOpacity(.5).get()}},senkouSpan:{styles:{fill:s(this.color).setOpacity(.2).get()}}},this.options)},t.prototype.toYData=function(o){return[o.tenkanSen,o.kijunSen,o.chikouSpan,o.senkouSpanA,o.senkouSpanB]},t.prototype.translate=function(){n.seriesTypes.sma.prototype.translate.apply(this);for(var o=0,t=this.points;o<t.length;o++)for(var e=t[o],i=0,p=this.pointArrayMap;i<p.length;i++){var s=p[i],r=e[s];u(r)&&(e["plot"+s]=this.yAxis.toPixels(r,!0),e.plotY=e["plot"+s],e.tooltipPos=[e.plotX,e["plot"+s]],e.isNull=!1)}},t.prototype.drawGraph=function(){var o,t,e,i,p,s,r,l,h,u,k,d,S,v=this,C=v.points,m=v.options,A=v.graph,x=v.color,Y={options:{gapSize:m.gapSize}},P=v.pointArrayMap.length,B=[[],[],[],[],[],[]],N={tenkanLine:B[0],kijunLine:B[1],chikouLine:B[2],senkouSpanA:B[3],senkouSpanB:B[4],senkouSpan:B[5]},b=[],j=v.options.senkouSpan,w=j.color||j.styles.fill,E=j.negativeColor,_=[[],[]],G=[[],[]],O=C.length,X=0;for(v.ikhMap=N;O--;){for(e=0,t=C[O];e<P;e++)a(t[o=v.pointArrayMap[e]])&&B[e].push({plotX:t.plotX,plotY:t["plot"+o],isNull:!1});if(E&&O!==C.length-1){var T=N.senkouSpanB.length-1,L=g(N.senkouSpanA[T-1],N.senkouSpanA[T],N.senkouSpanB[T-1],N.senkouSpanB[T]);if(L){var M={plotX:L.plotX,plotY:L.plotY,isNull:!1,intersectPoint:!0};N.senkouSpanA.splice(T,0,M),N.senkouSpanB.splice(T,0,M),b.push(T)}}}if(f(N,function(o,t){m[t]&&"senkouSpan"!==t&&(v.points=B[X],v.options=c(m[t].styles,Y),v.graph=v["graph"+t],v.fillGraph=!1,v.color=x,n.seriesTypes.sma.prototype.drawGraph.call(v),v["graph"+t]=v.graph),X++}),v.graphCollection)for(var D=0,K=v.graphCollection;D<K.length;D++){var I=K[D];v[I].destroy(),delete v[I]}if(v.graphCollection=[],E&&N.senkouSpanA[0]&&N.senkouSpanB[0]){for(b.unshift(0),b.push(N.senkouSpanA.length-1),d=0;d<b.length-1;d++)if(i=b[d],p=b[d+1],s=N.senkouSpanB.slice(i,p+1),r=N.senkouSpanA.slice(i,p+1),Math.floor(s.length/2)>=1){var H=Math.floor(s.length/2);if(s[H].plotY===r[H].plotY){for(S=0,l=0,h=0;S<s.length;S++)l+=s[S].plotY,h+=r[S].plotY;_[k=l>h?0:1]=_[k].concat(s),G[k]=G[k].concat(r)}else _[k=s[H].plotY>r[H].plotY?0:1]=_[k].concat(s),G[k]=G[k].concat(r)}else _[k=s[0].plotY>r[0].plotY?0:1]=_[k].concat(s),G[k]=G[k].concat(r);["graphsenkouSpanColor","graphsenkouSpanNegativeColor"].forEach(function(o,t){_[t].length&&G[t].length&&(u=0===t?w:E,y({indicator:v,points:_[t],nextPoints:G[t],color:u,options:m,gap:Y,graph:v[o]}),v[o]=v.graph,v.graphCollection.push(o))})}else y({indicator:v,points:N.senkouSpanB,nextPoints:N.senkouSpanA,color:w,options:m,gap:Y,graph:v.graphsenkouSpan}),v.graphsenkouSpan=v.graph;delete v.nextPoints,delete v.fillGraph,v.points=C,v.options=m,v.graph=A,v.color=x},t.prototype.getGraphPath=function(o){var t,e=[],i=[];if(o=o||this.points,this.fillGraph&&this.nextPoints){if((t=n.seriesTypes.sma.prototype.getGraphPath.call(this,this.nextPoints))&&t.length){t[0][0]="L",e=n.seriesTypes.sma.prototype.getGraphPath.call(this,o),i=t.slice(0,e.length);for(var p=i.length-1;p>=0;p--)e.push(i[p])}}else e=n.seriesTypes.sma.prototype.getGraphPath.apply(this,arguments);return e},t.prototype.getValues=function(o,t){var n,e,i,p,s,r,a,l,u,c,f,g,y,d,S,v,C,m,A,x=t.period,Y=t.periodTenkan,P=t.periodSenkouSpanB,B=o.xData,N=o.yData,b=o.xAxis,j=N&&N.length||0,w=(b.series.forEach(function(o){if(o.xData)for(s=o.xData,r=i=o.xIncrement?1:s.length-1;r>0;r--)p=s[r]-s[r-1],(void 0===e||p<e)&&(e=p)}),e),E=[],_=[];if(!(B.length<=x)&&h(N[0])&&4===N[0].length){var G=B[0]-x*w;for(d=0;d<x;d++)_.push(G+d*w);for(d=0;d<j;d++)d>=Y&&(S=((f=k(N.slice(d-Y,d))).high+f.low)/2),d>=x&&(m=(S+(v=((g=k(N.slice(d-x,d))).high+g.low)/2))/2),d>=P&&(A=((y=k(N.slice(d-P,d))).high+y.low)/2),C=N[d][3],a=B[d],void 0===E[d]&&(E[d]=[]),void 0===E[d+x-1]&&(E[d+x-1]=[]),E[d+x-1][0]=S,E[d+x-1][1]=v,E[d+x-1][2]=void 0,void 0===E[d+1]&&(E[d+1]=[]),E[d+1][2]=C,d<=x&&(E[d+x-1][3]=void 0,E[d+x-1][4]=void 0),void 0===E[d+2*x-2]&&(E[d+2*x-2]=[]),E[d+2*x-2][3]=m,E[d+2*x-2][4]=A,_.push(a);for(d=1;d<=x;d++)_.push(a+d*w);return{values:E,xData:_,yData:E}}},t.defaultOptions=c(r.defaultOptions,{params:{index:void 0,period:26,periodTenkan:9,periodSenkouSpanB:52},marker:{enabled:!1},tooltip:{pointFormat:'<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>TENKAN SEN: {point.tenkanSen:.3f}<br/>KIJUN SEN: {point.kijunSen:.3f}<br/>CHIKOU SPAN: {point.chikouSpan:.3f}<br/>SENKOU SPAN A: {point.senkouSpanA:.3f}<br/>SENKOU SPAN B: {point.senkouSpanB:.3f}<br/>'},tenkanLine:{styles:{lineWidth:1,lineColor:void 0}},kijunLine:{styles:{lineWidth:1,lineColor:void 0}},chikouLine:{styles:{lineWidth:1,lineColor:void 0}},senkouSpanA:{styles:{lineWidth:1,lineColor:void 0}},senkouSpanB:{styles:{lineWidth:1,lineColor:void 0}},senkouSpan:{styles:{fill:"rgba(255, 0, 0, 0.5)"}},dataGrouping:{approximation:"ichimoku-averages"}}),t}(r);return l(d.prototype,{pointArrayMap:["tenkanSen","kijunSen","chikouSpan","senkouSpanA","senkouSpanB"],pointValKey:"tenkanSen",nameComponents:["periodSenkouSpanB","period","periodTenkan"]}),o["ichimoku-averages"]=function(){var t,n=[];return[].forEach.call(arguments,function(e,i){n.push(o.average(e)),t=!t&&void 0===n[i]}),t?void 0:n},n.registerSeriesType("ikh",d),d}),n(t,"masters/indicators/ichimoku-kinko-hyo.src.js",[],function(){})},o.exports?(p.default=p,o.exports=p):void 0===(i=(function(o){return p(o),p.Highcharts=o,p}).apply(t,[n(78840),n(50496)]))||(o.exports=i)}}]);