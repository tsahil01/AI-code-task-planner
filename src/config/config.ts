import chalk from "chalk";
import TerminalRenderer from "marked-terminal";
import ora from "ora";

export function showLoading(msg: string) {
        const spinner = ora(chalk.yellow.italic(msg));
        return spinner;
}

export const terminalRenderer = {
        renderer: new TerminalRenderer({
                code: chalk.yellow,
                blockquote: chalk.gray.italic,
                // table: true,
                listitem: chalk.cyan,
                strong: (text: string) => chalk.bold(text),
                em: (text: string) => chalk.italic(text),
                heading: (text: string) => chalk.bold.underline(text)
        },) as any
}