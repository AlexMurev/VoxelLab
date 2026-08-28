import React from "react";
import Logo from "./Logo/Logo";
import "./Header.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Header = () => {
    return (
        <header className="header">
            <Logo />

            <nav className="header__nav">
                <ul className="header__menu">
                    <li className="header__menu-item">
                        <a href="/#" className="header__link header__link--active">
                            Генератор блоков
                        </a>
                    </li>
                    <li className="header__menu-item">
                        <a href="/#" className="header__link">
                            Модели vcm
                        </a>
                    </li>
                    <li className="header__menu-item">
                        <a href="/#" className="header__link">
                            Coming soon
                        </a>
                    </li>
                </ul>
            </nav>

            <ThemeToggle className={"header__theme-toggle"} />
        </header>
    );
};

export default Header;
