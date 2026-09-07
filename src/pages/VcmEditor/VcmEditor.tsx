import "./VcmEditor.css";
import { Canvas } from "@react-three/fiber";
import { Edges, GizmoHelper, GizmoViewport, OrbitControls, TransformControls } from "@react-three/drei";
import * as THREE from "three";
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
import BoxIcon from "@/assets/box.svg";
import AddGroupIcon from "@/assets/add-group.svg";
import SearchIcon from "@/assets/search.svg";
import ElementItem from "./ElementItem/ElementItem";
import SidebarSection from "./Sidebar/SidebarSection/SidebarSection";
import type { Vec3 } from "@/types/vectors";
import TransformInputs from "./TransformInputs/TransformInputs";

type TransformMode = "translate" | "rotate" | "scale";

const VcmEditor = () => {
    const { objects, selectedId, selectObject, updatePosition, updateRotation, updateScale, addObject } =
        useEditorStore();

    const [selectedMesh, setSelectedMesh] = useState<THREE.Object3D | null>(null);
    const [transformMode, setTransformMode] = useState<TransformMode>("translate");
    const [targetPosition, setTargetPosition] = useState<Vec3>([0, 0, 0]);
    const [isDraggingBar, setIsDraggingBar] = useState(false);

    const [dragStartTransform, setDragStartTransform] = useState<{
        position: Vec3;
        rotation: Vec3;
        scale: Vec3;
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
                    <Sidebar></Sidebar>
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
                                    onClick: () => setTargetPosition([0, 0, 0]),
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
                                                onObjectChange={() => {
                                                    window.dispatchEvent(new CustomEvent("transform-change"));
                                                }}
                                                onMouseDown={() => {
                                                    if (selectedMesh) {
                                                        setDragStartTransform({
                                                            position: selectedMesh.position.toArray() as Vec3,
                                                            rotation: selectedMesh.rotation.toArray() as Vec3,
                                                            scale: selectedMesh.scale.toArray() as Vec3,
                                                        });
                                                    }
                                                }}
                                                onMouseUp={() => {
                                                    setDragStartTransform(null);

                                                    if (selectedMesh && selectedId) {
                                                        updatePosition(
                                                            selectedId,
                                                            selectedMesh.position.toArray() as Vec3,
                                                        );
                                                        updateRotation(
                                                            selectedId,
                                                            selectedMesh.rotation.toArray() as Vec3,
                                                        );
                                                        updateScale(selectedId, selectedMesh.scale.toArray() as Vec3);
                                                    }
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
                                <Sidebar>
                                    <SidebarSection minSize={250} defaultSize={250} title="Трансформ">
                                        <TransformInputs selectedMesh={selectedMesh} selectedId={selectedId} />
                                    </SidebarSection>

                                    <PanelSeparator type="horizontal" />

                                    <SidebarSection minSize={150} title="Элементы">
                                        <Toolbar
                                            items={[
                                                {
                                                    id: "add-cube",
                                                    icon: AddIcon,
                                                    label: "Добавить куб",
                                                    onClick: () =>
                                                        addObject({
                                                            type: "box",
                                                            position: [0, 0, 0],
                                                            scale: [2, 2, 2],
                                                            rotation: [0, 0, 0],
                                                        }),
                                                },
                                                {
                                                    id: "group",
                                                    icon: AddGroupIcon,
                                                    label: "Группировать",
                                                    align: "left",
                                                },
                                                { id: "search", icon: SearchIcon, label: "Поиск", align: "right" },
                                            ]}
                                        />

                                        <div className="sidebar__elements-list">
                                            <ElementItem
                                                name="Cube_01"
                                                iconSrc={BoxIcon}
                                                iconColor="#ef4444"
                                                isSelected
                                            />
                                            <ElementItem name="Cube_02" iconSrc={BoxIcon} iconColor="#f59e0b" />
                                            <ElementItem name="Cube_03" iconSrc={BoxIcon} iconColor="#3b82f6" />
                                        </div>
                                    </SidebarSection>
                                </Sidebar>
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
