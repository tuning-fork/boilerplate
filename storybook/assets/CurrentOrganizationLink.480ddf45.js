import{r as e}from"./index.b8fd3884.js";import{P as g}from"./index.014bc556.js";import{L as h}from"./react-router-dom.2fcfabae.js";import{u as P,a as _,b as k}from"./currentUserContext.6000bc39.js";import{j as m}from"./jsx-runtime.0b933dff.js";const z=t=>({createdAt:new Date(t.created_at),id:t.id,name:t.name,updatedAt:new Date(t.updated_at)}),v=t=>t.get("/organizations").then(n=>n.data.map(z)),U=(t,n)=>t.get(`/organizations/${n}`).then(a=>z(a.data)),l=e.exports.createContext(),$=()=>e.exports.useContext(l),b=({children:t})=>{const[n,a]=e.exports.useState([]),[s,i]=e.exports.useState(),[f,C]=e.exports.useState(),[O,p]=e.exports.useState(!1),{user:d,authenticatedApiClient:r}=P(),u=e.exports.useCallback(async()=>{const o=await v(r);a(o)},[r]),x={currentOrganization:s,fetchCurrentOrganization:async o=>{try{p(!0);const y=_.create({...r.defaults,baseURL:`${k.defaults.baseURL}/organizations/${o}`});C(()=>y);const L=await U(r,o);i(L)}finally{p(!1)}},fetchUserOrganizations:u,isLoadingOrganization:O,organizationClient:f,organizations:n};return e.exports.useEffect(()=>{d&&u()},[d,u]),m(l.Provider,{value:x,children:t})};b.__docgenInfo={description:"",methods:[],displayName:"CurrentOrganizationProvider"};function c(t){const{as:n,to:a,...s}=t,{currentOrganization:i}=$();return m(n,{...s,to:`/organizations/${i.id}${a}`})}c.propTypes={as:g.elementType,to:g.string.isRequired};c.defaultProps={as:h};c.__docgenInfo={description:"",methods:[],displayName:"CurrentOrganizationLink",props:{as:{defaultValue:{value:"Link",computed:!0},type:{name:"elementType"},required:!1,description:""},to:{type:{name:"string"},required:!0,description:""}}};export{c as C,b as a,$ as u};
//# sourceMappingURL=CurrentOrganizationLink.480ddf45.js.map