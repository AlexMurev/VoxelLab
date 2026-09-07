import { useState } from "react";
import { useEditorStore } from "../editorStore"; 
import { ContextMenu, type ContextMenuItem } from "@/components/ContextMenu/ContextMenu";
import "./ElementsList.css";
import BoxIcon from "@/assets/box.svg";
import RectIcon from "@/assets/rect.svg";
import ElementItem from "./ElementItem/ElementItem";

type MenuState = {
    x: number;
    y: number;
    targetId: string;
    targetName: string;
} | null;

export const ElementsList = () => {
    const { objects, selectedId, selectObject, removeObject, updateObject } = useEditorStore();
    const [menu, setMenu] = useState<MenuState>(null);

    const handleContextMenu = (e: React.MouseEvent, id: string, name: string) => {
        e.preventDefault();
        e.stopPropagation();

        setMenu({
            x: e.clientX,
            y: e.clientY,
            targetId: id,
            targetName: name,
        });
    };

    const handleCloseMenu = () => setMenu(null);

    const getMenuItems = (targetId: string, targetName: string): ContextMenuItem[] => [
        {
            label: "Переименовать",
            onClick: () => {
                const newName = prompt("Введите новое имя:", targetName);
                if (newName && newName.trim() !== "") {
                    updateObject(targetId, { name: newName.trim() });
                }
            },
        },
        {
            label: "Удалить",
            isDestructive: true,
            onClick: () => {
                removeObject(targetId);
            },
        },
    ];

    return (
        <div className="elements-list">
            {objects.map((obj) => (
                <ElementItem
                    key={obj.id}
                    name={obj.name}
                    iconSrc={obj.type === "box" ? BoxIcon : RectIcon}
                    iconColor={obj.color}
                    isSelected={obj.id === selectedId}
                    onClick={() => selectObject(obj.id)}
                    onContextMenu={(e) => handleContextMenu(e, obj.id, obj.name)}
                />
            ))}

            {menu && (
                <ContextMenu
                    x={menu.x}
                    y={menu.y}
                    items={getMenuItems(menu.targetId, menu.targetName)}
                    onClose={handleCloseMenu}
                />
            )}
        </div>
    );
};
