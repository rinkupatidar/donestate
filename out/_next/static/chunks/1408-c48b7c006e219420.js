(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1408],{36670:function(e,t,a){"use strict";var n=a(85893),i=a(65820),s=a(31780),l=a(67294),r=a(73076),o=a.n(r),c=function(e){var t,a=e.dataArr,r=e.initialIdx,c=e.onClick,d=e.layoutId,u=void 0===d?"layout_bg":d,p=e.value,m=e.controlKey,y=e.itemClassName,h=e.key,f=(0,l.useState)(),g=f[0],x=f[1];(0,l.useEffect)(function(){void 0!==p&&x(a.findIndex(function(e){return p===(m?e[m]:v(e))}))},[p]);var v=function(e){var t;if("string"==typeof e)t=e;else if("object"==typeof e){if(e.displayValue)t=e.displayValue;else throw Error("Data passed does not have a display Value")}return t},_=function(e){x(e),c&&c(a[e])};return t=void 0!==g?g:void 0!==r?r:0,(0,n.jsx)("div",{className:o().container,children:(0,n.jsx)(i.M,{children:a.map(function(e,a){return(0,n.jsxs)(s.E.div,{exit:{opacity:0},onClick:function(){return _(a)},className:"".concat(o().item," ").concat(y," ").concat(t===a?o().is_active:""),children:[(0,n.jsx)("p",{children:v(e)}),t===a&&(0,n.jsx)(s.E.div,{layoutId:u,className:o().floating_bg})]},(null!=h?h:"")+a)})})})};t.Z=c},31408:function(e,t,a){"use strict";a.d(t,{Z:function(){return eD}});var n,i,s,l,r,o,c,d,u,p,m=a(26042),y=a(69396),h=a(828),f=a(85893),g=a(67294),x=a(61161),v=a(57402),_=a(27484),w=a.n(_),b=a(65820),j=a(31780),C=a(5152),D=a.n(C);a(18698);var V=a(87620),k=a(59457),Z=a(47568),S=a(29815),N=a(70655),A=a(75708),T=a.n(A),E=a(36521),R=a.n(E),M=a(18393),I=a.n(M),O=a(95384),L=a.n(O),F=a(1438),Y=a(91229),z=a(73798);function q(){return(q=(0,Z.Z)(function(e){var t,a,n,i,s,l,r,o,c,d,u,p,m,y,h,f,g;return(0,N.__generator)(this,function(o){switch(o.label){case 0:if(t=e.cache,a=e.defaultFirstSymbol,n=e.controls,i=e.startDate,s=e.endDate,l=n.find(function(e){var t=e.type;return"flag"===e.controlType&&t===F.iY}),r="".concat(i,"_").concat(s,"_").concat(F.iY),!(l&&!t.get(r)))return[3,2];return[4,F.Wf.get("getAllHistoricalStockDividendData",{params:{symbol:a,from:i,to:s}})];case 1:c=(0,o.sent().data).map(function(e){return{x:e[0],title:"D",text:"Dividends ".concat(e[1])}}),t.set(r,c),o.label=2;case 2:if(d=n.find(function(e){var t=e.type;return"flag"===e.controlType&&t===F.Qm}),u="".concat(i,"_").concat(s,"_").concat(F.Qm),!(d&&!t.get(u)))return[3,4];return[4,F.Wf.get("getAllHistoricalStockEarningData",{params:{symbol:a,from:i,to:s}})];case 3:m=(0,o.sent().data).map(function(e){return{x:e[0],title:"E",text:"Earnings ".concat(e[1])}}),t.set(u,m),o.label=4;case 4:if(y=n.find(function(e){var t=e.type;return"flag"===e.controlType&&t===F.hP}),h="".concat(i,"_").concat(s,"_").concat(F.hP),!(y&&!t.get(h)))return[3,6];return[4,F.Wf.get("getAllHistoricalStockSplitData",{params:{symbol:a,from:i,to:s}})];case 5:g=(0,o.sent().data).map(function(e){return{x:e[0],title:"S",text:"Splits".concat(e[1])}}),t.set(h,g),o.label=6;case 6:return[2]}})})).apply(this,arguments)}var U=a(14800),H=a.n(U),P=a(41107),X=a(18419),B=a(73935),W=a(63750),G=a(48228),Q=a(85998),K=a(77854),J=a(87536),$=a(89583),ee=a(53159),et=function(e,t,a){var n="https://www.facebook.com/sharer/sharer.php/?u=".concat(encodeURIComponent(ei(e,t,a)));window.open?(console.log(n),window.open(n,"_blank")):console.error("Error: Unable to open window for Facebook share.")},ea=function(e,t,a){axios.get("http://share.donestat.co/",{params:{title:t,description:a,image:e}}).then(function(n){var i="https://twitter.com/intent/tweet?url=".concat("https://donestat.netlify.app/test","&via=").concat(encodeURI(t),"&text=").concat(encodeURI(a),"&source=").concat(encodeURI(e),"'");window.open(i,"_blank")}).catch(function(e){console.error("Error",e)})},en=function(e,t,a){var n="https://donestat.co/&title=".concat(t,"&summary=").concat(a,"&source=").concat(e);window.open("https://www.linkedin.com/shareArticle/?url=".concat(n))},ei=function(e,t,a){return"https://share.donestat.co/?title=".concat(t,"&description=").concat(a,"&image=").concat(e)},es=function(e){var t=e.close,a=e.chartsRef,n=(0,J.cI)(),i=n.register,s=(n.handleSubmit,n.watch),l=n.formState.errors,r=(0,g.useState)(""),o=r[0],c=r[1],d=(0,G.D)(ee.q9),u=function(){var e,t,n,i=null===(e=a.current)||void 0===e?void 0:e.chart.getSVG();new Blob([i],{type:"image/svg+xml"});var s=document.createElement("canvas"),l=s.getContext("2d"),r=null===(t=a.current)||void 0===t?void 0:t.chart.chartHeight,o=null===(n=a.current)||void 0===n?void 0:n.chart.chartWidth;s.width=o,s.height=r;var u=new Blob([i],{type:"image/svg+xml"}),p=URL.createObjectURL(u),m=new Image;m.src=p,m.onload=function(){null==l||l.drawImage(m,0,0),s.toBlob(function(e){if(!e)return null;var t=new FormData;t.append("file",e,"chart.png"),d.mutate(t,{onSuccess:function(e){c(e.response_message)}})},"image/png")}};(0,g.useEffect)(function(){u()},[a.current]);var p=s("title"),h=s("description");return(0,f.jsxs)(K.Z,{isSmall:!0,close:t,children:[(0,f.jsx)("p",{className:"is-size-5 has-text-weight-bold has-text-grey",children:"Share Chart"}),(0,f.jsx)("br",{}),(0,f.jsx)("img",{src:o,alt:"donestat"}),(0,f.jsx)("br",{}),(0,f.jsx)("br",{}),(0,f.jsx)(Q.Z,(0,y.Z)((0,m.Z)({},i("title",{required:"Title is required"})),{cSize:"small",label:"Title",error:l.title})),(0,f.jsx)("label",{className:"label is-size-7 has-text-grey",children:"Description"}),(0,f.jsx)("textarea",(0,m.Z)({rows:4,className:"textarea"},i("description"))),l.description&&(0,f.jsx)("p",{className:"is-size-7 has-text-danger",children:l.description.message}),(0,f.jsxs)("div",{className:"is-flex is-justify-content-flex-end mt-3 is-gap",children:[(0,f.jsxs)(P.Z,{onClick:function(){return en(o,p,h)},className:"is-warning is-small has-text-weight-semibold",children:[(0,f.jsx)(X.Z,{children:(0,f.jsx)($.ltd,{})}),(0,f.jsx)("span",{children:"LinkedIn"})]}),(0,f.jsxs)(P.Z,{onClick:function(){return et(o,p,h)},className:"is-warning is-small has-text-weight-semibold",children:[(0,f.jsx)(X.Z,{children:(0,f.jsx)($.Am9,{})}),(0,f.jsx)("span",{children:"Facebook"})]}),(0,f.jsxs)(P.Z,{onClick:function(){return ea(o,p,h)},className:"is-warning is-small has-text-weight-semibold",children:[(0,f.jsx)(X.Z,{children:(0,f.jsx)($.fWC,{})}),(0,f.jsx)("span",{children:"Twitter"})]})]})]})},el=function(e){var t=e.chartsRef,a=(0,g.useState)(!1),n=a[0],i=a[1];return(0,f.jsxs)("div",{children:[(0,f.jsx)(b.M,{children:n&&(0,f.jsx)(es,{chartsRef:t,close:function(){return i(!1)}})}),(0,B.createPortal)((0,f.jsxs)(P.Z,{onClick:function(){return i(!0)},size:"small",className:"is-warning is-outlined is-flex-grow-1",children:[(0,f.jsx)(X.Z,{children:(0,f.jsx)(W.Mp,{})}),(0,f.jsx)("span",{children:"Share"})]}),document.getElementById(F.Nr))]})},er={scrollbar:Y.Cs,lang:{thousandsSep:","},navigator:{maskFill:(0,Y.wc)(Y.ZA,.2),outlineColor:Y.p$,xAxis:{gridLineColor:Y.sv}},chart:{backgroundColor:"transparent",height:F.kc?3*window.innerHeight/4:1e3},plotOptions:{flags:{color:Y.sv,fillColor:Y.$R,shape:"squarepin",lineColor:Y.aO,width:16,states:{hover:{fillColor:Y.aO,color:Y.sv}}}},yAxis:[(0,m.Z)({height:"50%"},Y.iV),(0,m.Z)({top:"55%",height:"20%"},Y.iV),(0,m.Z)({top:"80%",height:"20%"},Y.iV),],rangeSelector:{enabled:!1}};"object"==typeof L()&&I()(L()),F.kc&&R()(L());var eo=new Map,ec=function(e){var t=e.range,a=e.displayType,n=e.controls,i=e.frequency,s=e.chartRef,l=e.handleNavigatorRangeChange,r=e.controlsLoaded;e.optionsChangeCallback;var o,c=(0,g.useRef)(null),d=(0,g.useState)((0,y.Z)((0,m.Z)({},er),{xAxis:(0,m.Z)({},Y.nd)})),u=d[0],p=d[1],x=(0,g.useState)(!1),v=x[0],_=x[1],w=(o=(0,Z.Z)(function(){var e,s,l,r,o,c,d,u,p;return(0,N.__generator)(this,function(r){switch(r.label){case 0:return e=[],s=[],l=n[0].displayValue,_(!0),n.forEach(function(t){var a=t.displayValue,n=t.controlType,s=t.metaData,r=void 0===s?{}:s,o=r[F.aX]||a;eo.get(o)||("symbol"===n?e.push(F.Wf.get("getAllHistoricalStockData",{params:{symbol:a,interval:i}}).then(function(e){return[e,a]})):"social_sentiment"===n&&e.push(F.Wf.get("getHistoricalSocialSentimentInfoForChart",{params:{symbol:l,days:28}}).then(function(e){return[e,r[F.aX]]})))}),[4,Promise.all(e)];case 1:return r.sent().forEach(function(e){var t=(0,h.Z)(e,2),a=t[0],n=t[1];return eo.set(n,a.data)}),c=(o=eo.get(l))[0][0],[4,function(e){return q.apply(this,arguments)}({cache:eo,controls:n,defaultFirstSymbol:l,startDate:c,endDate:d=o[o.length-1][0]})];case 2:if(r.sent(),n.forEach(function(e,n){var i=e.displayValue,r=e.type,o=e.controlType,u=e.metaData,p=void 0===u?{}:u,y=p[F.aX]||i;switch(o){case"symbol":if(eo.has(i)){var h=eo.get(i),f=void 0,g=h[h.length-1][1]>h[h.length-t-1<0?0:h.length-t-1][1]?Y.xO:Y.JF,x=0===n?g:(0,Y.Sz)(n,"dark");"area"===a&&(f={linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,(0,Y.wc)(x,.3)],[1,(0,Y.wc)(x,0)],]}),s.push({id:i,title:"".concat(i," Stock Price"),data:h,name:i,type:a,threshold:null,tooltip:{valueDecimals:2},color:x,yAxis:0,fillColor:f})}break;case"technical_indicator":s.push({type:r,linkedTo:l,color:(0,Y.Sz)(n,"dark"),lineWidth:1,yAxis:0,tooltip:Y.de});break;case"flag":var v=function(e){var t=e.type,a=e.cache,n=e.startDate,i=e.endDate,s=e.defaultFirstSymbol;switch(t){case F.iY:return{type:"flags",data:a.get("".concat(n,"_").concat(i,"_").concat(F.iY)),onSeries:s};case F.Qm:return{type:"flags",data:a.get("".concat(n,"_").concat(i,"_").concat(F.Qm)),onSeries:s};case F.hP:return{type:"flags",data:a.get("".concat(n,"_").concat(i,"_").concat(F.hP)),onSeries:s}}}({type:r,cache:eo,startDate:c,endDate:d,defaultFirstSymbol:l});s.push(v);break;case"oscillator":s.push((0,m.Z)({type:r,linkedTo:l,color:(0,Y.Sz)(n,"dark"),yAxis:2,tooltip:Y.de},p));break;case"social_sentiment":var _=eo.get(y).map(function(e){return[e[0],e[p.idx]]});s.push({type:"column",id:"social_sentiment",name:i,data:_,yAxis:2,tooltip:Y.de,color:(0,Y.Sz)(n,"normal")})}}),!eo.has("volume"))return[3,3];return u=eo.get("volume"),[3,5];case 3:return[4,F.Wf.get("getAllVolumeData",{params:{interval:i,symbol:l}})];case 4:u={type:"column",id:"volume",name:"Volume",data:r.sent().data,yAxis:1,tooltip:Y.de,color:(0,Y.Sz)(3,"dark")},eo.set("volume",u),r.label=5;case 5:return _(!1),[2,[u].concat((0,S.Z)(s))]}})}),function(){return o.apply(this,arguments)});return(0,g.useEffect)(function(){eo.clear()},[i]),(0,V.ZP)(function(){(0,Z.Z)(function(){var e,t,a;return(0,N.__generator)(this,function(i){switch(i.label){case 0:return e=n.filter(function(e){return"symbol"===e.controlType}).length>1,t={},t=e?{tooltip:{pointFormat:"{series.name}: <b>{point.y}</b> ({point.change}%)",valueDecimals:2,split:!0},plotOptions:(0,y.Z)((0,m.Z)({},u.plotOptions),{series:{compare:"percent",showInNavigator:!0}})}:{tooltip:{pointFormat:"{series.name}: <b>{point.y}</b>",valueDecimals:2,split:!0},plotOptions:(0,y.Z)((0,m.Z)({},u.plotOptions),{series:void 0})},[4,w()];case 1:return a=i.sent(),p((0,m.Z)((0,y.Z)((0,m.Z)({},er),{chart:(0,y.Z)((0,m.Z)({},er.chart),{events:{redraw:function(){}}}),scrollbar:Y.Cs,xAxis:(0,y.Z)((0,m.Z)({},Y.nd),{events:{afterSetExtremes:l}}),series:a}),t)),[2]}})})()},[t,a,n,i]),(0,V.ZP)(function(){var e;null===(e=s.current)||void 0===e||e.chart.redraw()},[u]),(0,f.jsxs)("div",{ref:c,className:H().chart_wrapper,children:[r&&(0,f.jsx)(el,{chartsRef:s}),(0,f.jsxs)("div",{className:H().chart_container,children:[(0,f.jsx)(b.M,{children:v&&(0,f.jsx)(z.Z,{lOpacity:!0,initial:"animate"})}),(0,f.jsx)("div",{children:(0,f.jsx)(T(),{constructorType:"stockChart",highcharts:L(),options:u,ref:s})})]})]})},ed=a(14924),eu=a(9198),ep=a.n(eu),em=a(47516),ey=a(27791),eh=a(17507),ef=a(36670),eg=[{displayValue:"Chart Overlays"},{displayValue:"Acceleration Bands",type:"abands"},{displayValue:"Bollinger Bands",type:"bb"},{displayValue:"DEMA (Double Exponential Moving Average)",type:"dema"},{displayValue:"EMA (Exponential Moving Average)",type:"ema"},{displayValue:"Linear Regression",type:"linearRegression"},],ex=[{displayValue:"Lower Charts"},{displayValue:"Absolute price indicator",type:"apo"},{displayValue:"A/D (Accumulation/Distribution)",type:"ad",metaData:{params:{period:0,volumeSeriesID:"volume"}}},{displayValue:"Aroon",type:"aroon"},{displayValue:"Aroon oscillator",type:"aroonoscillator"},{displayValue:"ATR (Average True Range)",type:"atr"},{displayValue:"Awesome oscillator",type:"ao"},{displayValue:"CCI (Commodity Channel Index)",type:"cci"},{displayValue:"Chaikin",type:"chaikin"},{displayValue:"CMF (Chaikin Money Flow)",type:"cmf"},{displayValue:"Disparity Index",type:"disparityindex"},{displayValue:"CMO (Chande Momentum Oscillator)",type:"cmo"},{displayValue:"DMI (Directional Movement Index)",type:"dmi"},{displayValue:"Detrended price",type:"dpo"},{displayValue:"Linear Regression Angle",type:"linearRegressionAngle"},{displayValue:"Linear Regression Intercept",type:"linearRegressionIntercept"},{displayValue:"Linear Regression Slope",type:"linearRegressionSlope"},{displayValue:"Klinger Oscillator",type:"klinger"},{displayValue:">MACD (Moving Average Convergence Divergence)",type:"macd"},{displayValue:"MFI (Money Flow Index)",type:"mfi"},{displayValue:"Momentum",type:"momentum"},{displayValue:"NATR (Normalized Average True Range)",type:"natr"},{displayValue:"OBV (On-Balance Volume)",type:"obv"},{displayValue:"Percentage Price oscillator",type:"ppo"},{displayValue:"RoC (Rate of Change)",type:"roc"},{displayValue:"RSI (Relative Strength Index)",type:"rsi"},{displayValue:"Slow Stochastic",type:"slowstochastic"},{displayValue:"Stochastic",type:"stochastic"},{displayValue:"TRIX",type:"trix"},{displayValue:"Williams %R",type:"williamsr"},],ev=[{displayValue:"1D",range:1},{displayValue:"5D",range:5},{displayValue:"10D",range:10},{displayValue:"1M",range:30},{displayValue:"3M",range:90},{displayValue:"6M",range:180},{displayValue:"1Y",range:365},{displayValue:"2Y",range:730},{displayValue:"5Y",range:1825},{displayValue:"10Y",range:3650},{displayValue:"20Y",range:7300},],e_=[{displayValue:"One Minute",type:"ONE_MINUTE"},{displayValue:"One Day",type:"ONE_DAY"},],ew=[{displayValue:"Area",type:"area"},{displayValue:"Line",type:"line"},{displayValue:"Candle Stick",type:"candlestick"},{displayValue:"OHLC",type:"ohlc"},],eb=[{displayValue:"Social Sentiments"},{displayValue:"Stock twit posts",type:"stock_twit_posts",metaData:(n={},(0,ed.Z)(n,F.aX,"social_sentiments"),(0,ed.Z)(n,"idx",1),n)},{displayValue:"Stock twit likes",type:"stock_twit_likes",metaData:(i={},(0,ed.Z)(i,F.aX,"social_sentiments"),(0,ed.Z)(i,"idx",2),i)},{displayValue:"Stock twit comments",type:"stock_twit_comments",metaData:(s={},(0,ed.Z)(s,F.aX,"social_sentiments"),(0,ed.Z)(s,"idx",3),s)},{displayValue:"Stock twit impressions",type:"stock_twit_impressions",metaData:(l={},(0,ed.Z)(l,F.aX,"social_sentiments"),(0,ed.Z)(l,"idx",4),l)},{displayValue:"Stock twit sentiments",type:"stock_twit_sentiments",metaData:(r={},(0,ed.Z)(r,F.aX,"social_sentiments"),(0,ed.Z)(r,"idx",5),r)},{displayValue:"Twitter posts",type:"twitter_posts",metaData:(o={},(0,ed.Z)(o,F.aX,"social_sentiments"),(0,ed.Z)(o,"idx",6),o)},{displayValue:"Twitter likes",type:"twitter_likes",metaData:(c={},(0,ed.Z)(c,F.aX,"social_sentiments"),(0,ed.Z)(c,"idx",7),c)},{displayValue:"Twitter comments",type:"twitter_comments",metaData:(d={},(0,ed.Z)(d,F.aX,"social_sentiments"),(0,ed.Z)(d,"idx",8),d)},{displayValue:"Twitter impressions",type:"twitter_impressions",metaData:(u={},(0,ed.Z)(u,F.aX,"social_sentiments"),(0,ed.Z)(u,"idx",9),u)},{displayValue:"Twitter sentiments",type:"twitter_sentiments",metaData:(p={},(0,ed.Z)(p,F.aX,"social_sentiments"),(0,ed.Z)(p,"idx",10),p)},],ej=function(e){var t=e.onLoad,a=e.onTechnicalIndicatorClick,n=e.onRangeClick,i=e.onFrequencyClick,s=e.onDisplayClick,l=e.onNewSymbolClick,r=e.restoreDefaults,o=e.onOscillatorsClick,c=e.onFlagClick,d=e.isAnyOverlaySelected,u=e.isAnyLowerChartSelected,p=e.display,x=e.frequency,v=e.range,_=e.onSocialSentimentsClick,b=e.fromDate,j=e.toDate,C=e.setFromDate,D=e.setToDate,V=(0,g.useState)(""),k=V[0],Z=V[1],S=(0,h.Z)((0,ey.Z)("searchCompany",{search:k},{shouldFetch:!!k,shouldShowLoadingOnRefetch:!0,initialData:[],initialLoadingState:!1}),2),N=S[0];S[1];var A=function(e){e.preventDefault(),l(e.target[0].value),Z("")};return(0,f.jsxs)("div",{className:"v_data_section",children:[(0,f.jsxs)("div",{className:"is-flex is-justify-content-space-between is-gap",children:[(0,f.jsxs)("div",{className:"is-flex is-gap",children:[(0,f.jsxs)("div",{children:[(0,f.jsx)("p",{className:"is-size-7 has-text-grey mb-2",children:"Chart Range"}),(0,f.jsxs)("div",{className:"v-center",children:[(0,f.jsx)(ep(),(0,y.Z)((0,m.Z)({},F.kG),{wrapperClassName:H().datepicker_wrapper,maxDate:j,customInput:(0,f.jsx)(P.Z,{className:"is-warning",size:"small",children:w()(b).format("D MMM, YYYY")}),selected:b,onChange:C})),(0,f.jsx)(X.Z,{className:"mx-1 has-text-grey",children:(0,f.jsx)(W.UE1,{})}),(0,f.jsx)(ep(),(0,y.Z)((0,m.Z)({},F.kG),{wrapperClassName:H().datepicker_wrapper,minDate:b,customInput:(0,f.jsx)(P.Z,{className:"is-warning",size:"small",children:w()(j).format("D MMM, YYYY")}),selected:j,onChange:D}))]})]}),(0,f.jsxs)("div",{children:[(0,f.jsx)("p",{className:"is-size-7 has-text-grey mb-5"}),(0,f.jsx)(ef.Z,{value:v,onClick:n,dataArr:ev,controlKey:"range"})]})]}),(0,f.jsxs)("div",{className:"is-flex is-gap",children:[(0,f.jsxs)("div",{children:[(0,f.jsx)("p",{className:"is-size-7 has-text-grey mb-2",children:"FREQUENCY"}),(0,f.jsx)(eh.Z,{onClick:i,value:x,dataArr:e_,controlKey:"type"})]}),(0,f.jsxs)("div",{children:[(0,f.jsx)("p",{className:"is-size-7 has-text-grey mb-2",children:"DISPLAY"}),(0,f.jsx)(eh.Z,{value:p.displayValue,disabled:u||d,onClick:s,dataArr:ew})]})]})]}),(0,f.jsxs)("div",{children:[(0,f.jsx)("p",{className:"is-size-7 has-text-grey mb-2",children:"DISPLAY"}),(0,f.jsxs)("div",{className:"is-flex is-gap",children:[(0,f.jsx)(eh.Z,{onClick:a,disableSelection:!0,className:"is-flex-1 is-warning",dataArr:eg}),(0,f.jsx)(eh.Z,{className:"is-flex-1 is-warning",disableSelection:!0,dataArr:ex,onClick:o}),(0,f.jsx)(eh.Z,{className:"is-flex-1 is-warning",disableSelection:!0,dataArr:[F.iY,F.Qm,F.hP,],onClick:c}),(0,f.jsx)(eh.Z,{className:"is-flex-1 is-warning",disableSelection:!0,dataArr:eb,onClick:_})]})]}),(0,f.jsxs)("div",{className:"is-flex is-justify-content-space-between",children:[(0,f.jsxs)("div",{children:[(0,f.jsx)("p",{className:"is-size-7 has-text-grey mb-2",children:"COMPARE"}),(0,f.jsx)("div",{className:"is-relative",children:(0,f.jsxs)("form",{onSubmit:A,children:[!!k&&!!N.length&&(0,f.jsx)("div",{className:H().dropdown,children:N.map(function(e){return(0,f.jsxs)("div",{onClick:function(){l(e.equity_symbol),Z("")},className:H().item,children:[e.equity_name," (",e.equity_symbol,")"]},e.equity_name)})}),(0,f.jsx)(Q.Z,{value:k,onChange:function(e){return Z(e.target.value)},cSize:"small",placeholder:"compare symbol"})]})})]}),(0,f.jsxs)("div",{children:[(0,f.jsx)("div",{className:"mb-4"}),(0,f.jsxs)("div",{className:"is-flex is-gap",id:F.Nr,ref:function(){return t()},children:[(0,f.jsxs)(P.Z,{size:"small",className:"is-warning is-outlined",children:[(0,f.jsx)(X.Z,{children:(0,f.jsx)(em.yf7,{size:16})}),(0,f.jsx)("span",{children:"Download"})]}),(0,f.jsx)(P.Z,{onClick:r,size:"small",className:"is-warning is-outlined",children:"restore defaults"})]})]})]})]})},eC=D()(function(){return a.e(8096).then(a.bind(a,88096))},{loadableGenerated:{webpack:function(){return[88096]}},ssr:!1,loading:v.Z}),eD=function(e){var t=e.symbol,a=e.config,n=e.disableSavedCharts,i=(0,g.useRef)(null),s=(0,g.useState)(!1),l=s[0],r=s[1],o=(0,g.useState)(!1),c=o[0],d=o[1],u=(0,h.Z)((0,k.x)([{displayValue:t,type:"",controlType:"symbol"},]),2),p=u[0],v=u[1],_=(0,g.useState)({displayValue:"Area",type:"area"}),C=_[0],D=_[1],Z=(0,g.useState)("ONE_MINUTE"),S=Z[0],N=Z[1],A=(0,g.useState)(1),T=A[0];A[1];var E=(0,g.useState)(new Date),R=E[0],M=E[1],I=(0,g.useState)(new Date),O=I[0],L=I[1];(0,V.F_)(function(){a&&(F(),Q(a.chart_config))},[a]);var F=function(){return d(!c)},Y=function(e){var t;e.getTime()<O.getTime()&&(null===(t=i.current)||void 0===t||t.chart.xAxis[0].setExtremes(new Date(e).getTime(),O.getTime())),Math.abs(e.getTime()-O.getTime())>864e5&&N("ONE_DAY"),M(e)},z=function(e){var t;null===(t=i.current)||void 0===t||t.chart.xAxis[0].setExtremes(R.getTime(),new Date(e).getTime()),L(e)},q=function(e){e>=10?N("ONE_DAY"):N("ONE_MINUTE");var t=w()(O).subtract(e,"day").toDate();Y(t)},U=function(e){D({displayValue:"OHLC",type:"ohlc"}),p.find()||v(function(t){return t.push((0,y.Z)((0,m.Z)({},e),{controlType:"technical_indicator"})),t})},P=function(e){D({displayValue:"OHLC",type:"ohlc"}),p.find(function(t){var a=t.controlType,n=t.type;return"oscillator"===a&&n&&n===e.type})||v(function(t){return t.push({displayValue:e.displayValue,type:e.type,controlType:"oscillator",metaData:e.metaData}),t})},X=function(e){p.find(function(t){var a=t.controlType,n=t.type;return"flag"===a&&n&&n===e})||v(function(t){return t.push({displayValue:e,controlType:"flag",type:e}),t})},B=function(e){p.find(function(t){var a=t.controlType,n=t.type;return"social_sentiment"===a&&n&&n===e.type})||q(30),v(function(t){return(t=t.filter(function(e){return"social_sentiment"!==e.controlType})).push({displayValue:e.displayValue,controlType:"social_sentiment",type:e.type,metaData:e.metaData}),t})},W=function(){if(a){Q(a.chart_config);return}v([{displayValue:t,type:"",controlType:"symbol"},]),D({displayValue:"Line",type:"line"}),q(1)},G=function(e){var t=e.type;"ONE_MINUTE"===t&&T>=10?q(1):"ONE_DAY"===t&&T<10&&q(10),N(t)},Q=function(e){v(e.controls),D(e.display),N(e.frequency),e.toDate&&L(new Date(e.toDate)),e.fromDate&&M(new Date(e.fromDate)),F()},K=(0,g.useCallback)(function(e){(e.min||e.max)&&(M(new Date(e.min)),L(new Date(e.max)))},[]),J=(0,g.useMemo)(function(){return!!p.find(function(e){return"technical_indicator"===e.controlType})},[p.length]),$=(0,g.useMemo)(function(){return!!p.find(function(e){return"oscillator"===e.controlType})},[p.length]);return(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)("div",{className:H().container,children:[(0,f.jsxs)("div",{className:H().top,children:[(0,f.jsx)("div",{className:H().left,"data-disable-saved-charts":n,children:(0,f.jsx)(ej,{onLoad:function(){return r(!0)},toDate:O,fromDate:R,setToDate:z,setFromDate:Y,range:T,frequency:S,display:C,isAnyOverlaySelected:J,isAnyLowerChartSelected:$,onFlagClick:X,restoreDefaults:W,onDisplayClick:D,onRangeClick:function(e){return q(e.range)},onTechnicalIndicatorClick:U,onOscillatorsClick:P,onFrequencyClick:G,onNewSymbolClick:function(e){return v(function(t){return t.push({controlType:"symbol",displayValue:e,type:""}),t})},onSocialSentimentsClick:B})}),(0,f.jsx)("div",{className:"".concat(H().right," "),"data-disable-saved-charts":n,children:l&&(0,f.jsx)(eC,{loadChartConfig:Q,symbol:t,parentConfig:a,config:{controls:p,range:T,display:C,frequency:S,toDate:O,fromDate:R}})})]}),(0,f.jsx)("div",{className:"tags mb-0",children:(0,f.jsx)(b.M,{children:p.map(function(e,t){return(0,f.jsxs)(j.E.span,{exit:{opacity:0},layout:!0,layoutId:e.displayValue,className:"tag is-warning",children:[e.displayValue,t>0&&(0,f.jsx)("button",{className:"delete is-small",onClick:function(){return v(function(e){return e.splice(t,1),e})}})]},e.displayValue)})})}),(0,f.jsx)(b.M,{mode:"wait",children:(0,g.createElement)(j.E.div,(0,y.Z)((0,m.Z)({},x.Z),{key:"".concat(c)}),(0,f.jsx)(ec,{controlsLoaded:l,handleNavigatorRangeChange:K,optionsChangeCallback:function(){if(R&&O){var e;null===(e=i.current)||void 0===e||e.chart.xAxis[0].setExtremes(R.getTime(),O.getTime())}},chartRef:i,controls:p,range:T,displayType:C.type,frequency:S}))})]})})}},73076:function(e){e.exports={container:"HoriSelectList_container__LrUAz",item:"HoriSelectList_item__G36i2",is_active:"HoriSelectList_is_active__pJZS0",floating_bg:"HoriSelectList_floating_bg__GCOAR"}},14800:function(e){e.exports={container:"Chart_container__xtp__",top:"Chart_top__2tGma",left:"Chart_left__BUUsm",right:"Chart_right__S_9Ts",dropdown:"Chart_dropdown__BsfHy",item:"Chart_item__eKZqZ"}}}]);