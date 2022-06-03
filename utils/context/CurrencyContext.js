import React, { createContext, useContext} from "react";

const Context = createContext();

export const CurrencyContext = ({ children }) => {
  const envObj = {
    lang: process.env.NEXT_PUBLIC_CURRENCY_LOCALE,
    curr: process.env.NEXT_PUBLIC_CURRENCY
  }
  
    const currencyConverter = new Intl.NumberFormat(envObj.lang, { style: 'currency', currency: envObj.curr });

  return (
    <Context.Provider
      value={{
        currencyConverter
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCurrencyContext = () => useContext(Context);