import { useNavigate } from "react-router-dom";
import Button from "@/components/Button/Button"; 
import "./NotFound.css";

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => navigate("/");

    return (
        <div className="not-found">
            <div className="not-found__card">
                <div className="not-found__icon-container">
                    <svg
                        xmlns="http://w3.org"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="not-found__icon">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244m6.513-2.513 1.157-1.157M12 12l1.157-1.157m0 0 1.157-1.157M12 12l-1.157 1.157m0 0-1.157 1.157M12 12l1.157 1.157M12 12l-1.157-1.157"
                        />
                    </svg>
                </div>

                <h1 className="not-found__title">404</h1>
                <h2 className="not-found__subtitle">Страница не найдена</h2>
                <p className="not-found__description">
                    Похоже, этот адрес не существует, был изменен или временно недоступен. Проверьте правильность
                    написания URL.
                </p>

                <div className="not-found__button-group">
                    <Button variant="primary" onClick={handleGoHome}>
                        На главную
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;