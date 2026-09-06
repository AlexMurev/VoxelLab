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
        <div className="vector3-input__field">
            <label className="vector3-input__label">{label}</label>
            <div className="vector3-input__group">
                <div className="vector3-input__wrapper">
                    <span className="vector3-input__axis-label vector3-input__axis-label--x">X</span>
                    <input
                        type="number"
                        className="vector3-input__input"
                        placeholder={placeholders[0]}
                        value={value["x"]}
                        onChange={(e) => handleChange("x", e.target.value)}
                    />
                </div>
                <div className="vector3-input__wrapper">
                    <span className="vector3-input__axis-label vector3-input__axis-label--y">Y</span>
                    <input
                        className="vector3-input__input"
                        placeholder={placeholders[1]}
                        value={value["y"]}
                        onChange={(e) => handleChange("y", e.target.value)}
                    />
                </div>
                <div className="vector3-input__wrapper">
                    <span className="vector3-input__axis-label vector3-input__axis-label--z">Z</span>
                    <input
                        className="vector3-input__input"
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
