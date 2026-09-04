import { useEffect, useState } from "react";
import * as THREE from "three";

// Выносим вспомогательную функцию за пределы хука, чтобы она не пересоздавалась
const parseCssColor = (variableName: string, fallback: string): THREE.Color => {
    if (typeof window !== "undefined") {
        const colorStr = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
        return new THREE.Color(colorStr || fallback);
    }
    return new THREE.Color(fallback);
};

export const useCssVariable = (variableName: string, defaultValue: string): THREE.Color => {
    // 1. Инициализируем состояние чистой функцией
    const [color, setColor] = useState<THREE.Color>(() => parseCssColor(variableName, defaultValue));

    useEffect(() => {
        // 2. Локальная функция обновления, использующая внешнюю чистую функцию
        const updateColor = () => {
            setColor(parseCssColor(variableName, defaultValue));
        };

        const observer = new MutationObserver(updateColor);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });

        return () => observer.disconnect();
    }, [variableName, defaultValue]); // Теперь здесь только строки, ESLint будет доволен

    return color;
};