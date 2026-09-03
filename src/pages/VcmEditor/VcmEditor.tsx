import "./VcmEditor.css";
import { Canvas } from "@react-three/fiber";
import { GizmoHelper, GizmoViewport, OrbitControls, TransformControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { forwardRef, useState } from "react";
import { create } from "zustand";
import { Toolbar, type TransformMode } from "./Toolbar/Toolbar";

export interface SceneObject {
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

interface MultiTexturedBoxProps {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick: (e: any) => void;
}

const MultiTexturedBox = forwardRef<THREE.Mesh, MultiTexturedBoxProps>((props, ref) => {
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
        <mesh ref={ref} position={props.position} rotation={props.rotation} scale={props.scale} onClick={props.onClick}>
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
    };

    return (
        <div className="vcm-editor__wrapper">
            <div className="vcm-editor__canvas">
                <Toolbar currentMode={transformMode} onChange={setTransformMode} />
                <Canvas camera={{ position: [1, 1, 2] }} onPointerMissed={handleCanvasMissed}>
                    <GizmoHelper alignment="top-right" margin={[100, 100]}>
                        <GizmoViewport />
                    </GizmoHelper>
                    <axesHelper args={[2]} position={[-0.5, -0.5, -0.5]} />
                    <gridHelper args={[1, 16]} position={[0, -0.5, 0]} />
                    <gridHelper args={[3, 3]} position={[0, -0.5, 0]} />
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
                    />

                    {objects.map((obj) => (
                        <MultiTexturedBox
                            key={obj.id}
                            position={obj.position}
                            rotation={obj.rotation}
                            scale={obj.scale}
                            onClick={(e) => {
                                e.stopPropagation();
                                selectObject(obj.id);
                                setSelectedMesh(e.object);
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
                        />
                    )}

                    <directionalLight position={[2, 5, 3]} />
                    <ambientLight intensity={1} />
                </Canvas>
            </div>
        </div>
    );
};

export default VcmEditor;
