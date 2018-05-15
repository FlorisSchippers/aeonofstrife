import React from 'react';
import Container from '../glamorous/structure/Container.jsx';
import ContentContainer from '../glamorous/structure/ContentContainer.jsx';
import SidebarPanel from './SidebarPanel';
import Title from '../glamorous/text/Title.jsx';
import LoginPanel from "../glamorous/structure/LoginContainer";
import LoginLink from '../glamorous/text/LoginLink';
import FormGroup from '../glamorous/form/FormGroup';
import ControlLabel from '../glamorous/form/ControlLabel';
import FormControl from '../glamorous/form/FormControl';
import Button from '../glamorous/form/Button';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ``,
      password: ``,
    };
    // Bindings
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    console.log(event);
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    console.log('submitted, ', this.state);
    event.preventDefault();
  };

  render() {
    let title = `Login to Aeon of Strife`;

    return (
      <Container>
        <SidebarPanel/>
        <ContentContainer>
          <LoginPanel>
            <LoginLink to={'/login'}>Login</LoginLink>
            <LoginLink style={{top: '50px'}} to={'/register'}>Register</LoginLink>
          </LoginPanel>
          <Title>{title}</Title>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button
              type="submit"
              disabled={!this.validateForm()}
            >
              Login
            </Button>
          </form>
        </ContentContainer>
      </Container>
    );
  }
}

LoginPage.propTypes = {};

export default LoginPage;
