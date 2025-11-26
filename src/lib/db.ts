import { neon } from "@neondatabase/serverless";

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("未检测到 POSTGRES_URL 或 DATABASE_URL，请在环境变量中配置 Neon 连接串。");
}

export const sql = neon(connectionString);

