import React, { useContext, createContext, useReducer, useEffect } from "react";

const DropdownMiniContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "MARK_AS_SUBMITTED":
      return console.log("mark as submitted");
    case "MARK_AS_SUCCESSFUL":
      return console.log("mark as successful");
    case "MARK_AS_COPY":
      return console.log("mark as copy");
    case "ARCHIVE":
      return console.log("mark as archived");
    default:
      return state;
  }
};

// export const DropdownMiniProvider = ({ children }) => {
//   const store = {
//     allUserOrganizations: [],
//     currentOrganization: null,
//     organizationClient: null,
//   };
// const [currentOrganizationStore, currentOrganizationDispatch] = useReducer(
//   reducer,
//   store
// );
// const { currentUserStore } = useCurrentUserContext();

//   return (
//     <CurrentOrganizationContext.Provider
//       value={{
//         currentOrganizationStore,
//         currentOrganizationDispatch,
//         organizationClient: currentOrganizationStore.organizationClient,
//       }}
//     >
//       {children}
//     </CurrentOrganizationContext.Provider>
//   );
// };

export default DropdownMiniContext;
