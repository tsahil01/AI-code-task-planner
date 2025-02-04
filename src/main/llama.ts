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
        "content": llamaInitialContext,
    },
    {
        "role": "assistant",
        "content": llamaInitialContextResponse
    },
]


export async function sendLlama({ role, content }: Message, response: (token: string) => void) {
    messages.push({ role, content });
    try {
        const completion = await openai.chat.completions.create({
            model: "meta-llama/llama-3.2-1b-instruct:free",
            messages: messages,
            stream: true
        });

        let fullContent = "";
        for await (const chunk of completion) {
            response(chunk.choices[0]?.delta?.content || '');
            fullContent += chunk.choices[0]?.delta?.content || '';
        }
        messages.push({ role: 'assistant', content: fullContent });

    } catch (error) {
        console.error("Error: ", error);
        messages.push({ role: "assistant", content: "Error occurred while processing the request" });
        response("Error occurred while processing the request");
        return "Error occurred while processing the request";
    }
}
