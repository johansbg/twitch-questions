import { useEffect, useState } from "react";
import io from "Socket.IO-client";
let socket;

const Preguntas = () => {
  const [input, setInput] = useState("");

  useEffect(() => {
    async function socketInitializer() {
      await fetch("/api/socket");
      socket = io();

      socket.on("connect", () => {
        console.log("connected");
      });
    }

    socketInitializer();
  }, []);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const sendMsg = () => {
    socket.emit("input-change", input);
    setInput("");
  };

  return (
    <>
      <div className="grid justify-center items-center h-screen bg-gray-900">
        <div className="flex">
          <div className="text-center text-4xl text-white bg-gray-900 p-3 font-mono">
            PREGUNTAS DE TWITCH
          </div>
          <input
            className="ml-10 bg-white font-mono rounded-lg p-3 w-[100%]"
            placeholder="Escribe una pregunta"
            value={input}
            onChange={onChangeHandler}
          />
          <button
            className="ml-10 bg-white font-mono rounded-lg p-3"
            onClick={sendMsg}
          >
            Enviar pregunta
          </button>
        </div>
      </div>
    </>
  );
};

export default Preguntas;
