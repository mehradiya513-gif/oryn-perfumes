"""One-off: extract the emblem from the ivory plate as a transparent PNG.

v2 — deeper, richer treatment so the mark reads against the warm backdrop:
- Alpha: smoothstep between t=0.055 (paper/soft shadows -> gone) and t=0.14
  (emblem body -> fully opaque), then gamma 0.8 to lift thin antialiased strokes.
  t = tone distance from the paper, where paper luminance is ~238.
- Color: emblem shading is mapped onto a light-gold -> deep-bronze ramp so the
  mark keeps depth but sits darker and more saturated than before.
"""
from PIL import Image

SRC = "public/images/oryn-brand-plate.png"
OUT = "public/images/oryn-emblem.png"

LIGHT_GOLD = (198, 158, 92)    # highlights
DEEP_BRONZE = (118, 86, 38)    # deepest strokes
PAPER_LUM = 238.0
T_MAX = 0.34                   # highest tone-distance found in the plate


def smoothstep(e0, e1, x):
    u = max(0.0, min(1.0, (x - e0) / (e1 - e0)))
    return u * u * (3 - 2 * u)


def lerp(a, b, k):
    return int(round(a + (b - a) * k))


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
        a = smoothstep(0.055, 0.14, t) ** 0.8
        if a <= 0.0:
            dst[x, y] = (0, 0, 0, 0)
            continue
        k = min(1.0, max(0.0, t / T_MAX)) ** 0.9
        nr = lerp(LIGHT_GOLD[0], DEEP_BRONZE[0], k)
        ng = lerp(LIGHT_GOLD[1], DEEP_BRONZE[1], k)
        nb = lerp(LIGHT_GOLD[2], DEEP_BRONZE[2], k)
        dst[x, y] = (nr, ng, nb, int(a * 255))

# soft feather at the canvas edges so nothing hard-cuts
F = 16
for y in range(h):
    for x in range(w):
        r, g, b, a = dst[x, y]
        if a == 0:
            continue
        d = min(x, y, w - 1 - x, h - 1 - y)
        if d < F:
            dst[x, y] = (r, g, b, int(a * smoothstep(0, F, d)))

out.save(OUT, optimize=True)
print("saved:", OUT, out.size)

opaque = [dst[x, y] for y in range(h) for x in range(w) if dst[x, y][3] > 200]
print("fully opaque pixels:", len(opaque), f"({100 * len(opaque) / (w * h):.2f}%)")
if opaque:
    avg = tuple(int(sum(p[i] for p in opaque) / len(opaque)) for i in range(3))
    print("avg opaque color:", avg)
