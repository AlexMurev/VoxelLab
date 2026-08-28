import React from "react";
import "./FormControls.css";
import FieldWrapper from "./FieldWrapper";

const Select = ({ title, children, ...props }) => (
    <FieldWrapper title={title}>
        <div className="form-field__select-wrapper">
            <select className="form-field__select" {...props}>
                {children}
            </select>
        </div>
    </FieldWrapper>
);

export default Select;
