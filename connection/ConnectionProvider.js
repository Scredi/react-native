import React, { createContext, useContext, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

const ConnectionContext = createContext({});

const ConnectionProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const { isConnected } = state;

      setIsConnected(isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ConnectionContext.Provider value={{ isConnected }}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => useContext(ConnectionContext);

export default ConnectionProvider;
