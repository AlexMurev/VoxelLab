import type { Euler, Vector3 } from "three";

interface Vector3InputProps {
    label: string;
    placeholders?: [string, string, string];
    value: Vector3 | Euler;
    onChange: (newValue: Vector3 | Euler) => void;
}

const Vector3Input = ({ label, placeholders = ["0", "0", "0"], value, onChange }: Vector3InputProps) => {
    const handleChange = (index: "x" | "y" | "z", textValue: string) => {
        const numValue = textValue === "" ? 0 : parseFloat(textValue);

        if (!isNaN(numValue)) {
            const newVector = value.clone();
            newVector[index] = numValue;
            onChange(newVector);
        }
    };

    return (
        <div className="sidebar__field">
            <label className="sidebar__label">{label}</label>
            <div className="sidebar__transform-group">
                <div className="sidebar__input-wrapper">
                    <span className="sidebar__axis-label sidebar__axis-label--x">X</span>
                    <input
                        type="number"
                        className="sidebar__input"
                        placeholder={placeholders[0]}
                        value={value["x"]}
                        onChange={(e) => handleChange("x", e.target.value)}
                    />
                </div>
                <div className="sidebar__input-wrapper">
                    <span className="sidebar__axis-label sidebar__axis-label--y">Y</span>
                    <input
                        className="sidebar__input"
                        placeholder={placeholders[1]}
                        value={value["y"]}
                        onChange={(e) => handleChange("y", e.target.value)}
                    />
                </div>
                <div className="sidebar__input-wrapper">
                    <span className="sidebar__axis-label sidebar__axis-label--z">Z</span>
                    <input
                        className="sidebar__input"
                        placeholder={placeholders[2]}
                        value={value["z"]}
                        onChange={(e) => handleChange("z", e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Vector3Input;
