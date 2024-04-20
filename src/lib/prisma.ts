import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const neon = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaNeon(neon);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    // log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// import { Pool, neonConfig } from "@neondatabase/serverless";
// import { PrismaNeon } from "@prisma/adapter-neon";
// import { PrismaClient } from "@prisma/client";
// import ws from "ws";

// neonConfig.webSocketConstructor = ws;
// const connectionString = `${process.env.DATABASE_URL}`;

// const pool = new Pool({ connectionString });
// const adapter = new PrismaNeon(pool);
// export const prisma = new PrismaClient({ adapter });
