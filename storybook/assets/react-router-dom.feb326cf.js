import{R as b,r as We,j as Z}from"./jsx-runtime.2d63e2ec.js";import{p as qe}from"./index.9ab846ab.js";import{_ as fe}from"./objectWithoutPropertiesLoose.5e7699d1.js";function H(){return H=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},H.apply(this,arguments)}function Re(e,t){return Re=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,o){return n.__proto__=o,n},Re(e,t)}function z(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Re(e,t)}function ie(e){return e.charAt(0)==="/"}function Ce(e,t){for(var r=t,n=r+1,o=e.length;n<o;r+=1,n+=1)e[r]=e[n];e.pop()}function Pt(e,t){t===void 0&&(t="");var r=e&&e.split("/")||[],n=t&&t.split("/")||[],o=e&&ie(e),i=t&&ie(t),c=o||i;if(e&&ie(e)?n=r:r.length&&(n.pop(),n=n.concat(r)),!n.length)return"/";var u;if(n.length){var f=n[n.length-1];u=f==="."||f===".."||f===""}else u=!1;for(var a=0,s=n.length;s>=0;s--){var l=n[s];l==="."?Ce(n,s):l===".."?(Ce(n,s),a++):a&&(Ce(n,s),a--)}if(!c)for(;a--;a)n.unshift("..");c&&n[0]!==""&&(!n[0]||!ie(n[0]))&&n.unshift("");var h=n.join("/");return u&&h.substr(-1)!=="/"&&(h+="/"),h}function Ke(e){return e.valueOf?e.valueOf():Object.prototype.valueOf.call(e)}function ae(e,t){if(e===t)return!0;if(e==null||t==null)return!1;if(Array.isArray(e))return Array.isArray(t)&&e.length===t.length&&e.every(function(o,i){return ae(o,t[i])});if(typeof e=="object"||typeof t=="object"){var r=Ke(e),n=Ke(t);return r!==e||n!==t?ae(r,n):Object.keys(Object.assign({},e,t)).every(function(o){return ae(e[o],t[o])})}return!1}var bt=!0,Ee="Invariant failed";function X(e,t){if(!e){if(bt)throw new Error(Ee);var r=typeof t=="function"?t():t,n=r?Ee+": "+r:Ee;throw new Error(n)}}function oe(e){return e.charAt(0)==="/"?e:"/"+e}function ke(e){return e.charAt(0)==="/"?e.substr(1):e}function Ct(e,t){return e.toLowerCase().indexOf(t.toLowerCase())===0&&"/?#".indexOf(e.charAt(t.length))!==-1}function ot(e,t){return Ct(e,t)?e.substr(t.length):e}function it(e){return e.charAt(e.length-1)==="/"?e.slice(0,-1):e}function Et(e){var t=e||"/",r="",n="",o=t.indexOf("#");o!==-1&&(n=t.substr(o),t=t.substr(0,o));var i=t.indexOf("?");return i!==-1&&(r=t.substr(i),t=t.substr(0,i)),{pathname:t,search:r==="?"?"":r,hash:n==="#"?"":n}}function k(e){var t=e.pathname,r=e.search,n=e.hash,o=t||"/";return r&&r!=="?"&&(o+=r.charAt(0)==="?"?r:"?"+r),n&&n!=="#"&&(o+=n.charAt(0)==="#"?n:"#"+n),o}function N(e,t,r,n){var o;typeof e=="string"?(o=Et(e),o.state=t):(o=H({},e),o.pathname===void 0&&(o.pathname=""),o.search?o.search.charAt(0)!=="?"&&(o.search="?"+o.search):o.search="",o.hash?o.hash.charAt(0)!=="#"&&(o.hash="#"+o.hash):o.hash="",t!==void 0&&o.state===void 0&&(o.state=t));try{o.pathname=decodeURI(o.pathname)}catch(i){throw i instanceof URIError?new URIError('Pathname "'+o.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):i}return r&&(o.key=r),n?o.pathname?o.pathname.charAt(0)!=="/"&&(o.pathname=Pt(o.pathname,n.pathname)):o.pathname=n.pathname:o.pathname||(o.pathname="/"),o}function St(e,t){return e.pathname===t.pathname&&e.search===t.search&&e.hash===t.hash&&e.key===t.key&&ae(e.state,t.state)}function Oe(){var e=null;function t(c){return e=c,function(){e===c&&(e=null)}}function r(c,u,f,a){if(e!=null){var s=typeof e=="function"?e(c,u):e;typeof s=="string"?typeof f=="function"?f(s,a):a(!0):a(s!==!1)}else a(!0)}var n=[];function o(c){var u=!0;function f(){u&&c.apply(void 0,arguments)}return n.push(f),function(){u=!1,n=n.filter(function(a){return a!==f})}}function i(){for(var c=arguments.length,u=new Array(c),f=0;f<c;f++)u[f]=arguments[f];n.forEach(function(a){return a.apply(void 0,u)})}return{setPrompt:t,confirmTransitionTo:r,appendListener:o,notifyListeners:i}}var at=!!(typeof window<"u"&&window.document&&window.document.createElement);function st(e,t){t(window.confirm(e))}function Tt(){var e=window.navigator.userAgent;return(e.indexOf("Android 2.")!==-1||e.indexOf("Android 4.0")!==-1)&&e.indexOf("Mobile Safari")!==-1&&e.indexOf("Chrome")===-1&&e.indexOf("Windows Phone")===-1?!1:window.history&&"pushState"in window.history}function $t(){return window.navigator.userAgent.indexOf("Trident")===-1}function At(){return window.navigator.userAgent.indexOf("Firefox")===-1}function Rt(e){return e.state===void 0&&navigator.userAgent.indexOf("CriOS")===-1}var Ge="popstate",ze="hashchange";function Ve(){try{return window.history.state||{}}catch{return{}}}function Lt(e){e===void 0&&(e={}),at||X(!1);var t=window.history,r=Tt(),n=!$t(),o=e,i=o.forceRefresh,c=i===void 0?!1:i,u=o.getUserConfirmation,f=u===void 0?st:u,a=o.keyLength,s=a===void 0?6:a,l=e.basename?it(oe(e.basename)):"";function h(v){var p=v||{},g=p.key,m=p.state,C=window.location,M=C.pathname,F=C.search,G=C.hash,K=M+F+G;return l&&(K=ot(K,l)),N(K,m,g)}function d(){return Math.random().toString(36).substr(2,s)}var y=Oe();function E(v){H(q,v),q.length=t.length,y.notifyListeners(q.location,q.action)}function L(v){Rt(v)||j(h(v.state))}function T(){j(h(Ve()))}var O=!1;function j(v){if(O)O=!1,E();else{var p="POP";y.confirmTransitionTo(v,p,f,function(g){g?E({action:p,location:v}):B(v)})}}function B(v){var p=q.location,g=S.indexOf(p.key);g===-1&&(g=0);var m=S.indexOf(v.key);m===-1&&(m=0);var C=g-m;C&&(O=!0,$(C))}var U=h(Ve()),S=[U.key];function x(v){return l+k(v)}function P(v,p){var g="PUSH",m=N(v,p,d(),q.location);y.confirmTransitionTo(m,g,f,function(C){if(!!C){var M=x(m),F=m.key,G=m.state;if(r)if(t.pushState({key:F,state:G},null,M),c)window.location.href=M;else{var K=S.indexOf(q.location.key),Q=S.slice(0,K+1);Q.push(m.key),S=Q,E({action:g,location:m})}else window.location.href=M}})}function _(v,p){var g="REPLACE",m=N(v,p,d(),q.location);y.confirmTransitionTo(m,g,f,function(C){if(!!C){var M=x(m),F=m.key,G=m.state;if(r)if(t.replaceState({key:F,state:G},null,M),c)window.location.replace(M);else{var K=S.indexOf(q.location.key);K!==-1&&(S[K]=m.key),E({action:g,location:m})}else window.location.replace(M)}})}function $(v){t.go(v)}function A(){$(-1)}function V(){$(1)}var Y=0;function D(v){Y+=v,Y===1&&v===1?(window.addEventListener(Ge,L),n&&window.addEventListener(ze,T)):Y===0&&(window.removeEventListener(Ge,L),n&&window.removeEventListener(ze,T))}var I=!1;function te(v){v===void 0&&(v=!1);var p=y.setPrompt(v);return I||(D(1),I=!0),function(){return I&&(I=!1,D(-1)),p()}}function be(v){var p=y.appendListener(v);return D(1),function(){D(-1),p()}}var q={length:t.length,action:"POP",location:U,createHref:x,push:P,replace:_,go:$,goBack:A,goForward:V,block:te,listen:be};return q}var Je="hashchange",Ot={hashbang:{encodePath:function(t){return t.charAt(0)==="!"?t:"!/"+ke(t)},decodePath:function(t){return t.charAt(0)==="!"?t.substr(1):t}},noslash:{encodePath:ke,decodePath:oe},slash:{encodePath:oe,decodePath:oe}};function ct(e){var t=e.indexOf("#");return t===-1?e:e.slice(0,t)}function re(){var e=window.location.href,t=e.indexOf("#");return t===-1?"":e.substring(t+1)}function Mt(e){window.location.hash=e}function Se(e){window.location.replace(ct(window.location.href)+"#"+e)}function Ht(e){e===void 0&&(e={}),at||X(!1);var t=window.history;At();var r=e,n=r.getUserConfirmation,o=n===void 0?st:n,i=r.hashType,c=i===void 0?"slash":i,u=e.basename?it(oe(e.basename)):"",f=Ot[c],a=f.encodePath,s=f.decodePath;function l(){var p=s(re());return u&&(p=ot(p,u)),N(p)}var h=Oe();function d(p){H(v,p),v.length=t.length,h.notifyListeners(v.location,v.action)}var y=!1,E=null;function L(p,g){return p.pathname===g.pathname&&p.search===g.search&&p.hash===g.hash}function T(){var p=re(),g=a(p);if(p!==g)Se(g);else{var m=l(),C=v.location;if(!y&&L(C,m)||E===k(m))return;E=null,O(m)}}function O(p){if(y)y=!1,d();else{var g="POP";h.confirmTransitionTo(p,g,o,function(m){m?d({action:g,location:p}):j(p)})}}function j(p){var g=v.location,m=x.lastIndexOf(k(g));m===-1&&(m=0);var C=x.lastIndexOf(k(p));C===-1&&(C=0);var M=m-C;M&&(y=!0,A(M))}var B=re(),U=a(B);B!==U&&Se(U);var S=l(),x=[k(S)];function P(p){var g=document.querySelector("base"),m="";return g&&g.getAttribute("href")&&(m=ct(window.location.href)),m+"#"+a(u+k(p))}function _(p,g){var m="PUSH",C=N(p,void 0,void 0,v.location);h.confirmTransitionTo(C,m,o,function(M){if(!!M){var F=k(C),G=a(u+F),K=re()!==G;if(K){E=F,Mt(G);var Q=x.lastIndexOf(k(v.location)),Fe=x.slice(0,Q+1);Fe.push(F),x=Fe,d({action:m,location:C})}else d()}})}function $(p,g){var m="REPLACE",C=N(p,void 0,void 0,v.location);h.confirmTransitionTo(C,m,o,function(M){if(!!M){var F=k(C),G=a(u+F),K=re()!==G;K&&(E=F,Se(G));var Q=x.indexOf(k(v.location));Q!==-1&&(x[Q]=F),d({action:m,location:C})}})}function A(p){t.go(p)}function V(){A(-1)}function Y(){A(1)}var D=0;function I(p){D+=p,D===1&&p===1?window.addEventListener(Je,T):D===0&&window.removeEventListener(Je,T)}var te=!1;function be(p){p===void 0&&(p=!1);var g=h.setPrompt(p);return te||(I(1),te=!0),function(){return te&&(te=!1,I(-1)),g()}}function q(p){var g=h.appendListener(p);return I(1),function(){I(-1),g()}}var v={length:t.length,action:"POP",location:S,createHref:P,push:_,replace:$,go:A,goBack:V,goForward:Y,block:be,listen:q};return v}function Xe(e,t,r){return Math.min(Math.max(e,t),r)}function Ut(e){e===void 0&&(e={});var t=e,r=t.getUserConfirmation,n=t.initialEntries,o=n===void 0?["/"]:n,i=t.initialIndex,c=i===void 0?0:i,u=t.keyLength,f=u===void 0?6:u,a=Oe();function s(P){H(x,P),x.length=x.entries.length,a.notifyListeners(x.location,x.action)}function l(){return Math.random().toString(36).substr(2,f)}var h=Xe(c,0,o.length-1),d=o.map(function(P){return typeof P=="string"?N(P,void 0,l()):N(P,void 0,P.key||l())}),y=k;function E(P,_){var $="PUSH",A=N(P,_,l(),x.location);a.confirmTransitionTo(A,$,r,function(V){if(!!V){var Y=x.index,D=Y+1,I=x.entries.slice(0);I.length>D?I.splice(D,I.length-D,A):I.push(A),s({action:$,location:A,index:D,entries:I})}})}function L(P,_){var $="REPLACE",A=N(P,_,l(),x.location);a.confirmTransitionTo(A,$,r,function(V){!V||(x.entries[x.index]=A,s({action:$,location:A}))})}function T(P){var _=Xe(x.index+P,0,x.entries.length-1),$="POP",A=x.entries[_];a.confirmTransitionTo(A,$,r,function(V){V?s({action:$,location:A,index:_}):s()})}function O(){T(-1)}function j(){T(1)}function B(P){var _=x.index+P;return _>=0&&_<x.entries.length}function U(P){return P===void 0&&(P=!1),a.setPrompt(P)}function S(P){return a.appendListener(P)}var x={length:d.length,action:"POP",location:d[h],index:h,entries:d,createHref:y,push:E,replace:L,go:T,goBack:O,goForward:j,canGo:B,block:U,listen:S};return x}var Te=1073741823,Ye=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:{};function _t(){var e="__global_unique_id__";return Ye[e]=(Ye[e]||0)+1}function It(e,t){return e===t?e!==0||1/e===1/t:e!==e&&t!==t}function Nt(e){var t=[];return{on:function(n){t.push(n)},off:function(n){t=t.filter(function(o){return o!==n})},get:function(){return e},set:function(n,o){e=n,t.forEach(function(i){return i(e,o)})}}}function jt(e){return Array.isArray(e)?e[0]:e}function Bt(e,t){var r,n,o="__create-react-context-"+_t()+"__",i=function(u){z(f,u);function f(){var s;return s=u.apply(this,arguments)||this,s.emitter=Nt(s.props.value),s}var a=f.prototype;return a.getChildContext=function(){var l;return l={},l[o]=this.emitter,l},a.componentWillReceiveProps=function(l){if(this.props.value!==l.value){var h=this.props.value,d=l.value,y;It(h,d)?y=0:(y=typeof t=="function"?t(h,d):Te,y|=0,y!==0&&this.emitter.set(l.value,y))}},a.render=function(){return this.props.children},f}(We.exports.Component);i.childContextTypes=(r={},r[o]=qe.exports.object.isRequired,r);var c=function(u){z(f,u);function f(){var s;return s=u.apply(this,arguments)||this,s.state={value:s.getValue()},s.onUpdate=function(l,h){var d=s.observedBits|0;(d&h)!==0&&s.setState({value:s.getValue()})},s}var a=f.prototype;return a.componentWillReceiveProps=function(l){var h=l.observedBits;this.observedBits=h==null?Te:h},a.componentDidMount=function(){this.context[o]&&this.context[o].on(this.onUpdate);var l=this.props.observedBits;this.observedBits=l==null?Te:l},a.componentWillUnmount=function(){this.context[o]&&this.context[o].off(this.onUpdate)},a.getValue=function(){return this.context[o]?this.context[o].get():e},a.render=function(){return jt(this.props.children)(this.state.value)},f}(We.exports.Component);return c.contextTypes=(n={},n[o]=qe.exports.object,n),{Provider:i,Consumer:c}}var ut=b.createContext||Bt,ee={exports:{}},Dt=Array.isArray||function(e){return Object.prototype.toString.call(e)=="[object Array]"},ce=Dt;ee.exports=ht;ee.exports.parse=Me;ee.exports.compile=Wt;ee.exports.tokensToFunction=ft;ee.exports.tokensToRegExp=lt;var Ft=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function Me(e,t){for(var r=[],n=0,o=0,i="",c=t&&t.delimiter||"/",u;(u=Ft.exec(e))!=null;){var f=u[0],a=u[1],s=u.index;if(i+=e.slice(o,s),o=s+f.length,a){i+=a[1];continue}var l=e[o],h=u[2],d=u[3],y=u[4],E=u[5],L=u[6],T=u[7];i&&(r.push(i),i="");var O=h!=null&&l!=null&&l!==h,j=L==="+"||L==="*",B=L==="?"||L==="*",U=u[2]||c,S=y||E;r.push({name:d||n++,prefix:h||"",delimiter:U,optional:B,repeat:j,partial:O,asterisk:!!T,pattern:S?kt(S):T?".*":"[^"+se(U)+"]+?"})}return o<e.length&&(i+=e.substr(o)),i&&r.push(i),r}function Wt(e,t){return ft(Me(e,t),t)}function qt(e){return encodeURI(e).replace(/[\/?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function Kt(e){return encodeURI(e).replace(/[?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function ft(e,t){for(var r=new Array(e.length),n=0;n<e.length;n++)typeof e[n]=="object"&&(r[n]=new RegExp("^(?:"+e[n].pattern+")$",Ue(t)));return function(o,i){for(var c="",u=o||{},f=i||{},a=f.pretty?qt:encodeURIComponent,s=0;s<e.length;s++){var l=e[s];if(typeof l=="string"){c+=l;continue}var h=u[l.name],d;if(h==null)if(l.optional){l.partial&&(c+=l.prefix);continue}else throw new TypeError('Expected "'+l.name+'" to be defined');if(ce(h)){if(!l.repeat)throw new TypeError('Expected "'+l.name+'" to not repeat, but received `'+JSON.stringify(h)+"`");if(h.length===0){if(l.optional)continue;throw new TypeError('Expected "'+l.name+'" to not be empty')}for(var y=0;y<h.length;y++){if(d=a(h[y]),!r[s].test(d))throw new TypeError('Expected all "'+l.name+'" to match "'+l.pattern+'", but received `'+JSON.stringify(d)+"`");c+=(y===0?l.prefix:l.delimiter)+d}continue}if(d=l.asterisk?Kt(h):a(h),!r[s].test(d))throw new TypeError('Expected "'+l.name+'" to match "'+l.pattern+'", but received "'+d+'"');c+=l.prefix+d}return c}}function se(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function kt(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function He(e,t){return e.keys=t,e}function Ue(e){return e&&e.sensitive?"":"i"}function Gt(e,t){var r=e.source.match(/\((?!\?)/g);if(r)for(var n=0;n<r.length;n++)t.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return He(e,t)}function zt(e,t,r){for(var n=[],o=0;o<e.length;o++)n.push(ht(e[o],t,r).source);var i=new RegExp("(?:"+n.join("|")+")",Ue(r));return He(i,t)}function Vt(e,t,r){return lt(Me(e,r),t,r)}function lt(e,t,r){ce(t)||(r=t||r,t=[]),r=r||{};for(var n=r.strict,o=r.end!==!1,i="",c=0;c<e.length;c++){var u=e[c];if(typeof u=="string")i+=se(u);else{var f=se(u.prefix),a="(?:"+u.pattern+")";t.push(u),u.repeat&&(a+="(?:"+f+a+")*"),u.optional?u.partial?a=f+"("+a+")?":a="(?:"+f+"("+a+"))?":a=f+"("+a+")",i+=a}}var s=se(r.delimiter||"/"),l=i.slice(-s.length)===s;return n||(i=(l?i.slice(0,-s.length):i)+"(?:"+s+"(?=$))?"),o?i+="$":i+=n&&l?"":"(?="+s+"|$)",He(new RegExp("^"+i,Ue(r)),t)}function ht(e,t,r){return ce(t)||(r=t||r,t=[]),r=r||{},e instanceof RegExp?Gt(e,t):ce(e)?zt(e,t,r):Vt(e,t,r)}var pt={exports:{}},w={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var R=typeof Symbol=="function"&&Symbol.for,_e=R?Symbol.for("react.element"):60103,Ie=R?Symbol.for("react.portal"):60106,le=R?Symbol.for("react.fragment"):60107,he=R?Symbol.for("react.strict_mode"):60108,pe=R?Symbol.for("react.profiler"):60114,ve=R?Symbol.for("react.provider"):60109,de=R?Symbol.for("react.context"):60110,Ne=R?Symbol.for("react.async_mode"):60111,me=R?Symbol.for("react.concurrent_mode"):60111,ye=R?Symbol.for("react.forward_ref"):60112,ge=R?Symbol.for("react.suspense"):60113,Jt=R?Symbol.for("react.suspense_list"):60120,xe=R?Symbol.for("react.memo"):60115,we=R?Symbol.for("react.lazy"):60116,Xt=R?Symbol.for("react.block"):60121,Yt=R?Symbol.for("react.fundamental"):60117,Qt=R?Symbol.for("react.responder"):60118,Zt=R?Symbol.for("react.scope"):60119;function W(e){if(typeof e=="object"&&e!==null){var t=e.$$typeof;switch(t){case _e:switch(e=e.type,e){case Ne:case me:case le:case pe:case he:case ge:return e;default:switch(e=e&&e.$$typeof,e){case de:case ye:case we:case xe:case ve:return e;default:return t}}case Ie:return t}}}function vt(e){return W(e)===me}w.AsyncMode=Ne;w.ConcurrentMode=me;w.ContextConsumer=de;w.ContextProvider=ve;w.Element=_e;w.ForwardRef=ye;w.Fragment=le;w.Lazy=we;w.Memo=xe;w.Portal=Ie;w.Profiler=pe;w.StrictMode=he;w.Suspense=ge;w.isAsyncMode=function(e){return vt(e)||W(e)===Ne};w.isConcurrentMode=vt;w.isContextConsumer=function(e){return W(e)===de};w.isContextProvider=function(e){return W(e)===ve};w.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===_e};w.isForwardRef=function(e){return W(e)===ye};w.isFragment=function(e){return W(e)===le};w.isLazy=function(e){return W(e)===we};w.isMemo=function(e){return W(e)===xe};w.isPortal=function(e){return W(e)===Ie};w.isProfiler=function(e){return W(e)===pe};w.isStrictMode=function(e){return W(e)===he};w.isSuspense=function(e){return W(e)===ge};w.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===le||e===me||e===pe||e===he||e===ge||e===Jt||typeof e=="object"&&e!==null&&(e.$$typeof===we||e.$$typeof===xe||e.$$typeof===ve||e.$$typeof===de||e.$$typeof===ye||e.$$typeof===Yt||e.$$typeof===Qt||e.$$typeof===Zt||e.$$typeof===Xt)};w.typeOf=W;(function(e){e.exports=w})(pt);var dt=pt.exports,en={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},tn={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},mt={};mt[dt.ForwardRef]=en;mt[dt.Memo]=tn;var nn=function(t){var r=ut();return r.displayName=t,r},yt=nn("Router-History"),rn=function(t){var r=ut();return r.displayName=t,r},J=rn("Router"),Pe=function(e){z(t,e),t.computeRootMatch=function(o){return{path:"/",url:"/",params:{},isExact:o==="/"}};function t(n){var o;return o=e.call(this,n)||this,o.state={location:n.history.location},o._isMounted=!1,o._pendingLocation=null,n.staticContext||(o.unlisten=n.history.listen(function(i){o._isMounted?o.setState({location:i}):o._pendingLocation=i})),o}var r=t.prototype;return r.componentDidMount=function(){this._isMounted=!0,this._pendingLocation&&this.setState({location:this._pendingLocation})},r.componentWillUnmount=function(){this.unlisten&&this.unlisten()},r.render=function(){return b.createElement(J.Provider,{value:{history:this.props.history,location:this.state.location,match:t.computeRootMatch(this.state.location.pathname),staticContext:this.props.staticContext}},b.createElement(yt.Provider,{children:this.props.children||null,value:this.props.history}))},t}(b.Component);b.Component;var on=function(e){z(t,e);function t(){return e.apply(this,arguments)||this}var r=t.prototype;return r.componentDidMount=function(){this.props.onMount&&this.props.onMount.call(this,this)},r.componentDidUpdate=function(o){this.props.onUpdate&&this.props.onUpdate.call(this,this,o)},r.componentWillUnmount=function(){this.props.onUnmount&&this.props.onUnmount.call(this,this)},r.render=function(){return null},t}(b.Component),$e={},an=1e4,Qe=0;function sn(e){if($e[e])return $e[e];var t=ee.exports.compile(e);return Qe<an&&($e[e]=t,Qe++),t}function Ze(e,t){return e===void 0&&(e="/"),t===void 0&&(t={}),e==="/"?e:sn(e)(t,{pretty:!0})}function xn(e){var t=e.computedMatch,r=e.to,n=e.push,o=n===void 0?!1:n;return b.createElement(J.Consumer,null,function(i){i||X(!1);var c=i.history,u=i.staticContext,f=o?c.push:c.replace,a=N(t?typeof r=="string"?Ze(r,t.params):H({},r,{pathname:Ze(r.pathname,t.params)}):r);return u?(f(a),null):Z(on,{onMount:function(){f(a)},onUpdate:function(l,h){var d=N(h.to);St(d,H({},a,{key:d.key}))||f(a)},to:r})})}var et={},cn=1e4,tt=0;function un(e,t){var r=""+t.end+t.strict+t.sensitive,n=et[r]||(et[r]={});if(n[e])return n[e];var o=[],i=ee.exports(e,o,t),c={regexp:i,keys:o};return tt<cn&&(n[e]=c,tt++),c}function je(e,t){t===void 0&&(t={}),(typeof t=="string"||Array.isArray(t))&&(t={path:t});var r=t,n=r.path,o=r.exact,i=o===void 0?!1:o,c=r.strict,u=c===void 0?!1:c,f=r.sensitive,a=f===void 0?!1:f,s=[].concat(n);return s.reduce(function(l,h){if(!h&&h!=="")return null;if(l)return l;var d=un(h,{end:i,strict:u,sensitive:a}),y=d.regexp,E=d.keys,L=y.exec(e);if(!L)return null;var T=L[0],O=L.slice(1),j=e===T;return i&&!j?null:{path:h,url:h==="/"&&T===""?"/":T,isExact:j,params:E.reduce(function(B,U,S){return B[U.name]=O[S],B},{})}},null)}var wn=function(e){z(t,e);function t(){return e.apply(this,arguments)||this}var r=t.prototype;return r.render=function(){var o=this;return b.createElement(J.Consumer,null,function(i){i||X(!1);var c=o.props.location||i.location,u=o.props.computedMatch?o.props.computedMatch:o.props.path?je(c.pathname,o.props):i.match,f=H({},i,{location:c,match:u}),a=o.props,s=a.children,l=a.component,h=a.render;return Array.isArray(s)&&s.length===0&&(s=null),b.createElement(J.Provider,{value:f},f.match?s?typeof s=="function"?s(f):s:l?b.createElement(l,f):h?h(f):null:typeof s=="function"?s(f):null)})},t}(b.Component);function Be(e){return e.charAt(0)==="/"?e:"/"+e}function fn(e,t){return e?H({},t,{pathname:Be(e)+t.pathname}):t}function ln(e,t){if(!e)return t;var r=Be(e);return t.pathname.indexOf(r)!==0?t:H({},t,{pathname:t.pathname.substr(r.length)})}function nt(e){return typeof e=="string"?e:k(e)}function Ae(e){return function(){X(!1)}}function rt(){}b.Component;var Pn=function(e){z(t,e);function t(){return e.apply(this,arguments)||this}var r=t.prototype;return r.render=function(){var o=this;return b.createElement(J.Consumer,null,function(i){i||X(!1);var c=o.props.location||i.location,u,f;return b.Children.forEach(o.props.children,function(a){if(f==null&&b.isValidElement(a)){u=a;var s=a.props.path||a.props.from;f=s?je(c.pathname,H({},a.props,{path:s})):i.match}}),f?b.cloneElement(u,{location:c,computedMatch:f}):null})},t}(b.Component),gt=b.useContext;function bn(){return gt(yt)}function Cn(){var e=gt(J).match;return e?e.params:{}}b.Component;var En=function(e){z(t,e);function t(){for(var n,o=arguments.length,i=new Array(o),c=0;c<o;c++)i[c]=arguments[c];return n=e.call.apply(e,[this].concat(i))||this,n.history=Ht(n.props),n}var r=t.prototype;return r.render=function(){return Z(Pe,{history:this.history,children:this.props.children})},t}(b.Component),Le=function(t,r){return typeof t=="function"?t(r):t},xt=function(t,r){return typeof t=="string"?N(t,null,null,r):t},De=function(t){return t},ne=b.forwardRef;typeof ne>"u"&&(ne=De);function hn(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}var pn=ne(function(e,t){var r=e.innerRef,n=e.navigate,o=e.onClick,i=fe(e,["innerRef","navigate","onClick"]),c=i.target,u=H({},i,{onClick:function(a){try{o&&o(a)}catch(s){throw a.preventDefault(),s}!a.defaultPrevented&&a.button===0&&(!c||c==="_self")&&!hn(a)&&(a.preventDefault(),n())}});return De!==ne?u.ref=t||r:u.ref=r,Z("a",{...u})}),vn=ne(function(e,t){var r=e.component,n=r===void 0?pn:r,o=e.replace,i=e.to,c=e.innerRef,u=fe(e,["component","replace","to","innerRef"]);return b.createElement(J.Consumer,null,function(f){f||X(!1);var a=f.history,s=xt(Le(i,f.location),f.location),l=s?a.createHref(s):"",h=H({},u,{href:l,navigate:function(){var y=Le(i,f.location),E=o?a.replace:a.push;E(y)}});return De!==ne?h.ref=t||c:h.innerRef=c,b.createElement(n,h)})}),wt=function(t){return t},ue=b.forwardRef;typeof ue>"u"&&(ue=wt);function dn(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter(function(n){return n}).join(" ")}var Sn=ue(function(e,t){var r=e["aria-current"],n=r===void 0?"page":r,o=e.activeClassName,i=o===void 0?"active":o,c=e.activeStyle,u=e.className,f=e.exact,a=e.isActive,s=e.location,l=e.sensitive,h=e.strict,d=e.style,y=e.to,E=e.innerRef,L=fe(e,["aria-current","activeClassName","activeStyle","className","exact","isActive","location","sensitive","strict","style","to","innerRef"]);return b.createElement(J.Consumer,null,function(T){T||X(!1);var O=s||T.location,j=xt(Le(y,O),O),B=j.pathname,U=B&&B.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1"),S=U?je(O.pathname,{path:U,exact:f,sensitive:l,strict:h}):null,x=!!(a?a(S,O):S),P=x?dn(u,i):u,_=x?H({},d,{},c):d,$=H({"aria-current":x&&n||null,className:P,style:_,to:j},L);return wt!==ue?$.ref=t||E:$.innerRef=E,Z(vn,{...$})})});export{En as H,vn as L,Sn as N,wn as R,Pn as S,xn as a,Cn as b,bn as u};
//# sourceMappingURL=react-router-dom.feb326cf.js.map