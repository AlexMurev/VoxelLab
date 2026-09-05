import "./Sidebar.css";

interface SidebarProps {
    className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
    return <aside className={`sidebar-panel ${className}`}>content</aside>;
};

export default Sidebar;
