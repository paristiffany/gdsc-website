import React from 'react';
import styled from 'styled-components';
import { mainHex } from '../../colors';

import placeholder from '../../resources/header-graphic.svg';
import grid from '../../resources/redGrid.png';
import SafeArea, { RowContainer } from '../../components/SafeArea';

import { Link, Route, Routes } from 'react-router-dom';

const margin = "margin: 10px 20px;";

const Page = styled.div`
    color: ${mainHex};
    padding: 0 20px;
    height: calc(100vh - 145px);
    text-align: left;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: url(${grid});
    background-repeat: repeat;
    background-size: contain;

    @media only screen and (max-width: 768px) {
        height: auto;
        padding: 75px 0;
    } 

    @media only screen and (max-width: 425px) {
        height: auto;
        padding: 50px 0;
    } 
`;

const Content = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 50%;

    @media only screen and (max-width: 768px) {
        padding: 5px;
        width:100%;
        justify-content: center;
        align-items: center;
    } 

    @media only screen and (max-width: 525px) {
        padding: 1px;
    } 
`;

const ButtonGroup = styled.div`
    display: flex;

    @media only screen and (max-width: 768px) {
        justify-content: center;
        align-items: center;
    } 
`;

export const bttnLinkStyle = {
	textDecoration: "none",
    color: "#ffffff",
};

export const bttnLinkStyleAlt = {
	textDecoration: "none",
    color: "#EA4335",
};

const ButtonMain = styled.div`
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
    background-color: ${mainHex};
    color: #ffffff;
    border: 1px solid ${mainHex};
    margin: 10px 5px 10px 20px;
    border-radius: 3px;

    @media only screen and (max-width: 1024px) {
        margin: 10px 5px 10px 5px;
    } 

    @media only screen and (max-width: 425px) {
        font-size: calc(8px + 1vmin);
        padding: 8px 12px;
    } 
`;

const ButtonAlt = styled.div`
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    color: ${mainHex};
    border: 1px solid ${mainHex};
    margin: 10px 5px 10px 5px;
    border-radius: 3px;


    @media only screen and (max-width: 1024px) {
        margin: 10px 5px 10px 5px;
    }

    @media only screen and (max-width: 425px) {
        font-size: calc(8px + 1vmin);
        padding: 8px 12px;

    } 
`;

export const Title = styled.h1`
    font-size: calc(35px + 1vmin);
    color: #000000;
    ${margin}

    @media only screen and (max-width: 1024px) {
        font-size: calc(25px + 1vmin);
    }    

    @media only screen and (max-width: 768px) {
        text-align: center;  
        font-size: calc(25px + 1vmin);
    } 

    @media only screen and (max-width: 425px) {
        font-size: calc(20px + 1vmin);
    } 

    @media only screen and (max-width: 268px) {
        font-size: calc(26px + 1vmin);
    }
`;

export const Text = styled.p`
    ${margin}
    color: #3a3a3a;
    font-size: calc(12px + 1vmin);
    line-height: 1.5em;

    @media only screen and (max-width: 1024px) {
        font-size: calc(12px + 1vmin);
        line-height: 1.5em;
    }   

    @media only screen and (max-width: 768px) {
        text-align: center; 
    }

    @media only screen and (max-width: 425px) {
        font-size: calc(10px + 1vmin);
    } 

    @media only screen and (max-width: 268px) {
        font-size: calc(14px + 1vmin);
    }
`;




const Image = styled.img`
    // width: 450px;
    margin: 0;

    @media only screen and (max-width: 1024px) {
        width: 400px;  
    }

    @media only screen and (max-width: 768px) {
        width: 80%;  
    }

    @media only screen and (max-width: 525px) {
        width: 360px;  
    }
    
    @media only screen and (max-width: 435px) {
        width: 100%;
    }
`;

function Home() {
    return (
        <Page>
            <SafeArea>
                <RowContainer>
                    <Content>
                        <Title>GAME JAM @ Google Developers Student Club | USYD</Title>
                        <Text>A game jam is an event where participants try to make a video game from scratch. Join us this year at Game Jam Week 2022.</Text>
                        <ButtonGroup>
                            <ButtonMain><Link to="/event" style={bttnLinkStyle}>Learn More</Link></ButtonMain>
                            <ButtonAlt><a href="https://profile.gdscusyd.org/sign-in" style={bttnLinkStyleAlt} target="blank">Register</a></ButtonAlt>
                        </ButtonGroup>
                    </Content>
                    <Content>
                        <Image src={placeholder} />
                    </Content>
                </RowContainer>
            </SafeArea>
        </Page>
    );
}

export default Home;
