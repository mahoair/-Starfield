// Starfield — p5.js
// Daniel Shiffman'ın Coding Challenge #1'inden uyarlanmıştır:
// https://youtu.be/17WoOqgXsRM

// Yıldız renk paleti: çoğu beyaz, bir kısmı mavimsi ya da sıcak tonlu.
const STAR_COLORS = [
  { weight: 0.7, rgb: [255, 255, 255] },
  { weight: 0.18, rgb: [170, 200, 255] },
  { weight: 0.12, rgb: [255, 220, 170] },
];

function pickStarColor() {
  let r = random();
  for (const c of STAR_COLORS) {
    if (r < c.weight) return c.rgb;
    r -= c.weight;
  }
  return STAR_COLORS[0].rgb;
}

class Star {
  constructor() {
    this.reset(random(1, depth));
  }

  reset(z) {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = z;
    this.pz = z;
    this.rgb = pickStarColor();
    this.phase = random(TWO_PI);
  }

  update(speed) {
    this.pz = this.z;
    this.z -= speed;

    // Yıldız kameranın arkasına geçti ya da ekrandan çıktıysa en uzağa geri gönder.
    const sx = this.project(this.x, this.z);
    const sy = this.project(this.y, this.z);
    if (this.z < 1 || abs(sx) > width / 2 + 50 || abs(sy) > height / 2 + 50) {
      this.reset(depth);
    }
  }

  project(v, z) {
    return (v / z) * depth;
  }

  show(speed, colored) {
    const sx = this.project(this.x, this.z);
    const sy = this.project(this.y, this.z);
    const px = this.project(this.x, this.pz);
    const py = this.project(this.y, this.pz);

    // 0 = en uzak, 1 = kameranın dibinde
    const near = constrain(1 - this.z / depth, 0, 1);

    // Uzaktaki yıldızlar sönük başlar, yaklaştıkça parlar (ani belirmeyi engeller).
    let alpha = 255 * pow(near, 0.6);
    // Yavaşken hafif bir parıldama.
    const calm = 1 - constrain(speed / MAX_SPEED, 0, 1);
    alpha *= 1 - 0.35 * calm * (0.5 + 0.5 * sin(frameCount * 0.05 + this.phase));

    let [r, g, b] = colored ? this.rgb : [255, 255, 255];
    // Yüksek hızda "hiper uzay" mavisine kay.
    const warp = constrain((speed - MAX_SPEED * 0.6) / (MAX_SPEED * 0.4), 0, 1);
    r = lerp(r, 150, warp);
    g = lerp(g, 200, warp);
    b = lerp(b, 255, warp);

    stroke(r, g, b, alpha);
    strokeWeight(0.5 + near * near * 3.5);

    if (dist(px, py, sx, sy) < 0.5) {
      point(sx, sy);
    } else {
      line(px, py, sx, sy);
    }
  }
}
