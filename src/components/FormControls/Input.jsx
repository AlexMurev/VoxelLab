import React from "react";
import "./FormControls.css";
import FieldWrapper from "./FieldWrapper";

const Input = ({ title, placeholder, ...props }) => (
    <FieldWrapper title={title}>
        <input className="form-field__input" placeholder={placeholder} {...props} />
    </FieldWrapper>
);

export default Input;
