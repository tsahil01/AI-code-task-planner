import { File } from './config/types';
import { analyzeFiles } from './main/analyzeFiles';
import { sendLlama } from './main/llama';

export let repo: File | null = null;

async function main() {
    repo = await analyzeFiles('/home/sahil/coding/AI-code-task-planner');
    const aiInit = await sendLlama({ role: 'user', content: `Repo contents:  ${JSON.stringify(repo)}` });
    console.log(aiInit);
    const aiResponse = await sendLlama({ role: 'user', content: 'How can I use authO in this project?' });
    console.log(aiResponse);
}

main()