#!/usr/bin/env python3
"""Render design SVGs to PNG. Not a browser screenshot renderer."""
from pathlib import Path
from xml.etree import ElementTree as ET
import argparse,struct
ROOT=Path(__file__).resolve().parents[2]
D=ROOT/"design"
P=("index","how-it-works","plans","services","service-area","about","faq","estimate","schedule","confirmation","status","account","login","privacy","terms")
jobs=[(D/"wireframes"/f"{p}-{v}.svg",D/"wireframes"/"exports"/f"{p}-{v}.png") for p in P for v in ("desktop","mobile")]
for part,name in (("brand-board","soapbox-brand-board"),("ui-kit","component-gallery"),("icons","soapbox-utility-icon-sheet")):
    folder=D/"evidence"/part
    jobs.append((folder/f"{name}.svg",folder/f"{name}.png"))
def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("--check",action="store_true")
    a=parser.parse_args()
    if not a.check: import cairosvg
    for src,dst in jobs:
        ET.parse(src)
        if not a.check:
            dst.parent.mkdir(parents=True,exist_ok=True)
            cairosvg.svg2png(url=str(src),write_to=str(dst))
        raw=dst.read_bytes()[:24]
        if len(raw)<24 or raw[:8]!=bytes((137,80,78,71,13,10,26,10)):
            raise SystemExit("Invalid/missing PNG: "+str(dst))
        w,h=struct.unpack(">II",raw[16:24])
        if w<320 or h<320: raise SystemExit(f"Unexpected size {w}x{h}: {dst}")
        print(f"{'Verified' if a.check else 'Rendered'} {dst.relative_to(ROOT)} {w}x{h}")
    print(f"PASS: {len(jobs)} design PNGs")
if __name__=="__main__": main()
