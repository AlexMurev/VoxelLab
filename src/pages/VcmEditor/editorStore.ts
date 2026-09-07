import type { Vec3 } from "@/types/vectors";
import { create } from "zustand";

const OBJECT_COLORS = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308", // Красный, Оранжевый, Янтарный, Желтый
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#14b8a6", // Лайм, Зеленый, Изумрудный, Бирюзовый
    "#06b6d4",
    "#0ea5e9",
    "#3b82f6",
    "#6366f1", // Циан, Небесный, Синий, Индиго
    "#8b5cf6",
    "#a855f7",
    "#d946ef",
    "#ec4899", // Фиолетовый, Пурпурный, Фуксия, Розовый
];

export interface SceneObject {
    id: string;
    name: string;
    color: string;
    type: "box" | "rect";
    position: Vec3;
    rotation: Vec3;
    scale: Vec3;
}

export interface EditorStore {
    objects: SceneObject[];
    selectedId: string | null;
    selectObject: (id: string | null) => void;
    addObject: (obj: Omit<SceneObject, "id" | "name" | "color">) => void;
    removeObject: (id: string) => void;
    updateObject: (id: string, updates: Partial<SceneObject>) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
    objects: [],
    selectedId: null,
    addObject: (obj) =>
        set((state) => {
            const randomColor = OBJECT_COLORS[Math.floor(Math.random() * OBJECT_COLORS.length)];

            const newObject: SceneObject = {
                ...obj,
                id: `vcm-${obj.type}-${crypto.randomUUID()}`,
                name: `${obj.type}`,
                color: `${randomColor}`,
            };

            return {
                objects: [...state.objects, newObject],
                selectedId: newObject.id,
            };
        }),
    removeObject: (id: string) =>
        set((state) => ({
            objects: state.objects.filter((o) => o.id !== id),
            selectedId: state.selectedId === id ? null : state.selectedId,
        })),
    updateObject: (id: string, updates: Partial<SceneObject>) =>
        set((state) => ({
            objects: state.objects.map((o) => (o.id === id ? { ...o, ...updates } : o)),
        })),
    selectObject: (id) => set({ selectedId: id }),
}));
