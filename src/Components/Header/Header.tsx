import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import React, { Component } from 'react'
import styled from 'styled-components';

interface IProps {}

/**
* @author
* @class @Header
**/

export class Header extends Component<IProps> {
 state = {}


 render(){
  return(
   <Container className="bg-light">
      <LeftSide>
         <img src="./logo-uis.gif" alt="UIS logo" />
      </LeftSide>
      <Center>
         <h2>
         Универзитет у Источном Сарајеву <br />
       Саобраћајни факултет <br />
       Добој
         </h2>
      </Center>
      <RightSide> 
         <img src="./logoSF.png" alt="SF Doboj logo" />
      </RightSide>
   </Container>
    )
   }
 }


 const Container = styled.div`
  height: 120px;
  display: flex;
  z-index: -1;
  background-color: rgb(22, 28, 45);
  overflow: hidden;
 `;

 const Fai = styled(FontAwesomeIcon)`
  color: blue;
 `;

 const LeftSide = styled.div`
    flex-grow: 2.5;
    display: flex;
    justify-content: left;
    margin-left: 80px;
    align-items: center;

    @media (max-width: 786px) {
      margin-left: 20px;
   }

    img {
       display: inline-block;
       width: 80px;
       height: 80px;
       border-radius: 50%;
    }


 `;

 const Center = styled.div`
    flex-grow: 5;
    padding: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    
    h2 {
      text-align: center;
      font-size: 26px;
      // -webkit-text-stroke: 1px #383d52;
      text-transform: uppercase;
      color: firebrick;

      :hover {
         transform: scaleX(1.2);
         transform: scaleY(1.2);

         transition: transform 0.5s ease-in;
      }
    }
 `;

 const RightSide = styled.div`
 flex-grow: 2.5;
 display: flex;
 margin-right: 80px;
 justify-content: right;
 align-items: center;

 @media (max-width: 786px) {
   margin-right: 20px;
}

 img {
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
 }
 `;