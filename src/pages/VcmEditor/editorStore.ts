import type { Vec3 } from "@/types/vectors";
import { create } from "zustand";

export interface SceneObject {
    id: string;
    type: "box" | "rect";
    position: Vec3;
    rotation: Vec3;
    scale: Vec3;
}

export interface EditorStore {
    objects: SceneObject[];
    selectedId: string | null;
    selectObject: (id: string | null) => void;
    addObject: (obj: Omit<SceneObject, "id">) => void;
    updatePosition: (id: string, position: Vec3) => void;
    updateRotation: (id: string, rotation: Vec3) => void;
    updateScale: (id: string, scale: Vec3) => void;
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
    updatePosition: (id, position) =>
        set((state) => ({
            objects: state.objects.map((obj) => (obj.id === id ? { ...obj, position } : obj)),
        })),

    updateRotation: (id, rotation) =>
        set((state) => ({
            objects: state.objects.map((obj) => (obj.id === id ? { ...obj, rotation } : obj)),
        })),

    updateScale: (id, scale) =>
        set((state) => ({
            objects: state.objects.map((obj) => (obj.id === id ? { ...obj, scale } : obj)),
        })),
}));
