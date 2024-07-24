declare class Ini {
    filename: string;
    filePath: string;
    constructor(filename: string);
    get(prop?: string): any;
    set(prop: string | never, value: string): void;
    getNumber(prop: string): number;
}
export default Ini;
