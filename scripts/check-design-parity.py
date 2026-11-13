#!/usr/bin/env python3
"""Source-level check for duplicate live brand tokens.

Non-brand radius differences are reported, not automatically rewritten.
"""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
HOME = (ROOT / "index.html").read_text(encoding="utf-8")
TOKENS = (ROOT / "css" / "tokens.css").read_text(encoding="utf-8")
REQUIRED = {
    "--brand-ivory": "#f7f2f0",
    "--brand-ink": "#0e0e10",
    "--brand-olive": "#1e2509",
    "--brand-taupe": "#cfc5b8",
    "--band-bg": "#d1e0d1",
    "--footer-bg": "#a9bfa0",
}


def root_tokens(text: str) -> dict[str, str]:
    text = re.sub(r"/\*[\s\S]*?\*/", "", text)
    match = re.search(r":root\s*\{([^}]*)\}", text)
    if not match:
        raise ValueError("Missing :root declaration")
    return {
        key: " ".join(value.split()).lower()
        for key, value in re.findall(r"(--[\w-]+)\s*:\s*([^;]+);", match.group(1))
    }


def main() -> int:
    a, b = root_tokens(HOME), root_tokens(TOKENS)
    failures = []
    for key, value in REQUIRED.items():
        if a.get(key) != value or b.get(key) != value:
            failures.append(f"{key}: home={a.get(key)!r}, inner={b.get(key)!r}; expected={value}")
    common = sorted(a.keys() & b.keys())
    drift = [(k, a[k], b[k]) for k in common if a[k] != b[k]]
    for key, home, inner in drift:
        print(f"REVIEW {key}: home={home} | inner={inner}")
    print(f"Shared tokens: {len(common)}; recorded differences: {len(drift)}")
    if failures:
        print("\n".join(f"ERROR {issue}" for issue in failures), file=sys.stderr)
        return 1
    print("PASS: Current brand palette is consistent across home and interior tokens")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
