

   import { createRequire } from 'module';

   const require = createRequire(import.meta.url);

  

// src/utils/sendResponse.ts
function sendResponse(res, data) {
  res.status(data.status).json({
    success: data.success,
    statusCode: data.status,
    message: data.message,
    data: data.data,
    meta: data.meta
  });
}
export {
  sendResponse
};
//# sourceMappingURL=sendResponse.js.map