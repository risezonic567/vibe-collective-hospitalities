"use client";
import { useEffect, useState } from "react";

export function useScrolled(threshold = 60) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            if (frame) return;
            frame = window.requestAnimationFrame(() => {
                setScrolled(window.scrollY > threshold);
                frame = 0;
            });
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
        return () => {
            window.removeEventListener("scroll", update);
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, [threshold]);

    return scrolled;
}
