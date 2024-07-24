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
exports.client = void 0;
const config_1 = __importDefault(require("./config"));
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const main_1 = require("../module/main");
const modulePath = "./dist/modules";
const isCommand = (x) => x;
/**
 * starts the client
 */
function create() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // create new instance of client
        const client = new discord_js_1.Client(config_1.default);
        // client actions
        client.commands = new discord_js_1.Collection();
        client.interactions = new discord_js_1.Collection();
        client.events = new discord_js_1.Collection();
        // list modules
        const modules = fs_1.default.readdirSync(modulePath);
        // fo reach module check what every one does
        for (const moduleName of modules) {
            if ((_a = process.env.skip) === null || _a === void 0 ? void 0 : _a.includes(moduleName))
                continue;
            const module = new main_1.Module(moduleName);
            // loading client commands
            if (module.commands) {
                const commands = module.getFiles("commands");
                if (commands) {
                    for (const cmd of commands.values()) {
                        if (!isCommand(cmd))
                            continue;
                        client.commands.set(cmd.data.name, cmd);
                    }
                }
            }
            // setup events
            if (module.events) {
                const events = module.getFiles("events");
                if (events) {
                    for (const [eventName, listener] of events.entries()) {
                        if (typeof listener != "function")
                            continue;
                        let listeners = client.events.get(eventName);
                        if (!listeners) {
                            client.events.set(eventName, []);
                            listeners = [];
                        }
                        listeners.push(listener);
                        client.events.set(eventName, listeners);
                    }
                }
            }
            // add interactions
            if (module.interactions) {
                const interactions = module.getFiles("interactions");
                if (interactions) {
                    for (const [trigger, run] of interactions.entries()) {
                        const triggerName = `${trigger}`;
                        if (client.interactions.has(triggerName))
                            continue;
                        client.interactions.set(triggerName, run);
                    }
                }
            }
        }
        // once every module has been read
        startListening(client);
        if (process.env.registerCommands)
            yield registerCommands(client);
        return client;
    });
}
/**
 * Starts listening to every command of client commands
 * @param client
 */
function startListening(client) {
    for (const [event, listeners] of client.events.entries()) {
        client.on(event, (ctx) => {
            for (const listener of listeners)
                listener(ctx);
        });
    }
    console.log(`[start] Loaded ${client.events.size} events.`);
}
/**
 * Register every command
 * @param client
 */
function registerCommands(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const secret = process.env.secret;
        const guild = process.env.guild;
        if (!secret)
            return;
        const base64Id = secret.split(".")[0];
        const clientId = Buffer.from(base64Id, "base64").toString("ascii");
        const Rest = new discord_js_1.REST().setToken(secret);
        const parsedCommands = client.commands.map((cmd) => cmd.data.toJSON());
        console.log(`[cmds] Registering ${parsedCommands.length} {/} commands...`);
        let i = 1;
        setInterval(() => {
            i++;
        }, 1000);
        // Registering the parsed commands
        const routes = guild
            ? discord_js_1.Routes.applicationGuildCommands(clientId, guild)
            : discord_js_1.Routes.applicationCommands(clientId);
        yield Rest.put(routes, {
            body: parsedCommands,
        });
        console.log(`[cmds] Registered ${parsedCommands.length} {/} in ${i} second${i > 1 ? "s" : ""}.`);
    });
}
exports.client = { create };
//# sourceMappingURL=main.js.map