import type { InputHTMLAttributes } from "react";
import "./FormControls.css";
import FieldWrapper from "./FieldWrapper";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    title?: string,
    placeholder?: string
}

const Input = ({ title, placeholder, ...props }: InputProps) => (
    <FieldWrapper title={title}>
        <input className="form-field__input" placeholder={placeholder} {...props} />
    </FieldWrapper>
);

export default Input;
