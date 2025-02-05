import logUpdate from "log-update";

const frames = ['-', '\\', '|', '/'];
let i = 0;

export function showLoading(msg: string) {
    return setInterval(() => {
        logUpdate(`${frames[i++ % frames.length]} ${msg}...`);
    }, 50);
}