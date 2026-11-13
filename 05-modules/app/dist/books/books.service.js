"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
/**
 * books.service.ts
 *
 * [НОВЕ] BooksService тепер залежить не лише від власних даних, а й
 * від AuthorsService з ІНШОГО модуля (authors/). Це можливо лише
 * тому, що BooksModule імпортує AuthorsModule, а AuthorsModule
 * експортує AuthorsService (див. books.module.ts, authors.module.ts).
 * Пов'язаний файл: books.controller.ts.
 */
const common_1 = require("@nestjs/common");
const authors_service_1 = require("../authors/authors.service");
let BooksService = class BooksService {
    authorsService;
    // [НОВЕ] Другий параметр конструктора - залежність з іншого модуля.
    // Для Nest це виглядає так само, як будь-яка інша залежність:
    // AuthorsService зареєстрований (у своєму модулі) і експортований,
    // тож IoC-контейнер може його підставити тут.
    constructor(authorsService) {
        this.authorsService = authorsService;
    }
    books = [
        { id: 1, title: 'Кобзар', authorId: 1, year: 1840 },
        { id: 2, title: 'Тигролови', authorId: 2, year: 1944 },
    ];
    nextId = 3;
    withAuthor(book) {
        const author = this.authorsService.findByIdOrThrow(book.authorId);
        return { ...book, authorName: author.name };
    }
    parseId(id) {
        const parsed = Number(id);
        if (Number.isNaN(parsed)) {
            throw new common_1.BadRequestException('id має бути числом');
        }
        return parsed;
    }
    findAll() {
        return this.books.map((b) => this.withAuthor(b));
    }
    findOneOrThrow(id) {
        const book = this.books.find((b) => b.id === id);
        if (!book) {
            throw new common_1.NotFoundException(`Книжку з id=${id} не знайдено`);
        }
        return this.withAuthor(book);
    }
    create(dto) {
        // [НОВЕ] Перевіряємо, що автор існує, ЗАПИТУЮЧИ AuthorsService -
        // замість того, щоб BooksService сам щось знав про те, як
        // зберігаються автори. Кожен модуль відповідає тільки за своє.
        this.authorsService.findByIdOrThrow(dto.authorId);
        const book = {
            id: this.nextId,
            title: dto.title,
            authorId: dto.authorId,
            year: dto.year,
        };
        this.nextId += 1;
        this.books.push(book);
        return this.withAuthor(book);
    }
    update(id, dto) {
        this.findOneOrThrow(id);
        this.authorsService.findByIdOrThrow(dto.authorId);
        const updated = { id, title: dto.title, authorId: dto.authorId, year: dto.year };
        this.books = this.books.map((b) => (b.id === id ? updated : b));
        return this.withAuthor(updated);
    }
    remove(id) {
        this.findOneOrThrow(id);
        this.books = this.books.filter((b) => b.id !== id);
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [authors_service_1.AuthorsService])
], BooksService);
//# sourceMappingURL=books.service.js.map