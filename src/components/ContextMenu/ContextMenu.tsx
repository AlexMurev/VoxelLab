import { useEffect } from "react";
import "./ContextMenu.css";

export interface ContextMenuItem {
    label: string;
    onClick: () => void;
    isDestructive?: boolean;
}

interface ContextMenuProps {
    x: number;
    y: number;
    items: ContextMenuItem[];
    onClose: () => void;
}

export const ContextMenu = ({ x, y, items, onClose }: ContextMenuProps) => {
    useEffect(() => {
        window.addEventListener("click", onClose);
        return () => window.removeEventListener("click", onClose);
    }, [onClose]);

    return (
        <div className="context-menu" style={{ position: "fixed", top: y, left: x, zIndex: 9999 }}>
            <ul className="context-menu__list">
                {items.map((item, index) => (
                    <li key={index} className="context-menu__item">
                        <button
                            type="button"
                            onClick={item.onClick}
                            className={`context-menu__button ${
                                item.isDestructive ? "context-menu__button--destructive" : ""
                            }`}>
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
