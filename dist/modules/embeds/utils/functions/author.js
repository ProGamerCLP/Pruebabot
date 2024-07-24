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
const functions_1 = require("../../../../utils/functions/functions");
exports.default = (m, submitted, embed) => __awaiter(void 0, void 0, void 0, function* () {
    const authorUrl = submitted.values.authorUrl;
    const authorName = submitted.values.authorName;
    if (typeof authorName != "string")
        return;
    const author = {
        iconURL: undefined,
        name: authorName,
    };
    if (authorUrl && (yield functions_1.url.isValidImage(authorUrl)))
        author.iconURL = authorUrl;
    embed.setAuthor(author);
    return 1;
});
//# sourceMappingURL=author.js.map