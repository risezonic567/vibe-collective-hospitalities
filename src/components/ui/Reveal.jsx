"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ANIMATION_EASE, MOTION_DURATION, REVEAL_DISTANCE, STAGGER_DELAY } from "./motionConfig";
export function Reveal({ children, className = "", delay = 0, duration = MOTION_DURATION, yOffset = REVEAL_DISTANCE, staggerChildren, once = true, }) {
    const shouldReduceMotion = useReducedMotion();
    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }
    const variants = {
        hidden: {
            opacity: 0,
            y: yOffset,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration,
                delay,
                ease: ANIMATION_EASE,
                when: staggerChildren ? "beforeChildren" : undefined,
                staggerChildren: staggerChildren || undefined,
            },
        },
    };
    return (<motion.div initial="hidden" whileInView="visible" viewport={{ once, margin: "-40px" }} variants={variants} className={className}>
      {children}
    </motion.div>);
}
export function RevealItem({ children, className = "", delay = 0, duration = MOTION_DURATION, yOffset = REVEAL_DISTANCE - 4 }) {
    const shouldReduceMotion = useReducedMotion();
    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }
    const itemVariants = {
        hidden: { opacity: 0, y: yOffset },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration, delay, ease: ANIMATION_EASE },
        },
    };
    return (<motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>);
}

export function RevealStagger({ children, className = "", delay = 0, staggerChildren = STAGGER_DELAY, duration = MOTION_DURATION, yOffset = REVEAL_DISTANCE }) {
    return <Reveal className={className} delay={delay} duration={duration} yOffset={yOffset} staggerChildren={staggerChildren}>{children}</Reveal>;
}
