// 这个页面用于测试Sentry错误监控
"use client";

import { useEffect } from "react";

export default function SentryTestPage() {
  useEffect(() => {
    // 模拟一个错误来测试Sentry
    setTimeout(() => {
      try {
        throw new Error("Test error for Sentry monitoring");
      } catch (error) {
        console.error("Test error:", error);
        // 在生产环境中这会被Sentry捕获
      }
    }, 1000);
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Sentry Test Page</h1>
      <p>This page contains a test error that will be captured by Sentry (in production).</p>
      <p>Check browser console for the test error.</p>
    </div>
  );
}
