import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import React, { Component } from 'react'
// import styled from 'styled-components';
import {Link} from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import "./Header.css";

interface IProps {}

/**
* @author
* @class @Header
**/

export class Header extends Component<IProps> {
 state = {}


 render(){
  return(
   <Container className="bg-light container-header">
      <Row>
         <Col  className='header-col'>
               <a target="_blank" href="https://www.ues.rs.ba/"><img className='header-img' src="./logo-uis.gif" alt="UIS logo" /></a>
         </Col>
         <Col>
               <h2 className='fax'>
                  Универзитет у Источном Сарајеву <br />
                  Саобраћајни факултет <br />
                  Добој
               </h2>
         </Col>
         <Col className='header-col'>
               <a target="_blank" href='http://sf.ues.rs.ba/'><img className='header-img' src="./logoSF.png" alt="SF Doboj logo" /></a>
         </Col>
      </Row>
   </Container>
    )
   }
 }


 