

   import { createRequire } from 'module';

   const require = createRequire(import.meta.url);

  

// src/utils/jwt.ts
import jwt from "jsonwebtoken";

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

// src/utils/jwt.ts
var signToken = (payload) => {
  const accessToken = jwt.sign(payload, config_default.jwt_access_secret, {
    expiresIn: config_default.jwt_access_expires_in
  });
  const refreshToken = jwt.sign(payload, config_default.jwt_refresh_secret, {
    expiresIn: config_default.jwt_refresh_expires_in
  });
  return { accessToken, refreshToken };
};
var verifyToken = (token, type) => {
  try {
    const secret = type === "access" ? config_default.jwt_access_secret : config_default.jwt_refresh_secret;
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.log("Token verification Failed");
    throw new Error(error.message);
  }
};
export {
  signToken,
  verifyToken
};
//# sourceMappingURL=jwt.js.map