import inquirer from "inquirer";
import { analyzeFiles } from "./main/analyzeFiles";
import logUpdate from "log-update";
import { sendLlama } from "./main/llama";
import { File } from "./config/types";
import { chat } from "./main/chat";
import { showLoading, terminalRenderer } from "./config/config";
import { marked } from 'marked';
import chalk from 'chalk';
import process from 'process';
import boxen from "boxen";

marked.setOptions(terminalRenderer);

export async function cli() {
    let repo: File | null = null;

    console.log(boxen(`Welcome to ${chalk.cyan.bold('AI')} code planning assistant`, {
        title: chalk.cyanBright.bold('🦙 Code Planning Assistant'),
        titleAlignment: 'left',
        textAlignment: 'center',
        padding: 1,
        borderStyle: 'doubleSingle',
    }));
    console.log(chalk.cyan('Effortlessly plan your code tasks with the power of artificial intelligence!'));

    inquirer.prompt({
        type: 'input',
        name: 'repo_path',
        message: 'Enter the path to your repository (press Enter to use the current directory): ',
        default: process.cwd(),
        transformer: (input: string) => `🔍 ${input}`,
        validate: async (input: string) => {
            try {
                if (input.length === 0) input = process.cwd();
                const loading = showLoading('Reading your Codebase');
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
    }).then(async () => {
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
                console.log('\n');
                console.log(marked(data));
                console.log(chalk.greenBright(`\nExample prompts:\n`));
                console.log(chalk.yellowBright(`- Plan a new feature for the user authentication module.\n- Refactor the existing database connection code.\n- Optimize the performance of the server-side operations.`));
                await chat();
            }
        } catch (error) {
            console.error(chalk.red('Error occurred while processing the request'));
            process.exit(1);
        }
    });
}

