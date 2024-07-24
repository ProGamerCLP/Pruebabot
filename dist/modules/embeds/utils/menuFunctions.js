"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const author_1 = __importDefault(require("./functions/author"));
const color_1 = __importDefault(require("./functions/color"));
const description_1 = __importDefault(require("./functions/description"));
const fieldAdd_1 = __importDefault(require("./functions/fieldAdd"));
const fieldRemove_1 = __importDefault(require("./functions/fieldRemove"));
const footer_1 = __importDefault(require("./functions/footer"));
const image_1 = __importDefault(require("./functions/image"));
const thumbnail_1 = __importDefault(require("./functions/thumbnail"));
const title_1 = __importDefault(require("./functions/title"));
const menuOption = {
    author: author_1.default,
    color: color_1.default,
    description: description_1.default,
    fieldAdd: fieldAdd_1.default,
    fieldRemove: fieldRemove_1.default,
    footer: footer_1.default,
    image: image_1.default,
    thumbnail: thumbnail_1.default,
    title: title_1.default,
};
exports.default = {
    menuOption,
};
//# sourceMappingURL=menuFunctions.js.map