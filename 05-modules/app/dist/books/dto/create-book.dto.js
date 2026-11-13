"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookDto = void 0;
/**
 * create-book.dto.ts
 * [НОВЕ] authorId замість author - має посилатись на існуючого автора
 * з authors-модуля (перевіряється в BooksService).
 */
class CreateBookDto {
    title;
    authorId;
    year;
}
exports.CreateBookDto = CreateBookDto;
//# sourceMappingURL=create-book.dto.js.map