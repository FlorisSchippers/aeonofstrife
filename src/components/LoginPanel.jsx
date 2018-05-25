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
    if (currentUser !== null && currentUser.hasOwnProperty('displayName')) {
      this.setState({login: currentUser});
    }
  }

  logout = event => {
    firebase.auth().signOut();
    this.setState({login: `loggedOut`});
    this.props.history.push('/');
    event.preventDefault();
  };

  render() {
    if (this.state.login === `` && this.props.refresh !== null && this.props.refresh.hasOwnProperty('displayName')) {
      return (
        <LoginContainer>
          <LoginLink to={'/users/' + this.props.refresh.displayName}>{this.props.refresh.displayName}</LoginLink>
          <LoginButton onClick={this.logout}>Logout</LoginButton>
        </LoginContainer>
      );
    } else if (this.state.login.hasOwnProperty('displayName')) {
      return (
        <LoginContainer>
          <LoginLink to={'/users/' + this.state.login.displayName}>{this.state.login.displayName}</LoginLink>
          <LoginButton onClick={this.logout}>Logout</LoginButton>
        </LoginContainer>
      );
    } else {
      return (
        <LoginContainer>
          <LoginLink to={'/login'}>Login</LoginLink>
          <LoginLink style={{top: '50px'}} to={'/register'}>Register</LoginLink>
        </LoginContainer>
      );
    }
  }
}

export default withRouter(LoginPanel);
