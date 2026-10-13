# Sticker (white outline) from a ready-made transparent cut-out. Usage: python3 sticker_from_cutout.py in.png out.png
import sys, numpy as np, cv2
from PIL import Image

src, dst = sys.argv[1], sys.argv[2]
im = np.array(Image.open(src).convert('RGBA')).astype(np.float32) / 255
rgb, alpha = im[..., :3], im[..., 3]

# drop loose specks and the neon fringe left around the hair by the cut-out tool
r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
neon = (g > 0.75) & (r > 0.6) & (b < 0.45) & (r - b > 0.4)
alpha = np.where(neon, 0, alpha)
solid = (alpha > 0.5).astype(np.uint8)
n, lab, stats, _ = cv2.connectedComponentsWithStats(solid, 8)
keep = np.zeros_like(solid)
for i in range(1, n):
    if stats[i, cv2.CC_STAT_AREA] > 400: keep[lab == i] = 1
alpha = alpha * cv2.dilate(keep, np.ones((7, 7), np.uint8))

# smooth offset outline; open at the bottom, where the figure is cut by the frame
PAD, OFF = 46, 20
H, W = alpha.shape
big = np.zeros((H + PAD, W + 2 * PAD), np.float32); big[PAD:, PAD:PAD + W] = keep
shape = np.maximum((cv2.GaussianBlur(big, (0, 0), 6) > 0.5), big > 0.5).astype(np.uint8)
ring = cv2.dilate(shape, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * OFF + 1, 2 * OFF + 1)))
ring = (cv2.GaussianBlur(ring.astype(np.float32), (0, 0), 8) > 0.5).astype(np.float32)
ring = cv2.GaussianBlur(ring, (0, 0), 1.2)

out = np.ones((H + PAD, W + 2 * PAD, 4), np.float32); out[..., 3] = ring
a = np.zeros_like(ring); a[PAD:, PAD:PAD + W] = alpha
fg = np.zeros_like(out[..., :3]); fg[PAD:, PAD:PAD + W] = rgb
out[..., :3] = fg * a[..., None] + (1 - a[..., None])
out[..., 3] = np.maximum(ring, a)
ys, xs = np.where(out[..., 3] > 0.01)
out = out[ys.min():, xs.min():xs.max() + 1]
Image.fromarray((out * 255).astype(np.uint8)).save(dst)
print(out.shape, 'neon px removed', int(neon.sum()))
