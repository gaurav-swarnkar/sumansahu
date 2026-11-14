// Export banner.html as a transparent PNG (2x and 1x) plus a preview on the hero gradient.
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

(async () => {
  const OUT = path.join(__dirname, "out");
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  for (const [scale, name, preview] of [[2, "notsi_banner@2x.png", false], [1, "notsi_banner.png", false], [2, "notsi_banner_preview.png", true]]) {
    const page = await browser.newPage({ viewport: { width: 1300, height: 360 }, deviceScaleFactor: scale });
    await page.goto("file://" + path.join(__dirname, "banner.html"));
    await page.waitForLoadState("networkidle");
    await page.evaluate(async () => {
      
      await document.fonts.load('400 10px "Outfit"');
      await document.fonts.ready;
    });
    await page.waitForFunction(() => document.body.dataset.ready === "1");
    if (preview) await page.evaluate(() => document.body.classList.add("preview"));
    await page.screenshot({ path: path.join(OUT, name), omitBackground: !preview });
    await page.close();
  }
  await browser.close();
  console.log("banner exported");
})();
