import React from 'react';
import {withRouter} from 'react-router-dom';
import LoginContainer from "../glamorous/login/LoginContainer";
import LoginLink from '../glamorous/login/LoginLink';
import LoginButton from '../glamorous/login/LoginButton';

class LoginPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: ``,
    };
  }

  componentDidMount() {
    let currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
      this.setState({login: currentUser});
    }
  }

  logout = event => {
    event.preventDefault();
    firebase.auth().signOut()
      .catch((error) => {
        alert(error.message);
      })
      .then(() => {
        this.setState({login: ``});
        this.props.history.push('/');
      });
  };

  render() {
    if (this.state.login === ``) {
      return (
        <LoginContainer>
          <LoginLink to={'/login'}>Login</LoginLink>
          <LoginLink style={{top: '50px'}} to={'/register'}>Register</LoginLink>
        </LoginContainer>
      );
    } else {
      return (
        <LoginContainer>
          <LoginLink to={'/users/me'}>{this.state.login.displayName}</LoginLink>
          <LoginButton onClick={this.logout}>Logout</LoginButton>
        </LoginContainer>
      );
    }
  }
}

export default withRouter(LoginPanel);
