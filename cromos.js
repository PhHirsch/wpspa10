/* Sammelkarten (Cromos): jede Karte gehört fest zu einem Spiel – kein Zufall.
   Erhalten: mindestens 1 Stern · Golden: 3 Sterne · 👑: ohne Fehler (Maestro/a) · 🔥: Modo difícil geschafft */
window.CROMOS = [
  { id: "gerundio", f: "🎬", n: "Marta, la directora", c: "#6a1a5a", t: "Dirige „La casa del finde“. Siempre dice: „¡Acción!“ – y siempre está tomando café. ☕", de: "aus ¡En directo! La casa del finde" },
  { id: "gustar", f: "🐶", n: "Chispa", c: "#1a5a6a", t: "El perro de Lili. Le gustan las golosinas, las olas … y dormir encima de toallas ajenas.", de: "Lilis Hund aus La fiesta de la pandilla" },
  { id: "reflexivos", f: "⏰", n: "Tic-Tac", c: "#2a2a7a", t: "Un reloj mágico. Se despierta cada lunes a las siete – ¡y despierta a Nora también!", de: "der Zauberwecker aus El día que se repite" },
  { id: "encantar", f: "👨🏻‍🏫", n: "El profe Ruiz", c: "#7a1a3a", t: "Le encantan los clubs. Le interesan los alumnos. Y le parece que todo es „¡fantástico!“.", de: "der Lehrer aus ClubMatch" },
  { id: "ir-a-lo", f: "🧔🏻", n: "El peregrino misterioso", c: "#2a5a4a", t: "Barba larga, mochila, sobres misteriosos … ¿o es tu profe? 😉", de: "aus El misterio del Camino" },
  { id: "comparativo", f: "🤖", n: "Quizbot", c: "#1a3a7a", t: "Lo sabe todo, más rápido que nadie. Pero no conoce la empanada gallega. Bip.", de: "der Quiz-Roboter aus ¡Galicia contra el mundo!" },
  { id: "hay-que", f: "👩🏽‍🍳", n: "La chef Carmen", c: "#8a3a10", t: "Su frase favorita: „¡Hay que dar la vuelta a la tortilla!“ 🍳", de: "die Chefköchin aus MasterChef Junior" },
  { id: "jefe-u1", f: "🤴🏻", n: "El Rey del Aburrimiento", c: "#5a3a1a", t: "Bostezo profesional. Odia los fines de semana, los colores y la piscina.", de: "Endgegner Unidad 1" },
  { id: "jefe-u2", f: "🤖", n: "La Máquina del Estrés", c: "#3a3a4a", t: "Bip. Más deberes. Bip. Más clubs. ¡Bip! ¿Y la pausa? „Error 404“.", de: "Endgegner Unidad 2" },
  { id: "jefe-u3", f: "🧙🏻‍♀️", n: "La Meiga de la Niebla", c: "#3a4a5a", t: "Una meiga de las leyendas gallegas. Esconde faros en la niebla. 🌫️", de: "Endgegnerin Unidad 3" },
  { id: "jefe-u9", f: "👨🏻‍🍳", n: "El Chef Gruñón", c: "#6a2a1a", t: "Nada le gusta. Excepto una tortilla de patatas perfecta. 😋", de: "Endgegner Kocheinheit" },
  { id: "tele-1", f: "☂️", n: "Uxía", c: "#8a1a2a", t: "Es de A Coruña, habla gallego y lleva siempre un paraguas rojo. ¿Conoce a X?", de: "aus Los secretos de la pandilla" },
  { id: "conjugador", f: "🕹️", n: "El Conjugador", c: "#3a0a6a", t: "Máquina arcade de 1987. Conjuga más rápido que su sombra.", de: "Arcade-Konjugationstrainer" },
  { id: "adv-24", f: "⭐", n: "La estrella de Navidad", c: "#1f6a3a", t: "Brilla en la piñata de la Navidad mexicana. ¡Solo para quien abre todas las puertas!", de: "Adventskalender – alle 24 Türchen" }
];
window.cromoState = function (s, id) {
  const st = (s && s.stars) || {}, pf = (s && s.perfect) || [];
  return { got: (st[id] || 0) > 0, gold: (st[id] || 0) >= 3, crown: pf.indexOf(id) >= 0, hard: (st[id + "-dificil"] || 0) > 0 };
};
window.cromoCard = function (c, s, big) {
  const k = cromoState(s, c.id), w = big ? 170 : 120;
  if (!k.got) return `<div class="cromo off" style="width:${w}px"><div class="cf">❓</div><div class="cn">???</div><div class="ct">${c.de}</div></div>`;
  return `<div class="cromo ${k.gold ? "gold" : ""}" style="width:${w}px;--c:${c.c}"><div class="cb">${k.crown ? "👑" : ""}${k.hard ? "🔥" : ""}</div><div class="cf">${c.f}</div><div class="cn">${c.n}</div><div class="ct">${c.t}</div></div>`;
};
window.CROMO_CSS = `.cromo{position:relative;flex:none;border-radius:12px;padding:10px 8px 8px;text-align:center;background:linear-gradient(160deg,var(--c,#333),#111);border:3px solid #ffffff33;box-shadow:0 6px 16px #0008;color:#fff}
  .cromo.gold{border-color:#ffd23a;background:linear-gradient(160deg,#ffd23a,var(--c,#333) 45%,#111);box-shadow:0 0 18px #ffd23a88,0 6px 16px #0008}
  .cromo.gold:before{content:"";position:absolute;inset:0;border-radius:9px;background:linear-gradient(120deg,transparent 30%,#ffffff44 45%,transparent 60%);background-size:250% 100%;animation:shine 2.6s linear infinite}
  @keyframes shine{from{background-position:150% 0}to{background-position:-100% 0}}
  .cromo.off{background:#1a1a22;border-style:dashed;color:#888}
  .cromo .cf{font-size:44px;line-height:1.2}
  .cromo .cn{font-weight:800;font-size:14px;margin-top:2px}
  .cromo .ct{font-size:11.5px;line-height:1.3;opacity:.85;margin-top:4px}
  .cromo .cb{position:absolute;top:4px;right:6px;font-size:15px}`;
