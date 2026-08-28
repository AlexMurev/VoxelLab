const stairsTemplate = {
    parent: "justblocks:base_stairs",
    "picking-item": "PACKID:BLOCK_stairs.item",
    hidden: false,
    caption: "BLOCK stairs",
    texture: "TEXTURE",
    "state-based": {
        bits: 3,
        variants: [
            { model: "custom", "model-name": "stairs/stairs_1" },
            { model: "custom", "model-name": "stairs/stairs_2" },
            { model: "custom", "model-name": "stairs/stairs_3" },
            { model: "custom", "model-name": "stairs/stairs_f0" },
            { model: "custom", "model-name": "stairs/stairs_f1" },
            { model: "custom", "model-name": "stairs/stairs_f2" },
            { model: "custom", "model-name": "stairs/stairs_f3" },
        ],
    },
};

const innerCornerTemplate = {
    parent: "justblocks:BLOCK_stairs",
    "model-name": "stairs/stairs_inner_corner_0",
    "justblocks:solid-faces": [true, false, true, false, true, false],
    hitboxes: [
        [0, 0, 0, 1, 0.5, 1],
        [0, 0.5, 0, 1, 0.5, 0.5],
        [0, 0.5, 0.5, 0.5, 0.5, 0.5],
    ],
    hidden: true,
    "state-based": {
        bits: 3,
        variants: [
            { "model-name": "stairs/stairs_inner_corner_1" },
            { "model-name": "stairs/stairs_inner_corner_2" },
            { "model-name": "stairs/stairs_inner_corner_3" },
            { "model-name": "stairs/stairs_inner_corner_4" },
            { "model-name": "stairs/stairs_inner_corner_5" },
            { "model-name": "stairs/stairs_inner_corner_6" },
            { "model-name": "stairs/stairs_inner_corner_7" },
        ],
    },
};

const outerCornerTemplate = {
    parent: "justblocks:BLOCK_stairs",
    "model-name": "stairs/stairs_outer_corner_0",
    "justblocks:solid-faces": [false, false, true, false, false, false],
    hitboxes: [
        [0, 0, 0, 1, 0.5, 1],
        [0, 0.5, 0, 0.5, 0.5, 0.5],
    ],
    hidden: true,
    "state-based": {
        bits: 3,
        variants: [
            { "model-name": "stairs/stairs_outer_corner_1" },
            { "model-name": "stairs/stairs_outer_corner_2" },
            { "model-name": "stairs/stairs_outer_corner_3" },
            { "model-name": "stairs/stairs_outer_corner_4" },
            { "model-name": "stairs/stairs_outer_corner_5" },
            { "model-name": "stairs/stairs_outer_corner_6" },
            { "model-name": "stairs/stairs_outer_corner_7" },
        ],
    },
};

export const generateStairs = (packId = "justblocks", textureName = "oak_planks", material, durability) => {
    const stairs = structuredClone(stairsTemplate);
    const inner = structuredClone(innerCornerTemplate);
    const outer = structuredClone(outerCornerTemplate);

    stairs["picking-item"] = `${packId}:${textureName}_stairs.item`;
    stairs.caption = textureName.replaceAll("_", " ");
    stairs.texture = textureName;

    if (material) {
        stairs.material = material;
    }
    if (durability) {
        stairs["base:durability"] = Number(durability);
    }

    const parentBlockRef = `${packId}:${textureName}_stairs`;
    inner.parent = parentBlockRef;
    outer.parent = parentBlockRef;

    return [
        { path: "blocks", filename: `${textureName}_stairs.json`, content: stairs },
        { path: "blocks", filename: `${textureName}_stairs_inner_corner.json`, content: inner },
        { path: "blocks", filename: `${textureName}_stairs_outer_corner.json`, content: outer },
    ];
};


