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


export async function sendLlama({ role, content }: Message): Promise<string> {
    console.log("Role: ", role, "Content: ", content);
    messages.push({ role, content });
    try {
        const completion = await openai.chat.completions.create({
            model: "anthropic/claude-3.5-haiku",
            messages: messages,
        });

        console.log("Completion: ", completion);

        const response = completion.choices[0].message;
        messages.push({ role: response.role, content: response.content ?? "" });

        return response.content ?? "";
    } catch (error) {
        console.error("Error: ", error);
        messages.push({ role: "assistant", content: "Error occurred while processing the request" });
        return "Error occurred while processing the request";
    }
}
