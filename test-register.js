// 简单的注册API测试
require('dotenv').config({ path: '.env.local' });

const testEmail = `test-${Date.now()}@example.com`;
const testPassword = 'TestPassword123!';
const testName = 'Test User';

console.log('🧪 测试注册API...');
console.log('📧 测试邮箱:', testEmail);
console.log('👤 测试用户名:', testName);

async function testRegister() {
  try {
    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
        name: testName,
      }),
    });

    console.log('📡 响应状态:', response.status, response.statusText);

    const data = await response.json();
    console.log('📦 响应数据:', JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log('✅ 注册测试成功！');

      // 检查cookie是否设置
      const cookies = response.headers.get('set-cookie');
      console.log('🍪 Cookie设置:', cookies ? 'Yes' : 'No');

      if (cookies) {
        console.log('🍪 Cookie详情:', cookies);
      }
    } else {
      console.error('❌ 注册测试失败');
    }
  } catch (error) {
    console.error('💥 测试过程中发生错误:', error);
  }
}

testRegister();
