import "./VcmEditor.css";
import { Canvas } from "@react-three/fiber";
import { GizmoHelper, GizmoViewport, OrbitControls, TransformControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useRef, forwardRef} from "react";
import { create } from "zustand";

interface EditorStore {
    position: [number, number, number];
    setPosition: (pos: [number, number, number]) => void;
}

const useEditorStore = create<EditorStore>((set) => ({
    position:[0, 0, 0], 
    setPosition: (pos) => set({ position: pos }),
}));

const CoordinatesPanel = () => {
    const position = useEditorStore((state) => state.position);

    return (
        <div style={{ background: "#222", color: "#fff", padding: "10px" }}>
            <h3>Координаты куба (Zustand):</h3>
            <p>
                X: {position[0].toFixed(4)} | Y: {position[1].toFixed(4)} | Z: {position[2].toFixed(4)}
            </p>
        </div>
    );
};

const MultiTexturedBox = forwardRef<THREE.Mesh, object>((_props, ref) => {
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
        <mesh ref={ref}>
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

    const meshRef = useRef<THREE.Mesh>(null);

    const setPosition = useEditorStore((state) => state.setPosition);

    const handleTransform = (e?: THREE.Event) => {
        if (!e) return;

        const target = e.target as { object: THREE.Object3D };

        if (target && target.object) {
            const { x, y, z } = target.object.position;
            setPosition([x, y, z]);
        }
    };

    return (
        <div className="vcm-editor__canvas">
            <CoordinatesPanel />
            <Canvas camera={{ position: [1, 1, 2] }}>
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
                    minDistance={0.1}
                    maxPolarAngle={Math.PI}
                />
                <TransformControls
                    mode="translate"
                    translationSnap={1 / 16}
                    scaleSnap={1 / 16}
                    onObjectChange={handleTransform}
                    rotationSnap={22.5 * (Math.PI / 180)}>
                    <MultiTexturedBox ref={meshRef} />
                </TransformControls>
                <directionalLight position={[2, 5, 3]} />
                <ambientLight intensity={1} />
            </Canvas>
        </div>
    );
};

export default VcmEditor;
