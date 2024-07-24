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
    const footerUrl = submitted.values.footer_icon;
    const footerText = submitted.values.footer_text || undefined;
    if (typeof footerText != "string")
        return;
    const footer = {
        iconURL: undefined,
        text: footerText,
    };
    if (footerUrl && (yield functions_1.url.isValidImage(footerText)))
        footer.iconURL = footerUrl;
    embed.setFooter(footer);
    return 1;
});
//# sourceMappingURL=footer.js.map