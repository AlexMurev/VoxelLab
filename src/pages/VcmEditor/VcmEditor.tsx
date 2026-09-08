import "./VcmEditor.css";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { Toolbar } from "./Toolbar/Toolbar";

import StatusBar from "./StatusBar/StatusBar";
import Sidebar from "./Sidebar/Sidebar";
import { Panel, Group } from "react-resizable-panels";
import PanelSeparator from "./PanelSeparator/PanelSeparator";
import { useEditorStore } from "./editorStore";
import SidebarSection from "./Sidebar/SidebarSection/SidebarSection";
import type { Vec3 } from "@/types/vectors";
import TransformInputs from "./TransformInputs/TransformInputs";
import { ElementsList } from "./ElementsList/ElementsList";

import TranslateIcon from "@/assets/translate.svg";
import RotateIcon from "@/assets/rotate.svg";
import ScaleIcon from "@/assets/scale.svg";
import CenterIcon from "@/assets/center.svg";
import AddIcon from "@/assets/add.svg";
import AddGroupIcon from "@/assets/add-group.svg";
import SearchIcon from "@/assets/search.svg";
import { useHotkey } from "@/hooks/useHotkey";
import { EditorScene } from "./EditorScene/EditorScene";

type TransformMode = "translate" | "rotate" | "scale";

const VcmEditor = () => {
    const { selectedId, selectObject, addObject } = useEditorStore();

    const [transformMode, setTransformMode] = useState<TransformMode>("translate");
    const [targetPosition, setTargetPosition] = useState<Vec3>([0, 0, 0]);
    const [isDraggingBar, setIsDraggingBar] = useState(false);

    const [fps, setFps] = useState(0);

    useHotkey({
        KeyV: () => setTransformMode("translate"),
        KeyR: () => setTransformMode("rotate"),
        KeyS: () => setTransformMode("scale"),
    });

    const handleCanvasMissed = () => {
        selectObject(null);
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
                                    label: "Перемещение (V)",
                                    onClick: () => setTransformMode("translate"),
                                    isActive: transformMode === "translate",
                                },
                                {
                                    id: "rotate",
                                    icon: RotateIcon,
                                    label: "Вращение (R)",
                                    onClick: () => setTransformMode("rotate"),
                                    isActive: transformMode === "rotate",
                                },
                                {
                                    id: "scale",
                                    icon: ScaleIcon,
                                    label: "Масштаб (S)",
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
                                        <EditorScene
                                            isDraggingBar={isDraggingBar}
                                            targetPosition={targetPosition}
                                            setTargetPosition={setTargetPosition}
                                            transformMode={transformMode}
                                            setFps={setFps}
                                        />
                                    </Canvas>
                                </div>
                            </Panel>

                            <PanelSeparator type="vertical" />

                            <Panel defaultSize={330} minSize={130} groupResizeBehavior="preserve-pixel-size">
                                <Sidebar>
                                    <SidebarSection minSize={250} defaultSize={250} title="Трансформ">
                                        <TransformInputs />
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
                                        <ElementsList />
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
