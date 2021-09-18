import React, { createContext, useCallback, useState } from "react";

export const PasteBoilerplateContentPopoutContext = createContext();

export const PasteBoilerplateContentPopoutProvider = ({ children }) => {
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
