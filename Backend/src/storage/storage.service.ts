import { Injectable } from "@nestjs/common";
import { IFileStorage } from "./types";

@Injectable()
export class StorageService {
    constructor(private storage: IFileStorage) { }

    async saveFile(container: string, filename: string, base64: string) {
        return this.storage.writeFileFromBase64({ container, filename, base64 });
    }

    async getFile(container: string, filename: string) {
        return this.storage.readFileToBase64({ container, filename });
    }

    async listFiles(container: string, prefix?: string) {
        return this.storage.ls({ container, prefix });
    }

    async deleteFile(container: string, filename: string) {
        return this.storage.removeFile({ container, filename });
    }

    async clearContainer(container: string) {
        return this.storage.clearContainer({ container });
    }
}