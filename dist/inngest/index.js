

   import { createRequire } from 'module';

   const require = createRequire(import.meta.url);

  

// src/inngest/index.ts
import { cron, Inngest } from "inngest";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Address {\n  id        String   @id @default(uuid())\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  label     String\n  address   String\n  city      String\n  state     String\n  zip       String\n  isDefault Boolean  @default(false)\n  lat       Float\n  lng       Float\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel DeliveryPartner {\n  id          String   @id @default(uuid())\n  name        String\n  email       String   @unique\n  password    String\n  phone       String\n  avatar      String?  @default("")\n  vehicleType String?  @default("bike")\n  isActive    Boolean? @default(true)\n  orders      Order[]\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n}\n\nenum Role {\n  CUSTOMER\n  PARTNER\n  ADMIN\n}\n\nenum UserStatus {\n  ACTIVE\n  BLOCKED\n}\n\nenum OrderStatus {\n  PLACED\n  ASSIGNED\n  PACKED\n  OUT_FOR_DELIVERY\n  DELIVERED\n  CANCELLED\n}\n\nmodel Order {\n  id              String      @id @default(uuid())\n  userId          String\n  user            User        @relation(fields: [userId], references: [id], onDelete: Cascade)\n  items           Json\n  shippingAddress Json\n  paymentMethod   String      @default("card")\n  subtotal        Float\n  deliveryFee     Float?      @default(0)\n  tax             Float?      @default(0)\n  total           Float\n  status          OrderStatus @default(PLACED)\n  statusHistory   Json\n\n  deliveryPartnerId String?\n  deliveryPartner   DeliveryPartner? @relation(fields: [deliveryPartnerId], references: [id], onDelete: SetNull)\n  deliveryOtp       String?          @default("")\n  liveLocation      Json?\n  isPaid            Boolean?         @default(false)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Product {\n  id            String   @id @default(uuid())\n  name          String\n  description   String?  @default("")\n  price         Float\n  originalPrice Float?   @default(0)\n  image         String\n  category      String\n  unit          String?  @default("piece")\n  stock         Int?     @default(0)\n  isOrganic     Boolean? @default(false)\n  rating        Float?   @default(0)\n  views         Int      @default(0)\n  reviewCount   Int?     @default(0)\n  createdAt     DateTime @default(now())\n  updatedAt     DateTime @updatedAt\n}\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id        String     @id @default(uuid())\n  name      String\n  email     String     @unique\n  role      Role       @default(CUSTOMER)\n  password  String\n  status    UserStatus @default(ACTIVE)\n  phone     String?    @default("")\n  avatar    String?    @default("")\n  addresses Address[]\n  orders    Order[]\n  createdAt DateTime   @default(now())\n  updatedAt DateTime   @updatedAt\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Address":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AddressToUser"},{"name":"label","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"state","kind":"scalar","type":"String"},{"name":"zip","kind":"scalar","type":"String"},{"name":"isDefault","kind":"scalar","type":"Boolean"},{"name":"lat","kind":"scalar","type":"Float"},{"name":"lng","kind":"scalar","type":"Float"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"DeliveryPartner":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"avatar","kind":"scalar","type":"String"},{"name":"vehicleType","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"orders","kind":"object","type":"Order","relationName":"DeliveryPartnerToOrder"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"items","kind":"scalar","type":"Json"},{"name":"shippingAddress","kind":"scalar","type":"Json"},{"name":"paymentMethod","kind":"scalar","type":"String"},{"name":"subtotal","kind":"scalar","type":"Float"},{"name":"deliveryFee","kind":"scalar","type":"Float"},{"name":"tax","kind":"scalar","type":"Float"},{"name":"total","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"statusHistory","kind":"scalar","type":"Json"},{"name":"deliveryPartnerId","kind":"scalar","type":"String"},{"name":"deliveryPartner","kind":"object","type":"DeliveryPartner","relationName":"DeliveryPartnerToOrder"},{"name":"deliveryOtp","kind":"scalar","type":"String"},{"name":"liveLocation","kind":"scalar","type":"Json"},{"name":"isPaid","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Product":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"originalPrice","kind":"scalar","type":"Float"},{"name":"image","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"unit","kind":"scalar","type":"String"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"isOrganic","kind":"scalar","type":"Boolean"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"views","kind":"scalar","type":"Int"},{"name":"reviewCount","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"password","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"phone","kind":"scalar","type":"String"},{"name":"avatar","kind":"scalar","type":"String"},{"name":"addresses","kind":"object","type":"Address","relationName":"AddressToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","addresses","user","orders","_count","deliveryPartner","Address.findUnique","Address.findUniqueOrThrow","Address.findFirst","Address.findFirstOrThrow","Address.findMany","data","Address.createOne","Address.createMany","Address.createManyAndReturn","Address.updateOne","Address.updateMany","Address.updateManyAndReturn","create","update","Address.upsertOne","Address.deleteOne","Address.deleteMany","having","_avg","_sum","_min","_max","Address.groupBy","Address.aggregate","DeliveryPartner.findUnique","DeliveryPartner.findUniqueOrThrow","DeliveryPartner.findFirst","DeliveryPartner.findFirstOrThrow","DeliveryPartner.findMany","DeliveryPartner.createOne","DeliveryPartner.createMany","DeliveryPartner.createManyAndReturn","DeliveryPartner.updateOne","DeliveryPartner.updateMany","DeliveryPartner.updateManyAndReturn","DeliveryPartner.upsertOne","DeliveryPartner.deleteOne","DeliveryPartner.deleteMany","DeliveryPartner.groupBy","DeliveryPartner.aggregate","Order.findUnique","Order.findUniqueOrThrow","Order.findFirst","Order.findFirstOrThrow","Order.findMany","Order.createOne","Order.createMany","Order.createManyAndReturn","Order.updateOne","Order.updateMany","Order.updateManyAndReturn","Order.upsertOne","Order.deleteOne","Order.deleteMany","Order.groupBy","Order.aggregate","Product.findUnique","Product.findUniqueOrThrow","Product.findFirst","Product.findFirstOrThrow","Product.findMany","Product.createOne","Product.createMany","Product.createManyAndReturn","Product.updateOne","Product.updateMany","Product.updateManyAndReturn","Product.upsertOne","Product.deleteOne","Product.deleteMany","Product.groupBy","Product.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","AND","OR","NOT","id","name","email","Role","role","password","UserStatus","status","phone","avatar","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","every","some","none","description","price","originalPrice","image","category","unit","stock","isOrganic","rating","views","reviewCount","userId","items","shippingAddress","paymentMethod","subtotal","deliveryFee","tax","total","OrderStatus","statusHistory","deliveryPartnerId","deliveryOtp","liveLocation","isPaid","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","vehicleType","isActive","label","address","city","state","zip","isDefault","lat","lng","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "rwIxUBAEAADHAQAgYAAAyQEAMGEAAAMAEGIAAMkBADBjAQAAAAFtQACeAQAhbkAAngEAIYgBAQCaAQAhngEBAJoBACGfAQEAmgEAIaABAQCaAQAhoQEBAJoBACGiAQEAmgEAIaMBIADKAQAhpAEIALABACGlAQgAsAEAIQEAAAABACAQBAAAxwEAIGAAAMkBADBhAAADABBiAADJAQAwYwEAmgEAIW1AAJ4BACFuQACeAQAhiAEBAJoBACGeAQEAmgEAIZ8BAQCaAQAhoAEBAJoBACGhAQEAmgEAIaIBAQCaAQAhowEgAMoBACGkAQgAsAEAIaUBCACwAQAhAQQAAJwCACADAAAAAwAgAQAABAAwAgAAAQAgFgQAAMcBACAHAADIAQAgYAAAwwEAMGEAAAYAEGIAAMMBADBjAQCaAQAhagAAxQGRASJtQACeAQAhbkAAngEAIYgBAQCaAQAhiQEAAMQBACCKAQAAxAEAIIsBAQCaAQAhjAEIALABACGNAQgAsQEAIY4BCACxAQAhjwEIALABACGRAQAAxAEAIJIBAQCdAQAhkwEBAJ0BACGUAQAAxgEAIJUBIACzAQAhCAQAAJwCACAHAACdAgAgjQEAAMsBACCOAQAAywEAIJIBAADLAQAgkwEAAMsBACCUAQAAywEAIJUBAADLAQAgFgQAAMcBACAHAADIAQAgYAAAwwEAMGEAAAYAEGIAAMMBADBjAQAAAAFqAADFAZEBIm1AAJ4BACFuQACeAQAhiAEBAJoBACGJAQAAxAEAIIoBAADEAQAgiwEBAJoBACGMAQgAsAEAIY0BCACxAQAhjgEIALEBACGPAQgAsAEAIZEBAADEAQAgkgEBAJ0BACGTAQEAnQEAIZQBAADGAQAglQEgALMBACEDAAAABgAgAQAABwAwAgAACAAgDgUAAKABACBgAAC-AQAwYQAACgAQYgAAvgEAMGMBAJoBACFkAQCaAQAhZQEAmgEAIWgBAJoBACFrAQCaAQAhbAEAnQEAIW1AAJ4BACFuQACeAQAhnAEBAJ0BACGdASAAswEAIQEAAAAKACADAAAABgAgAQAABwAwAgAACAAgAQAAAAYAIAEAAAADACABAAAABgAgAQAAAAEAIAMAAAADACABAAAEADACAAABACADAAAAAwAgAQAABAAwAgAAAQAgAwAAAAMAIAEAAAQAMAIAAAEAIA0EAACbAgAgYwEAAAABbUAAAAABbkAAAAABiAEBAAAAAZ4BAQAAAAGfAQEAAAABoAEBAAAAAaEBAQAAAAGiAQEAAAABowEgAAAAAaQBCAAAAAGlAQgAAAABAQ0AABQAIAxjAQAAAAFtQAAAAAFuQAAAAAGIAQEAAAABngEBAAAAAZ8BAQAAAAGgAQEAAAABoQEBAAAAAaIBAQAAAAGjASAAAAABpAEIAAAAAaUBCAAAAAEBDQAAFgAwAQ0AABYAMA0EAACaAgAgYwEAzwEAIW1AANMBACFuQADTAQAhiAEBAM8BACGeAQEAzwEAIZ8BAQDPAQAhoAEBAM8BACGhAQEAzwEAIaIBAQDPAQAhowEgAPIBACGkAQgA4AEAIaUBCADgAQAhAgAAAAEAIA0AABkAIAxjAQDPAQAhbUAA0wEAIW5AANMBACGIAQEAzwEAIZ4BAQDPAQAhnwEBAM8BACGgAQEAzwEAIaEBAQDPAQAhogEBAM8BACGjASAA8gEAIaQBCADgAQAhpQEIAOABACECAAAAAwAgDQAAGwAgAgAAAAMAIA0AABsAIAMAAAABACAUAAAUACAVAAAZACABAAAAAQAgAQAAAAMAIAUGAACVAgAgGgAAlgIAIBsAAJkCACAcAACYAgAgHQAAlwIAIA9gAAC_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_CACxAQAhgAEBAJoBACGBAQEAmgEAIYIBAQCdAQAhgwECALIBACGEASAAswEAIYUBCACxAQAhhgECALQBACGHAQIAsgEAIQEAAABVACABAAAAVQAgEmAAAK8BADBhAABYABBiAACvAQAwYwEAmgEAIWQBAJoBACFtQACeAQAhbkAAngEAIX0BAJ0BACF-CACwAQAhfwgAsQEAIYABAQCaAQAhgQEBAJoBACGCAQEAnQEAIYMBAgCyAQAhhAEgALMBACGFAQgAsQEAIYYBAgC0AQAhhwECALIBACEHfQAAywEAIH8AAMsBACCCAQAAywEAIIMBAADLAQAghAEAAMsBACCFAQAAywEAIIcBAADLAQAgAwAAAFgAIAEAAFkAMAIAAFUAIAMAAABYACABAABZADACAABVACADAAAAWAAgAQAAWQAwAgAAVQAgD2MBAAAAAWQBAAAAAW1AAAAAAW5AAAAAAX0BAAAAAX4IAAAAAX8IAAAAAYABAQAAAAGBAQEAAAABggEBAAAAAYMBAgAAAAGEASAAAAABhQEIAAAAAYYBAgAAAAGHAQIAAAABAQ0AAF0AIA9jAQAAAAFkAQAAAAFtQAAAAAFuQAAAAAF9AQAAAAF-CAAAAAF_CAAAAAGAAQEAAAABgQEBAAAAAYIBAQAAAAGDAQIAAAABhAEgAAAAAYUBCAAAAAGGAQIAAAABhwECAAAAAQENAABfADABDQAAXwAwD2MBAM8BACFkAQDPAQAhbUAA0wEAIW5AANMBACF9AQDSAQAhfggA4AEAIX8IAOEBACGAAQEAzwEAIYEBAQDPAQAhggEBANIBACGDAQIA_gEAIYQBIADjAQAhhQEIAOEBACGGAQIA_wEAIYcBAgD-AQAhAgAAAFUAIA0AAGIAIA9jAQDPAQAhZAEAzwEAIW1AANMBACFuQADTAQAhfQEA0gEAIX4IAOABACF_CADhAQAhgAEBAM8BACGBAQEAzwEAIYIBAQDSAQAhgwECAP4BACGEASAA4wEAIYUBCADhAQAhhgECAP8BACGHAQIA_gEAIQIAAABYACANAABkACACAAAAWAAgDQAAZAAgAwAAAFUAIBQAAF0AIBUAAGIAIAEAAABVACABAAAAWAAgDAYAAPkBACAaAAD6AQAgGwAA_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_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-Uxo_VCBAViFBVyFCWiFDWyFEXCFFXiFGYAdHYSJIYyFJZQdKZiNLZyFMaCFNaQdObCRPbSpQbwJRcAJScwJTdAJUdQJVdwJWeQdXeitYfAJZfgdafyxbgAECXIEBAl2CAQdehQEtX4YBMQ"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var OrderStatus = {
  PLACED: "PLACED",
  ASSIGNED: "ASSIGNED",
  PACKED: "PACKED",
  OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL
});
var prisma = new PrismaClient({ adapter });

// src/config/nodemailer.ts
import { createTransport } from "nodemailer";

// src/config/index.ts
import dotenv from "dotenv";
import path2 from "path";
dotenv.config({ path: path2.join(process.cwd(), ".env") });
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

// src/config/nodemailer.ts
var transporter = createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: config_default.smtp_user,
    pass: config_default.smtp_pass
  }
});
var sendEmail = async ({
  to,
  subject,
  body
}) => {
  const response = await transporter.sendMail({
    from: config_default.sender_email,
    to,
    subject,
    html: body
  });
  return response;
};
var nodemailer_default = sendEmail;

// src/inngest/index.ts
var LOW_STOCK_THRESHOLD = 10;
var inngest = new Inngest({
  id: "grocery-delivery",
  eventKey: config_default.inngest_event_key
});
var checkLowStock = inngest.createFunction(
  {
    id: "check-low-stock",
    name: "Low Stock Alert",
    triggers: [{ event: "inventory/stock.updated" }]
  },
  async ({ event, step }) => {
    console.log("Low stock function triggered");
    const { productId } = event.data;
    console.log("Product ID:", productId);
    const product = await step.run("fetch-product", async () => {
      const p = await prisma.product.findUnique({
        where: {
          id: productId
        }
      });
      console.log("Product:", p);
      return p;
    });
    if (!product || product.stock === null || product.stock >= LOW_STOCK_THRESHOLD) {
      console.log("Skipped:", product?.stock);
      return { skipped: true, stock: product?.stock };
    }
    console.log("About to send email");
    await step.run("send-low-stock-email", async () => {
      const admins = await prisma.user.findMany({
        where: {
          role: "ADMIN"
        }
      });
      const adminEmails = admins.map((admin) => admin.email);
      if (adminEmails.length === 0)
        return { skipped: true, reason: "No admin emails" };
      await nodemailer_default({
        to: adminEmails.join(","),
        subject: `Low Stock Alert : ${product.name}`,
        body: `<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
                        <div style="background: linear-gradient(135deg, #dc2626, #ef4444); padding: 24px 28px;">
                            <h2 style="color: #fff; margin: 0; font-size: 20px;">Low Stock Alert</h2>
                        </div>
                        <div style="padding: 28px;">
                            <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
                                ${product.image ? `<img src="${product.image}" alt="${product.name}" style="width: 64px; height: 64px; border-radius: 12px; object-fit: cover;" />` : ""}
                                <div>
                                    <h3 style="margin: 0 0 4px; font-size: 18px; color: #111827;">${product.name}</h3>
                                    <p style="margin: 0; font-size: 14px; color: #6b7280;">${product.category} \u2022 ${product.unit}</p>
                                </div>
                            </div>
                            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 16px; text-align: center;">
                                <p style="margin: 0 0 4px; font-size: 13px; color: #991b1b; font-weight: 600;">CURRENT STOCK</p>
                                <p style="margin: 0; font-size: 32px; font-weight: 700; color: #dc2626;">${product.stock}</p>
                                <p style="margin: 4px 0 0; font-size: 12px; color: #6b7280;">units remaining</p>
                            </div>
                            <p style="margin: 20px 0 0; font-size: 13px; color: #9ca3af; text-align: center;">Please restock this item as soon as possible.</p>
                        </div>
                </div>`
      });
      console.log("Email sent successfully");
    });
    return { aleared: true, product: product.name, stock: product.stock };
  }
);
var sendMonthlyOffers = inngest.createFunction(
  {
    id: "send-monthly-offers",
    name: "Monthly Payday Offers",
    triggers: [cron("0 10 1 * *")]
  },
  async ({ step }) => {
    const { deals, users } = await step.run(
      "fetch-deals-and-users",
      async () => {
        const products = await prisma.product.findMany({
          where: {
            stock: {
              gt: 0
            }
          },
          orderBy: {
            originalPrice: "desc"
          },
          take: 6
        });
        const allUsers = await prisma.user.findMany({
          select: {
            name: true,
            email: true
          }
        });
        return { deals: products, users: allUsers };
      }
    );
    if (users.length === 0 || deals.length === 0) {
      return { skipped: true, reason: "No users or deals" };
    }
    let sentCount = 0;
    const batchSize = 10;
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      await step.run(`send-offers-batch-${i}`, async () => {
        for (const u of batch) {
          await nodemailer_default({
            to: u.email,
            subject: `Fresh pics just for you`,
            body: `
                        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">

                <div style="background: linear-gradient(135deg, #f97316, #fb923c); padding: 24px 28px;">
                    <h2 style="color: #fff; margin: 0; font-size: 20px;">Fresh Picks Just For You!</h2>
                    <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 13px;">
                        Exclusive offers to kick off your month right
                    </p>
                </div>

                <div style="padding: 28px;">
                    <p style="margin: 0 0 20px; font-size: 15px; color: #374151;">
                        Hi <strong>${u.name}</strong>, check out this month's top picks!
                    </p>

                    <table width="100%" cellpadding="0" cellspacing="0">
                        ${deals.reduce((rows, _, i2) => {
              if (i2 % 3 === 0) {
                rows.push(deals.slice(i2, i2 + 3));
              }
              return rows;
            }, []).map(
              (row) => `
                                <tr>
                                    ${row.map(
                (p) => `
                                            <td style="width: 33%; padding: 8px; vertical-align: top;">
                                                <div style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; text-align: center;">
                                                    ${p.image ? `<img src="${p.image}" alt="${p.name}" style="width: 100%; height: 100px; object-fit: cover;" />` : ""}
                                                    <div style="padding: 10px;">
                                                        <p style="margin: 0; font-size: 13px; font-weight: 600; color: #111827;">
                                                            ${p.name}
                                                        </p>
                                                        <p style="margin: 4px 0 0; font-size: 15px; font-weight: 700; color: #16a34a;">
                                                            $${p.price.toFixed(2)}
                                                            ${p.originalPrice > p.price ? `<span style="font-size: 11px; color: #9ca3af; text-decoration: line-through; margin-left: 4px;">$${p.originalPrice.toFixed(2)}</span>` : ""}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>`
              ).join("")}
                                </tr>`
            ).join("")}
                    </table>

                    <div style="text-align: center; margin-top: 24px;">
                        <a href="${process.env.CLIENT_URL || "http://localhost:5173"}/products"
                           style="display: inline-block; background: #16a34a; color: #fff; padding: 12px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 14px;">
                           Shop All Deals \u2192
                        </a>
                    </div>
                </div>
                        </div>`
          });
        }
      });
      sentCount += batch.length;
    }
    return { sent: sentCount };
  }
);
var autoAssignRider = inngest.createFunction(
  {
    id: "auto-assign",
    name: "Auto Assing Delivery Rider",
    triggers: [
      {
        event: "order/placed"
      }
    ]
  },
  async ({ event, step }) => {
    const { orderId } = event.data;
    await step.sleep("wait-5-min", "5m");
    const result = await step.run("assing-Rider", async () => {
      const order = await prisma.order.findUnique({
        where: {
          id: orderId
        }
      });
      if (!order) return { skipped: true, reason: "Order not found" };
      if (order.deliveryPartnerId)
        return {
          skipped: true,
          reason: "Order not found"
        };
      if (["Cancelled", "Delivered"].includes(order.status))
        return {
          skipped: true,
          reason: `Order is ${order.status}`
        };
      const busyOrders = await prisma.order.findMany({
        where: {
          status: {
            in: [
              OrderStatus.ASSIGNED,
              OrderStatus.PACKED,
              OrderStatus.OUT_FOR_DELIVERY
            ]
          },
          deliveryPartnerId: { not: null }
        },
        select: {
          deliveryPartnerId: true
        }
      });
      const busyRiderIds = busyOrders.map(
        (order2) => order2.deliveryPartnerId
      );
      const availableRider = await prisma.deliveryPartner.findFirst({
        where: {
          isActive: true,
          id: { notIn: busyRiderIds }
        }
      });
      if (!availableRider)
        return { skipped: true, reason: "No riders available" };
      const otp = Math.floor(1e5 + Math.random() * 9e4).toString();
      const history = Array.isArray(order.statusHistory) ? order.statusHistory : [];
      history.push({
        status: OrderStatus.ASSIGNED,
        note: `Auto assigned to ${availableRider.name}`,
        timeStamp: /* @__PURE__ */ new Date()
      });
      await prisma.order.update({
        where: {
          id: orderId
        },
        data: {
          deliveryPartnerId: availableRider.id,
          deliveryOtp: otp,
          status: OrderStatus.ASSIGNED,
          statusHistory: history
        }
      });
      return {
        assigned: true,
        riderId: availableRider.id,
        riderName: availableRider.name,
        orderId
      };
    });
    return result;
  }
);
var functions = [checkLowStock, sendMonthlyOffers, autoAssignRider];
export {
  functions,
  inngest
};
//# sourceMappingURL=index.js.map