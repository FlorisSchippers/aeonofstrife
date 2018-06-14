import React from 'react';
import {withRouter} from 'react-router-dom';
import Container from '../glamorous/structure/Container.jsx';
import ContentContainer from '../glamorous/structure/ContentContainer.jsx';
import SidebarPanel from './SidebarPanel';
import Title from '../glamorous/text/Title.jsx';
import LoginPanel from '../components/LoginPanel';
import FormGroup from '../glamorous/form/FormGroup';
import FormLabel from '../glamorous/form/FormLabel';
import FormControl from '../glamorous/form/FormControl';
import FormButton from '../glamorous/form/FormButton';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: ``,
      email: ``,
      password: ``,
      confirmPassword: ``,
      photoURL: `/images/default-image.jpg`,
      skillRating: ``,
      captain: false,
      team: ``,
    };
    // Bindings
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm() {
    return this.state.displayName.length > 0 && this.state.email.length > 0 && this.state.password.length > 0 && this.state.password === this.state.confirmPassword;
  }

  handleChange = event => {
    this.setState({[event.target.id]: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    let state = this.state;
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function (error) {
        alert(error.message);
      })
      .then(() => {
        let user = firebase.auth().currentUser;
        // TODO: Activate Email Verification
        // user.sendEmailVerification()
        //   .catch((error) => {
        //     alert(error.message);
        //   });
        user.updateProfile({
          displayName: state.displayName,
          photoURL: state.photoURL,
        })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firestore.collection('users').add({
              email: state.email,
              displayName: state.displayName,
              photoURL: state.photoURL,
              skillRating: state.skillRating,
              captain: state.captain,
              team: state.team,
            })
              .catch((error) => {
                alert(error.message);
              })
              .then(() => {
                this.props.history.push('/');
              });
          });
      });
  };

  render() {
    return (
      <Container>
        <SidebarPanel/>
        <ContentContainer>
          <LoginPanel/>
          <Title>Register at Aeon of Strife</Title>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="displayName" bsSize="large">
              <FormLabel>Display Name</FormLabel>
              <FormControl
                autoFocus
                type="text"
                id="displayName"
                value={this.state.displayName}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="email" bsSize="large">
              <FormLabel>Email Address</FormLabel>
              <FormControl
                type="email"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <FormLabel>Set Password</FormLabel>
              <FormControl
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="confirmPassword" bsSize="large">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl
                type="password"
                id="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormButton type="submit" disabled={!this.validateForm()}>
              Register
            </FormButton>
          </form>
        </ContentContainer>
      </Container>
    );
  }
}

RegisterPage.propTypes = {};

export default withRouter(RegisterPage);
