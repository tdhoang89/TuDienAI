#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build.py — sinh dữ liệu cho website Từ điển AI từ các file Markdown trong content/.

Cách chạy (từ thư mục gốc của website):
    python tools/build.py

Đầu ra:
    data/index.js      chỉ mục nhẹ: 573 mục, chương, cụm, lộ trình, số liệu (tải ngay khi mở trang)
    data/ch/NN.js      nội dung đầy đủ của từng chương (tải khi cần)
    data/extra.js      Phụ lục 90 (tên riêng), 91 (dòng thời gian), 93 (cặp dễ nhầm)
    data/fulltext.js   văn bản thuần của mọi mục, cho tìm kiếm toàn văn (tải khi cần)

Các file .js gán dữ liệu vào window.TD_DATA, nên website chạy được trên GitHub Pages
và cả khi mở thẳng index.html bằng trình duyệt (không cần máy chủ, không cần build).
Chỉ dùng thư viện chuẩn của Python 3.
"""
import csv
import html
import json
import os
import re
import sys
import unicodedata
from collections import OrderedDict
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def C(*a):
    return os.path.join(ROOT, "content", *a)


def D(*a):
    return os.path.join(ROOT, "data", *a)


CH_FILES = sorted(f for f in os.listdir(C()) if re.match(r"(0[1-9]|1[0-2])-.*\.md$", f))
FILE2CH = {f: int(f[:2]) for f in CH_FILES}

FIELD_RE = re.compile(r"^\*\*(Tên khác|Định nghĩa|Giải thích|Cách tính|Cách dùng|Ví dụ|Phân biệt|Không nên hiểu là|Giới hạn|Thay đổi gần đây|Liên quan|Nguồn)[.:]\*\*\s*")
WARN_RE = re.compile(r"^\*\*(CẢNH BÁO|THẬN TRỌNG|LƯU Ý):\*\*\s*")
META_RE = re.compile(r"^\*Mã: ([^ ]+) · Chương (\d+) · Mức (\d) · Trạng thái: ([^·]+?) · Xác minh: ([0-9/]+)\*$")
LINK_RE = re.compile(r"\[([^\]]+)\]\(([^)\s]+)\)")
URL_RE = re.compile(r"https?://[^\s<>\"\x00]+")
ANCHOR_RE = re.compile(r'^<a id="([^"]+)"></a>\s*$')
STATUS = {"ổn định": "on-dinh", "đang biến đổi": "dang-bien-doi", "lịch sử": "lich-su"}
PARTS = [
    {"t": "Phần nền", "d": "Khái niệm gốc, dữ liệu, kiến trúc và LLM.", "ch": [1, 2, 3, 4]},
    {"t": "Phần dùng AI", "d": "Prompt, agent và cách đánh giá chất lượng.", "ch": [5, 6, 7]},
    {"t": "Phần rủi ro và pháp lý", "d": "An toàn, bảo mật, dữ liệu cá nhân và luật.", "ch": [8, 9, 10]},
    {"t": "Phần doanh nghiệp và xã hội", "d": "Triển khai, kinh tế, việc làm và tương lai.", "ch": [11, 12]},
]

warnings = []


def read(name):
    # utf-8-sig: chịu được BOM khi file được lưu bằng Notepad/Excel; NFC: chuẩn hóa dấu tiếng Việt
    with open(C(name), encoding="utf-8-sig") as f:
        t = unicodedata.normalize("NFC", f.read())
    t = t.replace("\r\n", "\n")
    fm = {}
    if t.startswith("---\n"):
        end = t.index("\n---", 4)
        for ln in t[4:end].split("\n"):
            if ":" in ln:
                k, v = ln.split(":", 1)
                fm[k.strip()] = v.strip().strip('"')
        t = t[end + 4:]
    t = re.sub(r"<!--.*?-->", "", t, flags=re.S)
    return fm, t


# ---------------------------------------------------------------- inline Markdown → HTML

def resolve(href, cur):
    """Đổi liên kết .md của sách thành route của website. Trả về (url, kind, key)."""
    if href.startswith(("http://", "https://")):
        return href, "ext", None
    f, _, anchor = href.partition("#")
    if not f:
        f = cur
    if f in FILE2CH:
        if anchor:
            return "#/t/" + anchor, "t", anchor
        return "#/chu-de/%02d" % FILE2CH[f], "ch", None
    if f.startswith("90-"):
        return ("#/ten-rieng/" + anchor) if anchor else "#/ten-rieng", "n", anchor or None
    if f.startswith("91-"):
        return "#/dong-thoi-gian", "pg", None
    if f.startswith("92-"):
        return "#/viet-tat", "pg", None
    if f.startswith("93-"):
        return "#/de-nham", "pg", None
    if f.startswith(("98-", "99-")):
        return "#/a-z", "pg", None
    if f.startswith("00-"):
        return "#/cach-doc", "pg", None
    warnings.append("Liên kết lạ: %s (trong %s)" % (href, cur))
    return "#/", "pg", None


def fmt(s):
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<![\*\w])\*(?!\s)([^*\n]+?)(?<!\s)\*(?![\*\w])", r"<em>\1</em>", s)
    return s


def clean_url(u):
    while u and u[-1] in ".,;:)":
        if u[-1] == ")" and u.count("(") >= u.count(")"):
            break
        u = u[:-1]
    return u


def inline(s, cur, links=None):
    """Markdown một dòng → HTML. links (list) nhận các mã mục từ được liên kết."""
    s = html.escape(s, quote=False)
    ph = []

    def keep(x):
        ph.append(x)
        return "\x00%d\x00" % (len(ph) - 1)

    def link(m):
        text, href = m.group(1), html.unescape(m.group(2))
        url, kind, key = resolve(href, cur)
        if kind == "ext":
            return keep('<a href="%s" target="_blank" rel="noopener">%s</a>' % (html.escape(url), fmt(text)))
        attr = ""
        if kind == "t":
            attr = ' data-t="%s"' % key
            if links is not None:
                links.append(key)
        elif kind == "n" and key:
            attr = ' data-n="%s"' % key
        return keep('<a href="%s"%s>%s</a>' % (url, attr, fmt(text)))

    s = LINK_RE.sub(link, s)

    def auto(m):
        raw = m.group(0)
        u = clean_url(raw)
        tail = raw[len(u):]
        href = html.unescape(u)
        return keep('<a class="url" href="%s" target="_blank" rel="noopener">%s</a>' % (html.escape(href), u)) + tail

    s = URL_RE.sub(auto, s)
    s = fmt(s)
    s = re.sub(r"\x00(\d+)\x00", lambda m: ph[int(m.group(1))], s)
    return s


def plain(s):
    s = LINK_RE.sub(r"\1", s)
    s = re.sub(r"\*\*(.+?)\*\*", r"\1", s)
    s = re.sub(r"(?<![\*\w])\*(?!\s)([^*\n]+?)(?<!\s)\*(?![\*\w])", r"\1", s)
    s = re.sub(r"^\s*[-*]\s+", "", s, flags=re.M)
    s = re.sub(r"^>\s*", "", s, flags=re.M)
    return re.sub(r"\s+", " ", s).strip()


def sentences(s, n):
    parts = re.split(r"(?<=[.!?])\s+(?=[A-ZÀ-Ỹ0-9\"“(])", s)
    return " ".join(parts[:n]).strip()


# ---------------------------------------------------------------- block Markdown → HTML

LIST_UL = re.compile(r"^\s*[-*] ")
LIST_OL = re.compile(r"^\s*\d+\. ")


def blocks(lines, cur, links=None):
    out, i, n = [], 0, len(lines)
    while i < n:
        ln = lines[i]
        if not ln.strip():
            i += 1
            continue
        if LIST_UL.match(ln) or LIST_OL.match(ln):
            ordered = bool(LIST_OL.match(ln))
            rx = LIST_OL if ordered else LIST_UL
            items = []
            while i < n and rx.match(lines[i]):
                items.append(rx.sub("", lines[i], count=1))
                i += 1
                while i < n and lines[i].strip() and not (LIST_UL.match(lines[i]) or LIST_OL.match(lines[i])) and not lines[i].startswith((">", "|")):
                    items[-1] += " " + lines[i].strip()
                    i += 1
            tag = "ol" if ordered else "ul"
            out.append("<%s>%s</%s>" % (tag, "".join("<li>%s</li>" % inline(x, cur, links) for x in items), tag))
        elif ln.startswith("|"):
            rows = []
            while i < n and lines[i].startswith("|"):
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                if not all(re.match(r"^:?-{2,}:?$", c) for c in cells):
                    rows.append(cells)
                i += 1
            if rows:
                h = "".join("<th>%s</th>" % inline(c, cur, links) for c in rows[0])
                b = "".join("<tr>%s</tr>" % "".join("<td>%s</td>" % inline(c, cur, links) for c in r) for r in rows[1:])
                out.append('<div class="table-wrap"><table><thead><tr>%s</tr></thead><tbody>%s</tbody></table></div>' % (h, b))
        elif ln.startswith(">"):
            q = []
            while i < n and lines[i].startswith(">"):
                q.append(re.sub(r"^>\s?", "", lines[i]))
                i += 1
            txt = " ".join(x.strip() for x in q if x.strip())
            m = WARN_RE.match(txt)
            if m:
                kind = {"CẢNH BÁO": "danger", "THẬN TRỌNG": "caution", "LƯU Ý": "note"}[m.group(1)]
                out.append('<aside class="callout callout--%s"><span class="callout__label">%s</span><p>%s</p></aside>'
                           % (kind, m.group(1), inline(txt[m.end():], cur, links)))
            else:
                out.append("<blockquote><p>%s</p></blockquote>" % inline(txt, cur, links))
        else:
            para = []
            while i < n and lines[i].strip() and not (LIST_UL.match(lines[i]) or LIST_OL.match(lines[i])) and not lines[i].startswith((">", "|")):
                para.append(lines[i].strip())
                i += 1
            out.append("<p>%s</p>" % inline(" ".join(para), cur, links))
    return "".join(out)


def chunks(lines):
    """Tách các dòng thành khối, ngăn bởi dòng trống."""
    out, cur = [], []
    for ln in lines:
        if ln.strip():
            cur.append(ln)
        elif cur:
            out.append(cur)
            cur = []
    if cur:
        out.append(cur)
    return out


# ---------------------------------------------------------------- dữ liệu nền

def load_csv(name):
    with open(C(name), encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f))
    return [{k.strip(): unicodedata.normalize("NFC", v or "") for k, v in r.items() if k} for r in rows]


TERMS = load_csv("_terms.csv")
TMAP = {t["id"]: t for t in TERMS}
SOURCES = load_csv("_sources.csv")
VOCAB = load_csv("_vocab.csv")


def ids(s):
    return [x for x in re.split(r"[;\s]+", s or "") if x and x in TMAP]


# ---------------------------------------------------------------- chương

def parse_chapter(fname):
    fm, text = read(fname)
    n = FILE2CH[fname]
    lines = text.split("\n")
    intro, clusters, entries = [], [], OrderedDict()
    cl, ent, pending = None, None, None
    for ln in lines:
        if ln.startswith("# "):
            continue
        m = re.match(r"^## (\d+\.\d+)\s+(.+)$", ln)
        if m:
            cl = {"id": m.group(1), "t": m.group(2).strip(), "intro": [], "ids": []}
            clusters.append(cl)
            ent = None
            continue
        if ln.startswith("## "):
            cl = {"id": "%d.x" % n, "t": ln[3:].strip(), "intro": [], "ids": []}
            clusters.append(cl)
            ent = None
            continue
        a = ANCHOR_RE.match(ln)
        if a:
            pending = a.group(1)
            continue
        if ln.startswith("### "):
            head = ln[4:].strip()
            eid = pending or re.sub(r"\W+", "-", head.lower())
            pending = None
            ent = {"id": eid, "head": head, "lines": [], "cl": cl["id"] if cl else "%d.0" % n}
            entries[eid] = ent
            if cl is not None:
                cl["ids"].append(eid)
            continue
        if ent is not None:
            ent["lines"].append(ln)
        elif cl is not None:
            cl["intro"].append(ln)
        else:
            intro.append(ln)
    return fm, n, intro, clusters, entries


def build_entry(ent, fname):
    body = ent["lines"]
    meta = None
    for k, ln in enumerate(body):
        if ln.strip():
            meta = META_RE.match(ln.strip())
            if meta:
                body = body[k + 1:]
            break
    if not meta:
        warnings.append("Thiếu dòng Mã ở mục %s" % ent["id"])
    items, cur = [], None  # items: [label, [lines]]
    for ch in chunks(body):
        first = ch[0]
        m = FIELD_RE.match(first)
        if m:
            cur = [m.group(1), [first[m.end():]] + ch[1:]]
            items.append(cur)
        elif first.startswith(">"):
            items.append(["!", ch])
            cur = None
        elif cur is not None:
            cur[1].append("")
            cur[1].extend(ch)
        else:
            items.append(["", ch])
    out, fields_plain, links = [], {}, []
    for label, lines in items:
        if label == "Nguồn":
            txt = " ".join(x.strip() for x in lines if x.strip())
            parts = [p.strip() for p in re.split(r"(?:^|\s)\[(\d+)\]\s", txt) if p and p.strip()]
            refs = [parts[j + 1] for j in range(0, len(parts) - 1, 2) if parts[j].isdigit()] if parts and parts[0].isdigit() else [txt]
            out.append([label, "<ol class=\"refs\">%s</ol>" % "".join("<li>%s</li>" % inline(r, fname) for r in refs)])
            continue
        lk = [] if label == "Liên quan" else links
        h = blocks(lines, fname, lk)
        if label == "Liên quan":
            rel = [x for x in lk if x in TMAP]
            out.append([label, h])
            fields_plain["__rel"] = list(dict.fromkeys(rel))
            continue
        out.append([label, h])
        fields_plain[label] = fields_plain.get(label, "") + " " + plain("\n".join(lines))
    return meta, out, fields_plain


def split_head(head):
    if " — " in head:
        en, vi = head.split(" — ", 1)
    else:
        en, vi = head, ""
    return en.strip(), vi.strip()


def split_top(s):
    """Tách theo dấu phẩy, chấm phẩy nằm ngoài ngoặc đơn."""
    out, cur, depth = [], "", 0
    for ch in s:
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth = max(0, depth - 1)
        if ch in ",;" and depth == 0:
            out.append(cur)
            cur = ""
        else:
            cur += ch
    out.append(cur)
    return out


def alt_names(t, fields):
    names = []
    s = fields.get("Tên khác", "")
    if s:
        s = s.split("Dạng chuẩn trong sách")[0]
        s = re.split(r"\.\s", s, maxsplit=1)[0]  # chỉ lấy câu đầu; các câu sau là lời giải thích
        names = [x.strip(" .") for x in split_top(s) if x.strip(" .")]
    names += [x.strip() for x in (t.get("vi_alt") or "").split(";") if x.strip()]
    seen, out = set(), []
    for x in names:
        k = x.lower()
        if k not in seen and k not in (t["vi"].lower(), t["en"].lower(), (t["canon"] or "").lower()):
            seen.add(k)
            out.append(x)
    return out


def main():
    os.makedirs(D("ch"), exist_ok=True)
    index_terms, chapters, fulltext = [], [], {}
    order = []
    unknown = []
    words = 0
    callouts = {"danger": 0, "caution": 0, "note": 0}

    for fname in CH_FILES:
        fm, n, intro, clusters, entries = parse_chapter(fname)
        ch_entries = {}
        tiers = [0, 0, 0]
        for eid, ent in entries.items():
            t = TMAP.get(eid)
            if not t:
                warnings.append("Mục %s có trong %s nhưng không có trong _terms.csv (bị bỏ qua)" % (eid, fname))
                unknown.append(eid)
                for c in clusters:
                    if eid in c["ids"]:
                        c["ids"].remove(eid)
                continue
            meta, fields, fp = build_entry(ent, fname)
            en_h, vi_h = split_head(ent["head"])
            tier = int(meta.group(3)) if meta else int(t["tier"] or 3)
            status = STATUS.get(meta.group(4).strip(), "on-dinh") if meta else t["status"]
            verified = meta.group(5) if meta else ""
            tiers[tier - 1] += 1
            ch_entries[eid] = {"b": fields}
            for lab, h in fields:
                for k in callouts:
                    callouts[k] += h.count("callout--" + k)
            definition = fp.get("Định nghĩa", "").strip()
            dont = fp.get("Không nên hiểu là", "").strip()
            body_txt = " ".join(v for k, v in fp.items() if not k.startswith("__"))
            words += len(re.findall(r"\w+", body_txt))
            fulltext[eid] = re.sub(r"\s+", " ", body_txt).strip()
            rel = fp.get("__rel", [])
            index_terms.append({
                "id": eid,
                "en": t["en"],
                "vi": t["vi"],
                "ab": t["abbr"],
                "cn": t["canon"],
                "h": en_h,
                "hv": vi_h,
                "alt": alt_names(t, fp),
                "c": n,
                "k": ent["cl"],
                "m": tier,
                "s": status,
                "v": verified,
                "d": definition,
                "x": ids(t["confused_with"]),
                "p": ids(t["prereq"]),
                "r": [r for r in rel if r != eid],
                "nm": sentences(dont, 2) if dont else "",
            })
            order.append(eid)
        intro_html = blocks(intro, fname)
        cls = []
        for c in clusters:
            cls.append({"id": c["id"], "t": c["t"], "ids": c["ids"]})
        chapters.append({
            "n": n,
            "f": fname,
            "t": fm.get("title", ""),
            "lead": plain(" ".join(x for x in intro if x.strip() and not x.startswith("-"))).split(". ")[0].rstrip(".") + ".",
            "cl": cls,
            "count": sum(len(c["ids"]) for c in clusters),
            "tiers": tiers,
        })
        payload = {
            "n": n,
            "intro": intro_html,
            "cli": {c["id"]: blocks(c["intro"], fname) for c in clusters if any(x.strip() for x in c["intro"])},
            "e": ch_entries,
        }
        with open(D("ch", "%02d.js" % n), "w", encoding="utf-8") as f:
            f.write("(window.TD_DATA=window.TD_DATA||{})[\"ch%02d\"]=" % n)
            json.dump(payload, f, ensure_ascii=False, separators=(",", ":"))
            f.write(";\n")

    known = set(order)
    for t in index_terms:
        t["x"] = [x for x in t["x"] if x in known]
        t["p"] = [x for x in t["p"] if x in known]
        t["r"] = [x for x in t["r"] if x in known]

    # ------------------------------------------------ Chương 0 — Cách đọc
    _, g = read("00-huong-dan-doc.md")
    sections, cur = [], None
    for ln in g.split("\n"):
        if ln.startswith("# "):
            continue
        if ln.startswith("## "):
            cur = {"t": ln[3:].strip(), "lines": []}
            sections.append(cur)
        elif cur is not None:
            cur["lines"].append(ln)
    guide = [{"t": s["t"], "h": blocks(s["lines"], "00-huong-dan-doc.md")} for s in sections]

    # ------------------------------------------------ Phụ lục 90 — Tên riêng
    _, t90 = read("90-phu-luc-ten-rieng.md")
    names_intro, classes, names, cur_cls, cur_name, pending = [], [], [], None, None, None
    for ln in t90.split("\n"):
        if ln.startswith("# "):
            continue
        m = re.match(r"^## Lớp ([a-z]) — (.+)$", ln)
        if m:
            cur_cls = m.group(1)
            classes.append({"k": cur_cls, "t": m.group(2).strip()})
            cur_name = None
            continue
        a = ANCHOR_RE.match(ln)
        if a:
            pending = a.group(1)
            continue
        if ln.startswith("### "):
            cur_name = {"id": pending, "name": ln[4:].strip(), "cls": cur_cls, "lines": []}
            names.append(cur_name)
            pending = None
            continue
        if cur_name is not None:
            cur_name["lines"].append(ln)
        elif cur_cls is None:
            names_intro.append(ln)
    names_out = []
    for nm in names:
        body = [x for x in nm["lines"]]
        v = ""
        for k, ln in enumerate(body):
            if ln.strip():
                mm = re.match(r"^\*Lớp: ([a-z]) · Xác minh: ([0-9/]+)\*$", ln.strip())
                if mm:
                    v = mm.group(2)
                    body = body[k + 1:]
                break
        names_out.append({"id": nm["id"], "name": nm["name"], "cls": nm["cls"], "v": v,
                          "h": blocks(body, "90-phu-luc-ten-rieng.md"), "d": plain("\n".join(body))})

    # ------------------------------------------------ Phụ lục 91 — Dòng thời gian
    _, t91 = read("91-phu-luc-dong-thoi-gian.md")
    tl_intro, years, src91, mode = [], [], {}, "intro"
    for ln in t91.split("\n"):
        if ln.startswith("# "):
            continue
        m = re.match(r"^## (\d{4})\s*$", ln)
        if m:
            years.append({"y": int(m.group(1)), "ev": []})
            mode = "year"
            continue
        if ln.startswith("## Nguồn"):
            mode = "src"
            continue
        if mode == "intro":
            tl_intro.append(ln)
        elif mode == "year" and ln.startswith("- "):
            body = ln[2:].strip()
            srcs = re.findall(r"\[(S\d+)\]", body)
            body = re.sub(r"\s*\[S\d+\](?:\s*\[S\d+\])*\s*$", "", body)
            date_s, _, rest = body.partition(": ")
            lk = []
            years[-1]["ev"].append({"date": date_s, "h": inline(rest, "91-phu-luc-dong-thoi-gian.md", lk),
                                    "src": srcs, "t": lk})
        elif mode == "src" and ln.startswith("- "):
            mm = re.match(r"^- \[(S\d+)\]\s*(.+)$", ln)
            if mm:
                src91[mm.group(1)] = inline(mm.group(2), "91-phu-luc-dong-thoi-gian.md")

    # ------------------------------------------------ Phụ lục 93 — Cặp dễ nhầm
    _, t93 = read("93-phu-luc-cap-de-nham.md")
    pairs = []
    for ln in t93.split("\n"):
        m = re.match(r"^- \*\*\[[^\]]+\]\([^)#]*#([^)]+)\) và \[[^\]]+\]\([^)#]*#([^)]+)\)\.\*\*\s*(.*)$", ln)
        if m and m.group(1) in known and m.group(2) in known:
            pairs.append({"a": m.group(1), "b": m.group(2), "t": plain(m.group(3))})

    tl_events = sum(len(y["ev"]) for y in years)
    extra = {
        "names": {"intro": blocks(names_intro, "90-phu-luc-ten-rieng.md"), "classes": classes, "items": names_out},
        "timeline": {"intro": blocks(tl_intro, "91-phu-luc-dong-thoi-gian.md"), "years": years, "src": src91},
        "pairs": {"items": pairs},
    }
    with open(D("extra.js"), "w", encoding="utf-8") as f:
        f.write("(window.TD_DATA=window.TD_DATA||{})[\"extra\"]=")
        json.dump(extra, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")

    with open(D("fulltext.js"), "w", encoding="utf-8") as f:
        f.write("(window.TD_DATA=window.TD_DATA||{})[\"fulltext\"]=")
        json.dump(fulltext, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")

    # ------------------------------------------------ index
    tier_counts = [sum(1 for t in index_terms if t["m"] == k) for k in (1, 2, 3)]
    status_counts = {s: sum(1 for t in index_terms if t["s"] == s) for s in STATUS.values()}
    stats = {
        "terms": len(index_terms),
        "tiers": tier_counts,
        "status": status_counts,
        "chapters": len(chapters),
        "clusters": sum(len(c["cl"]) for c in chapters),
        "sources": len(SOURCES),
        "vocab": len(VOCAB),
        "names": len(names_out),
        "events": tl_events,
        "pairs": len(pairs),
        "abbr": sum(1 for t in index_terms if t["ab"]),
        "words": words,
        "callouts": callouts,
    }
    index = {
        "meta": {
            "title": "Từ điển AI dễ hiểu",
            "edition": "Bản 0.1",
            "asof": "10/2026",
            "built": date.today().isoformat(),
            "author": "Hoàng Trần",
        },
        "stats": stats,
        "parts": PARTS,
        "chapters": chapters,
        "terms": index_terms,
        "order": order,
        "guide": guide,
    }
    with open(D("index.js"), "w", encoding="utf-8") as f:
        f.write("(window.TD_DATA=window.TD_DATA||{})[\"index\"]=")
        json.dump(index, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")

    # ------------------------------------------------ kiểm tra liên kết nội bộ
    bad = 0
    for fn in os.listdir(D("ch")):
        txt = open(D("ch", fn), encoding="utf-8").read()
        for tid in re.findall(r'data-t=\\?"([^"\\]+)', txt):
            if tid not in known:
                bad += 1
                warnings.append("Liên kết tới mã không tồn tại: %s (%s)" % (tid, fn))
    ex = open(D("extra.js"), encoding="utf-8").read()
    for tid in re.findall(r'data-t=\\?"([^"\\]+)', ex):
        if tid not in known:
            bad += 1
            warnings.append("Liên kết tới mã không tồn tại: %s (extra)" % tid)

    print("Mục từ: %d  (Mức 1/2/3: %s)" % (len(index_terms), tier_counts))
    print("Chương: %d · Cụm: %d · Tên riêng: %d · Mốc thời gian: %d · Cặp dễ nhầm: %d" %
          (len(chapters), stats["clusters"], len(names_out), tl_events, len(pairs)))
    print("Nguồn: %d · Tiếng (không tính nguồn): %d · Khối cảnh báo: %s" % (len(SOURCES), words, callouts))
    for fn in ["index.js", "extra.js", "fulltext.js"]:
        print("  data/%-12s %7.1f KB" % (fn, os.path.getsize(D(fn)) / 1024))
    print("  data/ch/*.js     %7.1f KB" % (sum(os.path.getsize(D("ch", x)) for x in os.listdir(D("ch"))) / 1024))
    print("Liên kết hỏng: %d · Mục thiếu trong _terms.csv: %d" % (bad, len(unknown)))
    if warnings:
        print("\nCẢNH BÁO (%d):" % len(warnings))
        for w in warnings[:40]:
            print("  - " + w)
    return 1 if bad or unknown else 0


if __name__ == "__main__":
    sys.exit(main())
