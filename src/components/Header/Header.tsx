import Logo from "./Logo/Logo";
import "./Header.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { NavLink, type NavLinkRenderProps } from "react-router-dom";

const NAV_LINKS = [
    { to: "/", label: "Генератор блоков" },
    { to: "/vcm-editor", label: "Модели vcm" },
    { to: "/chge", label: "Coming soon" },
];

const Header = () => {
    const getLinkClass = ({ isActive }: NavLinkRenderProps) => `header__link ${isActive ? "header__link--active" : ""}`.trim();
    return (
        <header className="header">
            <Logo />

            <nav className="header__nav">
                <ul className="header__menu">
                    {NAV_LINKS.map((link) => (
                        <li key={link.to} className="header__menu-item">
                            <NavLink to={link.to} className={getLinkClass}>
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <ThemeToggle className={"header__theme-toggle"} />
        </header>
    );
};

export default Header;
