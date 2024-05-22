"use client"

import {useState, useEffect} from "react";
import {GoogleGenerativeAI} from "@google/generative-ai";

export default function Home() {

  const [userPrompt, setUserPrompt] = useState("");
  const[gptResponse, setGptResponse] = useState("");

  const apiKey = "AIzaSyAsriAzh5QnLVB1RB0yNexDergLGVEKQIw";

  const genAI = new GoogleGenerativeAI(process.env.API_KEY);

  const startGPT = async() => {
    try {
      const model = genAI.getGenerativeModel({model: "gemini-pro"});

      const prompt = userPrompt

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      setGptResponse(text);
      setUserPrompt("");
      
    } catch (error) {
      console.log(error);
      alert("code error!")
    }
  }

  

  return (
    <div className="text-blue-600">
      <h1>I am HustleGPT...your startup buddy</h1>
      <input placeholder="say something" value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)}/>
      <button className="bg-green-800 p-2 rounded-xl " onClick={startGPT}>Send</button>
      <br/>
      <p className="text-gray-200 font-semibold">{gptResponse}</p>
    </div> 
  );
}
