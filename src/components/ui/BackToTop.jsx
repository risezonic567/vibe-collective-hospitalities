"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrolled } from "./useScrolled";

export function BackToTop() {
    const visible = useScrolled(480);
    const reduceMotion = useReducedMotion();

    return (
        <motion.button
            type="button"
            className="back-to-top"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
            initial={false}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            style={{ pointerEvents: visible ? "auto" : "none" }}
            tabIndex={visible ? 0 : -1}
        >
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
        </motion.button>
    );
}
