(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7639],{77639:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return K}});var s=n(47568),i=n(51351),r=n(29815),a=n(70655),o=n(85893),l=n(27484),c=n.n(l),d=n(41664),u=n.n(d),h=n(89583),p=n(28734),m=n(29387),f=n(53854),x=n(70178),v=n(31780),g=n(65820),j=n(11163),_=n(85998),N=n(67294),y=n(1438),w=n(8193),b=n(34629),E=n(74551),S=n(63872);function C(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(void 0!==e){var n=t.decimal,s=void 0===n?1:n,i=t.comma,r=t.keepDecimal,a=Math.pow(10,s),o=(Math.round((e=+e)*a)/a).toFixed(s);return(!1===(void 0!==r&&r)&&(o=o.replace(/\.0+$/,"")),void 0!==i&&i)?(0,S.Z)(o):o}}var T=n(41107),k=n(18419),P=n(77854),z=n(21812),D=n(96577),I=n(70231),Z=n(96314),F=n(26673),A=n.n(F),W=n(51649),L=n(1930),q=n(55078),R=n(47516),O=n(17666),B=n(74399);c().extend(x),c().extend(m),c().extend(p);var K=function(e){var t,e=null!==e?e:(0,i.Z)(TypeError("Cannot destructure undefined"));(0,N.useRef)(null);var n=(0,j.useRouter)(),l=n.query.symbol,c=n.isReady,d=(0,N.useState)(!1),p=(d[0],d[1]),m=(0,N.useState)([]),x=m[0],S=m[1],F=(0,r.Z)(x).reverse(),K=(0,N.useState)(!1),M=K[0],U=K[1],X=(0,N.useState)(!1),H=X[0],Y=X[1],G=(0,N.useState)(null),V=G[0],$=G[1],J=(0,N.useState)([]),Q=J[0],ee=J[1],et=(0,N.useState)([]);et[0],et[1];var en=(0,N.useState)([]),es=en[0],ei=en[1],er=(0,N.useState)(!0),ea=er[0],eo=er[1],el=(0,N.useState)([]),ec=el[0],ed=el[1],eu=(0,N.useState)([]),eh=eu[0],ep=eu[1],em=function(e){if(ee(e),e.length>0){var t=e[e.length-1],n=[];e.map(function(e){var s,i=Number(Number(null==e?void 0:e.marketValue)/Number(null==t?void 0:t.sumOfMarketValue)*100);n.push({name:null==e?void 0:null===(s=e.companyProfile)||void 0===s?void 0:s.sector,y:ef(i)})}),ed(n),ep(e)}},ef=function(e){if("number"!=typeof e)throw Error("Input must be a number");return Number(e.toFixed(2))},ex=Q[(null==Q?void 0:Q.length)-1],ev=null==ex?void 0:ex.cashAmount,eg=Q[(null==Q?void 0:Q.length)-1],ej=null==eg?void 0:eg.Sum_of_Weighted_M_Cap,e_=Q.map(function(e){return e.quantity}),eN=Q.map(function(e){var t;return null==e?void 0:null===(t=e.stockquoteData)||void 0===t?void 0:t.current_price}),ey=Q.map(function(e){return e.oneDayGain2}),ew=Q.map(function(e,t){return eN[t]*(ey[t]/100)/(1+ey[t]/100)*e_[t]}).reduce(function(e,t){return e+t},0);Q.reduce(function(e,t){var n,s;return e+parseFloat(null!==(s=null==t?void 0:null===(n=t.companyProfile)||void 0===n?void 0:n.pe_current)&&void 0!==s?s:0)},0);var eb=Q.map(function(e){var t;return null==e?void 0:null===(t=e.companyProfile)||void 0===t?void 0:t.pe_current}),eE=Q.map(function(e){return e.marketValue}),eS=Q.map(function(e){return e.amount}),eC=eE.map(function(e,t){return e-eS[t]}).reduce(function(e,t){return e+t},0),eT=eE.reduce(function(e,t){return e+t},0),ek=Q.reduce(function(e,t,n){var s,i,r=parseFloat(null!==(s=eb[n])&&void 0!==s?s:0);return e+r*eE[n]/eT},0),eP=eT/(eT+ev)*100,ez=ev/(eT+ev)*100,eD=ew/(eT+ev-ew)*100,eI=eC/(eS.reduce(function(e,t){return e+t},0)+ev)*100;null==Q||Q.reduce(function(e,t){return e+t.totalReturn},0),null==Q||Q.length,null==Q||Q.reduce(function(e,t){return e+t.oneDayGain2},0),null==Q||Q.length;var eZ,eF,eA,eW,eL=function(e){$(e.target.value)},eq=function(){Y(!1)},eR=function(){U(!M)},eO=function(){U(!1)},eB=function(){p(!0)},eK=(eZ=(0,s.Z)(function(e){var t,s,i,r,o;return(0,a.__generator)(this,function(t){switch(t.label){case 0:if(!(F.filter(function(t){return t.portfolio_id===e}).length>0))return[3,4];t.label=1;case 1:return t.trys.push([1,3,,4]),i={X_AUTH_TOKEN:localStorage.getItem("token"),"Content-Type":"application/json"},[4,y.Wf.get("getInvestments/".concat(e),{headers:i})];case 2:return 200===(r=t.sent()).status?0===r.data.length?n.push({pathname:"/dashboard/portfolio/listportfolio/tab=".concat(e)}):n.push("/dashboard/portfolio-view?tab=".concat(e)):console.error("Error fetching stock quote data:"),[3,4];case 3:return o=t.sent(),console.error("Error fetching stock quote data:",o),[3,4];case 4:return[2]}})}),function(e){return eZ.apply(this,arguments)}),eM=(0,N.useRef)(null),eU=(0,N.useState)(!0),eX=eU[0],eH=eU[1],eY=(0,N.useState)(!1),eG=eY[0],eV=eY[1],e$=(0,N.useState)(!1),eJ=e$[0],eQ=e$[1],e0=(0,N.useState)(!1),e1=e0[0],e4=e0[1],e3=function(){e4(!1)},e2=function(){eQ(!0)},e9=function(){eQ(!1)},e7=(eF=(0,s.Z)(function(e){var t,s,i,r,o,l,c,d;return(0,a.__generator)(this,function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),s={X_AUTH_TOKEN:localStorage.getItem("token"),"Content-Type":"application/json"},i=n.query.tab,[4,y.Wf.delete("deletePortFolio?portfolio_id=".concat(i),{headers:s})];case 1:return 200===e.sent().status&&(console.log("reversedPortFolio",F),o=F.findIndex(function(e){return e.portfolio_id===i}),console.log("deleteIndex",o),o<F.length-1?(l=F[o+1],console.log("nextItem",l.portfolio_id),n.push("/dashboard/portfolio-view?tab=".concat(l.portfolio_id)),e5(l.portfolio_id)):o>0?(c=F[o-1],console.log("previousItem",c),n.push("/dashboard/portfolio-view?tab=".concat(c.portfolio_id)),e5(c.portfolio_id)):n.push("/dashboard")),eQ(!1),tc(),[3,3];case 2:return d=e.sent(),console.error("Error deleting item:",d),[3,3];case 3:return[2]}})}),function(e){return eF.apply(this,arguments)}),e5=(eA=(0,s.Z)(function(e){var t,s,i,r;return(0,a.__generator)(this,function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),s={X_AUTH_TOKEN:localStorage.getItem("token"),"Content-Type":"application/json"},[4,y.Wf.get("/getInvestments/".concat(e),{headers:s})];case 1:return 200===(i=t.sent()).status?0===i.data.length?n.push({pathname:"/dashboard/portfolio/listportfolio/tab=".concat(e)}):n.push("/dashboard/portfolio-view?tab=".concat(e)):console.error("Error fetching stock quote data:"),[3,3];case 2:return r=t.sent(),console.error("Error fetching stock quote data:",r),[3,3];case 3:return[2]}})}),function(e){return eA.apply(this,arguments)}),e8=(eW=(0,s.Z)(function(){var e,t,s,i,r,o;return(0,a.__generator)(this,function(t){switch(t.label){case 0:e=localStorage.getItem("token"),s={portfolio_id:n.query.tab,portfolio_name:V},i={X_AUTH_TOKEN:e,"Content-Type":"application/json"},t.label=1;case 1:return t.trys.push([1,3,,4]),[4,y.Wf.post("renamePortFolio",s,{headers:i})];case 2:return t.sent().data&&(Y(!1),tc()),[3,4];case 3:return o=t.sent(),console.error("Error posting data:",o),Y(!1),[3,4];case 4:return[2]}})}),function(){return eW.apply(this,arguments)}),e6=function(e,t,n,s){if(e)var i=0,r=setInterval(function(){e&&(e.scrollLeft+=s,(i+=Math.abs(s))>=n&&clearInterval(r),0===e.scrollLeft?eH(!0):(eH(!1),eV(!1)))},t)},te=function(e,t,n,s){if(e)var i=0,r=e.scrollWidth-e.clientWidth,a=setInterval(function(){e&&(e.scrollLeft+=s,i+=Math.abs(s),e.scrollLeft===r?eV(!0):(eV(!1),eH(!1)),(i>=n||e.scrollLeft===r)&&clearInterval(a))},t)},tt=null===(t=n.query)||void 0===t?void 0:t.tab,tn=(0,N.useState)(tt),ts=tn[0],ti=tn[1];(0,N.useEffect)(function(){tt?ti(tt):n.isReady&&n.push((0,b.b)({tab:"5bcde385-891c-4d12-a1b2-4919ab847b82"}))},[tt,n.isReady]);var tr,ta,to,tl,tc=(tr=(0,s.Z)(function(){var e,t,n,s;return(0,a.__generator)(this,function(e){switch(e.label){case 0:t={X_AUTH_TOKEN:localStorage.getItem("token"),"Content-Type":"application/json"},e.label=1;case 1:return e.trys.push([1,3,,4]),[4,y.Wf.get("getPortFolioList",{headers:t})];case 2:return S(e.sent().data),[3,4];case 3:return s=e.sent(),console.error("Error fetching data:",s),[3,4];case 4:return[2]}})}),function(){return tr.apply(this,arguments)}),td=(ta=(0,s.Z)(function(){var e,t,n,s,i,r;return(0,a.__generator)(this,function(n){switch(n.label){case 0:if(0!==(e=null==Q?void 0:Q.map(function(e){return e.equity_symbol})).length)return[3,1];return[2];case 1:t=e.join(","),s={X_AUTH_TOKEN:localStorage.getItem("token"),"Content-Type":"application/json"},n.label=2;case 2:return n.trys.push([2,6,,7]),[4,y.Wf.get("getPeerList/?symbol=".concat(t),{headers:s})];case 3:if(200!==(i=n.sent()).status)return[3,5];return[4,tu(i.data)];case 4:n.sent(),n.label=5;case 5:return[3,7];case 6:return r=n.sent(),console.error("Error fetching data:",r),[3,7];case 7:return[2]}})}),function(){return ta.apply(this,arguments)}),tu=(to=(0,s.Z)(function(e){var t,n,s,i;return(0,a.__generator)(this,function(t){switch(t.label){case 0:n={X_AUTH_TOKEN:localStorage.getItem("token"),"Content-Type":"application/json"},t.label=1;case 1:return t.trys.push([1,3,,4]),[4,y.Wf.post("getPeerStockQuotes/".concat(e),e,{headers:n})];case 2:return 200===(s=t.sent()).status&&(setTimeout(function(){eo(!1)},3e3),ei(s.data)),[3,4];case 3:return i=t.sent(),console.error("Error posting data:",i),eo(!1),[3,4];case 4:return[2]}})}),function(e){return to.apply(this,arguments)});return(0,N.useEffect)(function(){(eo(!0),Q&&Q.length>0)?Q.some(function(e){return(null==e?void 0:e.equity_type)==="stock"})?td():(ei([]),eo(!1)):setTimeout(function(){ei([]),eo(!1)},3e3)},[Q]),(0,N.useEffect)(function(){tc()},[]),(0,N.useEffect)(function(){var e=function(){var e=document.getElementById("port");e&&eV(!(e.scrollWidth>e.clientWidth))},t=function(){e()};e(),window.addEventListener("resize",t),window.addEventListener("load",t),window.addEventListener("transitionend",t);var n=setTimeout(function(){t()},100);return function(){window.removeEventListener("resize",t),window.removeEventListener("load",t),window.removeEventListener("transitionend",t),clearTimeout(n)}},[]),(0,o.jsxs)("div",{className:A().wrapper,style:{display:"grid"},children:[(0,o.jsxs)("div",{className:A().buttonContianer,children:[(0,o.jsx)("div",{children:(0,o.jsx)(T.Z,{disabled:eX,onClick:function(){e6(eM.current,25,100,-10)},className:"is-small is-warning mt-1",children:(0,o.jsx)(k.Z,{className:"is-small",children:(0,o.jsx)(h.bUI,{})})})}),(0,o.jsx)("div",{id:"port",className:A().imgContainer,ref:eM,children:(0,o.jsx)("div",{className:A().bottom_info,children:(0,o.jsxs)("nav",{className:A().bottom_info_nav,children:[F&&F.map(function(e,t){return(0,o.jsxs)("div",{style:{textTransform:"capitalize"},role:"button",className:"".concat(A().nav_item," ").concat(ts===e.portfolio_id?A().active:""),onClick:function(){return eK(e.portfolio_id)},children:[ts===e.portfolio_id&&(0,o.jsx)(v.E.div,{className:A().floating_bg}),(0,o.jsx)("div",{className:A().overflow_texttab,children:(0,o.jsx)("span",{children:e.portfolio_name})})]},t)}),(0,o.jsx)(u(),{href:"/dashboard/portfolio",children:(0,o.jsxs)(T.Z,{className:"is-warning is-small has-text-weight-semibold",onClick:eB,style:{marginLeft:"10px"},children:[(0,o.jsx)(W.D0w,{}),(0,o.jsx)("span",{children:"New Portfolio"})]})})]})})}),(0,o.jsx)("div",{children:(0,o.jsx)(T.Z,{disabled:eG,onClick:function(){te(eM.current,25,100,10)},className:"is-small is-warning mt-1",children:(0,o.jsx)(k.Z,{className:"is-small",children:(0,o.jsx)(h.Dli,{})})})})]}),(0,o.jsxs)(v.E.div,{animate:{height:"443px"},className:A().top_grid,children:[(0,o.jsxs)("div",{className:A().top_info,children:[eJ&&(0,o.jsx)(P.Z,{width:"30vw",close:function(){return eQ(!1)},children:(0,o.jsxs)("div",{children:[x&&x.map(function(e){return e.portfolio_id===ts?(0,o.jsxs)("p",{className:"is-size-6 has-tw-bold",children:["Do you really want to delete this Portfolio:"," ",e.portfolio_name," ?"]},e.portfolio_id):null}),(0,o.jsxs)("div",{className:"buttons is-centered mt-5 are-small",children:[(0,o.jsx)(T.Z,{onClick:e9,children:"Cancel"}),(0,o.jsx)(T.Z,{className:"is-danger",onClick:function(){return e7(1)},children:"Delete Portfolio"})]})]})}),e1&&(0,o.jsx)(P.Z,{width:"30vw",close:function(){return e4(!1)},children:(0,o.jsxs)("div",{children:[x&&x.map(function(e){return e.portfolio_id===ts?(0,o.jsxs)("p",{className:"is-size-6 has-tw-bold",children:["Do you really want to delete this Portfolsssssio:"," ",e.portfolio_name]},e.portfolio_id):null}),(0,o.jsxs)("div",{className:"buttons is-centered mt-5 are-small",children:[(0,o.jsx)(T.Z,{onClick:e3,children:"Cancel"}),(0,o.jsx)(T.Z,{className:"is-danger",onClick:function(){return e7(1)},children:"Delete Portfolio"})]})]})}),H&&(0,o.jsxs)(P.Z,{close:eq,isSmall:!0,children:[(0,o.jsx)("p",{className:"is-size-5 mb-3",children:"Rename Portfolio"}),(0,o.jsx)("div",{className:A().inputPortfolio,children:(0,o.jsx)(_.Z,{type:"text",cSize:"small",label:"Rename Portfolio",onChange:eL,value:null!=V?V:(tl=x.find(function(e){return e.portfolio_id===ts}))?tl.portfolio_name:""})}),(0,o.jsx)("div",{className:A().displayBtn,children:(0,o.jsxs)(T.Z,{size:"small",className:"is-warning",onClick:function(){return e8()},children:[(0,o.jsx)(k.Z,{children:(0,o.jsx)(R.jC8,{})}),(0,o.jsx)("span",{children:"Rename Portfolio "})]})})]}),isNaN(eP)||0===eP?(0,o.jsxs)("div",{className:" has-text-grey is-size-7 has-text-centered mt-2",style:{paddingTop:"200px"},children:["No Data Found"," "]}):(0,o.jsx)("div",{className:" is-relative",children:(0,o.jsx)(Z.default,{activeid:ts,symbol:l,title:"".concat(l," Chart"),shouldFetch:c,newItem:eh})})]}),(0,o.jsx)("div",{className:"p-3 is-relative",children:(0,o.jsxs)("div",{className:A().recent_news,children:[(0,o.jsxs)("p",{className:"section-title is-justify-content-space-between",style:{display:"flex"},children:[(0,o.jsx)("p",{children:"Portfolio highlights"}),(0,o.jsx)(f.Dxw,{size:25,onClick:eR,style:{cursor:"pointer"}})]}),(0,o.jsx)("div",{style:{position:"absolute",right:225,top:36},children:M&&(0,o.jsx)("div",{children:(0,o.jsx)(g.M,{children:M&&(0,o.jsx)(q.Z,{onClickAway:eO,children:(0,o.jsx)("div",{children:(0,o.jsx)("div",{className:A().menu_wrapper,style:{zIndex:999999},children:(0,o.jsxs)(v.E.div,{initial:"initial",animate:"animate",exit:"exit",variants:D.vt,className:A().menu,children:[(0,o.jsxs)("div",{role:"button",className:A().menu_item_edit,onClick:function(){return Y(!0)},style:{cursor:"pointer"},children:[(0,o.jsx)("span",{style:{marginRight:"4px",marginTop:"2px"},children:(0,o.jsx)(w.$iz,{})}),"Edit Portfolio"]}),(0,o.jsxs)("div",{role:"button",className:A().menu_item_edit,style:{cursor:"pointer"},children:[(0,o.jsx)("span",{style:{marginRight:"4px",marginTop:"2px"},children:(0,o.jsx)(I.aBF,{})}),"Download"]}),(0,o.jsxs)("div",{role:"button",className:A().menu_item_edit,onClick:e2,style:{cursor:"pointer"},children:[(0,o.jsxs)("span",{style:{marginRight:"4px",marginTop:"2px"},children:[" ",(0,o.jsx)(w.VPh,{})]}),"Delete"]})]})})})})})})}),(0,o.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between"},children:[(0,o.jsx)("div",{style:{width:"250px"},children:(0,o.jsxs)("div",{className:A().table,children:[(0,o.jsxs)("div",{className:A().key_metrics_wrapper,children:[(0,o.jsxs)("div",{className:A().key_metrics_item,children:[(0,o.jsx)("div",{className:"".concat(A().head," py-2"),children:"DAY GAIN"}),(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:"".concat(A().content," py-1"),children:(0,o.jsxs)("p",{style:{fontSize:"1rem",fontWeight:"700",color:isNaN(ew)?"hsl(141, 99%, 49%)":ew<0?"#f63148":"hsl(141, 99%, 49%)"},children:[isNaN(ew)||0===ew?" ":isNaN(ew)?" ":(0,E.N)(ew)>0?(0,o.jsx)(w.y1n,{}):(0,o.jsx)(w.Duv,{}),isNaN(ew)||0===ew?"-":"".concat((0,E.N)(ew))]})}),(0,o.jsx)("div",{className:A().content,style:{marginTop:"5px"},children:(0,o.jsxs)("p",{style:{fontSize:"1rem",fontWeight:"700",color:isNaN(eD)?"hsl(141, 99%, 49%)":eD<0?"#f63148":"hsl(141, 99%, 49%)"},children:[isNaN(eD)||0===eD?" ":isNaN(eD)?" ":(0,E.N)(eD)>0?(0,o.jsx)(w.y1n,{}):(0,o.jsx)(w.Duv,{}),isNaN(eD)||0===eD?"-":"".concat((0,E.N)(eD),"%")]})})]})]}),(0,o.jsxs)("div",{className:A().key_metrics_item,children:[(0,o.jsx)("div",{className:"".concat(A().head," py-2"),children:"TOTAL GAIN"}),(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:"".concat(A().content," py-1"),children:(0,o.jsxs)("p",{style:{fontSize:"1rem",fontWeight:"700",color:isNaN(eC)?"hsl(141, 99%, 49%)":eC<0?"#f63148":"hsl(141, 99%, 49%)"},children:[isNaN(eC)||0===eC?" ":isNaN(eC)?" ":(0,E.N)(eC)>0?(0,o.jsx)(w.y1n,{}):(0,o.jsx)(w.Duv,{}),isNaN(eC)||0===eC?"-":"$".concat((0,E.N)(eC))]})}),(0,o.jsx)("div",{className:A().content,style:{marginTop:"5px"},children:(0,o.jsxs)("p",{style:{fontSize:"1rem",fontWeight:"700",color:isNaN(eI)?"hsl(141, 99%, 49%)":eI<0?"#f63148":"hsl(141, 99%, 49%)"},children:[isNaN(eI)||0===eI?" ":isNaN(eI)?" ":(0,E.N)(eI)>0?(0,o.jsx)(w.y1n,{}):(0,o.jsx)(w.Duv,{}),isNaN(eI)||0===eI?"-":"".concat((0,E.N)(eI),"%")]})})]})]})]}),(0,o.jsx)("div",{children:(0,o.jsx)("div",{className:"".concat(A().key_metrics_item," py-1"),children:(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:"".concat(A().content," pt-5"),children:isNaN(eP)||0===eP?(0,o.jsxs)(o.Fragment,{children:["- ",(0,o.jsx)("span",{style:{fontSize:"0.75rem",color:"hsl(0, 0%, 48%)",textTransform:"uppercase"},children:"STOCKS"})]}):(0,o.jsxs)(o.Fragment,{children:[C(eP),"%"," ",(0,o.jsx)("span",{style:{fontSize:"0.75rem",color:"hsl(0, 0%, 48%)",textTransform:"uppercase"},children:"STOCKS"})]})}),(0,o.jsx)("div",{className:"".concat(A().content," py-4"),children:isNaN(ez)||0===ez?null!=ev&&0!==ev?(0,o.jsxs)(o.Fragment,{children:["100%"," ",(0,o.jsx)("span",{style:{fontSize:"0.75rem",color:"hsl(0, 0%, 48%)",textTransform:"uppercase"},children:"cash"})]}):(0,o.jsxs)(o.Fragment,{children:["- ",(0,o.jsx)("span",{style:{fontSize:"0.75rem",color:"hsl(0, 0%, 48%)",textTransform:"uppercase"},children:"cash"})]}):(0,o.jsxs)(o.Fragment,{children:[C(ez),"%"," ",(0,o.jsx)("span",{style:{fontSize:"0.75rem",color:"hsl(0, 0%, 48%)",textTransform:"uppercase"},children:"cash"})]})})]})})})]})}),(0,o.jsx)("div",{children:isNaN(eP)||0===eP?null:(0,o.jsx)(O.default,{sectorDataForPieChart:ec})})]}),(0,o.jsx)("div",{style:{borderBottom:"1px solid hsl(0deg, 0%, 21%)"},children:(0,o.jsx)("div",{className:"my-3",children:(0,o.jsxs)("p",{className:A().news_title,children:["Portfolio Market Cap "," ",isNaN(ej)||0===ej?"-":"".concat((0,E.N)(ej))]})})}),(0,o.jsx)("div",{style:{borderBottom:"1px solid hsl(0deg, 0%, 21%)"},children:(0,o.jsx)("div",{className:"my-3",children:(0,o.jsxs)("p",{className:A().news_title,children:["60% Large cap, 30% Mid Cap, 10% Small cap"," "]})})}),(0,o.jsx)("div",{style:{borderBottom:"1px solid hsl(0deg, 0%, 21%)"},children:(0,o.jsx)("div",{className:"my-3",children:(0,o.jsxs)("p",{className:A().news_title,children:["Portfolio P/E"," ",isNaN(ek)||0===ek?"-":"".concat((0,E.N)(ek))]})})})]})})]}),(0,o.jsx)(v.E.div,{animate:{height:"auto"},className:A().top_grid2,children:(0,o.jsx)("div",{className:A().top_info,children:(0,o.jsx)(L.default,{onDataReceived:em})})}),(0,o.jsxs)("div",{style:{display:"flex"},children:[(0,o.jsx)("div",{className:"column is-6",style:{paddingRight:"0.25rem",paddingLeft:"0px",paddingTop:"0px",paddingBottom:"0px"},children:(0,o.jsx)("div",{children:(0,o.jsx)(v.E.div,{animate:{height:"auto"},className:A().top_grid1,children:(0,o.jsxs)("div",{className:"px-3 pt-3 pb-2 is-relative",style:{overflowY:"scroll"},children:[(0,o.jsx)("p",{className:"section-title",children:"RECENTLY SEARCHED"}),(0,o.jsx)("div",{style:{overflowY:"scroll",paddingBottom:"0.5rem"},children:ea?(0,o.jsx)(B.Z,{}):(null==es?void 0:es.length)?(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("div",{className:"is-flex mt-3 is-gap",children:es.map(function(e,t){return(0,o.jsx)("div",{className:A().port_data_section,children:(0,o.jsx)("div",{children:(0,o.jsxs)("div",{className:"table_item",children:[(0,o.jsx)("p",{style:{textAlign:"center",width:"140px "},className:"section-title",children:e.equity_symbol}),(0,o.jsx)("div",{style:{marginBottom:"4px",height:"40px",width:"140px "},title:e.equity_name,className:"".concat(A().overflow_text1," py-2 table_head is-size-7"),children:(0,o.jsx)("span",{children:e.equity_name})}),(0,o.jsxs)("p",{style:{textAlign:"center",fontSize:"1rem",fontWeight:"700",color:(null==e?void 0:e.current_price)<0?"#f63148":"hsl(141, 99%, 49%)"},children:["$",(0,E.N)(null==e?void 0:e.current_price)]}),(0,o.jsx)("div",{children:(0,o.jsxs)("p",{style:{textAlign:"center",fontSize:"1rem",fontWeight:"700",color:e.previous_close<0?"#f63148":"hsl(141, 99%, 49%)"},children:[(0,E.N)(e.previous_close)>0?(0,o.jsx)(w.y1n,{}):(0,o.jsx)(w.Duv,{}),(0,E.N)(e.previous_close),"%"]})})]})})},t)})})}):(0,o.jsxs)("div",{className:" has-text-grey is-size-7 has-text-centered mt-2",children:["No Data Found"," "]})})]})})})}),(0,o.jsx)("div",{className:"column is-6",style:{paddingLeft:"0.25rem",paddingRight:"0px",paddingTop:"0px",paddingBottom:"0px"},children:(0,o.jsx)("div",{children:(0,o.jsx)(v.E.div,{animate:{height:"auto"},className:A().top_grid1,children:(0,o.jsxs)("div",{className:"px-3 pt-3 pb-2 is-relative",style:{overflowY:"scroll"},children:[(0,o.jsx)("p",{className:"section-title",children:"Discover More"}),(0,o.jsx)("div",{style:{overflowY:"scroll",paddingBottom:"0.5rem"},children:ea?(0,o.jsx)(B.Z,{}):(null==es?void 0:es.length)?(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("div",{className:"is-flex mt-3 is-gap",children:es.map(function(e,t){return(0,o.jsx)("div",{className:A().port_data_section,children:(0,o.jsx)("div",{children:(0,o.jsxs)("div",{className:"table_item",children:[(0,o.jsx)("p",{style:{textAlign:"center",width:"140px "},className:"section-title",children:e.equity_symbol}),(0,o.jsx)("div",{style:{marginBottom:"4px",height:"40px",width:"140px "},title:e.equity_name,className:"".concat(A().overflow_text1," py-2 table_head is-size-7"),children:(0,o.jsx)("span",{children:e.equity_name})}),(0,o.jsxs)("p",{style:{textAlign:"center",fontSize:"1rem",fontWeight:"700",color:(null==e?void 0:e.current_price)<0?"#f63148":"hsl(141, 99%, 49%)"},children:["$",(0,E.N)(null==e?void 0:e.current_price)]}),(0,o.jsx)("div",{children:(0,o.jsxs)("p",{style:{textAlign:"center",fontSize:"1rem",fontWeight:"700",color:e.previous_close<0?"#f63148":"hsl(141, 99%, 49%)"},children:[(0,E.N)(e.previous_close)>0?(0,o.jsx)(w.y1n,{}):(0,o.jsx)(w.Duv,{}),(0,E.N)(e.previous_close),"%"]})})]})})},t)})})}):(0,o.jsxs)("div",{className:" has-text-grey is-size-7 has-text-centered mt-2",children:["No Data Found"," "]})})]})})})})]}),(0,o.jsx)(v.E.div,{animate:{height:"auto"},className:A().top_grid2,children:(0,o.jsx)("div",{className:A().grid,children:isNaN(eP)||0===eP?(0,o.jsx)("div",{children:(0,o.jsxs)("div",{className:A().recent_news1,children:[(0,o.jsx)("p",{className:"section-title",children:"Key Update"}),(0,o.jsx)("div",{className:A().news_item_wrapper,children:(0,o.jsxs)("div",{className:" has-text-grey is-size-7 has-text-centered mt-2 mb-2",children:["No Data Found"," "]})})]})}):(0,o.jsx)(z.default,{handleInsideData:Q,newItemdata:eh})})})]})}},21812:function(e,t,n){"use strict";n.r(t),n.d(t,{NewsItem:function(){return g}});var s,i=n(47568),r=n(26042),a=n(70655),o=n(85893),l=n(59403),c=n(74399),d=n(31780),u=n(26413),h=n.n(u),p=n(67294),m=n(1438),f=(s=(0,i.Z)(function(e,t){var n,s,i,r;return(0,a.__generator)(this,function(n){switch(n.label){case 0:if(!(t.length>0))return[3,5];s={X_AUTH_TOKEN:localStorage.getItem("token"),"Content-Type":"application/json"},n.label=1;case 1:return n.trys.push([1,3,,4]),[4,m.Wf.get("getCompanyStockNews?symbol=".concat(t,"&page_no=").concat(e),{headers:s})];case 2:return[2,n.sent().data];case 3:return r=n.sent(),console.error("Error posting data:",r),[3,4];case 4:return[3,6];case 5:case 6:return[2]}})}),function(e,t){return s.apply(this,arguments)}),x=function(e){var t=(0,l.N)(["economics-news"],function(t){var n=t.pageParam;return f(void 0===n?1:n,e)},{enabled:e&&e.length>0,getNextPageParam:function(e,t){return t.length+1}}),n=t.data,s=t.fetchNextPage,i=t.isFetching,r=function(){var e,t=[];return null==n||null===(e=n.pages)||void 0===e||e.forEach(function(e){null==e||e.forEach(function(e){t.push(e)})}),t};return{data:n,fetchNextPage:s,isFetching:i,getProcessedNews:r}},v=function(e){var t=e.handleInsideData,n=e.newItemdata,s=(0,p.useState)(n),l=s[0],u=s[1];console.log(l,"currentNewItem");var m=(0,p.useState)([]),f=m[0],v=m[1],j=x(f),_=(j.data,j.fetchNextPage),N=j.isFetching,y=j.getProcessedNews;(0,p.useEffect)(function(){u([])},[]),(0,p.useEffect)(function(){var e,n=(e=(0,i.Z)(function(){var e,n,s;return(0,a.__generator)(this,function(i){if(e=[],t)for(n=0;n<(null==t?void 0:t.length);n++)s=t[n].equity_symbol,e.push(s);return e.length>0&&v(e),[2]})}),function(){return e.apply(this,arguments)});t.length>0&&n()},[t,n]);var w=y();return(0,o.jsx)("div",{children:(0,o.jsxs)("div",{className:h().recent_news,children:[(0,o.jsx)("p",{className:"section-title",children:"Key Update"}),(0,o.jsxs)("div",{className:h().news_item_wrapper,children:[w.length>0?w.map(function(e){return(0,o.jsx)(g,(0,r.Z)({},e),e.order)}):(0,o.jsxs)("div",{className:" has-text-grey is-size-7 has-text-centered ",children:["No Data Found"," "]}),(0,o.jsx)(d.E.div,{onViewportEnter:function(){_()},children:N&&(0,o.jsx)(c.Z,{disableSection:!0,className:"mt-3"})})]})]})})};t.default=v;var g=function(e){var t=e.description,n=e.image,s=(e.source,e.title),i=e.url;return e.published_date,(0,o.jsxs)(d.E.a,{onClick:function(){return window.open(i,s,"width=600,height=600")},target:"popup",initial:"initial",whileHover:"hover",className:h().news_item,children:[(0,o.jsxs)("div",{className:h().news_header,children:[(0,o.jsx)("div",{className:h().img_wrapper,children:(0,o.jsx)(d.E.img,{variants:{hover:{scale:1.2}},src:n,alt:s})}),(0,o.jsxs)("div",{className:h().news_right,children:[(0,o.jsx)(d.E.p,{variants:{hover:{height:"auto"}},className:h().news_title,children:s}),(0,o.jsx)("p",{className:"is-size-7 has-text-grey mt-2",children:"7 hours ago on Bloomberg Markets and Finance"})]})]}),(0,o.jsx)(d.E.div,{variants:{hover:{height:"auto"}},className:h().news_description,children:(0,o.jsxs)("div",{className:"p-3",children:[(0,o.jsx)("p",{className:"has-text-grey",children:t}),(0,o.jsx)("span",{className:"has-text-grey is-size-7 is-underlined",children:"read more"})]})})]})}},17666:function(e,t,n){"use strict";n.r(t);var s=n(85893);n(67294);var i=n(78840),r=n.n(i),a=n(75708),o=n.n(a),l=n(20717),c=n.n(l),d=function(e){var t=e.sectorDataForPieChart;return(0,s.jsx)("div",{className:c().bg,style:{marginTop:"2px"},children:(0,s.jsx)(o(),{highcharts:r(),options:{chart:{type:"pie",width:200,height:200,backgroundColor:"#0A0A0A"},title:{text:"Sector Wise Allocation",style:{fontSize:"0.75rem",color:"hsl(0, 0%, 48%)"}},tooltip:{valueSuffix:"%"},plotOptions:{series:{allowPointSelect:!0,cursor:"pointer",dataLabels:[{enabled:!0,distance:20},{enabled:!0,distance:-40,format:"{point.percentage:.1f}%",style:{fontSize:"1.2em",textOutline:"none",opacity:.7},filter:{operator:">",property:"percentage",value:10}}]}},series:[{name:"",colorByPoint:!0,data:void 0===t?[]:t}]}})})};t.default=d},34629:function(e,t,n){"use strict";n.d(t,{b:function(){return s}});var s=function(e){var t=new URL(location.href);return Object.keys(e).forEach(function(n){return t.searchParams.append(n,e[n])}),t.toString()}},26413:function(e){e.exports={recent_news:"News_recent_news__fXYah",news_item_wrapper:"News_news_item_wrapper__oXjpr",news_item:"News_news_item__Ni8da",news_header:"News_news_header__PdsQX",img_wrapper:"News_img_wrapper__xatN_",news_right:"News_news_right__H6eGy",news_title:"News_news_title__KJn09",news_description:"News_news_description__9AzjA"}},20717:function(e){e.exports={bg:"pieChart_bg__oCcJl","highcharts-background":"pieChart_highcharts-background__EMA_F",pieChart_bg__oCcJl:"pieChart_pieChart_bg__oCcJl__qrm8r","highcharts-container":"pieChart_highcharts-container__IYvtS","highcharts-root":"pieChart_highcharts-root__DX6rv"}}}]);