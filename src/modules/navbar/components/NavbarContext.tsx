// NavbarContext.tsx
import React, {createContext, useContext, useState} from 'react';

interface NavbarContextType {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [toggle, setToggle] = useState(false);

  return (
    <NavbarContext.Provider value={{toggle, setToggle}}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
};
