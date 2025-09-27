export type isExistInput = { container: string; filename: string };
export type isExistOutput = boolean;

export type writeFileFromBase64Input = { container: string; filename: string; base64: string };
export type writeFileFromBase64Output = null;

export type readFileToBase64Input = { container: string; filename: string };
export type readFileToBase64Output = string;

export type lsInput = { container: string; prefix?: string };
export type lsOutput = string[];

export type removeFileInput = { container: string; filename: string };
export type removeFileOutput = null;

export type clearContainerInput = { container: string };
export type clearContainerOutput = null;

export interface IFileStorage {
    isExist(input: isExistInput): Promise<isExistOutput>;
    writeFileFromBase64(input: writeFileFromBase64Input): Promise<writeFileFromBase64Output>;
    readFileToBase64(input: readFileToBase64Input): Promise<readFileToBase64Output>;
    ls(input: lsInput): Promise<lsOutput>;
    removeFile(input: removeFileInput): Promise<removeFileOutput>;
    clearContainer(input: clearContainerInput): Promise<clearContainerOutput>;
}