import { useEffect, useRef } from 'react';

type HerbariumCanvasProps = { className?: string };

export function HerbariumCanvas({ className = '' }: HerbariumCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const source = document.createElement('canvas');
    const sourceCtx = source.getContext('2d', { willReadFrequently: true });
    if (!sourceCtx) return;
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = '/ascii-editor/demos/generated/ref-045.webp';

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let imageReady = false;
    let lastFrame = 0;
    const cellSize = 13;
    const tint = { r: 216, g: 180, b: 106 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      source.width = Math.max(1, Math.ceil(width / cellSize));
      source.height = Math.max(1, Math.ceil(height / cellSize));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      if (now - lastFrame < 32) { raf = requestAnimationFrame(draw); return; }
      lastFrame = now;
      if (!width || !height) { raf = requestAnimationFrame(draw); return; }

      // Soft blurred photo/ambient backdrop.
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.filter = 'blur(12px) saturate(.8) brightness(.65)';
      if (imageReady) {
        const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
        const iw = image.naturalWidth * scale;
        const ih = image.naturalHeight * scale;
        ctx.drawImage(image, (width - iw) / 2, (height - ih) / 2, iw, ih);
      } else {
        const bg = ctx.createLinearGradient(0, 0, width * .8, height);
        bg.addColorStop(0, '#392b43');
        bg.addColorStop(.48, '#201827');
        bg.addColorStop(1, '#11131e');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);
      }
      ctx.restore();

      // Sample the image at cell resolution; use an ambient palette if the demo photo is unavailable.
      sourceCtx.clearRect(0, 0, source.width, source.height);
      if (imageReady) {
        const scale = Math.max(source.width / image.naturalWidth, source.height / image.naturalHeight);
        const iw = image.naturalWidth * scale;
        const ih = image.naturalHeight * scale;
        sourceCtx.drawImage(image, (source.width - iw) / 2, (source.height - ih) / 2, iw, ih);
      } else {
        const grad = sourceCtx.createLinearGradient(0, 0, source.width, source.height);
        grad.addColorStop(0, '#b7a0bb');
        grad.addColorStop(.5, '#54455f');
        grad.addColorStop(1, '#171a2b');
        sourceCtx.fillStyle = grad;
        sourceCtx.fillRect(0, 0, source.width, source.height);
        for (let i = 0; i < 180; i++) {
          const x = (i * 47) % source.width;
          const y = (i * 31) % source.height;
          sourceCtx.fillStyle = i % 3 ? 'rgba(255,238,208,.6)' : 'rgba(185,158,205,.45)';
          sourceCtx.fillRect(x, y, 1, 1);
        }
      }

      const sw = source.width;
      const sh = source.height;
      const pixels = sourceCtx.getImageData(0, 0, sw, sh).data;
      const t = now * .00022;
      ctx.save();
      ctx.globalAlpha = .92;
      ctx.globalCompositeOperation = 'screen';
      for (let gy = 0; gy < sh; gy++) {
        for (let gx = 0; gx < sw; gx++) {
          const i = (gy * sw + gx) * 4;
          const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
          let lum = (r * .2126 + g * .7152 + b * .0722) / 255;
          lum = Math.max(0, Math.min(1, (lum - .5) * 1.15 + .5));
          if (lum < .12) continue;
          const wave = Math.sin(gx * .11 + gy * .08 - t * 3) * .65 + Math.sin(gy * .17 + t * 2) * .35;
          const shift = wave * 1.5;
          const radius = Math.max(.6, (lum * 2.5) * (1 + wave * .13));
          const x = gx * cellSize + cellSize / 2 + shift;
          const y = gy * cellSize + cellSize / 2 + Math.sin(gx * .1 + t) * .8;
          const mix = .38;
          const cr = Math.round(r * (1 - mix) + tint.r * mix);
          const cg = Math.round(g * (1 - mix) + tint.g * mix);
          const cb = Math.round(b * (1 - mix) + tint.b * mix);
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${.18 + lum * .62})`;
          ctx.beginPath();
          // Dithered stipple with tiny diamonds for the Herbarium-like raster texture.
          ctx.moveTo(x, y - radius);
          ctx.lineTo(x + radius, y);
          ctx.lineTo(x, y + radius);
          ctx.lineTo(x - radius, y);
          ctx.closePath();
          ctx.fill();
          if (lum > .72 && (gx + gy) % 5 === 0) {
            ctx.fillStyle = 'rgba(255,226,169,.42)';
            ctx.fillRect(x - .45, y - .45, .9, .9);
          }
        }
      }
      ctx.restore();

      // Warm tint, subtle bloom, and vignette.
      const bloom = ctx.createRadialGradient(width * .5, height * .36, 0, width * .5, height * .36, Math.max(width, height) * .7);
      bloom.addColorStop(0, 'rgba(216,180,106,.11)');
      bloom.addColorStop(1, 'rgba(216,180,106,0)');
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, width, height);
      const vignette = ctx.createRadialGradient(width * .5, height * .43, Math.min(width, height) * .12, width * .5, height * .5, Math.max(width, height) * .72);
      vignette.addColorStop(0, 'rgba(12,10,18,0)');
      vignette.addColorStop(1, 'rgba(12,10,18,.68)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
      raf = requestAnimationFrame(draw);
    };

    image.onload = () => { imageReady = true; };
    image.onerror = () => { imageReady = false; };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className={`herbarium-canvas ${className}`} aria-hidden="true" />;
}
