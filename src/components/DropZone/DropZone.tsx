import type { HTMLAttributes, ReactNode } from "react";
import "./DropZone.css";

interface DropZoneProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
}

const DropZone = ({children, ...props}: DropZoneProps) => {
    return (
        <div className="drop-zone" {...props}>
            <div className="drop-zone__text">
                Перетащите сюда <b>файлы текстур</b> или <span>выберите на диске</span>
                {children}
            </div>
        </div>
    );
};

export default DropZone;
