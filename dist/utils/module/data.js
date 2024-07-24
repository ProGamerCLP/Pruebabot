"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dataPath = "./json";
/**
 * Tries to access an specific Json file
 * @param filePath
 * @returns
 */
function access(filePath) {
    try {
        fs_1.default.accessSync(filePath + ".json");
        return true;
    }
    catch (error) {
        return false;
    }
}
/**
 * Creates the json file
 * @param filePath
 */
function create(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        fs_1.default.writeFileSync(filePath + ".json", JSON.stringify({}, null, 2));
    });
}
/**
 * Reads the json file
 * @param filePath
 * @param prop
 */
function read(module, prop) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonFilePath = path_1.default.join(dataPath, module);
        if (!access(jsonFilePath))
            yield create(jsonFilePath);
        const fileContent = fs_1.default.readFileSync(jsonFilePath + ".json", "utf8");
        const content = JSON.parse(fileContent);
        return content;
    });
}
/**
 * Gets a property from the json file - or the entire json file -
 * @param filePath
 * @param prop
 */
function get(module, prop) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield read(module);
        if (prop)
            return data[prop];
        else
            return data;
    });
}
/**
 * Sets a new entry value to the json file
 * @param filePath
 * @param key
 * @param value
 */
function set(module, key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonFilePath = path_1.default.join(dataPath, module);
        const data = yield read(module);
        data[key] = value;
        fs_1.default.writeFileSync(jsonFilePath + ".json", JSON.stringify(data, null, 2));
    });
}
function keys(module) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield read(module);
        return Object.keys(data);
    });
}
function values(module) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield read(module);
        return Object.values(data);
    });
}
function del(module, prop) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield read(module);
        const jsonFilePath = path_1.default.join(dataPath, module + ".json");
        if (!data[prop])
            throw new Error(`Property ${prop} is not a valid key.`);
        const newData = Object.fromEntries(Object.entries(data).filter(([k, v]) => k !== prop));
        fs_1.default.writeFileSync(jsonFilePath, JSON.stringify(newData, null, 2));
    });
}
function all(module) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield read(module);
        return Object.entries(data).map(([key, value]) => ({
            key,
            value,
        }));
    });
}
exports.data = { get, set, keys, values, delete: del, all };
//# sourceMappingURL=data.js.map