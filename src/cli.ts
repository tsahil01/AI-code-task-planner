import inquirer from "inquirer";
import { analyzeFiles } from "./main/analyzeFiles";
import logUpdate from "log-update";
import { sendLlama } from "./main/llama";
import { File } from "./config/types";
import { chat } from "./main/chat";
import { showLoading } from "./config/config";
import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';
import chalk from 'chalk';
import process from 'process';

marked.setOptions({
    renderer: new TerminalRenderer({
        code: chalk.yellow,
        blockquote: chalk.gray.italic,
        // table: true,
        listitem: chalk.cyan,
        strong: chalk.bold,
        em: chalk.italic,
        heading: chalk.bold.underline,
        hr: chalk.gray,
        link: chalk.blue.underline,
    }) as any
});

export function cli() {
    let repo: File | null = null;

    console.log(chalk.italic.greenBright('Generate Plan | v1.0.0\n'));

    inquirer.prompt({
        type: 'input',
        name: 'repo_path',
        message: 'Enter the path to the repository: ',
        default: process.cwd(),
        validate: async (input: string) => {
            try {
                if (input.length === 0) {
                    return 'Please enter a valid path';
                }
                const loading = showLoading('Reading your Codebase')
                loading.color = 'yellow';
                loading.start();
                repo = await analyzeFiles(input);
                loading.stop();

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
        try {

            if (repo) {
                let tokens = ''
                const loading = showLoading('Analyzing your Codebase');
                loading.color = 'green';
                loading.start();
                const data = await sendLlama({ role: 'user', content: `Repo contents:  ${JSON.stringify(repo)}` }, (token) => {
                    loading.stop(); 
                    tokens += token;
                    logUpdate(chalk.italic.dim(tokens));
                });
                logUpdate.clear();
                if (data === 'Error occurred while processing the request') {
                    console.error(chalk.red('Error occurred while processing the request'));
                    process.exit(1);
                }
                console.log('\n', marked(data));
                await chat();
            }
        } catch (error) {
            console.error(chalk.red('Error occurred while processing the request'));
            process.exit(1);
        }
    });
}

