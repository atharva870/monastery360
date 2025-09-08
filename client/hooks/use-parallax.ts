import { useEffect } from "react";

export function useParallax(el: React.RefObject<HTMLElement | null>, speed = 0.2) {
  useEffect(() => {
    const node = el.current as HTMLElement | null;
    if (!node) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY * speed;
        node.style.transform = `translateY(${y}px)`;
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [el, speed]);
}
