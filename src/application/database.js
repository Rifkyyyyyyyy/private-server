import { PrismaClient } from "@prisma/client";
import { logger } from "./logger.js";


let prismaClient;

try {
    prismaClient = new PrismaClient({
        log: [
            { emit: "event", level: "query" },
            { emit: "event", level: "error" },
            { emit: "event", level: "info" },
            { emit: "event", level: "warn" },
        ],
    });

    // Event listeners Prisma
    prismaClient.$on("error", (e) => {
        logger?.error?.("Prisma Error:", e);
    });

    prismaClient.$on("warn", (e) => {
        logger?.warn?.("Prisma Warning:", e);
    });

    prismaClient.$on("info", (e) => {
        logger?.info?.("Prisma Info:", e);
    });

    prismaClient.$on("query", (e) => {
        logger?.info?.(`Query: ${e.query} | Duration: ${e.duration}ms`);
    });

} catch (err) {
    console.error("❌ Failed to initialize PrismaClient:", err);
    process.exit(1); // Stop app kalau Prisma gagal
}

export { prismaClient };
