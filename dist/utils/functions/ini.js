"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colorette_1 = require("colorette");
const fs_1 = __importDefault(require("fs"));
const ini_1 = __importDefault(require("ini"));
const path_1 = require("path");
const iniPath = "./.ini";
class Ini {
    constructor(filename) {
        this.filename = filename;
        this.filePath = (0, path_1.join)(iniPath, `${filename}.ini`);
        if (!access(this.filePath)) {
            create(this.filePath);
        }
    }
    get(prop) {
        return get(this.filePath, prop);
    }
    set(prop, value) {
        edit(this.filePath, prop, value);
    }
    getNumber(prop) {
        return getNumber(this.filePath, prop);
    }
}
function access(filePath) {
    try {
        fs_1.default.accessSync(filePath);
        return true;
    }
    catch (error) {
        return false;
    }
}
function create(filePath) {
    fs_1.default.writeFileSync(filePath, "", "utf-8"); // in case of exception is better to throw an error
}
function edit(filePath, property, value) {
    if (!access(filePath))
        throw new Error(`No configuration file called ${filePath}`);
    const content = fs_1.default.readFileSync(filePath, "utf-8");
    const config = ini_1.default.parse(content);
    config[property] = value;
    fs_1.default.writeFileSync(filePath, ini_1.default.stringify(config), "utf-8");
    console.log(`> Changes applied to config file "${property}": "${value}"`, (0, colorette_1.gray)(filePath));
}
function get(filePath, property) {
    if (!access(filePath))
        throw new Error(`No configuration file called ${filePath}`);
    const content = fs_1.default.readFileSync(filePath, "utf-8");
    const config = ini_1.default.parse(content);
    if (property)
        return config[property];
    else
        return config;
}
function getNumber(filePath, property) {
    if (!access(filePath))
        throw new Error(`No configuration file called ${filePath}`);
    const content = fs_1.default.readFileSync(filePath, "utf-8");
    const config = ini_1.default.parse(content);
    return Number(config[property]);
}
exports.default = Ini;
//# sourceMappingURL=ini.js.map