"""One-off: extract the emblem from the ivory plate as a transparent PNG.

- Alpha: smoothstep between t=0.08 (paper/soft shadows -> gone) and t=0.22
  (emblem body -> fully opaque), where t = tone distance from the paper.
- Color: pulled 55% toward the site gold so the emblem reads on the dark hero
  while keeping its internal shading.
"""
from PIL import Image

SRC = "public/images/oryn-brand-plate.png"
OUT = "public/images/oryn-emblem.png"

GOLD = (169, 133, 69)          # --gold
PAPER_LUM = 238.0              # luminance of #f4efe6

def smoothstep(e0, e1, x):
    u = max(0.0, min(1.0, (x - e0) / (e1 - e0)))
    return u * u * (3 - 2 * u)

img = Image.open(SRC).convert("RGB")
w, h = img.size
src = img.load()

out = Image.new("RGBA", (w, h))
dst = out.load()

for y in range(h):
    for x in range(w):
        r, g, b = src[x, y]
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        t = (PAPER_LUM - lum) / PAPER_LUM
        a = smoothstep(0.08, 0.22, t)
        if a <= 0.0:
            dst[x, y] = (0, 0, 0, 0)
            continue
        # pull the muted tone toward the site gold, keep shading
        nr = int(r + (GOLD[0] - r) * 0.55)
        ng = int(g + (GOLD[1] - g) * 0.55)
        nb = int(b + (GOLD[2] - b) * 0.55)
        dst[x, y] = (nr, ng, nb, int(a * 255))

out.save(OUT, optimize=True)
print("saved:", OUT, out.size)

# sanity: opaque pixel share + average opaque color
opaque = [(dst[x, y], x, y) for y in range(0, h) for x in range(0, w) if dst[x, y][3] > 200]
print("fully opaque pixels:", len(opaque), f"({100 * len(opaque) / (w * h):.2f}%)")
if opaque:
    avg = tuple(int(sum(p[0][i] for p in opaque) / len(opaque)) for i in range(4))
    xs = [p[1] for p in opaque]; ys = [p[2] for p in opaque]
    print("avg opaque color:", avg[:3], "bbox:", (min(xs), min(ys), max(xs), max(ys)))
