"use client";

import { useEffect } from "react";

const AdBanner = () => {
  useEffect(() => {
    // 动态加载广告脚本
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://pl28515745.effectivegatecpm.com/b6ea02a7eae804914440e4c0db92e709/invoke.js";
    script.setAttribute('data-cfasync', 'false');

    // 查找或创建容器
    let container = document.getElementById('container-b6ea02a7eae804914440e4c0db92e709');
    if (!container) {
      container = document.createElement('div');
      container.id = 'container-b6ea02a7eae804914440e4c0db92e709';
      document.body.appendChild(container);
    }

    // 添加脚本到文档
    if (!document.querySelector(`script[src="${script.src}"]`)) {
      document.body.appendChild(script);
    }

    // 清理函数
    return () => {
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="ad-banner-container">
      <div
        id="container-b6ea02a7eae804914440e4c0db92e709"
        className="ad-banner"
      />
    </div>
  );
};

export default AdBanner;
