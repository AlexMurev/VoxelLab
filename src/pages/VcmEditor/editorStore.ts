import type { Vector3, Euler } from "three";
import { create } from "zustand";

export interface SceneObject {
    id: string;
    type: "box" | "rect";
    position: Vector3;
    rotation: Euler;
    scale: Vector3;
}

export interface EditorStore {
    objects: SceneObject[];
    selectedId: string | null;
    selectObject: (id: string | null) => void;
    addObject: (obj: Omit<SceneObject, "id">) => void;
    updateObjectTransform: (id: string, position: Vector3, rotation: Euler, scale: Vector3) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
    objects: [],
    selectedId: null,
    addObject: (obj) =>
        set((state) => {
            const newObject: SceneObject = {
                ...obj,
                id: `vcm-${obj.type}-${crypto.randomUUID()}`,
            };

            return {
                objects: [...state.objects, newObject],
                selectedId: newObject.id,
            };
        }),
    selectObject: (id) => set({ selectedId: id }),
    updateObjectTransform: (id, position, rotation, scale) =>
        set((state) => ({
            objects: state.objects.map((obj) => (obj.id === id ? { ...obj, position, rotation, scale } : obj)),
        })),
}));
