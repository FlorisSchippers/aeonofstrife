import React from 'react';
import {withRouter} from 'react-router-dom';
import Container from '../glamorous/structure/Container.jsx';
import ContentContainer from '../glamorous/structure/ContentContainer.jsx';
import SidebarPanel from './SidebarPanel';
import BackButton from '../glamorous/buttons/BackButton';
import Title from '../glamorous/text/Title.jsx';
import LoginPanel from '../components/LoginPanel';
import FormGroup from '../glamorous/form/FormGroup';
import FormLabel from '../glamorous/form/FormLabel';
import FormControl from '../glamorous/form/FormControl';
import FormButton from '../glamorous/form/FormButton';

class NewTeamPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: ``,
      photoURL: `/images/default-image.jpg`,
      joinCode: ``,
      confirmJoinCode: ``,
    };
    // Bindings
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    let currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
      if (this.props.location.state !== undefined) {
        if (this.props.location.state.teamId !== undefined) {
          this.props.history.push('/');
        }
      } else {
        this.props.history.push('/');
      }
    } else {
      this.props.history.push('/');
    }
  }

  validateForm() {
    return this.state.displayName.length > 0 && this.state.photoURL.length > 0 && this.state.joinCode.length > 0 && this.state.joinCode === this.state.confirmJoinCode;
  }

  handleChange = event => {
    this.setState({[event.target.id]: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    let beta = {};
    beta[this.props.location.state.userId] = true;
    firestore.collection('teams').add({
      displayName: this.state.displayName,
      photoURL: this.state.photoURL,
      joinCode: this.state.joinCode,
      players: beta,
    })
      .catch((error) => {
        alert(error.message);
      })
      .then(() => {
        firestore.collection('teams').where('displayName', '==', this.state.displayName).get()
          .catch((error) => {
            alert(error.message);
          })
          .then((teamQuerySnapshot) => {
            let teamId = ``;
            teamQuerySnapshot.forEach((teamDocSnapshot) => {
              teamId = teamDocSnapshot.id;
            });
            let data = {team: teamId};
            firestore.collection('users').doc(this.props.location.state.userId).update(data)
              .catch((error) => {
                alert(error.message);
              })
              .then(() => {
                this.props.history.push('/users/me');
              });
          });
      });
  };

  render() {
    return (
      <Container>
        <BackButton to={'/teams'}/>
        <SidebarPanel/>
        <ContentContainer>
          <LoginPanel/>
          <Title>Create a new team</Title>
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
            <FormGroup controlId="photoURL" bsSize="large">
              <FormLabel>Photo URL</FormLabel>
              <FormControl
                type="text"
                id="photoURL"
                value={this.state.photoURL}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="joinCode" bsSize="large">
              <FormLabel>Set join code</FormLabel>
              <FormControl
                type="password"
                id="joinCode"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="confirmJoinCode" bsSize="large">
              <FormLabel>Confirm joincode</FormLabel>
              <FormControl
                type="password"
                id="confirmJoinCode"
                value={this.state.confirmJoinCode}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormButton type="submit" disabled={!this.validateForm()}>
              Create
            </FormButton>
          </form>
        </ContentContainer>
      </Container>
    );
  }
}

NewTeamPage.propTypes = {};

export default withRouter(NewTeamPage);
