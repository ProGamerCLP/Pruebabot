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
    const fieldIndex = submitted.values.removeFieldIndex;
    const index = Number(fieldIndex);
    if (isNaN(index))
        return yield submitted.response.reply({
            content: messages_1.default.isNan,
            ephemeral: true,
        });
    if (!embed.data.fields)
        return yield submitted.response.reply({
            content: messages_1.default.noFields,
            ephemeral: true,
        });
    const filteredFields = embed.data.fields.filter((field, i) => i + 1 !== index);
    embed.setFields(filteredFields);
    return 1;
});
//# sourceMappingURL=fieldRemove.js.map