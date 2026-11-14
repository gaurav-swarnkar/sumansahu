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
