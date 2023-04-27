import { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  username: string;
  role: string;
}

interface LoggedUserContextType {
  loggedUser: User | null;
  setLoggedUser: (user: User | null) => void;
}

export const LoggedUserContext = createContext<LoggedUserContextType>({
  loggedUser: null,
  setLoggedUser: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const LoggedUserProvider = ({ children }: UserProviderProps) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  return (
    <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </LoggedUserContext.Provider>
  );
};

export const useLoggedUser = () => useContext(LoggedUserContext);
