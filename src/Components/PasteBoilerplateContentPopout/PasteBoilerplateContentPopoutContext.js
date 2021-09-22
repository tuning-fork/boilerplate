import React, { createContext, useCallback, useState } from "react";

export const PasteBoilerplateContentPopoutContext = createContext();

export const PasteBoilerplateContentPopoutProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subscriber, setSubscriber] = useState();

  const onPasteBoilerplate = useCallback(
    (newSubscriber) => setSubscriber(() => newSubscriber),
    [setSubscriber]
  );
  const unsubscribeBoilerplate = useCallback(() => {
    setSubscriber(null);
  }, [setSubscriber]);
  const context = {
    isOpen,
    setIsOpen,
    subscriber,
    onPasteBoilerplate,
    pasteBoilerplate: subscriber || (() => {}),
    unsubscribeBoilerplate,
  };

  return (
    <PasteBoilerplateContentPopoutContext.Provider value={context}>
      {children}
    </PasteBoilerplateContentPopoutContext.Provider>
  );
};
