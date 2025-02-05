#!/usr/bin/env node

import inquirer from 'inquirer';
import { cli } from './cli';
import { File } from './config/types';
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import chalk from "chalk";

dotenv.config();

const ENV_PATH = path.resolve(__dirname, "../.env");


export let repo: File | null = null;
process.on('uncaughtException', (error) => {
    if (error instanceof Error && error.name === 'ExitPromptError') {
        console.log('Bye! 👋');
    } else {
        console.error('Error occurred while processing the request');
    }
});

async function getApiKey(): Promise<string> {
    let apiKey = process.env.API_KEY;

    if (!apiKey) {
        const response = await inquirer.prompt({
            type: "input",
            name: "api_key",
            message: "Enter your API key (Get it from https://openrouter.ai/): ",
            validate: (input: string) => (input.trim() ? true : "API key cannot be empty"),
        });

        apiKey = response.api_key;
        fs.writeFileSync(ENV_PATH, `API_KEY=${apiKey}\n`, { flag: "w" });

        console.log(chalk.green("API key saved successfully. Relaunch the CLI to continue."));
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