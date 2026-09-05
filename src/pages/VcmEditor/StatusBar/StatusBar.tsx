import "./StatusBar.css";

interface StatusBarProps {
	items: [string?, string?][];
    className?: string;
}

const StatusBar = ({items, className}:StatusBarProps) => {
    return (
        <div className={`status-bar ${className}`}>
            {items.filter((item): item is [string, string] => Boolean(item[0]?.trim() && item[1]?.trim())).map((item) => (
                <span key={item[0]} className="status-bar__item">
                    <span className="status-bar__label">{item[0]}</span>
                    <span className="status-bar__value">{item[1]}</span>
                </span>
            ))}
        </div>
    );
};

export default StatusBar;
