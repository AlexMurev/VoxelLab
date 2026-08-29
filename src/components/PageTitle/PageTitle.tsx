import type { HTMLAttributes, ReactNode } from "react";
import "./PageTitle.css";

interface PageTitleProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode,
    text?: string,
    subtext?: string
}

const PageTitle = ({children, text, subtext}: PageTitleProps) => {
    return (
        <div className="page-title">
            <div className="page-title__content">
                <h1>{text}</h1>
                <p>{subtext}</p>
                {children}
            </div>
        </div>
    );
};

export default PageTitle;
