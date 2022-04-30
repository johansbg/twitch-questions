import { useEffect, useState } from "react";
import io from "socket.io-client";
let socket;

const Home = () => {
  const [index, setIndex] = useState(0);
  const [chatMsg, setChatMsg] = useState([]);

  useEffect(() => {
    async function socketInitializer() {
      await fetch("/api/socket");
      socket = io();

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("update-input", (msg) => {
        setChatMsg((oldArray) =>
          [...oldArray, msg].filter(function (elem, index, self) {
            return index === self.indexOf(elem);
          })
        );
      });
    }

    socketInitializer();
  }, []);

  return (
    <div>
      <div className="text-center text-6xl text-white bg-gray-900 pt-10 font-mono">
        PREGUNTAS DE TWITCH
      </div>
      <div className="grid justify-center items-center h-screen bg-gray-900 pt-20">
        <div className="flex gap-40">
          <div
            className="text-center text-white text-4xl font-mono cursor-pointer"
            onClick={() => {
              if (index !== 0) {
                setIndex((prev) => prev - 1);
              }
            }}
          >
            {"<"}
          </div>
          <div className="text-center text-white text-4xl font-mono">
            {chatMsg.length > 0
              ? chatMsg[index]
              : "No tienes ninguna pregunta :("}
          </div>
          <div
            className="text-center text-white text-4xl font-mono cursor-pointer"
            onClick={() => {
              if (index !== chatMsg.length - 1) {
                setIndex((prev) => prev + 1);
              }
            }}
          >
            {">"}
          </div>
        </div>
        <div className="text-center text-4xl text-white bg-gray-900  font-mono">
          {(chatMsg.length > 0 ? index + 1 : "0") + "/" + chatMsg.length}
        </div>
      </div>
    </div>
  );
};

export default Home;
