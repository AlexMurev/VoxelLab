import "./VcmEditor.css";
import { Canvas } from "@react-three/fiber";
import { Edges, GizmoHelper, GizmoViewport, OrbitControls, TransformControls } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { Toolbar, type TransformMode } from "./Toolbar/Toolbar";
import { useCssVariable } from "@/hooks/useCssVariable";
import FpsTracker from "@/utils/FpsTracker";
import Editor2DText from "./Objects/Editor2DText";
import Box from "./Objects/Box";
import StatusBar from "./StatusBar/StatusBar";

export interface SceneObject {
    id: string;
    type: "box" | "rect";
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
}

export interface EditorStore {
    objects: SceneObject[];
    selectedId: string | null;
    selectObject: (id: string | null) => void;
    addObject: (obj: Omit<SceneObject, "id">) => void;
    updateObjectTransform: (
        id: string,
        position: [number, number, number],
        rotation: [number, number, number],
        scale: [number, number, number],
    ) => void;
}

const useEditorStore = create<EditorStore>((set) => ({
    objects: [
       
    ],
    selectedId: null,
    addObject: (obj) =>
        set((state) => {
            const newObject: SceneObject = {
                ...obj,
                id: `vcm-${obj.type}-${crypto.randomUUID()}`,
            };

            return {
                objects: [...state.objects, newObject],
                selectedId: newObject.id,
            };
        }),
    selectObject: (id) => set({ selectedId: id }),
    updateObjectTransform: (id, position, rotation, scale) =>
        set((state) => ({
            objects: state.objects.map((obj) => (obj.id === id ? { ...obj, position, rotation, scale } : obj)),
        })),
}));

const VcmEditor = () => {
    const { objects, selectedId, selectObject, updateObjectTransform, addObject } = useEditorStore();

    const [selectedMesh, setSelectedMesh] = useState<THREE.Object3D | null>(null);
    const [transformMode, setTransformMode] = useState<TransformMode>("translate");
    const [targetPosition, setTargetPosition] = useState<[number, number, number]>([0, 0, 0]);

    const [dragStartTransform, setDragStartTransform] = useState<{
        position: [number, number, number];
        rotation: [number, number, number];
        scale: [number, number, number];
    } | null>(null);

    const colorGrid = useCssVariable("--border-color", "#880000");
    const colorPhantomEdges = useCssVariable("--accent-primary", "#0000ff");

    const [fps, setFps] = useState(0);

    const [activeTranslateSnap, setActiveTranslateSnap] = useState<number>(1);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.shiftKey) {
                setActiveTranslateSnap(0.25);
            } else if (e.ctrlKey || e.metaKey) {
                setActiveTranslateSnap(0.1);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === "Shift" || e.key === "Control" || e.key === "Meta") {
                if (e.shiftKey) setActiveTranslateSnap(0.25);
                else if (e.ctrlKey || e.metaKey) setActiveTranslateSnap(0.1);
                else setActiveTranslateSnap(1);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    const handleTransform = (e?: THREE.Event) => {
        if (!e || !selectedId) return;
        const target = e.target as { object: THREE.Object3D };
        if (target && target.object) {
            const { position, rotation, scale } = target.object;
            updateObjectTransform(
                selectedId,
                position.toArray() as [number, number, number],
                [rotation.x, rotation.y, rotation.z],
                scale.toArray() as [number, number, number],
            );
        }
    };

    const handleCanvasMissed = () => {
        selectObject(null);
        setSelectedMesh(null);
        setDragStartTransform(null);
    };

    return (
        <div className="vcm-editor__wrapper">
            <div className="vcm-editor__canvas">
                <Toolbar
                    currentMode={transformMode}
                    onChange={setTransformMode}
                    centerCameraToOrigin={setTargetPosition}
                    addObject={addObject}
                />
                <Canvas camera={{ position: [8, 8, 16] }} onPointerMissed={handleCanvasMissed}>
                    <GizmoHelper alignment="top-right" margin={[100, 100]}>
                        <GizmoViewport />
                    </GizmoHelper>
                    <axesHelper args={[16]} position={[-8, -0.999, -8]} />
                    <gridHelper args={[16, 16, colorGrid, colorGrid]} position={[0, -1, 0]} />
                    <gridHelper args={[48, 3, colorGrid, colorGrid]} position={[0, -1, 0]} />
                    <OrbitControls
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
                            position={obj.position}
                            rotation={obj.rotation}
                            scale={obj.scale}
                            onClick={(e) => {
                                e.stopPropagation();
                                selectObject(obj.id);
                                setSelectedMesh(e.object);
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
                            onObjectChange={handleTransform}
                            onMouseDown={() => {
                                if (selectedMesh) {
                                    setDragStartTransform({
                                        position: selectedMesh.position.toArray() as [number, number, number],
                                        rotation: [
                                            selectedMesh.rotation.x,
                                            selectedMesh.rotation.y,
                                            selectedMesh.rotation.z,
                                        ],
                                        scale: selectedMesh.scale.toArray() as [number, number, number],
                                    });
                                }
                            }}
                            onMouseUp={() => {
                                setDragStartTransform(null);
                            }}
                        />
                    )}

                    <Editor2DText color={colorGrid} />
                    <FpsTracker onFpsUpdate={setFps} />
                </Canvas>
                <StatusBar
                    items={[
                        ["FPS:", fps.toString()],
                        ["MODE:", transformMode.toUpperCase()],
                        ["OBJECT:", selectedId?.toString()],
                    ]}
                />
            </div>
        </div>
    );
};

export default VcmEditor;
