import React from "react";
import "./Card.css";

const Card = ({ children, title, tabs = [], activeTabId, onTabChange}) => {
    return (
        <div className="card">
            <div className="card__header">
                <div className="card__title">{title}</div>

                {tabs.length > 0 && (
                    <div className="card__tab-toggle">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`card__tab-btn ${activeTabId === tab.id ? "card__tab-btn--active" : ""}`}
                                onClick={() => onTabChange(tab.id)}>
                                {tab.label}
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
