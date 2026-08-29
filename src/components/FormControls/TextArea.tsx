import type { TextareaHTMLAttributes } from "react";
import "./FormControls.css";
import FieldWrapper from "./FieldWrapper";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholder?: string
}

const TextArea = ({ placeholder, ...props }: TextAreaProps) => (
    <FieldWrapper>
        <textarea className="form-field__textarea" placeholder={placeholder} {...props} />
    </FieldWrapper>
);
export default TextArea;
