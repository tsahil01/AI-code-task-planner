import { promises as fs } from "fs";
import * as path from "path";
import { File } from "../config/types";
import { IGNORE_LIST } from "../config/consts";


export async function analyzeFiles(dirPath: string): Promise<File> {
    try {
        const stats = await fs.stat(dirPath);
        if (!stats.isDirectory()) {
            return {
                name: path.basename(dirPath),
                isDirectory: false,
                extension: path.extname(dirPath).slice(1),
                content: await fs.readFile(dirPath, "utf-8").catch(() => undefined),
                exist: true,
            };
        }

        const files = await fs.readdir(dirPath);
        const children: File[] = await Promise.all(
            files
                .filter((file) => !IGNORE_LIST.includes(file) && !file.startsWith(".") && !file.startsWith("tsconfig."))
                .map(async (file) => analyzeFiles(path.join(dirPath, file)))
        );

        return {
            name: path.basename(dirPath),
            isDirectory: true,
            children,
            exist: true,
        };
    } catch (error) {
        return {
            name: path.basename(dirPath),
            isDirectory: false,
            extension: path.extname(dirPath).slice(1),
            content: undefined,
            exist: false,
        };
    }
}
