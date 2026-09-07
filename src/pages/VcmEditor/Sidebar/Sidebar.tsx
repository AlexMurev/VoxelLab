import "./Sidebar.css";
import { Group } from "react-resizable-panels";
import type { ReactNode } from "react";

interface SidebarProps {
    className?: string;
    children?: ReactNode;
}

const Sidebar = ({children, className = "" }: SidebarProps) => {
    return (
        <aside className={`sidebar ${className}`}>
            <Group orientation="vertical">
                {children}
            </Group>
        </aside>
    );
};

export default Sidebar;
