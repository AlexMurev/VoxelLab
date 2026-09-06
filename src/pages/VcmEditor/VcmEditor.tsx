import "./VcmEditor.css";
import { Canvas } from "@react-three/fiber";
import { Edges, GizmoHelper, GizmoViewport, OrbitControls, TransformControls } from "@react-three/drei";
import * as THREE from "three";
import { Vector3, Euler } from "three";
import { useEffect, useState } from "react";
import { Toolbar } from "./Toolbar/Toolbar";
import { useCssVariable } from "@/hooks/useCssVariable";
import FpsTracker from "@/utils/FpsTracker";
import Editor2DText from "./Objects/Editor2DText";
import Box from "./Objects/Box";
import StatusBar from "./StatusBar/StatusBar";
import Sidebar from "./Sidebar/Sidebar";
import { Panel, Group } from "react-resizable-panels";
import PanelSeparator from "./PanelSeparator/PanelSeparator";
import { useEditorStore } from "./editorStore";

import TranslateIcon from "@/assets/translate.svg";
import RotateIcon from "@/assets/rotate.svg";
import ScaleIcon from "@/assets/scale.svg";
import CenterIcon from "@/assets/center.svg";
import AddIcon from "@/assets/add.svg";

type TransformMode = "translate" | "rotate" | "scale";

const VcmEditor = () => {
    const { objects, selectedId, selectObject, updateObjectTransform, addObject } = useEditorStore();

    const [selectedMesh, setSelectedMesh] = useState<THREE.Object3D | null>(null);
    const [transformMode, setTransformMode] = useState<TransformMode>("translate");
    const [targetPosition, setTargetPosition] = useState<Vector3>(new Vector3(0, 0, 0));
    const [isDraggingBar, setIsDraggingBar] = useState(false);

    const [dragStartTransform, setDragStartTransform] = useState<{
        position: Vector3;
        rotation: Euler;
        scale: Vector3;
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
            updateObjectTransform(selectedId, position, rotation, scale);
        }
    };

    const handleCanvasMissed = () => {
        selectObject(null);
        setSelectedMesh(null);
        setDragStartTransform(null);
    };

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Group
                orientation="horizontal"
                onLayoutChange={() => setIsDraggingBar(true)}
                onLayoutChanged={() => setIsDraggingBar(false)}>
                <Panel defaultSize={300} minSize={200}>
                    Тут будет второй сайдбар
                </Panel>
                <PanelSeparator />
                <Panel>
                    <div className="vcm-editor">
                        <Toolbar
                            className="vcm-editor__tools"
                            items={[
                                {
                                    id: "translate",
                                    icon: TranslateIcon,
                                    label: "Перемещение",
                                    onClick: () => setTransformMode("translate"),
                                    isActive: transformMode === "translate",
                                },
                                {
                                    id: "rotate",
                                    icon: RotateIcon,
                                    label: "Вращение",
                                    onClick: () => setTransformMode("rotate"),
                                    isActive: transformMode === "rotate",
                                },
                                {
                                    id: "scale",
                                    icon: ScaleIcon,
                                    label: "Масштаб",
                                    onClick: () => setTransformMode("scale"),
                                    isActive: transformMode === "scale",
                                },
                                {
                                    id: "center",
                                    icon: CenterIcon,
                                    label: "Центрировать камеру",
                                    onClick: () => setTargetPosition(new Vector3(0, 0, 0)),
                                },
                                {
                                    id: "add-cube",
                                    icon: AddIcon,
                                    label: "Добавить куб",
                                    onClick: () =>
                                        addObject({
                                            type: "box",
                                            position: new Vector3(0, 0, 0),
                                            scale: new Vector3(2, 2, 2),
                                            rotation: new Euler(0, 0, 0),
                                        }),
                                },
                            ]}
                        />
                        <Group
                            orientation="horizontal"
                            className="vcm-editor__main"
                            onLayoutChange={() => setIsDraggingBar(true)}
                            onLayoutChanged={() => setIsDraggingBar(false)}>
                            <Panel minSize={50}>
                                <div className="vcm-editor__canvas">
                                    <Canvas camera={{ position: [8, 8, 16] }} onPointerMissed={handleCanvasMissed}>
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
                                                <Edges
                                                    toneMapped={false}
                                                    color={colorPhantomEdges}
                                                    linewidth={2}
                                                    threshold={1}
                                                />
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
                                                            position: selectedMesh.position,
                                                            rotation: selectedMesh.rotation,
                                                            scale: selectedMesh.scale,
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
                                </div>
                            </Panel>

                            <PanelSeparator type="vertical" />

                            <Panel defaultSize={330} minSize={130} groupResizeBehavior="preserve-pixel-size">
                                <Sidebar />
                            </Panel>
                        </Group>
                        <StatusBar
                            items={[
                                ["FPS:", fps.toString()],
                                ["MODE:", transformMode.toUpperCase()],
                                ["OBJECT:", selectedId?.toString()],
                            ]}
                            className="vcm-editor__status"
                        />
                    </div>
                </Panel>
            </Group>
        </div>
    );
};

export default VcmEditor;
