import { useState } from "react";
import { useThree } from "@react-three/fiber";
import { Edges, GizmoHelper, GizmoViewport, OrbitControls, TransformControls } from "@react-three/drei";
import FpsTracker from "@/utils/FpsTracker";
import type { Vec3 } from "@/types/vectors";
import { useEditorStore } from "../editorStore";
import { useTransformSnap } from "../useTransformSnap";
import Box from "../Objects/Box";
import Editor2DText from "../Objects/Editor2DText";
import { useCssVariable } from "@/hooks/useCssVariable";

interface EditorSceneProps {
    isDraggingBar: boolean;
    targetPosition: Vec3;
    setTargetPosition: (pos: Vec3) => void;
    transformMode: "translate" | "rotate" | "scale";
    setFps: (fps: number) => void;
}

export const EditorScene = ({
    isDraggingBar,
    targetPosition,
    setTargetPosition,
    transformMode,
    setFps,
}: EditorSceneProps) => {
    const { objects, selectedId, selectObject, updateObject } = useEditorStore();
    const activeTranslateSnap = useTransformSnap(1);
    const colorGrid = useCssVariable("--border-color", "#880000");
    const colorPhantomEdges = useCssVariable("--accent-primary", "#0000ff");
    const { scene } = useThree();

    const selectedMesh = selectedId ? scene.getObjectByName(selectedId) : null;

    const [dragStartTransform, setDragStartTransform] = useState<{
        position: Vec3;
        rotation: Vec3;
        scale: Vec3;
    } | null>(null);

    return (
        <>
            <GizmoHelper alignment="top-right" margin={[65, 65]}>
                <GizmoViewport scale={30} />
            </GizmoHelper>

            <axesHelper args={[16]} position={[-8, -0.999, -8]} />
            <gridHelper args={[16, 16, colorGrid, colorGrid]} position={[0, -1, 0]} />
            <gridHelper args={[48, 3, colorGrid, colorGrid]} position={[0, -1, 0]} />

            <OrbitControls
                enabled={!isDraggingBar}
                enableDamping={false}
                makeDefault
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                minAzimuthAngle={-Infinity}
                maxAzimuthAngle={Infinity}
                minPolarAngle={0}
                maxDistance={240}
                minDistance={0.01}
                maxPolarAngle={Math.PI}
                target={targetPosition}
            />

            {dragStartTransform && (
                <mesh
                    position={dragStartTransform.position}
                    rotation={dragStartTransform.rotation}
                    scale={dragStartTransform.scale}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshBasicMaterial visible={false} />
                    <Edges toneMapped={false} color={colorPhantomEdges} linewidth={2} threshold={1} />
                </mesh>
            )}

            {objects.map((obj) => (
                <Box
                    key={obj.id}
                    name={obj.id}
                    position={obj.position}
                    rotation={obj.rotation}
                    scale={obj.scale}
                    onClick={(e) => {
                        e.stopPropagation();
                        selectObject(obj.id);
                    }}
                    onDoubleClick={(e) => {
                        e.stopPropagation();
                        setTargetPosition(obj.position);
                    }}
                />
            ))}

            {selectedMesh && (
                <TransformControls
                    object={selectedMesh}
                    mode={transformMode}
                    translationSnap={activeTranslateSnap}
                    scaleSnap={activeTranslateSnap}
                    rotationSnap={22.5 * (Math.PI / 180)}
                    onObjectChange={() => {
                        if (selectedId && selectedMesh) {
                            updateObject(selectedId, {
                                position: selectedMesh.position.toArray() as Vec3,
                                rotation: selectedMesh.rotation.toArray() as Vec3,
                                scale: selectedMesh.scale.toArray() as Vec3,
                            });
                        }
                    }}
                    onMouseDown={() => {
                        setDragStartTransform({
                            position: selectedMesh.position.toArray() as Vec3,
                            rotation: selectedMesh.rotation.toArray() as Vec3,
                            scale: selectedMesh.scale.toArray() as Vec3,
                        });
                    }}
                    onMouseUp={() => {
                        setDragStartTransform(null);
                        if (selectedId) {
                            updateObject(selectedId, {
                                position: selectedMesh.position.toArray() as Vec3,
                                rotation: selectedMesh.rotation.toArray() as Vec3,
                                scale: selectedMesh.scale.toArray() as Vec3,
                            });
                        }
                    }}
                />
            )}

            <Editor2DText color={colorGrid} />
            <FpsTracker onFpsUpdate={setFps} />
        </>
    );
};
