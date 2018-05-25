import React from 'react';
import {withRouter} from 'react-router-dom';
import Container from '../glamorous/structure/Container.jsx';
import ContentContainer from '../glamorous/structure/ContentContainer.jsx';
import SidebarPanel from './SidebarPanel';
import Title from '../glamorous/text/Title.jsx';
import LoginPanel from '../components/LoginPanel';
import FormGroup from '../glamorous/form/FormGroup';
import ControlLabel from '../glamorous/form/ControlLabel';
import FormControl from '../glamorous/form/FormControl';
import Button from '../glamorous/form/FormButton';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: ``,
      photoURL: `https://dutchdota.com/images/profile_default.jpg`,
      email: ``,
      password: ``,
      confirmpassword: ``,
    };
    // Bindings
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0 && this.state.password === this.state.confirmpassword;
  }

  handleChange = event => {
    this.setState({[event.target.id]: event.target.value});
  };

  handleSubmit = event => {
    let state = this.state;
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function (error) {
        alert(error.message);
        console.log(error);
      })
      .then(() => {
        let user = firebase.auth().currentUser;
        // TODO: Activate Email Verification
        // user.sendEmailVerification()
        //   .catch((error) => {
        //     console.log(error);
        //   });
        user.updateProfile({
          displayName: state.displayName,
          photoURL: state.photoURL,
        })
          .catch((error) => {
            console.log(error);
          });
        firestore.collection('users').add({
          email: state.email,
          displayName: state.displayName,
          photoURL: state.photoURL,
        })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            this.props.history.push('/');
          });
      });
    event.preventDefault();
  };

  render() {
    let title = `Register at Aeon of Strife`;

    return (
      <Container>
        <SidebarPanel/>
        <ContentContainer>
          <LoginPanel refresh={false}/>
          <Title>{title}</Title>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="nickname" bsSize="large">
              <ControlLabel>Display Name</ControlLabel>
              <FormControl
                autoFocus
                type="text"
                id="displayName"
                value={this.state.displayName}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email Address</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Set Password</ControlLabel>
              <FormControl
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="confirmpassword" bsSize="large">
              <ControlLabel>Confirm Password</ControlLabel>
              <FormControl
                type="password"
                id="confirmpassword"
                value={this.state.confirmpassword}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button
              type="submit"
              disabled={!this.validateForm()}
            >
              Register
            </Button>
          </form>
        </ContentContainer>
      </Container>
    );
  }
}

RegisterPage.propTypes = {};

export default withRouter(RegisterPage);
