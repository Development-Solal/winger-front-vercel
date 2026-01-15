import React, {createContext, useState, useContext, ReactNode} from "react";

// Define context type
type RechercheContextType = {
  paginationPage: number;
  setPaginationPage: React.Dispatch<React.SetStateAction<number>>;
  defaultAide: number;
  setDefaultAide: React.Dispatch<React.SetStateAction<number>>;
};

// Create RechercheContext
const RechercheContext = createContext<RechercheContextType | undefined>(undefined);

// Custom hook for RechercheContext
export const useRecherche = () => {
  const context = useContext(RechercheContext);
  if (!context) {
    throw new Error("useRecherche must be used within a RechercheProvider");
  }
  return context;
};

type RechercheProviderProps = {children: ReactNode};

export const RechercheProvider = ({children}: RechercheProviderProps) => {
  const [paginationPage, setPaginationPage] = useState<number>(1);
  const [defaultAide, setDefaultAide] = useState<number>(0);

  return (
    <RechercheContext.Provider value={{paginationPage, setPaginationPage, defaultAide, setDefaultAide}}>
      {children}
    </RechercheContext.Provider>
  );
};
