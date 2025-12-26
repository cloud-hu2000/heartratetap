"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/lib/sw";

export function ServiceWorkerRegister() {
  useEffect(() => {
    // 延迟注册以确保页面完全加载
    const timer = setTimeout(() => {
      registerServiceWorker();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null; // 这个组件不渲染任何内容
}
