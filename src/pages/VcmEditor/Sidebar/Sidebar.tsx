import PanelSeparator from "../PanelSeparator/PanelSeparator";
import "./Sidebar.css";
import { Panel, Group } from "react-resizable-panels";

import BoxIcon from "@/assets/box.svg";
import AddIcon from "@/assets/add.svg";
import AddGroupIcon from "@/assets/add-group.svg";
import SearchIcon from "@/assets/search.svg";
import Icon from "@/components/Icon/Icon";
// import Vector3Input from "@/components/Vector3Input/Vector3Input";

interface ElementItemProps {
    name: string;
    iconSrc: string;
    iconColor?: string;
    isSelected?: boolean;
}

const ElementItem = ({ name, iconSrc, iconColor, isSelected }: ElementItemProps) => {
    return (
        <div className={`sidebar__element-item ${isSelected ? "sidebar__element-item--selected" : ""}`}>
            <Icon src={iconSrc} color={iconColor} size={16} />
            <span className="sidebar__element-name">{name}</span>
        </div>
    );
};

interface SidebarProps {
    className?: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
    return (
        <aside className={`sidebar ${className}`}>
            <Group orientation="vertical">
                <Panel minSize={250} defaultSize={250} className="sidebar__panel">
                    <div className="sidebar__section-header">
                        <span className="sidebar__section-title">Трансформ</span>
                    </div>

                    <div className="sidebar__section-content">
                        {/* <Vector3Input label="Позиция" placeholders={["0", "0", "0"]} />
                        <Vector3Input label="Размер" placeholders={["1", "1", "1"]} />
                        <Vector3Input label="Вращение" placeholders={["0°", "0°", "0°"]} /> */}
                    </div>
                </Panel>

                <PanelSeparator type="horizontal" />

                <Panel minSize={150} className="sidebar__panel">
                    <div className="sidebar__section-header">
                        <span className="sidebar__section-title">Элементы</span>
                    </div>

                    <div className="sidebar__toolbar">
                        <div className="sidebar__toolbar-group">
                            <button type="button" className="sidebar__btn-stub" title="Добавить">
                                <Icon src={AddIcon} size={20} />
                            </button>
                            <button type="button" className="sidebar__btn-stub" title="Группировать">
                                <Icon src={AddGroupIcon} size={20} />
                            </button>
                        </div>

                        <div className="sidebar__toolbar-group sidebar__toolbar-group--right">
                            <button type="button" className="sidebar__btn-stub" title="Поиск">
                                <Icon src={SearchIcon} size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="sidebar__elements-list">
                        <ElementItem name="Cube_01" iconSrc={BoxIcon} iconColor="#ef4444" isSelected />
                        <ElementItem name="Cube_02" iconSrc={BoxIcon} iconColor="#f59e0b" />
                        <ElementItem name="Cube_03" iconSrc={BoxIcon} iconColor="#3b82f6" />
                    </div>
                </Panel>
            </Group>
        </aside>
    );
};

export default Sidebar;
