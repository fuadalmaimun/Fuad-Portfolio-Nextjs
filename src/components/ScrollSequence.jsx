"use client";
import { useEffect, useRef, useState } from "react";

const BATCH_SIZE = 6; // parallel frame downloads
const MAX_DPR = 2; // cap canvas density for perf
const SMALL_QUERY = "(max-width: 767px)";

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const frameName = (index) => `frame_${String(index + 1).padStart(4, "0")}.webp`;

const ScrollSequence = ({
  basePath,
  count,
  pinMode = "wrapper",
  scrollLength = "300vh",
  id,
  className = "",
  wrapperClassName = "",
  overlayClassName = "",
  canvasFilter,
  onProgress,
  children,
}) => {
  const measureRef = useRef(null); // element whose rect drives progress
  const stageRef = useRef(null); // the (possibly) pinned viewport-height stage
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentIndexRef = useRef(0);
  const drawnIndexRef = useRef(-1);
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  const [isSmall, setIsSmall] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Background mode always pins the stage to the viewport so the canvas stays
  // screen-sized, even on mobile where the wrapper mode scrubs unpinned.
  const isBackground = pinMode === "background";
  const pinned = isBackground ? true : !isSmall && !reducedMotion;

  /* ---------------- drawing ---------------- */

  const draw = (index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // cover-fit, centered
    const { width: cw, height: ch } = canvas;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    drawnIndexRef.current = index;
  };

  // Draw `index`, falling back to the closest frame that has loaded so far.
  const drawNearest = (index) => {
    if (imagesRef.current[index]) {
      draw(index);
      return;
    }
    for (let delta = 1; delta < count; delta++) {
      const below = index - delta;
      const above = index + delta;
      if (below >= 0 && imagesRef.current[below]) {
        draw(below);
        return;
      }
      if (above < count && imagesRef.current[above]) {
        draw(above);
        return;
      }
    }
  };

  /* ---------------- viewport queries ---------------- */

  useEffect(() => {
    const smallMq = window.matchMedia(SMALL_QUERY);
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setIsSmall(smallMq.matches);
      setReducedMotion(reducedMq.matches);
    };
    sync();
    smallMq.addEventListener("change", sync);
    reducedMq.addEventListener("change", sync);
    return () => {
      smallMq.removeEventListener("change", sync);
      reducedMq.removeEventListener("change", sync);
    };
  }, []);

  /* ---------------- canvas sizing ---------------- */

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const rect = stage.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      drawnIndexRef.current = -1;
      drawNearest(currentIndexRef.current);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------- frame preloading ---------------- */

  useEffect(() => {
    let cancelled = false;
    imagesRef.current = new Array(count);
    drawnIndexRef.current = -1;

    const srcFor = (index) => `${basePath}${isSmall ? "-sm" : ""}/${frameName(index)}`;

    const load = (index) =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        const settle = () => {
          if (!cancelled) {
            imagesRef.current[index] = img;
            // Paint the frame the user is currently looking at as soon as it lands.
            if (index === currentIndexRef.current || drawnIndexRef.current === -1) {
              drawNearest(currentIndexRef.current);
            }
          }
          resolve();
        };
        img.onload = settle;
        img.onerror = settle;
        img.src = srcFor(index);
      });

    // Sequential batches keep scrubbing smooth: earlier frames arrive first.
    (async () => {
      for (let start = 0; start < count && !cancelled; start += BATCH_SIZE) {
        const batch = [];
        for (let i = start; i < Math.min(start + BATCH_SIZE, count); i++) {
          batch.push(load(i));
        }
        await Promise.all(batch);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [basePath, count, isSmall]);

  /* ---------------- scroll → frame index ---------------- */

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const el = measureRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;

      let progress;
      if (reducedMotion) {
        progress = 1;
      } else if (pinned) {
        // Scrub while the section is pinned: 0 when its top hits the viewport
        // top, 1 when its bottom reaches the viewport bottom.
        progress = clamp01(-rect.top / Math.max(1, rect.height - viewportH));
      } else {
        // Unpinned: scrub as the section traverses the viewport.
        progress = clamp01((viewportH - rect.top) / Math.max(1, rect.height + viewportH));
      }

      const index = Math.round(progress * (count - 1));
      currentIndexRef.current = index;
      if (drawnIndexRef.current !== index) drawNearest(index);
      onProgressRef.current?.(progress, index);
    };

    const requestUpdate = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [count, pinned, isSmall, reducedMotion]);

  /* ---------------- render ---------------- */

  const stage = (
    <div
      ref={stageRef}
      className={
        pinned
          ? `sticky top-0 h-screen w-full overflow-hidden ${className}`
          : `relative h-full w-full overflow-hidden ${className}`
      }
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        style={canvasFilter ? { filter: canvasFilter } : undefined}
      />
      {overlayClassName ? (
        <div aria-hidden="true" className={`absolute inset-0 ${overlayClassName}`} />
      ) : null}
      {children}
    </div>
  );

  if (pinMode === "background") {
    // Zero-layout-impact layer: absolutely covers the section, stage pins inside.
    return (
      <div ref={measureRef} className="pointer-events-none absolute inset-0">
        {stage}
      </div>
    );
  }

  // wrapper: own tall section, stage pinned for the whole scrub.
  return (
    <section
      id={id}
      ref={measureRef}
      className={`relative ${wrapperClassName}`}
      style={{ height: pinned ? scrollLength : "auto" }}
    >
      {stage}
    </section>
  );
};

export default ScrollSequence;
