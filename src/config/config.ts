import ora from "ora";

export function showLoading(msg: string) {
        const spinner = ora(msg);
        return spinner;
}