// hooks/useHotkey.ts
import { useEffect, useRef } from "react";

export type HotkeyHandler = (event: KeyboardEvent) => void;
export type HotkeyMap = Record<string, HotkeyHandler>;

interface UseHotkeyOptions {
    /** Игнорировать нажатия в полях ввода (по умолчанию true) */
    ignoreInputFields?: boolean;
    /** Игнорировать модификаторы (Ctrl, Alt, Meta) (по умолчанию true) */
    ignoreModifiers?: boolean;
    /** Активен ли хук (по умолчанию true) */
    enabled?: boolean;
}

export const useHotkey = (hotkeyMap: HotkeyMap, options: UseHotkeyOptions = {}) => {
    const { ignoreInputFields = true, ignoreModifiers = true, enabled = true } = options;

    const mapRef = useRef(hotkeyMap);
    useEffect(() => {
        mapRef.current = hotkeyMap;
    }, [hotkeyMap]);

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
            const handler = mapRef.current[code];

            if (handler) {
                event.preventDefault(); 
                handler(event);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [ignoreInputFields, ignoreModifiers, enabled]);
};
