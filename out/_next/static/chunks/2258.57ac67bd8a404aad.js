(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2258],{22258:function(t,n,e){var r,i,o; /**
 * @license Highstock JS v10.3.3 (2023-01-20)
 *
 * Parabolic SAR Indicator for Highcharts Stock
 *
 * (c) 2010-2021 Grzegorz Blachliński
 *
 * License: www.highcharts.com/license
 */ o=function(t){"use strict";var n=t?t._modules:{};function e(t,n,e,r){t.hasOwnProperty(n)||(t[n]=r.apply(null,e),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:n,module:t[n]}})))}e(n,"Stock/Indicators/PSAR/PSARIndicator.js",[n["Core/Series/SeriesRegistry.js"],n["Core/Utilities.js"]],function(t,n){var e,r=this&&this.__extends||(e=function(t,n){return(e=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)},function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),i=t.seriesTypes.sma,o=n.merge,a=n.extend;function s(t,n){return parseFloat(t.toFixed(n))}function u(t,n,e,r){return 1===t&&n>r||-1===t&&e>r?1:-1}function c(t,n,e,r,i,o,a,u){return t===n?1===t&&e>r||-1===t&&e<r?i===a?a:s(i+o,2):i:u}function l(t,n,e,r){return 1===e?t>r?t:r:n<r?n:r}function p(t,n,e,r,i,o,a,s,u){return t===n?1===t?e+r<Math.min(i,o)?e+r:Math.min(i,o):e+r>Math.max(s,a)?e+r:Math.max(s,a):u}var h=function(t){function n(){var n=null!==t&&t.apply(this,arguments)||this;return n.data=void 0,n.points=void 0,n.options=void 0,n}return r(n,t),n.prototype.getValues=function(t,n){var e,r,i,o,a,h,d,f,m,v,y,x,_,A,g,w,F,C,M,O,j=t.xData,k=t.yData,P=k[0][1],S=n.initialAccelerationFactor,b=n.maxAccelerationFactor,E=n.increment,D=n.initialAccelerationFactor,R=k[0][2],H=n.decimals,I=n.index,N=[],T=[],W=[],L=1;if(!(I>=k.length)){for(O=0;O<I;O++)P=Math.max(k[O][1],P),R=Math.min(k[O][2],s(R,H));for(m=k[O][1]>R?1:-1,e=P,v=e-(r=R),i=S=n.initialAccelerationFactor,y=i*(o=v),N.push([j[I],R]),T.push(j[I]),W.push(s(R,H)),O=I+1;O<k.length;O++)_=k[O-1][2],A=k[O-2][2],g=k[O-1][1],w=k[O-2][1],C=k[O][1],M=k[O][2],null!==A&&null!==w&&null!==_&&null!==g&&null!==C&&null!==M&&(R=p(m,L,R,y,A,_,g,w,P),F=l(C,M,m,P),x=u(L,M,C,R),S=c(x,m,F,P,S,E,b,D),a=F,v=a-(h=R),d=S,y=d*(f=v),N.push([j[O],s(R,H)]),T.push(j[O]),W.push(s(R,H)),L=m,m=x,P=F);return{values:N,xData:T,yData:W}}},n.defaultOptions=o(i.defaultOptions,{lineWidth:0,marker:{enabled:!0},states:{hover:{lineWidthPlus:0}},params:{period:void 0,initialAccelerationFactor:.02,maxAccelerationFactor:.2,increment:.02,index:2,decimals:4}}),n}(i);return a(h.prototype,{nameComponents:void 0}),t.registerSeriesType("psar",h),h}),e(n,"masters/indicators/psar.src.js",[],function(){})},t.exports?(o.default=o,t.exports=o):void 0===(i=(function(t){return o(t),o.Highcharts=t,o}).apply(n,[e(78840),e(50496)]))||(t.exports=i)}}]);