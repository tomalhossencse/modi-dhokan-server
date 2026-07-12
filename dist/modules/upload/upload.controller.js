

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

// src/modules/upload/upload.controller.ts
import httpStatus from "http-status";

// src/config/coudinary.ts
import { v2 as cloudinary } from "cloudinary";

// src/config/index.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
var config_default = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  app_url: process.env.APP_URL,
  client_url: process.env.CLIENT_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  inngest_signing_key: process.env.INNGEST_SIGNING_KEY,
  inngest_event_key: process.env.INNGEST_EVENT_KEY,
  sender_email: process.env.SENDER_EMAIl,
  smtp_user: process.env.SMTP_USER,
  smtp_pass: process.env.SMTP_PASS,
  ssl_ecomerz_store_id: process.env.SSL_ECOMERZ_STORE_ID,
  ssl_ecomerz_store_password: process.env.SSL_ECOMERZ_STORE_PASSWORD
};

// src/config/coudinary.ts
cloudinary.config({
  api_key: config_default.cloudinary_api_key,
  cloud_name: config_default.cloudinary_cloud_name,
  api_secret: config_default.cloudinary_api_secret
});
var coudinary_default = cloudinary;

// src/modules/upload/upload.controller.ts
var UploadController = class {
  upload = catchAsync(async (req, res) => {
    if (!req.file) {
      throw new Error("No image file provided");
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const { secure_url } = await coudinary_default.uploader.upload(dataURI, {
      folder: "grocery-delivery",
      resource_type: "auto"
    });
    sendResponse(res, {
      success: true,
      status: httpStatus.OK,
      message: "Image upload successfully",
      data: {
        url: secure_url
      }
    });
  });
};
var upload_controller_default = new UploadController();
export {
  upload_controller_default as default
};
//# sourceMappingURL=upload.controller.js.map