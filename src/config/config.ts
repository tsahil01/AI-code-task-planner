import chalk from "chalk";
import ora from "ora";

export function showLoading(msg: string) {
        const spinner = ora(chalk.yellow.italic(msg));
        return spinner;
}