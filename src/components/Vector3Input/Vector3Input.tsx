import { useState, type KeyboardEvent } from "react";
import "./Vector3Input.css";
import type { Vec3 } from "@/types/vectors";

interface Vector3InputProps {
    label: string;
    placeholders?: [string, string, string];
    value: Vec3;
    onChange: (newValue: Vec3) => void;
}

const Vector3Input = ({ label, placeholders = ["0", "0", "0"], value, onChange }: Vector3InputProps) => {
    // Храним индекс инпута (0=X, 1=Y, 2=Z), который сейчас редактируется
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    // Храним сырой текст только для редактируемого поля
    const [localValue, setLocalValue] = useState<string>("");

    const handleFocus = (index: number) => {
        setFocusedIndex(index);
        // При фокусе берем текущее точное значение.
        // Number(...toFixed(3)) отрезает хвосты вроде 1.00000000002
        setLocalValue(Number(value[index].toFixed(3)).toString());
    };

    const commitChange = (index: number) => {
        if (focusedIndex !== index) return;

        const numValue = localValue === "" ? 0 : parseFloat(localValue);

        if (!isNaN(numValue) && numValue !== value[index]) {
            const newVector = [...value] as Vec3;
            newVector[index] = numValue;
            onChange(newVector);
        }
        // Снимаем фокусный стейт
        setFocusedIndex(null);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Enter") {
            commitChange(index);
            e.currentTarget.blur(); // Визуально убираем курсор
        } else if (e.key === "Escape") {
            // Отмена ввода
            setFocusedIndex(null);
            e.currentTarget.blur();
        }
    };

    // Определяем, что показывать в input
    const getDisplayValue = (index: number) => {
        if (focusedIndex === index) return localValue;
        return Number(value[index].toFixed(3));
    };

    return (
        <div className="vector3-input__field">
            <label className="vector3-input__label">{label}</label>
            <div className="vector3-input__group">
                {(["X", "Y", "Z"] as const).map((axis, index) => (
                    <div className="vector3-input__wrapper" key={axis}>
                        <span className={`vector3-input__axis-label vector3-input__axis-label--${axis.toLowerCase()}`}>
                            {axis}
                        </span>
                        <input
                            type="number"
                            step="any" // Важно для 3D, чтобы браузер не ругался на дроби
                            className="vector3-input__input"
                            placeholder={placeholders[index]}
                            value={getDisplayValue(index)}
                            onFocus={() => handleFocus(index)}
                            onChange={(e) => setLocalValue(e.target.value)}
                            onBlur={() => commitChange(index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vector3Input;
