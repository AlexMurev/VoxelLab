import "./TransformInputs.css";
import * as THREE from "three";
import { useEffect, useState } from "react";
import { useEditorStore } from "../editorStore";
import Vector3Input from "@/components/Vector3Input/Vector3Input";
import type { Vec3 } from "@/types/vectors";

const TransformInputs = ({
    selectedMesh,
    selectedId,
}: {
    selectedMesh: THREE.Object3D | null;
    selectedId: string | null;
}) => {
    const { updateObject } = useEditorStore();

    const [, forceRender] = useState(0);

    useEffect(() => {
        const handleUpdate = () => forceRender((prev) => prev + 1);
        window.addEventListener("transform-change", handleUpdate);
        return () => window.removeEventListener("transform-change", handleUpdate);
    }, []);

    const rotationInDegrees: Vec3 = selectedMesh
        ? [
              THREE.MathUtils.radToDeg(selectedMesh.rotation.x),
              THREE.MathUtils.radToDeg(selectedMesh.rotation.y),
              THREE.MathUtils.radToDeg(selectedMesh.rotation.z),
          ]
        : [0, 0, 0];

    return (
        <div className="transform-inputs">
            <Vector3Input
                label="Позиция"
                placeholders={["0", "0", "0"]}
                value={(selectedMesh?.position.toArray() as Vec3) || [0, 0, 0]}
                onChange={(value) => {
                    if (selectedMesh && selectedId) {
                        selectedMesh.position.set(value[0], value[1], value[2]);
                        updateObject(selectedId, { position: value });
                        window.dispatchEvent(new CustomEvent("transform-change"));
                    }
                }}
            />
            <Vector3Input
                label="Размер"
                placeholders={["1", "1", "1"]}
                value={(selectedMesh?.scale.toArray() as Vec3) || [1, 1, 1]}
                onChange={(value) => {
                    if (selectedMesh && selectedId) {
                        selectedMesh.scale.set(value[0], value[1], value[2]);
                        updateObject(selectedId, { scale: value });
                        window.dispatchEvent(new CustomEvent("transform-change"));
                    }
                }}
            />
            <Vector3Input
                label="Вращение"
                placeholders={["0°", "0°", "0°"]}
                value={rotationInDegrees}
                onChange={(value) => {
                    if (selectedMesh && selectedId) {
                        const radX = THREE.MathUtils.degToRad(value[0]);
                        const radY = THREE.MathUtils.degToRad(value[1]);
                        const radZ = THREE.MathUtils.degToRad(value[2]);

                        selectedMesh.rotation.set(radX, radY, radZ);
                        updateObject(selectedId, { rotation: [radX, radY, radZ] });
                        window.dispatchEvent(new CustomEvent("transform-change"));
                    }
                }}
            />
        </div>
    );
};

export default TransformInputs;
