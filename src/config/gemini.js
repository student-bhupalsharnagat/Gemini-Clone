

// // To run this code you need to install the following dependencies:
// // npm install @google/genai mime
// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,


// } from "@google/generative-ai"
// const MODEL_NAME="gemini-1.0-pro";
// const API_KEY="AIzaSyAetvfGe3hVQjiLzF3rGIqHeGPkWQPsVOs";

// async function runChat(prompt) {
//  const genAI = new GooogleGenerativeAI(API_KEY);
//  const  model= genAI.getGenerativeModel({ model : MODEL_NAME});
 
//  const generationConfig ={
//   tempereture:0.9,
//   topK:1,
//   topP:1,
// maxOutputTokens:2048,

//  }
//  const safetySettings=[
//   {
//     category:HarmCategory.HARM_CATEGORY_HARASSMENT,
//     threshold:HarmBlockThreshold.Block_MEDIUM_AND_ABOVE,
//   },
//   {
//      category:HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//     threshold:HarmBlockThreshold.Block_MEDIUM_AND_ABOVE,

//   },
//   {
//    category:HarmCategory.HARM_CATEGORY_SEXUAL_EXPLICIT,
//     threshold:HarmBlockThreshold.Block_MEDIUM_AND_ABOVE,
//   },
//   {
//      category:HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//     threshold:HarmBlockThreshold.Block_MEDIUM_AND_ABOVE,
//   }
//  ];
//  const chat = model.starChat({
//   generationConfig,
//   safetySettings,
//   history: [
//   ],
//  });
//  const result =await chat.sendMessage(prompt);
//  const response=result.response;
//  console.log(response.text());
 
// }
//  export default runChat
















// node --version # Should be >= 18
// npm install @google/generative-ai





import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// const MODEL_NAME = "models/gemini-2.5-flash";
const MODEL_NAME = "models/gemini-2.5-flash-lite"
// const API_KEY = "AIzaSyAdzK4GzqCYd2mFMz4FDBwVQsGIKvlUKAk";


const API_KEY = "AIzaSyDuNW0bDMztz3-a2EjpBm_xAWs74eNHQTY";





async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
    ],
  });

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text();
}

 export default runChat;














