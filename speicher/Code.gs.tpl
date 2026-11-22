/**
 * Español WP 10 – Spielstand-Speicher
 * Diese Datei in die Google-Tabelle kopieren: Erweiterungen → Apps Script.
 * Das Skript hat nur Zugriff auf DIESE eine Tabelle.
 * @OnlyCurrentDoc
 */

// ===== Einstellungen =====
const ANZAHL_SPIELER = 15;      // so viele Logins legt "einrichten" an
const MAX_FEHLVERSUCHE = 5;     // danach wird die Nummer kurz gesperrt
const SPERRE_MINUTEN = 5;
const MUENZEN_WIEDERHOLUNG = 2; // Münzen für eine Wiederholung ohne Verbesserung
const MAX_BELOHNTE_WDH_PRO_TAG = 3;
const MUENZEN_DAILY_PRO_STERN = 5; // Tages-Challenge: 1x pro Tag
const LEVEL_XP = [0, 50, 120, 220, 350, 500, 700, 950, 1250, 1600, 2000, 2500];

// Shop-Katalog wird automatisch von der Website geladen (keine Änderung hier nötig)
const KATALOG_URL = "https://phhirsch.github.io/wpspa10/shop.json";
let ITEMS = {}, SLOTS = [], DEFAULT = {};
function loadCat() {
  const cache = CacheService.getScriptCache(), props = PropertiesService.getScriptProperties();
  let t = cache.get("cat");
  if (!t) {
    try {
      const r = UrlFetchApp.fetch(KATALOG_URL + "?t=" + Date.now(), { muteHttpExceptions: true });
      if (r.getResponseCode() !== 200) throw new Error("http");
      t = r.getContentText(); JSON.parse(t);
      cache.put("cat", t, 600);
      try { props.setProperty("cat", t); } catch (x) {}
    } catch (e) { t = props.getProperty("cat") || '{"items":{},"slots":[],"default":{}}'; }
  }
  const c = JSON.parse(t);
  ITEMS = {}; Object.keys(c.items).forEach(id => { const a = c.items[id]; ITEMS[id] = { slot: a[0], price: a[1], lvl: a[2] || 0, months: a[3] || null }; });
  SLOTS = c.slots; DEFAULT = c.default;
}
/** Nach dem Einfügen einmal ausführen, um den Katalog-Zugriff zu testen. */
function katalogTesten() { CacheService.getScriptCache().remove("cat"); loadCat(); Logger.log(Object.keys(ITEMS).length + " Shop-Teile geladen."); }

// Spalten im Blatt "Spieler"
const C = {NR:0, PIN:1, MUENZEN:2, GEKAUFT:3, AVATAR:4, FEHL:5, GESPERRT:6, LOGIN:7, EIGEN:8};
const TZ = "Europe/Berlin";

/** Einmal ausführen: legt die Blätter an. */
function einrichten() {
  const ss = SpreadsheetApp.getActive();
  let sp = ss.getSheetByName("Spieler");
  if (!sp) sp = ss.insertSheet("Spieler", 0);
  if (sp.getLastRow() === 0) {
    sp.appendRow(["Nr", "PIN", "Münzen", "Gekauft", "Avatar", "Fehlversuche", "Gesperrt bis", "Letzter Login", "Eigene PIN"]);
    sp.getRange("B:B").setNumberFormat("@");
    const rows = [];
    for (let i = 1; i <= ANZAHL_SPIELER; i++) {
      rows.push([i, String(Math.floor(Math.random() * 10000)).padStart(4, "0"), 0, "", "", 0, "", "", ""]);
    }
    sp.getRange(2, 1, rows.length, 9).setValues(rows);
    sp.setFrozenRows(1);
    sp.getRange("1:1").setFontWeight("bold");
  }
  let er = ss.getSheetByName("Ergebnisse");
  if (!er) er = ss.insertSheet("Ergebnisse", 1);
  if (er.getLastRow() === 0) {
    er.appendRow(["Zeitpunkt", "Nr", "Spiel", "Fehler", "Sterne", "Münzen +", "Durchgang", "Zeit (s)", "Aufgaben"]);
    er.setFrozenRows(1);
    er.getRange("1:1").setFontWeight("bold");
  }
  ensureSheets();
  uebersicht();
  katalogTesten();
}

function ensureSheets() {
  const ss = SpreadsheetApp.getActive();
  const er = ss.getSheetByName("Ergebnisse");
  if (er && er.getRange(1, 8).getValue() === "") er.getRange(1, 8, 1, 2).setValues([["Zeit (s)", "Aufgaben"]]).setFontWeight("bold");
  if (!ss.getSheetByName("Übersicht")) ss.insertSheet("Übersicht", 0);
}

function doGet() { return out({ ok: true, msg: "Español WP 10 Speicher läuft." }); }

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const d = JSON.parse(e.postData.contents);
    return out(handle(d));
  } catch (err) {
    return out({ ok: false, error: "server" });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function handle(d) {
  if (!d || typeof d.action !== "string") return { ok: false, error: "bad" };
  loadCat();
  if (d.action === "scores") return { ok: true, scores: scores() };
  const a = auth(d);
  if (a.error) return { ok: false, error: a.error };
  const p = a.p;
  switch (d.action) {
    case "login":
      p.sh.getRange(p.row, C.LOGIN + 1).setValue(new Date());
      return { ok: true, state: state(p) };
    case "result": return result(p, d);
    case "buy": return buy(p, d);
    case "equip": return equip(p, d);
    case "setpin": return setPin(p, d);
  }
  return { ok: false, error: "bad" };
}

function players() {
  const sh = SpreadsheetApp.getActive().getSheetByName("Spieler");
  return { sh: sh, v: sh.getDataRange().getValues() };
}
function player(nr) {
  const P = players();
  for (let i = 1; i < P.v.length; i++) {
    if (String(P.v[i][C.NR]).trim() === String(nr)) return { sh: P.sh, row: i + 1, v: P.v[i] };
  }
  return null;
}

function auth(d) {
  const nr = String(d.nr || "").trim(), pin = String(d.pin || "").trim();
  if (!/^\d{1,4}$/.test(nr) || !/^\d{4}$/.test(pin)) return { error: "login" };
  const p = player(nr);
  if (!p) return { error: "login" };
  const until = p.v[C.GESPERRT] instanceof Date ? p.v[C.GESPERRT].getTime() : 0;
  if (until > Date.now()) return { error: "locked" };
  const realPin = String(p.v[C.PIN]).trim().padStart(4, "0");
  if (realPin !== pin) {
    const f = (Number(p.v[C.FEHL]) || 0) + 1;
    if (f >= MAX_FEHLVERSUCHE) {
      p.sh.getRange(p.row, C.FEHL + 1, 1, 2).setValues([[0, new Date(Date.now() + SPERRE_MINUTEN * 60000)]]);
      return { error: "locked" };
    }
    p.sh.getRange(p.row, C.FEHL + 1).setValue(f);
    return { error: "login" };
  }
  if (Number(p.v[C.FEHL]) > 0 || p.v[C.GESPERRT]) p.sh.getRange(p.row, C.FEHL + 1, 1, 2).setValues([[0, ""]]);
  return { p: p };
}

/** Eigene PIN setzen. Spalte "Eigene PIN" = "ja" heißt: selbst gewählt.
 *  Zurücksetzen: neue Start-PIN in Spalte B eintragen und "ja" in Spalte I löschen. */
function setPin(p, d) {
  const np = String(d.newpin || "").trim(), nr = String(p.v[C.NR]).trim();
  if (!/^\d{4}$/.test(np)) return { ok: false, error: "login" };
  const weak = /^(\d)\1{3}$/.test(np) || ["1234", "2345", "3456", "4567", "5678", "6789", "0123", "4321", "9876", "1212", "6969"].indexOf(np) >= 0 || np === nr.padStart(4, "0");
  if (weak) return { ok: false, error: "weakpin" };
  if (np === String(p.v[C.PIN]).trim().padStart(4, "0")) return { ok: false, error: "samepin" };
  if (p.sh.getRange(1, C.EIGEN + 1).getValue() === "") p.sh.getRange(1, C.EIGEN + 1).setValue("Eigene PIN").setFontWeight("bold");
  p.sh.getRange(p.row, C.PIN + 1).setNumberFormat("@").setValue(np);
  p.sh.getRange(p.row, C.EIGEN + 1).setValue("ja");
  p.v[C.PIN] = np; p.v[C.EIGEN] = "ja";
  return { ok: true, state: state(p) };
}

function owned(v) { return String(v[C.GEKAUFT] || "").split(",").map(s => s.trim()).filter(s => ITEMS[s]); }
function equippedOf(v) {
  let e = {};
  try { e = JSON.parse(v[C.AVATAR] || "{}"); } catch (x) {}
  const r = Object.assign({}, DEFAULT);
  SLOTS.forEach(s => { if (ITEMS[e[s]] && ITEMS[e[s]].slot === s) r[s] = e[s]; });
  return r;
}
function allResults() {
  const er = SpreadsheetApp.getActive().getSheetByName("Ergebnisse");
  return er.getDataRange().getValues().slice(1);
}
function levelOf(xp) { let l = 0; LEVEL_XP.forEach(t => { if (xp >= t) l++; }); return l; }

function state(p) {
  const res = allResults().filter(r => String(r[1]) === String(p.v[C.NR]));
  const stars = {}, plays = {};
  let xp = 0, home = false, improved = false, daily = 0;
  res.forEach(r => {
    const g = r[2], s = Number(r[4]) || 0;
    xp += Number(r[5]) || 0;
    if (r[0] instanceof Date) {
      const t = Utilities.formatDate(r[0], TZ, "u H").split(" ").map(Number);
      if (t[0] >= 6 || t[1] >= 15 || t[1] < 7) home = true;
    }
    if (g === "daily") { daily++; return; }
    if (plays[g] && s > (stars[g] || 0)) improved = true;
    stars[g] = Math.max(stars[g] || 0, s);
    plays[g] = (plays[g] || 0) + 1;
  });
  const today = Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd");
  const dailyToday = res.some(r => r[2] === "daily" && r[0] instanceof Date && Utilities.formatDate(r[0], TZ, "yyyy-MM-dd") === today);
  return {
    fresh: !p.v[C.AVATAR], mustSetPin: String(p.v[C.EIGEN] || "").trim() !== "ja", nr: String(p.v[C.NR]), coins: Number(p.v[C.MUENZEN]) || 0,
    owned: owned(p.v), equipped: equippedOf(p.v), stars: stars,
    xp: xp, level: levelOf(xp), stats: { plays: res.length, home: home, improved: improved, daily: daily, dailyToday: dailyToday }
  };
}

function result(p, d) {
  const game = String(d.game || "");
  const mistakes = Math.floor(Number(d.mistakes));
  const secs = Math.max(0, Math.min(36000, Math.floor(Number(d.secs) || 0)));
  const total = Math.floor(Number(d.total) || 0);
  if (!/^[a-z0-9-]{1,40}$/.test(game) || !(mistakes >= 0 && mistakes < 1000)) return { ok: false, error: "bad" };
  let stars;
  if (total > 0 && total <= 300) { const q = mistakes / total; stars = q <= 0.1 ? 3 : q <= 0.25 ? 2 : 1; }
  else stars = mistakes <= 2 ? 3 : mistakes <= 6 ? 2 : 1;
  const prev = allResults().filter(r => String(r[1]) === String(p.v[C.NR]) && r[2] === game);
  const best = prev.reduce((m, r) => Math.max(m, Number(r[4]) || 0), 0);
  const today = Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd");
  const todayCount = prev.filter(r => r[0] instanceof Date && Utilities.formatDate(r[0], TZ, "yyyy-MM-dd") === today).length;
  let earned;
  if (game === "daily") earned = todayCount === 0 ? stars * MUENZEN_DAILY_PRO_STERN : 0;
  else if (prev.length === 0) earned = 10 + stars * 10;
  else if (stars > best) earned = (stars - best) * 10;
  else earned = todayCount < MAX_BELOHNTE_WDH_PRO_TAG ? MUENZEN_WIEDERHOLUNG : 0;
  SpreadsheetApp.getActive().getSheetByName("Ergebnisse")
    .appendRow([new Date(), Number(p.v[C.NR]), game, mistakes, stars, earned, prev.length + 1, secs, total || ""]);
  const coins = (Number(p.v[C.MUENZEN]) || 0) + earned;
  p.sh.getRange(p.row, C.MUENZEN + 1).setValue(coins);
  p.v[C.MUENZEN] = coins;
  try { uebersicht(); } catch (x) {}
  return { ok: true, earned: earned, stars: stars, first: prev.length === 0, improved: prev.length > 0 && stars > best, daily: game === "daily", state: state(p) };
}

function buy(p, d) {
  const it = ITEMS[d.item];
  if (!it || it.price <= 0) return { ok: false, error: "bad" };
  const o = owned(p.v);
  if (o.indexOf(d.item) >= 0) return { ok: false, error: "owned" };
  if (it.months) {
    const m = Number(Utilities.formatDate(new Date(), TZ, "M"));
    if (it.months.indexOf(m) < 0) return { ok: false, error: "season" };
  }
  if (it.lvl && state(p).level < it.lvl) return { ok: false, error: "level" };
  const coins = Number(p.v[C.MUENZEN]) || 0;
  if (coins < it.price) return { ok: false, error: "coins" };
  o.push(d.item);
  p.sh.getRange(p.row, C.MUENZEN + 1, 1, 2).setValues([[coins - it.price, o.join(",")]]);
  p.v[C.MUENZEN] = coins - it.price; p.v[C.GEKAUFT] = o.join(",");
  return { ok: true, state: state(p) };
}

function equip(p, d) {
  const want = d.equipped || {};
  const o = owned(p.v);
  const e = {};
  for (const s of SLOTS) {
    const id = want[s] || DEFAULT[s];
    const it = ITEMS[id];
    if (!it || it.slot !== s || (it.price > 0 && o.indexOf(id) < 0)) return { ok: false, error: "bad" };
    e[s] = id;
  }
  p.sh.getRange(p.row, C.AVATAR + 1).setValue(JSON.stringify(e));
  p.v[C.AVATAR] = JSON.stringify(e);
  return { ok: true, state: state(p) };
}

/** Top 3 pro Spiel: wenigste Fehler, bei Gleichstand schnellste Zeit. */
function scores() {
  const best = {}, xp = {};
  const res = allResults();
  res.forEach(r => {
    const g = r[2], nr = String(r[1]);
    xp[nr] = (xp[nr] || 0) + (Number(r[5]) || 0);
    if (!g || g === "daily") return;
    const m = Number(r[3]) || 0, t = Number(r[7]) || 99999;
    best[g] = best[g] || {};
    const b = best[g][nr];
    if (!b || m < b.m || (m === b.m && t < b.t)) best[g][nr] = { m: m, t: t };
  });
  const P = players(), eq = {};
  for (let i = 1; i < P.v.length; i++) eq[String(P.v[i][C.NR])] = equippedOf(P.v[i]);
  const out = {};
  Object.keys(best).forEach(g => {
    out[g] = Object.keys(best[g]).map(nr => ({ nr: nr, mistakes: best[g][nr].m, secs: best[g][nr].t === 99999 ? null : best[g][nr].t }))
      .sort((a, b) => a.mistakes - b.mistakes || (a.secs || 99999) - (b.secs || 99999)).slice(0, 3)
      .map(x => Object.assign(x, { eq: eq[x.nr] || DEFAULT, level: levelOf(xp[x.nr] || 0) }));
  });
  return out;
}

/** Blatt "Übersicht": eine Zeile pro Spieler, eine Spalte pro Spiel (beste Sterne). */
function uebersicht() {
  ensureSheets();
  const ss = SpreadsheetApp.getActive(), sh = ss.getSheetByName("Übersicht");
  const P = players(), res = allResults();
  const games = [...new Set(res.map(r => r[2]).filter(g => g && g !== "daily"))].sort();
  const data = {};
  res.forEach(r => {
    const nr = String(r[1]); data[nr] = data[nr] || { xp: 0, g: {}, last: null, daily: 0 };
    const d = data[nr]; d.xp += Number(r[5]) || 0;
    if (r[0] instanceof Date && (!d.last || r[0] > d.last)) d.last = r[0];
    if (r[2] === "daily") d.daily++; else d.g[r[2]] = Math.max(d.g[r[2]] || 0, Number(r[4]) || 0);
  });
  const rows = [["Nr", "Level", "XP", "Münzen", "Zuletzt gespielt", "Tages-Challenges"].concat(games)];
  for (let i = 1; i < P.v.length; i++) {
    const nr = String(P.v[i][C.NR]); if (!nr) continue;
    const d = data[nr] || { xp: 0, g: {}, last: "", daily: 0 };
    rows.push([Number(nr), levelOf(d.xp), d.xp, Number(P.v[i][C.MUENZEN]) || 0, d.last || "", d.daily]
      .concat(games.map(g => d.g[g] ? "⭐".repeat(d.g[g]) : "–")));
  }
  sh.clearContents();
  sh.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
  sh.getRange(1, 1, 1, rows[0].length).setFontWeight("bold");
  sh.setFrozenRows(1); sh.setFrozenColumns(1);
  if (rows.length > 1) sh.getRange(2, 5, rows.length - 1, 1).setNumberFormat("dd.MM. HH:mm");
}
