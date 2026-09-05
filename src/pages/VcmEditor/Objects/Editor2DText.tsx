import { Text } from "@react-three/drei";
import * as THREE from "three";

interface Editor2DTextProps {
    color: THREE.Color;
}

const Editor2DText = ({color}: Editor2DTextProps) => {
    return (
        <>
            <Text
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.5, 11]}
                fontSize={4}
                color={color}
                anchorX="center"
                anchorY="middle">
                N
            </Text>
            <Text
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.5, -11]}
                fontSize={4}
                color={color}
                anchorX="center"
                anchorY="middle">
                S
            </Text>
            <Text
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                position={[11, -0.5, 0]}
                fontSize={4}
                color={color}
                anchorX="center"
                anchorY="middle">
                W
            </Text>
            <Text
                rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                position={[-11, -0.5, 0]}
                fontSize={4}
                color={color}
                anchorX="center"
                anchorY="middle">
                E
            </Text>
        </>
    );
};

export default Editor2DText;
