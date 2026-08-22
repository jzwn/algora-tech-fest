import { useEffect, useRef, useState } from 'react';

/**
 * useInView — fires when element enters the viewport.
 * Returns [ref, isVisible]
 */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect(); // fire once
        }
      },
      { threshold: 0.12, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

/**
 * useCountUp — animates a number from 0 to target when triggered.
 */
export function useCountUp(target, duration = 1200, trigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    // handle non-numeric targets
    if (isNaN(Number(target))) {
      setCount(target);
      return;
    }
    const end = Number(target);
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [trigger, target, duration]);

  return count;
}
