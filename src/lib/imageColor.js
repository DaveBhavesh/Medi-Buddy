// Picks a background colour from a photo: the average of its more colourful pixels, then set to
// a fixed darkish lightness so white text on top always stays readable. Results are cached.
const cache = new Map();

export function getImageColor(src) {
  if (!src) return Promise.resolve(null);
  if (!cache.has(src)) {
    cache.set(
      src,
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          try {
            const size = 32;
            const canvas = document.createElement("canvas");
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            ctx.drawImage(img, 0, 0, size, size);
            const { data } = ctx.getImageData(0, 0, size, size);
            let r = 0;
            let g = 0;
            let b = 0;
            let total = 0;
            for (let i = 0; i < data.length; i += 4) {
              const max = Math.max(data[i], data[i + 1], data[i + 2]);
              const min = Math.min(data[i], data[i + 1], data[i + 2]);
              // Weight colourful pixels more, so a grey background doesn't wash out the result.
              const weight = 1 + ((max - min) / 255) * 6;
              r += data[i] * weight;
              g += data[i + 1] * weight;
              b += data[i + 2] * weight;
              total += weight;
            }
            resolve(toBackground(r / total, g / total, b / total));
          } catch {
            resolve(null);
          }
        };
        img.onerror = () => resolve(null);
        img.src = src;
      }),
    );
  }
  return cache.get(src);
}

function toBackground(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
  }
  h = Math.round((h * 60 + 360) % 360);
  const l = (max + min) / 2;
  const s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
  // Keep some colour even for near-grey photos, but never neon; lightness fixed for text contrast.
  const sat = Math.round(Math.min(Math.max(s, 0.3), 0.55) * 100);
  return `hsl(${h} ${sat}% 34%)`;
}
