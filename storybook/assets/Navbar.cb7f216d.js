import{j as M,r as w,a as k,F as J}from"./jsx-runtime.2d63e2ec.js";import{p as L}from"./index.9ab846ab.js";import{c as $}from"./clsx.m.c5ef2623.js";import{u as Q,L as W}from"./react-router-dom.feb326cf.js";import{c as D,r as Y}from"./iframe.bfd22f3a.js";import{G as ee}from"./iconBase.8f390e64.js";import{D as ne,a as te,o as re}from"./DropdownMenu.e1af052b.js";import{u as oe}from"./currentUserContext.6b995cee.js";var T={exports:{}};(function(l){(function(m,u,c){function f(e){var t=this,o=a();t.next=function(){var n=2091639*t.s0+t.c*23283064365386963e-26;return t.s0=t.s1,t.s1=t.s2,t.s2=n-(t.c=n|0)},t.c=1,t.s0=o(" "),t.s1=o(" "),t.s2=o(" "),t.s0-=o(e),t.s0<0&&(t.s0+=1),t.s1-=o(e),t.s1<0&&(t.s1+=1),t.s2-=o(e),t.s2<0&&(t.s2+=1),o=null}function v(e,t){return t.c=e.c,t.s0=e.s0,t.s1=e.s1,t.s2=e.s2,t}function x(e,t){var o=new f(e),n=t&&t.state,r=o.next;return r.int32=function(){return o.next()*4294967296|0},r.double=function(){return r()+(r()*2097152|0)*11102230246251565e-32},r.quick=r,n&&(typeof n=="object"&&v(n,o),r.state=function(){return v(o,{})}),r}function a(){var e=4022871197,t=function(o){o=String(o);for(var n=0;n<o.length;n++){e+=o.charCodeAt(n);var r=.02519603282416938*e;e=r>>>0,r-=e,r*=e,e=r>>>0,r-=e,e+=r*4294967296}return(e>>>0)*23283064365386963e-26};return t}u&&u.exports?u.exports=x:c&&c.amd?c(function(){return x}):this.alea=x})(D,l,!1)})(T);var I={exports:{}};(function(l){(function(m,u,c){function f(a){var e=this,t="";e.x=0,e.y=0,e.z=0,e.w=0,e.next=function(){var n=e.x^e.x<<11;return e.x=e.y,e.y=e.z,e.z=e.w,e.w^=e.w>>>19^n^n>>>8},a===(a|0)?e.x=a:t+=a;for(var o=0;o<t.length+64;o++)e.x^=t.charCodeAt(o)|0,e.next()}function v(a,e){return e.x=a.x,e.y=a.y,e.z=a.z,e.w=a.w,e}function x(a,e){var t=new f(a),o=e&&e.state,n=function(){return(t.next()>>>0)/4294967296};return n.double=function(){do var r=t.next()>>>11,i=(t.next()>>>0)/4294967296,s=(r+i)/(1<<21);while(s===0);return s},n.int32=t.next,n.quick=n,o&&(typeof o=="object"&&v(o,t),n.state=function(){return v(t,{})}),n}u&&u.exports?u.exports=x:c&&c.amd?c(function(){return x}):this.xor128=x})(D,l,!1)})(I);var R={exports:{}};(function(l){(function(m,u,c){function f(a){var e=this,t="";e.next=function(){var n=e.x^e.x>>>2;return e.x=e.y,e.y=e.z,e.z=e.w,e.w=e.v,(e.d=e.d+362437|0)+(e.v=e.v^e.v<<4^(n^n<<1))|0},e.x=0,e.y=0,e.z=0,e.w=0,e.v=0,a===(a|0)?e.x=a:t+=a;for(var o=0;o<t.length+64;o++)e.x^=t.charCodeAt(o)|0,o==t.length&&(e.d=e.x<<10^e.x>>>4),e.next()}function v(a,e){return e.x=a.x,e.y=a.y,e.z=a.z,e.w=a.w,e.v=a.v,e.d=a.d,e}function x(a,e){var t=new f(a),o=e&&e.state,n=function(){return(t.next()>>>0)/4294967296};return n.double=function(){do var r=t.next()>>>11,i=(t.next()>>>0)/4294967296,s=(r+i)/(1<<21);while(s===0);return s},n.int32=t.next,n.quick=n,o&&(typeof o=="object"&&v(o,t),n.state=function(){return v(t,{})}),n}u&&u.exports?u.exports=x:c&&c.amd?c(function(){return x}):this.xorwow=x})(D,l,!1)})(R);var B={exports:{}};(function(l){(function(m,u,c){function f(a){var e=this;e.next=function(){var o=e.x,n=e.i,r,i;return r=o[n],r^=r>>>7,i=r^r<<24,r=o[n+1&7],i^=r^r>>>10,r=o[n+3&7],i^=r^r>>>3,r=o[n+4&7],i^=r^r<<7,r=o[n+7&7],r=r^r<<13,i^=r^r<<9,o[n]=i,e.i=n+1&7,i};function t(o,n){var r,i=[];if(n===(n|0))i[0]=n;else for(n=""+n,r=0;r<n.length;++r)i[r&7]=i[r&7]<<15^n.charCodeAt(r)+i[r+1&7]<<13;for(;i.length<8;)i.push(0);for(r=0;r<8&&i[r]===0;++r);for(r==8?i[7]=-1:i[r],o.x=i,o.i=0,r=256;r>0;--r)o.next()}t(e,a)}function v(a,e){return e.x=a.x.slice(),e.i=a.i,e}function x(a,e){a==null&&(a=+new Date);var t=new f(a),o=e&&e.state,n=function(){return(t.next()>>>0)/4294967296};return n.double=function(){do var r=t.next()>>>11,i=(t.next()>>>0)/4294967296,s=(r+i)/(1<<21);while(s===0);return s},n.int32=t.next,n.quick=n,o&&(o.x&&v(o,t),n.state=function(){return v(t,{})}),n}u&&u.exports?u.exports=x:c&&c.amd?c(function(){return x}):this.xorshift7=x})(D,l,!1)})(B);var U={exports:{}};(function(l){(function(m,u,c){function f(a){var e=this;e.next=function(){var o=e.w,n=e.X,r=e.i,i,s;return e.w=o=o+1640531527|0,s=n[r+34&127],i=n[r=r+1&127],s^=s<<13,i^=i<<17,s^=s>>>15,i^=i>>>12,s=n[r]=s^i,e.i=r,s+(o^o>>>16)|0};function t(o,n){var r,i,s,h,N,A=[],j=128;for(n===(n|0)?(i=n,n=null):(n=n+"\0",i=0,j=Math.max(j,n.length)),s=0,h=-32;h<j;++h)n&&(i^=n.charCodeAt((h+32)%n.length)),h===0&&(N=i),i^=i<<10,i^=i>>>15,i^=i<<4,i^=i>>>13,h>=0&&(N=N+1640531527|0,r=A[h&127]^=i+N,s=r==0?s+1:0);for(s>=128&&(A[(n&&n.length||0)&127]=-1),s=127,h=4*128;h>0;--h)i=A[s+34&127],r=A[s=s+1&127],i^=i<<13,r^=r<<17,i^=i>>>15,r^=r>>>12,A[s]=i^r;o.w=N,o.X=A,o.i=s}t(e,a)}function v(a,e){return e.i=a.i,e.w=a.w,e.X=a.X.slice(),e}function x(a,e){a==null&&(a=+new Date);var t=new f(a),o=e&&e.state,n=function(){return(t.next()>>>0)/4294967296};return n.double=function(){do var r=t.next()>>>11,i=(t.next()>>>0)/4294967296,s=(r+i)/(1<<21);while(s===0);return s},n.int32=t.next,n.quick=n,o&&(o.X&&v(o,t),n.state=function(){return v(t,{})}),n}u&&u.exports?u.exports=x:c&&c.amd?c(function(){return x}):this.xor4096=x})(D,l,!1)})(U);var P={exports:{}};(function(l){(function(m,u,c){function f(a){var e=this,t="";e.next=function(){var n=e.b,r=e.c,i=e.d,s=e.a;return n=n<<25^n>>>7^r,r=r-i|0,i=i<<24^i>>>8^s,s=s-n|0,e.b=n=n<<20^n>>>12^r,e.c=r=r-i|0,e.d=i<<16^r>>>16^s,e.a=s-n|0},e.a=0,e.b=0,e.c=-1640531527,e.d=1367130551,a===Math.floor(a)?(e.a=a/4294967296|0,e.b=a|0):t+=a;for(var o=0;o<t.length+20;o++)e.b^=t.charCodeAt(o)|0,e.next()}function v(a,e){return e.a=a.a,e.b=a.b,e.c=a.c,e.d=a.d,e}function x(a,e){var t=new f(a),o=e&&e.state,n=function(){return(t.next()>>>0)/4294967296};return n.double=function(){do var r=t.next()>>>11,i=(t.next()>>>0)/4294967296,s=(r+i)/(1<<21);while(s===0);return s},n.int32=t.next,n.quick=n,o&&(typeof o=="object"&&v(o,t),n.state=function(){return v(t,{})}),n}u&&u.exports?u.exports=x:c&&c.amd?c(function(){return x}):this.tychei=x})(D,l,!1)})(P);var F={exports:{}};(function(l){(function(m,u,c){var f=256,v=6,x=52,a="random",e=c.pow(f,v),t=c.pow(2,x),o=t*2,n=f-1,r;function i(p,d,C){var y=[];d=d==!0?{entropy:!0}:d||{};var g=A(N(d.entropy?[p,O(u)]:p==null?j():p,3),y),H=new s(y),V=function(){for(var b=H.g(v),_=e,q=0;b<t;)b=(b+q)*f,_*=f,q=H.g(1);for(;b>=o;)b/=2,_/=2,q>>>=1;return(b+q)/_};return V.int32=function(){return H.g(4)|0},V.quick=function(){return H.g(4)/4294967296},V.double=V,A(O(H.S),u),(d.pass||C||function(b,_,q,z){return z&&(z.S&&h(z,H),b.state=function(){return h(H,{})}),q?(c[a]=b,_):b})(V,g,"global"in d?d.global:this==c,d.state)}function s(p){var d,C=p.length,y=this,g=0,H=y.i=y.j=0,V=y.S=[];for(C||(p=[C++]);g<f;)V[g]=g++;for(g=0;g<f;g++)V[g]=V[H=n&H+p[g%C]+(d=V[g])],V[H]=d;(y.g=function(b){for(var _,q=0,z=y.i,X=y.j,Z=y.S;b--;)_=Z[z=n&z+1],q=q*f+Z[n&(Z[z]=Z[X=n&X+_])+(Z[X]=_)];return y.i=z,y.j=X,q})(f)}function h(p,d){return d.i=p.i,d.j=p.j,d.S=p.S.slice(),d}function N(p,d){var C=[],y=typeof p,g;if(d&&y=="object")for(g in p)try{C.push(N(p[g],d-1))}catch{}return C.length?C:y=="string"?p:p+"\0"}function A(p,d){for(var C=p+"",y,g=0;g<C.length;)d[n&g]=n&(y^=d[n&g]*19)+C.charCodeAt(g++);return O(d)}function j(){try{var p;return r&&(p=r.randomBytes)?p=p(f):(p=new Uint8Array(f),(m.crypto||m.msCrypto).getRandomValues(p)),O(p)}catch{var d=m.navigator,C=d&&d.plugins;return[+new Date,m,C,m.screen,O(u)]}}function O(p){return String.fromCharCode.apply(0,p)}if(A(c.random(),u),l.exports){l.exports=i;try{r=Y}catch{}}else c["seed"+a]=i})(typeof self<"u"?self:D,[],Math)})(F);var ie=T.exports,ae=I.exports,se=R.exports,ce=B.exports,ue=U.exports,le=P.exports,E=F.exports;E.alea=ie;E.xor128=ae;E.xorwow=se;E.xorshift7=ce;E.xor4096=ue;E.tychei=le;var fe=E;function pe({start:l,end:m,seed:u}){const c=fe(u);return Math.floor(c()*(m-l+1)+l)}function xe(l,m){const u=pe({seed:m,start:0,end:l.length-1});return l[u]}const de=["#DF0B92","#097FAA","#AD6200","#084391"],me=l=>{const m=l.split("").reduce((c,f)=>c+f.charCodeAt(0),0);return xe(de,m)};function G(l){const{firstName:m,lastName:u}=l,c=me(m+u);return M("div",{className:"user-icon","aria-hidden":"true",style:{backgroundColor:c},children:m[0]+((u==null?void 0:u[0])||"")})}G.propTypes={firstName:L.exports.PropTypes.string.isRequired,lastName:L.exports.PropTypes.string};G.__docgenInfo={description:"",methods:[],displayName:"UserIcon",props:{firstName:{type:{name:"string"},required:!0,description:""},lastName:{type:{name:"string"},required:!1,description:""}}};const ve=l=>w.exports.createElement("svg",{width:"100%",height:"100%",viewBox:"0 0 225 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",...l},w.exports.createElement("path",{d:"M17.5954 12.5719C17.5954 14.2594 17.093 15.5438 16.0881 16.425C15.0832 17.2875 13.4115 17.7188 11.0732 17.7188H0V0.253125H10.9573C15.1508 0.253125 17.2476 1.79063 17.2476 4.86563C17.2476 5.82188 17.1219 6.5625 16.8707 7.0875C16.6388 7.6125 16.1847 8.0625 15.5083 8.4375V8.55C16.8997 9.075 17.5954 10.4156 17.5954 12.5719ZM9.0441 14.1469V10.6875H8.1165V14.1469H9.0441ZM9.0441 7.48125V4.55625H8.1165V7.48125H9.0441Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M23.6787 8.8875C23.6787 5.75625 24.4131 3.49688 25.8818 2.10938C27.3698 0.703125 29.8241 0 33.2446 0C36.6651 0 39.1 0.69375 40.5494 2.08125C42.0181 3.45 42.7525 5.7 42.7525 8.83125C42.7525 11.9438 41.9988 14.25 40.4914 15.75C38.9841 17.25 36.5395 18 33.1576 18C29.7951 18 27.3698 17.2594 25.8818 15.7781C24.4131 14.2969 23.6787 12 23.6787 8.8875ZM33.8533 13.3031V5.48438H32.9257V13.3031H33.8533Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M57.4759 17.7188H49.3014V0.253125H57.4759V17.7188Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M75.2239 17.7188H64.4406V0.253125H72.615V12.1219H75.6297L75.2239 17.7188Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M95.0586 17.7188H82.0142V0.253125H95.6093L95.1745 5.99063H90.1887V7.00313H95.0586L94.7687 11.6719H90.1887V12.6844H95.4934L95.0586 17.7188Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M111.56 0.253125C114.149 0.253125 116.043 0.7125 117.241 1.63125C118.44 2.55 119.039 3.96563 119.039 5.87813C119.039 7.77188 118.43 9.24375 117.213 10.2938L119.618 17.7188H111.734L110.69 12.2906H110.169V17.7188H101.994V0.253125H111.56ZM110.98 8.15625V5.2875H110.053V8.15625H110.98Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M134.867 12.8531H134.027V17.7188H125.852V0.253125H134.519C137.264 0.253125 139.273 0.76875 140.549 1.8C141.844 2.83125 142.491 4.43438 142.491 6.60938C142.491 8.78438 141.873 10.3688 140.636 11.3625C139.399 12.3563 137.476 12.8531 134.867 12.8531ZM134.838 8.775V5.2875H133.911V8.775H134.838Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M159.644 17.7188H148.861V0.253125H157.035V12.1219H160.05L159.644 17.7188Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M185.363 17.7188H176.957L176.493 15.0469H174.232L173.739 17.7188H165.623L169.13 0.253125H181.856L185.363 17.7188ZM175.856 11.3063V7.81875H174.928V11.3063H175.856Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M204.641 5.93438H202.032V17.7188H193.829V5.93438H190.93L191.22 0.253125H205.018L204.641 5.93438Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M224.449 17.7188H211.405V0.253125H225L224.565 5.99063H219.579V7.00313H224.449L224.159 11.6719H219.579V12.6844H224.884L224.449 17.7188Z",fill:"#2C92A8"}));function he(l){return ee({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"}}]})(l)}function S(l){const{className:m,onChange:u,options:c,value:f,displayIcon:v,dropDownMenuClassName:x}=l,a=w.exports.useRef(null),[e,t]=w.exports.useState(!1),[o,n]=w.exports.useState(c[0]),r=c.find(s=>s.value===f)||null,i={focusedOption:o,isMenuOpen:e,options:c,selectedOption:r,setFocusedOption:n,setIsMenuOpen:t,setSelectedOption:u};return w.exports.useEffect(()=>{const s=h=>{var N;!((N=a.current)!=null&&N.contains(h.target))&&e&&t(!1)};return document.addEventListener("click",s,!1),()=>{document.removeEventListener("click",s,!1)}},[e]),M(ne.Provider,{value:i,children:k("div",{className:$(m,"dropdown-mini"),ref:a,onKeyDown:s=>{s.key==="Escape"&&t(!1)},children:[M("div",{className:"dropdown-mini__listbox","aria-haspopup":"listbox",onClick:s=>{s.stopPropagation(),s.preventDefault(),t(h=>!h)},onKeyDown:s=>{(s.key==="Enter"||s.key===" ")&&t(h=>!h)},children:v||M(he,{})}),M(te,{className:x,"aria-expanded":e,hidden:!e,options:c})]})})}S.propTypes={className:L.exports.string,onChange:L.exports.func.isRequired,options:L.exports.arrayOf(re).isRequired,required:L.exports.bool,value:L.exports.string};S.defaultProps={required:!1};S.__docgenInfo={description:"",methods:[],displayName:"DropdownMini",props:{required:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},className:{type:{name:"string"},required:!1,description:""},onChange:{type:{name:"func"},required:!0,description:""},options:{type:{name:"arrayOf",value:{name:"custom",raw:"optionPropType"}},required:!0,description:""},value:{type:{name:"string"},required:!1,description:""}}};function K(l){const m=Q(),{logout:u}=oe(),c=({option:f})=>{switch(f.value){case"LOGOUT":u(),m.replace("/splashpage",{loggedOut:!0});break;default:console.log("default")}};return k("div",{className:$(l.className,"navbar"),children:[M(ve,{className:"navbar__logo"}),k("div",{className:$(l.className,"navbar__links"),children:[l.organizationName&&k(J,{children:[k(W,{to:"/organizations",className:"navbar__all-organizations",children:["<"," All Organizations"]}),M("span",{className:"navbar__divider",children:" | "}),M("span",{children:l.organizationName})]}),M("div",{className:"navbar__user-icon",children:M(S,{className:"navbar__see-more",dropDownMenuClassName:"navbar__dropdown-menu",options:[{value:"LOGOUT",label:"Logout"}],displayIcon:M(G,{firstName:l.user.firstName,lastName:l.user.lastName}),onChange:f=>c({option:f})})})]})]})}K.propTypes={className:L.exports.string,user:L.exports.object.isRequired,organizationName:L.exports.string};K.__docgenInfo={description:"",methods:[],displayName:"Navbar",props:{className:{type:{name:"string"},required:!1,description:""},user:{type:{name:"object"},required:!0,description:""},organizationName:{type:{name:"string"},required:!1,description:""}}};export{K as N};
//# sourceMappingURL=Navbar.cb7f216d.js.map