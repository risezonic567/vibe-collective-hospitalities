"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { VineFlower } from "@/components/ui/VineFlower";

const JOURNEY_VINE = {
    desktopWave: 13,
    mobileWave: 5,
    coreWidth: 1.35,
    glowWidth: 4.5,
    flowerDuration: 800,
    desktopFlowerScale: 1.15,
    mobileFlowerScale: 0.82,
    revealViewport: 0.72,
    coreColor: "#b8975a",
    glowColor: "#cca96a",
};

function makeJourneyPath(points, isMobile) {
    if (!points.length) return "";
    return points.slice(1).reduce((path, point, index) => {
        const previous = points[index];
        const offset = isMobile ? JOURNEY_VINE.mobileWave : JOURNEY_VINE.desktopWave;
        const direction = index % 2 === 0 ? 1 : -1;
        const distance = point.y - previous.y;
        return `${path} C ${previous.x + offset * direction} ${previous.y + distance / 3}, ${point.x - offset * direction} ${point.y - distance / 3}, ${point.x} ${point.y}`;
    }, `M ${points[0].x} ${points[0].y}`);
}

export function JourneyVine({ containerRef, onFlowersOpen }) {
    const coreRef = useRef(null);
    const glowRef = useRef(null);
    const frameRef = useRef(0);
    const measureFrameRef = useRef(0);
    const reportedFlowersRef = useRef(new Set());
    const [geometry, setGeometry] = useState(null);
    const [openedFlowers, setOpenedFlowers] = useState(() => new Set());

    const measure = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const markers = [...container.querySelectorAll("[data-timeline-marker]")];
        const points = markers.map((marker, index) => {
            const markerRect = marker.getBoundingClientRect();
            return {
                id: marker.dataset.timelineMarker,
                index,
                x: markerRect.left + markerRect.width / 2 - rect.left,
                y: markerRect.top + markerRect.height / 2 - rect.top,
            };
        });
        const first = points[0];
        const last = points[points.length - 1];

        setGeometry({
            width: container.clientWidth,
            height: container.clientHeight,
            top: rect.top + window.scrollY,
            isMobile,
            reducedMotion,
            points,
            path: makeJourneyPath(points, isMobile),
            startY: first?.y ?? 0,
            endY: last?.y ?? 0,
        });
    }, [containerRef]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return undefined;

        measure();
        const scheduleMeasure = () => {
            cancelAnimationFrame(measureFrameRef.current);
            measureFrameRef.current = requestAnimationFrame(measure);
        };
        const observer = new ResizeObserver(scheduleMeasure);
        observer.observe(container);
        container.querySelectorAll("[data-timeline-step], [data-timeline-marker]").forEach((element) => observer.observe(element));
        window.addEventListener("resize", scheduleMeasure, { passive: true });

        return () => {
            cancelAnimationFrame(measureFrameRef.current);
            observer.disconnect();
            window.removeEventListener("resize", scheduleMeasure);
        };
    }, [containerRef, measure]);

    useEffect(() => {
        if (!geometry) return undefined;

        const updateScroll = () => {
            frameRef.current = 0;
            const viewportBottom = window.scrollY + window.innerHeight * JOURNEY_VINE.revealViewport;
            const start = geometry.top + geometry.startY;
            const end = geometry.top + geometry.endY;
            const progress = geometry.reducedMotion || end <= start
                ? 1
                : Math.max(0, Math.min(1, (viewportBottom - start) / (end - start)));

            if (coreRef.current) coreRef.current.style.strokeDashoffset = String(1 - progress);
            if (glowRef.current) glowRef.current.style.strokeDashoffset = String(1 - progress);

            const newlyOpened = geometry.points.filter((point) =>
                !reportedFlowersRef.current.has(point.id) &&
                (geometry.reducedMotion || geometry.top + point.y <= viewportBottom)
            );
            if (newlyOpened.length) {
                newlyOpened.forEach((point) => reportedFlowersRef.current.add(point.id));
                onFlowersOpen?.(newlyOpened.map((point) => point.id));
                setOpenedFlowers((current) => {
                    if (newlyOpened.every((point) => current.has(point.id))) return current;
                    const next = new Set(current);
                    newlyOpened.forEach((point) => next.add(point.id));
                    return next;
                });
            }
        };

        const scheduleScroll = () => {
            if (!frameRef.current) frameRef.current = requestAnimationFrame(updateScroll);
        };

        updateScroll();
        window.addEventListener("scroll", scheduleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", scheduleScroll);
            cancelAnimationFrame(frameRef.current);
        };
    }, [containerRef, geometry, onFlowersOpen]);

    if (!geometry || !geometry.path) return null;

    return (
        <div
            className="journey-vine-layer"
            style={{ "--vine-flower-duration": `${JOURNEY_VINE.flowerDuration}ms` }}
            aria-hidden="true"
        >
            <svg
                className="journey-vine-svg"
                width={geometry.width}
                height={geometry.height}
                viewBox={`0 0 ${geometry.width} ${geometry.height}`}
                preserveAspectRatio="none"
            >
                <path ref={glowRef} className="vine-glow" d={geometry.path} pathLength="1" style={{ stroke: JOURNEY_VINE.glowColor, strokeWidth: JOURNEY_VINE.glowWidth }} />
                <path ref={coreRef} className="vine-core" d={geometry.path} pathLength="1" style={{ stroke: JOURNEY_VINE.coreColor, strokeWidth: JOURNEY_VINE.coreWidth }} />
                {geometry.points.map((point) => (
                    <VineFlower
                        key={point.id}
                        x={point.x}
                        y={point.y}
                        scale={geometry.isMobile ? JOURNEY_VINE.mobileFlowerScale : JOURNEY_VINE.desktopFlowerScale}
                        flowerX={0}
                        flowerY={0}
                        branchX={point.index % 2 === 0 ? -10 : 10}
                        opened={openedFlowers.has(point.id)}
                    />
                ))}
            </svg>
        </div>
    );
}
