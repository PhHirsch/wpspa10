/* Boss-Grafiken für die Vokabel-Bosskämpfe */
window.BOSSART = (function () {
  const eyes = (x1, x2, y, r, angry, col) => [x1, x2].map((x, i) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.1}" fill="#fff"/><circle cx="${x + (i ? -2 : 2)}" cy="${y + 2}" r="${r * .55}" fill="${col || "#1a1020"}"/><circle cx="${x + (i ? -3 : 1)}" cy="${y - 1}" r="${r * .2}" fill="#fff"/>` + (angry ? `<path d="M${x - r - 3} ${y - r - (i ? -4 : 6)} L${x + r + 3} ${y - r - (i ? 6 : -4)}" stroke="#1a1020" stroke-width="5" stroke-linecap="round"/>` : "")).join("");
  const A = {};
  A.tornado = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <g><ellipse cx="100" cy="40" rx="86" ry="22" fill="#5d6675"/><ellipse cx="100" cy="72" rx="70" ry="18" fill="#6e7787"/><ellipse cx="100" cy="100" rx="54" ry="15" fill="#7d8696"/><ellipse cx="104" cy="126" rx="40" ry="12" fill="#8c95a4"/><ellipse cx="108" cy="150" rx="28" ry="10" fill="#9aa3b1"/><ellipse cx="112" cy="172" rx="16" ry="8" fill="#a8b0bd"/>
    <path d="M30 40 Q100 56 170 40 M44 72 Q100 86 156 72 M60 100 Q100 112 146 100" stroke="#c9cfd8" stroke-width="3" fill="none" opacity=".7"><animateTransform attributeName="transform" type="translate" values="-8 0;8 0;-8 0" dur="1s" repeatCount="indefinite"/></path>
    <animateTransform attributeName="transform" type="skewX" values="-4;4;-4" dur="1.4s" repeatCount="indefinite"/></g>
    ${eyes(78, 122, 64, 11, true, "#c8102e")}<path d="M80 92 Q100 82 120 92" stroke="#1a1020" stroke-width="5" fill="none" stroke-linecap="round"/>
    <rect x="22" y="110" width="14" height="10" fill="#8a5a2b" transform="rotate(20 29 115)"><animateTransform attributeName="transform" type="rotate" values="0 100 100;360 100 100" dur="3s" repeatCount="indefinite"/></rect>
    <circle cx="168" cy="96" r="5" fill="#3fae5a"><animateTransform attributeName="transform" type="rotate" values="0 100 100;-360 100 100" dur="4s" repeatCount="indefinite"/></circle></svg>`;
  A.robot = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <line x1="100" y1="14" x2="100" y2="36" stroke="#7d8794" stroke-width="5"/><circle cx="100" cy="12" r="8" fill="#ff3a3a"><animate attributeName="fill" values="#ff3a3a;#ffd23a;#ff3a3a" dur="1s" repeatCount="indefinite"/></circle>
    <rect x="40" y="36" width="120" height="96" rx="18" fill="#b9c1cc" stroke="#6a7686" stroke-width="4"/><rect x="54" y="52" width="92" height="40" rx="10" fill="#1d2530"/>
    <rect x="64" y="62" width="26" height="14" rx="4" fill="#ff3a3a"><animate attributeName="height" values="14;2;14" keyTimes="0;.5;1" dur="3s" repeatCount="indefinite"/></rect><rect x="110" y="62" width="26" height="14" rx="4" fill="#ff3a3a"/>
    <rect x="64" y="104" width="72" height="14" rx="4" fill="#1d2530"/>${[72, 86, 100, 114, 128].map(x => `<rect x="${x - 3}" y="106" width="6" height="10" fill="#9aa6b5"/>`).join("")}
    <rect x="58" y="136" width="84" height="56" rx="10" fill="#9aa6b5" stroke="#6a7686" stroke-width="4"/><rect x="72" y="146" width="56" height="34" rx="4" fill="#f4f1ea"/><text x="100" y="168" font-family="Arial Black,Arial" font-size="13" text-anchor="middle" fill="#c8102e">RULES</text>
    <rect x="22" y="140" width="34" height="12" rx="6" fill="#9aa6b5"/><rect x="144" y="140" width="34" height="12" rx="6" fill="#9aa6b5"><animateTransform attributeName="transform" type="rotate" values="0 150 146;-20 150 146;0 150 146" dur=".8s" repeatCount="indefinite"/></rect></svg>`;
  A.ghost = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><g>
    <path d="M40 180 L40 90 Q40 24 100 24 Q160 24 160 90 L160 180 Q150 166 140 180 Q130 166 120 180 Q110 166 100 180 Q90 166 80 180 Q70 166 60 180 Q50 166 40 180 Z" fill="#eef2fb" stroke="#b8c3dc" stroke-width="3"/>
    <ellipse cx="78" cy="84" rx="12" ry="16" fill="#2a2f4a"/><ellipse cx="122" cy="84" rx="12" ry="16" fill="#2a2f4a"/><circle cx="82" cy="78" r="4" fill="#fff"/><circle cx="126" cy="78" r="4" fill="#fff"/>
    <path d="M70 66 L88 72 M130 66 L112 72" stroke="#2a2f4a" stroke-width="4" stroke-linecap="round"/><path d="M84 128 Q100 116 116 128" stroke="#2a2f4a" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M70 100 Q66 112 70 116 Q74 112 70 100 Z" fill="#7ac8ff"><animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/></path>
    <rect x="128" y="130" width="40" height="30" rx="5" fill="#a8743f" stroke="#6a4a26" stroke-width="3"/><rect x="140" y="122" width="16" height="10" rx="3" fill="none" stroke="#6a4a26" stroke-width="3"/><text x="148" y="150" font-family="Arial" font-size="9" text-anchor="middle" fill="#fff">USA</text>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0" dur="2.4s" repeatCount="indefinite"/></g></svg>`;
  A.bossy = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="118" rx="70" ry="66" fill="#e0533a" stroke="#8a2a1a" stroke-width="4"/><ellipse cx="100" cy="140" rx="44" ry="34" fill="#f08a6a"/>
    <path d="M60 58 L68 30 L84 50 L100 22 L116 50 L132 30 L140 58 Z" fill="#f2c230" stroke="#b8860b" stroke-width="3"/><text x="100" y="54" font-family="Arial Black,Arial" font-size="12" text-anchor="middle" fill="#8a2a1a">BOSS</text>
    ${eyes(78, 122, 98, 12, true)}<path d="M74 136 Q100 126 126 136 L122 150 Q100 142 78 150 Z" fill="#5a1010"/><path d="M80 137 L84 145 L88 136 M112 136 L116 145 L120 137" fill="#fff"/>
    <g><rect x="160" y="96" width="34" height="14" rx="7" fill="#e0533a" stroke="#8a2a1a" stroke-width="3"/><rect x="186" y="84" width="10" height="20" rx="5" fill="#e0533a" stroke="#8a2a1a" stroke-width="3"/><animateTransform attributeName="transform" type="translate" values="0 0;-6 0;0 0" dur=".5s" repeatCount="indefinite"/></g></svg>`;
  A.slime = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><g>
    <path d="M30 180 Q20 110 60 80 Q100 40 140 80 Q180 110 170 180 Z" fill="#7cd85a" stroke="#3f8a2a" stroke-width="4"><animate attributeName="d" values="M30 180 Q20 110 60 80 Q100 40 140 80 Q180 110 170 180 Z;M26 180 Q22 116 60 88 Q100 54 140 88 Q178 116 174 180 Z;M30 180 Q20 110 60 80 Q100 40 140 80 Q180 110 170 180 Z" dur="2s" repeatCount="indefinite"/></path>
    <ellipse cx="70" cy="80" rx="14" ry="8" fill="#b8f0a0" opacity=".7"/>
    <ellipse cx="78" cy="118" rx="14" ry="12" fill="#fff"/><ellipse cx="122" cy="118" rx="14" ry="12" fill="#fff"/><circle cx="80" cy="122" r="6" fill="#1a1020"/><circle cx="120" cy="122" r="6" fill="#1a1020"/>
    <path d="M62 112 Q78 104 94 112 L94 118 L62 118 Z M106 112 Q122 104 138 112 L138 118 L106 118 Z" fill="#5ab83a"/>
    <path d="M86 152 Q100 160 114 150" stroke="#1a1020" stroke-width="4" fill="none" stroke-linecap="round"/><text x="140" y="70" font-family="Arial Black,Arial" font-size="18" fill="#3f8a2a">z<animate attributeName="y" values="70;50;70" dur="2s" repeatCount="indefinite"/></text><text x="156" y="54" font-family="Arial Black,Arial" font-size="13" fill="#3f8a2a">z</text>
    <path d="M50 180 Q48 192 54 196 Q60 192 58 180" fill="#7cd85a"/></g></svg>`;
  A.manager = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 200 L56 130 Q60 110 100 110 Q140 110 144 130 L150 200 Z" fill="#2a2d3a"/><path d="M88 112 L100 130 L112 112 Z" fill="#fff"/><path d="M96 124 L104 124 L108 170 L100 180 L92 170 Z" fill="#c8102e"/>
    <circle cx="100" cy="72" r="48" fill="#8a5ad0" stroke="#4a2a80" stroke-width="4"/><path d="M60 40 L70 14 L80 34 Z M140 40 L130 14 L120 34 Z" fill="#4a2a80"/>
    <circle cx="80" cy="70" r="14" fill="#fff" stroke="#1a1020" stroke-width="3"/><circle cx="120" cy="70" r="14" fill="#fff" stroke="#1a1020" stroke-width="3"/><path d="M94 70 L106 70" stroke="#1a1020" stroke-width="3"/><circle cx="82" cy="73" r="5" fill="#1a1020"/><circle cx="118" cy="73" r="5" fill="#1a1020"/>
    <path d="M64 50 L92 58 M136 50 L108 58" stroke="#1a1020" stroke-width="5" stroke-linecap="round"/><path d="M82 98 Q100 90 118 98" stroke="#1a1020" stroke-width="5" fill="none" stroke-linecap="round"/>
    <g><rect x="146" y="150" width="44" height="32" rx="4" fill="#6a4a26" stroke="#3a2a16" stroke-width="3"/><rect x="160" y="142" width="16" height="10" rx="3" fill="none" stroke="#3a2a16" stroke-width="3"/><animateTransform attributeName="transform" type="rotate" values="0 168 146;8 168 146;0 168 146" dur="1s" repeatCount="indefinite"/></g></svg>`;
  A.locker = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="50" y="14" width="100" height="180" rx="6" fill="#3a78d8" stroke="#1f4a8c" stroke-width="5"/>${[30, 42, 54].map(y => `<rect x="70" y="${y}" width="60" height="5" rx="2" fill="#1f4a8c"/>`).join("")}
    ${eyes(80, 120, 84, 12, true, "#ffd23a")}
    <g><path d="M62 120 L138 120 L138 168 L62 168 Z" fill="#12234a"/>${[66, 82, 98, 114, 130].map(x => `<path d="M${x} 120 L${x + 8} 134 L${x + 16} 120 Z" fill="#fff"/>`).join("")}${[66, 82, 98, 114, 130].map(x => `<path d="M${x} 168 L${x + 8} 154 L${x + 16} 168 Z" fill="#fff"/>`).join("")}<animateTransform attributeName="transform" type="scale" values="1 1;1 .8;1 1" dur=".9s" repeatCount="indefinite" additive="sum"/></g>
    <rect x="132" y="96" width="8" height="18" rx="3" fill="#c9ced6"/>
    <g><rect x="150" y="170" width="30" height="8" fill="#d23b3b" transform="rotate(-15 165 174)"/><rect x="18" y="176" width="30" height="8" fill="#3fae5a" transform="rotate(10 33 180)"/></g></svg>`;
  return A;
})();
