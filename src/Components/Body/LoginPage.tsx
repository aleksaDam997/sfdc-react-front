import React, { Component } from 'react'
import styled from 'styled-components';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as api from '../../api/api';
import { ApiResponse } from '../../api/api';
import {Navigate} from 'react-router-dom';

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
   <Container>
     <MiniHeader>
       <h2>
         Aplikacija za akviziciju podataka sa arduino senzora
       </h2>
     </MiniHeader>
     <TrueBody>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control id="username" type="text" placeholder="Enter username" value={this.state.username} onChange={(event: any) => this.formInputChanged(event)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control id="password" value={this.state.password} type="password" placeholder="Password"  onChange={(event: any) => this.formInputChanged(event)}/>
        </Form.Group>
        <Button id="login-button" className="btn btn-block" variant="primary" type="submit" onClick={() => this.doLogin()}>
          Login
        </Button>
        <Message className='bg-danger'>
          <h1>
            {this.state.message}
          </h1>
        </Message>
        
      </Form>
    </TrueBody>
   </Container>
    )
   }

 }

 const Container = styled.div`
 display: block;
 float: none;
 width: 80vw;
 margin: 0 auto;
 height: calc(100vh - 200px);
 color: white;

 background-position: center;
 background-repeat: no-repeat;
 /*background-attachment: fixed;*/
 background-size: cover;
 background-image: url("./login_bg2.jpg");
// background-color: rgba(0, 0, 0, 0.2);


 //#2f34d8


`;

const MiniHeader = styled.div`
  margin: 0;
  padding: 30px;

  h2 {
    margin: 0;
    text-align: center;
    color: white;
  }
`;

const TrueBody = styled.div`

display: block;
float: none;
width: 60%;
margin: 0 auto;

`;

const Message = styled.div`

`;