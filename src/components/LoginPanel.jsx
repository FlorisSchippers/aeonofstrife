import React from 'react';
import LoginContainer from "../glamorous/structure/LoginContainer";
import LoginLink from '../glamorous/text/LoginLink';

class LoginPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <LoginContainer>
        <LoginLink to={'/login'}>Login</LoginLink>
        <LoginLink style={{top: '50px'}} to={'/register'}>Register</LoginLink>
      </LoginContainer>
    );
  }
}

export default LoginPanel;
