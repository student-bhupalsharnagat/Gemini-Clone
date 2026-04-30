import { createContext } from "react";
import { useState } from "react";
import runChat from "../config/gemini";
export const Context = createContext();
const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [RecentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setprevPrompts] = useState([]);
  const [showResult, setshowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [VoiceInput, setVoiceInput] = useState("");

  const [finalOutput, setFinalOutput] = useState("");

  // create by me
  const [isListening, setIsListening] = useState(false);
  let recognition = null;
  const startListening = () => {
    if (isListening) return;
    recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setVoiceInput(transcript);
      setInput(transcript);
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setshowResult(false);
    setFinalOutput(false);
  };
  const onSent = async (prompt) => {
    setInput("");

    setResultData(" ");
    setLoading(true);
    setshowResult(true);
    setFinalOutput(true);
    let response;
    if (prompt !== undefined) {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setprevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await runChat(input);
    }

    let responseArray = response.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("<br/>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];

      delayPara(i, nextWord + " ");
    }

    let totalDelay = 75 * newResponseArray.length;
    setTimeout(() => setFinalOutput(false), totalDelay);

    setLoading(false);
  };

  const ContextValue = {
    prevPrompts,
    setprevPrompts,
    onSent,
    setRecentPrompt,
    RecentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    newChat,

    startListening,
    setVoiceInput,
    VoiceInput,
    isListening,
    toggleListening,
    stopListening,
    setResultData,
    finalOutput,
  };
  return (
    <Context.Provider value={ContextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
