import Icon from "@/components/Icon/Icon";
import "./Toolbar.css";

export interface ToolbarItem {
    id: string;
    icon: string; // путь к иконке (передаётся в src компонента Icon)
    label: string; // текст для title и alt
    onClick?: () => void;
    isActive?: boolean; // активное состояние (подсветка)
    align?: "left" | "right"; // группировка, по умолчанию left
}

interface ToolbarProps {
    items: ToolbarItem[];
    className?: string;
}

export const Toolbar = ({ items, className = "" }: ToolbarProps) => {
    const leftItems = items.filter((item) => item.align !== "right");
    const rightItems = items.filter((item) => item.align === "right");

    const renderButtons = (buttonItems: ToolbarItem[]) =>
        buttonItems.map(({ id, icon, label, onClick, isActive }) => (
            <button
                key={id}
                className={`toolbar__btn ${isActive ? "toolbar__btn--active" : ""}`}
                onClick={onClick}
                title={label}
                type="button">
                <Icon src={icon} size={14}  />
            </button>
        ));

    return (
        <div className={`toolbar ${className}`}>
            <div className="toolbar__group">{renderButtons(leftItems)}</div>
            {rightItems.length > 0 && (
                <div className="toolbar__group toolbar__group--right">{renderButtons(rightItems)}</div>
            )}
        </div>
    );
};
