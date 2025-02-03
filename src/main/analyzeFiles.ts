import { promises as fs } from "fs";
import * as path from "path";
import { File } from "../config/types";
import { IGNORE_LIST } from "../config/consts";


export async function analyzeFiles(dirPath: string): Promise<File> {
    const stats = await fs.stat(dirPath);

    if (!stats.isDirectory()) {
        return {
            name: path.basename(dirPath),
            isDirectory: false,
            extension: path.extname(dirPath).slice(1),
            content: await fs.readFile(dirPath, "utf-8").catch(() => undefined),
        };
    }

    const files = await fs.readdir(dirPath);
    const children: File[] = await Promise.all(
        files
            .filter((file) => !IGNORE_LIST.includes(file) && !file.startsWith("."))
            .map(async (file) => analyzeFiles(path.join(dirPath, file)))
    );

    return {
        name: path.basename(dirPath),
        isDirectory: true,
        children,
    };
}
