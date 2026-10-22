/* 自问清单模块：渲染进 #checklistView，数据在 checklist-data.js（英文内容在 checklist-i18n.js），轮次/答案/行数存 localStorage（self-check-*） */
(function () {
  var ROUNDS_KEY = 'self-check-rounds-v1';
  var ANSWERS_KEY = 'self-check-answers-v1';
  var ACTIVE_KEY = 'self-check-round-active-v1';
  var VIEW_KEY = 'self-check-view-v1';
  var LINES_KEY = 'self-check-lines-v1';

  function sortRoundList(arr) {
    var nums = arr.filter(function (x) { return /^\d{4}$/.test(x); }).sort();
    var rest = arr.filter(function (x) { return !/^\d{4}$/.test(x); });
    return nums.concat(rest);
  }
  function loadRounds() {
    try {
      var r = JSON.parse(localStorage.getItem(ROUNDS_KEY));
      if (Array.isArray(r) && r.length) return sortRoundList(r);
    } catch (e) {}
    return sortRoundList([String(new Date().getFullYear())]);
  }
  var rounds = loadRounds();
  function saveRounds() { try { localStorage.setItem(ROUNDS_KEY, JSON.stringify(rounds)); } catch (e) {} }

  function loadActiveRound() {
    try {
      var a = localStorage.getItem(ACTIVE_KEY);
      if (a && rounds.indexOf(a) >= 0) return a;
    } catch (e) {}
    return rounds[rounds.length - 1];
  }
  var activeRound = loadActiveRound();
  function saveActiveRound() { try { localStorage.setItem(ACTIVE_KEY, activeRound); } catch (e) {} }

  function loadAnswers() {
    try {
      var a = JSON.parse(localStorage.getItem(ANSWERS_KEY));
      if (a && typeof a === 'object' && !Array.isArray(a)) {
        for (var k in a) {
          if (typeof a[k] === 'string') {
            var o = {}; o[rounds[0]] = a; return o;
          }
        }
        return a;
      }
    } catch (e) {}
    return {};
  }
  var answers = loadAnswers();
  function saveAnswers() { try { localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers)); } catch (e) {} }
  function getAns(key) { return getAnsIn(activeRound, key); }
  function getAnsIn(round, key) { var r = answers[round]; return (r && r[key]) || ''; }
  function setAns(round, key, val) {
    if (!answers[round]) answers[round] = {};
    answers[round][key] = val;
    saveAnswers();
  }

  var lineCounts = (function () {
    try {
      var x = JSON.parse(localStorage.getItem(LINES_KEY));
      if (x && typeof x === 'object' && !Array.isArray(x)) return x;
    } catch (e) {}
    return {};
  })();
  function saveLineCounts() { try { localStorage.setItem(LINES_KEY, JSON.stringify(lineCounts)); } catch (e) {} }

  var viewMode = 'focus';
  try { if (localStorage.getItem(VIEW_KEY) === 'wall') viewMode = 'wall'; } catch (e) {}

  var GLYPH = { q: '自问', write: '书写', data: '数据' };
  var GLYPH_TITLE = { q: '自问 · 想一想', write: '书写 · 写下来', data: '数据 · 记下来' };

  function isEn() { return typeof LANG !== 'undefined' && LANG === 'en'; }
  function tr(zh, en) { return isEn() ? en : zh; }
  function secCount(n) { return isEn() ? n + (n === 1 ? ' question' : ' questions') : n + ' 题'; }

  /* 英文模式：把 checklist-i18n.js 的内容按 id / 顺序覆盖进数据（只做一次，切换语言会整页刷新） */
  var _clLocalized = false;
  function ensureLocalized() {
    if (_clLocalized || !isEn() || typeof CHECKLIST_EN === 'undefined') return;
    var en = CHECKLIST_EN;
    CHECKLIST_DATA.categories.forEach(function (cat) {
      var ec = en.categories && en.categories[cat.id];
      if (ec) {
        if (ec.name) cat.name = ec.name;
        if (ec.desc) cat.desc = ec.desc;
      }
      cat.groups.forEach(function (g) {
        var eg = en.groups && en.groups[g.id];
        if (!eg) return;
        if (eg.book) g.book = eg.book;
        if (eg.title) g.title = eg.title;
        if (eg.intro) g.intro = eg.intro;
        if (eg.purpose) g.purpose = eg.purpose;
        if (eg.foot) g.foot = eg.foot;
        if (!eg.sections) return;
        g.sections.forEach(function (sec, si) {
          var es = eg.sections[si];
          if (!es) return;
          if (es.heading) sec.heading = es.heading;
          if (es.desc) sec.desc = es.desc;
          if (!es.items) return;
          sec.items.forEach(function (it, ii) {
            var ei = es.items[ii];
            if (!ei) return;
            if (ei.t) it.t = ei.t;
            if (ei.note) it.note = ei.note;
            if (ei.ph) it.ph = ei.ph;
          });
        });
      });
    });
    _clLocalized = true;
  }

  var LINES_OVERRIDE = {
    'ot-04-1-0': 5, 'ot-04-1-1': 5,
    'yj-02-0-4': 3,
    'ot-03-1-5': 2
  };
  function itemLines(it, key) {
    if (key && LINES_OVERRIDE[key]) return { n: LINES_OVERRIDE[key], hint: '' };
    var m = it.t.match(/(\d+)\s*[—–~～-]\s*(\d+)\s*(?:[件个条项]|items?|things?|goals?|achievements?)/i);
    if (m) return { n: Math.min(+m[2], 8), hint: tf('可填 {a}–{b} 条，一条聚焦一个方面；行数可增删', { a: m[1], b: m[2] }) };
    if (it.kind === 'data') return { n: 2, hint: '' };
    return { n: 3, hint: '' };
  }
  function keyAt(entry, j) { return j === 0 ? entry.key : entry.key + '-l' + j; }
  function lineCount(round, entry) {
    var rc = lineCounts[round];
    return (rc && rc[entry.key]) || itemLines(entry.item, entry.key).n;
  }
  function statKeys(round, entry) {
    var n = lineCount(round, entry), ks = [];
    for (var j = 0; j < n; j++) ks.push(keyAt(entry, j));
    return ks;
  }

  var FUELS = [
    { n: '燃料 1', name: '可迁移技能', desc: '学位、证书、语言、被反复提及的优点与情商' },
    { n: '燃料 2', name: '有意义的经验', desc: '旅行、海外工作、创业、演讲、教学等多样性经历' },
    { n: '燃料 3', name: '持久的关系', desc: '上司、客户、商业伙伴、身边人才与同类社群' }
  ];
  var WS_DEF_HAVE = 2, WS_DEF_PATHS = 2, WS_DEF_PROW = 1;
  function wsListCount(round, lkey, def) {
    var rc = lineCounts[round];
    return (rc && rc[lkey]) || def;
  }
  function wsSetCount(round, lkey, n) {
    if (!lineCounts[round]) lineCounts[round] = {};
    lineCounts[round][lkey] = n;
    saveLineCounts();
  }
  function wsStats(round) {
    var keys = ['yj-06-0-0', 'yj-06-0-1'];
    for (var t = 1; t <= 3; t++) {
      var c = wsListCount(round, 'yj-06-have-' + t, WS_DEF_HAVE);
      for (var j = 0; j < c; j++) keys.push('yj-06-have-' + t + '-' + j);
    }
    var pCnt = wsListCount(round, 'yj-06-paths', WS_DEF_PATHS);
    for (var p = 0; p < pCnt; p++) {
      keys.push('yj-06-p' + p + '-role');
      ['have', 'need'].forEach(function (kind) {
        var c2 = wsListCount(round, 'yj-06-p' + p + '-' + kind, WS_DEF_PROW);
        var pre = kind === 'have' ? 'hv' : 'nd';
        for (var j2 = 0; j2 < c2; j2++) keys.push('yj-06-p' + p + '-' + pre + j2);
      });
    }
    var r = answers[round] || {}, done = 0;
    keys.forEach(function (k) { if ((r[k] || '').trim()) done++; });
    return { total: keys.length, done: done };
  }
  function groupStats(round, g) {
    if (g.ws) return wsStats(round);
    var entries = flatItems(g);
    return { total: entries.length, done: countFilled(round, entries) };
  }
  function shiftVal(round, keyFrom, keyTo) {
    if (!answers[round]) answers[round] = {};
    var v = getAnsIn(round, keyFrom);
    if (v) answers[round][keyTo] = v;
    else delete answers[round][keyTo];
  }
  function shiftList(round, prefix, idx, n) {
    for (var j = idx; j < n - 1; j++) shiftVal(round, prefix + (j + 1), prefix + j);
    if (answers[round]) delete answers[round][prefix + (n - 1)];
    saveAnswers();
  }
  function shiftTwo(round, vPrefix, tPrefix, idx, n) {
    for (var j = idx; j < n - 1; j++) {
      shiftVal(round, vPrefix + (j + 1), vPrefix + j);
      shiftVal(round, tPrefix + (j + 1), tPrefix + j);
    }
    if (answers[round]) {
      delete answers[round][vPrefix + (n - 1)];
      delete answers[round][tPrefix + (n - 1)];
    }
    saveAnswers();
  }
  function delWsPath(round, p) {
    var n = wsListCount(round, 'yj-06-paths', WS_DEF_PATHS);
    if (n <= 1) { alert(t('至少保留一条路径。')); return; }
    var has = getAnsIn(round, 'yj-06-p' + p + '-role').trim() !== '';
    ['have', 'need'].forEach(function (kind) {
      var c = wsListCount(round, 'yj-06-p' + p + '-' + kind, WS_DEF_PROW);
      var pre = kind === 'have' ? 'hv' : 'nd';
      for (var j = 0; j < c; j++) {
        if (getAnsIn(round, 'yj-06-p' + p + '-' + pre + j).trim()) has = true;
      }
    });
    if (has && !confirm(t('这条路径里已有内容，删除后不可恢复，确定删除吗？'))) return;
    var last = n - 1;
    var lastHave = wsListCount(round, 'yj-06-p' + last + '-have', WS_DEF_PROW);
    var lastNeed = wsListCount(round, 'yj-06-p' + last + '-need', WS_DEF_PROW);
    for (var i = p; i < n - 1; i++) {
      shiftVal(round, 'yj-06-p' + (i + 1) + '-role', 'yj-06-p' + i + '-role');
      ['have', 'need'].forEach(function (kind) {
        var pre = kind === 'have' ? 'hv' : 'nd', tpre = kind === 'have' ? 'ht' : 'nt';
        var cNext = wsListCount(round, 'yj-06-p' + (i + 1) + '-' + kind, WS_DEF_PROW);
        var cCur = wsListCount(round, 'yj-06-p' + i + '-' + kind, WS_DEF_PROW);
        for (var j = 0; j < Math.max(cNext, cCur); j++) {
          shiftVal(round, 'yj-06-p' + (i + 1) + '-' + pre + j, 'yj-06-p' + i + '-' + pre + j);
          shiftVal(round, 'yj-06-p' + (i + 1) + '-' + tpre + j, 'yj-06-p' + i + '-' + tpre + j);
        }
        var rc = lineCounts[round] || {};
        var kn = 'yj-06-p' + (i + 1) + '-' + kind, kc = 'yj-06-p' + i + '-' + kind;
        if (rc[kn] !== undefined) {
          if (!lineCounts[round]) lineCounts[round] = {};
          lineCounts[round][kc] = rc[kn];
        } else if (rc[kc] !== undefined) {
          delete lineCounts[round][kc];
        }
      });
    }
    if (answers[round]) {
      delete answers[round]['yj-06-p' + last + '-role'];
      for (var a = 0; a < lastHave; a++) {
        delete answers[round]['yj-06-p' + last + '-hv' + a];
        delete answers[round]['yj-06-p' + last + '-ht' + a];
      }
      for (var b = 0; b < lastNeed; b++) {
        delete answers[round]['yj-06-p' + last + '-nd' + b];
        delete answers[round]['yj-06-p' + last + '-nt' + b];
      }
    }
    if (lineCounts[round]) {
      delete lineCounts[round]['yj-06-p' + last + '-have'];
      delete lineCounts[round]['yj-06-p' + last + '-need'];
    }
    wsSetCount(round, 'yj-06-paths', n - 1);
    saveAnswers();
  }
  function refreshWs(explicitRound) {
    if (reviewMode && rvRounds) {
      var side = rvRounds.indexOf(explicitRound || activeRound);
      if (side >= 0) document.getElementById('rvPane' + side).innerHTML = rvPaneHtml(side);
      else renderReview();
    } else {
      renderWorksheet();
    }
    updateNoteProgress();
    updateStats();
  }
  function wsHandleOp(el) {
    var round = el.dataset.round || null;
    var effRound = round || activeRound;
    var op = el.dataset.wsop;
    if (op === 'addHave') {
      var lk = 'yj-06-have-' + el.dataset.t;
      wsSetCount(effRound, lk, wsListCount(effRound, lk, WS_DEF_HAVE) + 1);
    } else if (op === 'delHave') {
      var lk2 = 'yj-06-have-' + el.dataset.t, i2 = +el.dataset.i;
      var n2 = wsListCount(effRound, lk2, WS_DEF_HAVE);
      if (n2 <= 1) return;
      if (getAnsIn(effRound, lk2 + '-' + i2).trim() &&
          !confirm(t('这条横线里已有内容，删除后不可恢复，确定删除吗？'))) return;
      shiftList(effRound, lk2 + '-', i2, n2);
      wsSetCount(effRound, lk2, n2 - 1);
    } else if (op === 'addPRow') {
      var lk3 = 'yj-06-p' + el.dataset.p + '-' + el.dataset.kind;
      wsSetCount(effRound, lk3, wsListCount(effRound, lk3, WS_DEF_PROW) + 1);
    } else if (op === 'delPRow') {
      var p4 = el.dataset.p, kind4 = el.dataset.kind, i4 = +el.dataset.i;
      var lk4 = 'yj-06-p' + p4 + '-' + kind4;
      var n4 = wsListCount(effRound, lk4, WS_DEF_PROW);
      if (n4 <= 1) return;
      var pre4 = kind4 === 'have' ? 'hv' : 'nd', tpre4 = kind4 === 'have' ? 'ht' : 'nt';
      if (getAnsIn(effRound, 'yj-06-p' + p4 + '-' + pre4 + i4).trim() &&
          !confirm(t('这条横线里已有内容，删除后不可恢复，确定删除吗？'))) return;
      shiftTwo(effRound, 'yj-06-p' + p4 + '-' + pre4, 'yj-06-p' + p4 + '-' + tpre4, i4, n4);
      wsSetCount(effRound, lk4, n4 - 1);
    } else if (op === 'addPath') {
      wsSetCount(effRound, 'yj-06-paths', wsListCount(effRound, 'yj-06-paths', WS_DEF_PATHS) + 1);
    } else if (op === 'delPath') {
      delWsPath(effRound, +el.dataset.p);
    }
    refreshWs(round);
  }

  function flatItems(g) {
    var out = [];
    g.sections.forEach(function (sec, si) {
      sec.items.forEach(function (it, ii) {
        out.push({ key: g.id + '-' + si + '-' + ii, si: si, ii: ii, item: it, sec: sec });
      });
    });
    return out;
  }
  function findGroup(id) {
    var found = null;
    CHECKLIST_DATA.categories.forEach(function (cat) {
      cat.groups.forEach(function (g) { if (g.id === id) { found = { cat: cat, g: g }; } });
    });
    return found;
  }
  function anyFilled(round, ks) {
    var r = answers[round] || {};
    return ks.some(function (k) { return (r[k] || '').trim() !== ''; });
  }
  function countFilled(round, entries) {
    return entries.filter(function (e) { return anyFilled(round, statKeys(round, e)); }).length;
  }
  function catStats(catId) {
    var total = 0, done = 0;
    CHECKLIST_DATA.categories.forEach(function (cat) {
      if (catId && cat.id !== catId) return;
      cat.groups.forEach(function (g) {
        var s = groupStats(activeRound, g);
        total += s.total;
        done += s.done;
      });
    });
    return { total: total, done: done };
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function coverArt(id) {
    var g = 'rgba(212,175,55,0.78)', gl = 'rgba(245,227,168,0.9)', gs = 'rgba(245,227,168,0.6)';
    var s = '<svg class="qc-art" viewBox="0 0 320 150" aria-hidden="true" preserveAspectRatio="xMidYMid meet">';
    switch (id) {
      case 'yj-01':
        s += '<circle cx="266" cy="34" r="3" fill="' + g + '"/><circle cx="40" cy="118" r="2.5" fill="' + g + '"/>' +
          '<text x="48" y="94" font-size="48" font-weight="800" fill="' + gl + '" font-family="Songti SC,serif">62</text>' +
          '<text x="128" y="60" font-size="19" fill="' + gs + '">10 000 h</text>' +
          '<text x="132" y="112" font-size="27" font-weight="700" fill="' + g + '">85%</text>' +
          '<text x="242" y="76" font-size="17" fill="' + gs + '">3–5</text>' +
          '<text x="238" y="102" font-size="13" fill="' + gs + '">×15 年</text>';
        break;
      case 'yj-02':
        s += '<g fill="rgba(212,175,55,0.10)" stroke="' + g + '" stroke-width="1.5">' +
          '<rect x="44" y="94" width="78" height="26" rx="6"/>' +
          '<rect x="74" y="68" width="78" height="26" rx="6"/>' +
          '<rect x="104" y="42" width="78" height="26" rx="6"/></g>' +
          '<path d="M206 84 H260" stroke="' + gl + '" stroke-width="2.5" stroke-dasharray="6 5"/>' +
          '<path d="M272 84 l-12 -7 v14 z" fill="' + gl + '"/>' +
          '<text x="206" y="68" font-size="12" fill="' + gs + '">可迁移</text>';
        break;
      case 'yj-03':
        s += '<polyline points="34,116 84,58 134,102 184,42 234,88 286,34" fill="none" stroke="' + g + '" stroke-width="2" stroke-dasharray="5 5"/>' +
          '<g fill="' + gl + '"><circle cx="34" cy="116" r="4"/><circle cx="84" cy="58" r="4"/><circle cx="134" cy="102" r="4"/><circle cx="184" cy="42" r="4"/><circle cx="234" cy="88" r="4"/><circle cx="286" cy="34" r="4.5"/></g>';
        break;
      case 'yj-04':
        s += '<g stroke="' + g + '" stroke-width="1.4"><line x1="160" y1="76" x2="72" y2="42"/><line x1="160" y1="76" x2="88" y2="114"/><line x1="160" y1="76" x2="248" y2="40"/><line x1="160" y1="76" x2="240" y2="112"/><line x1="160" y1="76" x2="160" y2="24"/></g>' +
          '<g fill="rgba(212,175,55,0.15)" stroke="' + g + '" stroke-width="1.5"><circle cx="72" cy="42" r="8"/><circle cx="88" cy="114" r="8"/><circle cx="248" cy="40" r="8"/><circle cx="240" cy="112" r="8"/><circle cx="160" cy="24" r="8"/></g>' +
          '<circle cx="160" cy="76" r="12" fill="rgba(245,227,168,0.25)" stroke="' + gl + '" stroke-width="1.8"/>';
        break;
      case 'yj-05':
        s += '<text x="50" y="68" font-size="24" fill="' + gs + '">?</text>' +
          '<text x="100" y="50" font-size="18" fill="' + gs + '">?</text>' +
          '<text x="146" y="104" font-size="54" font-weight="800" fill="' + gl + '">?</text>' +
          '<text x="212" y="50" font-size="18" fill="' + gs + '">?</text>' +
          '<text x="256" y="68" font-size="24" fill="' + gs + '">?</text>';
        break;
      case 'yj-06':
        s += '<g fill="rgba(212,175,55,0.07)" stroke="' + g + '" stroke-width="1.6">' +
          '<circle cx="138" cy="62" r="36"/><circle cx="182" cy="62" r="36"/><circle cx="160" cy="94" r="36"/></g>' +
          '<circle cx="160" cy="73" r="4" fill="' + gl + '"/>' +
          '<text x="104" y="30" font-size="12" fill="' + gs + '">擅长</text>' +
          '<text x="196" y="30" font-size="12" fill="' + gs + '">爱好</text>' +
          '<text x="138" y="142" font-size="12" fill="' + gs + '">世界需要</text>';
        break;
      case 'yj-07':
        s += '<g transform="rotate(-90 160 75)" fill="none" stroke-width="15">' +
          '<circle cx="160" cy="75" r="40" stroke="#d4af37" stroke-dasharray="56.5 194.7" stroke-dashoffset="0"/>' +
          '<circle cx="160" cy="75" r="40" stroke="#7db3f8" stroke-dasharray="56.5 194.7" stroke-dashoffset="-62.8"/>' +
          '<circle cx="160" cy="75" r="40" stroke="#6ee7a0" stroke-dasharray="56.5 194.7" stroke-dashoffset="-125.6"/>' +
          '<circle cx="160" cy="75" r="40" stroke="#c084fc" stroke-dasharray="56.5 194.7" stroke-dashoffset="-188.4"/></g>' +
          '<text x="160" y="81" text-anchor="middle" font-size="15" font-weight="700" fill="' + gl + '">100%</text>';
        break;
      case 'yj-08':
        s += '<rect x="82" y="26" width="112" height="96" rx="9" fill="rgba(212,175,55,0.07)" stroke="' + g + '" stroke-width="1.6"/>' +
          '<g stroke="' + g + '" stroke-width="1"><line x1="82" y1="48" x2="194" y2="48"/>' +
          '<line x1="110" y1="48" x2="110" y2="122"/><line x1="138" y1="48" x2="138" y2="122"/><line x1="166" y1="48" x2="166" y2="122"/>' +
          '<line x1="82" y1="73" x2="194" y2="73"/><line x1="82" y1="98" x2="194" y2="98"/></g>' +
          '<text x="138" y="41" text-anchor="middle" font-size="12" fill="' + gs + '">100 天</text>' +
          '<circle cx="236" cy="94" r="20" fill="none" stroke="' + gl + '" stroke-width="2.5"/>' +
          '<line x1="250" y1="108" x2="266" y2="126" stroke="' + gl + '" stroke-width="3" stroke-linecap="round"/>';
        break;
      case 'ot-01':
        s += '<rect x="84" y="32" width="152" height="66" rx="16" fill="rgba(212,175,55,0.08)" stroke="' + g + '" stroke-width="1.6"/>' +
          '<path d="M118 98 l-8 20 26 -16 z" fill="rgba(212,175,55,0.08)" stroke="' + g + '" stroke-width="1.6"/>' +
          '<text x="160" y="80" text-anchor="middle" font-size="40" font-weight="800" fill="' + gl + '">?</text>';
        break;
      case 'ot-02':
        s += '<circle cx="54" cy="76" r="6" fill="' + gl + '"/>' +
          '<g fill="none" stroke="' + g + '" stroke-width="1.8" stroke-dasharray="5 4">' +
          '<path d="M62 76 C 130 76, 150 28, 240 28"/>' +
          '<path d="M62 76 C 130 76, 150 60, 240 60"/>' +
          '<path d="M62 76 C 130 76, 150 94, 240 94"/>' +
          '<path d="M62 76 C 130 76, 150 122, 240 122"/></g>' +
          '<g fill="' + gl + '"><path d="M252 28 l-12 -6 v12 z"/><path d="M252 60 l-12 -6 v12 z"/><path d="M252 94 l-12 -6 v12 z"/><path d="M252 122 l-12 -6 v12 z"/></g>';
        break;
      case 'ot-03':
        s += '<circle cx="160" cy="75" r="44" fill="rgba(212,175,55,0.06)" stroke="' + g + '" stroke-width="1.6"/>' +
          '<g stroke="' + g + '" stroke-width="1.6"><line x1="160" y1="35" x2="160" y2="43"/><line x1="160" y1="107" x2="160" y2="115"/><line x1="120" y1="75" x2="128" y2="75"/><line x1="192" y1="75" x2="200" y2="75"/></g>' +
          '<line x1="160" y1="75" x2="160" y2="47" stroke="' + gl + '" stroke-width="2.5" stroke-linecap="round"/>' +
          '<line x1="160" y1="75" x2="182" y2="86" stroke="' + gl + '" stroke-width="2.5" stroke-linecap="round"/>' +
          '<path d="M198 48 A 52 52 0 0 1 208 102" fill="none" stroke="' + gs + '" stroke-width="1.5" stroke-dasharray="4 4"/>' +
          '<path d="M208 106 l-8 -6 10 -2 z" fill="' + gs + '"/>';
        break;
      case 'ot-04':
        s += '<g fill="rgba(255,254,249,0.05)" stroke="' + g + '" stroke-width="1.5">' +
          '<rect x="64" y="38" width="80" height="92" rx="8" transform="rotate(-7 104 84)"/>' +
          '<rect x="120" y="30" width="80" height="92" rx="8"/>' +
          '<rect x="176" y="38" width="80" height="92" rx="8" transform="rotate(7 216 84)"/></g>' +
          '<g stroke="' + gs + '" stroke-width="1.5"><line x1="134" y1="58" x2="186" y2="58"/><line x1="134" y1="72" x2="186" y2="72"/><line x1="134" y1="86" x2="172" y2="86"/></g>';
        break;
    }
    return s + '</svg>';
  }

  function cardHtml(cat, g, idx) {
    var num = (idx + 1) < 10 ? '0' + (idx + 1) : '' + (idx + 1);
    var st = groupStats(activeRound, g);
    var frame = cat.id === 'yuanjian' ? 'frame-gold' : 'frame-silver';
    var intro = (g.intro && g.intro[0]) || '';
    var html = '<article class="qcard ' + frame + '" id="cl-card-' + g.id + '" onclick="clOpenNote(\'' + g.id + '\')">';
    html += '<div class="qcard-face"><div class="qc-panel">';
    html += '<div class="qc-name-bar"><span class="qc-num">' + num + '</span>' +
            '<span class="qc-name">' + esc(g.title) + '</span>' +
            '<span class="qc-go">→</span></div>';
    html += '<div class="qc-cover"><span class="qc-ribbon">' + esc(g.book) + '</span>' +
            coverArt(g.id) + '</div>';
    if (intro) html += '<p class="qc-intro">' + esc(intro) + '</p>';
    if (g.purpose) html += '<div class="qc-purpose"><span class="tag">理清</span>' + (isEn() ? ' ' : '') + esc(g.purpose) + '</div>';
    html += '<div class="qc-stats">' +
            '<div class="qc-stat"><span class="stat-lbl">条目</span><b>' + st.total + '</b></div>' +
            '<div class="qc-stat"><span class="stat-lbl gold">已填</span><b class="qc-done">' + st.done + '</b></div>' +
            '<div class="qc-prog"><span class="qc-prog-text">完成 <b class="qc-pct">' +
              (st.total ? Math.round(st.done / st.total * 100) : 0) + '%</b></span>' +
            '<span class="qc-prog-bar"><i style="width:' +
              (st.total ? st.done / st.total * 100 : 0) + '%"></i></span></div></div>';
    html += '<div class="qc-foot"><span>' + cat.icon + ' ' + esc(cat.name) + '</span>' +
            '<span class="cta">进入填写 →</span></div>';
    html += '</div></div></article>';
    return html;
  }

  function renderIndex() {
    ensureLocalized();
    var html = '';
    CHECKLIST_DATA.categories.forEach(function (cat) {
      html += '<section class="cat" data-cat="' + cat.id + '">';
      html += '<div class="cat-head">' +
        '<span class="cat-title">' + cat.icon + ' ' + esc(cat.name) + '</span>' +
        '<span class="cat-progress"><span class="cat-bar"><i id="cl-bar-' + cat.id + '"></i></span>' +
        '<span class="cat-meta" id="cl-meta-' + cat.id + '"></span></span></div>';
      html += '<p class="cat-desc">' + esc(cat.desc) + '</p>';
      html += '<div class="cards">';
      cat.groups.forEach(function (g, idx) { html += cardHtml(cat, g, idx); });
      html += '</div></section>';
    });
    document.getElementById('clApp').innerHTML = html;
    updateStats();
  }

  function clSetFilter(cat) {
    document.querySelectorAll('#clSeg button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.cat === cat);
    });
    document.querySelectorAll('#clApp .cat').forEach(function (sec) {
      sec.style.display = (cat === 'all' || sec.dataset.cat === cat) ? '' : 'none';
    });
  }

  function updateStats() {
    CHECKLIST_DATA.categories.forEach(function (cat) {
      var s = catStats(cat.id);
      var meta = document.getElementById('cl-meta-' + cat.id);
      var bar = document.getElementById('cl-bar-' + cat.id);
      if (meta) meta.innerHTML = '已填写 <b>' + s.done + '</b> / ' + s.total;
      if (bar) bar.style.width = (s.total ? (s.done / s.total * 100) : 0) + '%';
    });
    var g = catStats(null);
    document.getElementById('clStatDone').textContent = g.done;
    document.getElementById('clStatTotal').textContent = g.total;
    document.getElementById('clStatItems').textContent = g.total;
    document.querySelectorAll('#checklistView .stat-round').forEach(function (el) { el.textContent = activeRound; });
    CHECKLIST_DATA.categories.forEach(function (cat) {
      cat.groups.forEach(function (gr) {
        var el = document.getElementById('cl-card-' + gr.id);
        if (!el) return;
        var st = groupStats(activeRound, gr);
        var pct = st.total ? Math.round(st.done / st.total * 100) : 0;
        var d = el.querySelector('.qc-done');
        if (d) d.textContent = st.done;
        var p = el.querySelector('.qc-pct');
        if (p) p.textContent = pct + '%';
        var i = el.querySelector('.qc-prog-bar i');
        if (i) i.style.width = pct + '%';
      });
    });
  }

  function renderRoundControls() {
    var html = '<span class="tb-label">轮次</span><div class="segmented seg-round">';
    rounds.forEach(function (r) {
      html += '<button data-round="' + esc(r) + '"' + (r === activeRound ? ' class="active"' : '') + '>' + esc(r) + '</button>';
    });
    html += '</div><button class="btn-ghost" onclick="clAddRound()">＋ 新一轮</button>';
    document.querySelectorAll('#checklistView .round-controls').forEach(function (el) { el.innerHTML = html; });
    document.querySelectorAll('#checklistView .stat-round').forEach(function (el) { el.textContent = activeRound; });
  }

  function refreshBody() {
    if (!current) return;
    var nh = document.getElementById('clNoteHead');
    var tri = current.g.layout === 'tri';
    var w = '';
    if (!reviewMode) w = current.g.ws ? '' : (tri ? 'min(100%, 2200px)' : (viewMode === 'wall' ? '1120px' : '1240px'));
    nh.style.maxWidth = w;
    nh.style.margin = w ? '0 auto' : '';
    if (reviewMode) return renderReview();
    if (current.g.ws) return renderWorksheet();
    viewMode === 'wall' ? renderWall() : renderFocus();
  }

  function setRound(r) {
    if (rounds.indexOf(r) < 0 || r === activeRound) return;
    activeRound = r;
    saveActiveRound();
    renderRoundControls();
    updateStats();
    if (reviewMode && rvRounds) rvRounds[1] = r;
    refreshBody();
  }

  function clAddRound() {
    var years = rounds.map(function (x) { return parseInt(x, 10); }).filter(function (x) { return !isNaN(x); });
    var base = years.length ? Math.max.apply(null, years) : new Date().getFullYear();
    var def = String(base + 1);
    var label = prompt(tf('新一轮的名称（建议用年份，如 {year}）：', { year: def }), def);
    if (label === null) return;
    label = label.trim();
    if (!label) return;
    if (rounds.indexOf(label) >= 0) { alert(tf('已存在同名轮次：{name}', { name: label })); return; }
    rounds.push(label);
    rounds = sortRoundList(rounds);
    saveRounds();
    activeRound = label;
    saveActiveRound();
    renderRoundControls();
    updateStats();
    if (reviewMode && rvRounds) rvRounds[1] = label;
    refreshBody();
  }

  function clResetRound() {
    if (!confirm(tf('确定清空「{round}」这一轮的全部填写内容吗？其他轮次不受影响。', { round: activeRound }))) return;
    answers[activeRound] = {};
    delete lineCounts[activeRound];
    saveAnswers();
    saveLineCounts();
    refreshBody();
    updateStats();
  }

  var current = null;
  var reviewMode = false;
  var rvRounds = null;
  var pairIdx = 0;
  var pairs = [];
  var entryByKey = {};

  function clOpenNote(id) {
    ensureLocalized();
    var found = findGroup(id);
    if (!found) return;
    current = { cat: found.cat, g: found.g, steps: flatItems(found.g) };
    entryByKey = {};
    current.steps.forEach(function (s) { entryByKey[s.key] = s; });
    reviewMode = false;
    rvRounds = null;
    pairs = buildPairs(current.steps);
    pairIdx = 0;
    refSel = '1';
    document.getElementById('clIndexView').style.display = 'none';
    document.getElementById('clNoteView').style.display = 'block';
    document.getElementById('clNoteView').classList.toggle('tri-note', found.g.layout === 'tri');
    renderNotePage();
    window.scrollTo(0, 0);
  }

  function clCloseNote() {
    current = null;
    reviewMode = false;
    rvRounds = null;
    document.getElementById('clNoteView').style.display = 'none';
    document.getElementById('clNoteView').classList.remove('tri-note');
    document.getElementById('clIndexView').style.display = '';
    updateStats();
  }

  function clToggleReview() {
    if (!current) return;
    reviewMode = !reviewMode;
    renderNotePage();
    window.scrollTo(0, 0);
  }

  function renderViewSwitch() {
    var el = document.getElementById('clViewSwitch');
    if (!current || current.g.ws || reviewMode) { el.innerHTML = ''; return; }
    el.innerHTML = '<div class="segmented seg-view">' +
      '<button data-view="focus"' + (viewMode === 'focus' ? ' class="active"' : '') + '>🎯 逐题</button>' +
      '<button data-view="wall"' + (viewMode === 'wall' ? ' class="active"' : '') + '>▦ 全览</button></div>';
  }

  function renderNotePage() {
    var g = current.g;
    var total = groupStats(activeRound, g).total;
    var meta = isEn()
      ? (g.ws
        ? total + ' prompts · worksheet · revisit each year'
        : total + ' questions · ' + g.sections.length + (g.sections.length === 1 ? ' section' : ' sections') + ' · revisit each year')
      : '共 ' + total + ' 题 · ' + (g.ws ? '工作表 · 按年份反复作答' : '分 ' + g.sections.length + ' 个板块 · 按年份反复作答');
    var head = '<div class="note-head">';
    head += '<span class="note-head-chip">' + esc(g.book) + '</span>';
    head += '<h2 class="note-title">' + esc(g.title) + '</h2>';
    head += '<div class="note-meta">' + meta + '</div>';
    (g.intro || []).forEach(function (p) { head += '<p class="note-intro">' + esc(p) + '</p>'; });
    if (g.purpose) head += '<p class="note-intro note-purpose"><b>理清：</b>' + esc(g.purpose) + '</p>';
    if (g.foot) head += '<div class="note-foot">' + esc(g.foot) + '</div>';
    head += '</div>';
    document.getElementById('clNoteHead').innerHTML = head;

    var bar = '<button class="btn-ghost' + (reviewMode ? ' active' : '') + '" id="clCmpBtn" onclick="clToggleReview()">' +
              (reviewMode ? '✕ 退出对照' : '⇄ 回顾对照') + '</button>';
    var topbar = document.querySelector('#clNoteView .note-topbar');
    var oldCmp = topbar.querySelector('#clCmpBtn');
    if (oldCmp) oldCmp.outerHTML = bar;

    renderViewSwitch();
    document.getElementById('clNoteTotal').textContent = groupStats(activeRound, current.g).total;
    refreshBody();
  }

  function questionHtml(it) {
    var kind = it.kind || 'q';
    return '<div class="witem-q"><span class="glyph ' + kind + '" title="' + (GLYPH_TITLE[kind] || '') + '">' +
           (GLYPH[kind] || '自问') + '</span>' +
           '<div><div class="item-text">' + esc(it.t) + '</div>' +
           (it.note ? '<div class="item-note">' + esc(it.note) + '</div>' : '') + '</div></div>';
  }

  function itemInputsHtml(entry, round) {
    var effRound = round || activeRound;
    var it = entry.item, L = itemLines(it, entry.key);
    var n = lineCount(effRound, entry);
    var rattr = round ? ' data-round="' + esc(round) + '"' : '';
    var ph = it.ph || (round ? tf('（{round} 未填写）', { round: round }) : t('一条一条写，每条聚焦一个方面…'));
    var html = '<div class="lines" data-lines="' + entry.key + '" data-lround="' + (round ? esc(round) : '') + '">';
    if (L.hint) html += '<div class="lines-hint">' + esc(L.hint) + '</div>';
    for (var j = 0; j < n; j++) {
      var k = keyAt(entry, j);
      html += '<div class="line-row"><span class="n">' + (j + 1) + '.</span>' +
              '<input type="text" class="line-input" data-key="' + k + '"' + rattr +
              ' placeholder="' + esc(ph) + '" value="' + esc(getAnsIn(effRound, k)) + '">' +
              (n > 1 ? '<button class="line-del" data-key="' + entry.key + '" data-i="' + j + '"' + rattr + ' title="删除这条">✕</button>' : '') +
              '</div>';
    }
    html += '<button class="line-add" data-key="' + entry.key + '"' + rattr + '>＋ 添加一条</button></div>';
    return html;
  }

  function rerenderLines(entry, explicitRound) {
    var sel = '[data-lines="' + entry.key + '"][data-lround="' + (explicitRound ? esc(explicitRound) : '') + '"]';
    var el = document.querySelector(sel);
    if (el) el.outerHTML = itemInputsHtml(entry, explicitRound || undefined);
    updateNoteProgress();
    updateStats();
    if (current && !reviewMode && !current.g.ws && viewMode === 'focus') syncFocusDots();
  }
  function addLine(k, round) {
    var entry = entryByKey[k];
    if (!entry) return;
    var effRound = round || activeRound;
    if (!lineCounts[effRound]) lineCounts[effRound] = {};
    lineCounts[effRound][k] = lineCount(effRound, entry) + 1;
    saveLineCounts();
    rerenderLines(entry, round || null);
  }
  function delLine(k, idx, round) {
    var entry = entryByKey[k];
    if (!entry) return;
    var effRound = round || activeRound;
    var n = lineCount(effRound, entry);
    if (n <= 1 || idx < 0 || idx >= n) return;
    var val = getAnsIn(effRound, keyAt(entry, idx));
    if (val.trim() && !confirm(t('这条横线里已有内容，删除后不可恢复，确定删除吗？'))) return;
    if (!answers[effRound]) answers[effRound] = {};
    for (var j = idx; j < n - 1; j++) {
      var v = getAnsIn(effRound, keyAt(entry, j + 1));
      if (v) answers[effRound][keyAt(entry, j)] = v;
      else delete answers[effRound][keyAt(entry, j)];
    }
    delete answers[effRound][keyAt(entry, n - 1)];
    if (!lineCounts[effRound]) lineCounts[effRound] = {};
    lineCounts[effRound][k] = n - 1;
    saveAnswers();
    saveLineCounts();
    rerenderLines(entry, round || null);
  }

  /* 逐题：默认左右等宽双题并按板块边界分组；layout:'tri' 的页面按板块整组展示 */
  function buildPairs(steps) {
    var out = [], cur = [];
    var tri = current && current.g && current.g.layout === 'tri';
    steps.forEach(function (s, i) {
      if (tri) {
        if (cur.length && s.si !== steps[cur[0]].si) {
          out.push(cur);
          cur = [];
        }
      } else if (cur.length === 2 || (cur.length && s.si !== steps[cur[0]].si)) {
        out.push(cur);
        cur = [];
      }
      cur.push(i);
    });
    if (cur.length) out.push(cur);
    return out;
  }
  function focusCardHtml(i) {
    var st = current.steps[i], n = current.steps.length;
    return '<div class="focus-card">' +
      '<div class="focus-meta">' + esc(st.sec.heading) + ' · ' + tf('第 {i} / {n} 题', { i: i + 1, n: n }) + '</div>' +
      '<div class="focus-q">' + questionHtml(st.item) + '</div>' +
      itemInputsHtml(st) + '</div>';
  }
  function renderFocus() {
    var steps = current.steps;
    var tri = current.g.layout === 'tri';
    if (pairIdx > pairs.length - 1) pairIdx = 0;
    var pair = pairs[pairIdx] || [0];
    var html = '<div class="focus' + (tri ? ' tri' : '') + '"><div class="focus-dots">';
    steps.forEach(function (s, i) {
      var cls = 'fdot' + (anyFilled(activeRound, statKeys(activeRound, s)) ? ' done' : '') +
        (pair.indexOf(i) >= 0 ? ' cur' : '');
      html += '<button class="' + cls + '" data-i="' + i + '" title="' + esc(s.sec.heading) + ' · ' + esc(tf('第 {i} 题', { i: i + 1 })) + '"></button>';
    });
    html += '</div>';
    if (tri) {
      var sec = steps[pair[0]] && steps[pair[0]].sec;
      if (sec && sec.desc) html += '<div class="focus-group-desc">' + esc(sec.desc) + '</div>';
    }
    html += '<div class="focus-pair' + (pair.length > 1 ? '' : ' single') + (tri ? ' tri' : '') + '">';
    pair.forEach(function (i) { html += focusCardHtml(i); });
    html += '</div><div class="focus-btns">' +
      '<button class="btn-ghost"' + (pairIdx === 0 ? ' disabled' : '') + ' onclick="clGoPair(' + (pairIdx - 1) + ')">← 上一组</button>' +
      (pairIdx < pairs.length - 1
        ? '<button class="btn-ghost" onclick="clGoPair(' + (pairIdx + 1) + ')">下一组 →</button>'
        : '<button class="btn-ghost" onclick="clCloseNote()">完成 ✓ 返回清单</button>') +
      '</div></div>';
    document.getElementById('clNoteBody').innerHTML = html;
    updateNoteProgress();
  }
  function clGoPair(i) {
    pairIdx = Math.max(0, Math.min(pairs.length - 1, i));
    renderFocus();
  }
  function syncFocusDots() {
    var steps = current.steps, pair = pairs[pairIdx] || [];
    steps.forEach(function (s, i) {
      var dot = document.querySelector('.fdot[data-i="' + i + '"]');
      if (dot) dot.classList.toggle('done', anyFilled(activeRound, statKeys(activeRound, s)));
      if (dot) dot.classList.toggle('cur', pair.indexOf(i) >= 0);
    });
  }

  function renderWall() {
    var g = current.g;
    var tri = g.layout === 'tri';
    var html = '';
    g.sections.forEach(function (sec, si) {
      html += '<section class="sec-panel' + (tri ? ' tri' : '') + '">' +
              '<div class="sec-panel-head"><span>' + esc(sec.heading) + '</span>' +
              '<span class="sec-count">' + secCount(sec.items.length) + '</span>' +
              (tri && sec.desc ? '<span class="sec-desc">' + esc(sec.desc) + '</span>' : '') +
              '</div><div class="sec-items">';
      sec.items.forEach(function (it, ii) {
        var entry = entryByKey[g.id + '-' + si + '-' + ii];
        html += '<div class="witem">' + questionHtml(it) + itemInputsHtml(entry) + '</div>';
      });
      html += '</div></section>';
    });
    document.getElementById('clNoteBody').innerHTML = html;
    updateNoteProgress();
  }

  /* 甜蜜区页：左侧只读燃料库，右侧工作表 */
  var REF_MAP = { '1': 'yj-02', '2': 'yj-03', '3': 'yj-04' };
  var refSel = '1';
  function refPaneHtml() {
    var g = findGroup(REF_MAP[refSel]).g;
    var html = '<div class="rv-bar"><span class="rv-bar-label">' + tf('我的燃料库（{round}· 只读）', { round: activeRound }) + '</span>' +
               '<div class="segmented seg-ref">';
    [1, 2, 3].forEach(function (n) {
      html += '<button data-ref="' + n + '"' + (String(n) === refSel ? ' class="active"' : '') + '>' +
              esc(t(FUELS[n - 1].n)) + '</button>';
    });
    html += '</div></div><div class="ref-body">';
    html += '<div class="ref-group-title">' + esc(g.title) + '</div>';
    var any = false;
    g.sections.forEach(function (sec, si) {
      html += '<div class="rv-sec">' + esc(sec.heading) + '</div>';
      sec.items.forEach(function (it, ii) {
        var entry = { key: g.id + '-' + si + '-' + ii, item: it };
        var n = lineCount(activeRound, entry);
        var vals = [];
        for (var j = 0; j < n; j++) {
          var v = getAnsIn(activeRound, keyAt(entry, j)).trim();
          if (v) vals.push(v);
        }
        html += '<div class="ref-item"><div class="ref-q">' + esc(it.t) + '</div>';
        if (vals.length) {
          any = true;
          html += '<ul class="ref-vals">';
          vals.forEach(function (v) { html += '<li>' + esc(v) + '</li>'; });
          html += '</ul>';
        } else {
          html += '<div class="ref-none">（未填写）</div>';
        }
        html += '</div>';
      });
    });
    if (!any) {
      html += '<div class="ref-empty">' + esc(tf('「{title}」在「{round}」这一轮尚未填写，可先返回清单进入该卡片填写，再回来对照。', { title: g.title, round: activeRound })) + '</div>';
    }
    return html + '</div>';
  }
  function renderWorksheet() {
    document.getElementById('clNoteBody').innerHTML =
      '<div class="split-wrap">' +
      '<div class="rv-pane ref-pane" id="refPane">' + refPaneHtml() + '</div>' +
      '<div>' + renderWorksheetHtml() + '</div></div>';
    updateNoteProgress();
  }
  function renderWorksheetHtml(round) {
    var effRound = round || activeRound;
    var rattr = round ? ' data-round="' + esc(round) + '"' : '';
    var S0 = current.g.sections[0];
    function val(k) { return getAnsIn(effRound, k); }
    function blank(k, ph, cls) {
      return '<input type="text" class="ws-blank ' + (cls || '') + '" data-key="' + k + '"' + rattr +
             ' placeholder="' + esc(ph || '') + '" value="' + esc(val(k)) + '">';
    }
    var html = '<div class="ws">';
    html += '<div class="ws-box ws-ideal"><div class="ws-ideal-title">' + t('你的职业理想') + '</div>' +
            '<div class="ws-ideal-line">' + tr('“在 ', 'In ') + blank('yj-06-0-0', S0.items[0].ph) +
            tr(' 年内成为 ', ' years, become ') + blank('yj-06-0-1', S0.items[1].ph, 'ws-goal') +
            tr(' 。”', '.') + '</div></div>';
    html += '<div class="ws-legend">';
    FUELS.forEach(function (f) {
      html += '<div class="ws-legend-item"><span class="ws-fuel-chip">' + t(f.n) + '</span><b>' + t(f.name) + '</b>' +
              '<span>' + t(f.desc) + '</span></div>';
    });
    html += '</div>';
    html += '<div class="ws-block-title">' + t('你目前拥有的职场燃料') + '<span class="ws-block-sub">' + t('按三类燃料盘点，行数可增删') + '</span></div>';
    html += '<div class="ws-box ws-cols3">';
    FUELS.forEach(function (f, ti) {
      var fuelNo = ti + 1, lkey = 'yj-06-have-' + fuelNo;
      var cnt = wsListCount(effRound, lkey, WS_DEF_HAVE);
      html += '<div class="ws-col"><h4><span class="ws-fuel-chip">' + t(f.n) + '</span>' + t(f.name) + '</h4>';
      for (var j = 0; j < cnt; j++) {
        html += '<div class="ws-fuel-row"><span class="n">' + (j + 1) + '.</span>' +
                blank(lkey + '-' + j, t('一条一条写…')) +
                (cnt > 1 ? '<button class="line-del" data-wsop="delHave" data-t="' + fuelNo + '" data-i="' + j + '"' + rattr + ' title="' + t('删除这条') + '">✕</button>' : '') +
                '</div>';
      }
      html += '<button class="line-add" data-wsop="addHave" data-t="' + fuelNo + '"' + rattr + '>' + t('＋ 添加一条') + '</button></div>';
    });
    html += '</div>';
    html += '<div class="ws-block-title">' + t('达成目标所需要的职场燃料') + '<span class="ws-block-sub">' + t('由下方各路径的「所需燃料」按类型自动汇总，无需在此填写') + '</span></div>';
    html += '<div class="ws-box ws-cols3 ws-need-agg">' + needAggHtml(effRound) + '</div>';
    var pCnt = wsListCount(effRound, 'yj-06-paths', WS_DEF_PATHS);
    html += '<div class="ws-paths">';
    for (var p = 0; p < pCnt; p++) html += wsPathHtml(p, effRound, rattr);
    html += '</div>';
    html += '<button class="btn-path-add" data-wsop="addPath"' + rattr + '>' + t('＋ 添加一条路径') + '</button>';
    html += '</div>';
    return html;
  }
  function wsPathHtml(p, effRound, rattr) {
    var letter = String.fromCharCode(65 + p);
    var roleKey = 'yj-06-p' + p + '-role';
    var html = '<div class="ws-path-wrap"><div class="ws-box ws-path">' +
      '<h4>' + tr('职场路径 ', 'Career Path ') + letter +
      '<button class="line-del ws-path-del" data-wsop="delPath" data-p="' + p + '"' + rattr + ' title="' + t('删除这条路径') + '">✕</button></h4>' +
      '<div class="ws-path-row"><label>' + t('角色 / 职位') + '</label>' +
      '<input type="text" class="ws-blank ws-role" data-key="' + roleKey + '"' + rattr +
      ' placeholder="' + t('如 产品总监') + '" value="' + esc(getAnsIn(effRound, roleKey)) + '"></div>' +
      '<div class="ws-path-cols">';
    ['have', 'need'].forEach(function (kind) {
      var title = kind === 'have' ? t('已拥有的燃料') : t('达成目标所需燃料');
      var ph = kind === 'have' ? t('这条路径要用到的已有燃料…') : t('还缺什么燃料…');
      var cnt = wsListCount(effRound, 'yj-06-p' + p + '-' + kind, WS_DEF_PROW);
      html += '<div class="ws-pcol"><h5>' + title + (isEn() ? ' ' : '') + '<span class="ws-block-sub" style="color:#b3a37e">' + t('（勾选是燃料几）') + '</span></h5>';
      for (var j = 0; j < cnt; j++) {
        var vk = 'yj-06-p' + p + '-' + (kind === 'have' ? 'hv' : 'nd') + j;
        var tk = 'yj-06-p' + p + '-' + (kind === 'have' ? 'ht' : 'nt') + j;
        var cur = getAnsIn(effRound, tk);
        html += '<div class="ws-prow">' +
          '<span class="ws-tag" data-tk="' + tk + '"' + rattr + '>' +
          [1, 2, 3].map(function (n) {
            return '<button data-t="' + n + '" class="' + (cur === String(n) ? 'on' : '') + '" title="' + esc(t(FUELS[n - 1].n) + ' · ' + t(FUELS[n - 1].name)) + '">' + n + '</button>';
          }).join('') + '</span>' +
          '<input type="text" class="line-input' + (kind === 'need' ? ' ws-need-input' : '') + '" data-key="' + vk + '"' + rattr +
          ' placeholder="' + ph + '" value="' + esc(getAnsIn(effRound, vk)) + '">' +
          (cnt > 1 ? '<button class="line-del" data-wsop="delPRow" data-p="' + p + '" data-kind="' + kind + '" data-i="' + j + '"' + rattr + ' title="' + t('删除这条') + '">✕</button>' : '') +
          '</div>';
      }
      html += '<button class="line-add" data-wsop="addPRow" data-p="' + p + '" data-kind="' + kind + '"' + rattr + '>' + t('＋ 添加一条') + '</button></div>';
    });
    html += '</div></div></div>';
    return html;
  }
  function needAggHtml(round) {
    var pCnt = wsListCount(round, 'yj-06-paths', WS_DEF_PATHS);
    var cols = [[], [], []];
    for (var p = 0; p < pCnt; p++) {
      var cnt = wsListCount(round, 'yj-06-p' + p + '-need', WS_DEF_PROW);
      for (var j = 0; j < cnt; j++) {
        var v = getAnsIn(round, 'yj-06-p' + p + '-nd' + j).trim();
        if (!v) continue;
        var fuelType = +(getAnsIn(round, 'yj-06-p' + p + '-nt' + j) || '1');
        if (fuelType < 1 || fuelType > 3) fuelType = 1;
        cols[fuelType - 1].push({ p: p, v: v });
      }
    }
    var html = '';
    FUELS.forEach(function (f, i) {
      html += '<div class="ws-col"><h4><span class="ws-fuel-chip">' + t(f.n) + '</span>' + t(f.name) + '</h4>';
      if (cols[i].length) {
        cols[i].forEach(function (x) {
          html += '<div class="ws-agg-row"><span class="ws-agg-badge">' + String.fromCharCode(65 + x.p) + '</span><span>' + esc(x.v) + '</span></div>';
        });
      } else {
        html += '<div class="ws-agg-empty">' + t('暂无 — 在下方路径中填写') + '</div>';
      }
      html += '</div>';
    });
    return html;
  }

  /* 回顾对照：左右分屏，两侧各自选轮次 */
  function rvPaneHtml(side) {
    var r = rvRounds[side], g = current.g;
    var html = '<div class="rv-bar"><span class="rv-bar-label">' + (side === 0 ? t('◀ 左侧') : t('右侧 ▶')) + '</span>' +
               '<div class="segmented seg-rv">';
    rounds.forEach(function (x) {
      html += '<button data-side="' + side + '" data-round="' + esc(x) + '"' + (x === r ? ' class="active"' : '') + '>' + esc(x) + '</button>';
    });
    html += '</div></div>';
    if (g.ws) return html + '<div class="rv-list">' + renderWorksheetHtml(r) + '</div>';
    html += '<div class="rv-list">';
    g.sections.forEach(function (sec, si) {
      html += '<div class="rv-sec">' + esc(sec.heading) + '</div>';
      sec.items.forEach(function (it, ii) {
        var entry = entryByKey[g.id + '-' + si + '-' + ii];
        html += '<div class="rv-item">' + questionHtml(it) + itemInputsHtml(entry, r) + '</div>';
      });
    });
    html += '</div>';
    return html;
  }

  function renderReview() {
    if (!rvRounds) {
      var i = rounds.indexOf(activeRound);
      rvRounds = [i > 0 ? rounds[i - 1] : rounds[0], activeRound];
    }
    document.getElementById('clNoteBody').innerHTML = '<div class="rv">' +
      '<div class="rv-pane" id="rvPane0">' + rvPaneHtml(0) + '</div>' +
      '<div class="rv-pane" id="rvPane1">' + rvPaneHtml(1) + '</div></div>' +
      '<div class="cmp-hint">' + t('左右两侧可各自选择轮次，对照追踪自己的成长；两侧内容都可直接修改，自动保存。') + '</div>';
    updateNoteProgress();
  }

  function updateNoteProgress() {
    if (!current) return;
    var s = groupStats(activeRound, current.g);
    document.getElementById('clNoteDone').textContent = s.done;
    document.getElementById('clNoteTotal').textContent = s.total;
    document.getElementById('clNoteBar').style.width = (s.total ? s.done / s.total * 100 : 0) + '%';
  }

  document.addEventListener('input', function (e) {
    var el = e.target;
    if (!el || !el.matches || !el.matches('[data-key]') || !el.closest('#checklistView')) return;
    setAns(el.dataset.round || activeRound, el.dataset.key, el.value);
    if (el.classList && el.classList.contains('ws-need-input')) {
      var wsRoot = el.closest('.ws');
      var wsAgg = wsRoot && wsRoot.querySelector('.ws-need-agg');
      if (wsAgg) wsAgg.innerHTML = needAggHtml(el.dataset.round || activeRound);
    }
    var hint = document.getElementById('clSaveHint');
    if (hint) hint.textContent = t('已保存') + ' ' + new Date().toLocaleTimeString(isEn() ? 'en-US' : 'zh-CN', { hour12: false });
    if (current && !reviewMode && !current.g.ws && viewMode === 'focus') syncFocusDots();
    updateNoteProgress();
    updateStats();
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest || !e.target.closest('#checklistView')) return;
    var b = e.target.closest('.seg-round button');
    if (b) { setRound(b.dataset.round); return; }
    var vb = e.target.closest('.seg-view button');
    if (vb) {
      viewMode = vb.dataset.view;
      try { localStorage.setItem(VIEW_KEY, viewMode); } catch (err) {}
      renderViewSwitch();
      refreshBody();
      return;
    }
    var wop = e.target.closest('[data-wsop]');
    if (wop) { wsHandleOp(wop); return; }
    var rf = e.target.closest('.seg-ref button');
    if (rf) {
      refSel = rf.dataset.ref;
      var rp = document.getElementById('refPane');
      if (rp) rp.innerHTML = refPaneHtml();
      return;
    }
    var wtag = e.target.closest('.ws-tag button');
    if (wtag) {
      var span = wtag.closest('.ws-tag');
      var teff = (span.dataset.round || null) || activeRound;
      setAns(teff, span.dataset.tk, wtag.dataset.t);
      span.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === wtag); });
      var root = wtag.closest('.ws');
      var agg = root && root.querySelector('.ws-need-agg');
      if (agg) agg.innerHTML = needAggHtml(teff);
      return;
    }
    var la = e.target.closest('.line-add');
    if (la) { addLine(la.dataset.key, la.dataset.round || null); return; }
    var ld = e.target.closest('.line-del');
    if (ld) { delLine(ld.dataset.key, +ld.dataset.i, ld.dataset.round || null); return; }
    var dot = e.target.closest('.fdot');
    if (dot) {
      var di = +dot.dataset.i;
      for (var pi = 0; pi < pairs.length; pi++) {
        if (pairs[pi].indexOf(di) >= 0) { clGoPair(pi); break; }
      }
      return;
    }
    var rb = e.target.closest('.seg-rv button');
    if (rb && rvRounds) {
      var side = +rb.dataset.side;
      rvRounds[side] = rb.dataset.round;
      document.getElementById('rvPane' + side).innerHTML = rvPaneHtml(side);
    }
  });
  document.addEventListener('keydown', function (e) {
    if (!current || reviewMode || current.g.ws || viewMode !== 'focus') return;
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    if (e.key === 'ArrowLeft') clGoPair(pairIdx - 1);
    if (e.key === 'ArrowRight') clGoPair(pairIdx + 1);
  });

  /* 对外暴露 */
  window.clOpenChecklist = function () {
    ensureLocalized();
    hideAllViews();
    current = null;
    reviewMode = false;
    rvRounds = null;
    document.getElementById('clNoteView').style.display = 'none';
    document.getElementById('clNoteView').classList.remove('tri-note');
    document.getElementById('clIndexView').style.display = '';
    document.getElementById('checklistView').style.display = 'block';
    document.getElementById('clStatNotes').textContent =
      CHECKLIST_DATA.categories.reduce(function (n, c) { return n + c.groups.length; }, 0);
    renderIndex();
    renderRoundControls();
    window.scrollTo(0, 0);
    if (window._gradientBg) _gradientBg.reset();
  };
  window.clClose = function () {
    current = null;
    reviewMode = false;
    rvRounds = null;
    document.getElementById('checklistView').style.display = 'none';
    openHub();
  };
  window.clSetFilter = clSetFilter;
  window.clOpenNote = clOpenNote;
  window.clCloseNote = clCloseNote;
  window.clToggleReview = clToggleReview;
  window.clAddRound = clAddRound;
  window.clResetRound = clResetRound;
  window.clGoPair = clGoPair;
  window.clHubMeta = function () {
    ensureLocalized();
    var notes = 0, items = 0;
    CHECKLIST_DATA.categories.forEach(function (c) {
      notes += c.groups.length;
      c.groups.forEach(function (g) { items += g.ws ? wsStats('__none__').total : flatItems(g).length; });
    });
    return tf('{n} 张清单 · {m} 题', { n: notes, m: items });
  };
})();
