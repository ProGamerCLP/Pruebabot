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
exports.Module = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const config_1 = require("./config");
const data_1 = require("./data");
const access = (path) => {
    try {
        fs_1.default.accessSync(path, fs_1.default.constants.R_OK);
        return true;
    }
    catch (error) {
        return false;
    }
};
class Module {
    constructor(module) {
        this.name = module;
        this.path = path_1.default.join("./dist/modules", module);
        // try to access the module, if it doesnt exist then throws an error
        if (!access(this.path))
            throw new Error(`${module} module is not activated.`);
        this.config = {
            get: (prop) => config_1.config.get(this.name, prop),
            set: (key, value) => config_1.config.set(this.name, key, value),
        };
        this.data = {
            get: (prop) => __awaiter(this, void 0, void 0, function* () { return yield data_1.data.get(this.name, prop); }),
            set: (prop, value) => __awaiter(this, void 0, void 0, function* () { return yield data_1.data.set(this.name, prop, value); }),
            keys: () => __awaiter(this, void 0, void 0, function* () { return yield data_1.data.keys(this.name); }),
            values: () => __awaiter(this, void 0, void 0, function* () { return yield data_1.data.values(this.name); }),
            delete: (prop) => data_1.data.delete(this.name, prop),
            all: () => __awaiter(this, void 0, void 0, function* () { return yield data_1.data.all(this.name); }),
        };
        // enabled or disabled actions
        this.commands = access(path_1.default.join(this.path, "commands")) ? true : false;
        this.events = access(path_1.default.join(this.path, "events")) ? true : false;
        this.interactions = access(path_1.default.join(this.path, "interactions"))
            ? true
            : false;
        // manager command settings
        const managerPath = path_1.default.join(this.path, "manager");
        if (access(managerPath)) {
            this.manager = {
                components: require(`${managerPath}/components.js`).main,
                embed: require(`${managerPath}/embed.js`).main,
            };
        }
    }
    /**
     * Gets all the files and contents from a module
     * @param dirname
     * @returns
     */
    getFiles(dirname) {
        if (dirname.includes(".."))
            throw new Error("Cannot access to other module files");
        const dirpath = path_1.default.join(this.path, dirname);
        if (!access(dirpath))
            return;
        const files = fs_1.default.readdirSync(dirpath);
        const map = new Map();
        console.log(`[Module] Looking for files in ${dirname} directory on ${this.name} module.`);
        for (const file of files) {
            if (!file.endsWith(".js"))
                continue;
            const filePath = path_1.default.join(__dirname, "../../../", dirpath, file);
            console.log(`> Found ${file}, processing path:\n  ${filePath}`);
            try {
                const exp = require(filePath).default;
                map.set(path_1.default.basename(file, ".js"), exp);
            }
            catch (error) {
                console.log(error);
            }
        }
        return map;
    }
}
exports.Module = Module;
// const mod = new Module("moderation");
//# sourceMappingURL=main.js.map