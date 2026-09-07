import { useState, useEffect } from "react";

export const useTransformSnap = (defaultSnap = 1) => {
    const [snap, setSnap] = useState<number>(defaultSnap);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.shiftKey) {
                setSnap(0.25);
            } else if (e.ctrlKey || e.metaKey) {
                setSnap(0.1);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === "Shift" || e.key === "Control" || e.key === "Meta") {
                if (e.shiftKey) setSnap(0.25);
                else if (e.ctrlKey || e.metaKey) setSnap(0.1);
                else setSnap(defaultSnap);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [defaultSnap]);

    return snap;
};
