(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3336],{19277:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/portfolio-view/OverviewSection",function(){return r(1930)}])},17719:function(){},94342:function(e,t,r){"use strict";r.d(t,{OK:function(){return O},td:function(){return g},x4:function(){return j},mQ:function(){return N}});var n=r(67294);function l(e){return t=>!!t.type&&t.type.tabsRole===e}let a=l("Tab"),o=l("TabList"),u=l("TabPanel");function c(e,t){return n.Children.map(e,e=>{var r;return null===e?null:a(e)||o(e)||u(e)?t(e):e.props&&e.props.children&&"object"==typeof e.props.children?(0,n.cloneElement)(e,{...e.props,children:c(e.props.children,t)}):e})}function i(e){var t,r,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e){if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(r=i(e[t]))&&(n&&(n+=" "),n+=r);else for(t in e)e[t]&&(n&&(n+=" "),n+=t)}return n}var s=function(){for(var e,t,r=0,n="";r<arguments.length;)(e=arguments[r++])&&(t=i(e))&&(n&&(n+=" "),n+=t);return n};function d(e){let t=0;return!function e(t,r){return n.Children.forEach(t,t=>{null!==t&&(a(t)||u(t)?r(t):t.props&&t.props.children&&"object"==typeof t.props.children&&(o(t)&&r(t),e(t.props.children,r)))})}(e,e=>{a(e)&&t++}),t}function f(e){return e&&"getAttribute"in e}function p(e){return f(e)&&e.getAttribute("data-rttab")}function b(e){return f(e)&&"true"===e.getAttribute("aria-disabled")}let m,y={className:"react-tabs",focus:!1},h=e=>{let t=(0,n.useRef)([]),r=(0,n.useRef)([]),l=(0,n.useRef)();function i(t,r){if(t<0||t>=w())return;let{onSelect:n,selectedIndex:l}=e;n(t,l,r)}function f(e){let t=w();for(let r=e+1;r<t;r++)if(!b(E(r)))return r;for(let n=0;n<e;n++)if(!b(E(n)))return n;return e}function h(e){let t=e;for(;t--;)if(!b(E(t)))return t;for(t=w();t-- >e;)if(!b(E(t)))return t;return e}function w(){let{children:t}=e;return d(t)}function E(e){return t.current[`tabs-${e}`]}function v(e){let t=e.target;do if(C(t)){if(b(t))return;let r=[].slice.call(t.parentNode.children).filter(p).indexOf(t);i(r,e);return}while(null!=(t=t.parentNode))}function C(e){if(!p(e))return!1;let t=e.parentElement;do{if(t===l.current)return!0;if(t.getAttribute("data-rttabs"))break;t=t.parentElement}while(t);return!1}let{children:N,className:T,disabledTabClassName:_,domRef:g,focus:k,forceRenderTabPanel:R,onSelect:A,selectedIndex:O,selectedTabClassName:$,selectedTabPanelClassName:x,environment:I,disableUpDownKeys:j,disableLeftRightKeys:S,...P}={...y,...e};return n.createElement("div",Object.assign({},P,{className:s(T),onClick:v,onKeyDown:function(t){let{direction:r,disableUpDownKeys:n,disableLeftRightKeys:l}=e;if(C(t.target)){let{selectedIndex:a}=e,o=!1,u=!1;("Space"===t.code||32===t.keyCode||"Enter"===t.code||13===t.keyCode)&&(o=!0,u=!1,v(t)),(l||37!==t.keyCode&&"ArrowLeft"!==t.code)&&(n||38!==t.keyCode&&"ArrowUp"!==t.code)?(l||39!==t.keyCode&&"ArrowRight"!==t.code)&&(n||40!==t.keyCode&&"ArrowDown"!==t.code)?35===t.keyCode||"End"===t.code?(a=function(){let e=w();for(;e--;)if(!b(E(e)))return e;return null}(),o=!0,u=!0):(36===t.keyCode||"Home"===t.code)&&(a=function(){let e=w();for(let t=0;t<e;t++)if(!b(E(t)))return t;return null}(),o=!0,u=!0):(a="rtl"===r?h(a):f(a),o=!0,u=!0):(a="rtl"===r?f(a):h(a),o=!0,u=!0),o&&t.preventDefault(),u&&i(a,t)}},ref(e){l.current=e,g&&g(e)},"data-rttabs":!0}),function(){let l=0,{children:i,disabledTabClassName:s,focus:d,forceRenderTabPanel:f,selectedIndex:p,selectedTabClassName:b,selectedTabPanelClassName:y,environment:h}=e;r.current=r.current||[];let v=r.current.length-w(),C=(0,n.useId)();for(;v++<0;)r.current.push(`${C}${r.current.length}`);return c(i,e=>{let i=e;if(o(e)){let w=0,v=!1;null==m&&function(e){let t=e||("undefined"!=typeof window?window:void 0);try{m=!!(void 0!==t&&t.document&&t.document.activeElement)}catch(r){m=!1}}(h);let C=h||("undefined"!=typeof window?window:void 0);m&&C&&(v=n.Children.toArray(e.props.children).filter(a).some((e,t)=>C.document.activeElement===E(t))),i=(0,n.cloneElement)(e,{children:c(e.props.children,e=>{let l=`tabs-${w}`,a=p===w,o={tabRef(e){t.current[l]=e},id:r.current[w],selected:a,focus:a&&(d||v)};return b&&(o.selectedClassName=b),s&&(o.disabledClassName=s),w++,(0,n.cloneElement)(e,o)})})}else if(u(e)){let N={id:r.current[l],selected:p===l};f&&(N.forceRender=f),y&&(N.selectedClassName=y),l++,i=(0,n.cloneElement)(e,N)}return i})}())};h.propTypes={};let w={defaultFocus:!1,focusTabOnClick:!0,forceRenderTabPanel:!1,selectedIndex:null,defaultIndex:null,environment:null,disableUpDownKeys:!1,disableLeftRightKeys:!1},E=e=>null===e.selectedIndex?1:0,v=(e,t)=>{},C=e=>{let{children:t,defaultFocus:r,defaultIndex:l,focusTabOnClick:a,onSelect:o,...u}={...w,...e},[c,i]=(0,n.useState)(r),[s]=(0,n.useState)(E(u)),[f,p]=(0,n.useState)(1===s?l||0:null);if((0,n.useEffect)(()=>{i(!1)},[]),1===s){let b=d(t);(0,n.useEffect)(()=>{null!=f&&p(Math.min(f,Math.max(0,b-1)))},[b])}v(u,s);let m=(e,t,r)=>{("function"!=typeof o||!1!==o(e,t,r))&&(a&&i(!0),1===s&&p(e))},y={...e,...u};return y.focus=c,y.onSelect=m,null!=f&&(y.selectedIndex=f),delete y.defaultFocus,delete y.defaultIndex,delete y.focusTabOnClick,n.createElement(h,y,t)};C.propTypes={},C.tabsRole="Tabs";var N=C;let T={className:"react-tabs__tab-list"},_=e=>{let{children:t,className:r,...l}={...T,...e};return n.createElement("ul",Object.assign({},l,{className:s(r),role:"tablist"}),t)};_.tabsRole="TabList",_.propTypes={};var g=_;let k="react-tabs__tab",R={className:k,disabledClassName:`${k}--disabled`,focus:!1,id:null,selected:!1,selectedClassName:`${k}--selected`},A=e=>{let t=(0,n.useRef)(),{children:r,className:l,disabled:a,disabledClassName:o,focus:u,id:c,selected:i,selectedClassName:d,tabIndex:f,tabRef:p,...b}={...R,...e};return(0,n.useEffect)(()=>{i&&u&&t.current.focus()},[i,u]),n.createElement("li",Object.assign({},b,{className:s(l,{[d]:i,[o]:a}),ref(e){t.current=e,p&&p(e)},role:"tab",id:`tab${c}`,"aria-selected":i?"true":"false","aria-disabled":a?"true":"false","aria-controls":`panel${c}`,tabIndex:f||(i?"0":null),"data-rttab":!0}),r)};A.propTypes={},A.tabsRole="Tab";var O=A;let $="react-tabs__tab-panel",x={className:$,forceRender:!1,selectedClassName:`${$}--selected`},I=e=>{let{children:t,className:r,forceRender:l,id:a,selected:o,selectedClassName:u,...c}={...x,...e};return n.createElement("div",Object.assign({},c,{className:s(r,{[u]:o}),role:"tabpanel",id:`panel${a}`,"aria-labelledby":`tab${a}`}),l||o?t:null)};I.tabsRole="TabPanel",I.propTypes={};var j=I},29815:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});var n=r(20943),l=r(13375),a=r(91566);function o(e){return function(e){if(Array.isArray(e))return(0,n.Z)(e)}(e)||(0,l.Z)(e)||(0,a.Z)(e)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}},function(e){e.O(0,[5445,1228,8907,3777,1057,9401,696,4544,7151,3658,1930,9774,2888,179],function(){return e(e.s=19277)}),_N_E=e.O()}]);