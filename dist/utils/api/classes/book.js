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
class Book {
    constructor(c) {
        this.page = 0;
        this.paragraph = 0;
        this.render = c.render;
        this.length = c.length;
        this.height = c.height || 0;
        if (c.interaction)
            this.interaction = c.interaction;
    }
    getLength() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.length === "number")
                return this.length;
            else
                return yield this.length();
        });
    }
    getPageHeight() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.height === "number")
                return this.height;
            else if (this.height)
                return yield this.height();
        });
    }
    fix() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.getLength())
                this.page = 1;
            else
                this.page = 0;
            if (yield this.getPageHeight())
                this.paragraph = 1;
            else
                this.paragraph = 0;
            yield this.write();
        });
    }
    navError() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[book] An error ocurred on this book:${this.interaction
                ? this.interaction.isCommand()
                    ? `\n- Id: ${this.interaction.commandName}\n`
                    : `\n- Id: ${this.interaction.customId}\n`
                : ""}- Page ${this.page}\n- Paragraph: ${this.paragraph}`);
        });
    }
    next() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.page)
                return yield this.navError();
            this.page += 1;
            const bookLength = yield this.getLength();
            if (this.page > bookLength)
                this.page = 1;
            this.paragraph = 1;
            yield this.write();
        });
    }
    previous() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.page)
                return yield this.navError();
            this.page -= 1;
            const bookLength = yield this.getLength();
            if (this.page <= 0)
                this.page = bookLength;
            this.paragraph = 1;
            yield this.write();
        });
    }
    lookParagraph(n) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.page)
                return yield this.navError();
            this.paragraph += n;
            const pageHeight = yield this.getPageHeight();
            if (pageHeight) {
                if (this.paragraph > pageHeight)
                    this.paragraph = 1;
                if (this.paragraph <= 0)
                    this.paragraph = pageHeight;
            }
            yield this.write();
        });
    }
    write() {
        return __awaiter(this, void 0, void 0, function* () {
            const render = yield this.render();
            if (this.interaction && this.interaction.replied)
                yield this.interaction.editReply(render);
        });
    }
}
/**
 * @example
    const book = new Book({
    render: async () => {
        return new EmbedBuilder();
    },
    length: 5,
        });
 */
exports.default = Book;
//# sourceMappingURL=book.js.map