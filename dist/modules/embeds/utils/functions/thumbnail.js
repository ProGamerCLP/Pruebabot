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
const functions_1 = require("../../../../utils/functions/functions");
exports.default = (m, submitted, embed) => __awaiter(void 0, void 0, void 0, function* () {
    // get image url value
    const thumbnailUrl = submitted.values.thumbnail;
    const isValidThumbnail = yield functions_1.url.isValidImage(thumbnailUrl);
    if (isValidThumbnail) {
        embed.setThumbnail(thumbnailUrl);
        return 1;
    } // set url if is valid
    else {
        // if embed will get empty then we return a error response
        yield submitted.response.reply({
            content: messages_1.default.invalidImage,
            ephemeral: true, //
        });
    }
});
//# sourceMappingURL=thumbnail.js.map