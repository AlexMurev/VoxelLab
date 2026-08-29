import type { SelectHTMLAttributes, ReactNode } from "react";
import "./FormControls.css";
import FieldWrapper from "./FieldWrapper";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    children?: ReactNode,
    title?: string
}

const Select = ({ title, children, ...props }: SelectProps) => (
    <FieldWrapper title={title}>
        <div className="form-field__select-wrapper">
            <select className="form-field__select" {...props}>
                {children}
            </select>
        </div>
    </FieldWrapper>
);

export default Select;
