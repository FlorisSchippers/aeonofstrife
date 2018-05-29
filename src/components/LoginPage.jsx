import React from 'react';
import {withRouter} from 'react-router-dom';
import SidebarPanel from './SidebarPanel';
import LoginPanel from './LoginPanel';
import Container from '../glamorous/structure/Container.jsx';
import ContentContainer from '../glamorous/structure/ContentContainer.jsx';
import Title from '../glamorous/text/Title.jsx';
import FormGroup from '../glamorous/form/FormGroup';
import FormLabel from '../glamorous/form/FormLabel';
import FormControl from '../glamorous/form/FormControl';
import FormButton from '../glamorous/form/FormButton';

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
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => {
        alert(error.message);
      })
      .then(() => {
        this.props.history.push('/');
      });
  };

  render() {
    return (
      <Container>
        <SidebarPanel/>
        <ContentContainer>
          <LoginPanel/>
          <Title>Login to Aeon of Strife</Title>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <FormLabel>Email</FormLabel>
              <FormControl
                autoFocus
                type="email"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormButton type="submit" disabled={!this.validateForm()}>
              Login
            </FormButton>
          </form>
        </ContentContainer>
      </Container>
    );
  }
}

LoginPage.propTypes = {};

export default withRouter(LoginPage);
