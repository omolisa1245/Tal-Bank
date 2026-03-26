import React, { createContext, useContext, useState } from "react";

// 1. Create the context
const LoadingContext = createContext();

// 2. Provide a hook for easy access
export const useLoading = () => useContext(LoadingContext);

// 3. Provider component
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};