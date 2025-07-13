import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import 'dotenv/config'

const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: 'gemini-2.5-flash',
    temperature: process.env.TEMPERATURE,
})

export default model