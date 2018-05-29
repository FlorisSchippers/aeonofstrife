import React from 'react';
import {withRouter} from 'react-router-dom';
import SidebarPanel from './SidebarPanel';
import LoginPanel from './LoginPanel';
import Container from '../glamorous/structure/Container';
import ContentContainer from '../glamorous/structure/ContentContainer';
import BackButton from '../glamorous/buttons/BackButton';
import Paragraph from '../glamorous/text/Paragraph';
import DetailTitle from '../glamorous/detail/DetailTitle';
import DetailImage from '../glamorous/detail/DetailImage';
import PageLink from '../glamorous/text/PageLink';
import slugParser from '../common/slugParser';
import FormGroup from '../glamorous/form/FormGroup';
import FormLabel from '../glamorous/form/FormLabel';
import FormControl from '../glamorous/form/FormControl';
import FormButton from '../glamorous/form/FormButton';

class TeamDetailPage extends React.Component {
  constructor(props) {
    super(props);
    // Bindings
    this.state = {
      team: ``,
      players: [],
      currentUser: ``,
      joinCode: ``,
      loading: false,
      error: null,
    };
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    this.setState({loading: true});
    let currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
      this.setState({
          currentUser: {
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          }
        }
      );
    }

    let team = ``;
    let players = [];
    if (this.state.team.length === 0) {
      firestore.collection('teams').where('displayName', '==', slugParser(this.props.location.pathname)).get()
        .catch((error) => {
          this.setState({error: error});
          this.setState({loading: false});
        })
        .then((teamQuerySnapshot) => {
          teamQuerySnapshot.forEach((teamDocSnapshot) => {
            team = teamDocSnapshot.data();
            team.id = teamDocSnapshot.id;
          });
          this.setState({team: team});
          if (Object.keys(this.state.team.players).length > 0) {
            Object.keys(this.state.team.players).forEach((playerId) => {
              if (this.state.team.players[playerId] === true) {
                firestore.collection('users').doc(playerId).get()
                  .catch((error) => {
                    this.setState({error: error});
                    this.setState({loading: false});
                  })
                  .then((userQuerySnapshot) => {
                    players = this.state.players;
                    players.push(userQuerySnapshot.data());
                    this.setState({players: players});
                    if (this.state.players.length === Object.keys(this.state.team.players).length) {
                      this.setState({loading: false});
                    }
                  });
              }
            });
          } else {
            this.setState({loading: false});
          }
        });
    }
  }

  validateForm() {
    return this.state.joinCode.length > 0;
  }

  handleChange = event => {
    this.setState({[event.target.id]: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.joinCode === this.state.team.joinCode) {
      let id = ``;
      firestore.collection('users').where('displayName', '==', this.state.currentUser.displayName).get()
        .catch((error) => {
          this.setState({error: error});
          this.setState({loading: false});
        })
        .then((userQuerySnapshot) => {
          userQuerySnapshot.forEach((userDoc) => {
            if (userDoc.id !== 'model') {
              id = userDoc.id;
            }
          });
          let data = {
            players: this.state.team.players,
          };
          data.players[id] = true;
          firestore.collection('teams').doc(this.state.team.id).update(data)
            .catch((error) => {
              alert(error.message);
            })
            .then(() => {
              let moredata = {team: this.state.team.id};
              firestore.collection('users').doc(id).update(moredata)
                .catch((error) => {
                  alert(error.message);
                })
                .then(() => {
                  this.props.history.push('/users/me');
                });
            });
        });
    } else {
      this.setState({
        error: {
          message: `Join code incorrect.`,
        }
      });
    }
  };

  render() {
    let teamDetailPage = ``;
    if (this.state.error) {
      teamDetailPage = <ContentContainer>
        <LoginPanel/>
        <Paragraph>{this.state.error.message}</Paragraph>
      </ContentContainer>;
    } else if (this.state.loading) {
      teamDetailPage = <ContentContainer>
        <LoginPanel/>
        <Paragraph>Loading {slugParser(this.props.location.pathname)}'s profile...</Paragraph>
      </ContentContainer>;
    } else {
      let players = this.state.players.map((player, i) =>
        <PageLink style={{display: 'table'}}
                  to={'/users/' + player.displayName}
                  key={i}>{player.displayName}</PageLink>
      );
      let joinCodeForm = ``;
      if (this.state.currentUser !== ``) {
        joinCodeForm = <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="joinCode" bsSize="large">
            <FormLabel>Join code</FormLabel>
            <FormControl
              autoFocus
              type="text"
              id="joinCode"
              value={this.state.joinCode}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormButton type="submit" disabled={!this.validateForm()}>
            Save
          </FormButton>
        </form>
      }
      teamDetailPage = <ContentContainer>
        <LoginPanel/>
        <DetailImage src={this.state.team.photoURL}/>
        <DetailTitle>{this.state.team.displayName}</DetailTitle>
        {players}
        {joinCodeForm}
      </ContentContainer>;
    }

    return (
      <Container>
        <BackButton to={'/teams'}/>
        <SidebarPanel/>
        {teamDetailPage}
      </Container>
    );
  }
}

TeamDetailPage.propTypes = {};

export default withRouter(TeamDetailPage);
