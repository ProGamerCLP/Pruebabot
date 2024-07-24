"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const badwords_1 = __importDefault(require("./badwords"));
const flood_1 = __importDefault(require("./flood"));
const ip_1 = __importDefault(require("./ip"));
const malware_1 = __importDefault(require("./malware"));
const invite_1 = __importDefault(require("./invite"));
const mentions_1 = __importDefault(require("./mentions"));
exports.default = {
    message: { badword: badwords_1.default, flood: flood_1.default, ip: ip_1.default, suspiciousFile: malware_1.default, invite: invite_1.default, mentions: mentions_1.default },
    kickAndBan: {},
    channel: {},
};
//# sourceMappingURL=exports.js.map