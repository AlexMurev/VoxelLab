import React from "react";
import "./FormControls.css";

const TextArea = ({ placeholder, children, ...props }) => (
    <textarea className="form-field__textarea" placeholder={placeholder} {...props} />
);
export default TextArea;
