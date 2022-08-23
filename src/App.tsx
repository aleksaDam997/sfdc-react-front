import React from 'react';
import styled from 'styled-components';
import './App.css';
import { Header } from './Components/Header/Header';
import { LoginPage } from './Components/Body/LoginPage';
import { Footer } from './Components/Footer/Footer';
import {HashRouter, Routes, Route} from 'react-router-dom';
import { Body } from './Components/Body/Body';

export default class App extends React.Component {

  constructor(props: Readonly<{}>){
    super(props);

  }

   render() {

    return (
      <Container className="bg-light">
        <HashRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <Footer />
        </HashRouter>
        
      </Container>
    );
  }
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  // background-image: ${`url("/images/bg_sf_doboj.jpg")`};
  background-size: 100% 100%;
  background-origin: content-box, padding-box;
  
  // background-size: auto|length|cover|contain|initial|inherit;
  background-position: center;
  background-repeat: not-repeat;
  // display: flex;
  // flex-direction: column; //Zamjenice justify-content i align-items da rade suprotne stvari;
  // justify-content: space-between;
  // align-items: center;
  overflow-x: hidden;

`;