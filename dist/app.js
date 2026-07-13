

   import { createRequire } from 'module';

   const require = createRequire(import.meta.url);

  
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

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
  graph: "rwIxUBAEAADHAQAgYAAAyQEAMGEAAAMAEGIAAMkBADBjAQAAAAFtQACeAQAhbkAAngEAIYgBAQCaAQAhngEBAJoBACGfAQEAmgEAIaABAQCaAQAhoQEBAJoBACGiAQEAmgEAIaMBIADKAQAhpAEIALABACGlAQgAsAEAIQEAAAABACAQBAAAxwEAIGAAAMkBADBhAAADABBiAADJAQAwYwEAmgEAIW1AAJ4BACFuQACeAQAhiAEBAJoBACGeAQEAmgEAIZ8BAQCaAQAhoAEBAJoBACGhAQEAmgEAIaIBAQCaAQAhowEgAMoBACGkAQgAsAEAIaUBCACwAQAhAQQAAJwCACADAAAAAwAgAQAABAAwAgAAAQAgFgQAAMcBACAHAADIAQAgYAAAwwEAMGEAAAYAEGIAAMMBADBjAQCaAQAhagAAxQGRASJtQACeAQAhbkAAngEAIYgBAQCaAQAhiQEAAMQBACCKAQAAxAEAIIsBAQCaAQAhjAEIALABACGNAQgAsQEAIY4BCACxAQAhjwEIALABACGRAQAAxAEAIJIBAQCdAQAhkwEBAJ0BACGUAQAAxgEAIJUBIACzAQAhCAQAAJwCACAHAACdAgAgjQEAAMsBACCOAQAAywEAIJIBAADLAQAgkwEAAMsBACCUAQAAywEAIJUBAADLAQAgFgQAAMcBACAHAADIAQAgYAAAwwEAMGEAAAYAEGIAAMMBADBjAQAAAAFqAADFAZEBIm1AAJ4BACFuQACeAQAhiAEBAJoBACGJAQAAxAEAIIoBAADEAQAgiwEBAJoBACGMAQgAsAEAIY0BCACxAQAhjgEIALEBACGPAQgAsAEAIZEBAADEAQAgkgEBAJ0BACGTAQEAnQEAIZQBAADGAQAglQEgALMBACEDAAAABgAgAQAABwAwAgAACAAgDgUAAKABACBgAAC-AQAwYQAACgAQYgAAvgEAMGMBAJoBACFkAQCaAQAhZQEAmgEAIWgBAJoBACFrAQCaAQAhbAEAnQEAIW1AAJ4BACFuQACeAQAhnAEBAJ0BACGdASAAswEAIQEAAAAKACADAAAABgAgAQAABwAwAgAACAAgAQAAAAYAIAEAAAADACABAAAABgAgAQAAAAEAIAMAAAADACABAAAEADACAAABACADAAAAAwAgAQAABAAwAgAAAQAgAwAAAAMAIAEAAAQAMAIAAAEAIA0EAACbAgAgYwEAAAABbUAAAAABbkAAAAABiAEBAAAAAZ4BAQAAAAGfAQEAAAABoAEBAAAAAaEBAQAAAAGiAQEAAAABowEgAAAAAaQBCAAAAAGlAQgAAAABAQ0AABQAIAxjAQAAAAFtQAAAAAFuQAAAAAGIAQEAAAABngEBAAAAAZ8BAQAAAAGgAQEAAAABoQEBAAAAAaIBAQAAAAGjASAAAAABpAEIAAAAAaUBCAAAAAEBDQAAFgAwAQ0AABYAMA0EAACaAgAgYwEAzwEAIW1AANMBACFuQADTAQAhiAEBAM8BACGeAQEAzwEAIZ8BAQDPAQAhoAEBAM8BACGhAQEAzwEAIaIBAQDPAQAhowEgAPIBACGkAQgA4AEAIaUBCADgAQAhAgAAAAEAIA0AABkAIAxjAQDPAQAhbUAA0wEAIW5AANMBACGIAQEAzwEAIZ4BAQDPAQAhnwEBAM8BACGgAQEAzwEAIaEBAQDPAQAhogEBAM8BACGjASAA8gEAIaQBCADgAQAhpQEIAOABACECAAAAAwAgDQAAGwAgAgAAAAMAIA0AABsAIAMAAAABACAUAAAUACAVAAAZACABAAAAAQAgAQAAAAMAIAUGAACVAgAgGgAAlgIAIBsAAJkCACAcAACYAgAgHQAAlwIAIA9gAAC_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_CACxAQAhgAEBAJoBACGBAQEAmgEAIYIBAQCdAQAhgwECALIBACGEASAAswEAIYUBCACxAQAhhgECALQBACGHAQIAsgEAIQEAAABVACABAAAAVQAgEmAAAK8BADBhAABYABBiAACvAQAwYwEAmgEAIWQBAJoBACFtQACeAQAhbkAAngEAIX0BAJ0BACF-CACwAQAhfwgAsQEAIYABAQCaAQAhgQEBAJoBACGCAQEAnQEAIYMBAgCyAQAhhAEgALMBACGFAQgAsQEAIYYBAgC0AQAhhwECALIBACEHfQAAywEAIH8AAMsBACCCAQAAywEAIIMBAADLAQAghAEAAMsBACCFAQAAywEAIIcBAADLAQAgAwAAAFgAIAEAAFkAMAIAAFUAIAMAAABYACABAABZADACAABVACADAAAAWAAgAQAAWQAwAgAAVQAgD2MBAAAAAWQBAAAAAW1AAAAAAW5AAAAAAX0BAAAAAX4IAAAAAX8IAAAAAYABAQAAAAGBAQEAAAABggEBAAAAAYMBAgAAAAGEASAAAAABhQEIAAAAAYYBAgAAAAGHAQIAAAABAQ0AAF0AIA9jAQAAAAFkAQAAAAFtQAAAAAFuQAAAAAF9AQAAAAF-CAAAAAF_CAAAAAGAAQEAAAABgQEBAAAAAYIBAQAAAAGDAQIAAAABhAEgAAAAAYUBCAAAAAGGAQIAAAABhwECAAAAAQENAABfADABDQAAXwAwD2MBAM8BACFkAQDPAQAhbUAA0wEAIW5AANMBACF9AQDSAQAhfggA4AEAIX8IAOEBACGAAQEAzwEAIYEBAQDPAQAhggEBANIBACGDAQIA_gEAIYQBIADjAQAhhQEIAOEBACGGAQIA_wEAIYcBAgD-AQAhAgAAAFUAIA0AAGIAIA9jAQDPAQAhZAEAzwEAIW1AANMBACFuQADTAQAhfQEA0gEAIX4IAOABACF_CADhAQAhgAEBAM8BACGBAQEAzwEAIYIBAQDSAQAhgwECAP4BACGEASAA4wEAIYUBCADhAQAhhgECAP8BACGHAQIA_gEAIQIAAABYACANAABkACACAAAAWAAgDQAAZAAgAwAAAFUAIBQAAF0AIBUAAGIAIAEAAABVACABAAAAWAAgDAYAAPkBACAaAAD6AQAgGwAA_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_AQAwYwEAiAEAIW1AAIwBACFuQACMAQAhiAEBAIgBACGeAQEAiAEAIZ8BAQCIAQAhoAEBAIgBACGhAQEAiAEAIaIBAQCIAQAhowEgAMABACGkAQgAogEAIaUBCACiAQAhBQYAAI4BACAcAADCAQAgHQAAwgEAIG8gAAAAAXYgAMEBACEFBgAAjgEAIBwAAMIBACAdAADCAQAgbyAAAAABdiAAwQEAIQJvIAAAAAF2IADCAQAhFgQAAMcBACAHAADIAQAgYAAAwwEAMGEAAAYAEGIAAMMBADBjAQCaAQAhagAAxQGRASJtQACeAQAhbkAAngEAIYgBAQCaAQAhiQEAAMQBACCKAQAAxAEAIIsBAQCaAQAhjAEIALABACGNAQgAsQEAIY4BCACxAQAhjwEIALABACGRAQAAxAEAIJIBAQCdAQAhkwEBAJ0BACGUAQAAxgEAIJUBIACzAQAhDG-AAAAAAXKAAAAAAXOAAAAAAXSAAAAAAXWAAAAAAXaAAAAAAZYBAQAAAAGXAQEAAAABmAEBAAAAAZkBgAAAAAGaAYAAAAABmwGAAAAAAQRvAAAAkQECcAAAAJEBCHEAAACRAQh2AAC7AZEBIgxvgAAAAAFygAAAAAFzgAAAAAF0gAAAAAF1gAAAAAF2gAAAAAGWAQEAAAABlwEBAAAAAZgBAQAAAAGZAYAAAAABmgGAAAAAAZsBgAAAAAERAwAAnwEAIAUAAKABACBgAACZAQAwYQAAcQAQYgAAmQEAMGMBAJoBACFkAQCaAQAhZQEAmgEAIWcAAJsBZyJoAQCaAQAhagAAnAFqImsBAJ0BACFsAQCdAQAhbUAAngEAIW5AAJ4BACGmAQAAcQAgpwEAAHEAIBAFAACgAQAgYAAAvgEAMGEAAAoAEGIAAL4BADBjAQCaAQAhZAEAmgEAIWUBAJoBACFoAQCaAQAhawEAmgEAIWwBAJ0BACFtQACeAQAhbkAAngEAIZwBAQCdAQAhnQEgALMBACGmAQAACgAgpwEAAAoAIBAEAADHAQAgYAAAyQEAMGEAAAMAEGIAAMkBADBjAQCaAQAhbUAAngEAIW5AAJ4BACGIAQEAmgEAIZ4BAQCaAQAhnwEBAJoBACGgAQEAmgEAIaEBAQCaAQAhogEBAJoBACGjASAAygEAIaQBCACwAQAhpQEIALABACECbyAAAAABdiAAwgEAIQAAAAABqwEBAAAAAQGrAQAAAGcCAasBAAAAagIBqwEBAAAAAQGrAUAAAAABCxQAAOgBADAVAADtAQAwqAEAAOkBADCpAQAA6gEAMKoBAADrAQAgqwEAAOwBADCsAQAA7AEAMK0BAADsAQAwrgEAAOwBADCvAQAA7gEAMLABAADvAQAwCxQAANYBADAVAADbAQAwqAEAANcBADCpAQAA2AEAMKoBAADZAQAgqwEAANoBADCsAQAA2gEAMK0BAADaAQAwrgEAANoBADCvAQAA3AEAMLABAADdAQAwEQcAAOcBACBjAQAAAAFqAAAAkQECbUAAAAABbkAAAAABiQGAAAAAAYoBgAAAAAGLAQEAAAABjAEIAAAAAY0BCAAAAAGOAQgAAAABjwEIAAAAAZEBgAAAAAGSAQEAAAABkwEBAAAAAZQBgAAAAAGVASAAAAABAgAAAAgAIBQAAOYBACADAAAACAAgFAAA5gEAIBUAAOQBACABDQAArwIAMBYEAADHAQAgBwAAyAEAIGAAAMMBADBhAAAGABBiAADDAQAwYwEAAAABagAAxQGRASJtQACeAQAhbkAAngEAIYgBAQCaAQAhiQEAAMQBACCKAQAAxAEAIIsBAQCaAQAhjAEIALABACGNAQgAsQEAIY4BCACxAQAhjwEIALABACGRAQAAxAEAIJIBAQCdAQAhkwEBAJ0BACGUAQAAxgEAIJUBIACzAQAhAgAAAAgAIA0AAOQBACACAAAA3gEAIA0AAN8BACAUYAAA3QEAMGEAAN4BABBiAADdAQAwYwEAmgEAIWoAAMUBkQEibUAAngEAIW5AAJ4BACGIAQEAmgEAIYkBAADEAQAgigEAAMQBACCLAQEAmgEAIYwBCACwAQAhjQEIALEBACGOAQgAsQEAIY8BCACwAQAhkQEAAMQBACCSAQEAnQEAIZMBAQCdAQAhlAEAAMYBACCVASAAswEAIRRgAADdAQAwYQAA3gEAEGIAAN0BADBjAQCaAQAhagAAxQGRASJtQACeAQAhbkAAngEAIYgBAQCaAQAhiQEAAMQBACCKAQAAxAEAIIsBAQCaAQAhjAEIALABACGNAQgAsQEAIY4BCACxAQAhjwEIALABACGRAQAAxAEAIJIBAQCdAQAhkwEBAJ0BACGUAQAAxgEAIJUBIACzAQAhEGMBAM8BACFqAADiAZEBIm1AANMBACFuQADTAQAhiQGAAAAAAYoBgAAAAAGLAQEAzwEAIYwBCADgAQAhjQEIAOEBACGOAQgA4QEAIY8BCADgAQAhkQGAAAAAAZIBAQDSAQAhkwEBANIBACGUAYAAAAABlQEgAOMBACEFqwEIAAAAAbEBCAAAAAGyAQgAAAABswEIAAAAAbQBCAAAAAEFqwEIAAAAAbEBCAAAAAGyAQgAAAABswEIAAAAAbQBCAAAAAEBqwEAAACRAQIBqwEgAAAAAREHAADlAQAgYwEAzwEAIWoAAOIBkQEibUAA0wEAIW5AANMBACGJAYAAAAABigGAAAAAAYsBAQDPAQAhjAEIAOABACGNAQgA4QEAIY4BCADhAQAhjwEIAOABACGRAYAAAAABkgEBANIBACGTAQEA0gEAIZQBgAAAAAGVASAA4wEAIQcUAACqAgAgFQAArQIAIKgBAACrAgAgqQEAAKwCACCsAQAACgAgrQEAAAoAIK4BAAAlACARBwAA5wEAIGMBAAAAAWoAAACRAQJtQAAAAAFuQAAAAAGJAYAAAAABigGAAAAAAYsBAQAAAAGMAQgAAAABjQEIAAAAAY4BCAAAAAGPAQgAAAABkQGAAAAAAZIBAQAAAAGTAQEAAAABlAGAAAAAAZUBIAAAAAEDFAAAqgIAIKgBAACrAgAgrgEAACUAIAtjAQAAAAFtQAAAAAFuQAAAAAGeAQEAAAABnwEBAAAAAaABAQAAAAGhAQEAAAABogEBAAAAAaMBIAAAAAGkAQgAAAABpQEIAAAAAQIAAAABACAUAAD0AQAgAwAAAAEAIBQAAPQBACAVAADzAQAgAQ0AAKkCADAQBAAAxwEAIGAAAMkBADBhAAADABBiAADJAQAwYwEAAAABbUAAngEAIW5AAJ4BACGIAQEAmgEAIZ4BAQCaAQAhnwEBAJoBACGgAQEAmgEAIaEBAQCaAQAhogEBAJoBACGjASAAygEAIaQBCACwAQAhpQEIALABACECAAAAAQAgDQAA8wEAIAIAAADwAQAgDQAA8QEAIA9gAADvAQAwYQAA8AEAEGIAAO8BADBjAQCaAQAhbUAAngEAIW5AAJ4BACGIAQEAmgEAIZ4BAQCaAQAhnwEBAJoBACGgAQEAmgEAIaEBAQCaAQAhogEBAJoBACGjASAAygEAIaQBCACwAQAhpQEIALABACEPYAAA7wEAMGEAAPABABBiAADvAQAwYwEAmgEAIW1AAJ4BACFuQACeAQAhiAEBAJoBACGeAQEAmgEAIZ8BAQCaAQAhoAEBAJoBACGhAQEAmgEAIaIBAQCaAQAhowEgAMoBACGkAQgAsAEAIaUBCACwAQAhC2MBAM8BACFtQADTAQAhbkAA0wEAIZ4BAQDPAQAhnwEBAM8BACGgAQEAzwEAIaEBAQDPAQAhogEBAM8BACGjASAA8gEAIaQBCADgAQAhpQEIAOABACEBqwEgAAAAAQtjAQDPAQAhbUAA0wEAIW5AANMBACGeAQEAzwEAIZ8BAQDPAQAhoAEBAM8BACGhAQEAzwEAIaIBAQDPAQAhowEgAPIBACGkAQgA4AEAIaUBCADgAQAhC2MBAAAAAW1AAAAAAW5AAAAAAZ4BAQAAAAGfAQEAAAABoAEBAAAAAaEBAQAAAAGiAQEAAAABowEgAAAAAaQBCAAAAAGlAQgAAAABBBQAAOgBADCoAQAA6QEAMKoBAADrAQAgrgEAAOwBADAEFAAA1gEAMKgBAADXAQAwqgEAANkBACCuAQAA2gEAMAAAAAAAAAAFqwECAAAAAbEBAgAAAAGyAQIAAAABswECAAAAAbQBAgAAAAEFqwECAAAAAbEBAgAAAAGyAQIAAAABswECAAAAAbQBAgAAAAEAAAAAAAUUAACkAgAgFQAApwIAIKgBAAClAgAgqQEAAKYCACCuAQAAbgAgAxQAAKQCACCoAQAApQIAIK4BAABuACAAAAALFAAAiwIAMBUAAI8CADCoAQAAjAIAMKkBAACNAgAwqgEAAI4CACCrAQAA2gEAMKwBAADaAQAwrQEAANoBADCuAQAA2gEAMK8BAACQAgAwsAEAAN0BADARBAAAhgIAIGMBAAAAAWoAAACRAQJtQAAAAAFuQAAAAAGIAQEAAAABiQGAAAAAAYoBgAAAAAGLAQEAAAABjAEIAAAAAY0BCAAAAAGOAQgAAAABjwEIAAAAAZEBgAAAAAGTAQEAAAABlAGAAAAAAZUBIAAAAAECAAAACAAgFAAAkwIAIAMAAAAIACAUAACTAgAgFQAAkgIAIAENAACjAgAwAgAAAAgAIA0AAJICACACAAAA3gEAIA0AAJECACAQYwEAzwEAIWoAAOIBkQEibUAA0wEAIW5AANMBACGIAQEAzwEAIYkBgAAAAAGKAYAAAAABiwEBAM8BACGMAQgA4AEAIY0BCADhAQAhjgEIAOEBACGPAQgA4AEAIZEBgAAAAAGTAQEA0gEAIZQBgAAAAAGVASAA4wEAIREEAACFAgAgYwEAzwEAIWoAAOIBkQEibUAA0wEAIW5AANMBACGIAQEAzwEAIYkBgAAAAAGKAYAAAAABiwEBAM8BACGMAQgA4AEAIY0BCADhAQAhjgEIAOEBACGPAQgA4AEAIZEBgAAAAAGTAQEA0gEAIZQBgAAAAAGVASAA4wEAIREEAACGAgAgYwEAAAABagAAAJEBAm1AAAAAAW5AAAAAAYgBAQAAAAGJAYAAAAABigGAAAAAAYsBAQAAAAGMAQgAAAABjQEIAAAAAY4BCAAAAAGPAQgAAAABkQGAAAAAAZMBAQAAAAGUAYAAAAABlQEgAAAAAQQUAACLAgAwqAEAAIwCADCqAQAAjgIAIK4BAADaAQAwAAAAAAAFFAAAngIAIBUAAKECACCoAQAAnwIAIKkBAACgAgAgrgEAAG4AIAMUAACeAgAgqAEAAJ8CACCuAQAAbgAgBAMAAPcBACAFAAD4AQAgawAAywEAIGwAAMsBACAEBQAA-AEAIGwAAMsBACCcAQAAywEAIJ0BAADLAQAgCwUAAPYBACBjAQAAAAFkAQAAAAFlAQAAAAFnAAAAZwJoAQAAAAFqAAAAagJrAQAAAAFsAQAAAAFtQAAAAAFuQAAAAAECAAAAbgAgFAAAngIAIAMAAABxACAUAACeAgAgFQAAogIAIA0AAABxACAFAADVAQAgDQAAogIAIGMBAM8BACFkAQDPAQAhZQEAzwEAIWcAANABZyJoAQDPAQAhagAA0QFqImsBANIBACFsAQDSAQAhbUAA0wEAIW5AANMBACELBQAA1QEAIGMBAM8BACFkAQDPAQAhZQEAzwEAIWcAANABZyJoAQDPAQAhagAA0QFqImsBANIBACFsAQDSAQAhbUAA0wEAIW5AANMBACEQYwEAAAABagAAAJEBAm1AAAAAAW5AAAAAAYgBAQAAAAGJAYAAAAABigGAAAAAAYsBAQAAAAGMAQgAAAABjQEIAAAAAY4BCAAAAAGPAQgAAAABkQGAAAAAAZMBAQAAAAGUAYAAAAABlQEgAAAAAQsDAAD1AQAgYwEAAAABZAEAAAABZQEAAAABZwAAAGcCaAEAAAABagAAAGoCawEAAAABbAEAAAABbUAAAAABbkAAAAABAgAAAG4AIBQAAKQCACADAAAAcQAgFAAApAIAIBUAAKgCACANAAAAcQAgAwAA1AEAIA0AAKgCACBjAQDPAQAhZAEAzwEAIWUBAM8BACFnAADQAWciaAEAzwEAIWoAANEBaiJrAQDSAQAhbAEA0gEAIW1AANMBACFuQADTAQAhCwMAANQBACBjAQDPAQAhZAEAzwEAIWUBAM8BACFnAADQAWciaAEAzwEAIWoAANEBaiJrAQDSAQAhbAEA0gEAIW1AANMBACFuQADTAQAhC2MBAAAAAW1AAAAAAW5AAAAAAZ4BAQAAAAGfAQEAAAABoAEBAAAAAaEBAQAAAAGiAQEAAAABowEgAAAAAaQBCAAAAAGlAQgAAAABCmMBAAAAAWQBAAAAAWUBAAAAAWgBAAAAAWsBAAAAAWwBAAAAAW1AAAAAAW5AAAAAAZwBAQAAAAGdASAAAAABAgAAACUAIBQAAKoCACADAAAACgAgFAAAqgIAIBUAAK4CACAMAAAACgAgDQAArgIAIGMBAM8BACFkAQDPAQAhZQEAzwEAIWgBAM8BACFrAQDPAQAhbAEA0gEAIW1AANMBACFuQADTAQAhnAEBANIBACGdASAA4wEAIQpjAQDPAQAhZAEAzwEAIWUBAM8BACFoAQDPAQAhawEAzwEAIWwBANIBACFtQADTAQAhbkAA0wEAIZwBAQDSAQAhnQEgAOMBACEQYwEAAAABagAAAJEBAm1AAAAAAW5AAAAAAYkBgAAAAAGKAYAAAAABiwEBAAAAAYwBCAAAAAGNAQgAAAABjgEIAAAAAY8BCAAAAAGRAYAAAAABkgEBAAAAAZMBAQAAAAGUAYAAAAABlQEgAAAAAQEEAAIDAwUBBQkDBgAGAgQAAgcLBAIFDAMGAAUBBQ0AAgMOAAUPAAABBAACAQQAAgUGAAsaAAwbAA0cAA4dAA8AAAAAAAUGAAsaAAwbAA0cAA4dAA8AAAMGABQcABUdABYAAAADBgAUHAAVHQAWAgQAAgdHBAIEAAIHTQQFBgAbGgAcGwAdHAAeHQAfAAAAAAAFBgAbGgAcGwAdHAAeHQAfAAAABQYAJRoAJhsAJxwAKB0AKQAAAAAABQYAJRoAJhsAJxwAKB0AKQAAAwYALhwALx0AMAAAAAMGAC4cAC8dADAIAgEJEAEKEQELEgEMEwEOFQEPFwcQGAgRGgESHAcTHQkWHgEXHwEYIAceIwofJBAgJgQhJwQiKQQjKgQkKwQlLQQmLwcnMBEoMgQpNAcqNRIrNgQsNwQtOAcuOxMvPBcwPQMxPgMyPwMzQAM0QQM1QwM2RQc3Rhg4SQM5Swc6TBk7TgM8TwM9UAc-Uxo_VCBAViFBVyFCWiFDWyFEXCFFXiFGYAdHYSJIYyFJZQdKZiNLZyFMaCFNaQdObCRPbSpQbwJRcAJScwJTdAJUdQJVdwJWeQdXeitYfAJZfgdafyxbgAECXIEBAl2CAQdehQEtX4YBMQ"
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

// src/utils/notFound.ts
import httpStatus2 from "http-status";
var notFound = (req, res, next) => {
  res.status(httpStatus2.NOT_FOUND).json({
    success: false,
    message: `Route Not Found - ${req.method} ${req.originalUrl}`
  });
};

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
  sender_email: process.env.SENDER_EMAIL,
  smtp_user: process.env.SMTP_USER,
  smtp_pass: process.env.SMTP_PASS,
  ssl_ecomerz_store_id: process.env.SSL_ECOMERZ_STORE_ID,
  ssl_ecomerz_store_password: process.env.SSL_ECOMERZ_STORE_PASSWORD
};

// src/modules/auth/auth.route.ts
import { Router } from "express";

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

// src/modules/auth/auth.service.ts
import bcrypt from "bcrypt";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
var adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL
});
var prisma = new PrismaClient({ adapter });

// src/utils/jwt.ts
import jwt from "jsonwebtoken";
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

// src/modules/auth/auth.service.ts
var AuthService = class {
  async hashPassword(password) {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(config_default.bcrypt_salt_rounds)
    );
    return hashedPassword;
  }
  async comparePassword(password, hashedPassword) {
    const isMatchPassword = await bcrypt.compare(password, hashedPassword);
    return isMatchPassword;
  }
  async register(payload) {
    const { name, email, password } = payload;
    if (!name || !email || !password) {
      throw new Error("Please provide all fields");
    }
    const hashedPassword = await this.hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
      omit: {
        password: true
      }
    });
    return user;
  }
  async login(payload) {
    const { email, password } = payload;
    if (!email || !password) {
      throw new Error("Please provide email and password fields");
    }
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (!user) {
      throw new Error("User not exists with this email!");
    }
    const isMatchPassword = await this.comparePassword(
      password,
      user.password
    );
    if (!isMatchPassword) {
      throw new Error("Your provided password is incorrect!");
    }
    const jwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    };
    const { accessToken, refreshToken } = signToken(jwtPayload);
    const { password: userPassword, ...userinfo } = user;
    return { accessToken, refreshToken, userinfo };
  }
};
var auth_service_default = new AuthService();

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

// src/modules/auth/auth.controller.ts
import httpStatus3 from "http-status";
var AuthController = class {
  register = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await auth_service_default.register(payload);
    sendResponse(res, {
      success: true,
      status: httpStatus3.CREATED,
      message: "User registered successfully",
      data: result
    });
  });
  login = catchAsync(async (req, res) => {
    const payload = req.body;
    const { accessToken, refreshToken, userinfo } = await auth_service_default.login(payload);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1e3 * 60 * 60
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1e3 * 60 * 60 * 24 * 7
    });
    sendResponse(res, {
      success: true,
      status: httpStatus3.OK,
      message: "User logged in successfully",
      data: {
        accessToken,
        userinfo
      }
    });
  });
};
var auth_controller_default = new AuthController();

// src/modules/auth/auth.route.ts
var authRoutes = Router();
authRoutes.post("/register", auth_controller_default.register);
authRoutes.post("/login", auth_controller_default.login);
var auth_route_default = authRoutes;

// src/modules/product/product.route.ts
import { Router as Router2 } from "express";

// src/modules/product/product.controller.ts
import httpStatus4 from "http-status";

// src/modules/product/product.service.ts
var ProductService = class {
  async createProduct(payload) {
    if (!payload) {
      throw new Error("Please provide product data in body");
    }
    const { name, image, category, price } = payload;
    if (!name || !image || !category || !price) {
      throw new Error(
        "Please provide fields (name, image, category & price)"
      );
    }
    const product = await prisma.product.create({
      data: payload
    });
    return product;
  }
  async getFlashDeals() {
    const products = await prisma.product.findMany({
      where: {
        stock: {
          gt: 0
        }
      },
      orderBy: {
        originalPrice: "desc"
      }
    });
    const productsWithDiscount = products.map((p) => {
      const discount = p.originalPrice && p.price ? Math.floor(
        (p.originalPrice - p.price) / p.originalPrice * 100
      ) : 0;
      return { ...p, discount };
    });
    return productsWithDiscount.slice(0, 8);
  }
  async getProducts(query) {
    const { category, maxPrice, minPrice, search, sort } = query;
    const where = {};
    if (category && category !== "all") where.category = category;
    if (search) where.name = { contains: search, mode: "insensitive" };
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        where.price.gte = Number(minPrice);
      }
      if (maxPrice) {
        where.price.lte = Number(maxPrice);
      }
    }
    const orderBy = {};
    if (sort === "price-low") orderBy.price = "asc";
    else if (sort === "price-high") orderBy.price = "desc";
    else orderBy.createdAt = "desc";
    const products = await prisma.product.findMany({
      where,
      orderBy
    });
    const productsWithDiscount = products.map((p) => {
      const discount = p.originalPrice && p.price ? Math.floor(
        (p.originalPrice - p.price) / p.originalPrice * 100
      ) : 0;
      return { ...p, discount };
    });
    return productsWithDiscount;
  }
  async getProduct(productId) {
    const product = await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        views: {
          increment: 1
        }
      }
    });
    if (!product) {
      throw new Error("Product not found");
    }
    const discount = product.originalPrice && product.price ? Math.floor(
      (product.originalPrice - product.price) / product.originalPrice * 100
    ) : 0;
    return { ...product, discount };
  }
  async updateProduct(productId, payload) {
    if (!payload || !productId) {
      throw new Error(
        "Please provide update data in body and productId in params"
      );
    }
    const product = await prisma.product.update({
      where: {
        id: productId
      },
      data: payload
    });
    return product;
  }
  async deleteProduct(productId) {
    if (!productId) {
      throw new Error("Please provide productId in params");
    }
    const product = await prisma.product.delete({
      where: {
        id: productId
      }
    });
    return product;
  }
};
var product_service_default = new ProductService();

// src/modules/product/product.controller.ts
var ProductController = class {
  createProduct = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await product_service_default.createProduct(payload);
    sendResponse(res, {
      success: true,
      status: httpStatus4.OK,
      message: "New Product Added successfully",
      data: result
    });
  });
  getFlashDeals = catchAsync(async (req, res) => {
    const result = await product_service_default.getFlashDeals();
    sendResponse(res, {
      success: true,
      status: httpStatus4.OK,
      message: "Flash deals products retrived successfully",
      data: result
    });
  });
  getProducts = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await product_service_default.getProducts(query);
    sendResponse(res, {
      success: true,
      status: httpStatus4.OK,
      message: "Products retrived successfully",
      data: result
    });
  });
  getProduct = catchAsync(async (req, res) => {
    const productId = req.params.id;
    if (!productId) {
      throw new Error("Please provide productId in the params!");
    }
    const result = await product_service_default.getProduct(productId);
    sendResponse(res, {
      success: true,
      status: httpStatus4.OK,
      message: "Product retrived successfully",
      data: result
    });
  });
  updateProduct = catchAsync(async (req, res) => {
    const productId = req.params.id;
    const payload = req.body;
    const result = await product_service_default.updateProduct(
      productId,
      payload
    );
    sendResponse(res, {
      success: true,
      status: httpStatus4.OK,
      message: "Product updated successfully",
      data: result
    });
  });
  deleteProduct = catchAsync(async (req, res) => {
    const productId = req.params.id;
    const result = await product_service_default.deleteProduct(productId);
    sendResponse(res, {
      success: true,
      status: httpStatus4.OK,
      message: "Product deleted successfully",
      data: result
    });
  });
};
var product_controller_default = new ProductController();

// src/middlewares/auth.ts
import httpStatus5 from "http-status";
var auth = (...roles) => {
  return catchAsync(
    async (req, res, next) => {
      const accessToken = req.cookies.accessToken ? req.cookies.accessToken : req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization?.split(" ")[1] : req.headers.authorization;
      const payload = verifyToken(accessToken, "access");
      if (!payload) {
        return sendResponse(res, {
          success: false,
          message: "Your token is Invalid",
          status: httpStatus5.UNAUTHORIZED
        });
      }
      const user = await prisma.user.findUnique({
        where: {
          id: payload.id
        }
      });
      if (!user) {
        throw new Error("User not Found. Please login again");
      }
      const { id, name, email, role } = user;
      req.user = { id, name, email, role };
      if (!req.user) {
        return sendResponse(res, {
          success: false,
          message: "unauthorized access",
          status: httpStatus5.UNAUTHORIZED
        });
      }
      if (roles.length && !roles.includes(req.user.role)) {
        return sendResponse(res, {
          success: false,
          message: "You have no permissions to access",
          status: httpStatus5.FORBIDDEN
        });
      }
      next();
    }
  );
};

// src/modules/product/product.route.ts
var productRoutes = Router2();
productRoutes.post("/", auth("ADMIN"), product_controller_default.createProduct);
productRoutes.get("/flash-deals", product_controller_default.getFlashDeals);
productRoutes.get("/", product_controller_default.getProducts);
productRoutes.get("/:id", product_controller_default.getProduct);
productRoutes.put("/:id", auth("ADMIN"), product_controller_default.updateProduct);
productRoutes.delete("/:id", auth("ADMIN"), product_controller_default.deleteProduct);
var product_route_default = productRoutes;

// src/modules/upload/upload.route.ts
import { Router as Router3 } from "express";

// src/modules/upload/upload.controller.ts
import httpStatus6 from "http-status";

// src/config/coudinary.ts
import { v2 as cloudinary } from "cloudinary";
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
      status: httpStatus6.OK,
      message: "Image upload successfully",
      data: {
        url: secure_url
      }
    });
  });
};
var upload_controller_default = new UploadController();

// src/modules/upload/upload.route.ts
import multer from "multer";
var uploadRoutes = Router3();
var storage = multer.memoryStorage();
var upload = multer({ storage });
uploadRoutes.post(
  "/",
  auth("ADMIN"),
  upload.single("image"),
  upload_controller_default.upload
);
var upload_route_default = uploadRoutes;

// src/modules/order/order.route.ts
import { Router as Router4 } from "express";

// src/modules/order/order.controller.ts
import httpStatus7 from "http-status";

// src/inngest/index.ts
import { cron, Inngest } from "inngest";

// src/config/nodemailer.ts
import { createTransport } from "nodemailer";
var transporter = createTransport({
  // host: "smtp-relay.brevo.com",
  // port: 587,
  // secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  service: "gmail",
  auth: {
    user: config_default.smtp_user,
    pass: config_default.smtp_pass
  }
});
await transporter.verify();
console.log("SMTP connected");
var sendEmail = async ({
  to,
  subject,
  body
}) => {
  const response = await transporter.sendMail({
    from: `"Grocery Delivery" < ${config_default.sender_email} >`,
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
  id: "grocery-delivery"
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

// src/modules/order/order.service.ts
var OrderService = class {
  async createOrder(userId, payload) {
    const { items, paymentMethod, shippingAddress } = payload;
    if (!items || items.length === 0) {
      throw new Error("No orders items");
    }
    const productIds = items.map((i) => i.product);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds
        }
      }
    });
    const productMap = {};
    products.forEach((p) => productMap[p.id] = p);
    for (const item of items) {
      const product = productMap[item.product];
      if (!product || (product.stock ?? 0) < item.quantity) {
        throw new Error("Product out of stock");
      }
    }
    const orderItems = items.map((item) => {
      const dbProduct = productMap[item.product];
      if (!dbProduct)
        throw new Error(`Product ${item.product} not found`);
      return {
        product: dbProduct.id,
        name: dbProduct.name,
        image: dbProduct.image,
        price: dbProduct.price,
        quantity: item.quantity,
        unit: dbProduct.unit
      };
    });
    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const deliveryFee = subtotal > 20 ? 0 : 1.99;
    const tax = Math.round(subtotal * 8) / 100;
    const total = Math.round(subtotal + deliveryFee + tax);
    const transactionResult = await prisma.$transaction(async (tx) => {
      console.log("Creating order...");
      const order = await tx.order.create({
        data: {
          userId,
          items: orderItems,
          shippingAddress,
          paymentMethod,
          subtotal,
          deliveryFee,
          tax,
          total,
          statusHistory: [
            {
              status: "placed",
              note: "Order placed successfully",
              timestamp: /* @__PURE__ */ new Date()
            }
          ]
        }
      });
      console.log("Order created");
      if (paymentMethod === "card") {
      }
      console.log("Updating stock...");
      for (const item of orderItems) {
        await tx.product.update({
          where: {
            id: item.product
          },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }
      console.log("Stock updated");
      console.log("Sending event...");
      for (const item of orderItems) {
        await inngest.send({
          name: "inventory/stock.updated",
          data: { productId: item.product }
        });
      }
      console.log("Event sent");
      await inngest.send({
        name: "order/placed",
        data: {
          orderId: order.id
        }
      });
      return { order };
    });
    return transactionResult;
  }
  async getCustomerOrders(userId, status) {
    const where = {
      userId,
      NOT: [
        {
          paymentMethod: "card",
          isPaid: false
        }
      ]
    };
    if (status) {
      where.status = status;
    }
    const orders = await prisma.order.findMany({
      where,
      include: {
        deliveryPartner: {
          select: {
            name: true,
            phone: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return orders;
  }
  async getOrder(userId, orderId) {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId
      },
      include: {
        deliveryPartner: {
          select: {
            name: true,
            phone: true,
            avatar: true,
            vehicleType: true
          }
        }
      }
    });
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  }
  async updateOrderStatus(payload, orderId) {
    const { status, note } = payload;
    const order = await prisma.order.findUnique({
      where: {
        id: orderId
      }
    });
    if (!order) {
      throw new Error("Order not found");
    }
    const history = Array.isArray(order.statusHistory) ? order.statusHistory : [];
    history.push({
      status,
      note: note || `Order ${status.toLowerCase()}`,
      timestamp: /* @__PURE__ */ new Date()
    });
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        statusHistory: history
      }
    });
    return updatedOrder;
  }
  async getAllOrders() {
    const orders = await prisma.order.findMany({
      where: {
        NOT: [
          {
            paymentMethod: "card",
            isPaid: false
          }
        ]
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        deliveryPartner: {
          select: {
            name: true,
            phone: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return orders;
  }
  async getOrderLocation(orderId, userId) {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId
      },
      select: {
        liveLocation: true,
        status: true
      }
    });
    if (!order) {
      throw new Error("Order not found");
    }
    return { liveLocation: order.liveLocation, status: order.status };
  }
};
var order_service_default = new OrderService();

// src/modules/order/order.controller.ts
var OrderController = class {
  createOrder = catchAsync(async (req, res) => {
    const payload = req.body;
    const userId = req.user.id;
    const { order } = await order_service_default.createOrder(userId, payload);
    sendResponse(res, {
      success: true,
      status: httpStatus7.CREATED,
      message: "Order placed successfully",
      data: { order }
    });
  });
  getCustomerOrders = catchAsync(async (req, res) => {
    const status = req.query.status;
    const userId = req.user.id;
    const result = await order_service_default.getCustomerOrders(
      userId,
      status
    );
    sendResponse(res, {
      success: true,
      status: httpStatus7.OK,
      message: "Customer orders retrived successfully",
      data: result
    });
  });
  geOrder = catchAsync(async (req, res) => {
    const orderId = req.params.id;
    const userId = req.user.id;
    const result = await order_service_default.getOrder(userId, orderId);
    sendResponse(res, {
      success: true,
      status: httpStatus7.OK,
      message: "Order retrived successfully",
      data: result
    });
  });
  // update orderStatus by Admin
  updateOrderStatus = catchAsync(async (req, res) => {
    const orderId = req.params.id;
    const payload = req.body;
    const result = await order_service_default.updateOrderStatus(
      payload,
      orderId
    );
    sendResponse(res, {
      success: true,
      status: httpStatus7.OK,
      message: "order status updated successfully",
      data: result
    });
  });
  getAllOrders = catchAsync(async (req, res) => {
    const result = await order_service_default.getAllOrders();
    sendResponse(res, {
      success: true,
      status: httpStatus7.OK,
      message: "All orders retrived successfully",
      data: result
    });
  });
  getlOrderLocation = catchAsync(async (req, res) => {
    const orderId = req.params.id;
    const userId = req.user.id;
    const result = await order_service_default.getOrderLocation(
      orderId,
      userId
    );
    sendResponse(res, {
      success: true,
      status: httpStatus7.OK,
      message: "order location retrived successfully",
      data: result
    });
  });
};
var order_controller_default = new OrderController();

// src/modules/order/order.route.ts
var orderRoutes = Router4();
orderRoutes.post("/", auth("CUSTOMER"), order_controller_default.createOrder);
orderRoutes.get("/", auth("CUSTOMER"), order_controller_default.getCustomerOrders);
orderRoutes.get("/:id", auth("CUSTOMER"), order_controller_default.getCustomerOrders);
orderRoutes.put(
  "/:id/status",
  auth("ADMIN"),
  order_controller_default.getCustomerOrders
);
orderRoutes.put("/all", auth("ADMIN"), order_controller_default.getAllOrders);
orderRoutes.put(
  "/:id/location",
  auth("CUSTOMER"),
  order_controller_default.getlOrderLocation
);
var order_route_default = orderRoutes;

// src/app.ts
import { serve } from "inngest/express";
var app = express();
app.use(
  cors({
    origin: config_default.app_url,
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Server is live");
});
app.use("/api/auth", auth_route_default);
app.use("/api/products", product_route_default);
app.use("/api/upload", upload_route_default);
app.use("/api/orders", order_route_default);
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use(notFound);
app.use(globalErrorHandler);
var app_default = app;
export {
  app_default as default
};
//# sourceMappingURL=app.js.map