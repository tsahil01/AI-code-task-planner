import inquirer from "inquirer";
import { sendLlama } from "./llama";
import logUpdate from "log-update";
import { showLoading } from "../config/config";

export async function chat() {
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