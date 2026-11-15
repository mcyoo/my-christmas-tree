(function () {
  const CATALOG = [
    { group: "year", key: "ring", type: "ring", color: "#e0b44a" },
    { group: "year", key: "house", type: "house", color: "#c45c4a" },
    { group: "year", key: "car", type: "car", color: "#3d7ec9" },
    { group: "year", key: "baby", type: "baby", color: "#f4c7cf" },
    { group: "year", key: "cap", type: "cap", color: "#243e73" },
    { group: "year", key: "plane", type: "plane", color: "#d7e4ef" },
    { group: "year", key: "paw", type: "paw", color: "#c48945" },
    { group: "year", key: "key", type: "key", color: "#e0b44a" },
    { group: "year", key: "cake", type: "cake", color: "#e25b7a" },
    { group: "year", key: "trophy", type: "trophy", color: "#e6c15a" },
    { group: "year", key: "book", type: "book", color: "#8d3b4a" },
    { group: "year", key: "music", type: "music", color: "#243e73" },
    { group: "year", key: "camera", type: "camera", color: "#3d4a52" },
    { group: "year", key: "sprout", type: "sprout", color: "#2f9d62" },
    { group: "ornament", key: "bauble-red", type: "bauble", color: "#d23b3b" },
    { group: "ornament", key: "bauble-gold", type: "bauble", color: "#e0b44a" },
    { group: "ornament", key: "bauble-blue", type: "bauble", color: "#3d7ec9" },
    { group: "ornament", key: "bauble-green", type: "bauble", color: "#2f9d62" },
    { group: "ornament", key: "bauble-purple", type: "bauble", color: "#8d62c4" },
    { group: "ornament", key: "bauble-white", type: "bauble", color: "#f4f1ea" },
    { group: "ornament", key: "teardrop-red", type: "teardrop", color: "#c73838" },
    { group: "ornament", key: "teardrop-gold", type: "teardrop", color: "#e0b44a" },
    { group: "ornament", key: "icicle", type: "icicle", color: "#d7e7f2" },
    { group: "ornament", key: "egg", type: "egg", color: "#f2efe4" },
    { group: "ornament", key: "star", type: "star", color: "#f3d36b" },
    { group: "ornament", key: "bell", type: "bell", color: "#e6c15a" },
    { group: "ornament", key: "bow", type: "bow", color: "#d6456a" },
    { group: "ornament", key: "heart", type: "heart", color: "#e25b7a" },
    { group: "ornament", key: "wreath", type: "wreath", color: "#2f7a45" },
    { group: "light", key: "strand-warm", type: "strand", color: "#ffe1a8" },
    { group: "light", key: "strand-multi", type: "strand", color: "#ffffff" },
    { group: "light", key: "light-yellow", type: "light", color: "#ffd56a" },
    { group: "light", key: "light-red", type: "light", color: "#ff5a5a" },
    { group: "light", key: "light-blue", type: "light", color: "#7ec8ff" },
    { group: "light", key: "light-green", type: "light", color: "#7dffb2" },
    { group: "light", key: "candle", type: "candle", color: "#f3e2b8" },
    { group: "prop", key: "candy", type: "candy", color: "#e24b4b" },
    { group: "prop", key: "gift-red", type: "gift", color: "#c0392b" },
    { group: "prop", key: "gift-green", type: "gift", color: "#1f8a4c" },
    { group: "prop", key: "gift-navy", type: "gift", color: "#243e73" },
    { group: "prop", key: "snowflake", type: "snowflake", color: "#e7f3ff" },
    { group: "prop", key: "pinecone", type: "pinecone", color: "#8a5a32" },
    { group: "prop", key: "holly", type: "holly", color: "#1f7a3a" },
    { group: "prop", key: "poinsettia", type: "poinsettia", color: "#d23b3b" },
    { group: "prop", key: "apple", type: "apple", color: "#c5362f" },
    { group: "prop", key: "stocking", type: "stocking", color: "#b93a3a" },
    { group: "prop", key: "mitten", type: "mitten", color: "#b93a3a" },
    { group: "figure", key: "gingerbread", type: "gingerbread", color: "#c48945" },
    { group: "figure", key: "angel", type: "angel", color: "#f4efe4" },
    { group: "figure", key: "nutcracker", type: "nutcracker", color: "#b4332c" },
    { group: "figure", key: "snowman", type: "snowman", color: "#f7f8f8" },
    { group: "figure", key: "santa", type: "santa", color: "#c5363a" },
    { group: "figure", key: "reindeer", type: "reindeer", color: "#8a5a32" },
    { group: "figure", key: "cardinal", type: "cardinal", color: "#d23b3b" },
  ];

  const HIT = {
    bauble: 30,
    star: 34,
    light: 18,
    strand: 24,
    candy: 30,
    gift: 32,
    bell: 30,
    snowflake: 30,
    bow: 32,
    heart: 28,
    gingerbread: 34,
    stocking: 34,
    pinecone: 28,
    icicle: 34,
    teardrop: 32,
    angel: 34,
    poinsettia: 34,
    nutcracker: 34,
    snowman: 34,
    santa: 34,
    reindeer: 34,
    cardinal: 32,
    holly: 32,
    candle: 34,
    apple: 30,
    egg: 32,
    wreath: 32,
    mitten: 32,
    ring: 32,
    house: 34,
    car: 34,
    baby: 32,
    cap: 34,
    plane: 34,
    paw: 32,
    key: 34,
    cake: 32,
    trophy: 34,
    book: 32,
    music: 34,
    camera: 34,
    sprout: 32,
  };

  const GLOW_MODES = ["steady", "soft", "chase", "spark", "random"];

  const MIN_SCALE = 0.45;
  const MAX_SCALE = 2.4;

  const MAX_ITEMS = 80;
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function mulberry32(seed) {
    let state = seed >>> 0;
    return function () {
      state |= 0;
      state = (state + 0x6d2b79f5) | 0;
      let t = Math.imul(state ^ (state >>> 15), 1 | state);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const starRand = mulberry32(20261224);
  const stars = Array.from({ length: 56 }, () => ({
    x: starRand(),
    y: starRand() * 0.78,
    r: starRand() * 1.7 + 0.35,
    phase: starRand() * Math.PI * 2,
  }));

  const TREE_LOOK = {
    green: {
      trunk: [112, 72, 43],
      trunkShade: [84, 52, 32],
      tiers: [
        [13, 84, 48],
        [18, 108, 58],
        [26, 128, 68],
        [46, 150, 84],
      ],
      snow: 170,
    },
    snow: {
      trunk: [98, 86, 74],
      trunkShade: [72, 64, 56],
      tiers: [
        [168, 188, 196],
        [198, 214, 220],
        [220, 232, 236],
        [240, 246, 248],
      ],
      snow: 240,
    },
    wood: {
      trunk: [86, 78, 70],
      trunkShade: [58, 54, 50],
      tiers: [
        [72, 74, 78],
        [104, 106, 110],
        [132, 134, 138],
        [164, 166, 170],
      ],
      snow: 30,
    },
  };

  const STRAND_COLORS = ["#ff5a5a", "#ffd56a", "#7dffb2", "#7ec8ff", "#f3d36b"];

  const flakes = Array.from({ length: 90 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 2.3 + 0.5,
    speed: Math.random() * 0.07 + 0.045,
    drift: Math.random() * Math.PI * 2,
  }));

  function rgb(hex) {
    const value = parseInt(hex.slice(1), 16);
    return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
  }

  function shade(hex, amount) {
    return rgb(hex).map((channel) => Math.max(0, Math.min(255, channel + amount)));
  }

  function fillHex(p, hex, alpha) {
    const [r, g, b] = rgb(hex);
    if (alpha === undefined) p.fill(r, g, b);
    else p.fill(r, g, b, alpha);
  }

  function uid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function drawBauble(p, color) {
    const [r, g, b] = rgb(color);
    const bright = r * 0.299 + g * 0.587 + b * 0.114 > 205;
    p.noFill();
    p.stroke(212, 176, 96);
    p.strokeWeight(3);
    p.arc(0, -38, 16, 14, Math.PI, Math.TWO_PI);
    p.noStroke();
    p.fill(232, 196, 112);
    p.rect(-11, -36, 22, 12, 2);
    p.fill(186, 146, 68);
    p.rect(-11, -28, 22, 4);
    if (bright) {
      p.stroke(176, 186, 194);
      p.strokeWeight(2);
    } else {
      p.noStroke();
    }
    p.fill(r, g, b);
    p.circle(0, 2, 58);
    p.noStroke();
    p.fill(0, 0, 0, 28);
    p.arc(0, 6, 58, 58, 0.15, Math.PI - 0.15, p.CHORD);
    p.fill(255, 255, 255, 150);
    p.ellipse(-14, -10, 14, 9);
  }

  function drawStar(p, color) {
    fillHex(p, color, 46);
    p.noStroke();
    p.circle(0, 0, 78);
    fillHex(p, color);
    p.beginShape();
    for (let i = 0; i < 10; i += 1) {
      const radius = i % 2 === 0 ? 36 : 15;
      const angle = -Math.PI / 2 + (i * Math.PI) / 5;
      p.vertex(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }
    p.endShape(p.CLOSE);
    p.fill(255, 248, 220, 160);
    p.circle(-8, -10, 7);
  }

  function drawLight(p, color) {
    const twinkle = p._twinkle == null ? 1 : p._twinkle;
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(r, g, b, 36 + 70 * twinkle);
    p.circle(0, 8, 26 + 16 * twinkle);
    p.fill(r, g, b);
    p.circle(0, 8, 18);
    p.fill(255, 255, 255, 170);
    p.circle(-4, 4, 5);
    p.fill(62, 48, 32);
    p.rect(-6, -14, 12, 10, 2);
  }

  function canePoint(t) {
    if (t < 0.42) {
      const angle = Math.PI + (t / 0.42) * Math.PI;
      return [Math.cos(angle) * 16, -4 + Math.sin(angle) * 16];
    }
    const along = (t - 0.42) / 0.58;
    return [16, -4 + along * 48];
  }

  function drawCandy(p, color) {
    const [r, g, b] = rgb(color);
    p.noFill();
    p.strokeCap(p.ROUND);
    p.strokeJoin(p.ROUND);
    p.strokeWeight(13);
    p.stroke(255);
    p.beginShape();
    for (let i = 0; i <= 28; i += 1) {
      const point = canePoint(i / 28);
      p.vertex(point[0], point[1]);
    }
    p.endShape();
    p.stroke(r, g, b);
    p.strokeWeight(13);
    for (let i = 0; i < 28; i += 4) {
      const start = canePoint(i / 28);
      const end = canePoint(Math.min(1, (i + 2) / 28));
      p.line(start[0], start[1], end[0], end[1]);
    }
  }

  function drawGift(p, color) {
    const [r, g, b] = rgb(color);
    const dark = shade(color, -30);
    p.noStroke();
    p.fill(dark[0], dark[1], dark[2]);
    p.rect(-32, -22, 64, 14, 3);
    p.fill(r, g, b);
    p.rect(-28, -12, 56, 40, 4);
    p.fill(232, 196, 112);
    p.rect(-5, -22, 10, 50);
    p.rect(-32, -18, 64, 8);
    p.ellipse(-14, -30, 20, 14);
    p.ellipse(14, -30, 20, 14);
    p.fill(255, 236, 190);
    p.circle(0, -26, 9);
  }

  function drawBell(p, color) {
    fillHex(p, color);
    p.noStroke();
    p.beginShape();
    p.vertex(-10, -18);
    p.bezierVertex(-34, -4, -32, 12, -30, 16);
    p.vertex(30, 16);
    p.bezierVertex(32, 12, 34, -4, 10, -18);
    p.endShape(p.CLOSE);
    p.fill(232, 196, 112);
    p.rect(-32, 14, 64, 7, 3);
    p.fill(255, 248, 220, 140);
    p.ellipse(-12, -4, 8, 16);
    p.fill(92, 68, 30);
    p.rect(-4, -30, 8, 14, 2);
    p.fill(48, 32, 18);
    p.circle(0, 6, 8);
  }

  function drawSnowflake(p, color) {
    const [r, g, b] = rgb(color);
    p.stroke(r, g, b);
    p.strokeWeight(3);
    p.strokeCap(p.ROUND);
    p.noFill();
    for (let i = 0; i < 6; i += 1) {
      p.push();
      p.rotate((i * Math.PI) / 3);
      p.line(0, 0, 0, -34);
      p.line(0, -14, -8, -22);
      p.line(0, -14, 8, -22);
      p.line(0, -24, -6, -30);
      p.line(0, -24, 6, -30);
      p.pop();
    }
    p.noStroke();
    p.fill(r, g, b);
    p.circle(0, 0, 6);
  }

  function drawBow(p, color) {
    const [r, g, b] = rgb(color);
    const dark = shade(color, -25);
    p.noStroke();
    p.fill(r, g, b);
    p.ellipse(-16, -6, 32, 22);
    p.ellipse(16, -6, 32, 22);
    p.fill(dark[0], dark[1], dark[2]);
    p.triangle(-6, 2, -24, 34, -2, 24);
    p.triangle(6, 2, 24, 34, 2, 24);
    p.fill(255, 232, 180);
    p.circle(0, -2, 11);
  }

  function drawHeart(p, color) {
    fillHex(p, color);
    p.noStroke();
    p.beginShape();
    p.vertex(0, 28);
    p.bezierVertex(-42, 8, -28, -30, 0, -8);
    p.bezierVertex(28, -30, 42, 8, 0, 28);
    p.endShape(p.CLOSE);
    p.fill(255, 255, 255, 90);
    p.ellipse(-10, -8, 10, 7);
  }

  function drawGingerbread(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(r, g, b);
    p.ellipse(-30, 0, 22, 12);
    p.ellipse(30, 0, 22, 12);
    p.ellipse(-14, 30, 14, 22);
    p.ellipse(14, 30, 14, 22);
    p.ellipse(0, 8, 36, 42);
    p.ellipse(0, -24, 28, 26);
    p.fill(246, 240, 232);
    p.circle(0, 4, 5);
    p.circle(0, 14, 5);
    p.circle(0, 24, 5);
    p.stroke(246, 240, 232);
    p.strokeWeight(3);
    p.noFill();
    p.arc(0, -18, 10, 6, 0.2, Math.PI - 0.2);
    p.noStroke();
    p.fill(54, 32, 24);
    p.circle(-6, -26, 3.5);
    p.circle(6, -26, 3.5);
    p.fill(214, 70, 86);
    p.ellipse(-6, -36, 8, 6);
    p.ellipse(6, -36, 8, 6);
  }

  function drawStocking(p, color) {
    fillHex(p, color);
    p.noStroke();
    p.beginShape();
    p.vertex(-18, -26);
    p.vertex(14, -26);
    p.vertex(16, 12);
    p.vertex(32, 26);
    p.vertex(24, 38);
    p.vertex(-18, 38);
    p.endShape(p.CLOSE);
    p.fill(246, 242, 234);
    p.rect(-20, -40, 36, 16, 4);
    p.fill(228, 194, 122);
    p.rect(-20, -28, 36, 5);
  }

  function drawIcicle(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(186, 146, 72);
    p.rect(-10, -40, 20, 8, 2);
    p.fill(r, g, b, 220);
    p.beginShape();
    p.vertex(-12, -34);
    p.vertex(12, -34);
    p.vertex(3, 38);
    p.vertex(-3, 38);
    p.endShape(p.CLOSE);
    p.fill(255, 255, 255, 170);
    p.beginShape();
    p.vertex(-8, -30);
    p.vertex(-2, -30);
    p.vertex(-1, 12);
    p.vertex(-5, 8);
    p.endShape(p.CLOSE);
  }

  function drawTeardrop(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(232, 196, 112);
    p.rect(-8, -38, 16, 10, 2);
    p.fill(r, g, b);
    p.beginShape();
    p.vertex(0, 36);
    p.bezierVertex(-28, 8, -24, -28, 0, -30);
    p.bezierVertex(24, -28, 28, 8, 0, 36);
    p.endShape(p.CLOSE);
    p.fill(255, 255, 255, 130);
    p.ellipse(-8, -12, 10, 14);
  }

  function drawAngel(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(226, 214, 168, 180);
    p.ellipse(-22, -6, 28, 16);
    p.ellipse(22, -6, 28, 16);
    p.fill(r, g, b);
    p.triangle(0, -8, -20, 32, 20, 32);
    p.fill(232, 196, 112);
    p.ellipse(0, -24, 22, 8);
    p.fill(236, 206, 176);
    p.circle(0, -18, 16);
    p.fill(90, 62, 42);
    p.circle(-3, -18, 2);
    p.circle(3, -18, 2);
  }

  function drawPoinsettia(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    for (let i = 0; i < 8; i += 1) {
      p.push();
      p.rotate((i * Math.PI) / 4);
      p.fill(i % 2 === 0 ? r : Math.max(0, r - 30), g, b);
      p.ellipse(0, -18, 14, 28);
      p.pop();
    }
    p.fill(232, 186, 64);
    p.circle(0, 0, 14);
    p.fill(255, 230, 140);
    p.circle(-2, -2, 5);
  }

  function drawNutcracker(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(32, 32, 36);
    p.rect(-16, -40, 32, 14, 2);
    p.fill(236, 214, 186);
    p.rect(-14, -28, 28, 16);
    p.fill(40, 40, 44);
    p.rect(-14, -16, 28, 5);
    p.fill(r, g, b);
    p.rect(-16, -12, 32, 28, 2);
    p.fill(232, 196, 112);
    p.rect(-16, 0, 32, 5);
    p.circle(0, 6, 6);
    p.fill(24, 24, 28);
    p.rect(-14, 16, 12, 18);
    p.rect(2, 16, 12, 18);
    p.fill(40, 28, 24);
    p.circle(-5, -22, 2.5);
    p.circle(5, -22, 2.5);
  }

  function drawSnowman(p) {
    p.noStroke();
    p.fill(244, 248, 250);
    p.circle(0, 22, 28);
    p.circle(0, 2, 22);
    p.circle(0, -18, 16);
    p.fill(32, 32, 36);
    p.rect(-10, -36, 20, 8, 2);
    p.rect(-4, -42, 8, 8, 2);
    p.fill(196, 48, 52);
    p.rect(-12, -8, 24, 5);
    p.fill(232, 140, 48);
    p.triangle(2, -18, 12, -16, 2, -14);
    p.fill(40, 40, 44);
    p.circle(-3, -20, 2);
    p.circle(3, -20, 2);
    p.circle(0, 2, 2);
    p.circle(0, 10, 2);
  }

  function drawSanta(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(r, g, b);
    p.triangle(-16, -10, 0, -40, 16, -10);
    p.fill(246, 246, 246);
    p.circle(0, -40, 8);
    p.circle(0, -8, 18);
    p.fill(236, 206, 176);
    p.circle(0, -12, 14);
    p.fill(246, 246, 246);
    p.ellipse(0, -4, 16, 10);
    p.fill(40, 28, 24);
    p.circle(-3, -14, 2);
    p.circle(3, -14, 2);
    p.fill(r, g, b);
    p.rect(-14, 4, 28, 22, 6);
    p.fill(246, 246, 246);
    p.rect(-14, 20, 28, 6, 2);
  }

  function drawReindeer(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.stroke(92, 64, 36);
    p.strokeWeight(3);
    p.line(-8, -28, -16, -40);
    p.line(-16, -40, -22, -36);
    p.line(-16, -40, -12, -34);
    p.line(6, -26, 14, -40);
    p.line(14, -40, 20, -36);
    p.line(14, -40, 10, -34);
    p.noStroke();
    p.fill(r, g, b);
    p.ellipse(0, 0, 36, 28);
    p.ellipse(-16, 6, 12, 16);
    p.fill(236, 206, 176);
    p.ellipse(10, 2, 16, 12);
    p.fill(40, 28, 24);
    p.circle(-2, -4, 3);
    p.fill(196, 48, 46);
    p.circle(16, 4, 6);
  }

  function drawCardinal(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(r, g, b);
    p.ellipse(0, 4, 36, 26);
    p.triangle(-20, 2, -34, 10, -18, 12);
    p.ellipse(12, -8, 16, 14);
    p.fill(32, 28, 28);
    p.ellipse(8, -6, 8, 7);
    p.fill(232, 164, 48);
    p.triangle(18, -8, 30, -6, 18, -2);
    p.fill(40, 28, 24);
    p.circle(12, -10, 2.5);
    p.fill(r * 0.75, g, b);
    p.ellipse(-2, 6, 14, 10);
  }

  function drawHolly(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(r, g, b);
    for (let i = 0; i < 3; i += 1) {
      p.push();
      p.rotate(-0.8 + i * 0.8);
      p.beginShape();
      p.vertex(0, 6);
      p.vertex(-16, -8);
      p.vertex(-6, -4);
      p.vertex(0, -28);
      p.vertex(6, -4);
      p.vertex(16, -8);
      p.endShape(p.CLOSE);
      p.pop();
    }
    p.fill(196, 42, 46);
    p.circle(-6, 8, 8);
    p.circle(6, 6, 8);
    p.circle(0, 14, 8);
  }

  function drawCandle(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(90, 62, 36);
    p.rect(-16, 18, 32, 10, 2);
    p.fill(r, g, b);
    p.rect(-8, -16, 16, 36, 3);
    p.fill(255, 186, 64, 80);
    p.circle(0, -24, 18);
    p.fill(255, 214, 90);
    p.ellipse(0, -26, 8, 14);
    p.fill(255, 248, 220);
    p.ellipse(0, -30, 4, 8);
  }

  function drawApple(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(r, g, b);
    p.circle(-6, 4, 28);
    p.circle(7, 4, 28);
    p.fill(92, 58, 32);
    p.rect(-2, -22, 4, 12, 1);
    p.fill(46, 122, 58);
    p.ellipse(8, -20, 14, 8);
    p.fill(255, 255, 255, 120);
    p.ellipse(-8, -2, 8, 6);
  }

  function drawEgg(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(212, 170, 90);
    p.rect(-7, -36, 14, 8, 2);
    p.fill(r, g, b);
    p.ellipse(0, 4, 36, 48);
    p.fill(196, 54, 62);
    p.rect(-18, -2, 36, 8);
    p.fill(232, 196, 112);
    p.rect(-18, 6, 36, 3);
    p.fill(255, 255, 255, 140);
    p.ellipse(-8, -8, 8, 12);
  }

  function drawWreath(p, color) {
    const [r, g, b] = rgb(color);
    p.noFill();
    p.stroke(r, g, b);
    p.strokeWeight(10);
    p.circle(0, 2, 40);
    p.stroke(r + 24, g + 20, b);
    p.strokeWeight(4);
    p.arc(0, 2, 40, 40, -0.4, 1.2);
    p.noStroke();
    p.fill(196, 48, 52);
    p.circle(-8, 16, 6);
    p.circle(0, 18, 6);
    p.circle(8, 14, 6);
    p.fill(196, 48, 62);
    p.ellipse(0, -22, 16, 10);
    p.ellipse(-8, -18, 12, 8);
    p.ellipse(8, -18, 12, 8);
  }

  function drawMitten(p, color) {
    fillHex(p, color);
    p.noStroke();
    p.beginShape();
    p.vertex(-16, -18);
    p.vertex(10, -18);
    p.vertex(14, 8);
    p.vertex(8, 34);
    p.vertex(-16, 34);
    p.endShape(p.CLOSE);
    p.ellipse(14, -2, 14, 18);
    p.fill(246, 242, 234);
    p.rect(-18, -32, 32, 16, 4);
    p.fill(228, 194, 122);
    p.rect(-18, -18, 32, 4);
  }

  function drawPinecone(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    for (let i = 0; i < 7; i += 1) {
      const y = -30 + i * 9;
      const w = 16 + i * 5;
      p.fill(Math.min(255, r + 18), Math.min(255, g + 12), Math.min(255, b + 6));
      p.ellipse(0, y, w, 12);
      p.fill(r * 0.72, g * 0.72, b * 0.72);
      p.ellipse(-w * 0.22, y + 1, 7, 7);
      p.ellipse(w * 0.22, y + 1, 7, 7);
    }
  }

  function drawStrand(p, color) {
    const multi = String(color).toLowerCase() === "#ffffff";
    p.noFill();
    p.stroke(92, 70, 42);
    p.strokeWeight(2);
    p.beginShape();
    p.vertex(-46, 6);
    p.bezierVertex(-18, 20, 18, -10, 46, 4);
    p.endShape();
    for (let i = 0; i < 7; i += 1) {
      const t = i / 6;
      const x = -46 + t * 92;
      const y = 6 + Math.sin(t * Math.PI) * 8;
      const [r, g, b] = rgb(multi ? STRAND_COLORS[i % STRAND_COLORS.length] : color);
      p.noStroke();
      p.fill(r, g, b, 70);
      p.circle(x, y, 14);
      p.fill(r, g, b);
      p.circle(x, y, 8);
    }
  }

  function drawRing(p, color) {
    const [r, g, b] = rgb(color);
    p.noFill();
    p.stroke(r, g, b);
    p.strokeWeight(7);
    p.ellipse(0, 10, 34, 26);
    p.noStroke();
    p.fill(236, 246, 255);
    p.beginShape();
    p.vertex(0, -22);
    p.vertex(7, -8);
    p.vertex(0, -2);
    p.vertex(-7, -8);
    p.endShape(p.CLOSE);
    p.fill(255, 255, 255, 180);
    p.circle(-2, -12, 3);
  }

  function drawHouse(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(r, g, b);
    p.triangle(0, -36, -34, -2, 34, -2);
    p.fill(246, 240, 226);
    p.rect(-24, -2, 48, 36, 2);
    p.fill(92, 58, 36);
    p.rect(-8, 12, 16, 22);
    p.fill(150, 198, 224);
    p.rect(-18, 6, 10, 10, 1);
    p.rect(8, 6, 10, 10, 1);
    p.fill(232, 196, 112);
    p.circle(3, 22, 3);
  }

  function drawCar(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(r, g, b);
    p.rect(-30, -2, 60, 20, 7);
    p.rect(-16, -18, 32, 18, 7);
    p.fill(186, 222, 238);
    p.rect(-12, -14, 12, 10, 2);
    p.rect(2, -14, 12, 10, 2);
    p.fill(36, 38, 42);
    p.circle(-16, 18, 14);
    p.circle(16, 18, 14);
    p.fill(220, 224, 226);
    p.circle(-16, 18, 6);
    p.circle(16, 18, 6);
  }

  function drawBaby(p) {
    p.noStroke();
    p.fill(248, 236, 228);
    p.ellipse(0, 18, 40, 26);
    p.fill(236, 206, 176);
    p.circle(0, -6, 22);
    p.fill(232, 176, 184);
    p.ellipse(0, -18, 24, 10);
    p.fill(70, 48, 40);
    p.circle(-4, -6, 2.4);
    p.circle(4, -6, 2.4);
    p.stroke(196, 110, 114);
    p.strokeWeight(1.6);
    p.noFill();
    p.arc(0, -2, 8, 6, 0.15, Math.PI - 0.15);
  }

  function drawCap(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(r, g, b);
    p.quad(-36, -2, 0, -16, 36, -2, 0, 10);
    p.rect(-14, 0, 28, 16, 2);
    p.stroke(232, 196, 112);
    p.strokeWeight(2);
    p.line(10, -4, 18, 20);
    p.noStroke();
    p.fill(232, 196, 112);
    p.circle(18, 22, 8);
  }

  function drawPlane(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(r, g, b);
    p.ellipse(4, 2, 58, 16);
    p.triangle(-6, 2, 12, -28, 18, 2);
    p.triangle(-6, 2, 12, 30, 18, 2);
    p.triangle(22, -4, 34, 2, 22, 8);
    p.fill(170, 206, 224);
    p.ellipse(-6, 0, 12, 7);
  }

  function drawPaw(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(r, g, b);
    p.ellipse(0, 12, 30, 24);
    p.circle(-16, -6, 12);
    p.circle(-6, -16, 12);
    p.circle(7, -16, 12);
    p.circle(17, -6, 12);
  }

  function drawKey(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(r, g, b);
    p.circle(-12, -10, 24);
    p.fill(34, 42, 40);
    p.circle(-12, -10, 9);
    p.fill(r, g, b);
    p.rect(-2, -5, 32, 8, 2);
    p.rect(18, 3, 6, 12, 1);
    p.rect(10, 3, 5, 8, 1);
  }

  function drawCake(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(r, g, b);
    p.rect(-26, 2, 52, 26, 5);
    p.fill(255, 236, 220);
    p.rect(-26, -8, 52, 14, 4);
    p.fill(246, 246, 246);
    p.circle(-12, 14, 5);
    p.circle(0, 14, 5);
    p.circle(12, 14, 5);
    p.fill(232, 196, 112);
    p.rect(-2, -24, 4, 16);
    p.fill(255, 186, 70);
    p.ellipse(0, -26, 8, 12);
  }

  function drawTrophy(p, color) {
    const [r, g, b] = rgb(color);
    p.noFill();
    p.stroke(r, g, b);
    p.strokeWeight(4);
    p.arc(-18, -2, 16, 24, p.HALF_PI, p.PI + p.HALF_PI);
    p.arc(18, -2, 16, 24, -p.HALF_PI, p.HALF_PI);
    p.noStroke();
    p.fill(r, g, b);
    p.rect(-16, -22, 32, 30, 10);
    p.rect(-5, 8, 10, 12);
    p.rect(-16, 20, 32, 8, 2);
    p.fill(255, 244, 210);
    p.triangle(0, -14, 5, -4, -5, -4);
  }

  function drawBook(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(r, g, b);
    p.rect(-28, -20, 26, 42, 3);
    p.fill(Math.min(255, r + 36), Math.min(255, g + 24), Math.min(255, b + 16));
    p.rect(2, -20, 26, 42, 3);
    p.fill(246, 241, 228);
    p.rect(-24, -15, 18, 32, 1);
    p.rect(6, -15, 18, 32, 1);
    p.fill(r, g, b);
    p.rect(-2, -20, 4, 42);
  }

  function drawMusic(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(r, g, b);
    p.ellipse(-14, 16, 18, 12);
    p.ellipse(12, 8, 18, 12);
    p.rect(-8, -30, 4, 46);
    p.rect(18, -36, 4, 44);
    p.rect(-8, -30, 30, 6, 2);
  }

  function drawCamera(p, color) {
    const [r, g, b] = rgb(color);
    p.noStroke();
    p.fill(r, g, b);
    p.rect(-30, -8, 60, 36, 7);
    p.rect(-10, -20, 18, 14, 3);
    p.fill(230, 236, 238);
    p.circle(2, 10, 24);
    p.fill(120, 176, 206);
    p.circle(2, 10, 14);
    p.fill(255, 214, 90);
    p.circle(20, -1, 6);
  }

  function drawSprout(p, color) {
    const [r, g, b] = rgb(color);
    p.noFill();
    p.stroke(r, g, b);
    p.strokeWeight(4);
    p.line(0, 22, 0, -4);
    p.noStroke();
    p.fill(r, g, b);
    p.ellipse(-12, -8, 22, 14);
    p.ellipse(12, -14, 22, 14);
    p.fill(176, 112, 64);
    p.ellipse(0, 26, 30, 12);
  }

  const DRAW = {
    bauble: drawBauble,
    star: drawStar,
    light: drawLight,
    candy: drawCandy,
    gift: drawGift,
    bell: drawBell,
    snowflake: drawSnowflake,
    bow: drawBow,
    heart: drawHeart,
    gingerbread: drawGingerbread,
    stocking: drawStocking,
    pinecone: drawPinecone,
    icicle: drawIcicle,
    teardrop: drawTeardrop,
    angel: drawAngel,
    poinsettia: drawPoinsettia,
    nutcracker: drawNutcracker,
    snowman: drawSnowman,
    santa: drawSanta,
    reindeer: drawReindeer,
    cardinal: drawCardinal,
    holly: drawHolly,
    candle: drawCandle,
    apple: drawApple,
    egg: drawEgg,
    wreath: drawWreath,
    mitten: drawMitten,
    strand: drawStrand,
    ring: drawRing,
    house: drawHouse,
    car: drawCar,
    baby: drawBaby,
    cap: drawCap,
    plane: drawPlane,
    paw: drawPaw,
    key: drawKey,
    cake: drawCake,
    trophy: drawTrophy,
    book: drawBook,
    music: drawMusic,
    camera: drawCamera,
    sprout: drawSprout,
  };

  function textFor(key) {
    return window.t ? window.t(key) : key;
  }

  function labelFor(item) {
    const known = CATALOG.find((entry) => entry.type === item.type && entry.color === item.color);
    if (item.type === "photo") return textFor(item.kind === "video" ? "myVideo" : "myPhoto");
    if (known) return textFor(`item.${known.key}`);
    return textFor("ornamentFallback");
  }

  window.TREE_CATALOG = CATALOG;

  window.createTreeStudio = function createTreeStudio(host, hooks) {
    const notify = hooks || {};
    let renderer = null;
    let ready = false;
    let mode = "edit";
    let items = [];
    let selectedId = null;
    let ghost = null;
    let drag = null;
    let press = null;
    let stamp = null;
    let lastPointer = 0;
    let treeStyle = "green";
    let twinkleMode = "soft";
    const undoStack = [];
    const mediaAssets = new Map();

    function sceneScale() {
      return Math.min(renderer.width, renderer.height) / 680;
    }

    function publicItems() {
      return items.map((item) => {
        const next = {
          type: item.type,
          color: item.color,
          x: Number(item.x.toFixed(4)),
          y: Number(item.y.toFixed(4)),
          rot: Number((item.rot || 0).toFixed(4)),
          scale: Number((item.scale || 1).toFixed(3)),
        };
        if (item.type === "photo" && item.media) {
          next.media = item.media;
          next.kind = item.kind === "video" ? "video" : "image";
        }
        if ((item.type === "light" || item.type === "strand") && GLOW_MODES.includes(item.glow)) {
          next.glow = item.glow;
        }
        return next;
      });
    }

    function copyItem(item) {
      return {
        id: uid(),
        type: item.type,
        color: String(item.color || "#ffffff").toLowerCase(),
        x: Number(item.x) || 0.5,
        y: Number(item.y) || 0.5,
        rot: Number(item.rot) || 0,
        scale: Number(item.scale) || 1,
        media: item.media || null,
        kind: item.kind || null,
        glow: GLOW_MODES.includes(item.glow) ? item.glow : null,
        born: 0,
      };
    }

    const TREE_TIERS = [
      { top: 0.15, mid: 0.4, w: 0.14 },
      { top: 0.3, mid: 0.56, w: 0.22 },
      { top: 0.45, mid: 0.72, w: 0.31 },
      { top: 0.6, mid: 0.86, w: 0.4 },
    ];

    function pointInTree(nx, ny) {
      if (!renderer) return false;
      const s = Math.min(renderer.width, renderer.height);
      const px = Math.abs(nx - 0.5) * renderer.width;
      const py = ny * renderer.height;
      return TREE_TIERS.some((tier) => {
        const top = tier.top * renderer.height;
        const mid = tier.mid * renderer.height;
        const half = s * tier.w;
        const bottom = mid + half * 0.16;
        if (py < top || py > bottom) return false;
        const reach = py <= mid
          ? half * (0.08 + 0.92 * ((py - top) / Math.max(1, mid - top)))
          : half * (1 - 0.45 * ((py - mid) / Math.max(1, bottom - mid)));
        return px <= reach;
      });
    }

    function clampStrandY(ny) {
      if (pointInTree(0.5, ny)) return ny;
      let best = 0.52;
      let bestDist = Infinity;
      for (let step = 0; step <= 48; step += 1) {
        const y = 0.16 + ((0.9 - 0.16) * step) / 48;
        if (!pointInTree(0.5, y)) continue;
        const dist = Math.abs(y - ny);
        if (dist < bestDist) {
          bestDist = dist;
          best = y;
        }
      }
      return best;
    }

    function treeHalf(yNorm) {
      const s = Math.min(renderer.width, renderer.height);
      const t = Math.min(1, Math.max(0, (yNorm - 0.16) / 0.7));
      return s * (0.05 + t * 0.36);
    }

    function bulbLevel(index, count, modeName) {
      const mode = modeName || twinkleMode;
      if (calm || mode === "steady") return 1;
      const time = renderer.millis() / 1000;
      if (mode === "soft") return 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(time * 2.1));
      if (mode === "chase") {
        const head = (time * 0.45) % 1;
        const along = count <= 1 ? 0 : index / (count - 1);
        const distance = Math.min(Math.abs(along - head), 1 - Math.abs(along - head));
        return distance < 0.08 ? 1 : 0.22;
      }
      if (mode === "spark") return 0.15 + 0.85 * Math.max(0, Math.sin(time * 8 + index * 1.7));
      const gate = Math.floor(time * 3.2 + index * 2.3) % 4;
      return gate === 0 ? 1 : 0.18;
    }

    function loadMedia(item) {
      if (!item || item.type !== "photo" || !item.media || mediaAssets.has(item.media)) return;
      const url = `/media/${item.media}`;
      if (item.kind === "video") {
        const video = document.createElement("video");
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = "auto";
        const record = { kind: "video", video, ready: false };
        video.addEventListener("loadeddata", () => {
          record.ready = true;
          video.play().catch(() => {});
        });
        mediaAssets.set(item.media, record);
        video.src = url;
        return;
      }
      const image = new Image();
      const record = { kind: "image", image, ready: false };
      image.onload = () => {
        record.ready = true;
      };
      mediaAssets.set(item.media, record);
      image.src = url;
    }

    function emit() {
      if (notify.onChange) notify.onChange(publicItems());
    }

    function selectionInfo() {
      const item = items.find((entry) => entry.id === selectedId);
      if (!item) return null;
      return { id: item.id, type: item.type, glow: item.glow || "inherit", label: labelFor(item) };
    }

    function emitSelection() {
      if (notify.onSelect) notify.onSelect(selectionInfo());
    }

    function pushUndo() {
      undoStack.push(JSON.stringify(publicItems()));
      if (undoStack.length > 40) undoStack.shift();
    }

    function hitTest(px, py) {
      const unit = sceneScale();
      for (let index = items.length - 1; index >= 0; index -= 1) {
        const item = items[index];
        if (item.type === "strand") {
          const y = item.y * renderer.height;
          const half = treeHalf(item.y);
          const band = Math.max(20, 18 * unit * item.scale);
          if (Math.abs(px - renderer.width * 0.5) <= half && Math.abs(py - y) <= band) return item;
          continue;
        }
        const radius = (HIT[item.type] || 28) * item.scale * unit;
        const dx = px - item.x * renderer.width;
        const dy = py - item.y * renderer.height;
        if (dx * dx + dy * dy <= radius * radius) return item;
      }
      return null;
    }

    function addItem(type, color, x, y, extra) {
      if (mode !== "edit") return false;
      if (type !== "photo" && !DRAW[type]) return false;
      if (type === "photo" && items.filter((entry) => entry.type === "photo").length >= 5) {
        if (notify.onNotice) notify.onNotice(textFor("limitPhotos"));
        return false;
      }
      if (items.length >= MAX_ITEMS) {
        if (notify.onNotice) notify.onNotice(textFor("limitItems"));
        return false;
      }
      if (type === "strand" && !pointInTree(x, y)) {
        if (notify.onNotice) notify.onNotice(textFor("strandOnly"));
        return false;
      }
      pushUndo();
      const item = {
        id: uid(),
        type,
        color: color.toLowerCase(),
        x: type === "strand" ? 0.5 : Math.min(0.97, Math.max(0.03, x)),
        y: Math.min(0.96, Math.max(0.04, y)),
        rot: 0,
        scale: 1,
        media: extra && extra.media ? extra.media : null,
        kind: extra && extra.kind ? extra.kind : null,
        glow: null,
        born: renderer ? renderer.millis() : 0,
      };
      if (type === "photo") loadMedia(item);
      items.push(item);
      selectedId = item.id;
      emit();
      emitSelection();
      return true;
    }

    function selectedItem() {
      return items.find((item) => item.id === selectedId) || null;
    }

    function changeSelected(mutator, options) {
      const item = selectedItem();
      if (!item || mode !== "edit") return false;
      if (!options || !options.skipUndo) pushUndo();
      mutator(item);
      emit();
      return true;
    }

    function drawSky(p) {
      const context = p.drawingContext;
      const gradient = context.createLinearGradient(0, 0, 0, p.height);
      gradient.addColorStop(0, "#071018");
      gradient.addColorStop(0.48, "#14263a");
      gradient.addColorStop(1, "#1a3330");
      context.fillStyle = gradient;
      context.fillRect(0, 0, p.width, p.height);
    }

    function drawStars(p) {
      p.noStroke();
      stars.forEach((star, index) => {
        const twinkle = calm ? 0.75 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(p.millis() / 700 + star.phase));
        p.fill(255, 255, 255, 220 * twinkle);
        p.circle(star.x * p.width, star.y * p.height, star.r + (index % 9 === 0 ? 1.2 : 0));
      });
    }

    function drawMoon(p) {
      const s = Math.min(p.width, p.height);
      const x = p.width * 0.84;
      const y = p.height * 0.13;
      const radius = s * 0.055;
      p.noStroke();
      p.fill(244, 232, 196, 28);
      p.circle(x, y, radius * 3.4);
      p.fill(247, 241, 220);
      p.circle(x, y, radius * 2);
      p.fill(214, 204, 170, 150);
      p.circle(x - radius * 0.35, y - radius * 0.25, radius * 0.42);
      p.circle(x + radius * 0.4, y + radius * 0.28, radius * 0.28);
    }

    function drawTree(p) {
      const look = TREE_LOOK[treeStyle] || TREE_LOOK.green;
      const s = Math.min(p.width, p.height);
      const cx = p.width * 0.5;
      p.noStroke();
      p.fill(255, 206, 140, treeStyle === "wood" ? 10 : 18);
      p.ellipse(cx, p.height * 0.8, s * 0.52, s * 0.1);

      const trunkWidth = s * 0.034;
      p.fill(look.trunk[0], look.trunk[1], look.trunk[2]);
      p.rect(cx - trunkWidth, p.height * 0.74, trunkWidth * 2, p.height * 0.15, 8);
      p.fill(look.trunkShade[0], look.trunkShade[1], look.trunkShade[2]);
      p.rect(cx - trunkWidth * 0.15, p.height * 0.75, trunkWidth * 0.32, p.height * 0.12);

      const tiers = [
        { top: 0.6, mid: 0.86, w: 0.4, color: look.tiers[0] },
        { top: 0.45, mid: 0.72, w: 0.31, color: look.tiers[1] },
        { top: 0.3, mid: 0.56, w: 0.22, color: look.tiers[2] },
        { top: 0.15, mid: 0.4, w: 0.14, color: look.tiers[3] },
      ];

      tiers.forEach((tier) => {
        const top = p.height * tier.top;
        const mid = p.height * tier.mid;
        const width = s * tier.w;
        p.noStroke();
        p.fill(tier.color[0], tier.color[1], tier.color[2]);
        p.beginShape();
        p.vertex(cx, top);
        p.bezierVertex(cx + width * 0.2, top + (mid - top) * 0.42, cx + width * 0.78, mid - width * 0.05, cx + width, mid);
        p.bezierVertex(cx + width * 0.42, mid + width * 0.18, cx - width * 0.42, mid + width * 0.18, cx - width, mid);
        p.bezierVertex(cx - width * 0.78, mid - width * 0.05, cx - width * 0.2, top + (mid - top) * 0.42, cx, top);
        p.endShape(p.CLOSE);

        p.fill(tier.color[0] * 0.45, tier.color[1] * 0.62, tier.color[2] * 0.5, 80);
        p.triangle(cx, top + (mid - top) * 0.2, cx + width * 0.16, mid + width * 0.02, cx - width * 0.05, mid);

        if (look.snow > 40) {
          p.fill(255, 255, 255, look.snow);
          p.ellipse(cx - width * 0.25, top + (mid - top) * 0.34, width * 0.28, width * 0.08);
          p.ellipse(cx + width * 0.32, top + (mid - top) * 0.5, width * 0.2, width * 0.06);
        }
      });

      p.noStroke();
      p.fill(232, 241, 246);
      p.beginShape();
      p.vertex(0, p.height);
      p.vertex(0, p.height * 0.91);
      p.bezierVertex(p.width * 0.18, p.height * 0.84, p.width * 0.42, p.height * 0.95, p.width * 0.68, p.height * 0.87);
      p.bezierVertex(p.width * 0.84, p.height * 0.83, p.width, p.height * 0.89, p.width, p.height * 0.89);
      p.vertex(p.width, p.height);
      p.endShape(p.CLOSE);
      p.fill(255, 255, 255, 170);
      p.ellipse(p.width * 0.18, p.height * 0.9, s * 0.16, s * 0.03);
      p.ellipse(p.width * 0.78, p.height * 0.885, s * 0.2, s * 0.035);
    }

    function drawSnow(p, layer) {
      const delta = Math.min(48, p.deltaTime || 16) / 1000;
      const motion = calm ? 0.25 : 1;
      if (layer === 0) {
        flakes.forEach((flake) => {
          flake.y += flake.speed * delta * motion;
          flake.x += Math.sin(p.millis() / 900 + flake.drift) * 0.00035 * motion;
          if (flake.y > 1.04) {
            flake.y = -0.04;
            flake.x = Math.random();
          }
          if (flake.x < -0.05) flake.x = 1.02;
          if (flake.x > 1.05) flake.x = -0.02;
        });
      }
      p.noStroke();
      flakes.forEach((flake, index) => {
        if (index % 2 !== layer) return;
        p.fill(255, 255, 255, layer === 0 ? 150 : 220);
        p.circle(flake.x * p.width, flake.y * p.height, flake.r);
      });
    }

    function drawPhoto(p, item) {
      const asset = mediaAssets.get(item.media);
      const context = p.drawingContext;
      p.noStroke();
      p.fill(232, 196, 112);
      p.rect(-34, -46, 68, 88, 8);
      p.fill(28, 36, 32);
      p.rect(-29, -41, 58, 70, 4);
      if (!asset || !asset.ready) {
        p.fill(246, 241, 228);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(18);
        p.text(textFor(item.kind === "video" ? "videoShort" : "photoShort"), 0, -4);
        return;
      }
      const source = asset.kind === "video" ? asset.video : asset.image;
      context.save();
      context.beginPath();
      context.rect(-29, -41, 58, 70);
      context.clip();
      const sw = source.videoWidth || source.width || 1;
      const sh = source.videoHeight || source.height || 1;
      const scale = Math.max(58 / sw, 70 / sh);
      const dw = sw * scale;
      const dh = sh * scale;
      context.drawImage(source, -dw / 2, -dh / 2 - 6, dw, dh);
      context.restore();
      if (asset.kind === "video") {
        p.fill(255, 255, 255, 210);
        p.triangle(16, 22, 26, 28, 16, 34);
      }
    }

    function drawStrandWrap(p, item, alpha) {
      const s = Math.min(p.width, p.height);
      const cx = p.width * 0.5;
      const y = item.y * p.height;
      const half = treeHalf(item.y) * Math.min(1.15, Math.max(0.75, item.scale));
      const sag = Math.max(10, half * 0.18);
      const count = 18;
      const multi = item.color === "#ffffff";
      p.noFill();
      p.stroke(74, 56, 34, 150 * (alpha / 255));
      p.strokeWeight(Math.max(1.4, s * 0.0026));
      p.beginShape();
      p.vertex(cx - half, y);
      p.bezierVertex(cx - half * 0.25, y + sag, cx + half * 0.2, y - sag * 0.35, cx + half, y + sag * 0.15);
      p.endShape();
      for (let i = 0; i < count; i += 1) {
        const t = count === 1 ? 0.5 : i / (count - 1);
        const x = cx - half + half * 2 * t;
        const wave = Math.sin(t * Math.PI);
        const by = y + wave * sag * (t < 0.62 ? 0.85 : -0.2);
        const glow = bulbLevel(i, count, item.glow);
        const [r, g, b] = rgb(multi ? STRAND_COLORS[i % STRAND_COLORS.length] : item.color);
        const bulb = Math.max(5, s * 0.011 * item.scale);
        p.noStroke();
        p.fill(r, g, b, 50 * glow * (alpha / 255));
        p.circle(x, by, bulb * 2.6);
        p.fill(r, g, b, Math.max(70, 255 * glow) * (alpha / 255));
        p.circle(x, by, bulb);
        p.fill(255, 255, 255, 160 * glow * (alpha / 255));
        p.circle(x - bulb * 0.18, by - bulb * 0.18, bulb * 0.28);
      }
    }

    function ornamentScale(item) {
      let pop = 1;
      if (!calm && item.born) {
        const t = Math.min(1, (renderer.millis() - item.born) / 260);
        pop = 0.62 + 0.38 * (1 - (1 - t) ** 3);
      }
      return sceneScale() * item.scale * pop;
    }

    function drawPlaced(p, item, alpha) {
      const x = item.x * p.width;
      const y = item.y * p.height;
      const size = ornamentScale(item);
      if (item.type === "light") {
        p._twinkle = bulbLevel(Math.round(item.x * 12 + item.y * 7), 8, item.glow);
      }
      if (item.type === "photo") {
        p.noStroke();
        p.fill(0, 0, 0, 32 * (alpha / 255));
        p.ellipse(x, y + 36 * size, 42 * size, 10 * size);
        p.push();
        p.translate(x, y);
        p.rotate(item.rot || 0);
        p.scale(size);
        const photoContext = p.drawingContext;
        const photoAlpha = photoContext.globalAlpha;
        photoContext.globalAlpha = photoAlpha * (alpha / 255);
        drawPhoto(p, item);
        photoContext.globalAlpha = photoAlpha;
        p.pop();
        return;
      }
      p.noStroke();
      p.fill(0, 0, 0, 32 * (alpha / 255));
      p.ellipse(x, y + 32 * size, 36 * size, 10 * size);
      p.push();
      p.translate(x, y);
      p.rotate(item.rot || 0);
      p.scale(size);
      const context = p.drawingContext;
      const previous = context.globalAlpha;
      context.globalAlpha = previous * (alpha / 255);
      DRAW[item.type](p, item.color);
      context.globalAlpha = previous;
      p.pop();
    }

    function itemRadius(item) {
      return (HIT[item.type] || 30) * sceneScale() * item.scale;
    }

    function handlePoint(item) {
      const radius = itemRadius(item);
      return {
        x: item.x * renderer.width + radius * 0.75,
        y: item.y * renderer.height + radius * 0.75,
      };
    }

    function hitHandle(x, y) {
      const item = selectedItem();
      if (!item || mode !== "edit") return false;
      const point = handlePoint(item);
      const dx = x - point.x;
      const dy = y - point.y;
      const radius = Math.max(22, 24 * sceneScale());
      return dx * dx + dy * dy <= radius * radius;
    }

    function clampScale(value) {
      return Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
    }

    function drawSelection(p) {
      const item = selectedItem();
      if (!item || mode !== "edit") return;
      const x = item.x * p.width;
      const y = item.y * p.height;
      const radius = itemRadius(item);
      const handle = handlePoint(item);
      p.noFill();
      p.stroke(228, 194, 122, 200);
      p.strokeWeight(1.5);
      p.circle(x, y, radius * 2.2);
      p.line(x + radius * 0.45, y + radius * 0.45, handle.x, handle.y);
      p.fill(246, 241, 228);
      p.stroke(120, 86, 36);
      p.strokeWeight(2);
      p.circle(handle.x, handle.y, Math.max(26, 24 * sceneScale()));
    }

    function removePoint(item) {
      if (item.type === "strand") {
        const half = treeHalf(item.y);
        return {
          x: renderer.width * 0.5 + half * 0.78,
          y: item.y * renderer.height - Math.max(18, 16 * sceneScale()),
        };
      }
      const radius = itemRadius(item);
      return {
        x: item.x * renderer.width + radius * 0.78,
        y: item.y * renderer.height - radius * 0.78,
      };
    }

    function markRadius() {
      return Math.max(13, 12 * sceneScale());
    }

    function hitRemove(x, y) {
      if (mode !== "edit") return null;
      const item = selectedItem();
      if (!item) return null;
      const point = removePoint(item);
      const dx = x - point.x;
      const dy = y - point.y;
      const reach = markRadius() + 6;
      if (dx * dx + dy * dy <= reach * reach) return item;
      return null;
    }

    function deleteItem(id) {
      const item = items.find((entry) => entry.id === id);
      if (!item || mode !== "edit") return false;
      pushUndo();
      items = items.filter((entry) => entry.id !== id);
      if (selectedId === id) selectedId = null;
      emit();
      emitSelection();
      return true;
    }

    function drawRemoveMarks(p) {
      const item = selectedItem();
      if (!item || mode !== "edit") return;
      const point = removePoint(item);
      const radius = markRadius();
      p.stroke(255, 248, 240);
      p.strokeWeight(2);
      p.fill(196, 69, 60, 240);
      p.circle(point.x, point.y, radius * 2);
      p.stroke(255);
      p.strokeWeight(Math.max(1.8, radius * 0.24));
      const arm = radius * 0.42;
      p.line(point.x - arm, point.y - arm, point.x + arm, point.y + arm);
      p.line(point.x + arm, point.y - arm, point.x - arm, point.y + arm);
    }

    function pointerDown(x, y) {
      if (!ready || mode !== "edit") return;
      const now = performance.now();
      if (now - lastPointer < 40) return;
      lastPointer = now;
      press = null;
      const removeHit = hitRemove(x, y);
      if (removeHit) {
        deleteItem(removeHit.id);
        return;
      }
      if (hitHandle(x, y)) {
        const item = selectedItem();
        const dx = x - item.x * renderer.width;
        const dy = y - item.y * renderer.height;
        drag = {
          id: item.id,
          mode: "resize",
          moved: false,
          saved: false,
          startScale: item.scale,
          startDist: Math.max(12, Math.hypot(dx, dy)),
        };
        return;
      }
      const hit = hitTest(x, y);
      if (hit) {
        selectedId = hit.id;
        drag = { id: hit.id, mode: "move", moved: false, saved: false };
        emitSelection();
        return;
      }
      selectedId = null;
      drag = null;
      press = { x, y };
      emitSelection();
    }

    function pointerMove(x, y) {
      if (press) {
        const dx = x - press.x;
        const dy = y - press.y;
        if (dx * dx + dy * dy > 16) press = null;
      }
      if (!drag || mode !== "edit") return;
      const item = items.find((entry) => entry.id === drag.id);
      if (!item) return;
      if (!drag.saved) {
        pushUndo();
        drag.saved = true;
      }
      drag.moved = true;
      if (drag.mode === "resize") {
        const dx = x - item.x * renderer.width;
        const dy = y - item.y * renderer.height;
        const dist = Math.max(12, Math.hypot(dx, dy));
        item.scale = clampScale(drag.startScale * (dist / drag.startDist));
        return;
      }
      if (item.type === "strand") {
        item.x = 0.5;
        item.y = clampStrandY(y / renderer.height);
        return;
      }
      item.y = Math.min(0.96, Math.max(0.04, y / renderer.height));
      item.x = Math.min(0.97, Math.max(0.03, x / renderer.width));
    }

    let lastTap = { id: null, time: 0 };

    function pointerUp() {
      if (drag) {
        if (drag.moved) emit();
        else if (drag.mode === "move") {
          const now = performance.now();
          if (lastTap.id === drag.id && now - lastTap.time < 360) {
            deleteSelected();
            lastTap = { id: null, time: 0 };
          } else {
            lastTap = { id: drag.id, time: now };
          }
        }
      } else if (press && stamp && mode === "edit") {
        addItem(stamp.type, stamp.color, press.x / renderer.width, press.y / renderer.height);
      }
      drag = null;
      press = null;
    }

    const api = {
      setMode(next) {
        mode = next === "view" ? "view" : "edit";
        if (mode === "view") {
          selectedId = null;
          ghost = null;
          drag = null;
          press = null;
          emitSelection();
        }
      },
      setItems(next) {
        items = (next || []).filter((item) => item.type === "photo" || DRAW[item.type]).map((item) => {
          const copy = copyItem(item);
          if (copy.type === "photo") loadMedia(copy);
          return copy;
        });
        selectedId = null;
        undoStack.length = 0;
        emitSelection();
      },
      getItems: publicItems,
      addItem,
      setGhost(value) {
        ghost = value;
      },
      clear() {
        if (!items.length || mode !== "edit") return false;
        pushUndo();
        items = [];
        selectedId = null;
        emit();
        emitSelection();
        return true;
      },
      undo() {
        if (!undoStack.length || mode !== "edit") return false;
        const previous = JSON.parse(undoStack.pop());
        items = previous.map((item) => {
          const copy = copyItem(item);
          if (copy.type === "photo") loadMedia(copy);
          return copy;
        });
        selectedId = null;
        emit();
        emitSelection();
        return true;
      },
      canUndo() {
        return undoStack.length > 0 && mode === "edit";
      },
      deleteSelected() {
        const item = selectedItem();
        if (!item) return false;
        pushUndo();
        items = items.filter((entry) => entry.id !== item.id);
        selectedId = null;
        emit();
        emitSelection();
        return true;
      },
      clearSelection() {
        selectedId = null;
        emitSelection();
      },
      setStamp(value) {
        stamp = value ? { type: value.type, color: value.color } : null;
      },
      nudgeRot(delta, options) {
        return changeSelected((item) => {
          item.rot += delta;
        }, options);
      },
      nudgeScale(delta, options) {
        return changeSelected((item) => {
          item.scale = clampScale(item.scale + delta);
        }, options);
      },
      nudgePos(dx, dy, options) {
        return changeSelected((item) => {
          item.x = Math.min(0.97, Math.max(0.03, item.x + dx));
          item.y = Math.min(0.96, Math.max(0.04, item.y + dy));
        }, options);
      },
      order(direction) {
        const index = items.findIndex((item) => item.id === selectedId);
        const target = index + direction;
        if (index < 0 || target < 0 || target >= items.length) return false;
        pushUndo();
        const [item] = items.splice(index, 1);
        items.splice(target, 0, item);
        emit();
        return true;
      },
      resize() {
        if (!ready) return;
        const rect = host.getBoundingClientRect();
        renderer.resizeCanvas(Math.max(1, Math.floor(rect.width)), Math.max(1, Math.floor(rect.height)));
      },
      placeAt(type, color, x, y, extra) {
        press = null;
        return addItem(type, color, x, y, extra);
      },
      setTreeStyle(style, options) {
        if (!TREE_LOOK[style]) return false;
        treeStyle = style;
        if (!options || !options.silent) emit();
        return true;
      },
      setTwinkle(modeName, options) {
        if (!["steady", "soft", "chase", "spark", "random"].includes(modeName)) return false;
        twinkleMode = modeName;
        if (!options || !options.silent) emit();
        return true;
      },
      getTreeStyle() {
        return treeStyle;
      },
      getTwinkle() {
        return twinkleMode;
      },
      setSelectedGlow(modeName) {
        const item = selectedItem();
        if (!item || mode !== "edit" || (item.type !== "light" && item.type !== "strand")) return false;
        if (modeName !== "inherit" && !GLOW_MODES.includes(modeName)) return false;
        pushUndo();
        item.glow = modeName === "inherit" ? null : modeName;
        emit();
        emitSelection();
        return true;
      },
      photoCount() {
        return items.filter((item) => item.type === "photo").length;
      },
      canPlace(type, x, y) {
        return type !== "strand" || pointInTree(x, y);
      },
    };

    new p5((p) => {
      renderer = p;

      function makeThumb(entry) {
        const graphic = p.createGraphics(160, 150);
        graphic.pixelDensity(2);
        graphic.clear();
        graphic.push();
        graphic.translate(80, 78);
        graphic.scale(1.15);
        DRAW[entry.type](graphic, entry.color);
        graphic.pop();
        const url = graphic.elt.toDataURL("image/png");
        graphic.remove();
        return url;
      }

      p.setup = function setup() {
        const rect = host.getBoundingClientRect();
        p.pixelDensity(Math.min(2, window.devicePixelRatio || 1));
        p.colorMode(p.RGB, 255);
        const canvas = p.createCanvas(Math.max(1, Math.floor(rect.width)), Math.max(1, Math.floor(rect.height)));
        canvas.parent(host);
        ready = true;
        const thumbs = CATALOG.map((entry) => makeThumb(entry));
        if (notify.onReady) notify.onReady(thumbs);
      };

      p.draw = function draw() {
        drawSky(p);
        drawStars(p);
        drawMoon(p);
        drawTree(p);
        items.forEach((item) => {
          if (item.type === "strand") drawStrandWrap(p, item, 255);
        });
        drawSnow(p, 0);
        items.forEach((item) => {
          if (item.type !== "strand") drawPlaced(p, item, 255);
        });
        drawSnow(p, 1);
        if (ghost && ghost.type === "strand" && pointInTree(ghost.x, ghost.y)) {
          drawStrandWrap(p, { ...ghost, x: 0.5, scale: ghost.scale || 1 }, 170);
        } else if (ghost && ghost.type !== "strand" && (ghost.type === "photo" || DRAW[ghost.type])) {
          drawPlaced(p, { ...ghost, rot: 0, scale: ghost.scale || 1, born: 0 }, 170);
        }
        drawSelection(p);
        drawRemoveMarks(p);
      };

      let lastTouch = 0;
      const mouseAfterTouch = () => performance.now() - lastTouch < 800;

      p.mousePressed = function mousePressed() {
        if (mouseAfterTouch()) return;
        if (p.mouseX < 0 || p.mouseY < 0 || p.mouseX > p.width || p.mouseY > p.height) return;
        pointerDown(p.mouseX, p.mouseY);
      };
      p.mouseDragged = function mouseDragged() {
        if (mouseAfterTouch()) return;
        pointerMove(p.mouseX, p.mouseY);
      };
      p.mouseReleased = function mouseReleased() {
        if (mouseAfterTouch()) return;
        pointerUp();
      };
      p.touchStarted = function touchStarted() {
        lastTouch = performance.now();
        if (p.mouseX < 0 || p.mouseY < 0 || p.mouseX > p.width || p.mouseY > p.height) return true;
        pointerDown(p.mouseX, p.mouseY);
        return !drag;
      };
      p.touchMoved = function touchMoved() {
        lastTouch = performance.now();
        if (!drag) return true;
        pointerMove(p.mouseX, p.mouseY);
        return false;
      };
      p.touchEnded = function touchEnded() {
        lastTouch = performance.now();
        if (p.touches.length === 0) pointerUp();
        return true;
      };
    }, host);

    return api;
  };
})();
