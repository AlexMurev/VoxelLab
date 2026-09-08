import "./TransformInputs.css";
import * as THREE from "three";
import { useEditorStore } from "../editorStore";
import Vector3Input from "@/components/Vector3Input/Vector3Input";
import type { Vec3 } from "@/types/vectors";

const TransformInputs = () => {
    const { objects, selectedId, updateObject } = useEditorStore();

    const selectedObject = objects.find((obj) => obj.id === selectedId);

    if (!selectedObject) {
        return <div className="transform-inputs transform-inputs--empty">Объект не выбран</div>;
    }

    const rotationInDegrees: Vec3 = [
        THREE.MathUtils.radToDeg(selectedObject.rotation[0]),
        THREE.MathUtils.radToDeg(selectedObject.rotation[1]),
        THREE.MathUtils.radToDeg(selectedObject.rotation[2]),
    ];

    return (
        <div className="transform-inputs">
            <Vector3Input
                label="Позиция"
                placeholders={["0", "0", "0"]}
                value={selectedObject.position}
                onChange={(value) => {
                    updateObject(selectedObject.id, { position: value });
                }}
            />
            <Vector3Input
                label="Размер"
                placeholders={["1", "1", "1"]}
                value={selectedObject.scale}
                onChange={(value) => {
                    updateObject(selectedObject.id, { scale: value });
                }}
            />
            <Vector3Input
                label="Вращение"
                placeholders={["0°", "0°", "0°"]}
                value={rotationInDegrees}
                onChange={(valueInDegrees) => {
                    const radValues: Vec3 = [
                        THREE.MathUtils.degToRad(valueInDegrees[0]),
                        THREE.MathUtils.degToRad(valueInDegrees[1]),
                        THREE.MathUtils.degToRad(valueInDegrees[2]),
                    ];
                    updateObject(selectedObject.id, { rotation: radValues });
                }}
            />
        </div>
    );
};

export default TransformInputs;
