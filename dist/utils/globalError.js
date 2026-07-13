

   import { createRequire } from 'module';

   const require = createRequire(import.meta.url);

  
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/utils/globalError.ts
import httpStatus from "http-status";

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
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
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
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AddressScalarFieldEnum: () => AddressScalarFieldEnum,
  AnyNull: () => AnyNull2,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  DeliveryPartnerScalarFieldEnum: () => DeliveryPartnerScalarFieldEnum,
  JsonNull: () => JsonNull2,
  JsonNullValueFilter: () => JsonNullValueFilter,
  JsonNullValueInput: () => JsonNullValueInput,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullableJsonNullValueInput: () => NullableJsonNullValueInput,
  NullsOrder: () => NullsOrder,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProductScalarFieldEnum: () => ProductScalarFieldEnum,
  QueryMode: () => QueryMode,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.8.0",
  engine: "3c6e192761c0362d496ed980de936e2f3cebcd3a"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Address: "Address",
  DeliveryPartner: "DeliveryPartner",
  Order: "Order",
  Product: "Product",
  User: "User"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var AddressScalarFieldEnum = {
  id: "id",
  userId: "userId",
  label: "label",
  address: "address",
  city: "city",
  state: "state",
  zip: "zip",
  isDefault: "isDefault",
  lat: "lat",
  lng: "lng",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var DeliveryPartnerScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  phone: "phone",
  avatar: "avatar",
  vehicleType: "vehicleType",
  isActive: "isActive",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderScalarFieldEnum = {
  id: "id",
  userId: "userId",
  items: "items",
  shippingAddress: "shippingAddress",
  paymentMethod: "paymentMethod",
  subtotal: "subtotal",
  deliveryFee: "deliveryFee",
  tax: "tax",
  total: "total",
  status: "status",
  statusHistory: "statusHistory",
  deliveryPartnerId: "deliveryPartnerId",
  deliveryOtp: "deliveryOtp",
  liveLocation: "liveLocation",
  isPaid: "isPaid",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ProductScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description",
  price: "price",
  originalPrice: "originalPrice",
  image: "image",
  category: "category",
  unit: "unit",
  stock: "stock",
  isOrganic: "isOrganic",
  rating: "rating",
  views: "views",
  reviewCount: "reviewCount",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  role: "role",
  password: "password",
  status: "status",
  phone: "phone",
  avatar: "avatar",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var JsonNullValueInput = {
  JsonNull: JsonNull2
};
var NullableJsonNullValueInput = {
  DbNull: DbNull2,
  JsonNull: JsonNull2
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var JsonNullValueFilter = {
  DbNull: DbNull2,
  JsonNull: JsonNull2,
  AnyNull: AnyNull2
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/utils/globalError.ts
var globalErrorHandler = (err, req, res, next) => {
  console.log("Error : ", err);
  let statusCode;
  let errorMessage = err.message || "Internal Server Error";
  let errorName = err.name || "Internal Server Error";
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    errorMessage = "You have provided incorrect field type or missing fields";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = httpStatus.BAD_REQUEST, errorMessage = "Duplicate Key Error";
    } else if (err.code === "P2003") {
      statusCode = httpStatus.BAD_REQUEST, errorMessage = "Foreign key constraint failed";
    } else if (err.code === "P2025") {
      statusCode = httpStatus.BAD_REQUEST, errorMessage = "An operation failed because it depends on one or more records that were required but not found.";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = httpStatus.UNAUTHORIZED;
      errorMessage = "Authentication failed against database server. Please Check Your Credentials";
    } else if (err.errorCode === "P1001") {
      statusCode = httpStatus.BAD_REQUEST;
      errorMessage = "Can't reach database server";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    errorMessage = "Error occurred during query execution";
  }
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: statusCode || httpStatus.INTERNAL_SERVER_ERROR,
    name: errorName,
    message: errorMessage,
    error: err.stack
  });
};
export {
  globalErrorHandler
};
//# sourceMappingURL=globalError.js.map