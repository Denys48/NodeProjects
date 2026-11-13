"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * main.ts
 * Точка входу. Пов'язаний файл: app.module.ts.
 */
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const PORT = 3005;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(PORT);
    console.log(`Застосунок слухає http://localhost:${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map