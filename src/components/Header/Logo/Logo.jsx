import React from "react";
import "./Logo.css";

const Logo = () => {
    return (
        <div className="logo-container">
            <div className="logo__box"></div>
            <div>
                <div className="logo__title">VoxelLab</div>
                <div className="logo__sub">Modding tools for VoxelCore</div>
            </div>
        </div>
    );
};

export default Logo;
