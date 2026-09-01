import { type BlockProperties } from "@/types/blockProperties";

const doorTemplate: BlockProperties = {
    material: "justblocks:wood",
    texture: "acacia_door",
    parent: "justblocks:base_door",
    "picking-item": "justblocks:acacia_door.item",
    hidden: false,
    caption: "acacia door",
    "state-based": {
        bits: 1,
        variants: [{ model: "custom", "model-name": "door_1" }]
    },
    fields: {
        open: { type: "int8" },
        hinge: { type: "int8" },
        base_rot: { type: "int8" }
    }
};

const itemTemplate = {
    "icon-type": "sprite",
    icon: "items:acacia_door",
    "script-name": "door_item"
};

export const generateDoor = (
    packId: string = "justblocks",
    textureName: string = "oak_door",
    material?: string,
    durability?: string | number
) => {
    const door = structuredClone(doorTemplate) as BlockProperties;
    const item = structuredClone(itemTemplate);

    door["picking-item"] = `${packId}:${textureName}.item`;
    door.caption = textureName.replaceAll("_", " ") + " door";
    door.texture = textureName;

    if (material) {
        door.material = material;
    }
    if (durability !== undefined) {
        door["base:durability"] = Number(durability);
    }

    item.icon = `items:${textureName}`;

    return [
        { path: "blocks", filename: `${textureName}.json`, content: door },
        { path: "items", filename: `${textureName}.item.json`, content: item }
    ];
};