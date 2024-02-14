import React, { createContext, useState, useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

import { useAuthContext } from './authContext';
import { SERVER_URL } from '../utils/constants';

export type SocketType = Socket<DefaultEventsMap, DefaultEventsMap>;

interface SocketContext {
  socket: SocketType | null;
}

const SocketContext = createContext<SocketContext | undefined>(undefined);

export const useSocketContext = (): SocketContext => {
  const context = React.useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketContext must be used within SocketProvider');
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
  const { currentUser } = useAuthContext();
  const socketRef = useRef<SocketType | null>(null);
  const [, forceUpdate] = useState(false);

  useEffect(() => {
    if (currentUser && !socketRef.current) {
      const userId = currentUser.id;
      socketRef.current = io(SERVER_URL, { query: { userId } });

      socketRef.current.on('connect', () => {
        console.log('connected to room', `seller_${userId}`);
      });

      forceUpdate((prev) => !prev);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
      }}>
      {children}
    </SocketContext.Provider>
  );
};
