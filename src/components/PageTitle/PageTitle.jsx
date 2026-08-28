import React from "react";
import "./PageTitle.css";

const PageTitle = ({children, text, subtext}) => {
    return (
        <div className="page-title">
            <div className="page-title__content">
                <h1>{text}</h1>
                <p>{subtext}</p>
            </div>
        </div>
    );
};

export default PageTitle;
