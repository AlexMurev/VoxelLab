import { type BlockProperties } from "@/types/blockProperties";

const slabTemplate: BlockProperties = {
    parent: "justblocks:base_slab",
    caption: "acacia slab",
    hidden: false,
    "picking-item": "justblocks:acacia_slab.item",
    material: "justblocks:wood",
    texture: "acacia_planks",
    "justblocks:whole-block": "justblocks:acacia_planks",
    "base:durability": 5.0,
    "state-based": {
        bits: 3,
        variants: [
            { model: "custom", "model-name": "slab/slab_1" },
            { model: "custom", "model-name": "slab/slab_2" },
            { model: "custom", "model-name": "slab/slab_3" },
            { model: "custom", "model-name": "slab/slab_4" },
            { model: "custom", "model-name": "slab/slab_top" }
        ]
    }
};

const itemTemplate = {
    "script-name": "slab"
};

export const generateSlab = (
    packId: string = "justblocks",
    textureName: string = "oak_planks",
    material?: string,
    durability?: string | number
) => {
    const slab = structuredClone(slabTemplate) as BlockProperties;
    const item = structuredClone(itemTemplate);

    slab["picking-item"] = `${packId}:${textureName}_slab.item`;
    slab.caption = textureName.replaceAll("_", " ") + " slab";
    slab.texture = textureName;
    slab["justblocks:whole-block"] = `${packId}:${textureName}`;

    if (material) {
        slab.material = material;
    }
    if (durability !== undefined) {
        slab["base:durability"] = Number(durability);
    }

    return [
        { path: "blocks", filename: `${textureName}_slab.json`, content: slab },
        { path: "items", filename: `${textureName}_slab.item.json`, content: item }
    ];
};