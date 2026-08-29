import type { HTMLAttributes, ReactNode } from "react";
import "./FormControls.css";

interface FieldWrapperProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode,
    title?: string,
    error?: string
}

const FieldWrapper = ({ title, error, children }: FieldWrapperProps) => {
    return (
        <div className="field-wrapper">
            {title && <label className="field-wrapper__label">{title}</label>}

            <div className="field-wrapper__content">{children}</div>

            {error && <span className="field-wrapper__error">{error}</span>}
        </div>
    );
};

export default FieldWrapper;
