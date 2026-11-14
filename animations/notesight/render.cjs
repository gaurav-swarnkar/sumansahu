// Render scene.html frame-by-frame and encode the two parts plus a merged cut.
// Usage: node animations/notesight/render.js [part] [--preview t1,t2,...]
const { chromium } = require("playwright");
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const FPS = 30, DUR = 6;
const DIR = __dirname, OUT = path.join(DIR, "out");

(async () => {
  const args = process.argv.slice(2);
  const preview = args.includes("--preview") ? args[args.indexOf("--preview") + 1].split(",").map(Number) : null;
  const parts = args[0] && !args[0].startsWith("--") ? [Number(args[0])] : [1, 2];
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 1080 }, deviceScaleFactor: 1 });
  await page.goto("file://" + path.join(DIR, "scene.html"));
  await page.evaluate(async () => { await document.fonts.load('24px "Material Symbols Rounded"', "check_circle"); await document.fonts.load('600 16px "Outfit"'); await document.fonts.ready; });
  await page.waitForLoadState("networkidle");

  for (const part of parts) {
    if (preview) {
      for (const t of preview) {
        await page.evaluate(([pt, tt]) => window.render(pt, tt), [part, t]);
        await page.screenshot({ path: path.join(OUT, `preview_p${part}_${t.toFixed(2)}.png`) });
      }
      continue;
    }
    const frames = path.join(OUT, `frames${part}`);
    fs.rmSync(frames, { recursive: true, force: true });
    fs.mkdirSync(frames);
    for (let f = 0; f < FPS * DUR; f++) {
      await page.evaluate(([pt, tt]) => window.render(pt, tt), [part, f / FPS]);
      await page.screenshot({ path: path.join(frames, String(f).padStart(4, "0") + ".png") });
    }
    execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-framerate", String(FPS),
      "-i", path.join(frames, "%04d.png"), "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "16",
      "-preset", "slow", "-movflags", "+faststart", path.join(OUT, `notesight_part${part}.mp4`)]);
    fs.rmSync(frames, { recursive: true, force: true });
    console.log("part", part, "done");
  }
  await browser.close();

  if (!preview && parts.length === 2) {
    // Parts are built as a match cut: part 1 ends on the dot that part 2 starts from.
    const list = path.join(OUT, "concat.txt");
    fs.writeFileSync(list, "file 'notesight_part1.mp4'\nfile 'notesight_part2.mp4'\n");
    execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-f", "concat", "-safe", "0",
      "-i", list, "-c", "copy", "-movflags", "+faststart", path.join(OUT, "notesight_full.mp4")]);
    fs.rmSync(list);
    console.log("merged");
  }
})();
