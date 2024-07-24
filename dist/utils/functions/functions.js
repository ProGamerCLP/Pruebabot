"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interfaces = exports.id = exports.snowflake = exports.url = exports.emoji = exports.dates = exports.logs = exports.collector = exports.modal = void 0;
const createFor_1 = require("./collectors/createFor");
const modal_1 = require("./discord/modal");
Object.defineProperty(exports, "modal", { enumerable: true, get: function () { return modal_1.modal; } });
const logs_1 = require("./discord/logs");
Object.defineProperty(exports, "logs", { enumerable: true, get: function () { return logs_1.logs; } });
const parseDate_1 = require("./string/parseDate");
const emoji_1 = require("../api/functions/emoji");
Object.defineProperty(exports, "emoji", { enumerable: true, get: function () { return emoji_1.emoji; } });
const url_1 = require("./string/url");
Object.defineProperty(exports, "url", { enumerable: true, get: function () { return url_1.url; } });
const snowflake_1 = require("./string/snowflake");
Object.defineProperty(exports, "snowflake", { enumerable: true, get: function () { return snowflake_1.snowflake; } });
const id_1 = require("./string/id");
Object.defineProperty(exports, "id", { enumerable: true, get: function () { return id_1.id; } });
const embedPages_1 = __importDefault(require("./interfaces/embedPages"));
const collector = {
    createFor: createFor_1.createFor,
};
exports.collector = collector;
const dates = {
    parseDate: parseDate_1.parseDate,
};
exports.dates = dates;
const interfaces = {
    ResponsiveEmbed: embedPages_1.default,
};
exports.interfaces = interfaces;
//# sourceMappingURL=functions.js.map