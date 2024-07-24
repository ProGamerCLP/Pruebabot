"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ini_1 = __importDefault(require("ini"));
const modulePath = "./dist/modules";
const configPath = "./.ini";
/**
 * Gets a specific property from configuration, no specify property to get all data
 * @param modulePath
 * @param prop
 * @void
 */
function get(module, prop) {
    const configFilePath = path_1.default.join(configPath, `${module}.ini`);
    if (!access(configFilePath))
        create(module);
    const content = fs_1.default.readFileSync(configFilePath, "utf-8");
    const config = ini_1.default.parse(content);
    if (prop)
        return config[prop];
    else
        return config;
}
/**
 * Sets a new value for a property in configuration
 * @param modulePath
 * @param prop
 * @param value
 * @void
 */
function set(module, prop, value) {
    const configFilePath = path_1.default.join(configPath, `${module}.ini`);
    if (!access(configFilePath))
        create(module);
    const content = fs_1.default.readFileSync(configFilePath, "utf-8");
    const config = ini_1.default.parse(content);
    config[prop] = value;
    fs_1.default.writeFileSync(configFilePath, ini_1.default.stringify(config), "utf-8");
    console.log(`> Changes applied to config file "${prop}": "${value}"`);
}
/**
 * Creates a new configuration file for a module
 * @param modulePath
 * @void
 */
function create(module) {
    const filePath = path_1.default.join(configPath, module + ".ini");
    const dcfp = `dist/modules/${module}/config/default.js`; // default configuration file path
    const dcfpr = `../../../${dcfp}`; // relative
    const config = access(dcfp) ? ini_1.default.stringify(require(dcfpr).def) : "";
    fs_1.default.writeFileSync(filePath, config, "utf-8");
}
/**
 * Tries to access the configuration files of the module
 * @param modulePath
 */
function access(filePath) {
    try {
        fs_1.default.accessSync(filePath);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.config = { get, set, create, access };
//# sourceMappingURL=config.js.map