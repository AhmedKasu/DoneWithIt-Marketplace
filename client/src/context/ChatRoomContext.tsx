import React, { createContext, useContext, useState } from 'react';

interface ChatRoomContextProps {
  chatRoomId: string | undefined;
  setChatRoomId: React.Dispatch<React.SetStateAction<string | undefined>>;
  openChatRooms: string[];
  setOpenChatRooms: React.Dispatch<React.SetStateAction<string[]>>;
}

const ChatRoomContext = createContext<ChatRoomContextProps | undefined>(
  undefined
);

export const useChatRoomContext = () => {
  const context = useContext(ChatRoomContext);
  if (context === undefined) {
    throw new Error(
      'useChatRoomContext must be used within a ChatRoomProvider'
    );
  }
  return context;
};

export const ChatRoomProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [chatRoomId, setChatRoomId] = useState<string | undefined>(undefined);
  const [openChatRooms, setOpenChatRooms] = useState<string[]>([]);

  return (
    <ChatRoomContext.Provider
      value={{
        chatRoomId,
        setChatRoomId,
        openChatRooms,
        setOpenChatRooms,
      }}>
      {children}
    </ChatRoomContext.Provider>
  );
};
