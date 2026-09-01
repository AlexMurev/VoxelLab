import { useState } from "react";
import { generateStairs } from "./templates/stairs";
import { generateSlab } from "./templates/slab";
import { generateDoor } from "./templates/door";
import { generateArchive, saveBlobAsFile, type ExportFile } from "@/utils/fileExporter";
import { type BlockGeneratorFormData, type TemplateStrategy } from "./types";

const TEMPLATE_MAP: Record<string, TemplateStrategy> = {
    stairs: generateStairs,
    slab: generateSlab,
    door: generateDoor,
};

export const useJsonExporter = () => {
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const generateJsonFiles = (formData: BlockGeneratorFormData, type: string): ExportFile[] => {
        const generateStrategy = TEMPLATE_MAP[type];
        if (!generateStrategy || !formData.textureNames) return [];
        
        return formData.textureNames.flatMap((textureName) =>
            generateStrategy(formData.packId, textureName, formData.materialId, formData.durability),
        );
    };

    const downloadArchive = async (formData: BlockGeneratorFormData, action: string): Promise<void> => {
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