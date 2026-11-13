#!/usr/bin/env python3
"""Check Soapbox Caddie design files; no production runtime changes."""
from pathlib import Path
import json,sys
from xml.etree import ElementTree as ET
ROOT=Path(__file__).resolve().parents[2]
D=ROOT/"design"
P=json.loads((D/"src/page-blueprints.json").read_text())["pages"]
ids=("index","how-it-works","plans","services","service-area","about","faq","estimate","schedule","confirmation","status","account","login","privacy","terms")
missing=[]
for page in ids:
    if page not in [x["id"] for x in P]: missing.append(page+" blueprint")
    for f in (ROOT/f"{page}.html",D/"screens"/f"{page}.md"):
        if not f.is_file(): missing.append(str(f))
    for mode in ("desktop","mobile"):
        svg=D/"wireframes"/f"{page}-{mode}.svg"
        png=D/"wireframes"/"exports"/f"{page}-{mode}.png"
        if not svg.is_file(): missing.append(str(svg))
        else: ET.parse(svg)
        if not png.is_file() or png.read_bytes()[:8]!=bytes((137,80,78,71,13,10,26,10)):
            missing.append(str(png))
icons=list((ROOT/"assets/icons").glob("*.svg"))
if len(icons)!=21: missing.append(f"21 icons required; found {len(icons)}")
for icon in icons: ET.parse(icon)
for folder,name in (("brand-board","soapbox-brand-board"),("ui-kit","component-gallery"),("icons","soapbox-utility-icon-sheet")):
    for ext in ("svg","png"):
        f=D/"evidence"/folder/f"{name}.{ext}"
        if not f.is_file():missing.append(str(f))
if not (D/"gallery"/"index.html").is_file():missing.append("HTML UI gallery")
print("Asset coverage:",len(P),"pages /",len(icons),"icons")
if missing:
    print("MISSING:\n" + "\n".join(missing),file=sys.stderr)
    raise SystemExit(1)
print("PASS: design assets complete")
