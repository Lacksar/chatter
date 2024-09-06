import { useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const [messages, setMessages] = useState([
    { mode: "receive", message: "hello" },
    {
      mode: "send",
      message:
        "hi my name is stup baral. I am from Bhaudaha and I love to take care of my own.",
    },
  ]);

  useEffect(() => {
    const response = fetch("/api/socket");
    const socketIo = io();

    setSocket(socketIo);

    socketIo.on("receive-message", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { mode: "receive", message },
      ]);
      console.log("message recieved");
    });
    return () => {
      socketIo.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket && message.trim()) {
      socket.emit("send-message", message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { mode: "send", message },
      ]);
      setMessage("");
    } else {
      console.error("error");
    }
  };

  return (
    <>
      <div className="bg-gray h-lvh flex justify-center items-center flex-col">
        <div className="bg-white h-5/6 w-5/6 overflow-scroll flex flex-col">
          {messages.map((x, y) => {
            return (
              <>
                {x.mode === "receive" && (
                  <div className="flex justify-start">
                    <div className="rounded-md px-2 py-1 w-2/5  mb-4 text-white flex justify-start">
                      <span className="rounded-md px-2 py-1   bg-gray-700">
                        {x.message}
                      </span>
                    </div>
                  </div>
                )}
                {x.mode === "send" && (
                  <div className="flex justify-end">
                    <div className="rounded-md px-2 py-1 w-2/5  mb-4 text-white flex justify-end">
                      <span className="rounded-md px-2 py-1   bg-red-900">
                        {x.message}
                      </span>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
        <div className="bg-black h-16 w-5/6 flex justify-center items-center gap-5">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-4/6 h-4/6 pl-5 text-black placeholder-gray-800"
            placeholder="Enter..."
          />
          <button className="bg-white h-4/6 pl-5 pr-5" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}
