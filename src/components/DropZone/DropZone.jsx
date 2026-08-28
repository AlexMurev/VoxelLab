import React from "react";
import "./DropZone.css";

const DropZone = ({children, ...props}) => {
    return (
        <div className="drop-zone">
            <div className="drop-zone__text">
                Перетащите сюда <b>файлы текстур</b> или <span>выберите на диске</span>
            </div>
        </div>
    );
};

export default DropZone;
