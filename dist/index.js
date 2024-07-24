"use strict";
/*
  
    |\__/,|   (`\
  _.|o o  |_   ) )
-(((---(((--------------------------------
   ___          _                        _
  / __\___   __| | ___  ___ ___  _ __ __| |
 / /  / _ \ / _` |/ _ \/ __/ _ \| '__/ _` |
/ /__| (_) | (_| |  __/ (_| (_) | | | (_| |
\____/\___/ \__,_|\___|\___\___/|_|  \__,_|

        https://discord.gg/codecord
------------------------------------------
*/
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
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const colorette_1 = require("colorette");
const main_1 = require("./utils/client/main");
// env
dotenv_1.default.config();
// start client
(() => __awaiter(void 0, void 0, void 0, function* () {
    // create client
    const c = yield main_1.client.create();
    yield c.login(process.env.secret);
    const ascii = fs_1.default.readFileSync("./assets/files/ascii.txt", "utf8");
    console.clear();
    ascii.split("\n").forEach((l) => console.log((0, colorette_1.magentaBright)(l)));
    if (c.user)
        console.log((0, colorette_1.blueBright)(`[info] Bot connected as ${c.user.username}`));
}))();
//
//# sourceMappingURL=index.js.map