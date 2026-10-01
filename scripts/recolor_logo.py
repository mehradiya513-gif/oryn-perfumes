"""One-off: crop empty margins from the ORYN logo and recolor it to the site palette.

- Paper (cream background) is remapped to the site ivory  #f4efe6
- Emblem strokes are remapped to the site gold            #a98545
- Output is a tight crop (no baked-in margins) saved as PNG.
"""
from PIL import Image, ImageFilter
import statistics

SRC = "public/images/IMG-20260802-WA0019.jpg"
OUT = "public/images/oryn-brand-plate.png"

IVORY = (244, 239, 230)   # --ivory
GOLD = (169, 133, 69)     # --gold

img = Image.open(SRC).convert("RGB")
w, h = img.size

# ---- 1. Paper color: median of the border pixels (robust to corner artifacts)
edge_px = []
edge_px += list(img.crop((0, 0, w, 2)).getdata())          # top
edge_px += list(img.crop((0, h - 2, w, h)).getdata())      # bottom
edge_px += list(img.crop((0, 0, 2, h)).getdata())          # left
edge_px += list(img.crop((w - 2, 0, w, h)).getdata())      # right
paper = tuple(int(statistics.median(c[i] for c in edge_px)) for i in range(3))
print("paper color:", paper)

# ---- 2. Luminance + darkness mask to find the emblem bounding box
L = img.convert("L")
paper_lum = int(0.299 * paper[0] + 0.587 * paper[1] + 0.114 * paper[2])
# pixels meaningfully darker than the paper = emblem
mask = L.point(lambda v: 255 if paper_lum - v > 18 else 0)
mask = mask.filter(ImageFilter.MinFilter(3))  # kill single-pixel specks
bbox = mask.getbbox()
if bbox is None:
    raise SystemExit("No emblem found — threshold may be off.")
print("emblem bbox:", bbox)

# ---- 3. Tight crop with a small breathing margin (3%)
pad_x = int((bbox[2] - bbox[0]) * 0.03)
pad_y = int((bbox[3] - bbox[1]) * 0.03)
left = max(0, bbox[0] - pad_x)
top = max(0, bbox[1] - pad_y)
right = min(w, bbox[2] + pad_x)
bottom = min(h, bbox[3] + pad_y)
img = img.crop((left, top, right, bottom))
L = L.crop((left, top, right, bottom))
w, h = img.size
print("cropped to:", (w, h))

# ---- 4. Duotone recolor: ivory paper -> gold emblem, continuous tone
# t = how far from paper toward full gold (0..1), from luminance distance
t = L.point(lambda v: max(0, min(255, int(255 * (paper_lum - v) / paper_lum))))
# slight gamma to give the emblem a bit more presence
t = t.point(lambda v: int(255 * (v / 255) ** 0.85))

ivory_img = Image.new("RGB", (w, h), IVORY)
gold_img = Image.new("RGB", (w, h), GOLD)
duotone = Image.composite(gold_img, ivory_img, t)

# ---- 5. Reasonable web size + save
max_side = 900
if max(w, h) > max_side:
    scale = max_side / max(w, h)
    duotone = duotone.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
duotone.save(OUT, optimize=True)
print("saved:", OUT, duotone.size)
