import React from 'react';
import styled from 'styled-components';
import { mainHex, whiteHex } from '../colors';

import { Link, Route, Routes } from 'react-router-dom';
import logo from '../resources/Logo.png';

const HeaderObject = styled.div`
    background: ${mainHex};
    color: ${whiteHex};
    padding: 10px;
    display: flex;
    justify-content: space-between;
`;

const Logo = styled.img`
    height: 60px;
    margin-left: 10px;
`;

const Menu = styled.div`
    padding: 5px 10px;
`;

const MenuItem = styled.span`
    padding: 10px 12px;
    margin: 5px;
    border-radius: 3px;
    font-size: 16px;
`;

const CallToAction = styled.button`
    background: ${whiteHex};
    color: ${mainHex};
    padding: 10px 14px;
    margin: 6px 12px;
    border-radius: 3px;
    border: none;
    font-size: 16px;
`;

// thinking of adding these items to a remote source, where they can automatically be updated for each sub-website
const menuItems = [
    {text: "AI/ML"},
    {text: "Cybersecurity"},
    {text: "Game Jam"},
]

const Header = () => {
    return (
        <HeaderObject>
            <Link to="/"><Logo src={logo} /></Link>		
            <Menu>
                {menuItems.map(menuItem => {
                    return <MenuItem className="hoverable">{menuItem.text}</MenuItem>
                })}
                <CallToAction className="hoverable">Join us</CallToAction>
            </Menu>
        </HeaderObject>
    )
}

export default Header;