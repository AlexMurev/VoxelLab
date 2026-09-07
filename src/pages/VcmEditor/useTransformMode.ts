import { useState, useEffect, useCallback } from "react";

type TransformMode = "translate" | "rotate" | "scale";

interface UseTransformModeOptions {
    codes?: {
        translate?: string;
        rotate?: string;
        scale?: string;
    };
    ignoreInputFields?: boolean;
    enabled?: boolean;
    ignoreModifiers?: boolean;
}

export const useTransformMode = (initialMode: TransformMode = "translate", options: UseTransformModeOptions = {}) => {
    const {
        codes = { translate: "KeyV", rotate: "KeyR", scale: "KeyS" },
        ignoreInputFields = true,
        enabled = true,
        ignoreModifiers = true,
    } = options;

    const [mode, setMode] = useState<TransformMode>(initialMode);

    const setTransformMode = useCallback((newMode: TransformMode) => {
        setMode(newMode);
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (ignoreInputFields) {
                const target = event.target as HTMLElement;
                if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
                    return;
                }
            }

            if (ignoreModifiers && (event.ctrlKey || event.altKey || event.metaKey)) {
                return;
            }

            const code = event.code;

            let newMode: TransformMode | null = null;
            if (code === codes.translate) newMode = "translate";
            else if (code === codes.rotate) newMode = "rotate";
            else if (code === codes.scale) newMode = "scale";

            if (newMode) {
                event.preventDefault();
                setMode(newMode);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [codes.translate, codes.rotate, codes.scale, ignoreInputFields, enabled, ignoreModifiers]);

    return { mode, setTransformMode };
};
