import Icon from "@/components/Icon/Icon";
import  "./ElementItem.css";
import type { HTMLAttributes } from "react";

interface ElementItemProps extends HTMLAttributes<HTMLDivElement> {
    name: string;
    iconSrc: string;
    iconColor?: string;
    isSelected?: boolean;
}

const ElementItem = ({ name, iconSrc, iconColor, isSelected, ...props }: ElementItemProps) => {
    return (
        <div className={`element-item ${isSelected ? "element-item--selected" : ""}`} {...props}>
            <Icon src={iconSrc} color={iconColor} size={16} />
            <span className="element-item__name">{name}</span>
        </div>
    );
};

export default ElementItem;
