import{R as w,r as Fe}from"./index.b8fd3884.js";import{P as We}from"./index.014bc556.js";import{_ as ue}from"./objectWithoutPropertiesLoose.5e7699d1.js";function O(){return O=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},O.apply(this,arguments)}function Re(e,t){return Re=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,o){return n.__proto__=o,n},Re(e,t)}function z(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Re(e,t)}function oe(e){return e.charAt(0)==="/"}function be(e,t){for(var r=t,n=r+1,o=e.length;n<o;r+=1,n+=1)e[r]=e[n];e.pop()}function Pt(e,t){t===void 0&&(t="");var r=e&&e.split("/")||[],n=t&&t.split("/")||[],o=e&&oe(e),i=t&&oe(t),c=o||i;if(e&&oe(e)?n=r:r.length&&(n.pop(),n=n.concat(r)),!n.length)return"/";var u;if(n.length){var f=n[n.length-1];u=f==="."||f===".."||f===""}else u=!1;for(var a=0,s=n.length;s>=0;s--){var l=n[s];l==="."?be(n,s):l===".."?(be(n,s),a++):a&&(be(n,s),a--)}if(!c)for(;a--;a)n.unshift("..");c&&n[0]!==""&&(!n[0]||!oe(n[0]))&&n.unshift("");var h=n.join("/");return u&&h.substr(-1)!=="/"&&(h+="/"),h}function qe(e){return e.valueOf?e.valueOf():Object.prototype.valueOf.call(e)}function ie(e,t){if(e===t)return!0;if(e==null||t==null)return!1;if(Array.isArray(e))return Array.isArray(t)&&e.length===t.length&&e.every(function(o,i){return ie(o,t[i])});if(typeof e=="object"||typeof t=="object"){var r=qe(e),n=qe(t);return r!==e||n!==t?ie(r,n):Object.keys(Object.assign({},e,t)).every(function(o){return ie(e[o],t[o])})}return!1}var bt=!0,Ee="Invariant failed";function X(e,t){if(!e){if(bt)throw new Error(Ee);var r=typeof t=="function"?t():t,n=r?Ee+": "+r:Ee;throw new Error(n)}}function re(e){return e.charAt(0)==="/"?e:"/"+e}function Ke(e){return e.charAt(0)==="/"?e.substr(1):e}function Et(e,t){return e.toLowerCase().indexOf(t.toLowerCase())===0&&"/?#".indexOf(e.charAt(t.length))!==-1}function rt(e,t){return Et(e,t)?e.substr(t.length):e}function ot(e){return e.charAt(e.length-1)==="/"?e.slice(0,-1):e}function Ct(e){var t=e||"/",r="",n="",o=t.indexOf("#");o!==-1&&(n=t.substr(o),t=t.substr(0,o));var i=t.indexOf("?");return i!==-1&&(r=t.substr(i),t=t.substr(0,i)),{pathname:t,search:r==="?"?"":r,hash:n==="#"?"":n}}function k(e){var t=e.pathname,r=e.search,n=e.hash,o=t||"/";return r&&r!=="?"&&(o+=r.charAt(0)==="?"?r:"?"+r),n&&n!=="#"&&(o+=n.charAt(0)==="#"?n:"#"+n),o}function N(e,t,r,n){var o;typeof e=="string"?(o=Ct(e),o.state=t):(o=O({},e),o.pathname===void 0&&(o.pathname=""),o.search?o.search.charAt(0)!=="?"&&(o.search="?"+o.search):o.search="",o.hash?o.hash.charAt(0)!=="#"&&(o.hash="#"+o.hash):o.hash="",t!==void 0&&o.state===void 0&&(o.state=t));try{o.pathname=decodeURI(o.pathname)}catch(i){throw i instanceof URIError?new URIError('Pathname "'+o.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):i}return r&&(o.key=r),n?o.pathname?o.pathname.charAt(0)!=="/"&&(o.pathname=Pt(o.pathname,n.pathname)):o.pathname=n.pathname:o.pathname||(o.pathname="/"),o}function St(e,t){return e.pathname===t.pathname&&e.search===t.search&&e.hash===t.hash&&e.key===t.key&&ie(e.state,t.state)}function Le(){var e=null;function t(c){return e=c,function(){e===c&&(e=null)}}function r(c,u,f,a){if(e!=null){var s=typeof e=="function"?e(c,u):e;typeof s=="string"?typeof f=="function"?f(s,a):a(!0):a(s!==!1)}else a(!0)}var n=[];function o(c){var u=!0;function f(){u&&c.apply(void 0,arguments)}return n.push(f),function(){u=!1,n=n.filter(function(a){return a!==f})}}function i(){for(var c=arguments.length,u=new Array(c),f=0;f<c;f++)u[f]=arguments[f];n.forEach(function(a){return a.apply(void 0,u)})}return{setPrompt:t,confirmTransitionTo:r,appendListener:o,notifyListeners:i}}var it=!!(typeof window!="undefined"&&window.document&&window.document.createElement);function at(e,t){t(window.confirm(e))}function Tt(){var e=window.navigator.userAgent;return(e.indexOf("Android 2.")!==-1||e.indexOf("Android 4.0")!==-1)&&e.indexOf("Mobile Safari")!==-1&&e.indexOf("Chrome")===-1&&e.indexOf("Windows Phone")===-1?!1:window.history&&"pushState"in window.history}function $t(){return window.navigator.userAgent.indexOf("Trident")===-1}function Rt(){return window.navigator.userAgent.indexOf("Firefox")===-1}function At(e){return e.state===void 0&&navigator.userAgent.indexOf("CriOS")===-1}var ke="popstate",Ge="hashchange";function ze(){try{return window.history.state||{}}catch{return{}}}function Lt(e){e===void 0&&(e={}),it||X(!1);var t=window.history,r=Tt(),n=!$t(),o=e,i=o.forceRefresh,c=i===void 0?!1:i,u=o.getUserConfirmation,f=u===void 0?at:u,a=o.keyLength,s=a===void 0?6:a,l=e.basename?ot(re(e.basename)):"";function h(v){var p=v||{},g=p.key,m=p.state,E=window.location,H=E.pathname,F=E.search,G=E.hash,K=H+F+G;return l&&(K=rt(K,l)),N(K,m,g)}function d(){return Math.random().toString(36).substr(2,s)}var y=Le();function C(v){O(q,v),q.length=t.length,y.notifyListeners(q.location,q.action)}function L(v){At(v)||j(h(v.state))}function T(){j(h(ze()))}var M=!1;function j(v){if(M)M=!1,C();else{var p="POP";y.confirmTransitionTo(v,p,f,function(g){g?C({action:p,location:v}):B(v)})}}function B(v){var p=q.location,g=S.indexOf(p.key);g===-1&&(g=0);var m=S.indexOf(v.key);m===-1&&(m=0);var E=g-m;E&&(M=!0,$(E))}var U=h(ze()),S=[U.key];function x(v){return l+k(v)}function b(v,p){var g="PUSH",m=N(v,p,d(),q.location);y.confirmTransitionTo(m,g,f,function(E){if(!!E){var H=x(m),F=m.key,G=m.state;if(r)if(t.pushState({key:F,state:G},null,H),c)window.location.href=H;else{var K=S.indexOf(q.location.key),Q=S.slice(0,K+1);Q.push(m.key),S=Q,C({action:g,location:m})}else window.location.href=H}})}function _(v,p){var g="REPLACE",m=N(v,p,d(),q.location);y.confirmTransitionTo(m,g,f,function(E){if(!!E){var H=x(m),F=m.key,G=m.state;if(r)if(t.replaceState({key:F,state:G},null,H),c)window.location.replace(H);else{var K=S.indexOf(q.location.key);K!==-1&&(S[K]=m.key),C({action:g,location:m})}else window.location.replace(H)}})}function $(v){t.go(v)}function R(){$(-1)}function V(){$(1)}var Y=0;function D(v){Y+=v,Y===1&&v===1?(window.addEventListener(ke,L),n&&window.addEventListener(Ge,T)):Y===0&&(window.removeEventListener(ke,L),n&&window.removeEventListener(Ge,T))}var I=!1;function Z(v){v===void 0&&(v=!1);var p=y.setPrompt(v);return I||(D(1),I=!0),function(){return I&&(I=!1,D(-1)),p()}}function Pe(v){var p=y.appendListener(v);return D(1),function(){D(-1),p()}}var q={length:t.length,action:"POP",location:U,createHref:x,push:b,replace:_,go:$,goBack:R,goForward:V,block:Z,listen:Pe};return q}var Ve="hashchange",Ot={hashbang:{encodePath:function(t){return t.charAt(0)==="!"?t:"!/"+Ke(t)},decodePath:function(t){return t.charAt(0)==="!"?t.substr(1):t}},noslash:{encodePath:Ke,decodePath:re},slash:{encodePath:re,decodePath:re}};function st(e){var t=e.indexOf("#");return t===-1?e:e.slice(0,t)}function ne(){var e=window.location.href,t=e.indexOf("#");return t===-1?"":e.substring(t+1)}function Mt(e){window.location.hash=e}function Ce(e){window.location.replace(st(window.location.href)+"#"+e)}function Ht(e){e===void 0&&(e={}),it||X(!1);var t=window.history;Rt();var r=e,n=r.getUserConfirmation,o=n===void 0?at:n,i=r.hashType,c=i===void 0?"slash":i,u=e.basename?ot(re(e.basename)):"",f=Ot[c],a=f.encodePath,s=f.decodePath;function l(){var p=s(ne());return u&&(p=rt(p,u)),N(p)}var h=Le();function d(p){O(v,p),v.length=t.length,h.notifyListeners(v.location,v.action)}var y=!1,C=null;function L(p,g){return p.pathname===g.pathname&&p.search===g.search&&p.hash===g.hash}function T(){var p=ne(),g=a(p);if(p!==g)Ce(g);else{var m=l(),E=v.location;if(!y&&L(E,m)||C===k(m))return;C=null,M(m)}}function M(p){if(y)y=!1,d();else{var g="POP";h.confirmTransitionTo(p,g,o,function(m){m?d({action:g,location:p}):j(p)})}}function j(p){var g=v.location,m=x.lastIndexOf(k(g));m===-1&&(m=0);var E=x.lastIndexOf(k(p));E===-1&&(E=0);var H=m-E;H&&(y=!0,R(H))}var B=ne(),U=a(B);B!==U&&Ce(U);var S=l(),x=[k(S)];function b(p){var g=document.querySelector("base"),m="";return g&&g.getAttribute("href")&&(m=st(window.location.href)),m+"#"+a(u+k(p))}function _(p,g){var m="PUSH",E=N(p,void 0,void 0,v.location);h.confirmTransitionTo(E,m,o,function(H){if(!!H){var F=k(E),G=a(u+F),K=ne()!==G;if(K){C=F,Mt(G);var Q=x.lastIndexOf(k(v.location)),De=x.slice(0,Q+1);De.push(F),x=De,d({action:m,location:E})}else d()}})}function $(p,g){var m="REPLACE",E=N(p,void 0,void 0,v.location);h.confirmTransitionTo(E,m,o,function(H){if(!!H){var F=k(E),G=a(u+F),K=ne()!==G;K&&(C=F,Ce(G));var Q=x.indexOf(k(v.location));Q!==-1&&(x[Q]=F),d({action:m,location:E})}})}function R(p){t.go(p)}function V(){R(-1)}function Y(){R(1)}var D=0;function I(p){D+=p,D===1&&p===1?window.addEventListener(Ve,T):D===0&&window.removeEventListener(Ve,T)}var Z=!1;function Pe(p){p===void 0&&(p=!1);var g=h.setPrompt(p);return Z||(I(1),Z=!0),function(){return Z&&(Z=!1,I(-1)),g()}}function q(p){var g=h.appendListener(p);return I(1),function(){I(-1),g()}}var v={length:t.length,action:"POP",location:S,createHref:b,push:_,replace:$,go:R,goBack:V,goForward:Y,block:Pe,listen:q};return v}function Je(e,t,r){return Math.min(Math.max(e,t),r)}function Ut(e){e===void 0&&(e={});var t=e,r=t.getUserConfirmation,n=t.initialEntries,o=n===void 0?["/"]:n,i=t.initialIndex,c=i===void 0?0:i,u=t.keyLength,f=u===void 0?6:u,a=Le();function s(b){O(x,b),x.length=x.entries.length,a.notifyListeners(x.location,x.action)}function l(){return Math.random().toString(36).substr(2,f)}var h=Je(c,0,o.length-1),d=o.map(function(b){return typeof b=="string"?N(b,void 0,l()):N(b,void 0,b.key||l())}),y=k;function C(b,_){var $="PUSH",R=N(b,_,l(),x.location);a.confirmTransitionTo(R,$,r,function(V){if(!!V){var Y=x.index,D=Y+1,I=x.entries.slice(0);I.length>D?I.splice(D,I.length-D,R):I.push(R),s({action:$,location:R,index:D,entries:I})}})}function L(b,_){var $="REPLACE",R=N(b,_,l(),x.location);a.confirmTransitionTo(R,$,r,function(V){!V||(x.entries[x.index]=R,s({action:$,location:R}))})}function T(b){var _=Je(x.index+b,0,x.entries.length-1),$="POP",R=x.entries[_];a.confirmTransitionTo(R,$,r,function(V){V?s({action:$,location:R,index:_}):s()})}function M(){T(-1)}function j(){T(1)}function B(b){var _=x.index+b;return _>=0&&_<x.entries.length}function U(b){return b===void 0&&(b=!1),a.setPrompt(b)}function S(b){return a.appendListener(b)}var x={length:d.length,action:"POP",location:d[h],index:h,entries:d,createHref:y,push:C,replace:L,go:T,goBack:M,goForward:j,canGo:B,block:U,listen:S};return x}var Se=1073741823,Xe=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:{};function _t(){var e="__global_unique_id__";return Xe[e]=(Xe[e]||0)+1}function It(e,t){return e===t?e!==0||1/e===1/t:e!==e&&t!==t}function Nt(e){var t=[];return{on:function(n){t.push(n)},off:function(n){t=t.filter(function(o){return o!==n})},get:function(){return e},set:function(n,o){e=n,t.forEach(function(i){return i(e,o)})}}}function jt(e){return Array.isArray(e)?e[0]:e}function Bt(e,t){var r,n,o="__create-react-context-"+_t()+"__",i=function(u){z(f,u);function f(){var s;return s=u.apply(this,arguments)||this,s.emitter=Nt(s.props.value),s}var a=f.prototype;return a.getChildContext=function(){var l;return l={},l[o]=this.emitter,l},a.componentWillReceiveProps=function(l){if(this.props.value!==l.value){var h=this.props.value,d=l.value,y;It(h,d)?y=0:(y=typeof t=="function"?t(h,d):Se,y|=0,y!==0&&this.emitter.set(l.value,y))}},a.render=function(){return this.props.children},f}(Fe.exports.Component);i.childContextTypes=(r={},r[o]=We.object.isRequired,r);var c=function(u){z(f,u);function f(){var s;return s=u.apply(this,arguments)||this,s.state={value:s.getValue()},s.onUpdate=function(l,h){var d=s.observedBits|0;(d&h)!==0&&s.setState({value:s.getValue()})},s}var a=f.prototype;return a.componentWillReceiveProps=function(l){var h=l.observedBits;this.observedBits=h==null?Se:h},a.componentDidMount=function(){this.context[o]&&this.context[o].on(this.onUpdate);var l=this.props.observedBits;this.observedBits=l==null?Se:l},a.componentWillUnmount=function(){this.context[o]&&this.context[o].off(this.onUpdate)},a.getValue=function(){return this.context[o]?this.context[o].get():e},a.render=function(){return jt(this.props.children)(this.state.value)},f}(Fe.exports.Component);return c.contextTypes=(n={},n[o]=We.object,n),{Provider:i,Consumer:c}}var ct=w.createContext||Bt,te={exports:{}},Dt=Array.isArray||function(e){return Object.prototype.toString.call(e)=="[object Array]"},se=Dt;te.exports=lt;te.exports.parse=Oe;te.exports.compile=Wt;te.exports.tokensToFunction=ut;te.exports.tokensToRegExp=ft;var Ft=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function Oe(e,t){for(var r=[],n=0,o=0,i="",c=t&&t.delimiter||"/",u;(u=Ft.exec(e))!=null;){var f=u[0],a=u[1],s=u.index;if(i+=e.slice(o,s),o=s+f.length,a){i+=a[1];continue}var l=e[o],h=u[2],d=u[3],y=u[4],C=u[5],L=u[6],T=u[7];i&&(r.push(i),i="");var M=h!=null&&l!=null&&l!==h,j=L==="+"||L==="*",B=L==="?"||L==="*",U=u[2]||c,S=y||C;r.push({name:d||n++,prefix:h||"",delimiter:U,optional:B,repeat:j,partial:M,asterisk:!!T,pattern:S?kt(S):T?".*":"[^"+ae(U)+"]+?"})}return o<e.length&&(i+=e.substr(o)),i&&r.push(i),r}function Wt(e,t){return ut(Oe(e,t),t)}function qt(e){return encodeURI(e).replace(/[\/?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function Kt(e){return encodeURI(e).replace(/[?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function ut(e,t){for(var r=new Array(e.length),n=0;n<e.length;n++)typeof e[n]=="object"&&(r[n]=new RegExp("^(?:"+e[n].pattern+")$",He(t)));return function(o,i){for(var c="",u=o||{},f=i||{},a=f.pretty?qt:encodeURIComponent,s=0;s<e.length;s++){var l=e[s];if(typeof l=="string"){c+=l;continue}var h=u[l.name],d;if(h==null)if(l.optional){l.partial&&(c+=l.prefix);continue}else throw new TypeError('Expected "'+l.name+'" to be defined');if(se(h)){if(!l.repeat)throw new TypeError('Expected "'+l.name+'" to not repeat, but received `'+JSON.stringify(h)+"`");if(h.length===0){if(l.optional)continue;throw new TypeError('Expected "'+l.name+'" to not be empty')}for(var y=0;y<h.length;y++){if(d=a(h[y]),!r[s].test(d))throw new TypeError('Expected all "'+l.name+'" to match "'+l.pattern+'", but received `'+JSON.stringify(d)+"`");c+=(y===0?l.prefix:l.delimiter)+d}continue}if(d=l.asterisk?Kt(h):a(h),!r[s].test(d))throw new TypeError('Expected "'+l.name+'" to match "'+l.pattern+'", but received "'+d+'"');c+=l.prefix+d}return c}}function ae(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function kt(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function Me(e,t){return e.keys=t,e}function He(e){return e&&e.sensitive?"":"i"}function Gt(e,t){var r=e.source.match(/\((?!\?)/g);if(r)for(var n=0;n<r.length;n++)t.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return Me(e,t)}function zt(e,t,r){for(var n=[],o=0;o<e.length;o++)n.push(lt(e[o],t,r).source);var i=new RegExp("(?:"+n.join("|")+")",He(r));return Me(i,t)}function Vt(e,t,r){return ft(Oe(e,r),t,r)}function ft(e,t,r){se(t)||(r=t||r,t=[]),r=r||{};for(var n=r.strict,o=r.end!==!1,i="",c=0;c<e.length;c++){var u=e[c];if(typeof u=="string")i+=ae(u);else{var f=ae(u.prefix),a="(?:"+u.pattern+")";t.push(u),u.repeat&&(a+="(?:"+f+a+")*"),u.optional?u.partial?a=f+"("+a+")?":a="(?:"+f+"("+a+"))?":a=f+"("+a+")",i+=a}}var s=ae(r.delimiter||"/"),l=i.slice(-s.length)===s;return n||(i=(l?i.slice(0,-s.length):i)+"(?:"+s+"(?=$))?"),o?i+="$":i+=n&&l?"":"(?="+s+"|$)",Me(new RegExp("^"+i,He(r)),t)}function lt(e,t,r){return se(t)||(r=t||r,t=[]),r=r||{},e instanceof RegExp?Gt(e,t):se(e)?zt(e,t,r):Vt(e,t,r)}var ht=te.exports,pt={exports:{}},P={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var A=typeof Symbol=="function"&&Symbol.for,Ue=A?Symbol.for("react.element"):60103,_e=A?Symbol.for("react.portal"):60106,fe=A?Symbol.for("react.fragment"):60107,le=A?Symbol.for("react.strict_mode"):60108,he=A?Symbol.for("react.profiler"):60114,pe=A?Symbol.for("react.provider"):60109,ve=A?Symbol.for("react.context"):60110,Ie=A?Symbol.for("react.async_mode"):60111,de=A?Symbol.for("react.concurrent_mode"):60111,me=A?Symbol.for("react.forward_ref"):60112,ye=A?Symbol.for("react.suspense"):60113,Jt=A?Symbol.for("react.suspense_list"):60120,ge=A?Symbol.for("react.memo"):60115,xe=A?Symbol.for("react.lazy"):60116,Xt=A?Symbol.for("react.block"):60121,Yt=A?Symbol.for("react.fundamental"):60117,Qt=A?Symbol.for("react.responder"):60118,Zt=A?Symbol.for("react.scope"):60119;function W(e){if(typeof e=="object"&&e!==null){var t=e.$$typeof;switch(t){case Ue:switch(e=e.type,e){case Ie:case de:case fe:case he:case le:case ye:return e;default:switch(e=e&&e.$$typeof,e){case ve:case me:case xe:case ge:case pe:return e;default:return t}}case _e:return t}}}function vt(e){return W(e)===de}P.AsyncMode=Ie;P.ConcurrentMode=de;P.ContextConsumer=ve;P.ContextProvider=pe;P.Element=Ue;P.ForwardRef=me;P.Fragment=fe;P.Lazy=xe;P.Memo=ge;P.Portal=_e;P.Profiler=he;P.StrictMode=le;P.Suspense=ye;P.isAsyncMode=function(e){return vt(e)||W(e)===Ie};P.isConcurrentMode=vt;P.isContextConsumer=function(e){return W(e)===ve};P.isContextProvider=function(e){return W(e)===pe};P.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ue};P.isForwardRef=function(e){return W(e)===me};P.isFragment=function(e){return W(e)===fe};P.isLazy=function(e){return W(e)===xe};P.isMemo=function(e){return W(e)===ge};P.isPortal=function(e){return W(e)===_e};P.isProfiler=function(e){return W(e)===he};P.isStrictMode=function(e){return W(e)===le};P.isSuspense=function(e){return W(e)===ye};P.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===fe||e===de||e===he||e===le||e===ye||e===Jt||typeof e=="object"&&e!==null&&(e.$$typeof===xe||e.$$typeof===ge||e.$$typeof===pe||e.$$typeof===ve||e.$$typeof===me||e.$$typeof===Yt||e.$$typeof===Qt||e.$$typeof===Zt||e.$$typeof===Xt)};P.typeOf=W;pt.exports=P;var dt=pt.exports,en={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},tn={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},mt={};mt[dt.ForwardRef]=en;mt[dt.Memo]=tn;var nn=function(t){var r=ct();return r.displayName=t,r},yt=nn("Router-History"),rn=function(t){var r=ct();return r.displayName=t,r},J=rn("Router"),we=function(e){z(t,e),t.computeRootMatch=function(o){return{path:"/",url:"/",params:{},isExact:o==="/"}};function t(n){var o;return o=e.call(this,n)||this,o.state={location:n.history.location},o._isMounted=!1,o._pendingLocation=null,n.staticContext||(o.unlisten=n.history.listen(function(i){o._isMounted?o.setState({location:i}):o._pendingLocation=i})),o}var r=t.prototype;return r.componentDidMount=function(){this._isMounted=!0,this._pendingLocation&&this.setState({location:this._pendingLocation})},r.componentWillUnmount=function(){this.unlisten&&this.unlisten()},r.render=function(){return w.createElement(J.Provider,{value:{history:this.props.history,location:this.state.location,match:t.computeRootMatch(this.state.location.pathname),staticContext:this.props.staticContext}},w.createElement(yt.Provider,{children:this.props.children||null,value:this.props.history}))},t}(w.Component);w.Component;var on=function(e){z(t,e);function t(){return e.apply(this,arguments)||this}var r=t.prototype;return r.componentDidMount=function(){this.props.onMount&&this.props.onMount.call(this,this)},r.componentDidUpdate=function(o){this.props.onUpdate&&this.props.onUpdate.call(this,this,o)},r.componentWillUnmount=function(){this.props.onUnmount&&this.props.onUnmount.call(this,this)},r.render=function(){return null},t}(w.Component),Te={},an=1e4,Ye=0;function sn(e){if(Te[e])return Te[e];var t=ht.compile(e);return Ye<an&&(Te[e]=t,Ye++),t}function Qe(e,t){return e===void 0&&(e="/"),t===void 0&&(t={}),e==="/"?e:sn(e)(t,{pretty:!0})}function xn(e){var t=e.computedMatch,r=e.to,n=e.push,o=n===void 0?!1:n;return w.createElement(J.Consumer,null,function(i){i||X(!1);var c=i.history,u=i.staticContext,f=o?c.push:c.replace,a=N(t?typeof r=="string"?Qe(r,t.params):O({},r,{pathname:Qe(r.pathname,t.params)}):r);return u?(f(a),null):w.createElement(on,{onMount:function(){f(a)},onUpdate:function(l,h){var d=N(h.to);St(d,O({},a,{key:d.key}))||f(a)},to:r})})}var Ze={},cn=1e4,et=0;function un(e,t){var r=""+t.end+t.strict+t.sensitive,n=Ze[r]||(Ze[r]={});if(n[e])return n[e];var o=[],i=ht(e,o,t),c={regexp:i,keys:o};return et<cn&&(n[e]=c,et++),c}function Ne(e,t){t===void 0&&(t={}),(typeof t=="string"||Array.isArray(t))&&(t={path:t});var r=t,n=r.path,o=r.exact,i=o===void 0?!1:o,c=r.strict,u=c===void 0?!1:c,f=r.sensitive,a=f===void 0?!1:f,s=[].concat(n);return s.reduce(function(l,h){if(!h&&h!=="")return null;if(l)return l;var d=un(h,{end:i,strict:u,sensitive:a}),y=d.regexp,C=d.keys,L=y.exec(e);if(!L)return null;var T=L[0],M=L.slice(1),j=e===T;return i&&!j?null:{path:h,url:h==="/"&&T===""?"/":T,isExact:j,params:C.reduce(function(B,U,S){return B[U.name]=M[S],B},{})}},null)}var wn=function(e){z(t,e);function t(){return e.apply(this,arguments)||this}var r=t.prototype;return r.render=function(){var o=this;return w.createElement(J.Consumer,null,function(i){i||X(!1);var c=o.props.location||i.location,u=o.props.computedMatch?o.props.computedMatch:o.props.path?Ne(c.pathname,o.props):i.match,f=O({},i,{location:c,match:u}),a=o.props,s=a.children,l=a.component,h=a.render;return Array.isArray(s)&&s.length===0&&(s=null),w.createElement(J.Provider,{value:f},f.match?s?typeof s=="function"?s(f):s:l?w.createElement(l,f):h?h(f):null:typeof s=="function"?s(f):null)})},t}(w.Component);function je(e){return e.charAt(0)==="/"?e:"/"+e}function fn(e,t){return e?O({},t,{pathname:je(e)+t.pathname}):t}function ln(e,t){if(!e)return t;var r=je(e);return t.pathname.indexOf(r)!==0?t:O({},t,{pathname:t.pathname.substr(r.length)})}function tt(e){return typeof e=="string"?e:k(e)}function $e(e){return function(){X(!1)}}function nt(){}w.Component;var Pn=function(e){z(t,e);function t(){return e.apply(this,arguments)||this}var r=t.prototype;return r.render=function(){var o=this;return w.createElement(J.Consumer,null,function(i){i||X(!1);var c=o.props.location||i.location,u,f;return w.Children.forEach(o.props.children,function(a){if(f==null&&w.isValidElement(a)){u=a;var s=a.props.path||a.props.from;f=s?Ne(c.pathname,O({},a.props,{path:s})):i.match}}),f?w.cloneElement(u,{location:c,computedMatch:f}):null})},t}(w.Component),gt=w.useContext;function bn(){return gt(yt)}function En(){var e=gt(J).match;return e?e.params:{}}w.Component;var Cn=function(e){z(t,e);function t(){for(var n,o=arguments.length,i=new Array(o),c=0;c<o;c++)i[c]=arguments[c];return n=e.call.apply(e,[this].concat(i))||this,n.history=Ht(n.props),n}var r=t.prototype;return r.render=function(){return w.createElement(we,{history:this.history,children:this.props.children})},t}(w.Component),Ae=function(t,r){return typeof t=="function"?t(r):t},xt=function(t,r){return typeof t=="string"?N(t,null,null,r):t},Be=function(t){return t},ee=w.forwardRef;typeof ee=="undefined"&&(ee=Be);function hn(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}var pn=ee(function(e,t){var r=e.innerRef,n=e.navigate,o=e.onClick,i=ue(e,["innerRef","navigate","onClick"]),c=i.target,u=O({},i,{onClick:function(a){try{o&&o(a)}catch(s){throw a.preventDefault(),s}!a.defaultPrevented&&a.button===0&&(!c||c==="_self")&&!hn(a)&&(a.preventDefault(),n())}});return Be!==ee?u.ref=t||r:u.ref=r,w.createElement("a",u)}),vn=ee(function(e,t){var r=e.component,n=r===void 0?pn:r,o=e.replace,i=e.to,c=e.innerRef,u=ue(e,["component","replace","to","innerRef"]);return w.createElement(J.Consumer,null,function(f){f||X(!1);var a=f.history,s=xt(Ae(i,f.location),f.location),l=s?a.createHref(s):"",h=O({},u,{href:l,navigate:function(){var y=Ae(i,f.location),C=o?a.replace:a.push;C(y)}});return Be!==ee?h.ref=t||c:h.innerRef=c,w.createElement(n,h)})}),wt=function(t){return t},ce=w.forwardRef;typeof ce=="undefined"&&(ce=wt);function dn(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter(function(n){return n}).join(" ")}var Sn=ce(function(e,t){var r=e["aria-current"],n=r===void 0?"page":r,o=e.activeClassName,i=o===void 0?"active":o,c=e.activeStyle,u=e.className,f=e.exact,a=e.isActive,s=e.location,l=e.sensitive,h=e.strict,d=e.style,y=e.to,C=e.innerRef,L=ue(e,["aria-current","activeClassName","activeStyle","className","exact","isActive","location","sensitive","strict","style","to","innerRef"]);return w.createElement(J.Consumer,null,function(T){T||X(!1);var M=s||T.location,j=xt(Ae(y,M),M),B=j.pathname,U=B&&B.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1"),S=U?Ne(M.pathname,{path:U,exact:f,sensitive:l,strict:h}):null,x=!!(a?a(S,M):S),b=x?dn(u,i):u,_=x?O({},d,{},c):d,$=O({"aria-current":x&&n||null,className:b,style:_,to:j},L);return wt!==ce?$.ref=t||C:$.innerRef=C,w.createElement(vn,$)})});export{Cn as H,vn as L,Sn as N,wn as R,Pn as S,xn as a,En as b,bn as u};
//# sourceMappingURL=react-router-dom.2fcfabae.js.map
