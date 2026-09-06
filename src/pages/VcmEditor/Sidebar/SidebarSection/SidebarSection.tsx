import type { ReactNode } from "react";
import "./SidebarSection.css";
import { Panel, type PanelProps } from "react-resizable-panels";

interface SidebarSectionProps extends PanelProps {
    title?: string;
    children?: ReactNode;
}

const SidebarSection = ({ title, children, ...props }: SidebarSectionProps) => {
    return (
        <Panel className="sidebar-section" {...props}>
            <div className="sidebar-section__header">
                <span className="sidebar-section__title">{title}</span>
            </div>
            {children}
        </Panel>
    );
};

export default SidebarSection;
