import { useState } from "react";
import JSZip from "jszip";
import { generateStairs } from "../data/templates/stairs";

const TEMPLATE_MAP = {
    stairs: generateStairs,
};

const generateArchive = async (files, action) => {
    const zip = JSZip();
    files.forEach((file) => {
        const fullPath = action === "pack_struct" ? `${file.path}/${file.filename}` : file.filename;
        const fileContent = JSON.stringify(file.content, null, 2);
        zip.file(fullPath, fileContent);
    });
    return zip.generateAsync({ type: "blob" });
};

const saveBlobAsFile = (blob, filename) => {
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 100);
};

const generateJsonFiles = (formData, type) => {
    const generateStrategy = TEMPLATE_MAP[type];
    if (!generateStrategy) {
        console.warn(`Неизвестный тип блока: ${type}`);
        return [];
    }
    if (!formData.textureNames) {
        console.warn(`Не найдены имена текстур: ${type}`);
        return [];
    }

    const allFiles = formData.textureNames.flatMap((textureName) =>
        generateStrategy(formData.packId, textureName, formData.materialId, formData.durability),
    );

    return allFiles;
};

export const useJsonExporter = () => {
    const [isGenerating, setIsGenerating] = useState(false);

    const downloadArchive = async (formData, action) => {
        setIsGenerating(true);
        try {
            const files = generateJsonFiles(formData, formData.blockType);
            const archive = await generateArchive(files, action);
            saveBlobAsFile(archive, "jsons.zip");
        } catch (error) {
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    return { isGenerating, downloadArchive };
};