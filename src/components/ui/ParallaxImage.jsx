"use client";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PARALLAX_DISTANCE } from "./motionConfig";

export function ParallaxImage({ src, alt, className = "", sizes = "100vw", priority = true }) {
    const ref = useRef(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : -PARALLAX_DISTANCE, reduceMotion ? 0 : PARALLAX_DISTANCE]);

    return (
        <motion.div ref={ref} className="parallax-image" style={{ y }} aria-hidden="true">
            <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={className} />
        </motion.div>
    );
}
