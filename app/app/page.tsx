"use client"

import { useSocketContext } from "@/context/SocketProvider";
import { useState } from "react";

export default function Home() {
  const { sendMessage } = useSocketContext();
  const [message, setMessage] = useState("");
  return (
    <div>
      <div>
        <h1>
          All Messages will appear here
        </h1>
      </div>
      <div>
        <form onSubmit={(e)=>{
          e.preventDefault();
          sendMessage(message)
        }}>
          <input type="text" placeholder="Message..." value={message} onChange={(e) => { setMessage(e.target.value) }} />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}