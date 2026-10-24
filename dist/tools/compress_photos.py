"""
Shrinks every photo in assets/photos/ for the website.
Usage (needs Python 3 and Pillow:  pip install pillow):
    python tools/compress_photos.py
Each JPG/PNG/WEBP is resized to at most 1600 px wide and saved as a JPEG
of about 150 to 300 KB. Originals are kept in assets/photos/originals/.
"""
import os, shutil
from PIL import Image, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
PHOTOS = os.path.join(HERE, "..", "assets", "photos")
ORIG = os.path.join(PHOTOS, "originals")
os.makedirs(ORIG, exist_ok=True)

for name in sorted(os.listdir(PHOTOS)):
    path = os.path.join(PHOTOS, name)
    base, ext = os.path.splitext(name)
    if not os.path.isfile(path) or ext.lower() not in (".jpg", ".jpeg", ".png", ".webp"):
        continue
    before = os.path.getsize(path)
    keep = os.path.join(ORIG, name)
    if not os.path.exists(keep):
        shutil.copy2(path, keep)
    img = ImageOps.exif_transpose(Image.open(keep)).convert("RGB")
    img.thumbnail((1600, 1600))
    out = os.path.join(PHOTOS, base + ".jpg")
    img.save(out, "JPEG", quality=80, optimize=True, progressive=True)
    if out != path:
        os.remove(path)
    print(f"{name}: {before // 1024} KB -> {os.path.getsize(out) // 1024} KB  ({base}.jpg)")
