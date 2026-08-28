import React from "react";
import "./Footer.css";

const Footer = ({children, className }) => {
    return (
        <footer className={`footer ${className || ''}`}>
            {children}
        </footer>
    );
};

export default Footer;
