import "./Toolbar.css";

import TranslateIcon from "@/assets/translate.svg";
import RotateIcon from "@/assets/rotate.svg";
import ScaleIcon from "@/assets/scale.svg";
import CenterIcon from "@/assets/center.svg";

export type TransformMode = "translate" | "rotate" | "scale";

interface ToolbarProps {
    currentMode: TransformMode;
    onChange: (mode: TransformMode) => void;
    centerCameraToOrigin: (position: [number, number, number]) => void;
}

export const Toolbar = ({ currentMode, onChange, centerCameraToOrigin }: ToolbarProps) => {
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
            <button
                className={`vcm-editor__toolbar-btn`}
                onClick={() => centerCameraToOrigin([0, 0, 0])}
                title={"Центрировать камеру"}
                type="button">
                <img src={CenterIcon} alt={"Центрировать камеру"} className="btn-icon" />
            </button>
        </div>
    );
};
