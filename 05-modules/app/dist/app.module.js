"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
/**
 * app.module.ts
 *
 * [НОВЕ] Кореневий модуль тепер сам нічого не реєструє напряму
 * (controllers/providers порожні) - він лише ІМПОРТУЄ два менші
 * модулі, кожен відповідає за свою частину домену. Пов'язані файли:
 * books/books.module.ts, authors/authors.module.ts.
 */
const common_1 = require("@nestjs/common");
const books_module_1 = require("./books/books.module");
const authors_module_1 = require("./authors/authors.module");
const reviews_module_1 = require("./reviews/reviews.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [books_module_1.BooksModule, authors_module_1.AuthorsModule, reviews_module_1.ReviewsModule],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map