import type { HTMLAttributes, ReactNode } from "react";
import "./Footer.css";

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode,
    className?: string
}

const Footer = ({children, className }: FooterProps) => {
    return (
        <footer className={`footer ${className || ''}`}>
            {children}
        </footer>
    );
};

export default Footer;
