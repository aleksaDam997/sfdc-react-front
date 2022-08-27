import React, { Component } from 'react';
import styled from 'styled-components';
import { gsap, TweenLite, TimelineMax } from 'gsap';
import "./Footer.css";
import { Container, Row, Col } from 'react-bootstrap';

interface IProps {}

/**
* @author
* @class @Footer
**/

export class Footer extends Component<IProps> {
 state: {
   element: HTMLDivElement | null,
   tl: GSAPTween | null,
   animate: boolean
 };

 constructor(props: Readonly<{}>) {
   super(props);

   gsap.registerPlugin(TweenLite);

   this.state = {
     element: null,
     tl: null,
     animate: true
   }
 }

 footerAnimataion(div: any, animate: boolean) {

  if(animate){
    this.setState({
      element: div,
      tl: TweenLite.to(this.state.element, 2, {x: "800px"}),
      animate: false
    })
  }
 }


 render(){

  const {animate} = this.state;

  return(
   <Container className="footer-con">
    <Row className='row-footer'>
      <Col lg={4}>
        <h6>Локација</h6>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11336.723625041572!2d18.091186!3d44.7363259!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x86c782d35e303d8!2sSaobra%C4%87ajni%20fakultet%20Doboj!5e0!3m2!1sen!2sba!4v1647194079992!5m2!1sen!2sba" 
        width="300" height="200" ></iframe>
      </Col>
      <Col lg={4}>
        <h6 >Линкови</h6>
        <a href="https://www.ues.rs.ba" className='link'>Универзитет у Источном Сарајеву</a> 
        <a href="https://elearning.sf.ues.rs.ba" className='link'>Платформа за електронско учење-Саобраћајни</a> 
        <a href="https://infokiosk.ues.rs.ba" className='link'>Студентски инфо киоск</a>
      </Col>
      <Col lg={4}>
        <h6>Контакт</h6>
        <p className='contact'>Саобраћајни факултет Добој</p>
        <p className='contact'>Адреса: Војводе Мишића бр. 52</p>
        <p className='contact'>Телефон: 053 200 100</p>
        <p className='contact'>емаил: dekanat@sf.ues.rs.ba</p>
        {/* <mat-icon class="mat-icon-rtl-mirror">facebook</mat-icon>
        <img mat-icon src="/assets/icons8-instagram.svg"> */}
      </Col>
    </Row>
  </Container>
    );
   }
 }



 
