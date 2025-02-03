import { sendLlama } from './main/llama';



async function main() {
    const aiInit = await sendLlama("Hello")
    console.log(aiInit)
}

main()