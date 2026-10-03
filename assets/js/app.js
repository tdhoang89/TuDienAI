/* =====================================================================
   Từ điển AI dễ hiểu — ứng dụng một trang, không cần build
   Dữ liệu: data/index.js (tải sẵn), data/ch/NN.js, data/extra.js,
   data/fulltext.js (tải khi cần). Định tuyến bằng dấu # nên chạy được
   trên GitHub Pages và khi mở thẳng file index.html.
   ===================================================================== */
(function () {
  'use strict';

  /* ================================================================
     0. Tiện ích
     ================================================================ */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad2 = (n) => String(n).padStart(2, '0');
  const fmtN = (n) => Number(n).toLocaleString('vi-VN');
  const MARKS = /[̀-ͯ]/g;
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(MARKS, '').replace(/đ/g, 'd').replace(/[^\w\s/+.-]/g, ' ').replace(/\s+/g, ' ').trim();
  const reduced = () => document.documentElement.classList.contains('no-motion') || matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;

  const store = {
    get(k, d) { try { const v = localStorage.getItem('tdai:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('tdai:' + k, JSON.stringify(v)); } catch (e) { /* trình duyệt chặn lưu trữ */ } },
  };

  const ICON = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 12H5M11 6l-6 6 6 6"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    mark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5h12v17l-6-4.2-6 4.2z"/></svg>',
    markOn: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5h12v17l-6-4.2-6 4.2z"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/></svg>',
    film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/></svg>',
    shuffle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7h3.5c4 0 5 10 9 10H21M3 17h3.5c1.6 0 2.7-1.6 3.6-3.5M14 10.5c.9-1.9 2-3.5 3.6-3.5H21M18 4l3 3-3 3M18 14l3 3-3 3"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v13M6 11l6 6 6-6M4 21h16"/></svg>',
    flip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4"/></svg>',
  };

  /* ================================================================
     1. Dữ liệu
     ================================================================ */
  const DATA = (window.TD_DATA = window.TD_DATA || {});
  const IDX = DATA.index;
  if (!IDX) { document.getElementById('view').innerHTML = '<div class="wrap empty"><h2>Thiếu dữ liệu</h2><p>Không tìm thấy data/index.js. Chạy <code>python tools/build.py</code>.</p></div>'; return; }
  const T = new Map(IDX.terms.map((t) => [t.id, t]));
  const ORDER = IDX.order;
  const POS = new Map(ORDER.map((id, i) => [id, i]));
  const CH = new Map(IDX.chapters.map((c) => [c.n, c]));
  const CL = new Map();
  IDX.chapters.forEach((c) => c.cl.forEach((k) => CL.set(k.id, k)));
  const ST = IDX.stats;
  const HOST = location.protocol.startsWith('http') ? (location.host + location.pathname.replace(/index\.html$/, '')).replace(/\/$/, '') : '';

  const scripts = {};
  function loadScript(src) {
    if (scripts[src]) return scripts[src];
    scripts[src] = new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = () => res();
      s.onerror = () => { delete scripts[src]; rej(new Error('Không tải được ' + src)); };
      document.head.appendChild(s);
    });
    return scripts[src];
  }
  async function loadChapter(n) {
    const k = 'ch' + pad2(n);
    if (!DATA[k]) await loadScript('data/ch/' + pad2(n) + '.js');
    return DATA[k];
  }
  async function loadExtra() {
    if (!DATA.extra) await loadScript('data/extra.js');
    return DATA.extra;
  }
  let FT = null;
  async function loadFulltext() {
    if (FT) return FT;
    if (!DATA.fulltext) await loadScript('data/fulltext.js');
    FT = new Map(Object.entries(DATA.fulltext).map(([k, v]) => [k, norm(v)]));
    return FT;
  }

  let READ = new Set(store.get('read', []));
  let SAVED = new Set(store.get('saved', []));
  let LEARNED = new Set(store.get('learned', []));
  const markRead = (id) => { if (!READ.has(id)) { READ.add(id); store.set('read', [...READ]); } };
  const pushRecent = (id) => { const r = store.get('recent', []).filter((x) => x !== id); r.unshift(id); store.set('recent', r.slice(0, 8)); };

  /* Lộ trình đọc — đúng như Chương 0, mục 0.3 */
  const PATHS = [
    { n: 1, t: 'Lộ trình nền tảng', who: 'Cho người mới bắt đầu', d: 'Hiểu AI từ gốc: học máy, dữ liệu, cách huấn luyện, rồi phần lõi của kiến trúc và LLM.', steps: [{ c: 1 }, { c: 2 }, { c: 3, m: 1 }, { c: 4, m: 1 }] },
    { n: 2, t: 'Dùng AI trong công việc', who: 'Cho người dùng AI hằng ngày', d: 'LLM, prompt, ngữ cảnh, agent, cách đánh giá chất lượng và cách triển khai trong doanh nghiệp.', steps: [{ c: 4 }, { c: 5 }, { c: 6 }, { c: 7, m: 1 }, { c: 11 }] },
    { n: 3, t: 'Pháp lý và quản trị', who: 'Cho luật sư, nhà quản lý, công chức', d: 'Phần lõi về AI, an toàn và bảo mật, rồi toàn bộ chương pháp lý và chương xã hội.', steps: [{ c: 1, m: 1 }, { c: 4, m: 1 }, { c: 8, m: 1 }, { c: 9, m: 1 }, { c: 10 }, { c: 12 }] },
  ];
  const pathTerms = (p) => p.steps.flatMap((s) => ORDER.filter((id) => { const t = T.get(id); return t.c === s.c && (!s.m || t.m <= s.m); }));
  const stepLabel = (s) => (s.m ? `Mức 1 của Chương ${s.c}` : `Chương ${s.c}`);

  const TIER_NAME = { 1: 'Mức 1 · cốt lõi', 2: 'Mức 2 · chuẩn', 3: 'Mức 3 · ngắn' };
  const STATUS_NAME = { 'on-dinh': 'Ổn định', 'dang-bien-doi': 'Đang biến đổi', 'lich-su': 'Lịch sử' };
  const tierHTML = (m) => `<span class="tier" data-m="${m}" title="${TIER_NAME[m]}"><i><b></b><b></b><b></b></i>Mức ${m}</span>`;
  const statusHTML = (s) => `<span class="status" data-s="${s}">${STATUS_NAME[s] || s}</span>`;
  const chTitleHTML = (t) => {
    const i = t.indexOf(': ');
    if (i > 0) return `${esc(t.slice(0, i))}: <em>${esc(t.slice(i + 2))}</em>`;
    return esc(t).replace(/ và /g, ' <em>và</em> ');
  };

  function termOfDay(offset = 0) {
    const pool = ORDER.filter((id) => T.get(id).m <= 2);
    const day = Math.floor((Date.now() + 7 * 3600e3) / 864e5) + offset;
    return T.get(pool[(day * 7919) % pool.length]);
  }

  /* ================================================================
     2. Tìm kiếm tiếng Việt (gõ không dấu vẫn ra)
     ================================================================ */
  const SR = IDX.terms.map((t) => ({ t, ab: norm(t.ab), en: norm(t.en), vi: norm(t.vi), cn: norm(t.cn), h: norm(t.h), alt: t.alt.map(norm), d: norm(t.d) }));

  function searchTerms(q, { full = false, limit = 40 } = {}) {
    const nq = norm(q);
    if (!nq) return [];
    const words = nq.split(' ');
    const ws = (f) => words.every((x) => (' ' + f).includes(' ' + x));
    const out = [];
    for (const r of SR) {
      let s = 0;
      const fields = [[r.ab, 120], [r.en, 100], [r.vi, 100], [r.cn, 96], [r.h, 92]].concat(r.alt.map((a) => [a, 82]));
      for (const [f, w] of fields) {
        if (!f) continue;
        if (f === nq) s = Math.max(s, w + 60);
        else if (f.startsWith(nq)) s = Math.max(s, w + 30 - Math.min(20, (f.length - nq.length) * 0.4));
        else if ((' ' + f).includes(' ' + nq)) s = Math.max(s, w + 8);
        else if (f.includes(nq)) s = Math.max(s, w - 12);
        else if (words.length > 1 && ws(f)) s = Math.max(s, w - 22);
      }
      if (!s && r.d.includes(nq)) s = 32;
      if (!s && words.length > 1 && ws(r.d)) s = 22;
      if (!s && full && FT) {
        const ft = FT.get(r.t.id);
        if (ft && (ft.includes(nq) || (words.length > 1 && ws(ft)))) s = 12;
      }
      if (s) out.push({ t: r.t, s: s + (4 - r.t.m) * 2 });
    }
    out.sort((a, b) => b.s - a.s || a.t.en.localeCompare(b.t.en));
    return out.slice(0, limit);
  }

  /** Tô sáng chỗ khớp, kể cả khi người dùng gõ không dấu */
  function hl(text, q) {
    const nq = norm(q);
    if (!nq || !text) return esc(text);
    const chars = Array.from(text);
    const n = chars.map((c) => { const x = c.toLowerCase().normalize('NFD').replace(MARKS, '').replace(/đ/g, 'd'); return x[0] || ' '; }).join('');
    const i = n.indexOf(nq);
    if (i < 0) return esc(text);
    return esc(chars.slice(0, i).join('')) + '<mark>' + esc(chars.slice(i, i + nq.length).join('')) + '</mark>' + esc(chars.slice(i + nq.length).join(''));
  }

  function snippet(text, q, len = 150) {
    const nq = norm(q);
    const n = Array.from(text).map((c) => { const x = c.toLowerCase().normalize('NFD').replace(MARKS, '').replace(/đ/g, 'd'); return x[0] || ' '; }).join('');
    const i = n.indexOf(nq);
    if (i < 0) return esc(text.slice(0, len)) + (text.length > len ? '…' : '');
    const a = Math.max(0, i - 50);
    const piece = Array.from(text).slice(a, a + len).join('');
    return (a > 0 ? '…' : '') + hl(piece, q) + '…';
  }

  /* ================================================================
     3. Mảnh giao diện dùng chung
     ================================================================ */
  const tlink = (t, text) => `<a href="#/t/${t.id}" data-t="${t.id}">${text == null ? esc(t.cn || t.en) : text}</a>`;

  function coverArt(n) {
    let seed = n * 9973;
    const r = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
    const W = 400, H = 500, A = 'var(--accent)', P = '#f3f1ec';
    let g = '';
    switch (n) {
      case 1: for (let i = 14; i > 0; i--) g += `<circle cx="${250}" cy="${190}" r="${i * 17}" fill="none" stroke="${i === 5 ? A : P}" stroke-width="${i === 5 ? 3 : 1}" opacity="${i === 5 ? 1 : 0.55}"/>`; break;
      case 2: for (let y = 0; y < 13; y++) for (let x = 0; x < 11; x++) { const v = (Math.sin(x * 0.7 + y * 0.45) + 1) / 2; g += `<circle cx="${20 + x * 36}" cy="${20 + y * 36}" r="${1.5 + v * 12}" fill="${x === 7 && y === 4 ? A : P}"/>`; } break;
      case 3: { const pts = Array.from({ length: 16 }, () => [40 + r() * 320, 30 + r() * 330]); pts.forEach((a, i) => pts.forEach((b, j) => { if (j > i && Math.hypot(a[0] - b[0], a[1] - b[1]) < 140) g += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${P}" stroke-width=".8" opacity=".6"/>`; })); pts.forEach((p, i) => (g += `<circle cx="${p[0]}" cy="${p[1]}" r="${i === 3 ? 9 : 4}" fill="${i === 3 ? A : P}"/>`)); break; }
      case 4: for (let i = 0; i < 22; i++) { const w = 40 + r() * 300; g += `<rect x="${30}" y="${24 + i * 15}" width="${w}" height="9" fill="${i === 9 ? A : P}" opacity="${i === 9 ? 1 : 0.35 + r() * 0.6}"/>`; } break;
      case 5: for (let y = 0; y < 9; y++) for (let x = 0; x < 6; x++) g += `<text x="${30 + x * 64}" y="${60 + y * 46}" font-family="Playfair Display, serif" font-size="40" fill="${x === 2 && y === 3 ? A : P}" opacity="${x === 2 && y === 3 ? 1 : 0.5}">${(x + y) % 3 === 0 ? '{' : (x + y) % 3 === 1 ? '»' : '}'}</text>`; break;
      case 6: for (let i = 0; i < 18; i++) { const y = 20 + i * 20; g += `<path d="M${-20 + (i % 3) * 30} ${y + 80} L ${420} ${y - 60}" stroke="${i === 7 ? A : P}" stroke-width="${i === 7 ? 3 : 1}" opacity="${i === 7 ? 1 : 0.5}" fill="none"/>`; } g += `<path d="M300 60 l40 0 l0 40" stroke="${A}" stroke-width="3" fill="none"/>`; break;
      case 7: for (let i = 0; i < 24; i++) { const h = 30 + r() * 300; g += `<rect x="${24 + i * 15.5}" y="${370 - h}" width="9" height="${h}" fill="${i === 16 ? A : P}" opacity="${i === 16 ? 1 : 0.6}"/>`; } for (let i = 0; i < 9; i++) g += `<line x1="18" x2="390" y1="${30 + i * 42}" y2="${30 + i * 42}" stroke="${P}" stroke-width=".5" opacity=".25"/>`; break;
      case 8: for (let i = 1; i < 12; i++) g += `<path d="M ${200 - i * 16} ${80 + i * 4} Q 200 ${60 + i * 2} ${200 + i * 16} ${80 + i * 4} L ${200 + i * 16} ${180 + i * 12} Q 200 ${300 + i * 12} ${200 - i * 16} ${180 + i * 12} Z" fill="none" stroke="${i === 4 ? A : P}" stroke-width="${i === 4 ? 2.5 : 1}" opacity="${i === 4 ? 1 : 0.5}"/>`; break;
      case 9: for (let y = 0; y < 10; y++) for (let x = 0; x < 8; x++) { const on = r() > 0.55; g += `<rect x="${24 + x * 46}" y="${20 + y * 36}" width="38" height="28" fill="${x === 5 && y === 2 ? A : on ? P : 'none'}" stroke="${P}" stroke-width=".8" opacity="${on ? 0.85 : 0.4}"/>`; } break;
      case 10: for (let i = 0; i < 9; i++) { const x = 30 + i * 42; g += `<rect x="${x}" y="60" width="18" height="300" fill="${i === 4 ? A : P}" opacity="${i === 4 ? 1 : 0.7}"/>`; } g += `<rect x="20" y="40" width="360" height="12" fill="${P}"/><rect x="20" y="364" width="360" height="12" fill="${P}"/><path d="M20 40 L200 4 L380 40" fill="none" stroke="${P}" stroke-width="2"/>`; break;
      case 11: for (let i = 0; i < 9; i++) g += `<rect x="${20 + i * 40}" y="${360 - (i + 1) * 36}" width="40" height="${(i + 1) * 36}" fill="${i === 6 ? A : P}" opacity="${i === 6 ? 1 : 0.25 + i * 0.08}"/>`; break;
      default: for (let i = 0; i < 160; i++) { const x = 20 + r() * 360, y = 20 + r() * 340; g += `<circle cx="${x}" cy="${y}" r="${2 + r() * 5}" fill="${i === 77 ? A : P}" opacity="${i === 77 ? 1 : 0.35 + r() * 0.5}"/>`; } g += `<circle cx="${200}" cy="${190}" r="14" fill="${A}"/>`;
    }
    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${g}</svg>`;
  }

  function coverHTML(c, i = 0) {
    const read = c.cl.reduce((a, k) => a + k.ids.filter((id) => READ.has(id)).length, 0);
    return `<a class="cover" href="#/chu-de/${pad2(c.n)}" data-cursor="Đọc" data-reveal style="--d:${(i % 4) * 0.07}s">
      <div class="cover__art">${coverArt(c.n)}<div class="cover__issue"><span>Issue N°${pad2(c.n)}</span><span>${c.count} mục</span></div><div class="cover__n">${pad2(c.n)}</div></div>
      <div class="cover__body">
        <h4 class="cover__title">${chTitleHTML(c.t)}</h4>
        <p class="cover__lead">${esc(c.lead)}</p>
        <div class="cover__foot"><span>${c.cl.length} cụm · ${c.tiers[0]} cốt lõi</span><span>${read}/${c.count}</span></div>
        <div class="meter"><i style="--p:${(read / c.count) * 100}%"></i></div>
      </div></a>`;
  }

  function partsHTML() {
    return IDX.parts.map((p, pi) => `<div class="part">
      <div class="part__head" data-reveal><h3>${pad2(pi + 1)} — ${esc(p.t)}</h3><span class="mono muted">${esc(p.d)}</span></div>
      <div class="covers">${p.ch.map((n, i) => coverHTML(CH.get(n), i)).join('')}</div></div>`).join('');
  }

  function cardTermHTML(t, i) {
    return `<a class="card-term" href="#/t/${t.id}" data-t="${t.id}" data-cursor="Mở">
      <div class="card-term__no"><span>${pad2(i + 1)}</span><span>N°${pad2(t.c)}</span></div>
      <div class="card-term__en">${esc(t.h)}</div><div class="card-term__vi">${esc(t.hv || t.vi)}</div>
      <p class="card-term__def">${esc(t.d)}</p></a>`;
  }

  function versusHTML(p, i = 0) {
    const a = T.get(p.a), b = T.get(p.b);
    return `<div class="versus" data-reveal style="--d:${(i % 3) * 0.06}s">
      <div class="versus__pair">${tlink(a, esc(a.cn || a.en))}<span class="versus__x">vs</span>${tlink(b, esc(b.cn || b.en))}</div>
      <p class="versus__t">${esc(p.t)}</p><span class="mono muted">Chương ${a.c}${a.c !== b.c ? ' · ' + b.c : ''}</span></div>`;
  }

  function pathCardHTML(p) {
    const ids = pathTerms(p);
    const done = ids.filter((id) => READ.has(id)).length;
    return `<a class="path-card" href="#/lo-trinh/${p.n}" data-reveal data-cursor="Đi">
      <div class="path-card__n">${pad2(p.n)}</div>
      <div class="path-card__t">${esc(p.t)}</div>
      <p class="muted" style="margin:0">${esc(p.d)}</p>
      <ol class="path-card__steps">${p.steps.map((s, i) => `<li><span class="mono muted">${i + 1}.</span> ${esc(stepLabel(s))} — ${esc(CH.get(s.c).t)}</li>`).join('')}</ol>
      <div class="path-card__foot"><div class="cover__foot"><span>${esc(p.who)}</span><span>${done}/${ids.length}</span></div><div class="meter"><i style="--p:${(done / ids.length) * 100}%"></i></div></div></a>`;
  }

  const FIELD_KEY = { 'Định nghĩa': 'def', 'Không nên hiểu là': 'dont', 'Liên quan': 'rel', 'Nguồn': 'src', '!': 'warn' };
  function fieldsHTML(e, openSrc) {
    return e.b.map(([label, html]) => {
      const k = FIELD_KEY[label] || '';
      if (label === 'Nguồn') {
        const n = (html.match(/<li>/g) || []).length;
        return `<div class="field field--src"><div class="field__label">Nguồn</div><div class="field__body"><details${openSrc ? ' open' : ''}><summary>${n} nguồn tham khảo</summary>${html}</details></div></div>`;
      }
      return `<div class="field${k ? ' field--' + k : ''}"><div class="field__label">${label === '!' ? '' : esc(label)}</div><div class="field__body">${html}</div></div>`;
    }).join('');
  }

  function entryHTML(t, e) {
    return `<article class="entry" id="e-${t.id}" data-id="${t.id}" data-m="${t.m}">
      <div class="entry__top">${tierHTML(t.m)}${statusHTML(t.s)}<span class="mono">${esc(t.k)} · ${esc(t.id)}</span>
        <div class="entry__tools">
          <button class="mini-btn${SAVED.has(t.id) ? ' is-on' : ''}" data-act="save" data-id="${t.id}" aria-label="Lưu mục này">${SAVED.has(t.id) ? ICON.markOn : ICON.mark}<span>Lưu</span></button>
          <a class="mini-btn" href="#/studio/${t.id}" aria-label="Tạo video cho mục này">${ICON.film}<span>Video</span></a>
          <a class="mini-btn" href="#/t/${t.id}" aria-label="Mở trang riêng">${ICON.arrow}</a>
        </div></div>
      <h3 class="entry__title"><a href="#/t/${t.id}">${esc(t.h)}</a></h3>
      <p class="entry__vi">${esc(t.hv || t.vi)}</p>
      <div class="fields">${fieldsHTML(e, false)}</div></article>`;
  }

  /* ================================================================
     4. Các trang
     ================================================================ */
  function pageHero({ crumbs = [], kicker, title, lead, right = '' }) {
    return `<header class="page-hero"><div class="wrap">
      ${crumbs.length ? `<nav class="crumbs" aria-label="Đường dẫn">${crumbs.map((c, i) => (c[1] ? `<a href="${c[1]}">${esc(c[0])}</a>` : `<span>${esc(c[0])}</span>`) + (i < crumbs.length - 1 ? '<span aria-hidden="true">/</span>' : '')).join('')}</nav>` : ''}
      ${kicker ? `<div class="kicker" style="margin-bottom:18px">${kicker}</div>` : ''}
      <div class="page-hero__row"><h1 data-split>${title}</h1>${right}</div>
      ${lead ? `<p class="lead" data-reveal style="--d:.2s">${lead}</p>` : ''}
    </div></header>`;
  }

  /* ---------- Trang chủ ---------- */
  function viewHome() {
    const tod = termOfDay();
    const core = ORDER.map((id) => T.get(id)).filter((t) => t.m === 1);
    const coreShow = core.slice(0, 24);
    const marq = core.slice().sort((a, b) => ((a.id.length * 31 + a.c) % 17) - ((b.id.length * 31 + b.c) % 17)).slice(0, 26);
    const marqItems = marq.map((t) => `<a class="marquee__item" href="#/t/${t.id}" data-t="${t.id}">${esc(t.cn && t.cn.length < 22 ? t.cn : t.en)}</a>`).join('');
    const ch = CH.get(tod.c);
    return {
      title: 'Từ điển AI dễ hiểu',
      label: 'Trang chủ',
      html: `
      <section class="hero inverse">
        <div class="wrap hero__grid">
          <div>
            <div class="hero__meta"><span class="kicker">N°01 · Bản 0.1</span><span class="kicker">Mốc nội dung 10/2026</span></div>
            <h1 class="hero__title"><span class="line"><span>Từ điển</span></span><span class="line"><span><em>AI</em> dễ hiểu<span class="accent-dot">.</span></span></span></h1>
            <p class="hero__lead" data-reveal style="--d:.35s"><b>${fmtN(ST.terms)} thuật ngữ AI</b>, viết bằng tiếng Việt đơn giản cho người không làm kỹ thuật. Đọc theo chủ đề như đọc một cuốn sách — hoặc tra A → Z khi cần.</p>
            <form class="hero-search" data-hero-search role="search" data-reveal style="--d:.45s">
              <label class="sr-only" for="hero-q">Tìm thuật ngữ</label>
              <input id="hero-q" type="search" autocomplete="off" placeholder="Tìm: “RAG”, “học máy”, “ao giac”…">
              <button type="submit" aria-label="Tìm">${ICON.search}</button>
            </form>
            <div class="hero__quick" data-reveal style="--d:.55s">
              <a class="chip" href="#/a-z?m=1">${ST.tiers[0]} từ cốt lõi</a>
              <button class="chip" data-act="random">${ICON.shuffle.replace('<svg', '<svg width="14" height="14"')} Từ ngẫu nhiên</button>
              <a class="chip" href="#/lo-trinh">Lộ trình đọc</a>
              <a class="chip" href="#/a-z">A → Z</a>
            </div>
          </div>
          <div class="hero__film" data-reveal style="--d:.5s">
            <div data-film="teaser" data-cursor="Phát"></div>
            <div class="film-caption"><span>Video này viết bằng code</span><a href="#/studio">Mở Studio →</a></div>
          </div>
        </div>
      </section>

      <section class="section--tight"><div class="wrap">
        <div class="stats">
          <div class="stat" data-reveal><div class="stat__n" data-count="${ST.terms}">0</div><div class="stat__l">Thuật ngữ</div></div>
          <div class="stat" data-reveal style="--d:.08s"><div class="stat__n" data-count="${ST.chapters}">0</div><div class="stat__l">Chủ đề · ${ST.clusters} cụm</div></div>
          <div class="stat" data-reveal style="--d:.16s"><div class="stat__n" data-count="${ST.sources}">0</div><div class="stat__l">Nguồn tham khảo</div></div>
          <div class="stat" data-reveal style="--d:.24s"><div class="stat__n" data-count="${ST.pairs}">0</div><div class="stat__l">Cặp dễ nhầm</div></div>
        </div>
      </div></section>

      <div class="marquee" style="--dur:80s"><div class="marquee__track">${marqItems}${marqItems}</div></div>

      <section class="section" id="chu-de"><div class="wrap">
        <div class="section-head">
          <div><div class="kicker">Cách đọc</div><h2 class="section-title" data-split>Đọc theo <em>chủ đề</em>, không phải A → Z.</h2>
          <p class="section-sub" data-reveal>Hiếm ai đọc một cuốn từ điển thường từ đầu đến cuối. Cuốn này xếp ${ST.terms} mục thành ${ST.chapters} chủ đề và ${ST.clusters} cụm. Trong mỗi cụm, khái niệm nền đứng trước khái niệm dẫn xuất — nên đọc liền một mạch vẫn hiểu.</p></div>
          <a class="link-arrow" href="#/a-z">Vẫn muốn tra A → Z ${ICON.arrow}</a>
        </div>
        ${partsHTML()}
      </div></section>

      <section class="section inverse"><div class="wrap">
        <div class="kicker" style="margin-bottom:28px">Từ của ngày · ${new Date().toLocaleDateString('vi-VN', { day: 'numeric', month: 'long' })}</div>
        <div class="spread">
          <div><div class="spread__term" data-split>${esc(tod.h)}</div><div class="spread__vi" data-reveal>${esc(tod.hv || tod.vi)}</div></div>
          <div data-reveal style="--d:.15s">
            <p class="spread__def">${esc(tod.d)}</p>
            <div class="spread__meta">${tierHTML(tod.m)}${statusHTML(tod.s)}<span class="mono">N°${pad2(tod.c)} · ${esc(ch.t)}</span></div>
            <div class="spread__actions">
              <a class="btn" href="#/t/${tod.id}">Đọc mục đầy đủ ${ICON.arrow}</a>
              <a class="btn btn--ghost" href="#/studio/${tod.id}">${ICON.film} Xem thành video</a>
            </div>
          </div>
        </div>
      </div></section>

      <section class="hscroll" data-hscroll>
        <div class="hscroll__sticky">
          <div class="hscroll__head"><div><div class="kicker">Mức 1</div><h2 class="section-title" data-split>${ST.tiers[0]} từ <em>cốt lõi</em></h2></div>
            <span class="hscroll__count">Đọc ${ST.tiers[0]} từ này trước là nắm được xương sống của AI →</span></div>
          <div class="hscroll__track">${coreShow.map(cardTermHTML).join('')}
            <a class="card-term" href="#/a-z?m=1" style="justify-content:center;align-items:flex-start;background:var(--ink);color:var(--paper)"><div class="card-term__en">Xem cả ${ST.tiers[0]} →</div><p class="card-term__def" style="color:inherit;opacity:.7;margin-top:0">Mục Mức 1 có đủ các trường và có ví dụ.</p></a>
          </div>
        </div>
      </section>

      <section class="section"><div class="wrap">
        <div class="section-head"><div><div class="kicker">Phụ lục 93</div><h2 class="section-title" data-split>Dễ <em>nhầm</em>.</h2>
          <p class="section-sub" data-reveal>${ST.pairs} cặp thuật ngữ hay bị dùng lẫn, mỗi cặp có một câu nêu điểm khác.</p></div>
          <a class="link-arrow" href="#/de-nham">Xem ${ST.pairs} cặp ${ICON.arrow}</a></div>
        <div class="versus-grid" data-pairs-home><div class="versus"><p class="muted">Đang tải…</p></div></div>
      </div></section>

      <section class="section" style="padding-top:0"><div class="wrap">
        <div class="section-head"><div><div class="kicker">Chương 0 · mục 0.3</div><h2 class="section-title" data-split>Ba <em>lộ trình</em> đọc.</h2></div>
          <a class="link-arrow" href="#/cach-doc">Cách đọc từ điển này ${ICON.arrow}</a></div>
        <div class="paths">${PATHS.map(pathCardHTML).join('')}</div>
      </div></section>

      <section class="section inverse"><div class="wrap">
        <p class="bigquote" data-split>Thật sự có ai đọc ngấu nghiến <em>từ điển</em> thường đâu.</p>
        <div class="quote-by" data-reveal><span class="kicker">Hoàng Trần — về lý do cuốn từ điển xếp theo chủ đề</span><a class="btn btn--ghost btn--sm" href="#/tac-gia">Về tác giả ${ICON.arrow}</a></div>
      </div></section>`,
      mount(root, cleanup) {
        const f = $('[data-film="teaser"]', root);
        if (f && window.TDFilm) {
          const p = new TDFilm.Player(f, { comp: TDFilm.teaser(filmData()), fmt: '916', tag: 'Code → video' });
          cleanup.push(() => p.destroy());
        }
        const form = $('[data-hero-search]', root);
        const inp = $('input', form);
        form.addEventListener('submit', (e) => { e.preventDefault(); openPalette(inp.value); });
        const go = (e) => { if (e) e.preventDefault(); const v = inp.value; inp.value = ''; inp.blur(); openPalette(v); };
        inp.addEventListener('pointerdown', go);
        inp.addEventListener('focus', () => go());
        loadExtra().then((x) => {
          const box = $('[data-pairs-home]', root);
          if (!box) return;
          const items = x.pairs.items;
          const start = (Math.floor(Date.now() / 864e5) * 37) % items.length;
          const pick = [0, 1, 2].map((k) => items[(start + k * 151) % items.length]);
          box.innerHTML = pick.map(versusHTML).join('');
          enhance(box);
        }).catch(() => {});
      },
    };
  }

  function filmData() { return { T, chapters: IDX.chapters, stats: ST, host: HOST }; }

  /* ---------- Chủ đề ---------- */
  function viewTopics() {
    return {
      title: 'Chủ đề',
      label: 'Chủ đề',
      html: pageHero({ crumbs: [['Trang chủ', '#/'], ['Chủ đề']], kicker: `${ST.chapters} chủ đề · ${ST.clusters} cụm · ${ST.terms} mục`, title: 'Đọc theo <em>chủ đề</em>', lead: 'Sách chia thành 4 phần và 12 chương. Mỗi chương là một "số tạp chí": đọc từ đầu đến cuối, hoặc chỉ đọc các mục Mức 1 để nắm phần lõi.' })
        + `<section class="section" style="padding-top:48px"><div class="wrap">${partsHTML()}</div></section>`,
    };
  }

  /* ---------- Đọc một chương ---------- */
  async function viewChapter(nStr, q) {
    const n = parseInt(nStr, 10);
    const c = CH.get(n);
    if (!c) return viewNotFound();
    const data = await loadChapter(n);
    const depth = store.get('depth', 3);
    const read = c.cl.reduce((a, k) => a + k.ids.filter((id) => READ.has(id)).length, 0);
    const prev = CH.get(n - 1), next = CH.get(n + 1);
    const toc = c.cl.map((k) => `<li class="toc__cl"><a href="#e-cl-${k.id}" data-jump="cl-${k.id}">${esc(k.id)} · ${esc(k.t)}</a><ol>${k.ids.filter((id) => T.has(id)).map((id) => {
      const t = T.get(id);
      return `<li class="toc__term" data-m="${t.m}"${t.m > depth ? ' hidden' : ''}><a href="#e-${id}" data-jump="${id}" class="${READ.has(id) ? 'is-read' : ''}"><span class="read-dot"></span>${esc(t.cn && t.cn.length < 30 ? t.cn : t.en)}</a></li>`;
    }).join('')}</ol></li>`).join('');
    const body = c.cl.map((k) => `<div class="cluster-head" id="e-cl-${k.id}"><span class="cluster-head__n">${esc(k.id)}</span><h2>${esc(k.t)}</h2></div>
      ${data.cli && data.cli[k.id] ? `<div class="cluster-intro">${data.cli[k.id]}</div>` : ''}
      ${k.ids.filter((id) => T.has(id)).map((id) => { const t = T.get(id); return data.e[id] ? entryHTML(t, data.e[id]).replace('<article class="entry"', `<article class="entry"${t.m > depth ? ' hidden' : ''}`) : ''; }).join('')}`).join('');
    return {
      title: `Chương ${n} — ${c.t}`,
      label: `N°${pad2(n)}`,
      html: pageHero({
        crumbs: [['Trang chủ', '#/'], ['Chủ đề', '#/chu-de'], [`Chương ${n}`]],
        kicker: `Issue N°${pad2(n)} · ${c.count} mục · ${c.cl.length} cụm`,
        title: chTitleHTML(c.t),
        right: `<div style="min-width:220px"><div class="cover__foot" style="margin-bottom:8px"><span>Đã đọc</span><span data-ch-read>${read}/${c.count}</span></div><div class="meter meter--accent"><i data-ch-meter style="--p:${(read / c.count) * 100}%"></i></div></div>`,
      }) + `<div class="wrap reader">
        <aside class="toc" aria-label="Mục lục chương">
          <details class="toc__fold" open><summary class="toc__head"><span class="mono muted">Mục lục</span><span class="mono muted">${c.count} mục</span></summary>
          <div class="depth" role="group" aria-label="Độ sâu">
            <button class="chip" data-depth="3" aria-pressed="${depth === 3}">Tất cả</button>
            <button class="chip" data-depth="2" aria-pressed="${depth === 2}">Mức 1–2</button>
            <button class="chip" data-depth="1" aria-pressed="${depth === 1}">Mức 1</button>
          </div>
          <ol>${toc}</ol></details>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:16px">
            <a class="mini-btn" href="#/hoc?c=${n}">${ICON.flip} Học chương này</a>
            <button class="mini-btn" data-act="size">Aa Cỡ chữ</button>
          </div>
        </aside>
        <div>
          <div class="chapter-intro" data-reveal>${data.intro}</div>
          ${body}
          <nav class="pager" style="margin-top:60px">
            ${prev ? `<a href="#/chu-de/${pad2(prev.n)}"><span class="mono muted">← Chương ${prev.n}</span><b>${esc(prev.t)}</b></a>` : '<span></span>'}
            ${next ? `<a href="#/chu-de/${pad2(next.n)}"><span class="mono muted">Chương ${next.n} →</span><b>${esc(next.t)}</b></a>` : `<a href="#/ten-rieng"><span class="mono muted">Phụ lục →</span><b>Tên riêng</b></a>`}
          </nav>
        </div>
      </div>`,
      mount(root, cleanup) {
        if (innerWidth < 960) { const f = $('.toc__fold', root); if (f) f.open = false; }
        // độ sâu đọc
        $$('[data-depth]', root).forEach((b) => b.addEventListener('click', () => {
          const d = +b.dataset.depth;
          store.set('depth', d);
          $$('[data-depth]', root).forEach((x) => x.setAttribute('aria-pressed', String(+x.dataset.depth === d)));
          $$('.entry', root).forEach((el) => { el.hidden = +el.dataset.m > d; });
          $$('.toc__term', root).forEach((el) => { el.hidden = +el.dataset.m > d; });
        }));
        $$('[data-jump]', root).forEach((a) => a.addEventListener('click', (e) => {
          e.preventDefault();
          const id = a.dataset.jump;
          const el = document.getElementById(id.startsWith('cl-') ? 'e-' + id : 'e-' + id);
          if (el) { el.hidden = false; el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' }); }
        }));
        // theo dõi mục đang đọc, đánh dấu đã đọc sau 1,5 giây
        const timers = new Map();
        const links = new Map($$('.toc__term a', root).map((a) => [a.dataset.jump, a]));
        const updateCount = () => {
          const r = c.cl.reduce((a, k) => a + k.ids.filter((id) => READ.has(id)).length, 0);
          const el = $('[data-ch-read]', root);
          if (el) el.textContent = `${r}/${c.count}`;
          const m = $('[data-ch-meter]', root);
          if (m) m.style.setProperty('--p', (r / c.count) * 100 + '%');
        };
        const io = new IntersectionObserver((es) => {
          es.forEach((en) => {
            const id = en.target.dataset.id;
            if (en.isIntersecting) {
              $$('.toc__term a.is-active', root).forEach((x) => x.classList.remove('is-active'));
              const a = links.get(id);
              if (a) { a.classList.add('is-active'); const toc = $('.toc', root); if (toc && toc.scrollHeight > toc.clientHeight) { const r = a.getBoundingClientRect(), tr = toc.getBoundingClientRect(); if (r.top < tr.top || r.bottom > tr.bottom) toc.scrollTop += r.top - tr.top - 120; } }
              if (!READ.has(id)) timers.set(id, setTimeout(() => { markRead(id); if (a) a.classList.add('is-read'); updateCount(); }, 1500));
            } else if (timers.has(id)) { clearTimeout(timers.get(id)); timers.delete(id); }
          });
        }, { rootMargin: '-20% 0px -55% 0px' });
        $$('.entry', root).forEach((el) => io.observe(el));
        cleanup.push(() => { io.disconnect(); timers.forEach(clearTimeout); });
        if (q.t) {
          const el = document.getElementById('e-' + q.t);
          if (el) { el.hidden = false; setTimeout(() => el.scrollIntoView({ block: 'start' }), 60); }
        }
      },
    };
  }

  /* ---------- Một mục từ ---------- */
  function graphSVG(t) {
    const seen = new Set([t.id]);
    const nodes = [];
    const add = (ids, kind, max) => ids.forEach((id) => { if (!seen.has(id) && T.has(id) && nodes.filter((n) => n.kind === kind).length < max) { seen.add(id); nodes.push({ t: T.get(id), kind }); } });
    add(t.x, 'x', 4);
    add(t.p, 'p', 3);
    add(t.r, 'r', 9);
    const C = 200, R = nodes.length > 8 ? 150 : 135;
    const label = (x) => { const s = x.cn || x.en; return s.length > 20 ? s.slice(0, 18) + '…' : s; };
    let edges = '', dots = '';
    nodes.forEach((n, i) => {
      const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
      const x = C + Math.cos(a) * R, y = C + Math.sin(a) * R;
      edges += `<line class="edge${n.kind !== 'r' ? ' edge--' + n.kind : ''}" x1="${C}" y1="${C}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`;
      dots += `<a href="#/t/${n.t.id}" data-t="${n.t.id}" class="node node--${n.kind}"><g class="float" style="animation-delay:${-i * 0.7}s"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${n.kind === 'x' ? 8 : 6}"/><text x="${x.toFixed(1)}" y="${(y + (y < C - 20 ? -14 : 20)).toFixed(1)}" text-anchor="middle">${esc(label(n.t))}</text></g></a>`;
    });
    return `<svg viewBox="0 0 400 400" role="img" aria-label="Bản đồ các mục liên quan">${edges}${dots}<g class="node node--c"><circle cx="${C}" cy="${C}" r="13"/><text x="${C}" y="${C + 34}" text-anchor="middle">${esc(label(t))}</text></g></svg>`;
  }

  async function viewTerm(id, q) {
    const t = T.get(id);
    if (!t) return viewNotFound(id);
    const data = await loadChapter(t.c);
    const e = data.e[id];
    const c = CH.get(t.c);
    const cl = CL.get(t.k);
    markRead(id);
    pushRecent(id);
    const path = q.p ? PATHS.find((p) => String(p.n) === q.p) : null;
    let list = ORDER, suffix = '';
    if (path) { list = pathTerms(path); suffix = '?p=' + path.n; }
    const i = list.indexOf(id);
    const prev = i > 0 ? T.get(list[i - 1]) : null;
    const next = i >= 0 && i < list.length - 1 ? T.get(list[i + 1]) : null;
    const xs = t.x.map((x) => T.get(x)).filter(Boolean);
    const ps = t.p.map((x) => T.get(x)).filter(Boolean);
    return {
      title: `${t.h} — ${t.vi}`,
      label: t.cn || t.en,
      quick: true,
      html: `<header class="term-hero"><div class="wrap">
        <nav class="crumbs" aria-label="Đường dẫn"><a href="#/chu-de">Chủ đề</a><span aria-hidden="true">/</span><a href="#/chu-de/${pad2(t.c)}">N°${pad2(t.c)} ${esc(c.t)}</a><span aria-hidden="true">/</span><a href="#/chu-de/${pad2(t.c)}?t=${t.id}">${esc(t.k)} ${esc(cl ? cl.t : '')}</a></nav>
        <h1 class="term-hero__title" data-split>${esc(t.h)}</h1>
        <p class="term-hero__vi" data-reveal style="--d:.15s">${esc(t.hv || t.vi)}</p>
        <div class="term-hero__meta" data-reveal style="--d:.25s">${tierHTML(t.m)}${statusHTML(t.s)}<span class="mono">Xác minh ${esc(t.v)}</span><code>${esc(t.id)}</code>${t.ab ? `<span class="abbr-pill">${esc(t.ab)}</span>` : ''}</div>
      </div></header>
      <div class="wrap term-layout">
        <div>
          ${path ? `<div class="pathbar"><span><span class="mono muted">Lộ trình ${path.n}</span> · ${esc(path.t)}</span><span class="mono">${i + 1}/${list.length}</span><div class="meter meter--accent" style="flex-basis:100%"><i style="--p:${((i + 1) / list.length) * 100}%"></i></div></div>` : ''}
          <div class="fields" data-reveal>${e ? fieldsHTML(e, true) : '<p class="muted">Không tìm thấy nội dung mục.</p>'}</div>
        </div>
        <aside class="term-aside">
          <div class="aside-block"><h3>Thao tác</h3><div class="actions">
            <button class="mini-btn${SAVED.has(id) ? ' is-on' : ''}" data-act="save" data-id="${id}">${SAVED.has(id) ? ICON.markOn : ICON.mark}<span>${SAVED.has(id) ? 'Đã lưu' : 'Lưu'}</span></button>
            <button class="mini-btn" data-act="copy">${ICON.link}<span>Sao chép liên kết</span></button>
            <a class="mini-btn" href="#/studio/${id}">${ICON.film}<span>Tạo video</span></a>
            <a class="mini-btn" href="#/chu-de/${pad2(t.c)}?t=${id}">${ICON.book}<span>Đọc trong chương</span></a>
            <button class="mini-btn" data-act="size">Aa</button>
          </div></div>
          ${t.r.length || xs.length ? `<div class="aside-block"><h3>Bản đồ liên quan</h3><div class="graph">${graphSVG(t)}</div>
            <div class="legend"><span><i></i>Liên quan</span>${xs.length ? '<span><i class="x"></i>Dễ nhầm</span>' : ''}${ps.length ? '<span><i class="p"></i>Nên đọc trước</span>' : ''}</div></div>` : ''}
          ${xs.length ? `<div class="aside-block"><h3>Dễ nhầm với</h3><div class="confuse-list">${xs.map((x) => `<a href="#/t/${x.id}" data-t="${x.id}"><span>${esc(x.cn || x.en)}</span><small>${esc(x.vi)}</small></a>`).join('')}</div></div>` : ''}
          ${ps.length ? `<div class="aside-block"><h3>Nên đọc trước</h3><div class="chips">${ps.map((x) => `<a class="chip" href="#/t/${x.id}" data-t="${x.id}">${esc(x.cn || x.en)}</a>`).join('')}</div></div>` : ''}
        </aside>
      </div>
      <div class="wrap"><nav class="pager" aria-label="Mục trước và sau">
        ${prev ? `<a href="#/t/${prev.id}${suffix}" data-t="${prev.id}"><span class="mono muted">← Trước · ${path ? 'lộ trình' : 'theo chủ đề'}</span><b>${esc(prev.h)}</b></a>` : '<span></span>'}
        ${next ? `<a href="#/t/${next.id}${suffix}" data-t="${next.id}"><span class="mono muted">Tiếp · ${path ? 'lộ trình' : 'theo chủ đề'} →</span><b>${esc(next.h)}</b></a>` : `<a href="${path ? '#/lo-trinh' : '#/chu-de'}"><span class="mono muted">Hết →</span><b>${path ? 'Xong lộ trình' : 'Về danh sách chủ đề'}</b></a>`}
      </nav></div>`,
      mount(root, cleanup) {
        const onKey = (ev) => {
          if (ev.target.closest('input, textarea, select') || ev.metaKey || ev.ctrlKey || ev.altKey) return;
          if (ev.key === 'ArrowLeft' && prev) location.hash = `#/t/${prev.id}${suffix}`;
          if (ev.key === 'ArrowRight' && next) location.hash = `#/t/${next.id}${suffix}`;
        };
        window.addEventListener('keydown', onKey);
        cleanup.push(() => window.removeEventListener('keydown', onKey));
      },
    };
  }

  /* ---------- A → Z ---------- */
  const VI_ALPHA = ['A', 'Ă', 'Â', 'B', 'C', 'D', 'Đ', 'E', 'Ê', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'Ô', 'Ơ', 'P', 'Q', 'R', 'S', 'T', 'U', 'Ư', 'V', 'W', 'X', 'Y', 'Z'];
  const EN_ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').concat('#');
  const viLetter = (s) => {
    const c = String(s).trim().charAt(0).normalize('NFD').replace(/[̣̀́̃̉]/g, '').normalize('NFC').toUpperCase();
    return VI_ALPHA.includes(c) ? c : '#';
  };
  const collVI = new Intl.Collator('vi', { sensitivity: 'base' });
  const collEN = new Intl.Collator('en', { sensitivity: 'base', numeric: true });

  function viewAZ(q) {
    let lang = q.lang || store.get('azLang', 'en');
    let tier = q.m ? +q.m : 0;
    let chap = q.c ? +q.c : 0;
    let status = q.s || '';
    const opts = IDX.chapters.map((c) => `<option value="${c.n}">${pad2(c.n)} · ${esc(c.t)}</option>`).join('');
    const listHTML = () => {
      let rows = [];
      IDX.terms.forEach((t) => {
        if (tier && t.m !== tier) return;
        if (chap && t.c !== chap) return;
        if (status && t.s !== status) return;
        if (lang === 'en') rows.push({ key: t.en, t, title: t.en + (t.ab && !t.en.includes(t.ab) ? ` (${t.ab})` : ''), sub: t.vi });
        else {
          rows.push({ key: t.vi, t, title: t.vi, sub: t.en });
          t.alt.forEach((a) => rows.push({ key: a, t, title: a, sub: `→ ${t.vi}`, alt: true }));
        }
      });
      const coll = lang === 'en' ? collEN : collVI;
      rows.sort((a, b) => coll.compare(a.key, b.key));
      const groups = new Map();
      rows.forEach((r) => {
        const L = lang === 'en' ? (/[a-z]/i.test(r.key[0]) ? r.key[0].toUpperCase() : '#') : viLetter(r.key);
        if (!groups.has(L)) groups.set(L, []);
        groups.get(L).push(r);
      });
      const alpha = lang === 'en' ? EN_ALPHA : VI_ALPHA.concat('#');
      const letters = alpha.map((L) => `<a href="#az-${encodeURIComponent(L)}" data-letter="${esc(L)}" class="${groups.has(L) ? '' : 'is-empty'}">${esc(L)}</a>`).join('');
      const body = alpha.filter((L) => groups.has(L)).map((L) => `<section class="az-group" id="az-${encodeURIComponent(L)}" data-letter="${esc(L)}">
        <div class="az-letter">${esc(L)}</div>
        <ul class="az-list">${groups.get(L).map((r) => `<li class="az-item"><a href="#/t/${r.t.id}" data-t="${r.t.id}">
          <span class="az-item__t"${r.alt ? ' style="font-weight:400"' : ''}>${esc(r.title)}</span>
          <span class="az-item__m">${r.alt ? '' : `<span class="mono">${pad2(r.t.c)}</span>${tierHTML(r.t.m).replace(/Mức \d<\/span>$/, '</span>')}`}</span>
          <span class="az-item__s">${esc(r.sub)}</span></a></li>`).join('')}</ul></section>`).join('');
      return { letters, body: body || '<div class="az-empty">Không có mục nào khớp bộ lọc.</div>', count: rows.filter((r) => !r.alt).length };
    };
    const first = listHTML();
    return {
      title: 'A → Z',
      label: 'A → Z',
      html: pageHero({ crumbs: [['Trang chủ', '#/'], ['A → Z']], kicker: 'Chỉ mục Anh — Việt và Việt — Anh', title: 'A <em>→</em> Z', lead: 'Cho người muốn tra như một cuốn từ điển bình thường. Chế độ Việt — Anh có cả các tên khác của thuật ngữ.' })
        + `<div class="az-controls"><div class="wrap">
          <div class="az-row">
            <div class="seg" role="group" aria-label="Thứ tự"><button data-lang="en" aria-pressed="${lang === 'en'}">Anh → Việt</button><button data-lang="vi" aria-pressed="${lang === 'vi'}">Việt → Anh</button></div>
            <div class="chips">
              <button class="chip" data-tier="0" aria-pressed="${!tier}">Mọi mức</button>
              <button class="chip" data-tier="1" aria-pressed="${tier === 1}">Mức 1 <small>${ST.tiers[0]}</small></button>
              <button class="chip" data-tier="2" aria-pressed="${tier === 2}">Mức 2 <small>${ST.tiers[1]}</small></button>
              <button class="chip" data-tier="3" aria-pressed="${tier === 3}">Mức 3 <small>${ST.tiers[2]}</small></button>
              <select class="select" data-chap aria-label="Lọc theo chương"><option value="0">Mọi chương</option>${opts}</select>
              <select class="select" data-status aria-label="Lọc theo trạng thái"><option value="">Mọi trạng thái</option><option value="dang-bien-doi">Đang biến đổi</option><option value="on-dinh">Ổn định</option><option value="lich-su">Lịch sử</option></select>
            </div>
            <span class="mono muted" data-az-count>${first.count} mục</span>
          </div>
          <nav class="letters" data-letters aria-label="Chữ cái">${first.letters}</nav>
        </div></div>
        <div class="wrap" data-az-body style="padding-bottom:80px">${first.body}</div>`,
      mount(root, cleanup) {
        const sel = $('[data-chap]', root); sel.value = String(chap);
        const sst = $('[data-status]', root); sst.value = status;
        let io = null;
        const ctl = $('.az-controls', root);
        const setH = () => root.style.setProperty('--azc', ctl.offsetHeight + 'px');
        setH();
        window.addEventListener('resize', setH);
        cleanup.push(() => window.removeEventListener('resize', setH));
        const spy = () => {
          if (io) io.disconnect();
          io = new IntersectionObserver((es) => es.forEach((en) => {
            if (en.isIntersecting) { $$('[data-letters] a', root).forEach((a) => a.classList.toggle('is-active', a.dataset.letter === en.target.dataset.letter)); }
          }), { rootMargin: `-${ctl.offsetHeight + 70}px 0px -55% 0px` });
          $$('.az-group', root).forEach((g) => io.observe(g));
        };
        const rerender = () => {
          const r = listHTML();
          $('[data-letters]', root).innerHTML = r.letters;
          $('[data-az-body]', root).innerHTML = r.body;
          $('[data-az-count]', root).textContent = r.count + ' mục';
          bindLetters();
          spy();
        };
        const bindLetters = () => $$('[data-letters] a', root).forEach((a) => a.addEventListener('click', (e) => {
          e.preventDefault();
          const el = document.getElementById(a.getAttribute('href').slice(1));
          if (el) el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth' });
        }));
        bindLetters();
        spy();
        cleanup.push(() => io && io.disconnect());
        $$('[data-lang]', root).forEach((b) => b.addEventListener('click', () => { lang = b.dataset.lang; store.set('azLang', lang); $$('[data-lang]', root).forEach((x) => x.setAttribute('aria-pressed', String(x === b))); rerender(); }));
        $$('[data-tier]', root).forEach((b) => b.addEventListener('click', () => { tier = +b.dataset.tier; $$('[data-tier]', root).forEach((x) => x.setAttribute('aria-pressed', String(x === b))); rerender(); }));
        sel.addEventListener('change', () => { chap = +sel.value; rerender(); });
        sst.addEventListener('change', () => { status = sst.value; rerender(); });
      },
    };
  }

  /* ---------- Lộ trình ---------- */
  function viewPaths() {
    return {
      title: 'Lộ trình đọc',
      label: 'Lộ trình',
      html: pageHero({ crumbs: [['Trang chủ', '#/'], ['Lộ trình']], kicker: 'Chương 0 · mục 0.3', title: 'Ba <em>lộ trình</em>', lead: 'Muốn học theo chủ đề nhưng chưa biết bắt đầu từ đâu? Chọn một lộ trình. Website ghi nhớ các mục bạn đã đọc ngay trên trình duyệt này.' })
        + `<section class="section" style="padding-top:48px"><div class="wrap"><div class="paths">${PATHS.map(pathCardHTML).join('')}</div></div></section>`,
    };
  }

  function viewPath(nStr) {
    const p = PATHS.find((x) => String(x.n) === nStr);
    if (!p) return viewNotFound();
    const ids = pathTerms(p);
    const nextId = ids.find((id) => !READ.has(id)) || ids[0];
    const done = ids.filter((id) => READ.has(id)).length;
    return {
      title: p.t,
      label: p.t,
      html: pageHero({ crumbs: [['Trang chủ', '#/'], ['Lộ trình', '#/lo-trinh'], [p.t]], kicker: `Lộ trình ${p.n} · ${ids.length} mục · ${esc(p.who)}`, title: esc(p.t).replace(/ và /, ' <em>và</em> '), lead: esc(p.d),
        right: `<a class="btn" href="#/t/${nextId}?p=${p.n}">${done ? 'Đọc tiếp' : 'Bắt đầu'} ${ICON.arrow}</a>` })
        + `<section class="section" style="padding-top:40px"><div class="wrap">
          <div class="cover__foot" style="margin-bottom:8px"><span>Tiến độ</span><span>${done}/${ids.length}</span></div><div class="meter meter--accent" style="margin-bottom:40px"><i style="--p:${(done / ids.length) * 100}%"></i></div>
          <div class="steps">${p.steps.map((s, i) => {
            const list = ORDER.filter((id) => { const t = T.get(id); return t.c === s.c && (!s.m || t.m <= s.m); });
            const d = list.filter((id) => READ.has(id)).length;
            return `<div class="step" data-reveal><div class="step__n">${i + 1}</div>
              <div><div class="step__t"><small>${esc(stepLabel(s))} · ${d}/${list.length}</small>${esc(CH.get(s.c).t)}</div>
              <div class="chips" style="margin-top:18px">${list.map((id) => { const t = T.get(id); return `<a class="chip${READ.has(id) ? ' is-on' : ''}" href="#/t/${id}?p=${p.n}" data-t="${id}">${esc(t.cn && t.cn.length < 28 ? t.cn : t.en)}</a>`; }).join('')}</div></div>
              <div class="step__d">${esc(CH.get(s.c).lead)}</div></div>`;
          }).join('')}</div></div></section>`,
    };
  }

  /* ---------- Cặp dễ nhầm ---------- */
  async function viewPairs() {
    const x = await loadExtra();
    const items = x.pairs.items;
    return {
      title: 'Các cặp dễ nhầm',
      label: 'Dễ nhầm',
      html: pageHero({ crumbs: [['Trang chủ', '#/'], ['Dễ nhầm']], kicker: `Phụ lục 93 · ${items.length} cặp`, title: 'Dễ <em>nhầm</em>', lead: 'Mỗi cặp nêu một điểm khác chính, lấy từ trường Phân biệt của các mục từ. Đọc 2 mục chính để biết định nghĩa đầy đủ.' })
        + `<div class="az-controls"><div class="wrap"><div class="az-row">
            <input class="select" style="flex:1;min-width:200px;background-image:none;padding-right:12px" type="search" data-pf placeholder="Lọc theo thuật ngữ, ví dụ: agent, RAG, ảo giác…" aria-label="Lọc cặp">
            <select class="select" data-pc aria-label="Lọc theo chương"><option value="0">Mọi chương</option>${IDX.chapters.map((c) => `<option value="${c.n}">${pad2(c.n)} · ${esc(c.t)}</option>`).join('')}</select>
            <span class="mono muted" data-pn>${items.length} cặp</span></div></div></div>
        <section class="section" style="padding-top:36px"><div class="wrap"><div class="versus-grid" data-pl></div></div></section>`,
      mount(root) {
        const box = $('[data-pl]', root), f = $('[data-pf]', root), c = $('[data-pc]', root), n = $('[data-pn]', root);
        const draw = () => {
          const q = norm(f.value), ch = +c.value;
          const list = items.filter((p) => {
            const a = T.get(p.a), b = T.get(p.b);
            if (ch && a.c !== ch && b.c !== ch) return false;
            if (!q) return true;
            return [a.en, a.vi, a.cn, a.ab, b.en, b.vi, b.cn, b.ab].some((s) => norm(s).includes(q));
          });
          n.textContent = list.length + ' cặp';
          box.innerHTML = list.length ? list.map((p, i) => versusHTML(p, i)).join('') : '<div class="az-empty" style="grid-column:1/-1">Không có cặp nào khớp.</div>';
          enhance(box);
        };
        f.addEventListener('input', draw);
        c.addEventListener('change', draw);
        draw();
      },
    };
  }

  /* ---------- Tên riêng ---------- */
  async function viewNames(focus) {
    const x = await loadExtra();
    const { classes, items, intro } = x.names;
    return {
      title: 'Tên riêng',
      label: 'Tên riêng',
      html: pageHero({ crumbs: [['Trang chủ', '#/'], ['Tên riêng']], kicker: `Phụ lục 90 · ${items.length} tên · 9 lớp`, title: 'Tên <em>riêng</em>', lead: 'Hãng, họ mô hình, ứng dụng, giao thức, benchmark, khung an toàn, bài báo gốc, kịch bản và tổ chức. Phụ lục giúp nhận ra loại của một tên; không xếp hạng, không so sánh.' })
        + `<div class="az-controls"><div class="wrap"><div class="chips" data-cls>
            <button class="chip" data-k="" aria-pressed="true">Tất cả <small>${items.length}</small></button>
            ${classes.map((c) => `<button class="chip" data-k="${c.k}" aria-pressed="false">${esc(c.t)} <small>${items.filter((i) => i.cls === c.k).length}</small></button>`).join('')}
          </div></div></div>
        <section class="section" style="padding-top:36px"><div class="wrap">
          <div class="prose" style="margin-bottom:36px;max-width:80ch">${intro}</div>
          <div class="names-grid">${items.map((n) => `<article class="name-card" id="n-${n.id}" data-cls="${n.cls}">
            <span class="mono">Lớp ${n.cls} · ${esc((classes.find((c) => c.k === n.cls) || {}).t)} · xác minh ${esc(n.v)}</span>
            <h3>${esc(n.name)}</h3>${n.h}</article>`).join('')}</div>
        </div></section>`,
      mount(root) {
        $$('[data-cls] .chip', root).forEach((b) => b.addEventListener('click', () => {
          $$('[data-cls] .chip', root).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
          $$('.name-card', root).forEach((c) => { c.hidden = !!b.dataset.k && c.dataset.cls !== b.dataset.k; });
        }));
        if (focus) {
          const el = document.getElementById('n-' + focus);
          if (el) setTimeout(() => { el.scrollIntoView({ block: 'center' }); el.classList.add('flash-hl'); }, 80);
        }
      },
    };
  }

  /* ---------- Dòng thời gian ---------- */
  async function viewTimeline() {
    const x = await loadExtra();
    const { years, src, intro } = x.timeline;
    return {
      title: 'Dòng thời gian 2012–2026',
      label: '2012 — 2026',
      html: pageHero({ crumbs: [['Trang chủ', '#/'], ['Dòng thời gian']], kicker: `Phụ lục 91 · ${ST.events} mốc`, title: '2012 <em>—</em> 2026', lead: 'Các mốc kỹ thuật, sản phẩm và văn bản pháp luật có ảnh hưởng tới thuật ngữ trong sách. Rê chuột lên mã nguồn để xem tài liệu gốc.' })
        + `<nav class="year-nav" aria-label="Năm"><div class="wrap">${years.map((y) => `<a href="#y-${y.y}" data-y="${y.y}">${y.y}</a>`).join('')}</div></nav>
        <div class="wrap timeline">
          <div class="prose" style="max-width:80ch;margin-bottom:24px">${intro}</div>
          ${years.map((y) => `<section class="tl-year" id="y-${y.y}" data-y="${y.y}"><div class="tl-year__y">${String(y.y).slice(0, 2)}<em>${String(y.y).slice(2)}</em></div>
            <div>${y.ev.map((ev, i) => `<div class="tl-ev" data-reveal style="--d:${Math.min(i, 6) * 0.05}s"><div class="tl-ev__d">${esc(ev.date)}</div>
              <p>${ev.h}${ev.src.map((s) => `<span class="src" title="${esc((src[s] || '').replace(/<[^>]+>/g, ''))}">${s}</span>`).join('')}</p></div>`).join('')}</div></section>`).join('')}
        </div>`,
      mount(root, cleanup) {
        $$('.year-nav a', root).forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); const el = document.getElementById('y-' + a.dataset.y); if (el) el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth' }); }));
        const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) $$('.year-nav a', root).forEach((a) => a.classList.toggle('is-active', a.dataset.y === en.target.dataset.y)); }), { rootMargin: '-30% 0px -60% 0px' });
        $$('.tl-year', root).forEach((s) => io.observe(s));
        cleanup.push(() => io.disconnect());
      },
    };
  }

  /* ---------- Viết tắt ---------- */
  function viewAbbr() {
    const rows = IDX.terms.filter((t) => t.ab).sort((a, b) => collEN.compare(a.ab, b.ab));
    return {
      title: 'Bảng viết tắt',
      label: 'Viết tắt',
      html: pageHero({ crumbs: [['Trang chủ', '#/'], ['Viết tắt']], kicker: `Phụ lục 92 · ${rows.length} chữ viết tắt`, title: 'Viết <em>tắt</em>', lead: 'Các chữ viết tắt có mục từ trong sách.' })
        + `<section class="section" style="padding-top:40px"><div class="wrap"><div class="table-wrap"><table>
          <thead><tr><th>Viết tắt</th><th>Dạng đầy đủ</th><th>Tiếng Việt</th><th>Chương</th></tr></thead>
          <tbody>${rows.map((t) => `<tr><td><a href="#/t/${t.id}" data-t="${t.id}"><b class="serif" style="font-size:1.25rem">${esc(t.ab)}</b></a></td><td>${esc(t.en)}</td><td>${esc(t.vi)}</td><td class="mono">${pad2(t.c)}</td></tr>`).join('')}</tbody>
        </table></div></div></section>`,
    };
  }

  /* ---------- Cách đọc (Chương 0) ---------- */
  function viewGuide() {
    return {
      title: 'Cách đọc từ điển này',
      label: 'Cách đọc',
      html: pageHero({ crumbs: [['Trang chủ', '#/'], ['Cách đọc']], kicker: 'Chương 0', title: 'Cách <em>đọc</em>', lead: 'Từ điển dành cho ai, một mục từ gồm những gì, ba mức và ba trạng thái, quy ước chính tả và khối cảnh báo.' })
        + `<section class="section" style="padding-top:40px"><div class="wrap"><div class="steps">${IDX.guide.map((s) => {
          const m = s.t.match(/^(\d+\.\d+)\s+(.*)$/);
          return `<div class="step" data-reveal style="grid-template-columns:120px minmax(0,1fr)"><div class="step__n">${m ? esc(m[1]) : ''}</div><div><div class="step__t" style="margin-bottom:16px">${esc(m ? m[2] : s.t)}</div><div class="prose" style="font-size:1rem">${s.h}</div></div></div>`;
        }).join('')}</div></div></section>`,
    };
  }

  /* ---------- Đã lưu và tiến độ ---------- */
  function viewSaved() {
    const saved = [...SAVED].map((id) => T.get(id)).filter(Boolean);
    const recent = store.get('recent', []).map((id) => T.get(id)).filter(Boolean);
    return {
      title: 'Đã lưu',
      label: 'Đã lưu',
      html: pageHero({ crumbs: [['Trang chủ', '#/'], ['Đã lưu']], kicker: 'Lưu trên trình duyệt này', title: 'Đã <em>lưu</em>', lead: `Bạn đã đọc ${READ.size}/${ST.terms} mục và lưu ${saved.length} mục. Dữ liệu chỉ nằm trên trình duyệt này, không gửi đi đâu.` })
        + `<section class="section" style="padding-top:40px"><div class="wrap">
          <div class="section-head"><h2 class="section-title" style="font-size:clamp(2rem,4vw,3.2rem)">Mục đã lưu</h2>${saved.length ? `<a class="btn btn--sm btn--ghost" href="#/hoc?deck=saved">${ICON.flip} Học các mục này</a>` : ''}</div>
          ${saved.length ? `<ul class="az-list" style="columns:2">${saved.map((t) => `<li class="az-item"><a href="#/t/${t.id}" data-t="${t.id}"><span class="az-item__t">${esc(t.h)}</span><span class="az-item__m"><span class="mono">${pad2(t.c)}</span></span><span class="az-item__s">${esc(t.vi)}</span></a></li>`).join('')}</ul>` : '<p class="muted">Chưa có mục nào. Bấm nút “Lưu” ở một mục từ để thêm vào đây.</p>'}
          ${recent.length ? `<h3 class="kicker" style="margin:56px 0 16px">Xem gần đây</h3><div class="chips">${recent.map((t) => `<a class="chip" href="#/t/${t.id}" data-t="${t.id}">${esc(t.cn || t.en)}</a>`).join('')}</div>` : ''}
          <h3 class="kicker" style="margin:56px 0 16px">Tiến độ theo chương</h3>
          <div style="display:grid;gap:14px;max-width:760px">${IDX.chapters.map((c) => { const r = c.cl.reduce((a, k) => a + k.ids.filter((id) => READ.has(id)).length, 0); return `<a href="#/chu-de/${pad2(c.n)}" style="text-decoration:none"><div class="cover__foot" style="margin-bottom:6px"><span>${pad2(c.n)} · ${esc(c.t)}</span><span>${r}/${c.count}</span></div><div class="meter"><i style="--p:${(r / c.count) * 100}%"></i></div></a>`; }).join('')}</div>
          <div style="margin-top:40px"><button class="btn btn--ghost btn--sm" data-act="reset">Xóa tiến độ đọc</button></div>
        </div></section>`,
    };
  }

  /* ---------- Học: thẻ ghi nhớ và trắc nghiệm ---------- */
  function viewLearn(q) {
    let mode = q.mode || 'flash';
    let deckKey = q.deck || (q.c ? 'c' + q.c : 'core');
    let deck = [], pos = 0, score = { ok: 0, total: 0 };
    const build = () => {
      let ids;
      if (deckKey === 'core') ids = ORDER.filter((id) => T.get(id).m === 1);
      else if (deckKey === 'saved') ids = [...SAVED];
      else if (deckKey === 'unread') ids = ORDER.filter((id) => !READ.has(id) && T.get(id).m <= 2);
      else if (deckKey === 'all') ids = ORDER.slice();
      else if (deckKey.startsWith('c')) ids = ORDER.filter((id) => T.get(id).c === +deckKey.slice(1));
      else ids = ORDER.filter((id) => T.get(id).m === 1);
      ids = ids.filter((id) => T.has(id));
      for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
      // mục chưa thuộc lên trước
      ids.sort((a, b) => LEARNED.has(a) - LEARNED.has(b));
      deck = ids.slice(0, 40);
      pos = 0;
      score = { ok: 0, total: 0 };
    };
    build();
    const deckOpts = [['core', `Mức 1 · ${ST.tiers[0]} từ cốt lõi`], ['unread', 'Mục Mức 1–2 chưa đọc'], ['saved', `Mục đã lưu (${SAVED.size})`], ['all', 'Toàn bộ sách']].concat(IDX.chapters.map((c) => ['c' + c.n, `Chương ${c.n} · ${c.t}`]));
    const mask = (t) => {
      let d = t.d;
      [t.cn, t.vi, t.en, t.ab].filter((s) => s && s.length > 1).sort((a, b) => b.length - a.length).forEach((s) => {
        d = d.replace(new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '▁▁▁');
      });
      return d;
    };
    const flashHTML = () => {
      if (!deck.length) return '<div class="empty"><h2>Bộ thẻ trống</h2><p class="muted">Chọn bộ thẻ khác ở bên trái.</p></div>';
      if (pos >= deck.length) return `<div class="empty"><h2>Xong ${deck.length} thẻ</h2><p class="muted">Bạn đã thuộc ${deck.filter((id) => LEARNED.has(id)).length}/${deck.length} thẻ của bộ này.</p><button class="btn" data-l="again">Học lại ${ICON.flip}</button></div>`;
      const t = T.get(deck[pos]);
      return `<div class="learn-progress"><span>Thẻ ${pos + 1}/${deck.length}</span><span>${LEARNED.has(t.id) ? 'Đã thuộc' : 'Chưa thuộc'}</span></div>
        <div class="meter meter--accent" style="margin-bottom:22px"><i style="--p:${(pos / deck.length) * 100}%"></i></div>
        <div class="flash" data-flash><div class="flash__card" tabindex="0" role="button" aria-label="Lật thẻ">
          <div class="flash__face"><div class="flash__hint"><span>N°${pad2(t.c)} · Mức ${t.m}</span><span>Bấm để lật</span></div><div class="flash__en">${esc(t.h)}</div><div class="flash__vi">${esc(t.hv || t.vi)}</div></div>
          <div class="flash__face flash__face--back"><div class="flash__hint"><span>${esc(t.cn || t.en)}</span><span>Định nghĩa</span></div><p class="flash__def">${esc(t.d)}</p>${t.nm ? `<p class="flash__nm"><b>Không nên hiểu là:</b> ${esc(t.nm)}</p>` : ''}</div>
        </div></div>
        <div class="flash__ctrl"><button class="btn btn--ghost" data-l="no">Chưa nhớ</button><button class="btn btn--ghost" data-l="flip">${ICON.flip} Lật</button><button class="btn" data-l="yes">Đã nhớ</button><a class="btn btn--ghost" href="#/t/${t.id}">Đọc mục</a></div>
        <p class="mono muted" style="text-align:center;margin-top:16px">Phím tắt: Space lật · ← chưa nhớ · → đã nhớ</p>`;
    };
    let quiz = null;
    const newQuiz = () => {
      if (pos >= deck.length) { quiz = null; return; }
      const t = T.get(deck[pos]);
      const same = ORDER.filter((id) => id !== t.id && T.get(id).c === t.c);
      const pool = same.length >= 3 ? same : ORDER.filter((id) => id !== t.id);
      const opts = new Set([t.id]);
      while (opts.size < 4) opts.add(pool[Math.floor(Math.random() * pool.length)]);
      quiz = { t, opts: [...opts].sort(() => Math.random() - 0.5), answered: false };
    };
    const quizHTML = () => {
      if (!deck.length) return '<div class="empty"><h2>Bộ câu hỏi trống</h2></div>';
      if (!quiz) return `<div class="empty"><h2>${score.ok}/${score.total} câu đúng</h2><p class="muted">${score.ok === score.total ? 'Tuyệt đối.' : 'Đọc lại các mục sai rồi thử lần nữa.'}</p><button class="btn" data-l="again">Làm lại ${ICON.flip}</button></div>`;
      return `<div class="quiz__score"><span>Câu <b>${pos + 1}</b>/${deck.length}</span><span>Đúng <b>${score.ok}</b></span></div>
        <div class="kicker" style="margin-bottom:14px">Định nghĩa này là của thuật ngữ nào?</div>
        <p class="quiz__q">${esc(mask(quiz.t))}</p>
        <div class="quiz__opts">${quiz.opts.map((id, i) => { const o = T.get(id); return `<button class="quiz__opt" data-opt="${id}"><span class="mono muted">${'ABCD'[i]}</span><b>${esc(o.cn || o.en)}</b><small>${esc(o.vi)}</small></button>`; }).join('')}</div>
        <div class="flash__ctrl" data-after hidden><a class="btn btn--ghost" href="#/t/${quiz.t.id}">Đọc mục ${esc(quiz.t.cn || quiz.t.en)}</a><button class="btn" data-l="next">Câu tiếp ${ICON.arrow}</button></div>`;
    };
    return {
      title: 'Học',
      label: 'Học',
      html: pageHero({ crumbs: [['Trang chủ', '#/'], ['Học']], kicker: 'Thẻ ghi nhớ · Trắc nghiệm', title: 'Học <em>nhanh</em>', lead: 'Ôn thuật ngữ bằng thẻ lật hai mặt hoặc trắc nghiệm 4 lựa chọn. Thẻ đã thuộc được ghi nhớ trên trình duyệt này.' })
        + `<div class="wrap learn-grid">
          <aside class="learn-side">
            <div><h3>Chế độ</h3><div class="seg" role="group"><button data-mode="flash" aria-pressed="${mode === 'flash'}">Thẻ ghi nhớ</button><button data-mode="quiz" aria-pressed="${mode === 'quiz'}">Trắc nghiệm</button></div></div>
            <div><h3>Bộ thẻ</h3><select class="select" style="width:100%" data-deck aria-label="Bộ thẻ">${deckOpts.map(([k, l]) => `<option value="${k}">${esc(l)}</option>`).join('')}</select></div>
            <div><h3>Đã thuộc</h3><div class="stat__n" style="font-size:3rem" data-learned>${LEARNED.size}</div><div class="mono muted">trên ${ST.terms} mục</div></div>
          </aside>
          <div data-stage></div>
        </div>`,
      mount(root, cleanup) {
        const stage = $('[data-stage]', root);
        $('[data-deck]', root).value = deckKey;
        const draw = () => {
          const had = document.activeElement && stage.contains(document.activeElement) ? (document.activeElement.dataset.l || 'card') : null;
          if (mode === 'quiz') { stage.innerHTML = quizHTML(); }
          else { stage.innerHTML = flashHTML(); }
          $('[data-learned]', root).textContent = LEARNED.size;
          if (had) { const el = $(`[data-l="${had}"]`, stage) || $('.flash__card, [data-opt], [data-l]', stage); if (el) el.focus({ preventScroll: true }); }
        };
        const learned = (id, yes) => { if (yes) LEARNED.add(id); else LEARNED.delete(id); store.set('learned', [...LEARNED]); };
        const act = (k) => {
          if (k === 'again') { build(); if (mode === 'quiz') newQuiz(); draw(); return; }
          if (mode === 'flash') {
            const f = $('[data-flash]', stage);
            if (k === 'flip' && f) { f.classList.toggle('is-flipped'); return; }
            if ((k === 'yes' || k === 'no') && pos < deck.length) { learned(deck[pos], k === 'yes'); pos++; draw(); }
          } else if (k === 'next') { pos++; newQuiz(); draw(); }
        };
        stage.addEventListener('click', (e) => {
          const b = e.target.closest('[data-l]');
          if (b) { act(b.dataset.l); return; }
          if (e.target.closest('.flash__card')) { act('flip'); return; }
          const o = e.target.closest('[data-opt]');
          if (o && quiz && !quiz.answered) {
            quiz.answered = true;
            const ok = o.dataset.opt === quiz.t.id;
            score.total++;
            if (ok) { score.ok++; learned(quiz.t.id, true); }
            $$('[data-opt]', stage).forEach((x) => { if (x.dataset.opt === quiz.t.id) x.classList.add('is-right'); else if (x === o) x.classList.add('is-wrong'); x.disabled = true; });
            $('[data-after]', stage).hidden = false;
            $('.quiz__score', stage).innerHTML = `<span>Câu <b>${pos + 1}</b>/${deck.length}</span><span>Đúng <b>${score.ok}</b></span>`;
          }
        });
        const onKey = (e) => {
          if (e.target.closest('input, select, textarea')) return;
          if (mode === 'flash') {
            if (e.key === ' ' && !e.target.closest('button, a, summary')) { e.preventDefault(); act('flip'); }
            if (e.key === 'ArrowRight') act('yes');
            if (e.key === 'ArrowLeft') act('no');
          } else if (e.key === 'Enter' && quiz && quiz.answered) act('next');
        };
        window.addEventListener('keydown', onKey);
        cleanup.push(() => window.removeEventListener('keydown', onKey));
        $$('[data-mode]', root).forEach((b) => b.addEventListener('click', () => {
          mode = b.dataset.mode;
          $$('[data-mode]', root).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
          build(); if (mode === 'quiz') newQuiz(); draw();
        }));
        $('[data-deck]', root).addEventListener('change', (e) => { deckKey = e.target.value; build(); if (mode === 'quiz') newQuiz(); draw(); });
        if (mode === 'quiz') newQuiz();
        draw();
      },
    };
  }

  /* ---------- Studio video ---------- */
  function viewStudio(id) {
    let term = id && T.get(id) ? T.get(id) : null;
    let comp = term ? 'reel' : 'teaser';
    let fmt = store.get('fmt', '916');
    const codeSample = `<span class="c">// Một video = một hàm vẽ theo thời gian t (giây).</span>
<span class="c">// Cùng t luôn cho cùng khung hình — giống seek(t) của HyperFrames.</span>
<span class="k">const</span> video = sequence([
  { len: <span class="s">3.0</span>, bg: <span class="s">'ink'</span>, draw(ctx, t) {
      <span class="c">// chữ "trồi lên" trong 0,8 giây đầu</span>
      <span class="k">const</span> p = interpolate(t, [<span class="s">0</span>, <span class="s">0.8</span>], [<span class="s">0</span>, <span class="s">1</span>], E.out5)
      rise(ctx, term.en, x, y, size, p)
  }},
  { len: <span class="s">5.0</span>, bg: <span class="s">'paper'</span>, draw(ctx, t) { <span class="c">/* định nghĩa */</span> } },
])

<span class="c">// Xem trước: gọi draw(t) ở mỗi khung hình của trình duyệt.</span>
<span class="c">// Xuất MP4: dựng lần lượt từng khung hình rồi mã hóa.</span>
<span class="k">for</span> (<span class="k">let</span> i = <span class="s">0</span>; i &lt; N; i++) {
  video.draw(ctx, i / <span class="s">30</span>, W, H)
  encoder.encode(<span class="k">new</span> VideoFrame(canvas, { timestamp }))
}`;
    return {
      title: 'Studio video',
      label: 'Studio',
      html: pageHero({ crumbs: [['Trang chủ', '#/'], ['Studio']], kicker: 'Thủ thuật Claude Code: video viết bằng code', title: 'Studio <em>video</em>', lead: `Mỗi thuật ngữ là một video ngắn, dựng hoàn toàn bằng code. Chọn thuật ngữ, chọn khổ hình, bấm “Xuất MP4” — trình duyệt dựng từng khung hình rồi đóng gói thành file video. Không cần máy chủ, không cần phần mềm dựng phim.` })
        + `<div class="wrap studio">
          <div class="stage"><div data-studio-film></div></div>
          <div class="panel">
            <div><h3>Loại video</h3><div class="seg" role="group"><button data-comp="reel" aria-pressed="${comp === 'reel'}">Reel một thuật ngữ</button><button data-comp="teaser" aria-pressed="${comp === 'teaser'}">Giới thiệu sách</button></div></div>
            <div data-pick-wrap ${comp === 'teaser' ? 'hidden' : ''}><h3>Thuật ngữ</h3><div class="term-pick"><input type="search" data-pick placeholder="Gõ để tìm: agent, RAG, token…" value="${term ? esc(term.h) : ''}" aria-label="Chọn thuật ngữ"><div class="term-pick__list" data-pick-list></div></div>
              <div class="chips" style="margin-top:10px"><button class="chip" data-act-studio="random">${ICON.shuffle.replace('<svg', '<svg width="14" height="14"')} Ngẫu nhiên</button>${term ? `<a class="chip" href="#/t/${term.id}" data-t="${term.id}">Mở mục</a>` : ''}</div></div>
            <div><h3>Khổ hình</h3><div class="seg" role="group">
              <button data-fmt="916" aria-pressed="${fmt === '916'}">9:16 Reel</button><button data-fmt="11" aria-pressed="${fmt === '11'}">1:1</button><button data-fmt="169" aria-pressed="${fmt === '169'}">16:9</button></div></div>
            <div class="export-box">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap"><b data-dur>—</b><span class="mono muted" data-res></span></div>
              <button class="btn" data-export>${ICON.download} Xuất MP4</button>
              <div class="meter meter--accent" data-meter hidden><i style="--p:0%"></i></div>
              <p class="export-note" data-note>Trình duyệt có WebCodecs (Chrome, Edge và bản mới của Safari, Firefox) xuất MP4 từng khung hình, nhanh hơn thời gian thực. Trình duyệt khác ghi WebM theo thời gian thực.</p>
            </div>
            <details><summary class="mono" style="cursor:pointer">Xem code tạo video</summary><pre class="code" style="margin-top:12px">${codeSample}</pre></details>
          </div>
        </div>
        <section class="section inverse"><div class="wrap">
          <div class="section-head"><div><div class="kicker">Vì sao làm được</div><h2 class="section-title" data-split>Video là <em>code</em>.</h2></div></div>
          <div class="spread">
            <p class="spread__def" data-reveal>Cộng đồng đang dùng Claude Code để làm video bằng code. Remotion biến video thành component React. HyperFrames — mã nguồn mở của HeyGen — biến một trang HTML thành file MP4. Bí quyết chung: mỗi khung hình là một hàm của thời gian. Muốn khung hình ở giây t thì gọi seek(t). Vì vậy AI viết video được như viết một trang web.</p>
            <div data-reveal style="--d:.15s"><p class="muted">Website này áp dụng đúng nguyên lý đó, chạy ngay trong trình duyệt: ${fmtN(ST.terms)} thuật ngữ, mỗi thuật ngữ thành một video dọc 9:16 để đăng mạng xã hội. Muốn dựng video phức tạp hơn bằng Claude Code, xem:</p>
              <div class="chips" style="margin-top:14px"><a class="chip" href="https://www.remotion.dev/docs/ai/claude-code-plugin" target="_blank" rel="noopener">Remotion · plugin Claude Code ↗</a><a class="chip" href="https://hyperframes.heygen.com/" target="_blank" rel="noopener">HyperFrames (HeyGen) ↗</a></div></div>
          </div>
        </div></section>`,
      mount(root, cleanup) {
        const host = $('[data-studio-film]', root);
        const make = () => (comp === 'reel' && term ? TDFilm.reel(term, filmData()) : TDFilm.teaser(filmData()));
        const player = new TDFilm.Player(host, { comp: make(), fmt, autoplay: true, tag: comp === 'reel' ? 'Reel' : 'Teaser' });
        cleanup.push(() => player.destroy());
        const info = () => {
          $('[data-dur]', root).textContent = `${player.comp.duration.toFixed(1).replace('.', ',')} giây · 30 khung hình/giây`;
          const [w, h] = TDFilm.FORMATS[fmt];
          $('[data-res]', root).textContent = `${w} × ${h}`;
        };
        info();
        const refresh = () => { player.setComp(make()); player.play(); info(); const tag = $('.film__tag', host); if (tag) tag.textContent = comp === 'reel' ? 'Reel' : 'Teaser'; };
        $$('[data-comp]', root).forEach((b) => b.addEventListener('click', () => {
          comp = b.dataset.comp;
          if (comp === 'reel' && !term) term = termOfDay();
          $$('[data-comp]', root).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
          $('[data-pick-wrap]', root).hidden = comp !== 'reel';
          if (term) $('[data-pick]', root).value = term.h;
          refresh();
        }));
        $$('[data-fmt]', root).forEach((b) => b.addEventListener('click', () => {
          fmt = b.dataset.fmt; store.set('fmt', fmt);
          $$('[data-fmt]', root).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
          player.setFormat(fmt); info();
        }));
        const pick = $('[data-pick]', root), list = $('[data-pick-list]', root);
        const choose = (t) => { term = t; pick.value = t.h; list.classList.remove('is-open'); history.replaceState(null, '', '#/studio/' + t.id); refresh(); };
        pick.addEventListener('input', () => {
          const r = searchTerms(pick.value, { limit: 12 });
          list.innerHTML = r.map(({ t }) => `<button type="button" data-pid="${t.id}">${hl(t.h, pick.value)}<small>${esc(t.vi)}</small></button>`).join('');
          list.classList.toggle('is-open', r.length > 0);
        });
        pick.addEventListener('keydown', (e) => { if (e.key === 'Enter') { const b = $('button', list); if (b) choose(T.get(b.dataset.pid)); } });
        list.addEventListener('click', (e) => { const b = e.target.closest('[data-pid]'); if (b) choose(T.get(b.dataset.pid)); });
        const rnd = $('[data-act-studio="random"]', root);
        if (rnd) rnd.addEventListener('click', () => choose(T.get(ORDER[Math.floor(Math.random() * ORDER.length)])));
        const btn = $('[data-export]', root), meter = $('[data-meter]', root), note = $('[data-note]', root);
        btn.addEventListener('click', async () => {
          btn.disabled = true;
          meter.hidden = false;
          const label = btn.innerHTML;
          btn.innerHTML = 'Đang dựng khung hình…';
          player.pause();
          try {
            const c = make();
            const res = await TDFilm.exportVideo(c, fmt, { onProgress: (p) => meter.firstElementChild.style.setProperty('--p', (p * 100).toFixed(1) + '%') });
            const url = URL.createObjectURL(res.blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `tu-dien-ai-${comp === 'reel' && term ? term.id : 'gioi-thieu'}-${fmt}.${res.ext}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 60000);
            note.textContent = `Xong: ${(res.blob.size / 1048576).toFixed(1).replace('.', ',')} MB · ${res.ext.toUpperCase()} · ${res.how}.`;
            toast('Đã tạo video — kiểm tra thư mục Tải xuống');
          } catch (err) {
            console.error(err);
            note.textContent = 'Không xuất được video trên trình duyệt này: ' + (err && err.message ? err.message : err);
          } finally {
            btn.disabled = false;
            btn.innerHTML = label;
          }
        });
      },
    };
  }

  /* ---------- Tác giả ---------- */
  function monogramSVG() {
    let lines = '';
    for (let i = 0; i < 40; i++) lines += `<line x1="0" x2="400" y1="${i * 13}" y2="${i * 13 - 60}" stroke="#f3f1ec" stroke-width=".6" opacity=".25"/>`;
    return `<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${lines}
      <text x="22" y="330" font-family="Playfair Display, serif" font-weight="800" font-size="300" fill="#f3f1ec" letter-spacing="-18">H</text>
      <text x="170" y="460" font-family="Playfair Display, serif" font-style="italic" font-size="300" fill="none" stroke="#f3f1ec" stroke-width="1.5">T</text>
      <circle cx="350" cy="58" r="14" fill="var(--accent)"/>
      <text x="22" y="40" font-family="JetBrains Mono, monospace" font-size="12" fill="#f3f1ec" letter-spacing="2">TÁC GIẢ · N°01</text></svg>`;
  }

  function viewAuthor() {
    return {
      title: 'Tác giả — Hoàng Trần',
      label: 'Hoàng Trần',
      html: `<header class="author-hero"><div class="wrap">
          <div class="kicker" style="margin-bottom:22px">Tác giả · Người làm sách</div>
          <h1 class="author-name" data-split>Hoàng <em>Trần</em></h1>
          <div class="author-intro">
            <div class="monogram" data-reveal="clip">${monogramSVG()}</div>
            <div class="prose" data-reveal style="--d:.15s">
              <p>Hoàng Trần làm cuốn từ điển này trước hết cho chính mình: để đọc, để học, và để hiểu cho đúng những từ AI mà anh gặp mỗi ngày.</p>
              <p>Vì thế cuốn sách không xếp theo A → Z. Nó được thiết kế như một cuốn sách để học: ${ST.chapters} chủ đề, ${ST.clusters} cụm, khái niệm nền đứng trước khái niệm dẫn xuất, đọc từ đầu đến cuối vẫn trôi. Lý do rất đời thường: thật sự có ai đọc ngấu nghiến từ điển thường đâu.</p>
              <p>Dĩ nhiên, mục <a href="#/a-z">A → Z</a> vẫn ở đây cho ai muốn tra như một cuốn từ điển bình thường.</p>
              <div class="chips" style="margin-top:26px"><a class="btn" href="#/chu-de">Bắt đầu đọc ${ICON.arrow}</a><a class="btn btn--ghost" href="#/lo-trinh">Chọn lộ trình</a></div>
            </div>
          </div>
        </div></header>

        <section class="section inverse"><div class="wrap">
          <div class="section-head"><div><div class="kicker">Hậu trường</div><h2 class="section-title" data-split>Cuốn sách ra đời <em>thế nào</em>.</h2>
            <p class="section-sub" data-reveal>Bốn bước, từ một bản "bible" đến website bạn đang đọc.</p></div></div>
          <div class="steps">
            <div class="step" data-reveal><div class="step__n">01</div>
              <div><div class="step__t"><small>Bước 1 · Fable + Astra · max effort</small>Hai mô hình, một bible.</div>
                <p class="step__d" style="margin-top:14px">Anh dùng hai mô hình AI mạnh nhất hiện tại là Fable và Astra, ở mức nỗ lực cao nhất, để soạn "bible" cho cuốn sách: người đọc là ai, quy tắc viết, cấu trúc một mục từ, danh mục thuật ngữ, quy trình kiểm tra. Rồi anh tổng hợp hai bản thành một.</p>
                <div class="models"><span class="model-tag">Fable</span><span class="model-tag">Astra</span></div></div>
              <ul class="step__facts"><li><span>Bible hợp nhất</span><b>bản 0.2</b></li><li><span>Độ dài</span><b>hơn 17.000 chữ</b></li><li><span>Quy tắc viết</span><b>STE-VN</b></li></ul></div>
            <div class="step" data-reveal><div class="step__n">02</div>
              <div><div class="step__t"><small>Bước 2 · Claude Opus 5.5 · Claude Cowork</small>Viết cả cuốn sách trong một ngày.</div>
                <p class="step__d" style="margin-top:14px">Bible được giao cho Opus 5.5 chạy trên môi trường đám mây Claude Cowork. Trong một ngày, Opus 5.5 thu thập nguồn, viết ${ST.chapters} chương và các phụ lục bằng nhiều phiên chạy song song, rồi tự rà soát nhiều lượt và chạy công cụ kiểm tra câu chữ.</p>
                <div class="models"><span class="model-tag">Claude Opus 5.5</span><span class="model-tag">Claude Cowork</span></div></div>
              <ul class="step__facts"><li><span>Mục từ</span><b>${fmtN(ST.terms)}</b></li><li><span>Nguồn tham khảo</span><b>${fmtN(ST.sources)}</b></li><li><span>Phiên viết song song</span><b>15</b></li><li><span>Lượt rà soát · lỗi đã sửa</span><b>3 · 84</b></li></ul></div>
            <div class="step" data-reveal><div class="step__n">03</div>
              <div><div class="step__t"><small>Bước 3 · Claude Code</small>Từ file sách thành website.</div>
                <p class="step__d" style="margin-top:14px">Anh tải các file sách về máy và giao cho Claude Code. Claude Code đọc 12 chương Markdown, chuyển thành dữ liệu cho web, dựng giao diện, chuyển động, tìm kiếm tiếng Việt và studio video, ngay trên máy anh.</p>
                <div class="models"><span class="model-tag">Claude Code</span></div></div>
              <ul class="step__facts"><li><span>Framework</span><b>0</b></li><li><span>Cập nhật dữ liệu</span><b>1 lệnh</b></li><li><span>Video tạo được</span><b>${fmtN(ST.terms + 1)}</b></li></ul></div>
            <div class="step" data-reveal><div class="step__n">04</div>
              <div><div class="step__t"><small>Bước 4 · GitHub Pages</small>Đưa lên mạng.</div>
                <p class="step__d" style="margin-top:14px">Toàn bộ website là file tĩnh. Đẩy thư mục lên GitHub, bật GitHub Pages, và cuốn từ điển có mặt trên mạng.</p></div>
              <ul class="step__facts"><li><span>Máy chủ riêng</span><b>không cần</b></li><li><span>Chi phí</span><b>0 đồng</b></li></ul></div>
          </div>
        </div></section>

        <section class="section"><div class="wrap">
          <p class="bigquote" data-split>Với AI hôm nay, <em>ai cũng</em> có thể làm được.</p>
          <div class="prose" style="margin-top:40px" data-reveal>
            <p>Toàn bộ kỹ năng để làm cuốn sách này — viết bible, điều phối nhiều mô hình, chạy agent trên đám mây, dựng web bằng Claude Code — đều do anh tự mày mò và tìm hiểu.</p>
            <p>Anh hy vọng cuốn từ điển này sẽ giúp chính anh, và giúp mọi người, cùng phát triển hơn.</p>
          </div>
          <div class="quote-by" data-reveal><span class="kicker">Hoàng Trần</span></div>
        </div></section>

        <section class="section inverse" style="padding-top:0;padding-bottom:0"><div class="wrap" style="padding-top:clamp(64px,8vw,110px);padding-bottom:clamp(64px,8vw,110px)">
          <div class="spread">
            <div><div class="kicker" style="margin-bottom:18px">Thủ thuật</div><h2 class="section-title" data-split>Video viết bằng <em>code</em>.</h2></div>
            <div data-reveal><p class="spread__def">Claude Code có thể "code ra video": mỗi khung hình là một hàm của thời gian, nên viết video giống như viết web. Website này dùng thủ thuật đó để biến mỗi thuật ngữ thành một video dọc, xuất MP4 ngay trong trình duyệt.</p>
              <div class="spread__actions" style="margin-top:22px"><a class="btn btn--ghost" href="#/studio">${ICON.film} Mở Studio video</a></div></div>
          </div>
        </div></section>`,
    };
  }

  function viewNotFound(id) {
    if (typeof id !== 'string') id = '';
    const r = id ? searchTerms(id.replace(/-/g, ' '), { limit: 6 }) : [];
    return {
      title: 'Không tìm thấy',
      label: '404',
      html: `<div class="wrap empty" style="padding-top:calc(var(--header-h) + 100px)"><h2>Không tìm thấy trang.</h2>
        <p class="muted">${id ? `Không có mục “${esc(id)}”.` : 'Liên kết có thể đã đổi.'}</p>
        ${r.length ? `<div class="chips" style="justify-content:center;margin:20px 0">${r.map(({ t }) => `<a class="chip" href="#/t/${t.id}">${esc(t.cn || t.en)}</a>`).join('')}</div>` : ''}
        <a class="btn" href="#/">Về trang chủ</a></div>`,
    };
  }

  /* ================================================================
     5. Định tuyến và chuyển cảnh
     ================================================================ */
  const ROUTES = [
    [/^\/?$/, viewHome],
    [/^\/chu-de\/?$/, viewTopics],
    [/^\/chu-de\/(\d{1,2})$/, viewChapter],
    [/^\/t\/([\w.-]+)$/, viewTerm],
    [/^\/a-z$/, viewAZ],
    [/^\/lo-trinh$/, viewPaths],
    [/^\/lo-trinh\/(\d)$/, viewPath],
    [/^\/de-nham$/, viewPairs],
    [/^\/ten-rieng(?:\/([\w.-]+))?$/, viewNames],
    [/^\/dong-thoi-gian$/, viewTimeline],
    [/^\/viet-tat$/, viewAbbr],
    [/^\/hoc$/, viewLearn],
    [/^\/studio(?:\/([\w.-]+))?$/, viewStudio],
    [/^\/tac-gia$/, viewAuthor],
    [/^\/cach-doc$/, viewGuide],
    [/^\/da-luu$/, viewSaved],
  ];

  const viewEl = document.getElementById('view');
  const curtain = $('.curtain');
  let cleanup = [];
  let current = null;
  let navToken = 0;
  let saveT = null;
  let curtainDown = false;

  function parseHash() {
    let raw = (location.hash || '#/').slice(1);
    try { raw = decodeURIComponent(raw); } catch (e) { /* liên kết bị cắt cụt: giữ nguyên */ }
    const [path, qs] = raw.split('?');
    const q = {};
    (qs || '').split('&').filter(Boolean).forEach((kv) => { const [k, v] = kv.split('='); q[k] = v == null ? '' : v; });
    return { path: path.startsWith('/') ? path : '/' + path, q };
  }

  // Không bao giờ để chuyển trang bị treo: tab ẩn thì hoạt ảnh không chạy, nên luôn có hạn chờ.
  const settle = (anim, ms) => Promise.race([anim.finished.catch(() => {}), new Promise((r) => setTimeout(r, ms))]);
  async function animateCurtain(label, inPhase) {
    if (!curtain.animate) return;
    if (inPhase) {
      $('.curtain__label', curtain).innerHTML = `<span>${esc(label)}</span>`;
      const sp = $('.curtain__label span', curtain);
      sp.animate([{ transform: 'translateY(110%)' }, { transform: 'none' }], { duration: 650, easing: 'cubic-bezier(.2,.7,0,1)', delay: 120, fill: 'both' });
      await settle(curtain.animate([{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }], { duration: 520, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' }), 700);
    } else {
      await settle(curtain.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }], { duration: 640, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' }), 900);
    }
  }

  async function route() {
    const h = location.hash;
    if (h && !h.startsWith('#/')) {
      // neo nội trang (#view, #e-…, #az-…, #y-…): không phải một trang mới
      const el = document.getElementById(decodeURIComponent(h.slice(1)));
      if (current && el) {
        history.replaceState(history.state, '', current.hash);
        el.scrollIntoView({ block: 'start' });
        if (el.id === 'view') el.focus({ preventScroll: true });
        return;
      }
      history.replaceState(null, '', '#/');
    }
    clearTimeout(saveT);
    const savedY = history.state && typeof history.state.y === 'number' ? history.state.y : 0;
    const token = ++navToken;
    const { path, q } = parseHash();
    let view = viewNotFound, args = [];
    for (const [rx, fn] of ROUTES) { const m = path.match(rx); if (m) { view = fn; args = m.slice(1); break; } }
    const section = path.split('/')[1] || 'home';
    const first = !current;
    const sameSection = current && current.section === section;
    const useCurtain = !first && !reduced() && !sameSection && section !== 't' && !document.hidden;
    closePalette();
    closeMenu();
    hidePeek();

    let res;
    const work = (async () => { try { return await view(...args, q); } catch (e) { console.error(e); return { title: 'Lỗi', label: 'Lỗi', html: `<div class="wrap empty" style="padding-top:calc(var(--header-h) + 100px)"><h2>Không tải được nội dung.</h2><p class="muted">${esc(e.message)}</p><a class="btn" href="#/">Về trang chủ</a></div>` }; } })();
    if (useCurtain) {
      curtainDown = true;
      const r = await Promise.all([work, animateCurtain(guessLabel(section, args), true)]);
      res = r[0];
    } else {
      if (!first) { viewEl.classList.add('is-fading'); viewEl.style.transition = 'opacity .18s, transform .18s'; }
      res = await work;
      if (!first) await new Promise((r) => setTimeout(r, reduced() ? 0 : 150));
    }
    if (token !== navToken) return;

    cleanup.forEach((fn) => { try { fn(); } catch (e) { /* bỏ qua */ } });
    cleanup = [];
    viewEl.innerHTML = res.html;
    viewEl.classList.remove('is-fading');
    viewEl.style.transition = '';
    document.title = (res.title === 'Từ điển AI dễ hiểu' ? '' : res.title + ' — ') + 'Từ điển AI dễ hiểu';
    current = { path, section, hash: location.hash || '#/' };
    window.scrollTo(0, 0);
    if (!useCurtain && !first) { viewEl.classList.remove('is-entering'); void viewEl.offsetWidth; viewEl.classList.add('is-entering'); }
    if (res.mount) { try { res.mount(viewEl, cleanup); } catch (e) { console.error(e); } }
    enhance(viewEl);
    if (savedY && !q.t) window.scrollTo(0, savedY); // quay lại bằng nút Back: về đúng chỗ đang đọc
    setActiveNav(section);
    if (curtainDown) { curtainDown = false; animateCurtain('', false); }
    $('#view').focus({ preventScroll: true });
  }

  function guessLabel(section, args) {
    const map = { home: 'Từ điển AI', 'chu-de': args[0] ? 'N°' + pad2(args[0]) : 'Chủ đề', 'a-z': 'A → Z', 'lo-trinh': 'Lộ trình', 'de-nham': 'Dễ nhầm', 'ten-rieng': 'Tên riêng', 'dong-thoi-gian': '2012 — 2026', 'viet-tat': 'Viết tắt', hoc: 'Học', studio: 'Studio', 'tac-gia': 'Hoàng Trần', 'cach-doc': 'Cách đọc', 'da-luu': 'Đã lưu' };
    return map[section] || 'Từ điển AI';
  }

  function setActiveNav(section) {
    $$('.nav a, .menu nav a').forEach((a) => {
      const s = (a.getAttribute('href') || '').replace('#/', '').split('/')[0] || 'home';
      a.classList.toggle('is-active', s === section || (section === 't' && s === 'chu-de'));
    });
  }

  /* ================================================================
     6. Hiệu ứng: hiện dần, tách chữ, đếm số, cuộn ngang
     ================================================================ */
  let revealIO = null;
  function enhance(root) {
    $$('[data-split]:not(.split)', root).forEach((el) => {
      let i = 0;
      const walk = (node) => {
        Array.from(node.childNodes).forEach((n) => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
              const w = document.createElement('span');
              w.className = 'w';
              const s = document.createElement('span');
              s.style.setProperty('--i', i++);
              s.textContent = part;
              w.appendChild(s);
              frag.appendChild(w);
            });
            n.replaceWith(frag);
          } else if (n.nodeType === 1 && !n.classList.contains('w')) walk(n);
        });
      };
      walk(el);
      el.classList.add('split');
    });
    if (!revealIO) {
      revealIO = new IntersectionObserver((es) => es.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); revealIO.unobserve(en.target); }
      }), { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
    }
    $$('[data-reveal]:not(.in), .split:not(.in)', root).forEach((el) => revealIO.observe(el));

    $$('[data-count]', root).forEach((el) => {
      const target = +el.dataset.count;
      const io = new IntersectionObserver((es) => {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        if (reduced()) { el.textContent = fmtN(target); return; }
        const t0 = performance.now();
        const step = (now) => {
          const p = Math.min(1, (now - t0) / 1600);
          el.textContent = fmtN(Math.round(target * (1 - Math.pow(2, -10 * p))));
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = fmtN(target);
        };
        requestAnimationFrame(step);
      });
      io.observe(el);
    });

    $$('[data-hscroll]', root).forEach((sec) => setupHScroll(sec));
  }

  function setupHScroll(sec) {
    const track = $('.hscroll__track', sec);
    const sticky = $('.hscroll__sticky', sec);
    const native = () => innerWidth < 900 || reduced();
    let dist = 0;
    const measure = () => {
      if (native()) { sec.classList.add('is-native'); sec.style.height = ''; track.style.transform = ''; return; }
      sec.classList.remove('is-native');
      dist = Math.max(0, track.scrollWidth - innerWidth);
      sec.style.height = innerHeight + dist * 0.6 + 'px';
      onScroll();
    };
    const onScroll = () => {
      if (native() || !sec.isConnected) return;
      const r = sec.getBoundingClientRect();
      const total = sec.offsetHeight - innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      track.style.transform = `translate3d(${-p * dist}px,0,0)`;
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    cleanup.push(() => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', measure); });
    if (document.fonts) document.fonts.ready.then(measure);
    void sticky;
  }

  /* ================================================================
     7. Bảng tìm kiếm (phím / hoặc Ctrl+K)
     ================================================================ */
  const pal = $('.palette');
  const palInput = $('#pal-q');
  const palList = $('.palette__results');
  const palFull = $('#pal-full');
  let palSel = 0;
  let palItems = [];
  const PAGES = [
    ['Chủ đề', '#/chu-de', '12 chương theo chủ đề'], ['A → Z', '#/a-z', 'Chỉ mục Anh — Việt, Việt — Anh'], ['Lộ trình đọc', '#/lo-trinh', '3 lộ trình'],
    ['Dễ nhầm', '#/de-nham', 'Phụ lục 93'], ['Tên riêng', '#/ten-rieng', 'Phụ lục 90'], ['Dòng thời gian', '#/dong-thoi-gian', 'Phụ lục 91'],
    ['Viết tắt', '#/viet-tat', 'Phụ lục 92'], ['Học: thẻ và trắc nghiệm', '#/hoc', 'Ôn tập'], ['Studio video', '#/studio', 'Video viết bằng code'],
    ['Tác giả', '#/tac-gia', 'Hoàng Trần'], ['Cách đọc', '#/cach-doc', 'Chương 0'], ['Đã lưu', '#/da-luu', 'Mục đã lưu, tiến độ'],
  ];

  function openPalette(q = '') {
    pal.classList.add('is-open');
    pal.setAttribute('aria-hidden', 'false');
    palInput.value = q;
    renderPalette();
    document.documentElement.style.overflow = 'hidden';
    setTimeout(() => { palInput.focus(); const n = palInput.value.length; palInput.setSelectionRange(n, n); }, 10);
  }
  function closePalette() {
    if (!pal.classList.contains('is-open')) return;
    pal.classList.remove('is-open');
    pal.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
  }
  function renderPalette() {
    const q = palInput.value.trim();
    palItems = [];
    let html = '';
    if (!q) {
      const recent = store.get('recent', []).map((id) => T.get(id)).filter(Boolean);
      if (recent.length) {
        html += '<div class="res-group">Xem gần đây</div>';
        recent.forEach((t) => { palItems.push('#/t/' + t.id); html += resRow(t, '', palItems.length - 1); });
      }
      html += '<div class="res-group">Đi tới</div>';
      PAGES.forEach(([n, h, d]) => { palItems.push(h); html += `<a class="res" href="${h}" data-i="${palItems.length - 1}"><span class="res__t">${esc(n)}</span><span class="res__s">${esc(d)}</span></a>`; });
    } else {
      const full = palFull.checked;
      const r = searchTerms(q, { full, limit: 30 });
      if (r.length) {
        html += `<div class="res-group">Thuật ngữ · ${r.length}${r.length === 30 ? '+' : ''}</div>`;
        r.forEach(({ t }) => { palItems.push('#/t/' + t.id); html += resRow(t, q, palItems.length - 1, full); });
      }
      if (DATA.extra) {
        const nq = norm(q);
        const nm = DATA.extra.names.items.filter((n) => norm(n.name).includes(nq)).slice(0, 6);
        if (nm.length) {
          html += '<div class="res-group">Tên riêng</div>';
          nm.forEach((n) => { palItems.push('#/ten-rieng/' + n.id); html += `<a class="res" href="#/ten-rieng/${n.id}" data-i="${palItems.length - 1}"><span class="res__t">${hl(n.name, q)}</span><span class="res__m"><span class="mono">Lớp ${n.cls}</span></span><span class="res__d">${esc(n.d)}</span></a>`; });
        }
      }
      const pg = PAGES.filter(([n, , d]) => norm(n + ' ' + d).includes(norm(q)));
      if (pg.length) {
        html += '<div class="res-group">Trang</div>';
        pg.forEach(([n, h, d]) => { palItems.push(h); html += `<a class="res" href="${h}" data-i="${palItems.length - 1}"><span class="res__t">${hl(n, q)}</span><span class="res__s">${esc(d)}</span></a>`; });
      }
      if (!palItems.length) html = `<div class="palette__empty">Không thấy “${esc(q)}”.${full ? '' : ' Thử bật “Tìm cả trong nội dung”.'}</div>`;
    }
    palList.innerHTML = html;
    palSel = 0;
    markSel();
  }
  function resRow(t, q, i, full) {
    let d = esc(t.d);
    if (q && full && FT && !norm(t.d).includes(norm(q))) d = snippet(DATA.fulltext[t.id] || '', q);
    else if (q) d = hl(t.d.length > 200 ? t.d.slice(0, 200) + '…' : t.d, q);
    return `<a class="res" href="#/t/${t.id}" data-i="${i}"><span class="res__t">${q ? hl(t.h, q) : esc(t.h)}</span>
      <span class="res__m">${tierHTML(t.m)}<span class="mono">N°${pad2(t.c)}</span></span>
      <span class="res__s">${q ? hl(t.vi, q) : esc(t.vi)}${t.alt.length && q && t.alt.some((a) => norm(a).includes(norm(q))) ? ' · ' + hl(t.alt.find((a) => norm(a).includes(norm(q))), q) : ''}</span>
      <span class="res__d">${d}</span></a>`;
  }
  function markSel() {
    $$('.res', palList).forEach((el) => el.classList.toggle('is-sel', +el.dataset.i === palSel));
    const el = $(`.res[data-i="${palSel}"]`, palList);
    if (el) el.scrollIntoView({ block: 'nearest' });
  }
  palInput.addEventListener('input', renderPalette);
  palFull.addEventListener('change', async () => {
    if (palFull.checked) { $('#pal-full-label').textContent = 'Đang tải toàn văn…'; await loadFulltext(); $('#pal-full-label').textContent = 'Tìm cả trong nội dung'; }
    store.set('fulltext', palFull.checked);
    renderPalette();
    palInput.focus();
  });
  palInput.addEventListener('keydown', (e) => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); palSel = Math.min(palItems.length - 1, palSel + 1); markSel(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); palSel = Math.max(0, palSel - 1); markSel(); }
    else if (e.key === 'Enter') { e.preventDefault(); if (palItems[palSel]) { location.hash = palItems[palSel]; closePalette(); } }
  });
  pal.addEventListener('click', (e) => {
    if (e.target.classList.contains('palette__veil')) closePalette();
    if (e.target.closest('.res')) closePalette();
  });
  palList.addEventListener('mousemove', (e) => { const r = e.target.closest('.res'); if (r && +r.dataset.i !== palSel) { palSel = +r.dataset.i; markSel(); } });

  /* ================================================================
     8. Xem nhanh khi rê chuột lên liên kết
     ================================================================ */
  const peek = $('.peek');
  let peekTimer = null, peekFor = null;
  function showPeek(a) {
    const id = a.getAttribute('data-t');
    const t = T.get(id);
    if (!t) return;
    peek.innerHTML = `<div class="peek__t">${esc(t.h)}</div><div class="peek__s">${esc(t.vi)}</div><p class="peek__d">${esc(t.d.length > 260 ? t.d.slice(0, 258) + '…' : t.d)}</p><div class="peek__m">${tierHTML(t.m)}<span class="mono" style="font-size:.66rem">N°${pad2(t.c)}</span>${READ.has(id) ? '<span class="mono" style="font-size:.66rem">✓ đã đọc</span>' : ''}</div>`;
    const r = a.getBoundingClientRect();
    const w = peek.offsetWidth || 360, h = peek.offsetHeight || 160;
    let x = Math.min(innerWidth - w - 12, Math.max(12, r.left));
    let y = r.bottom + 10;
    if (y + h > innerHeight - 12) y = r.top - h - 10;
    peek.style.left = x + 'px';
    peek.style.top = Math.max(12, y) + 'px';
    peek.classList.add('is-on');
  }
  function hidePeek() { clearTimeout(peekTimer); peekFor = null; peek.classList.remove('is-on'); }
  if (fine) {
    document.addEventListener('mouseover', (e) => {
      const a = e.target.closest('a[data-t]');
      if (!a || a.closest('.palette') || a.classList.contains('card-term')) { if (peekFor && !e.target.closest('a[data-t]')) hidePeek(); return; }
      if (a === peekFor) return;
      clearTimeout(peekTimer);
      peekFor = a;
      peekTimer = setTimeout(() => showPeek(a), 220);
    });
    document.addEventListener('scroll', hidePeek, { passive: true });
  }

  /* ================================================================
     9. Con trỏ, header, thanh tiến trình, phím tắt, giao diện sáng/tối
     ================================================================ */
  if (fine && !reduced()) {
    const cur = $('.cursor');
    const lab = $('.cursor__label', cur);
    let x = -100, y = -100, cx = -100, cy = -100;
    document.addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; cur.classList.add('is-on'); }, { passive: true });
    document.addEventListener('mouseleave', () => cur.classList.remove('is-on'));
    document.addEventListener('mouseover', (e) => {
      const lb = e.target.closest('[data-cursor]');
      const a = e.target.closest('a, button, input, select, summary, [role="button"]');
      cur.classList.toggle('is-label', !!lb);
      cur.classList.toggle('is-link', !lb && !!a);
      lab.textContent = lb ? lb.dataset.cursor : '';
    });
    const loop = () => { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; cur.style.transform = `translate3d(${cx}px,${cy}px,0)`; requestAnimationFrame(loop); };
    loop();
  }

  const header = $('.site-header');
  const bar = $('.progress-line');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    clearTimeout(saveT);
    saveT = setTimeout(() => { try { history.replaceState({ y: scrollY }, ''); } catch (e) { /* bỏ qua */ } }, 160);
    const y = scrollY;
    header.classList.toggle('is-hidden', y > 140 && y > lastY && !pal.classList.contains('is-open'));
    lastY = y;
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = h > 0 ? (y / h) * 100 + '%' : '0';
  }, { passive: true });

  function applyTheme(th) {
    if (th) document.documentElement.setAttribute('data-theme', th); else document.documentElement.removeAttribute('data-theme');
    const dark = th ? th === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    $$('[data-act="theme"]').forEach((b) => { b.innerHTML = dark ? ICON.sun : ICON.moon; b.setAttribute('aria-label', dark ? 'Chuyển sang nền sáng' : 'Chuyển sang nền tối'); });
  }
  applyTheme(store.get('theme', null));
  const SIZES = ['s', 'm', 'l'];
  document.documentElement.dataset.size = store.get('size', 'm');

  function toast(msg) {
    const el = $('.toast');
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(toast.t);
    toast.t = setTimeout(() => el.classList.remove('is-on'), 2600);
  }

  const menu = $('.menu');
  function closeMenu() { menu.classList.remove('is-open'); document.documentElement.classList.remove('menu-open'); $('[data-act="menu"]').setAttribute('aria-expanded', 'false'); $('[data-act="menu"]').setAttribute('aria-label', 'Mở menu'); document.documentElement.style.overflow = pal.classList.contains('is-open') ? 'hidden' : ''; }

  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]:not([href^="#/"])');
    if (anchor && !anchor.dataset.jump && !e.defaultPrevented) {
      const el = document.getElementById(decodeURIComponent(anchor.getAttribute('href').slice(1)));
      if (el) { e.preventDefault(); el.scrollIntoView({ block: 'start' }); if (el.tabIndex >= 0 || el.id === 'view') el.focus({ preventScroll: true }); }
      return;
    }
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const act = b.dataset.act;
    if (act === 'search') openPalette();
    else if (act === 'theme') {
      const cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = cur === 'dark' ? 'light' : 'dark';
      store.set('theme', next);
      applyTheme(next);
    } else if (act === 'menu') {
      const open = !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', open);
      document.documentElement.classList.toggle('menu-open', open);
      b.setAttribute('aria-expanded', String(open));
      b.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
      document.documentElement.style.overflow = open ? 'hidden' : '';
    } else if (act === 'random') {
      location.hash = '#/t/' + ORDER[Math.floor(Math.random() * ORDER.length)];
    } else if (act === 'save') {
      const id = b.dataset.id;
      if (SAVED.has(id)) SAVED.delete(id); else SAVED.add(id);
      store.set('saved', [...SAVED]);
      const on = SAVED.has(id);
      $$(`[data-act="save"][data-id="${id}"]`).forEach((x) => { x.classList.toggle('is-on', on); x.innerHTML = (on ? ICON.markOn : ICON.mark) + `<span>${on ? 'Đã lưu' : 'Lưu'}</span>`; });
      toast(on ? 'Đã lưu mục này' : 'Đã bỏ lưu');
    } else if (act === 'copy') {
      const url = location.href;
      if (navigator.share && !fine) { navigator.share({ title: document.title, url }).catch(() => {}); return; }
      (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(() => toast('Đã sao chép liên kết'), () => toast(url));
    } else if (act === 'size') {
      const cur = document.documentElement.dataset.size || 'm';
      const next = SIZES[(SIZES.indexOf(cur) + 1) % SIZES.length];
      document.documentElement.dataset.size = next;
      store.set('size', next);
      toast('Cỡ chữ: ' + { s: 'nhỏ', m: 'vừa', l: 'lớn' }[next]);
    } else if (act === 'motion') {
      const off = !document.documentElement.classList.contains('no-motion');
      document.documentElement.classList.toggle('no-motion', off);
      store.set('noMotion', off);
      toast(off ? 'Đã tắt chuyển động' : 'Đã bật chuyển động');
    } else if (act === 'reset') {
      if (confirm('Xóa toàn bộ tiến độ đọc và thẻ đã thuộc trên trình duyệt này?')) {
        READ = new Set(); LEARNED = new Set();
        store.set('read', []); store.set('learned', []);
        route();
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    const typing = e.target.closest && e.target.closest('input, textarea, select, [contenteditable]');
    if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) { e.preventDefault(); pal.classList.contains('is-open') ? closePalette() : openPalette(); return; }
    if (e.key === 'Escape') { closePalette(); closeMenu(); hidePeek(); return; }
    if (!typing && e.key === '/') { e.preventDefault(); openPalette(); }
  });

  if (store.get('noMotion', false)) document.documentElement.classList.add('no-motion');
  if (store.get('fulltext', false)) { palFull.checked = true; loadFulltext().catch(() => { palFull.checked = false; }); }

  window.addEventListener('hashchange', route);
  route().then(() => {
    const go = () => document.body.classList.add('is-loaded');
    if (document.fonts && document.fonts.ready) Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]).then(go); else go();
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1500));
    idle(() => loadExtra().catch(() => {}));
  });
  window.TDApp = { searchTerms, T, IDX, route };
})();
