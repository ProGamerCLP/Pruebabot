"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = __importDefault(require("../../messages"));
exports.default = (m, submitted, embed) => {
    // get title value
    const title = submitted.values.title;
    if (title === "false") {
        if (!embed.data.author &&
            !embed.data.color &&
            !embed.data.description &&
            !embed.data.footer &&
            !embed.data.image &&
            !embed.data.fields &&
            !embed.data.thumbnail)
            return submitted.response.reply({
                content: messages_1.default.emptyEmbed,
                ephemeral: true,
            });
        embed.setTitle(null);
        return 1;
    }
    else {
        if (title)
            embed.setTitle(title);
        return 1;
    }
};
//# sourceMappingURL=title.js.map