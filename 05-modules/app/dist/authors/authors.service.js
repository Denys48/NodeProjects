"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorsService = void 0;
/**
 * authors.service.ts
 * Бізнес-логіка авторів. Пов'язаний файл: authors.module.ts (реєструє
 * і експортує цей сервіс), ../books/books.service.ts (використовує
 * findByIdOrThrow з іншого модуля).
 */
const common_1 = require("@nestjs/common");
let AuthorsService = class AuthorsService {
    authors = [
        { id: 1, name: 'Тарас Шевченко', country: 'Україна' },
        { id: 2, name: 'Іван Багряний', country: 'Україна' },
    ];
    nextId = 3;
    parseId(id) {
        const parsed = Number(id);
        if (Number.isNaN(parsed)) {
            throw new common_1.BadRequestException('id має бути числом');
        }
        return parsed;
    }
    findAll() {
        return this.authors;
    }
    findByIdOrThrow(id) {
        const author = this.authors.find((a) => a.id === id);
        if (!author) {
            throw new common_1.NotFoundException(`Автора з id=${id} не знайдено`);
        }
        return author;
    }
    create(dto) {
        const author = { id: this.nextId, name: dto.name, country: dto.country };
        this.nextId += 1;
        this.authors.push(author);
        return author;
    }
    update(id, dto) {
        this.findByIdOrThrow(id);
        const updated = { id, name: dto.name, country: dto.country };
        this.authors = this.authors.map((a) => (a.id === id ? updated : a));
        return updated;
    }
    remove(id) {
        this.findByIdOrThrow(id);
        this.authors = this.authors.filter((a) => a.id !== id);
    }
};
exports.AuthorsService = AuthorsService;
exports.AuthorsService = AuthorsService = __decorate([
    (0, common_1.Injectable)()
], AuthorsService);
//# sourceMappingURL=authors.service.js.map