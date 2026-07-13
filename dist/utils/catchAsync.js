

   import { createRequire } from 'module';

   const require = createRequire(import.meta.url);

  

// src/utils/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
export {
  catchAsync
};
//# sourceMappingURL=catchAsync.js.map