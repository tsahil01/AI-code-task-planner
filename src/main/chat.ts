import inquirer from "inquirer";
import { sendLlama } from "./llama";
import logUpdate from "log-update";
import { showLoading } from "../config/config";
import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';
import chalk from 'chalk';

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

export async function chat() {
    while (true) {
        try {
            const { message } = await inquirer.prompt({
                type: 'input',
                name: 'message',
                message: 'Enter a plan that you would like to generate or type "exit" to quit: ',
                validate: async (input: string) => {
                    if (input.length === 0) {
                        return 'Please enter a valid message';
                    }
                    return true;
                },
            })

            if (message === 'exit') {
                console.log('Bye! 👋');
                return;
            }

            let tokens = ''
            const loading = showLoading('Processing your request');
            loading.color = 'yellow';
            loading.start();
            const responseText = await sendLlama({ role: 'user', content: message }, (token) => {
                loading.stop();
                tokens += token;
                logUpdate(chalk.italic.dim(tokens));
            });

            logUpdate.clear();
            console.log('\n', marked(responseText));

        } catch (error) {
            console.error(chalk.red('Error occurred while processing the request'));
        }
    }
}