import OpenAI from "openai"
import { llamaInitialContextResponse } from "../config/const";
const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.API_KEY ?? "";

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: API_KEY,

})

export async function sendLlama(content: string) {
    console.log(content)
    const completion = await openai.chat.completions.create({
        model: "anthropic/claude-3.5-haiku",
        messages: [
            {
                "role": "user",
                "content": content
            },
            {
                "role": "assistant",
                "content": llamaInitialContextResponse
            }
        ]
    })

    const response = completion.choices[0].message;
    return response
}