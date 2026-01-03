export const metadata = {
  title: '免费在线心率检测 — HeartrateTap 即刻测量',
  description:
    '使用 HeartrateTap 免费在线检测心率（BPM），支持移动与桌面浏览器，操作简单、响应快速。提供结果解释、测量注意事项、复测与日常监控建议，以及常见问题解答，立即开始免费检测。',
};

export default function Page() {
  return (
    <main>
      <header>
        <h1>免费在线心率检测 — HeartrateTap 即刻测量</h1>
        <p>
          在 HeartrateTap 免费在线检测你的心率（BPM）。无需额外设备或注册，支持手机与桌面浏览器，操作简单、响应快速，适合日常自检与运动后快速检查。
        </p>
      </header>

      <section>
        <h2>如何开始检测</h2>
        <ol>
          <li>点击页面中的“开始检测”按钮并按照提示操作。</li>
          <li>保持静止并让工具采样数秒以获得稳定读数。</li>
          <li>查看显示的 BPM 和对应说明，必要时重复测量。</li>
        </ol>
      </section>

      <section>
        <h2>结果解释与建议</h2>
        <p>
          测量结果为当前即时 BPM。成年人静息心率通常在 60–100 BPM。若数值长期偏高或偏低，建议联系医疗专业人员。
        </p>
        <ul>
          <li>测量前休息 1–2 分钟，避免剧烈运动或情绪波动。</li>
          <li>连续异常请复测并记录，便于对比。</li>
          <li>本工具为自测参考，不能替代专业诊断。</li>
        </ul>
      </section>

      <section>
        <h2>常见问题</h2>
        <h3>是否需要付费或注册？</h3>
        <p>无需付费或注册，基础检测免费提供。</p>
        <h3>检测结果一定准确吗？</h3>
        <p>为提高准确性请保持设备稳定并在良好光线环境下测量；如需专业判断请使用医疗设备或就医。</p>
      </section>

      <footer>
        <p>© HeartrateTap</p>
      </footer>
    </main>
  );
}

import React from 'react';

export const metadata = {
  title: '免费在线心率检测 — HeartrateTap 即刻测量',
  description:
    '使用 HeartrateTap 免费在线检测心率（BPM），支持移动与桌面浏览器，操作简单、响应快速。提供结果解释、测量注意事项、复测与日常监控建议，以及常见问题解答，立即开始免费检测。',
};

export default function CheckHeartRatePage() {
  return (
    <main>
      <header>
        <h1>免费在线心率检测 — HeartrateTap 即刻测量</h1>
        <p>
          使用 HeartrateTap 的免费在线心率检测工具，几秒内获取你的心率（BPM）。
          页面对移动端与桌面均做过优化，无需下载或注册即可开始检测。
        </p>
      </header>

      <section>
        <h2>为何选择 HeartrateTap 的在线检测？</h2>
        <ul>
          <li>快速：秒级响应，适合即时自查。</li>
          <li>便捷：无需外部设备或账号。</li>
          <li>兼容：移动与桌面浏览器均支持。</li>
        </ul>
      </section>

      <section>
        <h2>如何测量</h2>
        <ol>
          <li>打开检测页面并按提示操作。</li>
          <li>保持静止，等待采样完成。</li>
          <li>查看显示的 BPM 与建议。</li>
        </ol>
      </section>

      <section>
        <h2>测量说明与建议</h2>
        <p>
          检测结果仅供参考。成人静息心率一般在 60–100 BPM。若测量值持续异常，请复测并咨询医疗专业人士。
        </p>
      </section>

      <footer>
        <p>© HeartrateTap</p>
      </footer>
    </main>
  );
}


