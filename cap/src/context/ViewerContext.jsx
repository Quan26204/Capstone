import React, { createContext, useContext, useState } from 'react';

const ViewerContext = createContext(undefined);

export function ViewerProvider({ children }) {
  const [selectedPOI, setSelectedPOI] = useState(null);
  return (
    <ViewerContext.Provider value={{ selectedPOI, setSelectedPOI }}>
      {children}
    </ViewerContext.Provider>
  );
}

export function useViewer() { return useContext(ViewerContext); }
