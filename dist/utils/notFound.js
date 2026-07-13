

   import { createRequire } from 'module';

   const require = createRequire(import.meta.url);

  

// src/utils/notFound.ts
import httpStatus from "http-status";
var notFound = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: `Route Not Found - ${req.method} ${req.originalUrl}`
  });
};
export {
  notFound
};
//# sourceMappingURL=notFound.js.map