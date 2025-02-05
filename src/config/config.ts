import logUpdate from "log-update";
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


const frames = ['-', '\\', '|', '/'];
let i = 0;

export function showLoading(msg: string) {
    return setInterval(() => {
        logUpdate(chalk.italic.dim(`${frames[i++ % frames.length]} ${msg}...`));
    }, 50);
}