import { type ExportFile } from "@/utils/fileExporter";

export interface BlockGeneratorFormData {
  blockType: 'stairs';
  textureNames: string[];
  packId: string;
  materialId: string;
  durability: number;
}

export type TemplateStrategy = (
  packId: string, 
  textureName: string, 
  materialId: string, 
  durability: number
) => ExportFile[];