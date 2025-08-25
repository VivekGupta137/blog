"use client";
import { useGesture } from "@use-gesture/react";
import * as React from "react";
import PlantUML from "react-plantuml";
import { useState, useRef, useEffect } from "react";

const GesturePlantUML = ({ src, alt }: { src: string; alt: string }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [showHelp, setShowHelp] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPositionRef = useRef({ x: 0, y: 0 });

    // Hide the help message after 5 seconds
    useEffect(() => {
        if (showHelp) {
            const timer = setTimeout(() => {
                setShowHelp(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showHelp]);

    // Use the useGesture hook to handle multiple gestures
    useGesture(
        {
            // Handle dragging (panning) the image
            onDrag: ({
                movement: [mx, my],
                offset: [dx, dy],
                first,
                last,
                event,
            }) => {
                if (first) {
                    // When starting a new drag, remember the current position
                    lastPositionRef.current = position;
                    setIsDragging(true);
                    setShowHelp(false);
                }

                // For mouse events, use movement which works better for desktop
                // For touch events, use offset which works better for mobile
                const isTouchEvent = event && "touches" in event;
                let newX, newY;

                if (isTouchEvent) {
                    // Mobile touch events - use offset from the gesture
                    newX = lastPositionRef.current.x + dx;
                    newY = lastPositionRef.current.y + dy;
                } else {
                    // Mouse events - use movement which is more reliable for mouse
                    newX = lastPositionRef.current.x + mx;
                    newY = lastPositionRef.current.y + my;
                }

                console.log("Dragging:", { x: newX, y: newY, isTouchEvent });

                setPosition({
                    x: newX,
                    y: newY,
                });
                console.log(last);

                // if (last) {
                //     // When drag ends, update the reference for next time
                //     lastPositionRef.current = { x: newX, y: newY };
                //     setIsDragging(false);
                // }
            },
            // // Handle pinch/wheel for zooming
            onPinch: ({ offset: [s], event }) => {
                event?.preventDefault();
                setScale(Math.max(0.5, Math.min(4, s)));
                setShowHelp(false);
            },
            onWheel: ({ delta: [, dy], event }) => {
                if (event) {
                    event.preventDefault();
                    // Use a more responsive zoom factor for mouse wheel
                    const zoomFactor = event.ctrlKey ? 0.05 : 0.005; // Faster zoom with Ctrl key
                    setScale((prev) =>
                        Math.max(0.5, Math.min(4, prev - dy * zoomFactor))
                    );
                    setShowHelp(false);
                }
            },
        },
        {
            target: containerRef,
            eventOptions: { passive: false },
            drag: {
                filterTaps: true, // Filter out tap gestures
                rubberband: true, // Add resistance at edges
                pointer: { mouse: true, touch: true }, // Ensure mouse, touch, and capture events are both handled
                // Don't use from: () => [0, 0] as it resets the drag each time
            },
        }
    );

    return (
        <div
            ref={containerRef}
            className={`gesture-plant-uml relative overflow-hidden ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{
                width: "100%",
                height: "auto",
                minHeight: "300px",
                userSelect: "none", // Prevent text selection during drag
            }}
        >
            <div
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transformOrigin: "center center",
                    transition: isDragging ? "none" : "transform 0.1s ease-out",
                    width: "fit-content",
                    margin: "0 auto",
                }}
            >
                <PlantUML src={src} alt={alt} />
            </div>
            {/* Controls */}
            <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                <button
                    onClick={() => {
                        setIsDragging(false);
                        setPosition({ x: 0, y: 0 });
                        lastPositionRef.current = { x: 0, y: 0 };
                        setScale(1);
                    }}
                    className="bg-black/50 hover:bg-black/70 text-white text-xs px-2 py-1 rounded-md"
                >
                    Reset
                </button>
                <div className="bg-black/50 text-white text-xs px-2 py-1 rounded-md">
                    {Math.round(scale * 100)}%
                </div>
            </div>

            {/* Help instructions */}
            {showHelp && (
                <div className="absolute top-0 left-0 right-0 bg-black/50 text-white text-sm p-2 text-center">
                    Drag to pan • Scroll or pinch to zoom
                </div>
            )}
        </div>
    );
};

export default GesturePlantUML;
