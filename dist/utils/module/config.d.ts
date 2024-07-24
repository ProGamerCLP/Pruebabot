/**
 * Gets a specific property from configuration, no specify property to get all data
 * @param modulePath
 * @param prop
 * @void
 */
declare function get(module: string, prop?: string): any | {
    [key: string]: any;
};
/**
 * Sets a new value for a property in configuration
 * @param modulePath
 * @param prop
 * @param value
 * @void
 */
declare function set(module: string, prop: string, value: string | number | boolean): void;
/**
 * Creates a new configuration file for a module
 * @param modulePath
 * @void
 */
declare function create(module: string): void;
/**
 * Tries to access the configuration files of the module
 * @param modulePath
 */
declare function access(filePath: string): true | false;
export declare const config: {
    get: typeof get;
    set: typeof set;
    create: typeof create;
    access: typeof access;
};
export {};
