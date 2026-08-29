import { useRef, useState } from "react";
import type { DragEvent, ChangeEvent, HTMLAttributes, ReactNode } from "react";
import "./DropZone.css";

interface DropZoneProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    onFilesSelect: (fileNames: string[]) => void;
}

const DropZone = ({ children, onFilesSelect, ...props }: DropZoneProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragActive, setIsDragActive] = useState<boolean>(false);

    const processFiles = (files: FileList | null) => {
        if (!files) return;

        const names = Array.from(files).map((file) => {
            return file.name.replace(/\.[^/.]+$/, "");
        });

        onFilesSelect(names);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        processFiles(e.target.files);
    };

    const handleDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setIsDragActive(true);
        else if (e.type === "dragleave") setIsDragActive(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        processFiles(e.dataTransfer.files);
    };

    return (
        <div
            className={`drop-zone ${isDragActive ? "drop-zone--active" : ""}`}
            onClick={handleClick}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            {...props}>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                multiple
                accept="image/*"
                onChange={handleFileChange}
            />
            <div className="drop-zone__text">
                {!isDragActive ? (
                    <>
                        Перетащите сюда <b>файлы текстур</b> или <span>выберите на диске</span>
                    </>
                ) : (
                    <>Отпустите, чтобы загрузить имена файлов</>
                )}
                {children}
            </div>
        </div>
    );
};

export default DropZone;
