import PanelSeparator from "../PanelSeparator/PanelSeparator";
import "./Sidebar.css";
import { Group } from "react-resizable-panels";

import BoxIcon from "@/assets/box.svg";
import AddIcon from "@/assets/add.svg";
import AddGroupIcon from "@/assets/add-group.svg";
import SearchIcon from "@/assets/search.svg";
import { Toolbar } from "../Toolbar/Toolbar";
import SidebarSection from "./SidebarSection/SidebarSection";
import ElementItem from "../ElementItem/ElementItem";
// import Vector3Input from "@/components/Vector3Input/Vector3Input";

interface SidebarProps {
    className?: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
    return (
        <aside className={`sidebar ${className}`}>
            <Group orientation="vertical">
                <SidebarSection minSize={250} defaultSize={250} title="Трансформ">
                    <div className="sidebar__transform-section">
                        {/* <Vector3Input label="Позиция" placeholders={["0", "0", "0"]} />
                        <Vector3Input label="Размер" placeholders={["1", "1", "1"]} />
                        <Vector3Input label="Вращение" placeholders={["0°", "0°", "0°"]} /> */}
                    </div>
                </SidebarSection>

                <PanelSeparator type="horizontal" />

                <SidebarSection minSize={150} title="Элементы">
                    <Toolbar
                        items={[
                            { id: "add", icon: AddIcon, label: "Добавить", align: "left" },
                            {
                                id: "group",
                                icon: AddGroupIcon,
                                label: "Группировать",
                                align: "left",
                            },
                            { id: "search", icon: SearchIcon, label: "Поиск", align: "right" },
                        ]}
                    />

                    <div className="sidebar__elements-list">
                        <ElementItem name="Cube_01" iconSrc={BoxIcon} iconColor="#ef4444" isSelected />
                        <ElementItem name="Cube_02" iconSrc={BoxIcon} iconColor="#f59e0b" />
                        <ElementItem name="Cube_03" iconSrc={BoxIcon} iconColor="#3b82f6" />
                    </div>
                </SidebarSection>
            </Group>
        </aside>
    );
};

export default Sidebar;
