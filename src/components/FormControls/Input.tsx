import type { InputHTMLAttributes } from "react";
import "./FormControls.css";
import FieldWrapper from "./FieldWrapper";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    title?: string;
    placeholder?: string;
    className?: string;
}

const Input = ({ title, placeholder, className, ...props }: InputProps) => (
    <FieldWrapper title={title}>
        <input className={`form-field__input ${className}`} placeholder={placeholder} {...props} />
    </FieldWrapper>
);

export default Input;
