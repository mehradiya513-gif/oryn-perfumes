"""One-off fix: tight-crop the recolored brand plate to the actual emblem.

The first pass detected edge specks, so the crop kept nearly the whole image.
Here we locate the emblem by density (1st-99th percentile of emblem pixels)
so stray specks and edge noise can't stretch the box.
"""
from PIL import Image

SRC = "public/images/oryn-brand-plate.png"
OUT = "public/images/oryn-brand-plate.png"

img = Image.open(SRC).convert("RGB")
w, h = img.size
px = img.load()

GOLD = (169, 133, 69)
IVORY_LUM = int(0.299 * 244 + 0.587 * 239 + 0.114 * 230)  # ~238

xs = []
ys = []
for y in range(0, h, 1):
    for x in range(0, w, 1):
        r, g, b = px[x, y]
        # strong gold: near the target gold hue
        is_gold = abs(r - GOLD[0]) < 60 and abs(g - GOLD[1]) < 60 and abs(b - GOLD[2]) < 75 and (r - b) > 45
        # deep stroke: clearly darker than the ivory paper (thin dark text/shadows)
        lum = int(0.299 * r + 0.587 * g + 0.114 * b)
        is_stroke = lum < IVORY_LUM - 45
        if is_gold or is_stroke:
            xs.append(x)
            ys.append(y)

if not xs:
    raise SystemExit("No emblem pixels found")

def percentile(data, p):
    s = sorted(data)
    k = int(len(s) * p / 100)
    k = min(max(k, 0), len(s) - 1)
    return s[k]

x0, x1 = percentile(xs, 0.5), percentile(xs, 99.5)
y0, y1 = percentile(ys, 0.5), percentile(ys, 99.5)
print("density bbox:", (x0, y0, x1, y1), "of", (w, h))

# breathing margin ~6%
mx = int((x1 - x0) * 0.06)
my = int((y1 - y0) * 0.06)
box = (max(0, x0 - mx), max(0, y0 - my), min(w, x1 + mx), min(h, y1 + my))
crop = img.crop(box)
print("cropped:", crop.size)

crop.save(OUT, optimize=True)
print("saved:", OUT)
