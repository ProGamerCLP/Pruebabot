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
exports.snowflake = void 0;
const discord_js_1 = require("discord.js");
// verifies if a string is a valid snowflake
function test(str) {
    try {
        discord_js_1.SnowflakeUtil.decode(str);
        return true;
    }
    catch (error) {
        return false;
    }
}
// checks if a snowflake is valid (secure)
function fetch(manager, snowflakeId) {
    return __awaiter(this, void 0, void 0, function* () {
        // if the id is not a valid snowflake
        if (!snowflakeId)
            return null;
        if (!test(snowflakeId))
            return null;
        try {
            // fetch the response
            const res = yield manager.fetch(snowflakeId);
            // if there is a response returns it
            if (res)
                return res;
            // in other way returns undefined
            else
                return undefined;
        }
        catch (error) {
            // if the request returns 404 then we return null
            return null;
        }
    });
}
exports.snowflake = { test, fetch };
//# sourceMappingURL=snowflake.js.map