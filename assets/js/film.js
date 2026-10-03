/* =====================================================================
   film.js — video viết bằng code
   ---------------------------------------------------------------------
   Nguyên lý giống Remotion và HyperFrames: một video là một hàm
   draw(t) → khung hình. Muốn xem khung hình ở giây t thì gọi seek(t).
   Vì mỗi khung hình chỉ phụ thuộc vào t, cùng một đoạn code luôn cho
   cùng một video: xem trước trên web và xuất MP4 dùng chung code.
   Xuất MP4: WebCodecs (VideoEncoder) + mp4-muxer, dựng từng khung hình.
   Không có WebCodecs: ghi WebM theo thời gian thực bằng MediaRecorder.
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- Hàm chuyển động (easing) và nội suy ---------- */
  const E = {
    lin: (t) => t,
    out3: (t) => 1 - Math.pow(1 - t, 3),
    out5: (t) => 1 - Math.pow(1 - t, 5),
    outExpo: (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    io3: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    ioExpo: (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2),
  };
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  /** interpolate(t, [t0, t1], [v0, v1], easing) — cùng ý tưởng với interpolate() của Remotion */
  const interpolate = (t, inR, outR, ease = E.lin) => {
    const p = clamp((t - inR[0]) / (inR[1] - inR[0]));
    return outR[0] + (outR[1] - outR[0]) * ease(p);
  };

  const INK = '#0b0b0b';
  const PAPER = '#f3f1ec';
  const ACCENT = '#ff3b1d';

  const F = {
    serif: (w, px, it) => `${it ? 'italic ' : ''}${w} ${px}px "Playfair Display", Georgia, serif`,
    sans: (w, px) => `${w} ${px}px "Be Vietnam Pro", system-ui, sans-serif`,
    mono: (w, px) => `${w} ${px}px "JetBrains Mono", ui-monospace, monospace`,
  };

  /** Chờ phông chữ (kể cả bộ ký tự tiếng Việt) tải xong trước khi vẽ lên canvas */
  let fontsReady = null;
  function ensureFonts() {
    if (fontsReady) return fontsReady;
    if (!document.fonts || !document.fonts.load) return (fontsReady = Promise.resolve());
    const s = 'Từ điển AI dễ hiểu ĐỊNH NGHĨA ữ ỹ ạ ế ơ ư ặ ổ 0123456789 → ≠ ✕';
    const specs = [
      '800 100px "Playfair Display"', '700 100px "Playfair Display"', 'italic 400 100px "Playfair Display"',
      'italic 700 100px "Playfair Display"', '400 100px "Be Vietnam Pro"', '500 100px "Be Vietnam Pro"',
      '600 100px "Be Vietnam Pro"', '500 100px "JetBrains Mono"',
    ];
    fontsReady = Promise.race([
      Promise.all(specs.map((f) => document.fonts.load(f, s).catch(() => null))),
      new Promise((r) => setTimeout(r, 4000)),
    ]);
    return fontsReady;
  }

  /* ---------- Chữ trên canvas ---------- */
  function wrap(ctx, text, maxW) {
    const words = String(text).split(/\s+/).filter(Boolean);
    const lines = [];
    let line = '';
    for (const w of words) {
      const test = line ? line + ' ' + w : w;
      if (!line || ctx.measureText(test).width <= maxW) line = test;
      else { lines.push(line); line = w; }
    }
    if (line) lines.push(line);
    return lines;
  }

  const fitCache = new Map();
  /** Tìm cỡ chữ lớn nhất để đoạn chữ vừa khung (tối đa maxLines dòng) */
  function fit(ctx, text, maxW, maxH, big, small, fontFn, lh = 1, maxLines = 4) {
    const key = [text, Math.round(maxW), Math.round(maxH), Math.round(big), Math.round(small), fontFn(10), lh, maxLines].join('|');
    const hit = fitCache.get(key);
    if (hit) return hit;
    let res = null;
    for (let s = big; s >= small; s -= Math.max(1, Math.round(s * 0.04))) {
      ctx.font = fontFn(s);
      const lines = wrap(ctx, text, maxW);
      const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
      if (lines.length <= maxLines && widest <= maxW && lines.length * s * lh <= maxH) { res = { size: s, lines }; break; }
    }
    if (!res) {
      ctx.font = fontFn(small);
      let lines = wrap(ctx, text, maxW);
      if (lines.length > maxLines) {
        lines = lines.slice(0, maxLines);
        lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + ' …';
      }
      res = { size: small, lines };
    }
    if (fitCache.size > 600) fitCache.clear();
    fitCache.set(key, res);
    return res;
  }

  /** Vẽ một dòng chữ "trồi lên" từ sau một mặt nạ — hiệu ứng kinh điển của tạp chí thời trang */
  function rise(ctx, text, x, y, size, p, W) {
    if (p <= 0) return;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, y - size * 1.32, W, size * 1.72);
    ctx.clip();
    ctx.fillText(text, x, y + (1 - p) * size * 1.4);
    ctx.restore();
  }

  function typed(text, p) {
    const n = Math.floor(clamp(p) * text.length);
    return text.slice(0, n);
  }

  function ellipsize(ctx, text, maxW) {
    if (ctx.measureText(text).width <= maxW) return text;
    let s = text;
    while (s.length > 1 && ctx.measureText(s + '…').width > maxW) s = s.slice(0, -1);
    return s.trimEnd() + '…';
  }

  /* ---------- Hạt nhiễu phim (tất định: cùng t → cùng hạt) ---------- */
  let grainTile = null;
  function grain(ctx, W, H, t, alpha = 0.06) {
    if (!grainTile) {
      grainTile = document.createElement('canvas');
      grainTile.width = grainTile.height = 180;
      const g = grainTile.getContext('2d');
      const img = g.createImageData(180, 180);
      let seed = 1337;
      const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = rnd() * 255;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      g.putImageData(img, 0, 0);
    }
    const f = Math.floor(t * 24);
    const ox = (f * 53) % 180;
    const oy = (f * 97) % 180;
    const scale = Math.max(1, Math.min(W, H) / 900);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.globalCompositeOperation = 'overlay';
    const pat = ctx.createPattern(grainTile, 'repeat');
    ctx.translate(-ox * scale, -oy * scale);
    ctx.scale(scale, scale);
    ctx.fillStyle = pat;
    ctx.fillRect(0, 0, W / scale + 360, H / scale + 360);
    ctx.restore();
  }

  /* ---------- Bộ dựng cảnh: các cảnh nối nhau, chuyển cảnh bằng màn kéo ---------- */
  function sequence(scenes, opts = {}) {
    let t0 = 0;
    for (const s of scenes) { s.a = t0; s.b = t0 + s.len; t0 = s.b; }
    const duration = t0;
    const wipe = opts.wipe ?? 0.36;

    function paint(ctx, s, lt, W, H) {
      ctx.fillStyle = s.bg === 'paper' ? PAPER : INK;
      ctx.fillRect(0, 0, W, H);
      const fg = s.bg === 'paper' ? INK : PAPER;
      ctx.fillStyle = fg;
      ctx.strokeStyle = fg;
      s.draw(ctx, lt, W, H, fg, s.len);
    }

    function draw(ctx, t, W, H, o = {}) {
      t = clamp(t, 0, duration - 1e-4);
      let i = scenes.findIndex((s) => t >= s.a && t < s.b);
      if (i < 0) i = scenes.length - 1;
      const s = scenes[i];
      const lt = t - s.a;
      ctx.save();
      ctx.textBaseline = 'alphabetic';
      ctx.textAlign = 'left';
      if (i > 0 && lt < wipe && s.wipe !== false) {
        const prev = scenes[i - 1];
        paint(ctx, prev, prev.len - 1e-4, W, H);
        const p = E.io3(lt / wipe);
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, H * (1 - p), W, H * p);
        ctx.clip();
        paint(ctx, s, lt, W, H);
        ctx.restore();
        // vạch đỏ chạy theo mép màn kéo
        ctx.fillStyle = ACCENT;
        ctx.fillRect(0, H * (1 - p) - Math.max(2, H * 0.004), W, Math.max(2, H * 0.004));
      } else {
        paint(ctx, s, lt, W, H);
      }
      // thanh tiến trình kiểu "story" ở trên cùng (bỏ khi chụp ảnh tĩnh)
      const u = Math.min(W, H) / 1000;
      const gap = 6 * u;
      const m = 34 * u;
      const bw = (W - 2 * m - gap * (scenes.length - 1)) / scenes.length;
      const fg = s.bg === 'paper' ? INK : PAPER;
      for (let k = 0; k < (o.still ? 0 : scenes.length); k++) {
        const x = m + k * (bw + gap);
        ctx.globalAlpha = 0.22;
        ctx.fillStyle = fg;
        ctx.fillRect(x, 18 * u, bw, 3 * u);
        const fill = k < i ? 1 : k > i ? 0 : clamp(lt / s.len);
        ctx.globalAlpha = 0.9;
        ctx.fillRect(x, 18 * u, bw * fill, 3 * u);
      }
      ctx.globalAlpha = 1;
      grain(ctx, W, H, t, 0.07);
      ctx.restore();
    }
    return { duration, draw, scenes };
  }

  /* ---------- Hàm bố cục dùng chung ---------- */
  const L = (W, H) => {
    const u = Math.min(W, H) / 1000;
    return { u, m: 70 * u, portrait: H > W * 1.2, land: W > H * 1.2 };
  };

  function header(ctx, W, H, left, right, p = 1) {
    const { u, m } = L(W, H);
    ctx.font = F.mono(500, 19 * u);
    ctx.globalAlpha = clamp(p);
    ctx.textAlign = 'left';
    ctx.fillText(left, m, m + 26 * u);
    if (right) { ctx.textAlign = 'right'; ctx.fillText(right, W - m, m + 26 * u); }
    ctx.textAlign = 'left';
    ctx.globalAlpha = 1;
  }

  const pad2 = (n) => String(n).padStart(2, '0');
  const TIER = { 1: 'MỨC 1 — CỐT LÕI', 2: 'MỨC 2 — CHUẨN', 3: 'MỨC 3 — NGẮN' };
  const STATUS = { 'on-dinh': 'ỔN ĐỊNH', 'dang-bien-doi': 'ĐANG BIẾN ĐỔI', 'lich-su': 'LỊCH SỬ' };

  /* =================================================================
     Video giới thiệu cuốn từ điển (teaser) — khoảng 18 giây
     ================================================================= */
  function teaser(D) {
    const st = D.stats;
    const picks = ['llm', 'rag', 'ai-agent', 'hallucination', 'token', 'prompt-injection', 'fine-tuning', 'alignment']
      .map((id) => D.T.get(id)).filter(Boolean);
    const chapters = D.chapters.map((c) => c.t);

    const scenes = [
      { len: 2.7, bg: 'ink', draw(ctx, t, W, H) {
        const { u, m, land } = L(W, H);
        header(ctx, W, H, typed('N°01 — TỪ ĐIỂN AI DỄ HIỂU', interpolate(t, [0.1, 1.0], [0, 1])), typed('10/2026', interpolate(t, [0.6, 1.1], [0, 1])));
        const maxW = W - 2 * m;
        const a = fit(ctx, 'Từ điển', maxW, H * 0.3, (land ? 330 : 300) * u, 80 * u, (s) => F.serif(800, s));
        const y1 = H * (land ? 0.5 : 0.47);
        ctx.font = F.serif(800, a.size);
        rise(ctx, 'Từ điển', m - a.size * 0.03, y1, a.size, interpolate(t, [0.45, 1.35], [0, 1], E.out5), W);
        ctx.font = F.serif(400, a.size, true);
        const y2 = y1 + a.size * 0.98;
        rise(ctx, 'AI', m, y2, a.size, interpolate(t, [0.7, 1.6], [0, 1], E.out5), W);
        const wAI = ctx.measureText('AI').width;
        ctx.fillStyle = ACCENT;
        const dp = interpolate(t, [1.4, 1.8], [0, 1], E.out3);
        ctx.beginPath();
        ctx.arc(m + wAI + a.size * 0.12, y2 - a.size * 0.06, a.size * 0.07 * dp, 0, Math.PI * 2);
        ctx.fill();
        // vạch mảnh
        ctx.fillStyle = PAPER;
        const lw = interpolate(t, [0.2, 1.4], [0, maxW], E.out3);
        ctx.fillRect(m, y1 - a.size * 1.05, lw, Math.max(1, 2 * u));
        ctx.font = F.sans(400, 34 * u);
        ctx.globalAlpha = interpolate(t, [1.6, 2.2], [0, 1]);
        ctx.fillText(`${st.terms} thuật ngữ AI · tiếng Việt đơn giản`, m, Math.min(H - m, y2 + a.size * 0.55));
        ctx.globalAlpha = 1;
      } },
      { len: 2.8, bg: 'paper', draw(ctx, t, W, H) {
        const { u, m } = L(W, H);
        header(ctx, W, H, 'SỐ LIỆU — BẢN 0.1', 'MỐC 10/2026');
        const n = Math.round(interpolate(t, [0.1, 1.5], [0, st.terms], E.outExpo));
        const maxW = W - 2 * m;
        const f = fit(ctx, '573', maxW, H * 0.42, 460 * u, 100 * u, (s) => F.serif(800, s));
        ctx.font = F.serif(800, f.size);
        const y = H * 0.52;
        rise(ctx, String(n), m - f.size * 0.04, y, f.size, interpolate(t, [0, 0.6], [0, 1], E.out5), W);
        ctx.font = F.mono(500, 26 * u);
        rise(ctx, 'THUẬT NGỮ — GIẢI THÍCH BẰNG TIẾNG VIỆT', m, y + f.size * 0.3 + 34 * u, 26 * u, interpolate(t, [0.5, 1.1], [0, 1], E.out5), W);
        // ba mức
        const tiers = [[st.tiers[0], 'cốt lõi'], [st.tiers[1], 'chuẩn'], [st.tiers[2], 'ngắn']];
        const colW = maxW / 3;
        const by = H - m - 40 * u;
        tiers.forEach(([v, l], k) => {
          const p = interpolate(t, [0.9 + k * 0.15, 1.7 + k * 0.15], [0, 1], E.out5);
          const x = m + k * colW;
          ctx.globalAlpha = p;
          ctx.font = F.serif(700, 64 * u);
          ctx.fillText(String(v), x, by - 40 * u);
          ctx.font = F.mono(500, 20 * u);
          ctx.fillText(('MỨC ' + (k + 1) + ' · ' + l).toUpperCase(), x, by);
          ctx.globalAlpha = 1;
          ctx.fillRect(x, by + 20 * u, (colW - 24 * u) * Math.min(1, (v / st.terms) * 2.1) * p, 6 * u);
        });
      } },
      { len: 2.9, bg: 'ink', draw(ctx, t, W, H) {
        const { u, m } = L(W, H);
        header(ctx, W, H, '12 CHỦ ĐỀ — 66 CỤM', 'ĐỌC THEO CHỦ ĐỀ');
        const top = m + 90 * u;
        const avail = H - top - m;
        const lh = Math.min(avail / 12, 92 * u);
        const size = lh * 0.48;
        const active = Math.floor(interpolate(t, [1.2, 2.75], [0, 12]));
        chapters.forEach((title, k) => {
          const y = top + lh * (k + 0.75);
          const p = interpolate(t, [0.1 + k * 0.07, 0.8 + k * 0.07], [0, 1], E.out5);
          const on = t >= 1.2 && k === Math.min(11, active);
          ctx.globalAlpha = t >= 1.2 ? (on ? 1 : 0.38) : 1;
          ctx.font = F.mono(500, size * 0.62);
          rise(ctx, pad2(k + 1), m, y, size, p, W);
          ctx.font = on ? F.serif(700, size * 1.12, true) : F.sans(500, size);
          if (on) ctx.fillStyle = ACCENT;
          rise(ctx, ellipsize(ctx, title, W - 2 * m - size * 2.4), m + size * 2.2, y, size, p, W);
          ctx.fillStyle = PAPER;
          ctx.globalAlpha = 1;
          ctx.fillRect(m, y + lh * 0.25, (W - 2 * m) * p, Math.max(1, u));
        });
      } },
      ...picks.map((term, i) => ({ len: 0.55, bg: i % 2 ? 'ink' : 'paper', wipe: false, draw(ctx, t, W, H, fg) {
        const { u, m } = L(W, H);
        header(ctx, W, H, `CHƯƠNG ${pad2(term.c)} · MỨC ${term.m}`, `${pad2(i + 1)}/${pad2(picks.length)}`);
        const maxW = W - 2 * m;
        const f = fit(ctx, term.h, maxW, H * 0.42, 240 * u, 60 * u, (s) => F.serif(700, s), 0.98, 3);
        const sc = interpolate(t, [0, 0.55], [1.07, 1], E.out3);
        ctx.save();
        ctx.translate(W / 2, H / 2);
        ctx.scale(sc, sc);
        ctx.translate(-W / 2, -H / 2);
        ctx.font = F.serif(700, f.size);
        const blockH = f.lines.length * f.size * 0.98;
        let y = H * 0.48 - blockH / 2 + f.size * 0.8;
        f.lines.forEach((ln) => { ctx.fillText(ln, m, y); y += f.size * 0.98; });
        ctx.font = F.serif(400, 54 * u, true);
        ctx.fillText(ellipsize(ctx, term.vi, maxW), m, y + 30 * u);
        ctx.restore();
        ctx.fillStyle = ACCENT;
        ctx.fillRect(m, H - m - 6 * u, maxW * ((i + 1) / picks.length), 6 * u);
        ctx.fillStyle = fg;
      } })),
      { len: 3.0, bg: 'paper', draw(ctx, t, W, H) {
        const { u, m } = L(W, H);
        header(ctx, W, H, 'CÁCH ĐỌC', 'N°01');
        const maxW = W - 2 * m;
        const f = fit(ctx, 'Không đọc từ', maxW, H * 0.2, 200 * u, 50 * u, (s) => F.serif(700, s), 1, 1);
        const s = f.size;
        let y = H * 0.3;
        ctx.font = F.serif(700, s);
        rise(ctx, 'Không đọc từ', m, y, s, interpolate(t, [0.1, 0.8], [0, 1], E.out5), W);
        y += s * 1.05;
        ctx.font = F.serif(800, s * 1.2);
        rise(ctx, 'A → Z.', m, y, s * 1.2, interpolate(t, [0.25, 0.95], [0, 1], E.out5), W);
        const az = ctx.measureText('A → Z.').width;
        ctx.fillStyle = ACCENT;
        ctx.fillRect(m - 10 * u, y - s * 0.36, (az + 20 * u) * interpolate(t, [1.0, 1.4], [0, 1], E.io3), Math.max(4, s * 0.09));
        ctx.fillStyle = INK;
        y += s * 1.35;
        ctx.font = F.serif(400, s, true);
        rise(ctx, 'Đọc theo', m, y, s, interpolate(t, [1.45, 2.1], [0, 1], E.out5), W);
        y += s * 1.02;
        ctx.font = F.serif(700, s * 1.1, true);
        rise(ctx, 'chủ đề.', m, y, s * 1.1, interpolate(t, [1.6, 2.25], [0, 1], E.out5), W);
      } },
      { len: 3.2, bg: 'ink', draw(ctx, t, W, H) {
        const { u, m, land } = L(W, H);
        header(ctx, W, H, 'ĐỌC MIỄN PHÍ TRÊN WEB', D.host || '');
        const maxW = W - 2 * m;
        const f = fit(ctx, 'Từ điển', maxW, H * 0.26, (land ? 300 : 280) * u, 80 * u, (s) => F.serif(800, s));
        const f2 = fit(ctx, 'AI dễ hiểu', maxW, H * 0.26, (land ? 300 : 280) * u, 80 * u, (s) => F.serif(400, s, true), 1, 1);
        const s = Math.min(f.size, f2.size);
        const y1 = H * (land ? 0.42 : 0.4);
        ctx.font = F.serif(800, s);
        rise(ctx, 'Từ điển', m - s * 0.03, y1, s, interpolate(t, [0.05, 0.8], [0, 1], E.out5), W);
        ctx.font = F.serif(400, s, true);
        rise(ctx, 'AI dễ hiểu', m, y1 + s * 1.06, s, interpolate(t, [0.2, 0.95], [0, 1], E.out5), W);
        ctx.font = F.mono(500, 24 * u);
        ctx.globalAlpha = interpolate(t, [0.9, 1.4], [0, 1]);
        ctx.fillText(`${st.terms} THUẬT NGỮ · ${st.chapters} CHỦ ĐỀ · A → Z`, m, Math.min(y1 + s * 1.62, H - m - 130 * u));
        ctx.globalAlpha = interpolate(t, [1.2, 1.8], [0, 1]);
        ctx.font = F.mono(500, 19 * u);
        ctx.fillText('TÁC GIẢ', m, H - m - 70 * u);
        ctx.font = F.serif(400, 60 * u, true);
        ctx.fillText('Hoàng Trần', m, H - m - 10 * u);
        ctx.globalAlpha = 1;
        ctx.fillStyle = ACCENT;
        ctx.beginPath();
        ctx.arc(W - m - 18 * u, H - m - 28 * u, 18 * u * interpolate(t, [1.5, 1.9], [0, 1], E.out3), 0, Math.PI * 2);
        ctx.fill();
      } },
    ];
    return sequence(scenes);
  }

  /* =================================================================
     Video "Reel" cho một thuật ngữ — 12 đến 20 giây tùy độ dài
     ================================================================= */
  function reel(term, D) {
    const ch = D.chapters.find((c) => c.n === term.c) || { t: '' };
    const confused = (term.x || []).map((id) => D.T.get(id)).filter(Boolean).slice(0, 3);
    const defLen = term.d.length;
    const scenes = [];

    scenes.push({ len: 1.7, bg: 'ink', draw(ctx, t, W, H, fg) {
      const { u, m } = L(W, H);
      header(ctx, W, H, 'TỪ ĐIỂN AI DỄ HIỂU', 'N°' + pad2(term.c));
      // số chương rất lớn, viền mảnh, trôi chậm
      const big = H * 0.62;
      ctx.save();
      ctx.font = F.serif(800, big);
      ctx.globalAlpha = 0.22;
      ctx.lineWidth = Math.max(1, 2 * u);
      ctx.strokeStyle = fg;
      const sc = interpolate(t, [0, 1.7], [1.08, 1]);
      ctx.translate(W - m, H * 0.92);
      ctx.scale(sc, sc);
      ctx.textAlign = 'right';
      ctx.strokeText(pad2(term.c), 0, 0);
      ctx.restore();
      ctx.font = F.mono(500, 22 * u);
      rise(ctx, 'CHƯƠNG ' + pad2(term.c), m, H * 0.38, 22 * u, interpolate(t, [0.1, 0.6], [0, 1], E.out5), W);
      const f = fit(ctx, ch.t, W - 2 * m, H * 0.25, 92 * u, 40 * u, (s) => F.serif(400, s, true), 1.08, 3);
      ctx.font = F.serif(400, f.size, true);
      f.lines.forEach((ln, k) => rise(ctx, ln, m, H * 0.38 + 30 * u + f.size * (k + 1) * 1.08, f.size, interpolate(t, [0.2 + k * 0.08, 0.9 + k * 0.08], [0, 1], E.out5), W));
      ctx.font = F.mono(500, 20 * u);
      ctx.globalAlpha = interpolate(t, [0.7, 1.1], [0, 1]);
      ctx.fillText(TIER[term.m] + '  ·  ' + (STATUS[term.s] || ''), m, H - m);
      ctx.globalAlpha = 1;
    } });

    scenes.push({ len: 3.0, bg: 'ink', wipe: false, draw(ctx, t, W, H, fg) {
      const { u, m } = L(W, H);
      header(ctx, W, H, 'CHƯƠNG ' + pad2(term.c) + ' · ' + TIER[term.m].split(' — ')[0], 'N°' + pad2(term.c));
      const maxW = W - 2 * m;
      const f = fit(ctx, term.h, maxW, H * 0.46, 250 * u, 56 * u, (s) => F.serif(700, s), 0.98, 4);
      ctx.font = F.serif(700, f.size);
      const blockH = f.lines.length * f.size * 0.98;
      let y = H * 0.46 - blockH / 2 + f.size * 0.82;
      f.lines.forEach((ln, k) => { rise(ctx, ln, m - f.size * 0.02, y, f.size, interpolate(t, [0.05 + k * 0.1, 0.85 + k * 0.1], [0, 1], E.out5), W); y += f.size * 0.98; });
      const v = fit(ctx, term.vi, maxW, H * 0.18, 76 * u, 34 * u, (s) => F.serif(400, s, true), 1.1, 2);
      ctx.font = F.serif(400, v.size, true);
      v.lines.forEach((ln, k) => rise(ctx, ln, m, y + 26 * u + v.size * (k + 0.9) * 1.1, v.size, interpolate(t, [0.6 + k * 0.08, 1.3 + k * 0.08], [0, 1], E.out5), W));
      if (term.ab && term.ab !== term.h) {
        const p = interpolate(t, [1.1, 1.6], [0, 1], E.out3);
        ctx.font = F.mono(500, 30 * u);
        const tw = ctx.measureText(term.ab).width + 44 * u;
        ctx.globalAlpha = p;
        ctx.fillStyle = ACCENT;
        const bx = m, by = H - m - 70 * u;
        roundRect(ctx, bx, by, tw, 56 * u, 28 * u);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillText(term.ab, bx + 22 * u, by + 38 * u);
        ctx.globalAlpha = 1;
        ctx.fillStyle = fg;
      }
    } });

    const defDur = clamp(3.4 + defLen / 75, 4.2, 7.5);
    scenes.push({ len: defDur, bg: 'paper', draw(ctx, t, W, H) {
      const { u, m } = L(W, H);
      header(ctx, W, H, 'ĐỊNH NGHĨA', term.h.length > 28 ? 'N°' + pad2(term.c) : term.h.toUpperCase());
      ctx.fillStyle = ACCENT;
      ctx.fillRect(m, m + 50 * u, 46 * u * interpolate(t, [0.1, 0.5], [0, 1], E.out3), 6 * u);
      ctx.fillStyle = INK;
      const maxW = W - 2 * m;
      const f = fit(ctx, term.d, maxW, H * 0.66, 64 * u, 26 * u, (s) => F.sans(500, s), 1.38, 18);
      ctx.font = F.sans(500, f.size);
      const blockH = f.lines.length * f.size * 1.38;
      let y = Math.max(m + 130 * u, H * 0.5 - blockH / 2) + f.size;
      const per = Math.min(0.16, (defDur * 0.45) / f.lines.length);
      f.lines.forEach((ln, k) => { rise(ctx, ln, m, y, f.size, interpolate(t, [0.25 + k * per, 0.95 + k * per], [0, 1], E.out5), W); y += f.size * 1.38; });
      ctx.font = F.serif(400, 40 * u, true);
      ctx.globalAlpha = interpolate(t, [0.4, 0.9], [0, 1]);
      ctx.fillText(ellipsize(ctx, term.vi, maxW), m, H - m);
      ctx.globalAlpha = 1;
    } });

    if (confused.length) {
      scenes.push({ len: 2.8, bg: 'ink', draw(ctx, t, W, H, fg) {
        const { u, m } = L(W, H);
        header(ctx, W, H, 'ĐỪNG NHẦM VỚI', pad2(confused.length) + ' MỤC');
        const maxW = W - 2 * m;
        ctx.font = F.serif(400, 200 * u, true);
        ctx.fillStyle = ACCENT;
        ctx.globalAlpha = interpolate(t, [0, 0.4], [0, 1]);
        ctx.fillText('≠', m - 8 * u, m + 230 * u);
        ctx.globalAlpha = 1;
        ctx.fillStyle = fg;
        const top = m + 300 * u;
        const slot = Math.min((H - top - m) / confused.length, 260 * u);
        confused.forEach((c, k) => {
          const p = interpolate(t, [0.2 + k * 0.22, 0.95 + k * 0.22], [0, 1], E.out5);
          const x = m + (1 - p) * 80 * u;
          ctx.globalAlpha = p;
          const f = fit(ctx, c.h, maxW, slot * 0.6, 110 * u, 40 * u, (s) => F.serif(700, s), 1, 2);
          ctx.font = F.serif(700, f.size);
          let y = top + k * slot + f.size * 0.85;
          f.lines.forEach((ln) => { ctx.fillText(ln, x, y); y += f.size; });
          ctx.font = F.serif(400, 38 * u, true);
          ctx.fillText(ellipsize(ctx, c.vi, maxW), x, y + 10 * u);
          ctx.globalAlpha = 1;
          ctx.fillRect(m, top + (k + 1) * slot - 24 * u, maxW * p, Math.max(1, u));
        });
      } });
    }

    if (term.nm) {
      const nmDur = clamp(2.6 + term.nm.length / 80, 3, 5.2);
      scenes.push({ len: nmDur, bg: 'paper', draw(ctx, t, W, H) {
        const { u, m } = L(W, H);
        header(ctx, W, H, 'KHÔNG NÊN HIỂU LÀ', '✕');
        const maxW = W - 2 * m;
        const f = fit(ctx, term.nm, maxW, H * 0.62, 80 * u, 32 * u, (s) => F.serif(400, s, true), 1.22, 14);
        ctx.font = F.serif(400, f.size, true);
        const blockH = f.lines.length * f.size * 1.22;
        let y = H * 0.5 - blockH / 2 + f.size;
        f.lines.forEach((ln, k) => { rise(ctx, ln, m, y, f.size, interpolate(t, [0.15 + k * 0.12, 0.85 + k * 0.12], [0, 1], E.out5), W); y += f.size * 1.22; });
        ctx.fillStyle = ACCENT;
        ctx.fillRect(m, H - m - 6 * u, maxW * interpolate(t, [0, nmDur], [0, 1]), 6 * u);
        ctx.fillStyle = INK;
      } });
    }

    scenes.push({ len: 2.6, bg: 'ink', draw(ctx, t, W, H) {
      const { u, m } = L(W, H);
      header(ctx, W, H, 'ĐỌC MỤC ĐẦY ĐỦ', 'HOÀNG TRẦN');
      const maxW = W - 2 * m;
      const f1 = fit(ctx, 'Từ điển', maxW, H * 0.24, 260 * u, 70 * u, (s) => F.serif(800, s));
      const f2 = fit(ctx, 'AI dễ hiểu', maxW, H * 0.24, 260 * u, 70 * u, (s) => F.serif(400, s, true), 1, 1);
      const f = { size: Math.min(f1.size, f2.size) };
      const y1 = H * 0.42;
      ctx.font = F.serif(800, f.size);
      rise(ctx, 'Từ điển', m - f.size * 0.03, y1, f.size, interpolate(t, [0.05, 0.8], [0, 1], E.out5), W);
      ctx.font = F.serif(400, f.size, true);
      rise(ctx, 'AI dễ hiểu', m, y1 + f.size * 1.06, f.size, interpolate(t, [0.2, 0.95], [0, 1], E.out5), W);
      ctx.globalAlpha = interpolate(t, [0.8, 1.3], [0, 1]);
      ctx.font = F.mono(500, 22 * u);
      ctx.fillText('TRA MỤC: ' + term.id.toUpperCase(), m, H - m - 46 * u);
      ctx.fillStyle = ACCENT;
      ctx.fillText(ellipsize(ctx, (D.host ? D.host + '/' : '') + '#/t/' + term.id, maxW), m, H - m);
      ctx.globalAlpha = 1;
    } });

    return sequence(scenes);
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /* =================================================================
     Trình phát (player) — xem trước trên trang
     ================================================================= */
  const FORMATS = { '916': [1080, 1920], '11': [1080, 1080], '169': [1920, 1080] };
  const ICON_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>';
  const ICON_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>';
  const fmtTime = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  class Player {
    constructor(host, { comp, fmt = '916', autoplay = true, loop = true, controls = true, tag } = {}) {
      this.host = host;
      this.comp = comp;
      this.fmt = fmt;
      this.loop = loop;
      this.t = 0;
      this.playing = false;
      this.visible = true;
      host.classList.add('film');
      host.dataset.fmt = fmt;
      host.innerHTML = `<canvas aria-label="Video viết bằng code"></canvas>${tag ? `<span class="film__tag">${tag}</span>` : ''}${controls ? `
        <div class="film__bar">
          <button type="button" data-k="play" aria-label="Phát hoặc dừng">${ICON_PLAY}</button>
          <input class="film__range" type="range" min="0" max="1000" value="0" aria-label="Tua video">
          <span class="film__time">0:00 / 0:00</span>
        </div>` : ''}`;
      this.canvas = host.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d', { alpha: false });
      this.btn = host.querySelector('[data-k="play"]');
      this.range = host.querySelector('.film__range');
      this.time = host.querySelector('.film__time');
      if (this.btn) this.btn.addEventListener('click', () => this.toggle());
      this.canvas.addEventListener('click', () => this.toggle());
      if (this.range) {
        this.range.addEventListener('input', () => {
          this.pause();
          this.seek((this.range.value / 1000) * this.comp.duration);
        });
      }
      this.ro = new ResizeObserver(() => this.resize());
      this.ro.observe(host);
      this.io = new IntersectionObserver((es) => {
        this.visible = es[0].isIntersecting;
        if (this.visible && this.wantPlay) this._start();
      }, { threshold: 0.05 });
      this.io.observe(host);
      this.resize();
      this.wantPlay = autoplay && !matchMedia('(prefers-reduced-motion: reduce)').matches && !document.documentElement.classList.contains('no-motion');
      ensureFonts().then(() => {
        fitCache.clear();
        this.seek(this.wantPlay ? 0 : Math.min(2.2, this.comp.duration * 0.15));
        if (this.wantPlay) this.play();
        else host.classList.add('is-paused');
      });
    }
    resize() {
      const [bw, bh] = FORMATS[this.fmt];
      const cssW = this.host.clientWidth || 300;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.min(bw, Math.round(cssW * dpr));
      const h = Math.round((w * bh) / bw);
      if (this.canvas.width !== w || this.canvas.height !== h) {
        this.canvas.width = w;
        this.canvas.height = h;
        fitCache.clear();
        this.render();
      }
    }
    setComp(comp) { this.comp = comp; this.t = 0; fitCache.clear(); this.render(); this._ui(); }
    setFormat(fmt) { this.fmt = fmt; this.host.dataset.fmt = fmt; requestAnimationFrame(() => this.resize()); }
    seek(t) { this.t = clamp(t, 0, this.comp.duration); this.render(); this._ui(); }
    render() { this.comp.draw(this.ctx, this.t, this.canvas.width, this.canvas.height); }
    _ui() {
      if (this.range) this.range.value = String(Math.round((this.t / this.comp.duration) * 1000));
      if (this.time) this.time.textContent = `${fmtTime(this.t)} / ${fmtTime(this.comp.duration)}`;
    }
    play() { this.wantPlay = true; this.host.classList.remove('is-paused'); if (this.btn) this.btn.innerHTML = ICON_PAUSE; this._start(); }
    _start() {
      if (this.playing || !this.visible) return;
      this.playing = true;
      let last = performance.now();
      const tick = (now) => {
        if (!this.wantPlay || !this.visible || !this.host.isConnected) { this.playing = false; return; }
        this.t += (now - last) / 1000;
        last = now;
        if (this.t >= this.comp.duration) {
          if (this.loop) this.t = 0;
          else { this.t = this.comp.duration; this.pause(); }
        }
        this.render();
        this._ui();
        this.raf = requestAnimationFrame(tick);
      };
      this.raf = requestAnimationFrame(tick);
    }
    pause() { this.wantPlay = false; this.playing = false; cancelAnimationFrame(this.raf); this.host.classList.add('is-paused'); if (this.btn) this.btn.innerHTML = ICON_PLAY; }
    toggle() { this.wantPlay ? this.pause() : this.play(); }
    destroy() { this.pause(); this.ro.disconnect(); this.io.disconnect(); }
  }

  /* =================================================================
     Xuất video — dựng từng khung hình, đóng gói MP4
     ================================================================= */
  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = res;
      s.onerror = () => rej(new Error('Không tải được ' + src));
      document.head.appendChild(s);
    });
  }

  async function pickAvc(W, H, fps) {
    const cands = ['avc1.640034', 'avc1.640033', 'avc1.640032', 'avc1.640028', 'avc1.4d0034', 'avc1.4d0032', 'avc1.4d0028', 'avc1.42e034', 'avc1.42e032', 'avc1.42e028', 'avc1.42001f'];
    for (const codec of cands) {
      const cfg = { codec, width: W, height: H, bitrate: 9_000_000, framerate: fps };
      try {
        const r = await VideoEncoder.isConfigSupported(cfg);
        if (r && r.supported) return cfg;
      } catch (e) { /* thử mã tiếp theo */ }
    }
    return null;
  }

  /** Nhường luồng cho giao diện. MessageChannel không bị hãm như setTimeout khi tab bị ẩn. */
  const yieldNow = () => new Promise((r) => { const ch = new MessageChannel(); ch.port1.onmessage = () => r(); ch.port2.postMessage(0); });

  async function exportVideo(comp, fmt, { fps = 30, onProgress = () => {}, base = '' } = {}) {
    const [W, H] = FORMATS[fmt];
    await ensureFonts();
    fitCache.clear();
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d', { alpha: false });
    const N = Math.round(comp.duration * fps);

    if ('VideoEncoder' in window && 'VideoFrame' in window) {
      const cfg = await pickAvc(W, H, fps);
      if (cfg) {
        if (!window.Mp4Muxer) await loadScript(base + 'assets/vendor/mp4-muxer.js');
        const { Muxer, ArrayBufferTarget } = window.Mp4Muxer;
        const muxer = new Muxer({
          target: new ArrayBufferTarget(),
          video: { codec: 'avc', width: W, height: H, frameRate: fps },
          fastStart: 'in-memory',
          firstTimestampBehavior: 'offset',
        });
        let failure = null;
        const enc = new VideoEncoder({
          output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
          error: (e) => { failure = e; },
        });
        enc.configure({ ...cfg, avc: { format: 'avc' } });
        for (let i = 0; i < N; i++) {
          if (failure) throw failure;
          comp.draw(ctx, i / fps, W, H);
          const frame = new VideoFrame(canvas, { timestamp: Math.round((i * 1e6) / fps), duration: Math.round(1e6 / fps) });
          enc.encode(frame, { keyFrame: i % (fps * 2) === 0 });
          frame.close();
          while (enc.encodeQueueSize > 6) await yieldNow();
          if (i % 6 === 0) { onProgress(i / N); await yieldNow(); }
        }
        await enc.flush();
        if (failure) throw failure;
        muxer.finalize();
        onProgress(1);
        return { blob: new Blob([muxer.target.buffer], { type: 'video/mp4' }), ext: 'mp4', how: 'WebCodecs · H.264' };
      }
    }

    // Phương án dự phòng: ghi theo thời gian thực
    if (!canvas.captureStream || !window.MediaRecorder) throw new Error('Trình duyệt này chưa hỗ trợ xuất video.');
    const types = ['video/mp4;codecs=avc1', 'video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'];
    const mime = types.find((x) => MediaRecorder.isTypeSupported(x)) || '';
    const stream = canvas.captureStream(fps);
    const rec = new MediaRecorder(stream, mime ? { mimeType: mime, videoBitsPerSecond: 9_000_000 } : undefined);
    const parts = [];
    rec.ondataavailable = (e) => e.data.size && parts.push(e.data);
    const done = new Promise((r) => (rec.onstop = r));
    comp.draw(ctx, 0, W, H);
    rec.start(250);
    const t0 = performance.now();
    await new Promise((resolve) => {
      const step = () => {
        const t = (performance.now() - t0) / 1000;
        comp.draw(ctx, Math.min(t, comp.duration), W, H);
        onProgress(Math.min(1, t / comp.duration));
        if (t >= comp.duration) resolve();
        else setTimeout(step, 1000 / fps);
      };
      step();
    });
    rec.stop();
    await done;
    const type = (mime || 'video/webm').split(';')[0];
    return { blob: new Blob(parts, { type }), ext: type.includes('mp4') ? 'mp4' : 'webm', how: 'MediaRecorder · thời gian thực' };
  }

  /** Vẽ một khung hình tĩnh ra PNG (dùng làm ảnh bìa, ảnh chia sẻ) */
  async function still(comp, t, W, H) {
    await ensureFonts();
    fitCache.clear();
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    comp.draw(c.getContext('2d', { alpha: false }), t, W, H, { still: true });
    return new Promise((r) => c.toBlob(r, 'image/png'));
  }

  window.TDFilm = { E, interpolate, teaser, reel, Player, exportVideo, still, ensureFonts, FORMATS };
})();
