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
      currentUser: ``,
      user: ``,
      brackets: {},
      displayName: ``,
      photoURL: `/images/tournament-logo.png`,
      players: {},
      teams: {},
      timestamp: ``,
    };
    // Bindings
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    let currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
      this.setState({
        currentUser: {
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        }
      });
      let user = ``;
      firestore.collection('users').where('displayName', '==', currentUser.displayName).get()
        .catch((error) => {
          this.setState({error: error});
          this.setState({loading: false});
        })
        .then((userQuerySnapshot) => {
          userQuerySnapshot.forEach((userDoc) => {
            if (userDoc.id !== 'model') {
              user = userDoc.data();
              user.id = userDoc.id;
            }
          });
          this.setState({user: user});
          if (this.state.user.admin === false) {
            this.props.history.push('/');
          }
        });
    } else {
      this.props.history.push('/');
    }
  }

  validateForm() {
    return this.state.displayName.length > 0 && this.state.photoURL.length > 0 && this.state.timestamp.length > 0;
  }

  handleChange = event => {
    this.setState({[event.target.id]: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();

    firestore.collection('tournaments').add({
      brackets: this.state.brackets,
      displayName: this.state.displayName,
      photoURL: this.state.photoURL,
      players: this.state.players,
      teams: this.state.teams,
      timestamp: this.state.timestamp,
    })
      .catch((error) => {
        alert(error.message);
      })
      .then(() => {
        this.props.history.push('/tournaments');
      });
  };

  render() {
    return (
      <Container>
        <BackButton to={'/tournaments'}/>
        <SidebarPanel/>
        <ContentContainer>
          <LoginPanel/>
          <Title>Create a new tournament</Title>
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
            <FormGroup controlId="timestamp" bsSize="large">
              <FormLabel>Timestamp</FormLabel>
              <FormControl
                type="number"
                id="timestamp"
                value={this.state.timestamp}
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
