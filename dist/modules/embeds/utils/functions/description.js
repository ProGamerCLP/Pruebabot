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
const messages_1 = __importDefault(require("../../messages"));
exports.default = (m, submitted, embed) => __awaiter(void 0, void 0, void 0, function* () {
    const description = submitted.values.description;
    if (description.length < 0) {
        // if embed will get empty then we return a error response
        if (!embed.data.author &&
            !embed.data.color &&
            !embed.data.title &&
            !embed.data.footer &&
            !embed.data.image &&
            !embed.data.fields &&
            !embed.data.thumbnail)
            return yield submitted.response.reply({
                content: messages_1.default.emptyEmbed,
                ephemeral: true,
            });
        // in other case we delete the description
        embed.setDescription(null);
        return 1;
    }
    else {
        // set the new description value
        embed.setDescription(description);
        return 1;
    }
});
//# sourceMappingURL=description.js.map