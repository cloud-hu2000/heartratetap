// 简单的数据库连接测试
require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

const connectionString = process.env.POSTGRES_URL;

console.log('🔍 测试数据库连接...');
console.log('📡 连接字符串存在:', !!connectionString);

if (connectionString) {
  try {
    const sql = neon(connectionString);
    console.log('✅ Neon SQL实例创建成功');

    // 测试查询
    sql`SELECT 1 as test`.then(result => {
      console.log('✅ 数据库查询成功:', result);
      process.exit(0);
    }).catch(error => {
      console.error('❌ 数据库查询失败:', error);
      process.exit(1);
    });
  } catch (error) {
    console.error('❌ Neon实例创建失败:', error);
    process.exit(1);
  }
} else {
  console.error('❌ 缺少POSTGRES_URL环境变量');
  process.exit(1);
}
