import React from "react";
import "./Toolbar.css";

import TranslateIcon from "@/assets/translate.svg";
import RotateIcon from "@/assets/rotate.svg";
import ScaleIcon from "@/assets/scale.svg";

export type TransformMode = "translate" | "rotate" | "scale";

interface ToolbarProps {
    currentMode: TransformMode;
    onChange: (mode: TransformMode) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ currentMode, onChange }) => {
    const buttons: { mode: TransformMode; label: string; icon: string }[] = [
        { mode: "translate", label: "Перемещение", icon: TranslateIcon },
        { mode: "rotate", label: "Вращение", icon: RotateIcon },
        { mode: "scale", label: "Масштаб", icon: ScaleIcon },
    ];

    return (
        <div className="vcm-editor__toolbar">
            {buttons.map((btn) => {
                const isActive = currentMode === btn.mode;
                return (
                    <button
                        key={btn.mode}
                        className={`vcm-editor__toolbar-btn ${isActive ? "active" : ""}`}
                        onClick={() => onChange(btn.mode)}
                        title={btn.label}
                        type="button">
                        <img src={btn.icon} alt={btn.label} className="btn-icon" />
                    </button>
                );
            })}
        </div>
    );
};
