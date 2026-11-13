#!/usr/bin/env python3
"""Export review PNGs from committed SVG brand sheets and page wireframes.

Install with: python3 -m pip install "CairoSVG>=2.7,<3"
Run with:     python3 scripts/render-design-assets.py
This script never changes website source files.
"""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent.parent
DESIGN = ROOT / "design"
MAPPINGS = [
    (DESIGN / "wireframes", DESIGN / "wireframes" / "exports"),
    (DESIGN / "evidence" / "brand-board", DESIGN / "evidence" / "brand-board"),
    (DESIGN / "evidence" / "ui-kit", DESIGN / "evidence" / "ui-kit"),
    (DESIGN / "evidence" / "icons", DESIGN / "evidence" / "icons"),
]


def main() -> int:
    try:
        import cairosvg
    except ImportError:
        print('CairoSVG missing. Install: python3 -m pip install "CairoSVG>=2.7,<3"', file=sys.stderr)
        return 2

    count = 0
    for source_dir, target_dir in MAPPINGS:
        target_dir.mkdir(parents=True, exist_ok=True)
        for source in sorted(source_dir.glob("*.svg")):
            target = target_dir / f"{source.stem}.png"
            cairosvg.svg2png(url=source.as_uri(), write_to=str(target))
            count += 1
            print(f"Rendered {target.relative_to(ROOT)}")
    expected = 33
    if count != expected:
        print(f"Expected {expected} SVGs, found {count}", file=sys.stderr)
        return 1
    print(f"{count} design preview PNG files rendered")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
