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
/**
 * Interaction event, executes when user interacts
 * @param {Interaction} interaction
 * @void
 */
function interactionHandler(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const { client: c } = interaction;
        if (interaction.isChatInputCommand()) {
            // Command interaction
            const command = c.commands.get(interaction.commandName);
            if (!command)
                return;
            if (command.execute) {
                command.execute(interaction);
                console.log(`[command] ${interaction.user.username} used /${interaction.commandName}`);
            }
            else {
                console.error("Command does not have an execute method");
            }
        }
        else if (interaction.isMessageComponent()) {
            const execute = c.interactions.get(interaction.customId);
            if (!execute)
                return;
            execute(interaction);
            console.log(`[interaction] ${interaction.user.username} used >${interaction.customId}`);
        }
    });
}
exports.default = interactionHandler;
//# sourceMappingURL=interactionCreate.js.map