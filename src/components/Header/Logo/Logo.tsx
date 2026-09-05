import "./Logo.css";

const Logo = () => {
    return (
        <div className="logo-container">
            <div className="logo__box">
                <img src={`${import.meta.env.BASE_URL}favicon.png`}/>
            </div>
            <div>
                <div className="logo__title">VoxelLab</div>
                <div className="logo__sub">Modding tools for VoxelCore</div>
            </div>
        </div>
    );
};

export default Logo;
