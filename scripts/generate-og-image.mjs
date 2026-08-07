import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const backgroundPath = path.join(projectRoot, "assets", "og", "heart-rate-tap-background.png");
const outputPath = path.join(projectRoot, "public", "og-heart-rate-tap.png");

const overlay = Buffer.from(`
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect x="70" y="76" width="84" height="84" rx="26" fill="#0f8c8c"/>
    <path d="M92 119h14l10-20 15 40 10-20h17" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="180" y="136" fill="#0f2b33" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="700" letter-spacing="-1.5">HeartRateTap</text>
    <text x="70" y="266" fill="#0f2b33" font-family="Arial, Helvetica, sans-serif" font-size="66" font-weight="700" letter-spacing="-2.5">Manual Tap</text>
    <text x="70" y="338" fill="#0f2b33" font-family="Arial, Helvetica, sans-serif" font-size="66" font-weight="700" letter-spacing="-2.5">BPM Estimator</text>
    <text x="72" y="412" fill="#415b62" font-family="Arial, Helvetica, sans-serif" font-size="28">Tap with a pulse you locate manually.</text>
    <text x="72" y="453" fill="#415b62" font-family="Arial, Helvetica, sans-serif" font-size="28">See the formula, limits, and local history.</text>
    <rect x="70" y="502" width="253" height="52" rx="26" fill="#0f8c8c"/>
    <text x="196.5" y="537" text-anchor="middle" fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700">heartratetap.com</text>
  </svg>
`);

await sharp(backgroundPath)
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .composite([{ input: overlay, top: 0, left: 0 }])
  .png({ compressionLevel: 9, palette: true })
  .toFile(outputPath);

const metadata = await sharp(outputPath).metadata();

if (metadata.width !== 1200 || metadata.height !== 630) {
  throw new Error(`Expected 1200x630 output, received ${metadata.width}x${metadata.height}`);
}

console.log(`Generated ${outputPath} (${metadata.width}x${metadata.height})`);
