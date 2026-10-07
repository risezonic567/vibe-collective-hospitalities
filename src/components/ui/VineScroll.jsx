"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { VINE_CENTER_ROUTES } from "@/config/vine";
import { VineFlower } from "@/components/ui/VineFlower";

const VINE = {
    desktopInset: 40,
    mobileInset: 13,
    desktopWave: 24,
    mobileWave: 9,
    waveLength: 620,
    segmentLength: 180,
    coreWidth: 1.35,
    glowWidth: 4.5,
    flowerSize: 1,
    mobileFlowerSize: 0.72,
    flowerDuration: 800,
    flowerTriggerViewport: 0.72,
    mobileFlowerEvery: 2,
    coreColor: "#b8975a",
    glowColor: "#cca96a",
    petalColor: "#cca96a",
    petalAltColor: "#b8975a",
};

function getVineX(y, width, isMobile) {
    const inset = isMobile ? VINE.mobileInset : VINE.desktopInset;
    const wave = isMobile ? VINE.mobileWave : VINE.desktopWave;
    return Math.max(6, width - inset + Math.sin((y / VINE.waveLength) * Math.PI * 2) * wave);
}

function makeVinePath(width, height, isMobile) {
    const points = [];
    for (let y = 0; y < height; y += VINE.segmentLength) {
        points.push({ x: getVineX(y, width, isMobile), y });
    }
    points.push({ x: getVineX(height, width, isMobile), y: height });

    return points.slice(1).reduce((path, point, index) => {
        const previous = points[index];
        const span = point.y - previous.y;
        return `${path} C ${previous.x} ${previous.y + span * 0.42}, ${point.x} ${point.y - span * 0.42}, ${point.x} ${point.y}`;
    }, `M ${points[0].x} ${points[0].y}`);
}

function VineScrollGraphic({ pathname }) {
    const layerRef = useRef(null);
    const coreRef = useRef(null);
    const glowRef = useRef(null);
    const measureFrameRef = useRef(0);
    const scrollFrameRef = useRef(0);
    const [geometry, setGeometry] = useState(null);
    const [openedFlowers, setOpenedFlowers] = useState(() => new Set());

    const measure = useCallback(() => {
        const width = document.documentElement.clientWidth;
        const height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        const isMobile = width < 768;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const sections = [...document.querySelectorAll("main section")];
        const flowers = sections
            .map((section, index) => {
                const rect = section.getBoundingClientRect();
                const y = Math.max(0, Math.min(height, rect.top + window.scrollY + Math.min(96, rect.height * 0.18)));
                return { id: `${index}-${section.id || "section"}`, x: getVineX(y, width, isMobile), y, index };
            })
            .filter((flower) => !isMobile || flower.index % VINE.mobileFlowerEvery === 0);

        setGeometry({ width, height, isMobile, reducedMotion, path: makeVinePath(width, height, isMobile), flowers });
    }, []);

    useEffect(() => {
        measure();

        const scheduleMeasure = () => {
            cancelAnimationFrame(measureFrameRef.current);
            measureFrameRef.current = requestAnimationFrame(measure);
        };
        const resizeObserver = new ResizeObserver(scheduleMeasure);
        resizeObserver.observe(document.body);
        document.querySelectorAll("main section").forEach((section) => resizeObserver.observe(section));
        window.addEventListener("resize", scheduleMeasure, { passive: true });

        return () => {
            cancelAnimationFrame(measureFrameRef.current);
            resizeObserver.disconnect();
            window.removeEventListener("resize", scheduleMeasure);
        };
    }, [measure, pathname]);

    useEffect(() => {
        if (!geometry) return undefined;

        const updateScroll = () => {
            scrollFrameRef.current = 0;
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const progress = geometry.reducedMotion ? 1 : Math.min(1, Math.max(0, (scrollY + viewportHeight * 0.78) / geometry.height));

            if (layerRef.current) layerRef.current.style.transform = `translate3d(0, ${-scrollY}px, 0)`;
            if (coreRef.current) coreRef.current.style.strokeDashoffset = String(1 - progress);
            if (glowRef.current) glowRef.current.style.strokeDashoffset = String(1 - progress);

            const newlyOpened = geometry.flowers.filter((flower) => geometry.reducedMotion || flower.y <= scrollY + viewportHeight * VINE.flowerTriggerViewport);
            if (newlyOpened.length) {
                setOpenedFlowers((current) => {
                    if (newlyOpened.every((flower) => current.has(flower.id))) return current;
                    const next = new Set(current);
                    newlyOpened.forEach((flower) => next.add(flower.id));
                    return next;
                });
            }
        };

        const scheduleScroll = () => {
            if (!scrollFrameRef.current) scrollFrameRef.current = requestAnimationFrame(updateScroll);
        };

        updateScroll();
        window.addEventListener("scroll", scheduleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", scheduleScroll);
            cancelAnimationFrame(scrollFrameRef.current);
        };
    }, [geometry]);

    if (!geometry) return null;

    return (
        <div
            ref={layerRef}
            className="vine-scroll-layer"
            style={{
                height: `${geometry.height}px`,
                "--vine-height": `${geometry.height}px`,
                "--vine-flower-duration": `${VINE.flowerDuration}ms`,
            }}
            aria-hidden="true"
        >
            <svg
                className="vine-scroll-svg"
                width="100%"
                height={geometry.height}
                viewBox={`0 0 ${geometry.width} ${geometry.height}`}
                preserveAspectRatio="none"
            >
                <path ref={glowRef} className="vine-glow" d={geometry.path} pathLength="1" style={{ stroke: VINE.glowColor, strokeWidth: VINE.glowWidth }} />
                <path ref={coreRef} className="vine-core" d={geometry.path} pathLength="1" style={{ stroke: VINE.coreColor, strokeWidth: VINE.coreWidth }} />
                {geometry.flowers.map((flower) => (
                    <VineFlower
                        key={flower.id}
                        {...flower}
                        scale={geometry.isMobile ? VINE.mobileFlowerSize : VINE.flowerSize}
                        opened={openedFlowers.has(flower.id)}
                    />
                ))}
            </svg>
        </div>
    );
}

export function VineScroll() {
    const pathname = usePathname();
    if (VINE_CENTER_ROUTES.includes(pathname)) return null;
    return <VineScrollGraphic pathname={pathname} />;
}
