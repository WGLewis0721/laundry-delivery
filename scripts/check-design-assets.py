#!/usr/bin/env python3
"""Validate the delivered client design reference inventory and local SVG media."""
from pathlib import Path
from xml.etree import ElementTree as ET
import struct
import sys

ROOT = Path(__file__).resolve().parent.parent
DESIGN = ROOT / "design"
PAGES = (
    "home", "how-it-works", "plans", "services", "service-area", "about",
    "faq", "estimate", "schedule", "confirmation", "status", "account",
    "login", "privacy", "terms",
)
errors = []


def require(path: Path) -> None:
    if not path.is_file():
        errors.append(f"Missing: {path.relative_to(ROOT)}")


def inspect_svg(path: Path) -> tuple[int, int] | None:
    if not path.is_file():
        return None
    try:
        root = ET.parse(path).getroot()
        if root.tag != "{http://www.w3.org/2000/svg}svg":
            errors.append(f"Invalid SVG root: {path.relative_to(ROOT)}")
        for item in root.iter():
            if item.tag == "{http://www.w3.org/2000/svg}image":
                href = item.attrib.get("href")
                if href and not href.startswith(("data:", "https:")) and not (path.parent / href).resolve().is_file():
                    errors.append(f"SVG image missing: {path.relative_to(ROOT)} -> {href}")
        width = int(root.attrib.get("width", "0"))
        height = int(root.attrib.get("height", "0"))
        return width, height
    except (ET.ParseError, ValueError) as exc:
        errors.append(f"SVG invalid: {path.relative_to(ROOT)} ({exc})")
        return None


def inspect_png(path: Path, expected: tuple[int, int] | None) -> None:
    if not path.is_file():
        return
    with path.open("rb") as stream:
        header = stream.read(24)
    if len(header) < 24 or header[:8] != b"\x89PNG\r\n\x1a\n":
        errors.append(f"Invalid PNG signature: {path.relative_to(ROOT)}")
    elif expected and struct.unpack(">II", header[16:24]) != expected:
        errors.append(f"PNG dimensions don't match SVG: {path.relative_to(ROOT)}")


def main() -> int:
    for page in PAGES:
        require(DESIGN / "screens" / f"{page}.md")
        for v in ("desktop", "mobile"):
            src = DESIGN / "wireframes" / f"{page}-{v}.svg"
            dest = DESIGN / "wireframes" / "exports" / f"{page}-{v}.png"
            require(src)
            require(dest)
            dims = inspect_svg(src)
            inspect_png(dest, dims)
    for typ, basename in (("brand-board", "brand-board"), ("ui-kit", "component-sheet"), ("icons", "icon-sheet")):
        src = DESIGN / "evidence" / typ / f"{basename}.svg"
        dest = DESIGN / "evidence" / typ / f"{basename}.png"
        require(src)
        require(dest)
        inspect_png(dest, inspect_svg(src))
    for html in ("brand/brand-board.html", "ui-kit/gallery.html", "icons/index.html"):
        require(DESIGN / html)
    for failure in errors:
        print("ERROR", failure, file=sys.stderr)
    print(f"Design inventory: {len(PAGES)} pages, {len(PAGES)*2} SVG/PNG wireframe pairs, 3 proof sheets; {len(errors)} errors")
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
