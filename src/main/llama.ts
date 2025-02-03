import OpenAI from "openai"
import { API_KEY, llamaInitialContext, llamaInitialContextResponse } from "../config/consts";
import { Message } from "../config/types";

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
