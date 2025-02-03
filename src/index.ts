import { sendLlama } from './main/llama';
import { llamaInitialContext } from './config/const';



async function main() {
    const aiInit = await sendLlama(llamaInitialContext)
    console.log(aiInit)
}

main()