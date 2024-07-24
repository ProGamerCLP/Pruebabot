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
const discord_js_1 = require("discord.js");
const functions_1 = require("../functions");
class ResponsiveEmbed {
    constructor(render, interaction) {
        this.x = 0;
        this.y = 0;
        this.render = render;
        this.interaction = interaction;
    }
    navigate(n) {
        if (n.x)
            this.x += n.x;
        if (n.y)
            this.y += n.y;
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.interaction)
                return;
            const render = yield this.render();
            if (this.interaction.replied)
                yield this.interaction.editReply(render);
            else
                yield this.interaction.reply(render);
        });
    }
    setCollector(functions) {
        if (!this.interaction ||
            !(this.interaction instanceof discord_js_1.ChatInputCommandInteraction))
            throw new Error("[] Invalid interaction provided.");
        functions_1.collector.createFor(this.interaction, {
            collect: (m) => __awaiter(this, void 0, void 0, function* () {
                if (m.customId in functions) {
                    yield functions[m.customId](m);
                    if ("default" in functions)
                        yield functions.default(m);
                }
            }),
            end: () => __awaiter(this, void 0, void 0, function* () {
                if (this.interaction && this.interaction.replied) {
                    try {
                        this.interaction.editReply({
                            components: [],
                        });
                    }
                    catch (e) {
                        return null;
                    }
                }
            }),
        });
    }
}
exports.default = ResponsiveEmbed;
//# sourceMappingURL=embedPages.js.map