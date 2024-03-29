import React, { createContext, useCallback, useState } from "react";

export const PasteBoilerplateContentPopoutContext = createContext();

export const PasteBoilerplateContentPopoutProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const onPasteBoilerplate = useCallback(
    (newSubscriber) => {
      setSubscribers((currentSubscribers) => [
        ...currentSubscribers,
        newSubscriber,
      ]);
    },
    [setSubscribers]
  );
  const pasteBoilerplate = useCallback(
    (boilerplate) => {
      subscribers.forEach((subscriber) => subscriber(boilerplate));
    },
    [subscribers]
  );
  const unsubscribeBoilerplate = useCallback(() => {
    setSubscribers([]);
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
