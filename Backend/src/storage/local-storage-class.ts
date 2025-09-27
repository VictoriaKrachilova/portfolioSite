import fs from "fs/promises";
import path from "path";
import { clearContainerInput, clearContainerOutput, IFileStorage, isExistInput, isExistOutput, lsInput, lsOutput, readFileToBase64Input, readFileToBase64Output, removeFileInput, removeFileOutput, writeFileFromBase64Input, writeFileFromBase64Output } from "./types";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalFileStorage implements IFileStorage {
    private baseDir: string;

    constructor() {
        this.baseDir = process.env.BASE_DIR || "./uploads";
        fs.mkdir(this.baseDir, { recursive: true }).catch(() => {});
    }

    private getFilePath(container: string, filename: string) {
        return path.join(this.baseDir, container, filename);
    }

    private getContainerPath(container: string) {
        return path.join(this.baseDir, container);
    }

    async isExist({ container, filename }: isExistInput): Promise<isExistOutput> {
        try {
            await fs.access(this.getFilePath(container, filename));
            return true;
        } catch {
            return false;
        }
    }

    async writeFileFromBase64({ container, filename, base64 }: writeFileFromBase64Input): Promise<writeFileFromBase64Output> {
        const containerPath = this.getContainerPath(container);
        await fs.mkdir(containerPath, { recursive: true });
        const buffer = Buffer.from(base64, "base64");
        await fs.writeFile(this.getFilePath(container, filename), buffer);
        return null;
    }

    async readFileToBase64({ container, filename }: readFileToBase64Input): Promise<readFileToBase64Output> {
        const buffer = await fs.readFile(this.getFilePath(container, filename));
        return buffer.toString("base64");
    }

    async ls({ container, prefix }: lsInput): Promise<lsOutput> {
        try {
            let files = await fs.readdir(this.getContainerPath(container));
            if (prefix) files = files.filter(f => f.startsWith(prefix));
            return files;
        } catch {
            return [];
        }
    }

    async removeFile({ container, filename }: removeFileInput): Promise<removeFileOutput> {
        try {
            await fs.unlink(this.getFilePath(container, filename));
        } catch {}
        return null;
    }

    async clearContainer({ container }: clearContainerInput): Promise<clearContainerOutput> {
        try {
            await fs.rm(this.getContainerPath(container), { recursive: true, force: true });
        } catch {}
        return null;
    }
}