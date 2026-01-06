// Quick test script to check environment variables and database connection
require('dotenv').config({ path: '.env.local' });

console.log('🔍 快速诊断脚本');
console.log('================');

// Check environment variables
console.log('\n📋 环境变量检查:');
console.log('POSTGRES_URL 配置:', !!process.env.POSTGRES_URL);
console.log('NEXTAUTH_SECRET 配置:', !!process.env.NEXTAUTH_SECRET);

// Check database connection
console.log('\n💾 数据库连接检查:');
if (process.env.POSTGRES_URL) {
  try {
    const { neon } = require('@neondatabase/serverless');
    const sql = neon(process.env.POSTGRES_URL);
    console.log('✅ Neon SQL实例创建成功');

    // Test simple query
    sql`SELECT 1 as test`.then(result => {
      console.log('✅ 数据库查询成功');
      console.log('测试结果:', result);
      process.exit(0);
    }).catch(error => {
      console.error('❌ 数据库查询失败:', error.message);
      process.exit(1);
    });
  } catch (error) {
    console.error('❌ Neon实例创建失败:', error.message);
    process.exit(1);
  }
} else {
  console.error('❌ POSTGRES_URL 未配置');
  console.log('\n💡 解决方案:');
  console.log('1. 创建 .env.local 文件');
  console.log('2. 添加: POSTGRES_URL=your_database_url_here');
  console.log('3. 添加: NEXTAUTH_SECRET=your_secret_key_here');
  process.exit(1);
}
