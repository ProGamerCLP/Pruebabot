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
Object.defineProperty(exports, "__esModule", { value: true });
const presences_1 = require("../presences");
const module_1 = require("../module"); // module instance declared as "mod", otherwise typescript compilation will crash
function updatePresence(client, i) {
    return __awaiter(this, void 0, void 0, function* () {
        const presence = presences_1.presences[i];
        const parameter = yield presence.parameter(client);
        if (!("user" in client) || !client.user)
            return;
        client.user.setPresence({
            activities: [
                {
                    name: presence.label(parameter),
                    type: presence.type,
                },
            ],
            status: presence.status,
        });
    });
}
let i = 0;
/**
 * Updates the client presence
 * @param {Client} client
 * @void
 */
exports.default = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const interval = Number(module_1.mod.config.get("interval"));
    if (typeof interval !== "number" || isNaN(interval))
        throw new Error("[presences] Presence update interval must be a number.");
    console.log(`[presences] From now presences are going to be updated every ${interval} seconds.`);
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        i++;
        if (i + 1 > presences_1.presences.length)
            i = 0;
        yield updatePresence(client, i);
    }), interval * 1000);
});
//# sourceMappingURL=ready.js.map