import { cli } from './cli';
import { File } from './config/types';
import { analyzeFiles } from './main/analyzeFiles';
import { sendLlama } from './main/llama';

export let repo: File | null = null;

process.on('uncaughtException', (error) => {
    if (error instanceof Error && error.name === 'ExitPromptError') {
        console.log('👋 until next time!');
    } else {
        console.error('Error occurred while processing the request');
    }
});
async function main() {
    cli();
}

main()