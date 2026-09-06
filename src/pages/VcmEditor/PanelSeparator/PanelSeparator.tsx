import "./PanelSeparator.css";
import { Separator } from "react-resizable-panels";

interface SidebarProps {
	className?: string;
	type?: "vertical" | "horizontal";
}

const PanelSeparator = ({ className, type }: SidebarProps) => {
	return (
		<Separator className={`panel-separator panel-separator__${type || "vertical"} ${className}`}/>
	);
};

export default PanelSeparator;
