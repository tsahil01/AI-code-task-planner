import { File } from './config/types';
import { analyzeFiles } from './main/analyzeFiles';
import { sendLlama } from './main/llama';

export let repo: File | null = null;

async function main() {
    repo = await analyzeFiles('/home/sahil/coding/AI-code-task-planner');
    console.log(repo)
    // const aiInit = await sendLlama(`Repo contents:  ${JSON.stringify(repo)}`);
    // console.log(aiInit)
}

main()