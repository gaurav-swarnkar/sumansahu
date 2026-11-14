"""Split the old calendar export into an empty grid plus separate entry cards."""
import os
from PIL import Image

A = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets")
cal = Image.open(os.path.join(A, "old_calendar.png")).convert("RGBA")
rgb = cal.convert("RGB")

# (left bar x, top, bottom) found from the blue/dark left borders, 2x scale
bars = [(200, 268, 407), (534, 604, 743), (870, 601, 746), (1199, 350, 493)]
clean = cal.copy()
for i, (x0, y0, y1) in enumerate(bars, 1):
    mid = (y0 + y1) // 2
    x1 = x0 + 10
    while x1 < cal.width - 1 and rgb.getpixel((x1, mid)) != (255, 255, 255):
        x1 += 1
    box = (x0 - 7, y0 - 7, x1 + 5, y1 + 8)
    cal.crop(box).save(os.path.join(A, f"entry_{i}.png"))
    # Patch with an empty strip from the Saturday column (same rows keep grid lines).
    w = box[2] - box[0]
    patch = cal.crop((1880, box[1], 1880 + w, box[3]))
    clean.paste(patch, box[:2])
    print(f"entry_{i}", box)
clean.save(os.path.join(A, "calendar_clean.png"))

# Relevant pieces of the old multi-step form (2x px crops of the question cards)
for name, src, box in [("piece_test", "q1.png", (300, 180, 960, 500)),
                       ("piece_date", "q2.png", (462, 280, 790, 590)),
                       ("piece_before", "q3.png", (290, 150, 960, 465))]:
    Image.open(os.path.join(A, src)).crop(box).save(os.path.join(A, name + ".png"))

# Rescheduling banner: pieces cropped from the designed Recovery panels (3x exports)
def T(v, k): return tuple(round(a * k) for a in v)
panel = Image.open(os.path.join(A, "resched_panel.png"))
cal = Image.open(os.path.join(A, "resched_cal_after.png"))
kp, kc = 1380 / 500, 2760 / 900          # thumbnail coords -> 3x px
for name, img, k, box in [
    ("rs_head", panel, kp, (60, 15, 480, 80)),
    ("rs_msg", panel, kp, (60, 85, 445, 150)),
    ("rs_slots", panel, kp, (63, 245, 480, 582)),
    ("rs_btn", panel, kp, (63, 662, 480, 718)),
    ("rs_cal_head", cal, kc, (70, 0, 662, 84)),
    ("rs_cal_rows", cal, kc, (70, 182, 662, 492)),
    ("rs_toast", cal, kc, (349, 644, 611, 691)),
]:
    img.crop(T(box, k)).save(os.path.join(A, name + ".png"))
