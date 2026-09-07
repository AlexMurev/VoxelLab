import "./TransformInputs.css";
import * as THREE from "three";
import { useEffect, useState } from "react";
import { useEditorStore } from "../editorStore";
import Vector3Input from "@/components/Vector3Input/Vector3Input";
import type { Vec3 } from "@/types/vectors";

// Выносим инпуты в отдельный компонент, чтобы они могли обновляться независимо от Canvas
const TransformInputs = ({
    selectedMesh,
    selectedId,
}: {
    selectedMesh: THREE.Object3D | null;
    selectedId: string | null;
}) => {
    const { updatePosition, updateRotation, updateScale } = useEditorStore();

    const [, forceRender] = useState(0);

    useEffect(() => {
        const handleUpdate = () => forceRender((prev) => prev + 1);
        window.addEventListener("transform-change", handleUpdate);
        return () => window.removeEventListener("transform-change", handleUpdate);
    }, []);

    return (
        <div className="transform-inputs">
            <Vector3Input
                label="Позиция"
                placeholders={["0", "0", "0"]}
                value={(selectedMesh?.position.toArray() as Vec3) || [0, 0, 0]}
                onChange={(value) => {
                    if (selectedMesh && selectedId) {
                        // 1. МГНОВЕННО применяем изменения к Three.js объекту
                        selectedMesh.position.set(value[0], value[1], value[2]);

                        // 2. Отправляем в Zustand для истории и сохранения
                        updatePosition(selectedId, value);

                        // 3. Дергаем локальный рендер, чтобы инпут сразу взял свежие цифры
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
                        updateScale(selectedId, value);
                        window.dispatchEvent(new CustomEvent("transform-change"));
                    }
                }}
            />
            <Vector3Input
                label="Вращение"
                placeholders={["0°", "0°", "0°"]}
                value={(selectedMesh?.rotation.toArray() as Vec3) || [0, 0, 0]}
                onChange={(value) => {
                    if (selectedMesh && selectedId) {
                        selectedMesh.rotation.set(value[0], value[1], value[2]);
                        updateRotation(selectedId, value);
                        window.dispatchEvent(new CustomEvent("transform-change"));
                    }
                }}
            />
        </div>
    );
};

export default TransformInputs;
