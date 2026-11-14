// Render scene.html frame-by-frame at 2x and encode high-quality videos.
// Usage: node animations/notesight/render.cjs [part] [--preview t1,t2,...]
// Outputs (out/): notesight_part1.mp4, notesight_part2.mp4, notesight_full.mp4 (1280x1080, supersampled)
//                 notesight_full_2x.mp4 (2560x2160 master)
const { chromium } = require("playwright");
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const FPS = 30, DUR = 6, SCALE = 2;
const DIR = __dirname, OUT = path.join(DIR, "out");
const ff = (...a) => execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...a]);
// High quality H.264: low CRF, slow preset, tuned for flat graphics; yuv420p keeps it playable everywhere.
const X264 = ["-c:v", "libx264", "-preset", "slower", "-tune", "animation", "-crf", "10", "-pix_fmt", "yuv420p",
  "-profile:v", "high", "-movflags", "+faststart"];

(async () => {
  const args = process.argv.slice(2);
  const preview = args.includes("--preview") ? args[args.indexOf("--preview") + 1].split(",").map(Number) : null;
  const parts = args[0] && !args[0].startsWith("--") ? [Number(args[0])] : [1, 2];
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 1080 }, deviceScaleFactor: preview ? 1 : SCALE });
  await page.goto("file://" + path.join(DIR, "scene.html"));
  await page.waitForLoadState("networkidle");
  await page.evaluate(async () => {
    await document.fonts.load('24px "Material Symbols Rounded"', "check_circle");
    await document.fonts.load('600 16px "Outfit"');
    await document.fonts.ready;
  });

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
    // 2x master for this part, then a supersampled (lanczos) 1280x1080 version
    const master = path.join(OUT, `master_p${part}.mp4`);
    ff("-framerate", String(FPS), "-i", path.join(frames, "%04d.png"), ...X264, master);
    ff("-framerate", String(FPS), "-i", path.join(frames, "%04d.png"), "-vf", "scale=1280:1080:flags=lanczos", ...X264,
      path.join(OUT, `notesight_part${part}.mp4`));
    fs.rmSync(frames, { recursive: true, force: true });
    console.log("part", part, "done");
  }
  await browser.close();

  if (!preview && parts.length === 2) {
    // Parts are a match cut (part 1 ends on the dot part 2 starts from), so a straight join is seamless.
    const join = (a, b, out) => {
      const list = path.join(OUT, "concat.txt");
      fs.writeFileSync(list, `file '${a}'\nfile '${b}'\n`);
      ff("-f", "concat", "-safe", "0", "-i", list, "-c", "copy", "-movflags", "+faststart", path.join(OUT, out));
      fs.rmSync(list);
    };
    join("notesight_part1.mp4", "notesight_part2.mp4", "notesight_full.mp4");
    join("master_p1.mp4", "master_p2.mp4", "notesight_full_2x.mp4");
    fs.rmSync(path.join(OUT, "master_p1.mp4")); fs.rmSync(path.join(OUT, "master_p2.mp4"));
    console.log("merged");
  }
})();
