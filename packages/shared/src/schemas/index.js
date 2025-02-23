'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserSchema = void 0;
// schemas/index.ts
const zod_1 = require('zod');
exports.UserSchema = zod_1.z.object({
  id: zod_1.z.string(),
  name: zod_1.z.string(),
});
