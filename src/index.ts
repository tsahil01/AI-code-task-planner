#!/usr/bin/env node

import { cli } from './cli';
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();
process.on('uncaughtException', (error) => {
    if (error instanceof Error && error.name === 'ExitPromptError') {
        console.log('Bye! 👋');
    } else {
        console.error('Error occurred while processing the request');
    }
});

async function getApiKey(): Promise<string> {
    let apiKey = process.env.OPEN_ROUTE_API_KEY;
    if (!apiKey) {
        console.log(chalk.red('API key not found in environment variables'));
        console.log(chalk.yellow.italic('Please provide your OpenRouteService API key. You can get one for free from https://openrouter.ai/'));
        console.log(chalk(`Save it in your environment variables as, ${chalk.bold.green.italic('OPEN_ROUTE_API_KEY=<Your API Key>')}`));
        process.exit(0);
    }
    return apiKey as string;
}

async function main() {
    await getApiKey();
    console.log('\n');
    cli();
}

main()