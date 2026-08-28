import React from "react";
import "./FormControls.css";

const FieldWrapper = ({ title, error, children }) => {
    return (
        <div className="field-wrapper">
            {title && <label className="field-wrapper__label">{title}</label>}

            <div className="field-wrapper__content">{children}</div>

            {error && <span className="field-wrapper__error">{error}</span>}
        </div>
    );
};

export default FieldWrapper;
