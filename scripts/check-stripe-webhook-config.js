#!/usr/bin/env node

/**
 * Stripe Webhook 配置检查脚本
 * 用于验证生产环境的 Stripe Webhook 配置是否正确
 * 
 * 使用方法：
 *   node scripts/check-stripe-webhook-config.js
 */

const https = require('https');
const http = require('http');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkEnvVar(name, required = true) {
  const value = process.env[name];
  const exists = !!value;
  
  if (required && !exists) {
    log(`❌ ${name}: 未配置`, 'red');
    return false;
  }
  
  if (exists) {
    // 掩码显示敏感信息
    const masked = value.length > 12 
      ? `${value.substring(0, 8)}...${value.substring(value.length - 4)}`
      : '***';
    
    // 检查密钥类型
    let type = '';
    if (name === 'STRIPE_SECRET_KEY') {
      if (value.startsWith('sk_live_')) {
        type = ' (生产环境)';
        log(`✅ ${name}: 已配置${type} - ${masked}`, 'green');
      } else if (value.startsWith('sk_test_')) {
        type = ' (测试环境)';
        log(`⚠️  ${name}: 已配置${type} - ${masked}`, 'yellow');
      } else {
        log(`⚠️  ${name}: 已配置，但格式可能不正确 - ${masked}`, 'yellow');
      }
    } else if (name === 'STRIPE_WEBHOOK_SECRET') {
      if (value.startsWith('whsec_')) {
        log(`✅ ${name}: 已配置 - ${masked}`, 'green');
      } else {
        log(`⚠️  ${name}: 已配置，但格式可能不正确 - ${masked}`, 'yellow');
      }
    } else {
      log(`✅ ${name}: 已配置`, 'green');
    }
    return true;
  }
  
  log(`⚠️  ${name}: 未配置（可选）`, 'yellow');
  return true;
}

function checkWebhookEndpoint(url) {
  return new Promise((resolve) => {
    log(`\n🔍 检查 Webhook 端点可访问性: ${url}`, 'cyan');
    
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            if (json.status === 'ok' || json.message) {
              log(`✅ Webhook 端点可访问 (HTTP ${res.statusCode})`, 'green');
              log(`   响应: ${json.message || 'OK'}`, 'blue');
              resolve(true);
            } else {
              log(`⚠️  Webhook 端点可访问，但响应格式异常`, 'yellow');
              log(`   响应: ${data.substring(0, 100)}`, 'blue');
              resolve(false);
            }
          } catch (e) {
            log(`⚠️  Webhook 端点可访问，但响应不是 JSON`, 'yellow');
            resolve(false);
          }
        } else {
          log(`❌ Webhook 端点返回错误状态码: ${res.statusCode}`, 'red');
          resolve(false);
        }
      });
    });
    
    req.on('error', (err) => {
      log(`❌ 无法连接到 Webhook 端点: ${err.message}`, 'red');
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      log(`❌ 连接超时（10秒）`, 'red');
      resolve(false);
    });
  });
}

async function main() {
  log('\n📋 Stripe Webhook 配置检查\n', 'cyan');
  log('='.repeat(50), 'cyan');
  
  // 检查环境变量
  log('\n1️⃣  检查环境变量配置:', 'cyan');
  const hasSecretKey = checkEnvVar('STRIPE_SECRET_KEY', true);
  const hasWebhookSecret = checkEnvVar('STRIPE_WEBHOOK_SECRET', true);
  
  // 检查环境
  log('\n2️⃣  检查运行环境:', 'cyan');
  const nodeEnv = process.env.NODE_ENV || 'development';
  if (nodeEnv === 'production') {
    log(`✅ NODE_ENV: ${nodeEnv}`, 'green');
  } else {
    log(`⚠️  NODE_ENV: ${nodeEnv} (建议在生产环境运行此检查)`, 'yellow');
  }
  
  // 检查 Webhook URL
  log('\n3️⃣  检查 Webhook 端点:', 'cyan');
  const webhookUrl = process.env.STRIPE_WEBHOOK_URL || process.env.NEXT_PUBLIC_APP_URL;
  
  if (webhookUrl) {
    const fullUrl = webhookUrl.endsWith('/api/billing/notify-payment')
      ? webhookUrl
      : `${webhookUrl.replace(/\/$/, '')}/api/billing/notify-payment`;
    
    log(`   URL: ${fullUrl}`, 'blue');
    
    if (!fullUrl.startsWith('https://')) {
      log(`⚠️  警告: Webhook URL 不是 HTTPS（Stripe 要求 HTTPS）`, 'yellow');
    }
    
    // 尝试访问端点
    await checkWebhookEndpoint(fullUrl);
  } else {
    log(`⚠️  STRIPE_WEBHOOK_URL 或 NEXT_PUBLIC_APP_URL 未配置`, 'yellow');
    log(`   请手动测试: https://your-domain.com/api/billing/notify-payment`, 'blue');
  }
  
  // 总结
  log('\n' + '='.repeat(50), 'cyan');
  log('\n📊 检查总结:', 'cyan');
  
  const allGood = hasSecretKey && hasWebhookSecret;
  
  if (allGood) {
    log('\n✅ 基本配置检查通过！', 'green');
    log('\n📝 下一步:', 'cyan');
    log('   1. 在 Stripe Dashboard (Live Mode) 中创建 Webhook 端点');
    log('   2. 配置 Webhook URL: https://your-domain.com/api/billing/notify-payment');
    log('   3. 选择事件类型: checkout.session.completed, payment_intent.succeeded');
    log('   4. 复制 Webhook Signing Secret 并配置到 STRIPE_WEBHOOK_SECRET');
    log('   5. 在 Stripe Dashboard 中发送测试 webhook 验证');
  } else {
    log('\n❌ 配置不完整，请检查上述错误', 'red');
    process.exit(1);
  }
  
  log('\n');
}

// 运行检查
main().catch((err) => {
  log(`\n❌ 检查过程中出错: ${err.message}`, 'red');
  process.exit(1);
});
