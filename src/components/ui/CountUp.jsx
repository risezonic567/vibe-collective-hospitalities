"use client";
import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
export function CountUp({ end, suffix = "", duration = 2000 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    useEffect(() => {
        if (!isInView)
            return;
        const startTime = performance.now();
        const update = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = Math.floor(ease * end);
            setCount(current);
            if (progress < 1) {
                requestAnimationFrame(update);
            }
            else {
                setCount(end);
            }
        };
        requestAnimationFrame(update);
    }, [isInView, end, duration]);
    return (<span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>);
}
