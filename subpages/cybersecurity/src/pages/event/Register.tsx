import React from 'react';
import styled from 'styled-components';
import { mainHex } from '../../colors';
import SafeArea, { RowContainer } from '../../components/SafeArea';


const margin = "margin: 10px 20px;";


const Page = styled.div`
    background-color: ${mainHex};
    color:: #000000;
    padding: 40px 0;
    text-align: left;
    display: flex;
    flex-direction: row;
    align-items: center;

    @media only screen and (max-width: 768px) {
        height: auto;
        padding: 75px 0;
    } 

    @media only screen and (max-width: 425px) {
        padding: 50px 0;

    } 
`;


const Content = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 25px 0;

    @media only screen and (max-width: 768px) {
        padding: 5px;
    } 

    @media only screen and (max-width: 525px) {
        padding: 1px;
    } 
`;


const ButtonGroup = styled.div`
    display: flex;
`;



const ButtonAlt = styled.div`
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    color: ${mainHex};
    border: 1px solid ${mainHex};
    margin: 10px 5px 10px 20px;
    border-radius: 3px;
`;

export const Title = styled.h1`
    font-size: calc(35px + 1vmin);
    color: #ffffff;
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
`;

export const Text = styled.p`
    ${margin}
    color: #ffffff;
    font-size: calc(12px + 1vmin);
    line-height: 1.5em;
    text-align: center;

    @media only screen and (max-width: 1024px) {
        font-size: calc(12px + 1vmin);
        line-height: 1.5em;
    }   

    @media only screen and (max-width: 768px) {
        text-align: center; 
    }

    @media only screen and (max-width: 425px) {
        margin: 0 0 15px 0;
        font-size: calc(10px + 1vmin);
    } 
`;


export const bttnLinkStyleAlt = {
	textDecoration: "none",
    color: "#34A853",
};

function Home() {
    return (
        <Page id="register">
            <SafeArea>
                <Content>
                    <Title>Interested? Register Now!</Title>
                    <Text>Capture the Flag starts on 3rd October at 9am.</Text>
                    <ButtonGroup>
                    <ButtonAlt><a href="https://competitions.gdscusyd.org/" style={bttnLinkStyleAlt} target="blank">Get started</a></ButtonAlt>
                    </ButtonGroup>
                </Content>
            </SafeArea>
        </Page>
    );
}

export default Home;
