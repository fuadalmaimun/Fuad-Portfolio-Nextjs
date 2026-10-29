"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const DELETE_SPEED = 16; // ms per character while deleting
const EMPTY_PAUSE = 350; // ms between deleting a line and typing the next
const START_DELAY = 450; // ms before the first line starts

const Typewriter = ({ lines, className = "" }) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [cursor, setCursor] = useState({ lineIndex: 0, chars: 0 });
  const timerRef = useRef(null);

  const texts = useMemo(
    () => lines.map((line) => line.segments.map((segment) => segment.text).join("")),
    [lines]
  );

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(motionMq.matches);
    sync();
    motionMq.addEventListener("change", sync);
    return () => motionMq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setCursor({ lineIndex: 0, chars: texts[0]?.length ?? 0 });
      return undefined;
    }

    let cancelled = false;
    const sleep = (ms) =>
      new Promise((resolve) => {
        timerRef.current = setTimeout(resolve, ms);
      });

    const run = async () => {
      await sleep(START_DELAY);
      while (!cancelled) {
        for (let i = 0; i < lines.length && !cancelled; i++) {
          const text = texts[i];
          const typeSpeed = lines[i].typeSpeed ?? 55;
          const pause = lines[i].pause ?? 1600;

          // Type the line in.
          for (let chars = 1; chars <= text.length && !cancelled; chars++) {
            setCursor({ lineIndex: i, chars });
            await sleep(typeSpeed);
          }

          // Hold the finished line.
          await sleep(pause);

          // Delete it back out.
          for (let chars = text.length - 1; chars >= 0 && !cancelled; chars--) {
            setCursor({ lineIndex: i, chars });
            await sleep(DELETE_SPEED);
          }

          await sleep(EMPTY_PAUSE);
        }
      }
    };

    run();

    return () => {
      cancelled = true;
      clearTimeout(timerRef.current);
    };
  }, [lines, texts, reducedMotion]);

  const line = lines[cursor.lineIndex] ?? lines[0];
  const Tag = line.tag ?? "p";

  // Reveal segments left-to-right up to the character budget.
  let budget = cursor.chars;
  const revealed = line.segments.map((segment, index) => {
    const visible = segment.text.slice(0, Math.max(0, Math.min(segment.text.length, budget)));
    budget -= segment.text.length;
    return visible ? (
      <span key={index} className={segment.className}>
        {visible}
      </span>
    ) : null;
  });

  return (
    <div className={`relative ${className}`}>
      {/* Static, screen-reader friendly text (the animation is visual only). */}
      <span className="sr-only">Hi, I&apos;m Fuad Al Maimun — Full Stack Developer</span>

      <Tag className={line.className} aria-hidden="true">
        {revealed}
        <span className="hero-cursor ml-1 inline-block h-[0.85em] w-0.5 bg-fuchsia-400 align-middle motion-reduce:animate-none" />
      </Tag>
    </div>
  );
};

export default Typewriter;
