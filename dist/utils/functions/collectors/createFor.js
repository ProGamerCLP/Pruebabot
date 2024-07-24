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
exports.createFor = void 0;
// creates a interaction componentCollector for an interaction
function createFor(interaction, listener, time) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!interaction.channel)
            throw new Error("There is no channel for this interaction!");
        // INTERACTION MUST BE REPLIED
        const reply = yield interaction.fetchReply();
        if (!reply)
            throw new Error(`Can't listen to interaction components if there is no reply to filter. (/${interaction.commandName})`);
        // dont process the interaction if the user is different or the message id also is
        const filter = (m) => interaction.user.id === m.user.id && reply.id === m.message.id;
        // create a 5 min collector
        const collector = interaction.channel.createMessageComponentCollector({
            time: time ? time * 1000 : 5 * 60 * 1000,
            filter: filter,
        });
        collector.on("collect", (m) => __awaiter(this, void 0, void 0, function* () {
            listener.collect(m);
        }));
        collector.on("end", (m) => __awaiter(this, void 0, void 0, function* () {
            listener.end(m);
            collector.stop();
        }));
    });
}
exports.createFor = createFor;
//# sourceMappingURL=createFor.js.map