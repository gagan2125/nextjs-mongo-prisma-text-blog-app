import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!("prisma" in global)) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma as PrismaClient; // Assert the type here
}

export default prisma;
