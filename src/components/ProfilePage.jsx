import React from 'react';
import {withRouter} from 'react-router-dom';
import SidebarPanel from './SidebarPanel';
import LoginPanel from './LoginPanel';
import Container from '../glamorous/structure/Container';
import ContentContainer from '../glamorous/structure/ContentContainer';
import BackButton from '../glamorous/buttons/BackButton';
import Paragraph from '../glamorous/text/Paragraph';
import Title from '../glamorous/text/Title';
import PageLink from '../glamorous/text/PageLink';
import FormGroup from '../glamorous/form/FormGroup';
import FormLabel from '../glamorous/form/FormLabel';
import FormControl from '../glamorous/form/FormControl';
import FormButton from '../glamorous/form/FormButton';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    // Bindings
    this.state = {
      user: ``,
      email: ``,
      displayName: ``,
      photoURL: ``,
      skillRating: ``,
      captain: ``,
      team: ``,
      loading: false,
      error: null,
    };
    // Bindings
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    this.setState({loading: true});
    let currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
      this.setState({
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
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
          this.setState({
            user: user,
            skillRating: user.skillRating,
            captain: user.captain,
          });

          if (this.state.user.team) {
            let team = ``;
            firestore.collection('teams').doc(this.state.user.team).get()
              .catch((error) => {
                this.setState({error: error});
                this.setState({loading: false});
              })
              .then((teamQuerySnapshot) => {
                team = teamQuerySnapshot.data();
                team.id = this.state.user.team;
                this.setState({team: team});
                this.setState({loading: false});
              });
          } else {
            this.setState({loading: false});
          }
        });

    } else {
      this.props.history.push('/');
    }
  }

  handleLeaveTeam = event => {
    event.preventDefault();
    let beta = {
      players: this.state.team.players,
    };
    delete beta.players[this.state.user.id];
    firestore.collection('teams').doc(this.state.team.id).update(beta)
      .catch((error) => {
        alert(error.message);
      })
      .then(() => {
        let data = {team: ``};
        firestore.collection('users').doc(this.state.user.id).update(data)
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            this.setState({team: ``});
          });
      });
  };

  handleCreateTeam = event => {
    event.preventDefault();
    this.props.history.push({
      pathname: `/teams/new`,
      state: {
        userId: this.state.user.id,
        teamId: this.state.team.id,
      }
    });
  };

  validateForm() {
    return this.state.displayName.length > 0 && this.state.photoURL.length > 0;
  }

  handleChange = event => {
    this.setState({[event.target.id]: event.target.value});
  };

  handleCaptainCheckbox = event => {
    let state = !this.state.captain;
    this.setState({captain: state});
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = {
      displayName: this.state.displayName,
      photoURL: this.state.photoURL,
      skillRating: this.state.skillRating,
      captain: this.state.captain,
    };
    firebase.auth().currentUser.updateProfile(data)
      .catch((error) => {
        alert(error.message);
      })
      .then(() => {
        firestore.collection('users').doc(this.state.user.id).update(data)
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            this.props.history.push('/');
          });
      });
  };

  render() {
    let userDetailPage = ``;
    if (this.state.error) {
      userDetailPage = <ContentContainer>
        <LoginPanel/>
        <Paragraph>{this.state.error.message}</Paragraph>;
      </ContentContainer>;
    } else if (this.state.loading) {
      userDetailPage = <ContentContainer>
        <LoginPanel/>
        <Paragraph>Loading your profile...</Paragraph>
      </ContentContainer>;
    } else {
      let currentTeam = ``;
      if (this.state.team !== ``) {
        currentTeam = <FormGroup controlId="team" bsSize="large">
          <FormLabel style={{marginTop: '15px'}}>Team</FormLabel>
          <PageLink to={'/teams/' + this.state.team.displayName}>
            {this.state.team.displayName}
          </PageLink>
          <FormButton style={{marginTop: '15px'}} onClick={this.handleLeaveTeam}>
            Leave team
          </FormButton>
        </FormGroup>;
      } else {
        currentTeam = <FormGroup controlId="team" bsSize="large">
          <FormLabel style={{marginTop: '15px'}}>Team</FormLabel>
          <FormLabel>No current team</FormLabel>
          <FormButton onClick={this.handleCreateTeam}>
            Create a team
          </FormButton>
        </FormGroup>;
      }
      userDetailPage = <ContentContainer>
        <LoginPanel/>
        <Title>Manage <PageLink css={{display: 'inherit', fontSize: 'inherit'}} to={'/users/' + this.state.displayName}>your profile</PageLink></Title>
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
          <FormGroup controlId="skillRating" bsSize="large">
            <FormLabel>Skill Rating</FormLabel>
            <FormControl
              type="number"
              id="skillRating"
              value={this.state.skillRating}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="captain" bsSize="large">
            <FormControl
              style={{display: 'inline-block', width: '33px'}}
              type="checkbox"
              id="captain"
              checked={this.state.captain}
              onChange={this.handleCaptainCheckbox}
            />
            <FormLabel style={{display: 'inline-block', marginBottom: '15px'}}>Captain</FormLabel>
          </FormGroup>
          <FormButton type="submit" disabled={!this.validateForm()}>
            Save
          </FormButton>
          {currentTeam}
        </form>
      </ContentContainer>;
    }

    return (
      <Container>
        <BackButton to={'/'}/>
        <SidebarPanel/>
        {userDetailPage}
      </Container>
    );
  }
}

ProfilePage.propTypes = {};

export default withRouter(ProfilePage);
