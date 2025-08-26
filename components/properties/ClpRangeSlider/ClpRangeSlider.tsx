import React, { useState, useRef, useEffect } from "react";
import Switch from "../../Switch";

interface RangeSliderProps {
    // ...existing code...
    min?: number;
    max?: number;
    value?: [number, number];
    onChange?: (values: [number, number]) => void;
}

const ClpRangeSlider: React.FC<RangeSliderProps> = ({ min = 0, max = 100, value, onChange }) => {
    const [enabled, setEnabled] = useState(true);
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
        <div className="w-full pr-4">
      
                <div className="flex items-center gap-1" >
                    <Switch checked={enabled} onChange={setEnabled} label="" />
                    <span className="text-xs text-foreground font-light">
                        Rango en Pesos ({values[0].toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })} - {values[1].toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })})
                    </span>
               
            </div>
            <div className="relative w-full h-8 select-none ml-2 mr-6" ref={trackRef}>
                {/* Track */}
                <div className={`absolute w-full h-2 top-1/2 -translate-y-1/2 rounded-lg appearance-none ${enabled ? 'bg-primary/30' : 'bg-gray-200'}`}></div>
                {/* Filled Range */}
                <div
                    className={`absolute h-2 top-1/2 -translate-y-1/2 rounded-lg appearance-none ${enabled ? 'bg-primary' : 'bg-gray-400'}`}
                    style={{ left: `${getPercent(values[0])}%`, width: `${getPercent(values[1]) - getPercent(values[0])}%` }}
                ></div>
                {/* Thumbs */}
                <button
                    type="button"
                    className={`mt-3 absolute w-6 h-6 rounded-full top-1/2 left-0 -translate-y-1/2 appearance-none border-2 focus:outline-none focus:ring-2 ${enabled ? 'bg-primary cursor-pointer border-background focus:ring-primary shadow' : 'bg-gray-300 border-gray-400 cursor-not-allowed'}`}
                    style={{ left: `${getPercent(values[0])}%`, transform: "translate(-50%, -50%)" }}
                    onMouseDown={enabled ? () => setDragging("min") : undefined}
                    aria-label="Min value"
                    disabled={!enabled}
                />
                <button
                    type="button"
                    className={`mt-3 absolute w-6 h-6 rounded-full top-1/2 left-0 -translate-y-1/2 appearance-none border-2 focus:outline-none focus:ring-2 ${enabled ? 'bg-primary cursor-pointer border-background focus:ring-primary shadow' : 'bg-gray-300 border-gray-400 cursor-not-allowed'}`}
                    style={{ left: `${getPercent(values[1])}%`, transform: "translate(-50%, -50%)" }}
                    onMouseDown={enabled ? () => setDragging("max") : undefined}
                    aria-label="Max value"
                    disabled={!enabled}
                />
            </div>
            <div className="flex w-full justify-between mt-2">
                <span className="text-xs text-foreground font-light">
                    {min.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                </span>
                <span className="text-xs text-foreground font-light">
                    {max.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                </span>
            </div>
        </div>
    );
};

export default ClpRangeSlider;
