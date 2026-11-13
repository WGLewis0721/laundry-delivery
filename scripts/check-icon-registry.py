#!/usr/bin/env python3
"""Validate the 24px client utility icon reference registry."""
from pathlib import Path
from xml.etree import ElementTree as ET
import sys

ROOT = Path(__file__).resolve().parent.parent
ICON_DIR = ROOT / "design" / "brand" / "assets" / "icons"
EXPECTED = {
    "bag", "calendar", "truck", "sparkles", "shield-check", "clock",
    "map-pin", "gift", "check", "chevron-right", "arrow-right",
    "menu", "user", "message-circle",
}


def main() -> int:
    available = {p.stem for p in ICON_DIR.glob("*.svg")}
    faults = []
    for name in sorted(EXPECTED - available):
        faults.append(f"Missing {name}.svg")
    for name in sorted(available - EXPECTED):
        faults.append(f"Unexpected {name}.svg; document before including")
    for file in sorted(ICON_DIR.glob("*.svg")):
        try:
            root = ET.parse(file).getroot()
            if root.tag != "{http://www.w3.org/2000/svg}svg":
                faults.append(f"{file.name}: invalid root")
            if root.get("viewBox") != "0 0 24 24":
                faults.append(f"{file.name}: expected viewBox 0 0 24 24")
            if root.get("stroke") != "currentColor":
                faults.append(f"{file.name}: expected currentColor stroke")
            if not len(root):
                faults.append(f"{file.name}: no drawing paths")
        except ET.ParseError as exc:
            faults.append(f"{file.name}: {exc}")
    for msg in faults:
        print(f"ERROR {msg}", file=sys.stderr)
    print(f"Verified {len(available)} SVG icon files")
    return 1 if faults else 0


if __name__ == "__main__":
    raise SystemExit(main())
