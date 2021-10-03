// import React, { createContext, useCallback, useState } from "react";

// export const PasteBoilerplateContentPopoutContext = createContext();

// export const PasteBoilerplateContentPopoutProvider = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [subscriber, setSubscriber] = useState();

//   const onPasteBoilerplate = useCallback(
//     (newSubscriber) => setSubscriber(() => newSubscriber),
//     [setSubscriber]
//   );
//   const unsubscribeBoilerplate = useCallback(() => {
//     setSubscriber(null);
//   }, [setSubscriber]);
//   const context = {
//     isOpen,
//     setIsOpen,
//     subscriber,
//     onPasteBoilerplate,
//     pasteBoilerplate: subscriber || (() => {}),
//     unsubscribeBoilerplate,
//   };

//   return (
//     <PasteBoilerplateContentPopoutContext.Provider value={context}>
//       {children}
//     </PasteBoilerplateContentPopoutContext.Provider>
//   );
// };

import React, { createContext, useCallback, useState } from "react";

export const PasteBoilerplateContentPopoutContext = createContext();

export const PasteBoilerplateContentPopoutProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const onPasteBoilerplate = useCallback(
    (newSubscriber) => {
      console.log("adding subscriber");
      setSubscribers((currentSubscribers) => [
        ...currentSubscribers,
        newSubscriber,
      ]);
    },
    [setSubscribers]
  );
  const pasteBoilerplate = useCallback(
    (boilerplate) => {
      console.log(
        `pasteboilerplate was called with ${boilerplate}. Our subscribers are:`,
        subscribers
      );
      subscribers.forEach((subscriber) => subscriber(boilerplate));
    },
    [subscribers]
  );
  const unsubscribeBoilerplate = useCallback(() => {
    setSubscribers((currentSubscribers) => []);
  }, [setSubscribers]);
  const context = {
    isOpen,
    setIsOpen,
    subscribers,
    onPasteBoilerplate,
    pasteBoilerplate,
    unsubscribeBoilerplate,
  };
  return (
    <PasteBoilerplateContentPopoutContext.Provider value={context}>
      {children}
    </PasteBoilerplateContentPopoutContext.Provider>
  );
};
