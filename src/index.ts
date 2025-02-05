import { cli } from './cli';
import { File } from './config/types';
import { analyzeFiles } from './main/analyzeFiles';
import { sendLlama } from './main/llama';

export let repo: File | null = null;

async function main() {
    // repo = await analyzeFiles('/home/sahil/coding/teamOB-app');
    // await sendLlama({ role: 'user', content: `Repo contents:  ${JSON.stringify(repo)}` }, (token) => {
    //     process.stdout.write(token);
    // });
    // console.log('\n\n\n\n');
    // await sendLlama({ role: 'user', content: 'Can you tell me how can we change AppName in the repo?' }, (token) => {
    //     process.stdout.write(token);
    // });

    cli();
}

main()