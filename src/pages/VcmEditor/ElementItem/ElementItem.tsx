import Icon from "@/components/Icon/Icon";
import  "./ElementItem.css";

interface ElementItemProps {
    name: string;
    iconSrc: string;
    iconColor?: string;
    isSelected?: boolean;
    onClick?: () => void;
}

const ElementItem = ({ name, iconSrc, iconColor, isSelected, onClick }: ElementItemProps) => {
    return (
        <div className={`element-item ${isSelected ? "element-item--selected" : ""}`} onClick={onClick}>
            <Icon src={iconSrc} color={iconColor} size={16} />
            <span className="element-item__name">{name}</span>
        </div>
    );
};

export default ElementItem;
