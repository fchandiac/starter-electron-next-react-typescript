import React, { useState, useRef, useEffect } from "react";

interface RangeSliderProps {
    min?: number;
    max?: number;
    value?: [number, number];
    onChange?: (values: [number, number]) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min = 0, max = 100, value, onChange }) => {
    const [values, setValues] = useState<[number, number]>(value || [min, max]);
    const [dragging, setDragging] = useState<null | "min" | "max">(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value) setValues(value);
    }, [value]);

    useEffect(() => {
        const handleMouseUp = () => setDragging(null);
        window.addEventListener("mouseup", handleMouseUp);
        return () => window.removeEventListener("mouseup", handleMouseUp);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!dragging || !trackRef.current) return;
            const track = trackRef.current;
            const rect = track.getBoundingClientRect();
            const percent = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
            const newValue = Math.round(percent * (max - min) + min);
            if (dragging === "min") {
                const clamped = Math.min(newValue, values[1]);
                setValues([clamped, values[1]]);
                onChange?.([clamped, values[1]]);
            } else {
                const clamped = Math.max(newValue, values[0]);
                setValues([values[0], clamped]);
                onChange?.([values[0], clamped]);
            }
        };
        if (dragging) {
            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);
        }
    }, [dragging, min, max, values, onChange]);

    const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

    return (
        <div className="w-full">
            <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-foreground font-light">Rango</span>
            </div>
            <div className="relative w-full h-8 select-none" ref={trackRef}>
                {/* Track */}
                <div className="absolute w-full h-2 top-1/2 -translate-y-1/2 rounded-lg appearance-none bg-primary/30"></div>
                {/* Filled Range */}
                <div
                    className="absolute h-2 top-1/2 -translate-y-1/2 bg-primary rounded-lg appearance-none"
                    style={{ left: `${getPercent(values[0])}%`, width: `${getPercent(values[1]) - getPercent(values[0])}%` }}
                ></div>
                {/* Thumbs */}
                <button
                    type="button"
                    className="mt-3 absolute w-6 h-6 bg-primary rounded-full top-1/2 left-0 -translate-y-1/2 appearance-none cursor-pointer border-2 border-background focus:outline-none focus:ring-2 focus:ring-primary shadow"
                    style={{ left: `${getPercent(values[0])}%`, transform: "translate(-50%, -50%)" }}
                    onMouseDown={() => setDragging("min")}
                    aria-label="Min value"
                />
                <button
                    type="button"
                    className="mt-3 absolute w-6 h-6 bg-primary rounded-full top-1/2 left-0 -translate-y-1/2 appearance-none cursor-pointer border-2 border-background focus:outline-none focus:ring-2 focus:ring-primary shadow"
                    style={{ left: `${getPercent(values[1])}%`, transform: "translate(-50%, -50%)" }}
                    onMouseDown={() => setDragging("max")}
                    aria-label="Max value"
                />
            </div>
            <div className="flex w-full justify-between mt-2">
                <span className="text-xs text-foreground font-light">{values[0]}</span>
                <span className="text-xs text-foreground font-light">{values[1]}</span>
            </div>
        </div>
    );
};

export default RangeSlider;
