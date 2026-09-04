import "./VcmEditor.css";
import { Canvas } from "@react-three/fiber";
import { Edges, GizmoHelper, GizmoViewport, OrbitControls, TransformControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { forwardRef, useState } from "react";
import { create } from "zustand";
import { Toolbar, type TransformMode } from "./Toolbar/Toolbar";
import { useCssVariable } from "@/hooks/useCssVariable";
import FpsTracker from "@/utils/FpsTracker";
import Editor2DText from "./Editor3DText/Editor3DText";

interface SceneObject {
    id: string;
    type: "box" | "rect";
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
}

interface EditorStore {
    objects: SceneObject[];
    selectedId: string | null;
    selectObject: (id: string | null) => void;
    updateObjectTransform: (
        id: string,
        position: [number, number, number],
        rotation: [number, number, number],
        scale: [number, number, number],
    ) => void;
}

const useEditorStore = create<EditorStore>((set) => ({
    objects: [
        { id: "vcm-cube-1", type: "box", position: [0, 0, 0], rotation: [0, 0, 0], scale: [0.125, 0.125, 0.125] },
        {
            id: "vcm-cube-2",
            type: "box",
            position: [0.5, 0, 0],
            rotation: [0, 0, 0],
            scale: [0.125, 0.125, 0.125],
        },
    ],
    selectedId: null,
    selectObject: (id) => set({ selectedId: id }),
    updateObjectTransform: (id, position, rotation, scale) =>
        set((state) => ({
            objects: state.objects.map((obj) => (obj.id === id ? { ...obj, position, rotation, scale } : obj)),
        })),
}));

interface BoxObjProps {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick: (e: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDoubleClick: (e: any) => void;
}

const BoxObj = forwardRef<THREE.Mesh, BoxObjProps>((props, ref) => {
    const textures = useTexture({
        north: `${import.meta.env.BASE_URL}north.png`,
        east: `${import.meta.env.BASE_URL}east.png`,
        south: `${import.meta.env.BASE_URL}south.png`,
        west: `${import.meta.env.BASE_URL}west.png`,
        top: `${import.meta.env.BASE_URL}top.png`,
        bottom: `${import.meta.env.BASE_URL}bottom.png`,
    });

    Object.values(textures).forEach((texture) => {
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
    });
    const topTexture = textures.top.clone();
    topTexture.needsUpdate = true;
    topTexture.center.set(0.5, 0.5);
    topTexture.rotation = Math.PI;

    return (
        <mesh
            ref={ref}
            position={props.position}
            rotation={props.rotation}
            scale={props.scale}
            onClick={props.onClick}
            onDoubleClick={props.onDoubleClick}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial attach="material-0" map={textures.west} roughness={1} />
            <meshStandardMaterial attach="material-1" map={textures.east} roughness={1} />
            <meshStandardMaterial attach="material-2" map={topTexture} roughness={1} />
            <meshStandardMaterial attach="material-3" map={textures.bottom} roughness={1} />
            <meshStandardMaterial attach="material-4" map={textures.north} roughness={1} />
            <meshStandardMaterial attach="material-5" map={textures.south} roughness={1} />
        </mesh>
    );
});

const VcmEditor = () => {
    const { objects, selectedId, selectObject, updateObjectTransform } = useEditorStore();

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
                />
                <Canvas camera={{ position: [1, 1, 2] }} onPointerMissed={handleCanvasMissed}>
                    <GizmoHelper alignment="top-right" margin={[100, 100]}>
                        <GizmoViewport />
                    </GizmoHelper>
                    <axesHelper args={[1]} position={[-0.5, -0.499, -0.5]} />
                    <gridHelper args={[1, 16, colorGrid, colorGrid]} position={[0, -0.5, 0]} />
                    <gridHelper args={[3, 3, colorGrid, colorGrid]} position={[0, -0.5, 0]} />
                    <OrbitControls
                        makeDefault
                        enableZoom={true}
                        enablePan={true}
                        enableRotate={true}
                        minAzimuthAngle={-Infinity}
                        maxAzimuthAngle={Infinity}
                        minPolarAngle={0}
                        maxDistance={15}
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
                        <BoxObj
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
                            translationSnap={1 / 64}
                            scaleSnap={1 / 32}
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

                    <directionalLight position={[2, 5, 3]} />
                    <ambientLight intensity={1} />
                    <Editor2DText color={colorGrid}/>
                    <FpsTracker onFpsUpdate={setFps} />
                </Canvas>
                <div className="vcm-editor__status-bar">
                    <span className="vcm-status-item">
                        <span className="vcm-status-label">FPS:</span>
                        <span className="vcm-status-value">{fps}</span>
                    </span>
                    {selectedId && (
                        <span className="vcm-status-item">
                            <span className="vcm-status-label">MODE:</span>
                            <span className="vcm-status-value">{transformMode.toUpperCase()}</span>
                        </span>
                    )}
                    <span className="vcm-status-item">
                        <span className="vcm-status-label">OBJECT:</span>
                        <span className="vcm-status-value">{selectedId}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default VcmEditor;
