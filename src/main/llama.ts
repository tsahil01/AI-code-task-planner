import OpenAI from "openai"
import { llamaInitialContext, llamaInitialContextResponse } from "../config/const";
const dotenv = require('dotenv');
dotenv.config();

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const API_KEY = process.env.API_KEY ?? "";

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: API_KEY,

});


const messages: Message[] = [
    {
        "role": "user",
        "content": llamaInitialContext
    },
    {
        "role": "assistant",
        "content": llamaInitialContextResponse
    },
]


export async function sendLlama(content: string) {
    messages.push({ role: "user", content });

    const completion = await openai.chat.completions.create({
        model: "anthropic/claude-3.5-haiku",
        messages: messages,
    });

    const response = completion.choices[0].message;
    messages.push({ role: response.role, content: response.content ?? "" });

    return response;
}
