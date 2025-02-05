import inquirer from "inquirer";
import { analyzeFiles } from "./main/analyzeFiles";
import logUpdate from "log-update";
import { sendLlama } from "./main/llama";
import { File } from "./config/types";

const frames = ['-', '\\', '|', '/'];
let i = 0;

function showLoading(msg: string) {
    return setInterval(() => {
        logUpdate(`${frames[i++ % frames.length]} ${msg}...`);
    }, 50);
}

export function cli() {
    console.log('Generate Plan | v1.0.0\n\n');

    let repo: File | null = null;
    inquirer.prompt({
        type: 'input',
        name: 'repo_path',
        message: 'Enter the path to the repository: ',
        default: './',
        validate: async (input: string) => {
            try {
                if (input.length === 0) {
                    return 'Please enter a valid path';
                }
                const loading = showLoading('Reading your Codebase');
                repo = await analyzeFiles(input);
                clearInterval(loading);

                if (!repo.exist) {
                    return 'Could not analyze the repository. Please enter a valid path';
                }
                logUpdate.clear();
                return true;
            } catch (error) {
                logUpdate.clear();
                return 'Could not analyze the repository. Please enter a valid path';
            }
        },
    },
    ).then(async () => {
        if (repo) {
            const loading = showLoading('Analyzing your Codebase');
            const data = await sendLlama({ role: 'user', content: `Repo contents:  ${JSON.stringify(repo)}` }, (token) => {
                logUpdate(token);
            });
            clearInterval(loading);
            logUpdate.clear();

            await chat();


        }
    });
}


async function chat() {
    while (true) {
        try {
            const { message } = await inquirer.prompt({
                type: 'input',
                name: 'message',
                message: 'You: ',
                validate: async (input: string) => {
                    if (input.length === 0) {
                        return 'Please enter a valid message';
                    }
                    return true;
                },
            })

            if (message === 'exit') {
                console.log('Exiting...');
                return;
            }
            const loading = showLoading('Processing your request');
            let response = await sendLlama({ role: 'user', content: message }, (token) => {
                logUpdate(token);
            });
            clearInterval(loading);
            logUpdate.clear();

            console.log('\nAnna:\n', response);

        } catch (error) {
            console.error('Error occurred while processing the request');
            process.exit(1);
        }
    }

}