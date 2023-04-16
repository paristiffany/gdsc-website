import React from 'react';
import styled from 'styled-components';
import { mainHex, greenLightHex, whiteHex } from '../colors';
import { Link } from 'react-router-dom';

import SafeArea from './SafeArea';
import { appUrl } from '../App';

interface Props {
    open: boolean,
  }

const HeaderObject = styled.div`
    background: ${greenLightHex};
    color: ${mainHex};
    padding: 12px 10px;
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 10;

    @media only screen and (max-width: 768px) {
        display: none;
    }
`;

const Heading = styled.h3`
    padding: 6px 5px;
    margin: 0; 
`;


const CallToAction = styled.button`
    background: ${mainHex};
    color: ${whiteHex};
    padding: 8px 16px;
    border-radius: 25px;
    border: none;
    font-size: 16px;
    margin: 0px 12px;
`;

const MenuItem = styled.span`
    padding: 8px 14px;
    border-radius: 5px;
	border: solid 1px transparent;
    margin: 0 8px;
`;

export const menuLinkStyle = {
	color: mainHex,
	textDecoration: "none",
    fontSize: "16px"
};

export const mainLinkStyle = {
    color: mainHex,
	textDecoration: "none",
};


const menuItems = [
    {text: "Rules", link: "/rules"},
    {text: "Clues", link: "/clues"},
]

export const bttnLinkStyleAlt = {
	textDecoration: "none",
    color: "#ffffff",
};

const Subheader = () => {
    return (
        <HeaderObject>
            <SafeArea className="row spaced">
            <Link to="/" style={mainLinkStyle}><Heading>Disney AR Scavenger Hunt</Heading></Link>
                <div>
                {menuItems.map(menuItem => { 
                    return <MenuItem 
                    className="hoverable" 
                    >
                        <Link  
                            to={menuItem.link ? menuItem.link : ""}
                            style={menuLinkStyle}
                        >
                            {menuItem.text}
                        </Link>
                    </MenuItem>

                })}
                <CallToAction className="deep-hoverable">
                    <a href={appUrl} style={bttnLinkStyleAlt} target="blank">Get started</a>
                </CallToAction>
                </div>
            </SafeArea>
        </HeaderObject>
    )
}

export default Subheader;