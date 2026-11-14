"""Render an animated name intro with a transparent background.

Usage: python3 animations/render_name_intro.py
Outputs (in animations/out/):
  name-intro.webm        VP9 with alpha  (browsers, Premiere, CapCut, OBS)
  name-intro.mov         ProRes 4444 with alpha (Final Cut, After Effects, DaVinci)
  name-intro-green.mp4   H.264 on green screen (MP4 cannot store transparency)
"""
import math, os, shutil, subprocess
from PIL import Image, ImageDraw, ImageFont

NAME = "Suman Sahu"
ROLE = "PRODUCT DESIGNER"
W, H, FPS, DURATION = 1920, 1080, 30, 5.0
WHITE = (255, 255, 255)
BLUE = (45, 138, 246)  # brand #2d8af6
FONT_NAME = ImageFont.truetype("/usr/share/fonts/opentype/inter/InterDisplay-Bold.otf", 180)
FONT_ROLE = ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-SemiBold.otf", 44)

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")
FRAMES = os.path.join(OUT, "frames")


def clamp(x):
    return max(0.0, min(1.0, x))


def ease_out_cubic(x):
    return 1 - (1 - clamp(x)) ** 3


def ease_in_cubic(x):
    return clamp(x) ** 3


def ease_out_back(x, s=1.4):
    x = clamp(x) - 1
    return x * x * ((s + 1) * x + s) + 1


def progress(t, start, dur):
    return clamp((t - start) / dur)


def draw_text_alpha(base, xy, text, font, color, alpha, spacing=0):
    if alpha <= 0:
        return
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    x, y = xy
    if spacing:
        for ch in text:
            d.text((x, y), ch, font=font, fill=color + (255,))
            x += font.getlength(ch) + spacing
    else:
        d.text((x, y), text, font=font, fill=color + (255,))
    if alpha < 1:
        a = layer.getchannel("A").point(lambda v: int(v * alpha))
        layer.putalpha(a)
    base.alpha_composite(layer)


def render_frame(t):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # Exit: everything drifts up and fades out over the last second.
    exit_p = ease_in_cubic(progress(t, DURATION - 1.0, 0.9))
    exit_dy = -40 * exit_p
    exit_a = 1 - exit_p

    name_w = FONT_NAME.getlength(NAME)
    asc, desc = FONT_NAME.getmetrics()
    name_x = (W - name_w) / 2
    name_y = H / 2 - asc + 10

    # Letters rise in one by one.
    for i, ch in enumerate(NAME):
        if ch == " ":
            continue
        p = progress(t, 0.15 + i * 0.06, 0.7)
        if p <= 0:
            continue
        dy = (1 - ease_out_back(p)) * 90
        x = name_x + FONT_NAME.getlength(NAME[:i])
        draw_text_alpha(img, (x, name_y + dy + exit_dy), ch, FONT_NAME, WHITE,
                        ease_out_cubic(p) * exit_a)

    # Brand-blue dot after the name pops in.
    dot_p = progress(t, 0.15 + len(NAME) * 0.06 + 0.1, 0.5)
    if dot_p > 0 and exit_a > 0:
        r = 16 * ease_out_back(dot_p, 2.2)
        cx = name_x + name_w + 34
        cy = name_y + asc - 18 + exit_dy
        a = int(255 * clamp(dot_p * 3) * exit_a)
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=BLUE + (a,))

    # Underline grows out from the center.
    line_p = ease_out_cubic(progress(t, 1.0, 0.8))
    if line_p > 0 and exit_a > 0:
        half = 180 * line_p
        ly = name_y + asc + desc + 24 + exit_dy
        d.rounded_rectangle([W / 2 - half, ly, W / 2 + half, ly + 8], radius=4,
                            fill=BLUE + (int(255 * exit_a),))

    # Role fades in with letter-spacing tightening.
    role_p = ease_out_cubic(progress(t, 1.5, 0.9))
    if role_p > 0:
        spacing = 14 + 20 * (1 - role_p)
        role_w = sum(FONT_ROLE.getlength(c) for c in ROLE) + spacing * (len(ROLE) - 1)
        ry = name_y + asc + desc + 70 + 20 * (1 - role_p) + exit_dy
        draw_text_alpha(img, ((W - role_w) / 2, ry), ROLE, FONT_ROLE, WHITE,
                        role_p * 0.85 * exit_a, spacing=spacing)
    return img


def main():
    shutil.rmtree(FRAMES, ignore_errors=True)
    os.makedirs(FRAMES)
    n = int(FPS * DURATION)
    for f in range(n):
        render_frame(f / FPS).save(os.path.join(FRAMES, f"{f:04d}.png"))
    src = ["-y", "-hide_banner", "-loglevel", "error", "-framerate", str(FPS),
           "-i", os.path.join(FRAMES, "%04d.png")]
    subprocess.run(["ffmpeg", *src, "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p",
                    "-b:v", "0", "-crf", "24", "-auto-alt-ref", "0",
                    os.path.join(OUT, "name-intro.webm")], check=True)
    subprocess.run(["ffmpeg", *src, "-c:v", "prores_ks", "-profile:v", "4444",
                    "-pix_fmt", "yuva444p10le", "-vendor", "apl0",
                    os.path.join(OUT, "name-intro.mov")], check=True)
    subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
                    "-f", "lavfi", "-i", f"color=c=0x00FF00:s={W}x{H}:r={FPS}:d={DURATION}",
                    "-framerate", str(FPS), "-i", os.path.join(FRAMES, "%04d.png"),
                    "-filter_complex", "[0][1]overlay=format=auto,format=yuv420p",
                    "-c:v", "libx264", "-crf", "18", "-movflags", "+faststart",
                    os.path.join(OUT, "name-intro-green.mp4")], check=True)
    shutil.rmtree(FRAMES)
    print("done:", os.listdir(OUT))


if __name__ == "__main__":
    main()
