import React, { Component } from 'react'
import styled from 'styled-components';
import { Button, Form, Container, Row, Col  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as api from '../../api/api';
import { ApiResponse } from '../../api/api';
import {Navigate} from 'react-router-dom';
import "./LoginPage.css";

interface IProps {}

/**
* @author
* @class @Body
**/

interface LoginPageState {
  isLoggedIn: boolean;
  username: string;
  password: string;
  message: string;
}

export class LoginPage extends Component<IProps> {
 state: LoginPageState;

 constructor(props: Readonly<{}>) {

  super(props);

    this.state = {
      isLoggedIn: false,
      username: '',
      password: '',
      message: ''
    }

 }

 private setLogginState(isLogged: boolean){
  const newState = Object.assign(this.state, {
      isLoggedIn: isLogged
  });

  this.setState(newState);
}

private setErrorMessage(message: string) {
  this.setState(
    Object.assign(this.state, {
      message: message
    })
  );
}

private formInputChanged(event: React.ChangeEvent<HTMLInputElement>){
  const newState = Object.assign(this.state,
      { [event.target.id]: event.target.value});
  
  this.setState(newState);
}

private doLogin() {
  api.login(
    {
      username: this.state.username,
      password: this.state.password
    }
  ).then((res: ApiResponse) =>{

    if(res.status === 'error'){
        this.setErrorMessage("You made an input misstake, try again!");

        return;
    }
    if(res.status === 'ok'){

        if(res.data.statusCode !== undefined){

            let message: string = '';

            switch (res.data.statusCode) {
                case -3001:
                    message = "Unknown email";
                    break;
                case -3002:
                    message = "Bad password";
                    break;
            }

            this.setErrorMessage(message);
            return;
        }

        console.log(res);
        console.log(res.data);

        api.saveAccessToken(res.data.access_token);
        api.saveRefreshToken(res.data.refresh_token);

        this.setLogginState(true);
    }
});
}


 render(){

  if(this.state.isLoggedIn){
    return (
        <Navigate to="/" />
    );
  }

  return( 
   <Container className='con-login'>
    <div className='bcg-image'>
      <div className='forma'>
       <h2 className='miniheader'>
         Aplikacija za akviziciju podataka sa arduino senzora
       </h2>
      <Form className='truebody'>
        <Row>
        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Label className='text-label' htmlFor="username">Username</Form.Label>
          <Form.Control id="username" type="text" placeholder="Enter username" value={this.state.username} onChange={(event: any) => this.formInputChanged(event)}/>
          <Form.Text className="under">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        </Row>
        <Row>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className='text-label' htmlFor="password">Password</Form.Label>
          <Form.Control id="password" value={this.state.password} type="password" placeholder="Password"  onChange={(event: any) => this.formInputChanged(event)}/>
        </Form.Group>
        <Button id="login-button" className="btn" variant="primary" type="submit" onClick={() => this.doLogin()}>
          Login
        </Button>
        </Row>
        <div className='bg-danger message'>
          <h1>
            {this.state.message}
          </h1>
        </div>
      </Form>
      </div>
      </div>
   </Container>
    )
   }

 }






const Message = styled.div`

`;