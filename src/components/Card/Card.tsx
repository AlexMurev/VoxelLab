import type { HTMLAttributes, ReactNode } from "react";
import "./Card.css";

interface CardTab {
    id: string,
    title: string
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode,
    variant?: "primary" | "secondary";
    title?: string,
    tabs?: CardTab[],
    activeTabId: string,
    onTabChange: (id: string) => void
}

const Card = ({ children, title, tabs = [], activeTabId, onTabChange, ...props}: CardProps) => {
    return (
        <div className="card" {...props}>
            <div className="card__header">
                <div className="card__title">{title}</div>

                {tabs.length > 0 && (
                    <div className="card__tab-toggle">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`card__tab-btn ${activeTabId === tab.id ? "card__tab-btn--active" : ""}`}
                                onClick={() => onTabChange(tab.id)}>
                                {tab.title}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="card__content">{children}</div>
        </div>
    );
};

export default Card;
