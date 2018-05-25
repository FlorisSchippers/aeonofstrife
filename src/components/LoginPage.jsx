import React from 'react';
import {withRouter} from 'react-router-dom';
import Container from '../glamorous/structure/Container.jsx';
import ContentContainer from '../glamorous/structure/ContentContainer.jsx';
import SidebarPanel from './SidebarPanel';
import Title from '../glamorous/text/Title.jsx';
import LoginPanel from './LoginPanel';
import FormGroup from '../glamorous/form/FormGroup';
import ControlLabel from '../glamorous/form/ControlLabel';
import FormControl from '../glamorous/form/FormControl';
import FormButton from '../glamorous/form/FormButton';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ``,
      password: ``,
      login: ``,
    };
    // Bindings
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => {
        alert(error.message);
      })
      .then((data) => {
        this.setState({login: data});
        this.props.history.push('/');
      });
    event.preventDefault();
  };

  render() {
    let title = `Login to Aeon of Strife`;

    return (
      <Container>
        <SidebarPanel/>
        <ContentContainer>
          <LoginPanel refresh={this.state.login}/>
          <Title>{title}</Title>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormButton
              type="submit"
              disabled={!this.validateForm()}
            >
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
