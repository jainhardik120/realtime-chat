"use client"
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react"
import { Socket, io } from "socket.io-client";

interface ISocketContext {
  sendMessage: (msg: string) => any;
}

const SocketContext = createContext<ISocketContext | null>(null);

export const useSocketContext = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error("State not defined");
  return state;
}

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const sendMessage: ISocketContext['sendMessage'] = useCallback((msg) => {
    console.log("Send Message", msg);
    if(socket){
      socket.emit("event:message", {message : msg});
    }
  }, [socket]);
  useEffect(() => {
    const _socket = io("http://localhost:8000");
    setSocket(_socket);
    return () => {
      _socket.disconnect();
      setSocket(null);
    }
  }, [])
  const providerValue: ISocketContext = {
    sendMessage
  };
  return (
    <SocketContext.Provider value={providerValue}>
      {children}
    </SocketContext.Provider>
  )
}
