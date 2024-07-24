/**
 * Gets a property from the json file - or the entire json file -
 * @param filePath
 * @param prop
 */
declare function get(module: string, prop?: string): Promise<any>;
/**
 * Sets a new entry value to the json file
 * @param filePath
 * @param key
 * @param value
 */
declare function set(module: string, key: string, value: string | number | boolean): Promise<void>;
declare function keys(module: string): Promise<string[]>;
declare function values(module: string): Promise<any[]>;
declare function del(module: string, prop: string): Promise<void>;
declare function all(module: string): Promise<{
    key: string;
    value: any;
}[]>;
export declare const data: {
    get: typeof get;
    set: typeof set;
    keys: typeof keys;
    values: typeof values;
    delete: typeof del;
    all: typeof all;
};
export {};
