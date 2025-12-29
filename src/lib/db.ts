import { neon } from "@neondatabase/serverless";

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

// 创建一个安全的数据库连接，如果没有配置则返回null
let sql: any = null;

if (typeof window === 'undefined') {
  // 服务器端
  if (connectionString) {
    sql = neon(connectionString);
  } else {
    console.warn("⚠️  数据库连接未配置，某些功能将被禁用");
  }
}

export { sql };

