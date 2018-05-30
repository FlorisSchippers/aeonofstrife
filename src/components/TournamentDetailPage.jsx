import React from 'react';
import SidebarPanel from './SidebarPanel';
import LoginPanel from './LoginPanel';
import Container from '../glamorous/structure/Container';
import ContentContainer from '../glamorous/structure/ContentContainer';
import BackButton from '../glamorous/buttons/BackButton';
import Paragraph from '../glamorous/text/Paragraph';
import DetailTitle from '../glamorous/detail/DetailTitle';
import DetailImage from '../glamorous/detail/DetailImage';
import PageLink from '../glamorous/text/PageLink';
import FormButton from '../glamorous/form/FormButton';
import slugParser from '../common/slugParser';

class TournamentDetailPage extends React.Component {
  constructor(props) {
    super(props);
    // Bindings
    this.state = {
      tournament: ``,
      players: [],
      currentUser: ``,
      loading: false,
      error: null,
    };
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

    let tournament = ``;
    let players = [];
    if (this.state.tournament.length === 0) {
      firestore.collection('tournaments').doc(slugParser(this.props.location.pathname)).get()
        .catch((error) => {
          this.setState({error: error});
          this.setState({loading: false});
        })
        .then((tournamentDocSnapshot) => {
          tournament = tournamentDocSnapshot.data();
          tournament.id = tournamentDocSnapshot.id;
          this.setState({tournament: tournament});

          if (Object.keys(this.state.tournament.players).length > 0) {
            Object.keys(this.state.tournament.players).forEach((playerId) => {
              let id = playerId;
              firestore.collection('users').doc(playerId).get()
                .catch((error) => {
                  this.setState({error: error});
                  this.setState({loading: false});
                })
                .then((playerQuerySnapshot) => {
                  players = this.state.players;
                  let newPlayer = playerQuerySnapshot.data();
                  newPlayer.id = id;
                  players.push(newPlayer);
                  this.setState({players: players});
                  if (this.state.players.length === Object.keys(this.state.tournament.players).length) {
                    this.setState({loading: false});
                  }
                });
            });
          } else {
            this.setState({loading: false});
          }
        });
    }
  }

  handleJoinTourament = event => {
    event.preventDefault();
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
          players: this.state.tournament.players,
        };
        data.players[id] = true;
        firestore.collection('tournaments').doc(this.state.tournament.id).update(data)
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            this.props.history.push('/users/me');
          });
      });
  };

  render() {
    let tournamentDetailPage = ``;
    if (this.state.error) {
      tournamentDetailPage = <ContentContainer>
        <LoginPanel/>
        <Paragraph>{this.state.error.message}</Paragraph>;
      </ContentContainer>;
    } else if (this.state.loading) {
      tournamentDetailPage = <ContentContainer>
        <LoginPanel/>
        <Paragraph>Loading tournament: {slugParser(this.props.location.pathname)}</Paragraph>
      </ContentContainer>;
    } else {
      let players = this.state.players.map((player, i) =>
        <PageLink to={'/users/' + player.displayName}
                  key={i}>{player.displayName}</PageLink>
      );
      let joinButton = ``;
      if (this.state.currentUser !== ``) {
        joinButton = <FormButton css={{marginTop: '25px'}} onClick={this.handleJoinTourament}>
          Join Tournament
        </FormButton>;
      }
      tournamentDetailPage = <ContentContainer>
        <LoginPanel/>
        <DetailImage src={this.state.tournament.photoURL}/>
        <DetailTitle>{this.state.tournament.id}</DetailTitle>
        <Paragraph>Competing players:</Paragraph>
        {players}
        {joinButton}
      </ContentContainer>;
    }

    return (
      <Container>
        <BackButton to={'/tournaments'}/>
        <SidebarPanel/>
        {tournamentDetailPage}
      </Container>
    );
  }
}

TournamentDetailPage.propTypes = {};

export default TournamentDetailPage;
