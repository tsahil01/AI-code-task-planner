import { cli } from './cli';
import { File } from './config/types';

export let repo: File | null = null;
process.on('uncaughtException', (error) => {
    if (error instanceof Error && error.name === 'ExitPromptError') {
        console.log('Bye! 👋');
    } else {
        console.error('Error occurred while processing the request');
    }
});
async function main() {
    cli();
}

main()