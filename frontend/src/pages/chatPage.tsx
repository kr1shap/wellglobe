import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Chatbot() {
  const location = useLocation();
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState<{ from: string; text: string }[]>([]);

  useEffect(() => {
    //adding only once
    setChatLog([
      {
        from: "Gemini",
        text: "Ask me anything related to your travel health...",
      },
    ]);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to chat log
    setChatLog((log) => [...log, { from: "user", text: input }]);

    const state = location.state as { to?: string; from?: string } | null;
    const input2 =
      input +
      " (this converstation is about travel health at " +
      state?.to +
      " and they're from" + state?.from + ".)";
    console.log(input2);

    //Call backend API
    console.log("Sending message to backend:", input);
    const response = await fetch("http://localhost:8000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: input2,
    });
    const data = await response.json();
    console.log(data.response);

    setChatLog((log) => [...log, { from: "Gemini", text: data.response }]);

    setInput("");
  };

  return (
    <div className="w-full">
      {/* Header animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-center gap-4 fixed top-0 left-0 w-full bg-transparent z-10 py-4"
      >
        <button className="p-2 rounded-full ml-2">
          <img src="/wellglobeLogo.png" alt="icon" className="w-8 h-8" />
        </button>
        <h1 className="font-bold text-4xl" style={{ color: "#4B7399" }}>
          CHATBOT
        </h1>
      </motion.div>

      {/* Chat log with animated messages */}
      <div
        className="flex flex-col absolute left-10 right-10 pt-4 pb-24 overflow-auto"
        style={{ maxHeight: "70vh", top: "90px" }}
      >
        <AnimatePresence initial={false}>
          {chatLog.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`flex w-full mb-3 ${
                msg.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`relative px-5 py-3 max-w-[90%] shadow-md text-base ${
                  msg.from === "user"
                    ? "bg-[#4B7399] text-white rounded-2xl rounded-br-sm"
                    : "bg-gray-200 text-gray-900 rounded-2xl rounded-bl-sm"
                }`}
              >
                <span className="block font-semibold mb-1 text-xs opacity-70">
                  {msg.from === "user" ? "You" : "Gemini"}
                </span>
                <span>{msg.text}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input box animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-row fixed bottom-10 left-10 right-10 items-center space-x-2 mt-24 mb-4 mx-auto"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder=" Ask anything related to your travel health..."
          className="flex-1 py-4 px-6 bg-[#ffffff] rounded-full text-black border border-gray-300"
        />
        <button
          onClick={handleSend}
          className="bg-[#4B7399] text-white px-4 py-2 w-20 h-10 rounded-full border-none hover:bg-white hover:text-[#4B7399]"
        >
          Send
        </button>
      </motion.div>
    </div>
  );
}

export default Chatbot;
