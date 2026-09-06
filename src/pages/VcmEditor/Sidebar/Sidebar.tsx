import PanelSeparator from "../PanelSeparator/PanelSeparator";
import "./Sidebar.css";
import { Panel, Group } from "react-resizable-panels";

import BoxIcon from "@/assets/box.svg";
import AddIcon from "@/assets/add.svg";
import AddGroupIcon from "@/assets/add-group.svg";
import SearchIcon from "@/assets/search.svg";
import Icon from "@/components/Icon/Icon";

interface SidebarProps {
    className?: string;
}

interface Vector3InputProps {
    label: string;
    placeholders?: [string, string, string];
}

const Vector3Input = ({ label, placeholders = ["0", "0", "0"] }: Vector3InputProps) => {
    return (
        <div className="sidebar__field">
            <label className="sidebar__label">{label}</label>
            <div className="sidebar__transform-group">
                <div className="sidebar__input-wrapper">
                    <span className="sidebar__axis-label sidebar__axis-label--x">X</span>
                    <input type="number" className="sidebar__input" placeholder={placeholders[0]} />
                </div>
                <div className="sidebar__input-wrapper">
                    <span className="sidebar__axis-label sidebar__axis-label--y">Y</span>
                    <input className="sidebar__input" placeholder={placeholders[1]} />
                </div>
                <div className="sidebar__input-wrapper">
                    <span className="sidebar__axis-label sidebar__axis-label--z">Z</span>
                    <input className="sidebar__input" placeholder={placeholders[2]}/>
                </div>
            </div>
        </div>
    );
};

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

// --- Основной компонент ---

const Sidebar = ({ className = "" }: SidebarProps) => {
    return (
        <aside className={`sidebar ${className}`}>
            <Group orientation="vertical">
                {/* Секция 1: Трансформ */}
                <Panel minSize={250} defaultSize={250} className="sidebar__panel">
                    <div className="sidebar__section-header">
                        <span className="sidebar__section-title">Трансформ</span>
                    </div>

                    <div className="sidebar__section-content">
                        <Vector3Input label="Позиция" placeholders={["0", "0", "0"]} />
                        <Vector3Input label="Размер" placeholders={["1", "1", "1"]} />
                        <Vector3Input label="Вращение" placeholders={["0°", "0°", "0°"]} />
                    </div>
                </Panel>

                <PanelSeparator type="horizontal" />

                {/* Секция 2: Элементы */}
                <Panel minSize={150} className="sidebar__panel">
                    <div className="sidebar__section-header">
                        <span className="sidebar__section-title">Элементы</span>
                    </div>

                    {/* Панель инструментов */}
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

                    {/* Контейнер списка объектов */}
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
