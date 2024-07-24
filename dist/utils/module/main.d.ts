declare class Module {
    name: string;
    path: string;
    config: {
        get: Function;
        set: Function;
    };
    data: {
        get: {
            (prop?: string): Promise<any>;
        };
        set: {
            (prop: string, value: any): Promise<void>;
        };
        keys: {
            (): Promise<string[]>;
        };
        values: {
            (): Promise<any[]>;
        };
        delete: {
            (prop: string): void;
        };
        all: {
            (): Promise<{
                key: string;
                value: any;
            }[]>;
        };
    };
    manager?: {
        components: Function;
        embed: Function;
    };
    commands: boolean;
    events: boolean;
    interactions: boolean;
    constructor(module: string);
    /**
     * Gets all the files and contents from a module
     * @param dirname
     * @returns
     */
    getFiles(dirname: string): Map<string, any> | undefined;
}
export { Module };
