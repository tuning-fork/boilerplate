import{j,r as w}from"./jsx-runtime.2d63e2ec.js";import{g as rr}from"./iframe.bfd22f3a.js";import{c as tr}from"./clsx.m.c5ef2623.js";var Le={exports:{}},ne={exports:{}},De=function(e,n){return function(){for(var t=new Array(arguments.length),s=0;s<t.length;s++)t[s]=arguments[s];return e.apply(n,t)}},nr=De,x=Object.prototype.toString;function ae(r){return x.call(r)==="[object Array]"}function re(r){return typeof r>"u"}function ar(r){return r!==null&&!re(r)&&r.constructor!==null&&!re(r.constructor)&&typeof r.constructor.isBuffer=="function"&&r.constructor.isBuffer(r)}function sr(r){return x.call(r)==="[object ArrayBuffer]"}function ir(r){return typeof FormData<"u"&&r instanceof FormData}function or(r){var e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(r):e=r&&r.buffer&&r.buffer instanceof ArrayBuffer,e}function ur(r){return typeof r=="string"}function cr(r){return typeof r=="number"}function Ie(r){return r!==null&&typeof r=="object"}function P(r){if(x.call(r)!=="[object Object]")return!1;var e=Object.getPrototypeOf(r);return e===null||e===Object.prototype}function lr(r){return x.call(r)==="[object Date]"}function fr(r){return x.call(r)==="[object File]"}function dr(r){return x.call(r)==="[object Blob]"}function Be(r){return x.call(r)==="[object Function]"}function hr(r){return Ie(r)&&Be(r.pipe)}function pr(r){return typeof URLSearchParams<"u"&&r instanceof URLSearchParams}function mr(r){return r.trim?r.trim():r.replace(/^\s+|\s+$/g,"")}function vr(){return typeof navigator<"u"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")?!1:typeof window<"u"&&typeof document<"u"}function se(r,e){if(!(r===null||typeof r>"u"))if(typeof r!="object"&&(r=[r]),ae(r))for(var n=0,a=r.length;n<a;n++)e.call(null,r[n],n,r);else for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&e.call(null,r[t],t,r)}function te(){var r={};function e(t,s){P(r[s])&&P(t)?r[s]=te(r[s],t):P(t)?r[s]=te({},t):ae(t)?r[s]=t.slice():r[s]=t}for(var n=0,a=arguments.length;n<a;n++)se(arguments[n],e);return r}function yr(r,e,n){return se(e,function(t,s){n&&typeof t=="function"?r[s]=nr(t,n):r[s]=t}),r}function Er(r){return r.charCodeAt(0)===65279&&(r=r.slice(1)),r}var v={isArray:ae,isArrayBuffer:sr,isBuffer:ar,isFormData:ir,isArrayBufferView:or,isString:ur,isNumber:cr,isObject:Ie,isPlainObject:P,isUndefined:re,isDate:lr,isFile:fr,isBlob:dr,isFunction:Be,isStream:hr,isURLSearchParams:pr,isStandardBrowserEnv:vr,forEach:se,merge:te,extend:yr,trim:mr,stripBOM:Er},S=v;function de(r){return encodeURIComponent(r).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var $e=function(e,n,a){if(!n)return e;var t;if(a)t=a(n);else if(S.isURLSearchParams(n))t=n.toString();else{var s=[];S.forEach(n,function(l,i){l===null||typeof l>"u"||(S.isArray(l)?i=i+"[]":l=[l],S.forEach(l,function(h){S.isDate(h)?h=h.toISOString():S.isObject(h)&&(h=JSON.stringify(h)),s.push(de(i)+"="+de(h))}))}),t=s.join("&")}if(t){var o=e.indexOf("#");o!==-1&&(e=e.slice(0,o)),e+=(e.indexOf("?")===-1?"?":"&")+t}return e},br=v;function T(){this.handlers=[]}T.prototype.use=function(e,n,a){return this.handlers.push({fulfilled:e,rejected:n,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1};T.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)};T.prototype.forEach=function(e){br.forEach(this.handlers,function(a){a!==null&&e(a)})};var wr=T,gr=v,xr=function(e,n){gr.forEach(e,function(t,s){s!==n&&s.toUpperCase()===n.toUpperCase()&&(e[n]=t,delete e[s])})},_e=function(e,n,a,t,s){return e.config=n,a&&(e.code=a),e.request=t,e.response=s,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e},I,he;function Fe(){if(he)return I;he=1;var r=_e;return I=function(n,a,t,s,o){var u=new Error(n);return r(u,a,t,s,o)},I}var B,pe;function Sr(){if(pe)return B;pe=1;var r=Fe();return B=function(n,a,t){var s=t.config.validateStatus;!t.status||!s||s(t.status)?n(t):a(r("Request failed with status code "+t.status,t.config,null,t.request,t))},B}var $,me;function Cr(){if(me)return $;me=1;var r=v;return $=r.isStandardBrowserEnv()?function(){return{write:function(a,t,s,o,u,l){var i=[];i.push(a+"="+encodeURIComponent(t)),r.isNumber(s)&&i.push("expires="+new Date(s).toGMTString()),r.isString(o)&&i.push("path="+o),r.isString(u)&&i.push("domain="+u),l===!0&&i.push("secure"),document.cookie=i.join("; ")},read:function(a){var t=document.cookie.match(new RegExp("(^|;\\s*)("+a+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(a){this.write(a,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),$}var _,ve;function Rr(){return ve||(ve=1,_=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}),_}var F,ye;function Or(){return ye||(ye=1,F=function(e,n){return n?e.replace(/\/+$/,"")+"/"+n.replace(/^\/+/,""):e}),F}var H,Ee;function Nr(){if(Ee)return H;Ee=1;var r=Rr(),e=Or();return H=function(a,t){return a&&!r(t)?e(a,t):t},H}var M,be;function Ar(){if(be)return M;be=1;var r=v,e=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];return M=function(a){var t={},s,o,u;return a&&r.forEach(a.split(`
`),function(i){if(u=i.indexOf(":"),s=r.trim(i.substr(0,u)).toLowerCase(),o=r.trim(i.substr(u+1)),s){if(t[s]&&e.indexOf(s)>=0)return;s==="set-cookie"?t[s]=(t[s]?t[s]:[]).concat([o]):t[s]=t[s]?t[s]+", "+o:o}}),t},M}var J,we;function jr(){if(we)return J;we=1;var r=v;return J=r.isStandardBrowserEnv()?function(){var n=/(msie|trident)/i.test(navigator.userAgent),a=document.createElement("a"),t;function s(o){var u=o;return n&&(a.setAttribute("href",u),u=a.href),a.setAttribute("href",u),{href:a.href,protocol:a.protocol?a.protocol.replace(/:$/,""):"",host:a.host,search:a.search?a.search.replace(/^\?/,""):"",hash:a.hash?a.hash.replace(/^#/,""):"",hostname:a.hostname,port:a.port,pathname:a.pathname.charAt(0)==="/"?a.pathname:"/"+a.pathname}}return t=s(window.location.href),function(u){var l=r.isString(u)?s(u):u;return l.protocol===t.protocol&&l.host===t.host}}():function(){return function(){return!0}}(),J}var z,ge;function xe(){if(ge)return z;ge=1;var r=v,e=Sr(),n=Cr(),a=$e,t=Nr(),s=Ar(),o=jr(),u=Fe();return z=function(i){return new Promise(function(h,d){var f=i.data,O=i.headers,N=i.responseType;r.isFormData(f)&&delete O["Content-Type"];var c=new XMLHttpRequest;if(i.auth){var Ze=i.auth.username||"",er=i.auth.password?unescape(encodeURIComponent(i.auth.password)):"";O.Authorization="Basic "+btoa(Ze+":"+er)}var ce=t(i.baseURL,i.url);c.open(i.method.toUpperCase(),a(ce,i.params,i.paramsSerializer),!0),c.timeout=i.timeout;function le(){if(!!c){var g="getAllResponseHeaders"in c?s(c.getAllResponseHeaders()):null,b=!N||N==="text"||N==="json"?c.responseText:c.response,A={data:b,status:c.status,statusText:c.statusText,headers:g,config:i,request:c};e(h,d,A),c=null}}if("onloadend"in c?c.onloadend=le:c.onreadystatechange=function(){!c||c.readyState!==4||c.status===0&&!(c.responseURL&&c.responseURL.indexOf("file:")===0)||setTimeout(le)},c.onabort=function(){!c||(d(u("Request aborted",i,"ECONNABORTED",c)),c=null)},c.onerror=function(){d(u("Network Error",i,null,c)),c=null},c.ontimeout=function(){var b="timeout of "+i.timeout+"ms exceeded";i.timeoutErrorMessage&&(b=i.timeoutErrorMessage),d(u(b,i,i.transitional&&i.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",c)),c=null},r.isStandardBrowserEnv()){var fe=(i.withCredentials||o(ce))&&i.xsrfCookieName?n.read(i.xsrfCookieName):void 0;fe&&(O[i.xsrfHeaderName]=fe)}"setRequestHeader"in c&&r.forEach(O,function(b,A){typeof f>"u"&&A.toLowerCase()==="content-type"?delete O[A]:c.setRequestHeader(A,b)}),r.isUndefined(i.withCredentials)||(c.withCredentials=!!i.withCredentials),N&&N!=="json"&&(c.responseType=i.responseType),typeof i.onDownloadProgress=="function"&&c.addEventListener("progress",i.onDownloadProgress),typeof i.onUploadProgress=="function"&&c.upload&&c.upload.addEventListener("progress",i.onUploadProgress),i.cancelToken&&i.cancelToken.promise.then(function(b){!c||(c.abort(),d(b),c=null)}),f||(f=null),c.send(f)})},z}var p=v,Se=xr,qr=_e,Pr={"Content-Type":"application/x-www-form-urlencoded"};function Ce(r,e){!p.isUndefined(r)&&p.isUndefined(r["Content-Type"])&&(r["Content-Type"]=e)}function Ur(){var r;return(typeof XMLHttpRequest<"u"||typeof process<"u"&&Object.prototype.toString.call(process)==="[object process]")&&(r=xe()),r}function kr(r,e,n){if(p.isString(r))try{return(e||JSON.parse)(r),p.trim(r)}catch(a){if(a.name!=="SyntaxError")throw a}return(n||JSON.stringify)(r)}var L={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:Ur(),transformRequest:[function(e,n){return Se(n,"Accept"),Se(n,"Content-Type"),p.isFormData(e)||p.isArrayBuffer(e)||p.isBuffer(e)||p.isStream(e)||p.isFile(e)||p.isBlob(e)?e:p.isArrayBufferView(e)?e.buffer:p.isURLSearchParams(e)?(Ce(n,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):p.isObject(e)||n&&n["Content-Type"]==="application/json"?(Ce(n,"application/json"),kr(e)):e}],transformResponse:[function(e){var n=this.transitional,a=n&&n.silentJSONParsing,t=n&&n.forcedJSONParsing,s=!a&&this.responseType==="json";if(s||t&&p.isString(e)&&e.length)try{return JSON.parse(e)}catch(o){if(s)throw o.name==="SyntaxError"?qr(o,this,"E_JSON_PARSE"):o}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};L.headers={common:{Accept:"application/json, text/plain, */*"}};p.forEach(["delete","get","head"],function(e){L.headers[e]={}});p.forEach(["post","put","patch"],function(e){L.headers[e]=p.merge(Pr)});var ie=L,Tr=v,Lr=ie,Dr=function(e,n,a){var t=this||Lr;return Tr.forEach(a,function(o){e=o.call(t,e,n)}),e},G,Re;function He(){return Re||(Re=1,G=function(e){return!!(e&&e.__CANCEL__)}),G}var Oe=v,V=Dr,Ir=He(),Br=ie;function K(r){r.cancelToken&&r.cancelToken.throwIfRequested()}var $r=function(e){K(e),e.headers=e.headers||{},e.data=V.call(e,e.data,e.headers,e.transformRequest),e.headers=Oe.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),Oe.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]});var n=e.adapter||Br.adapter;return n(e).then(function(t){return K(e),t.data=V.call(e,t.data,t.headers,e.transformResponse),t},function(t){return Ir(t)||(K(e),t&&t.response&&(t.response.data=V.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})},m=v,Me=function(e,n){n=n||{};var a={},t=["url","method","data"],s=["headers","auth","proxy","params"],o=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],u=["validateStatus"];function l(d,f){return m.isPlainObject(d)&&m.isPlainObject(f)?m.merge(d,f):m.isPlainObject(f)?m.merge({},f):m.isArray(f)?f.slice():f}function i(d){m.isUndefined(n[d])?m.isUndefined(e[d])||(a[d]=l(void 0,e[d])):a[d]=l(e[d],n[d])}m.forEach(t,function(f){m.isUndefined(n[f])||(a[f]=l(void 0,n[f]))}),m.forEach(s,i),m.forEach(o,function(f){m.isUndefined(n[f])?m.isUndefined(e[f])||(a[f]=l(void 0,e[f])):a[f]=l(void 0,n[f])}),m.forEach(u,function(f){f in n?a[f]=l(e[f],n[f]):f in e&&(a[f]=l(void 0,e[f]))});var y=t.concat(s).concat(o).concat(u),h=Object.keys(e).concat(Object.keys(n)).filter(function(f){return y.indexOf(f)===-1});return m.forEach(h,i),a};const _r="axios",Fr="0.21.4",Hr="Promise based HTTP client for the browser and node.js",Mr="index.js",Jr={test:"grunt test",start:"node ./sandbox/server.js",build:"NODE_ENV=production grunt build",preversion:"npm test",version:"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",postversion:"git push && git push --tags",examples:"node ./examples/server.js",coveralls:"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",fix:"eslint --fix lib/**/*.js"},zr={type:"git",url:"https://github.com/axios/axios.git"},Gr=["xhr","http","ajax","promise","node"],Vr="Matt Zabriskie",Kr="MIT",Wr={url:"https://github.com/axios/axios/issues"},Xr="https://axios-http.com",Qr={coveralls:"^3.0.0","es6-promise":"^4.2.4",grunt:"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1",karma:"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2",minimist:"^1.2.0",mocha:"^8.2.1",sinon:"^4.5.0","terser-webpack-plugin":"^4.2.3",typescript:"^4.0.5","url-search-params":"^0.10.0",webpack:"^4.44.2","webpack-dev-server":"^3.11.0"},Yr={"./lib/adapters/http.js":"./lib/adapters/xhr.js"},Zr="dist/axios.min.js",et="dist/axios.min.js",rt="./index.d.ts",tt={"follow-redirects":"^1.14.0"},nt=[{path:"./dist/axios.min.js",threshold:"5kB"}],at={name:_r,version:Fr,description:Hr,main:Mr,scripts:Jr,repository:zr,keywords:Gr,author:Vr,license:Kr,bugs:Wr,homepage:Xr,devDependencies:Qr,browser:Yr,jsdelivr:Zr,unpkg:et,typings:rt,dependencies:tt,bundlesize:nt};var Je=at,oe={};["object","boolean","number","function","string","symbol"].forEach(function(r,e){oe[r]=function(a){return typeof a===r||"a"+(e<1?"n ":" ")+r}});var Ne={},st=Je.version.split(".");function ze(r,e){for(var n=e?e.split("."):st,a=r.split("."),t=0;t<3;t++){if(n[t]>a[t])return!0;if(n[t]<a[t])return!1}return!1}oe.transitional=function(e,n,a){var t=n&&ze(n);function s(o,u){return"[Axios v"+Je.version+"] Transitional option '"+o+"'"+u+(a?". "+a:"")}return function(o,u,l){if(e===!1)throw new Error(s(u," has been removed in "+n));return t&&!Ne[u]&&(Ne[u]=!0,console.warn(s(u," has been deprecated since v"+n+" and will be removed in the near future"))),e?e(o,u,l):!0}};function it(r,e,n){if(typeof r!="object")throw new TypeError("options must be an object");for(var a=Object.keys(r),t=a.length;t-- >0;){var s=a[t],o=e[s];if(o){var u=r[s],l=u===void 0||o(u,s,r);if(l!==!0)throw new TypeError("option "+s+" must be "+l);continue}if(n!==!0)throw Error("Unknown option "+s)}}var ot={isOlderVersion:ze,assertOptions:it,validators:oe},Ge=v,ut=$e,Ae=wr,je=$r,D=Me,Ve=ot,C=Ve.validators;function q(r){this.defaults=r,this.interceptors={request:new Ae,response:new Ae}}q.prototype.request=function(e){typeof e=="string"?(e=arguments[1]||{},e.url=arguments[0]):e=e||{},e=D(this.defaults,e),e.method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var n=e.transitional;n!==void 0&&Ve.assertOptions(n,{silentJSONParsing:C.transitional(C.boolean,"1.0.0"),forcedJSONParsing:C.transitional(C.boolean,"1.0.0"),clarifyTimeoutError:C.transitional(C.boolean,"1.0.0")},!1);var a=[],t=!0;this.interceptors.request.forEach(function(d){typeof d.runWhen=="function"&&d.runWhen(e)===!1||(t=t&&d.synchronous,a.unshift(d.fulfilled,d.rejected))});var s=[];this.interceptors.response.forEach(function(d){s.push(d.fulfilled,d.rejected)});var o;if(!t){var u=[je,void 0];for(Array.prototype.unshift.apply(u,a),u=u.concat(s),o=Promise.resolve(e);u.length;)o=o.then(u.shift(),u.shift());return o}for(var l=e;a.length;){var i=a.shift(),y=a.shift();try{l=i(l)}catch(h){y(h);break}}try{o=je(l)}catch(h){return Promise.reject(h)}for(;s.length;)o=o.then(s.shift(),s.shift());return o};q.prototype.getUri=function(e){return e=D(this.defaults,e),ut(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")};Ge.forEach(["delete","get","head","options"],function(e){q.prototype[e]=function(n,a){return this.request(D(a||{},{method:e,url:n,data:(a||{}).data}))}});Ge.forEach(["post","put","patch"],function(e){q.prototype[e]=function(n,a,t){return this.request(D(t||{},{method:e,url:n,data:a}))}});var ct=q,W,qe;function Ke(){if(qe)return W;qe=1;function r(e){this.message=e}return r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,W=r,W}var X,Pe;function lt(){if(Pe)return X;Pe=1;var r=Ke();function e(n){if(typeof n!="function")throw new TypeError("executor must be a function.");var a;this.promise=new Promise(function(o){a=o});var t=this;n(function(o){t.reason||(t.reason=new r(o),a(t.reason))})}return e.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},e.source=function(){var a,t=new e(function(o){a=o});return{token:t,cancel:a}},X=e,X}var Q,Ue;function ft(){return Ue||(Ue=1,Q=function(e){return function(a){return e.apply(null,a)}}),Q}var Y,ke;function dt(){return ke||(ke=1,Y=function(e){return typeof e=="object"&&e.isAxiosError===!0}),Y}var Te=v,ht=De,U=ct,pt=Me,mt=ie;function We(r){var e=new U(r),n=ht(U.prototype.request,e);return Te.extend(n,U.prototype,e),Te.extend(n,e),n}var E=We(mt);E.Axios=U;E.create=function(e){return We(pt(E.defaults,e))};E.Cancel=Ke();E.CancelToken=lt();E.isCancel=He();E.all=function(e){return Promise.all(e)};E.spread=ft();E.isAxiosError=dt();ne.exports=E;ne.exports.default=E;(function(r){r.exports=ne.exports})(Le);const Xe=rr(Le.exports),k=Xe.create({baseURL:"/api/"}),vt=r=>({active:r.active,createdAt:new Date(r.created_at),email:r.email,firstName:r.first_name,id:r.id,lastName:r.last_name,updatedAt:new Date(r.updated_at)});async function yt(r,e){const n=await k.post("/sessions",{email:r,password:e}),{jwt:a}=n.data;return Qe(a)}async function Qe(r){const e=await k.get("/session",{headers:{Authorization:`Bearer ${r}`}});return{user:vt(e.data.user),jwt:r}}const Et={Small:"sm",Medium:"md",Large:"lg"};function ue(r){return j("div",{className:tr("spinner",`spinner--${r.size}`,r.centered&&"spinner--centered"),children:j("svg",{className:"spinner__svg",viewBox:"0 0 50 50","aria-hidden":"true",children:j("circle",{cx:"25",cy:"25",r:"20",fill:"none",strokeWidth:"5"})})})}ue.defaultProps={size:Et.Small};ue.__docgenInfo={description:"",methods:[],displayName:"Spinner",props:{size:{defaultValue:{value:'"sm"',computed:!1},required:!1}}};const Ye=w.exports.createContext(),R={PENDING:"PENDING",ERROR:"ERROR",SUCCESS:"SUCCESS",LOGIN_REQUIRED:"LOGIN_REQUIRED"},Z="credentials",ee={save(r){return console.debug("Saving credentials to cache",r),localStorage.setItem(Z,JSON.stringify(r))},load(){const r=JSON.parse(localStorage.getItem(Z));return console.debug("Loading credentials from cache",r),r},clear(){console.debug("Clearing credentials from cache"),localStorage.removeItem(Z)}},bt=({children:r})=>{const[e,n]=w.exports.useState({status:R.PENDING,error:null,user:null,jwt:null}),a=w.exports.useMemo(()=>Xe.create({...k.defaults,headers:{...k.headers,Authorization:`Bearer ${e.jwt}`}}),[e.jwt]),t=w.exports.useCallback(()=>{ee.clear(),n({status:R.LOGIN_REQUIRED,error:null,user:null,jwt:null})},[]),s=w.exports.useCallback(async(l,i)=>{try{const{jwt:y,user:h}=await yt(l,i);ee.save(y),n({status:R.SUCCESS,error:null,user:h,jwt:y})}catch(y){n({status:R.ERROR,error:y,user:null,jwt:null})}},[]),o=w.exports.useCallback(async l=>{try{const{user:i,jwt:y}=await Qe(l);n({status:R.SUCCESS,error:null,user:i,jwt:y})}catch{t()}},[t]),u={...e,login:s,logout:t,authenticatedApiClient:a};return w.exports.useEffect(()=>{const l=ee.load();o(l)},[o]),e.status===R.PENDING?j(ue,{}):j(Ye.Provider,{value:u,children:r})},St=()=>w.exports.useContext(Ye);bt.__docgenInfo={description:"",methods:[],displayName:"CurrentUserProvider"};export{Ye as C,Xe as a,k as b,R as c,bt as d,St as u};
//# sourceMappingURL=currentUserContext.6b995cee.js.map
