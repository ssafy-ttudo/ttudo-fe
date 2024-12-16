import React from "react";
import logo from '../../assets/board/logo.png'
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <img src={logo} alt="logo" />
            <button>MY PAGE</button>
        </header>
    );
}

export default Header;