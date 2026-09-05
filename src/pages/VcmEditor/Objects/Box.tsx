import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { forwardRef } from "react";

interface BoxProps {
	position: [number, number, number];
	rotation: [number, number, number];
	scale: [number, number, number];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onClick: (e: any) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onDoubleClick: (e: any) => void;
}

const Box = forwardRef<THREE.Mesh, BoxProps>((props, ref) => {
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
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial attach="material-0" map={textures.west} roughness={1} />
            <meshStandardMaterial attach="material-1" map={textures.east} roughness={1} />
            <meshStandardMaterial attach="material-2" map={topTexture} roughness={1} />
            <meshStandardMaterial attach="material-3" map={textures.bottom} roughness={1} />
            <meshStandardMaterial attach="material-4" map={textures.north} roughness={1} />
            <meshStandardMaterial attach="material-5" map={textures.south} roughness={1} />
        </mesh>
    );
});

export default Box;