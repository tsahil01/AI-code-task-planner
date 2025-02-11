import chalk from "chalk";
import TerminalRenderer from "marked-terminal";
import ora from "ora";

export function showLoading(msg: string) {
        const spinner = ora(chalk.yellow.italic(msg));
        return spinner;
}

export const terminalRenderer = {
        renderer: new TerminalRenderer({
                showSectionPrefix: false,
                reflowText: true,
                width: 100,
                tableOptions: {
                        chars: { 'top': '', 'top-mid': '', 'top-left': '', 'top-right': '', 'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '', 'left': '', 'left-mid': '', 'mid': '', 'mid-mid': '', 'right': '', 'right-mid': '', 'middle': ' ' },
                        style: { 'padding-left': 0, 'padding-right': 0 }
                },
                heading: chalk.bold.underline.cyanBright,
                hr: (char: string) => chalk.gray(char),
                code: chalk.cyanBright,
                blockquote: chalk.italic,
                link: chalk.blue,
                href: chalk.underline.blue,
                em: chalk.italic,
                strong: chalk.bold,
                codespan: chalk.cyan,
                del: chalk.dim,
                listitem: (text: string) => (chalk.greenBright(`- ${text}`)).replace(/- \[x\]/g, chalk.greenBright('- [x]')).replace(/- \[ \]/g, chalk.greenBright('- [ ]')),
        }
        ) as any
}