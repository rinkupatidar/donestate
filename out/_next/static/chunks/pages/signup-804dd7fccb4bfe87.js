(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7616],{28575:function(e,i,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/signup",function(){return s(10490)}])},61161:function(e,i,s){"use strict";s.d(i,{Z:function(){return t}});var n=s(96577),t={initial:"initial",animate:"animate",exit:"exit",variants:{initial:{opacity:0},animate:{opacity:1,transition:{duration:.3}},exit:{opacity:0}}};n.G0},10490:function(e,i,s){"use strict";s.r(i),s.d(i,{default:function(){return y}});var n=s(51351),t=s(85893),a=s(26042),r=s(69396),c=s(65820),l=s(31780),o=s(41664),u=s.n(o),d=s(67294),m=s(87536),h=s(47516),f=s(89583),x=s(61161),p=s(1438),j=s(41107),g=s(18419),_=s(85998),N=s(7722),v=s.n(N),w=function(e){var e=null!==e?e:(0,n.Z)(TypeError("Cannot destructure undefined")),i=(0,d.useState)(!1),s=i[0],o=i[1],N=(0,d.useState)(!1),w=N[0],y=N[1],b=(0,d.useState)(""),E=b[0],Z=b[1],S=(0,d.useState)(""),k=S[0],C=S[1],T=(0,d.useState)(!1),U=T[0],z=T[1],q=(0,m.cI)(),F=q.register,G=q.handleSubmit,I=q.formState,L=I.errors,O=I.isSubmitting,W=function(e){C(e.email),p.Wf.post("sendEmailVerificationLink",{},{params:{email:e.email,isNewUser:!0}}).then(function(e){o(!0),Z(e.data.response_message),setTimeout(function(){y(!0)},3e4)}).catch(function(e){o(!0),Z(e.response.data.response_message),z(!0)})},M=function(){p.Wf.post("sendEmailVerificationLink",{},{params:{email:k,isNewUser:!0}}).then(function(){o(!0),y(!1),setTimeout(function(){y(!0)},3e4)})};return(0,t.jsx)("div",{className:v().container,children:(0,t.jsxs)("div",{className:"column is-12 is-flex is-flex-direction-column is-justify-content-center is-align-items-center fill-height ",children:[(0,t.jsxs)("div",{className:"is-flex is-align-items-center mb-4 has-text-grey",children:[(0,t.jsx)("div",{className:"image mr-4",children:(0,t.jsx)(u(),{href:"/",children:(0,t.jsx)("img",{src:"/icons/done.png",alt:"donestat"})})}),!E&&(0,t.jsx)("div",{className:"is-size-4",children:"Sign Up today!"})]}),(0,t.jsx)(c.M,{mode:"wait",children:(0,t.jsx)(l.E.div,(0,r.Z)((0,a.Z)({},x.Z),{className:v().info_wrapper,children:s?(0,t.jsxs)("div",{className:"is-flex is-align-items-center is-flex-direction-column",children:[(0,t.jsx)("figure",{className:"image mb-4  has-text-".concat(U?"danger":"info"),children:U?(0,t.jsx)(f.G5m,{size:100}):(0,t.jsx)(f.FJM,{size:100})}),(0,t.jsx)("p",{className:"has-text-grey",children:E}),w&&(0,t.jsxs)("p",{className:"has-text-grey mt-3",children:["Didn't receive the email?"," ",(0,t.jsx)("span",{className:"has-text-success is-clickable",onClick:M,children:"Click here to resend"})]})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("p",{className:"has-text-grey",children:["Enter your email to get started"," "]}),(0,t.jsx)("br",{}),(0,t.jsxs)("form",{onSubmit:G(W),children:[(0,t.jsx)(_.Z,(0,r.Z)((0,a.Z)({},F("email",{required:"Email is required",pattern:{value:p.bF,message:"Invalid email address"}})),{label:"Email",error:L.email})),(0,t.jsxs)(j.Z,{loading:O,type:"submit",className:"is-info has-tw-bold is-fullwidth mt-5",children:[(0,t.jsx)("span",{children:"Sign up"}),(0,t.jsx)(g.Z,{children:(0,t.jsx)(h.lU2,{})})]})]}),(0,t.jsxs)("p",{className:"mt-3 is-size-7",children:["Already have an account?"," ",(0,t.jsx)(u(),{href:p.Z6.LOGIN,className:"has-text-success",children:"Click here to sign in"})]})]})}),"".concat(s))})]})})},y=function(e){var e=null!==e?e:(0,n.Z)(TypeError("Cannot destructure undefined"));return(0,t.jsx)(w,{})}},7722:function(e){e.exports={container:"auth_container__iBsWU is-centered mb-0",info_wrapper:"auth_info_wrapper__x2Cy9",danger:"auth_danger__q2fEw"}}},function(e){e.O(0,[5445,7536,9774,2888,179],function(){return e(e.s=28575)}),_N_E=e.O()}]);