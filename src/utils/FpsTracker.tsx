import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const FpsTracker = ({ onFpsUpdate }: { onFpsUpdate: (fps: number) => void }) => {
    const lastTime = useRef<number>(0);
    const frames = useRef<number>(0);

    useFrame(() => {
        const time = performance.now();

        if (lastTime.current === 0) {
            lastTime.current = time;
            return;
        }

        frames.current++;

        if (time >= lastTime.current + 1000) {
            const fps = Math.round((frames.current * 1000) / (time - lastTime.current));
            onFpsUpdate(fps);
            frames.current = 0;
            lastTime.current = time;
        }
    });

    return null;
};

export default FpsTracker;
