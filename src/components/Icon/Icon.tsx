import "./Icon.css";

interface IconProps {
    src: string;
    color?: string; 
    size?: number;
    className?: string;
}

const Icon = ({ src, color, size = 16, className = "" }: IconProps) => {
    return (
        <span
            className={`sidebar__icon ${className}`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color || "currentColor",
                WebkitMaskImage: `url("${src}")`,
                maskImage: `url("${src}")`,
            }}
        />
    );
};

export default Icon;
