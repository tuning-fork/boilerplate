import{r as w}from"./index.b8fd3884.js";import{p as I,P as z}from"./index.014bc556.js";import{c as T}from"./clsx.m.c5ef2623.js";import{u as Q,L as W}from"./react-router-dom.2fcfabae.js";import{c as D}from"./iframe.fffd2ee8.js";import{j as M,a as k,F as Y}from"./jsx-runtime.0b933dff.js";import{G as ee}from"./iconBase.b42efa6b.js";import{D as ne,a as te,o as re}from"./DropdownMenu.41902008.js";import{u as ie}from"./currentUserContext.6000bc39.js";var $={exports:{}};(function(l){(function(m,u,c){function f(e){var t=this,i=a();t.next=function(){var n=2091639*t.s0+t.c*23283064365386963e-26;return t.s0=t.s1,t.s1=t.s2,t.s2=n-(t.c=n|0)},t.c=1,t.s0=i(" "),t.s1=i(" "),t.s2=i(" "),t.s0-=i(e),t.s0<0&&(t.s0+=1),t.s1-=i(e),t.s1<0&&(t.s1+=1),t.s2-=i(e),t.s2<0&&(t.s2+=1),i=null}function v(e,t){return t.c=e.c,t.s0=e.s0,t.s1=e.s1,t.s2=e.s2,t}function x(e,t){var i=new f(e),n=t&&t.state,r=i.next;return r.int32=function(){return i.next()*4294967296|0},r.double=function(){return r()+(r()*2097152|0)*11102230246251565e-32},r.quick=r,n&&(typeof n=="object"&&v(n,i),r.state=function(){return v(i,{})}),r}function a(){var e=4022871197,t=function(i){i=String(i);for(var n=0;n<i.length;n++){e+=i.charCodeAt(n);var r=.02519603282416938*e;e=r>>>0,r-=e,r*=e,e=r>>>0,r-=e,e+=r*4294967296}return(e>>>0)*23283064365386963e-26};return t}u&&u.exports?u.exports=x:c&&c.amd?c(function(){return x}):this.alea=x})(D,l,!1)})($);var P={exports:{}};(function(l){(function(m,u,c){function f(a){var e=this,t="";e.x=0,e.y=0,e.z=0,e.w=0,e.next=function(){var n=e.x^e.x<<11;return e.x=e.y,e.y=e.z,e.z=e.w,e.w^=e.w>>>19^n^n>>>8},a===(a|0)?e.x=a:t+=a;for(var i=0;i<t.length+64;i++)e.x^=t.charCodeAt(i)|0,e.next()}function v(a,e){return e.x=a.x,e.y=a.y,e.z=a.z,e.w=a.w,e}function x(a,e){var t=new f(a),i=e&&e.state,n=function(){return(t.next()>>>0)/4294967296};return n.double=function(){do var r=t.next()>>>11,o=(t.next()>>>0)/4294967296,s=(r+o)/(1<<21);while(s===0);return s},n.int32=t.next,n.quick=n,i&&(typeof i=="object"&&v(i,t),n.state=function(){return v(t,{})}),n}u&&u.exports?u.exports=x:c&&c.amd?c(function(){return x}):this.xor128=x})(D,l,!1)})(P);var R={exports:{}};(function(l){(function(m,u,c){function f(a){var e=this,t="";e.next=function(){var n=e.x^e.x>>>2;return e.x=e.y,e.y=e.z,e.z=e.w,e.w=e.v,(e.d=e.d+362437|0)+(e.v=e.v^e.v<<4^(n^n<<1))|0},e.x=0,e.y=0,e.z=0,e.w=0,e.v=0,a===(a|0)?e.x=a:t+=a;for(var i=0;i<t.length+64;i++)e.x^=t.charCodeAt(i)|0,i==t.length&&(e.d=e.x<<10^e.x>>>4),e.next()}function v(a,e){return e.x=a.x,e.y=a.y,e.z=a.z,e.w=a.w,e.v=a.v,e.d=a.d,e}function x(a,e){var t=new f(a),i=e&&e.state,n=function(){return(t.next()>>>0)/4294967296};return n.double=function(){do var r=t.next()>>>11,o=(t.next()>>>0)/4294967296,s=(r+o)/(1<<21);while(s===0);return s},n.int32=t.next,n.quick=n,i&&(typeof i=="object"&&v(i,t),n.state=function(){return v(t,{})}),n}u&&u.exports?u.exports=x:c&&c.amd?c(function(){return x}):this.xorwow=x})(D,l,!1)})(R);var B={exports:{}};(function(l){(function(m,u,c){function f(a){var e=this;e.next=function(){var i=e.x,n=e.i,r,o;return r=i[n],r^=r>>>7,o=r^r<<24,r=i[n+1&7],o^=r^r>>>10,r=i[n+3&7],o^=r^r>>>3,r=i[n+4&7],o^=r^r<<7,r=i[n+7&7],r=r^r<<13,o^=r^r<<9,i[n]=o,e.i=n+1&7,o};function t(i,n){var r,o=[];if(n===(n|0))o[0]=n;else for(n=""+n,r=0;r<n.length;++r)o[r&7]=o[r&7]<<15^n.charCodeAt(r)+o[r+1&7]<<13;for(;o.length<8;)o.push(0);for(r=0;r<8&&o[r]===0;++r);for(r==8?o[7]=-1:o[r],i.x=o,i.i=0,r=256;r>0;--r)i.next()}t(e,a)}function v(a,e){return e.x=a.x.slice(),e.i=a.i,e}function x(a,e){a==null&&(a=+new Date);var t=new f(a),i=e&&e.state,n=function(){return(t.next()>>>0)/4294967296};return n.double=function(){do var r=t.next()>>>11,o=(t.next()>>>0)/4294967296,s=(r+o)/(1<<21);while(s===0);return s},n.int32=t.next,n.quick=n,i&&(i.x&&v(i,t),n.state=function(){return v(t,{})}),n}u&&u.exports?u.exports=x:c&&c.amd?c(function(){return x}):this.xorshift7=x})(D,l,!1)})(B);var U={exports:{}};(function(l){(function(m,u,c){function f(a){var e=this;e.next=function(){var i=e.w,n=e.X,r=e.i,o,s;return e.w=i=i+1640531527|0,s=n[r+34&127],o=n[r=r+1&127],s^=s<<13,o^=o<<17,s^=s>>>15,o^=o>>>12,s=n[r]=s^o,e.i=r,s+(i^i>>>16)|0};function t(i,n){var r,o,s,h,N,A=[],j=128;for(n===(n|0)?(o=n,n=null):(n=n+"\0",o=0,j=Math.max(j,n.length)),s=0,h=-32;h<j;++h)n&&(o^=n.charCodeAt((h+32)%n.length)),h===0&&(N=o),o^=o<<10,o^=o>>>15,o^=o<<4,o^=o>>>13,h>=0&&(N=N+1640531527|0,r=A[h&127]^=o+N,s=r==0?s+1:0);for(s>=128&&(A[(n&&n.length||0)&127]=-1),s=127,h=4*128;h>0;--h)o=A[s+34&127],r=A[s=s+1&127],o^=o<<13,r^=r<<17,o^=o>>>15,r^=r>>>12,A[s]=o^r;i.w=N,i.X=A,i.i=s}t(e,a)}function v(a,e){return e.i=a.i,e.w=a.w,e.X=a.X.slice(),e}function x(a,e){a==null&&(a=+new Date);var t=new f(a),i=e&&e.state,n=function(){return(t.next()>>>0)/4294967296};return n.double=function(){do var r=t.next()>>>11,o=(t.next()>>>0)/4294967296,s=(r+o)/(1<<21);while(s===0);return s},n.int32=t.next,n.quick=n,i&&(i.X&&v(i,t),n.state=function(){return v(t,{})}),n}u&&u.exports?u.exports=x:c&&c.amd?c(function(){return x}):this.xor4096=x})(D,l,!1)})(U);var F={exports:{}};(function(l){(function(m,u,c){function f(a){var e=this,t="";e.next=function(){var n=e.b,r=e.c,o=e.d,s=e.a;return n=n<<25^n>>>7^r,r=r-o|0,o=o<<24^o>>>8^s,s=s-n|0,e.b=n=n<<20^n>>>12^r,e.c=r=r-o|0,e.d=o<<16^r>>>16^s,e.a=s-n|0},e.a=0,e.b=0,e.c=-1640531527,e.d=1367130551,a===Math.floor(a)?(e.a=a/4294967296|0,e.b=a|0):t+=a;for(var i=0;i<t.length+20;i++)e.b^=t.charCodeAt(i)|0,e.next()}function v(a,e){return e.a=a.a,e.b=a.b,e.c=a.c,e.d=a.d,e}function x(a,e){var t=new f(a),i=e&&e.state,n=function(){return(t.next()>>>0)/4294967296};return n.double=function(){do var r=t.next()>>>11,o=(t.next()>>>0)/4294967296,s=(r+o)/(1<<21);while(s===0);return s},n.int32=t.next,n.quick=n,i&&(typeof i=="object"&&v(i,t),n.state=function(){return v(t,{})}),n}u&&u.exports?u.exports=x:c&&c.amd?c(function(){return x}):this.tychei=x})(D,l,!1)})(F);var K={exports:{}};(function(l){(function(m,u,c){var f=256,v=6,x=52,a="random",e=c.pow(f,v),t=c.pow(2,x),i=t*2,n=f-1,r;function o(p,d,C){var y=[];d=d==!0?{entropy:!0}:d||{};var g=A(N(d.entropy?[p,O(u)]:p==null?j():p,3),y),H=new s(y),V=function(){for(var b=H.g(v),L=e,q=0;b<t;)b=(b+q)*f,L*=f,q=H.g(1);for(;b>=i;)b/=2,L/=2,q>>>=1;return(b+q)/L};return V.int32=function(){return H.g(4)|0},V.quick=function(){return H.g(4)/4294967296},V.double=V,A(O(H.S),u),(d.pass||C||function(b,L,q,_){return _&&(_.S&&h(_,H),b.state=function(){return h(H,{})}),q?(c[a]=b,L):b})(V,g,"global"in d?d.global:this==c,d.state)}function s(p){var d,C=p.length,y=this,g=0,H=y.i=y.j=0,V=y.S=[];for(C||(p=[C++]);g<f;)V[g]=g++;for(g=0;g<f;g++)V[g]=V[H=n&H+p[g%C]+(d=V[g])],V[H]=d;(y.g=function(b){for(var L,q=0,_=y.i,X=y.j,Z=y.S;b--;)L=Z[_=n&_+1],q=q*f+Z[n&(Z[_]=Z[X=n&X+L])+(Z[X]=L)];return y.i=_,y.j=X,q})(f)}function h(p,d){return d.i=p.i,d.j=p.j,d.S=p.S.slice(),d}function N(p,d){var C=[],y=typeof p,g;if(d&&y=="object")for(g in p)try{C.push(N(p[g],d-1))}catch{}return C.length?C:y=="string"?p:p+"\0"}function A(p,d){for(var C=p+"",y,g=0;g<C.length;)d[n&g]=n&(y^=d[n&g]*19)+C.charCodeAt(g++);return O(d)}function j(){try{var p;return r&&(p=r.randomBytes)?p=p(f):(p=new Uint8Array(f),(m.crypto||m.msCrypto).getRandomValues(p)),O(p)}catch{var d=m.navigator,C=d&&d.plugins;return[+new Date,m,C,m.screen,O(u)]}}function O(p){return String.fromCharCode.apply(0,p)}if(A(c.random(),u),l.exports){l.exports=o;try{r=require("crypto")}catch{}}else c["seed"+a]=o})(typeof self!="undefined"?self:D,[],Math)})(K);var oe=$.exports,ae=P.exports,se=R.exports,ce=B.exports,ue=U.exports,le=F.exports,E=K.exports;E.alea=oe;E.xor128=ae;E.xorwow=se;E.xorshift7=ce;E.xor4096=ue;E.tychei=le;var fe=E;function pe({start:l,end:m,seed:u}){const c=fe(u);return Math.floor(c()*(m-l+1)+l)}function xe(l,m){const u=pe({seed:m,start:0,end:l.length-1});return l[u]}const de=["#DF0B92","#097FAA","#AD6200","#084391"],me=l=>{const m=l.split("").reduce((c,f)=>c+f.charCodeAt(0),0);return xe(de,m)};function G(l){const{firstName:m,lastName:u}=l,c=me(m+u);return M("div",{className:"user-icon","aria-hidden":"true",style:{backgroundColor:c},children:m[0]+((u==null?void 0:u[0])||"")})}G.propTypes={firstName:I.exports.PropTypes.string.isRequired,lastName:I.exports.PropTypes.string};G.__docgenInfo={description:"",methods:[],displayName:"UserIcon",props:{firstName:{type:{name:"string"},required:!0,description:""},lastName:{type:{name:"string"},required:!1,description:""}}};const ve=l=>w.exports.createElement("svg",{width:"100%",height:"100%",viewBox:"0 0 225 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",...l},w.exports.createElement("path",{d:"M17.5954 12.5719C17.5954 14.2594 17.093 15.5438 16.0881 16.425C15.0832 17.2875 13.4115 17.7188 11.0732 17.7188H0V0.253125H10.9573C15.1508 0.253125 17.2476 1.79063 17.2476 4.86563C17.2476 5.82188 17.1219 6.5625 16.8707 7.0875C16.6388 7.6125 16.1847 8.0625 15.5083 8.4375V8.55C16.8997 9.075 17.5954 10.4156 17.5954 12.5719ZM9.0441 14.1469V10.6875H8.1165V14.1469H9.0441ZM9.0441 7.48125V4.55625H8.1165V7.48125H9.0441Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M23.6787 8.8875C23.6787 5.75625 24.4131 3.49688 25.8818 2.10938C27.3698 0.703125 29.8241 0 33.2446 0C36.6651 0 39.1 0.69375 40.5494 2.08125C42.0181 3.45 42.7525 5.7 42.7525 8.83125C42.7525 11.9438 41.9988 14.25 40.4914 15.75C38.9841 17.25 36.5395 18 33.1576 18C29.7951 18 27.3698 17.2594 25.8818 15.7781C24.4131 14.2969 23.6787 12 23.6787 8.8875ZM33.8533 13.3031V5.48438H32.9257V13.3031H33.8533Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M57.4759 17.7188H49.3014V0.253125H57.4759V17.7188Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M75.2239 17.7188H64.4406V0.253125H72.615V12.1219H75.6297L75.2239 17.7188Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M95.0586 17.7188H82.0142V0.253125H95.6093L95.1745 5.99063H90.1887V7.00313H95.0586L94.7687 11.6719H90.1887V12.6844H95.4934L95.0586 17.7188Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M111.56 0.253125C114.149 0.253125 116.043 0.7125 117.241 1.63125C118.44 2.55 119.039 3.96563 119.039 5.87813C119.039 7.77188 118.43 9.24375 117.213 10.2938L119.618 17.7188H111.734L110.69 12.2906H110.169V17.7188H101.994V0.253125H111.56ZM110.98 8.15625V5.2875H110.053V8.15625H110.98Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M134.867 12.8531H134.027V17.7188H125.852V0.253125H134.519C137.264 0.253125 139.273 0.76875 140.549 1.8C141.844 2.83125 142.491 4.43438 142.491 6.60938C142.491 8.78438 141.873 10.3688 140.636 11.3625C139.399 12.3563 137.476 12.8531 134.867 12.8531ZM134.838 8.775V5.2875H133.911V8.775H134.838Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M159.644 17.7188H148.861V0.253125H157.035V12.1219H160.05L159.644 17.7188Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M185.363 17.7188H176.957L176.493 15.0469H174.232L173.739 17.7188H165.623L169.13 0.253125H181.856L185.363 17.7188ZM175.856 11.3063V7.81875H174.928V11.3063H175.856Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M204.641 5.93438H202.032V17.7188H193.829V5.93438H190.93L191.22 0.253125H205.018L204.641 5.93438Z",fill:"#2C92A8"}),w.exports.createElement("path",{d:"M224.449 17.7188H211.405V0.253125H225L224.565 5.99063H219.579V7.00313H224.449L224.159 11.6719H219.579V12.6844H224.884L224.449 17.7188Z",fill:"#2C92A8"}));function he(l){return ee({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"}}]})(l)}function S(l){const{className:m,onChange:u,options:c,value:f,displayIcon:v,dropDownMenuClassName:x}=l,a=w.exports.useRef(null),[e,t]=w.exports.useState(!1),[i,n]=w.exports.useState(c[0]),r=c.find(s=>s.value===f)||null,o={focusedOption:i,isMenuOpen:e,options:c,selectedOption:r,setFocusedOption:n,setIsMenuOpen:t,setSelectedOption:u};return w.exports.useEffect(()=>{const s=h=>{var N;!((N=a.current)!=null&&N.contains(h.target))&&e&&t(!1)};return document.addEventListener("click",s,!1),()=>{document.removeEventListener("click",s,!1)}},[e]),M(ne.Provider,{value:o,children:k("div",{className:T(m,"dropdown-mini"),ref:a,onKeyDown:s=>{s.key==="Escape"&&t(!1)},children:[M("div",{className:"dropdown-mini__listbox","aria-haspopup":"listbox",onClick:s=>{s.stopPropagation(),s.preventDefault(),t(h=>!h)},onKeyDown:s=>{(s.key==="Enter"||s.key===" ")&&t(h=>!h)},children:v||M(he,{})}),M(te,{className:x,"aria-expanded":e,hidden:!e,options:c})]})})}S.propTypes={className:z.string,onChange:z.func.isRequired,options:z.arrayOf(re).isRequired,required:z.bool,value:z.string};S.defaultProps={required:!1};S.__docgenInfo={description:"",methods:[],displayName:"DropdownMini",props:{required:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},className:{type:{name:"string"},required:!1,description:""},onChange:{type:{name:"func"},required:!0,description:""},options:{type:{name:"arrayOf",value:{name:"custom",raw:"optionPropType"}},required:!0,description:""},value:{type:{name:"string"},required:!1,description:""}}};function J(l){const m=Q(),{logout:u}=ie(),c=({option:f})=>{switch(f.value){case"LOGOUT":u(),m.replace("/splashpage",{loggedOut:!0});break;default:console.log("default")}};return k("div",{className:T(l.className,"navbar"),children:[M(ve,{className:"navbar__logo"}),k("div",{className:T(l.className,"navbar__links"),children:[l.organizationName&&k(Y,{children:[k(W,{to:"/organizations",className:"navbar__all-organizations",children:["<"," All Organizations"]}),M("span",{className:"navbar__divider",children:" | "}),M("span",{children:l.organizationName})]}),M("div",{className:"navbar__user-icon",children:M(S,{className:"navbar__see-more",dropDownMenuClassName:"navbar__dropdown-menu",options:[{value:"LOGOUT",label:"Logout"}],displayIcon:M(G,{firstName:l.user.firstName,lastName:l.user.lastName}),onChange:f=>c({option:f})})})]})]})}J.propTypes={className:z.string,user:z.object.isRequired,organizationName:z.string};J.__docgenInfo={description:"",methods:[],displayName:"Navbar",props:{className:{type:{name:"string"},required:!1,description:""},user:{type:{name:"object"},required:!0,description:""},organizationName:{type:{name:"string"},required:!1,description:""}}};export{J as N};
//# sourceMappingURL=Navbar.653b7fd6.js.map