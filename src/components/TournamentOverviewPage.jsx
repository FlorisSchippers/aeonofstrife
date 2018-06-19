import React from 'react';
import SidebarPanel from './SidebarPanel';
import LoginPanel from './LoginPanel';
import TournamentPanel from './TournamentPanel';
import Container from '../glamorous/structure/Container';
import ContentContainer from '../glamorous/structure/ContentContainer';
import BackButton from '../glamorous/buttons/BackButton';
import Paragraph from '../glamorous/text/Paragraph';
import FormButton from '../glamorous/form/FormButton';

class TournamentOverviewPage extends React.Component {
  constructor(props) {
    super(props);
    // Bindings
    this.state = {
      currentUser: ``,
      user: ``,
      tournaments: [],
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
        });
    }

    let tournaments = [];
    let tournament = ``;
    if (this.state.tournaments.length === 0) {
      firestore.collection('tournaments').get()
        .catch((error) => {
          this.setState({error: error});
          this.setState({loading: false});
        })
        .then((querySnapshot) => {
          querySnapshot.forEach(function (docSnapshot) {
            if (docSnapshot.id !== 'model') {
              tournament = docSnapshot.data();
              tournament.id = docSnapshot.id;
              tournaments.push(tournament);
            }
          });
          this.setState({tournaments: tournaments});
          this.setState({loading: false});
        });
    }
  }

  handleNewTournament = event => {
    event.preventDefault();
    this.props.history.push('/tournaments/new');
  };

  render() {
    let tournamentOverviewPage = ``;
    if (this.state.error) {
      tournamentOverviewPage = <ContentContainer css={{backgroundImage: 'url(/images/dota-bg-heroes.jpg)'}}>
        <LoginPanel/>
        <Paragraph>{this.state.error.message}</Paragraph>;
      </ContentContainer>;
    } else if (this.state.loading) {
      tournamentOverviewPage = <ContentContainer css={{backgroundImage: 'url(/images/dota-bg-heroes.jpg)'}}>
        <LoginPanel/>
        <Paragraph>Loading tournaments...</Paragraph>
      </ContentContainer>;
    } else {
      let newTournamentButton = ``;
      if (this.state.currentUser !== ``) {
        if (this.state.user.admin) {
          newTournamentButton =
            <FormButton css={{display: 'block', marginTop: '15px'}} onClick={this.handleNewTournament}>
              +
            </FormButton>;
        }
      }
      let tournaments = this.state.tournaments.map((tournament, i) =>
        <TournamentPanel tournament={tournament} key={i}/>
      );
      tournamentOverviewPage = <ContentContainer css={{backgroundImage: 'url(/images/dota-bg-heroes.jpg)'}}>
        <LoginPanel/>
        {tournaments}
        {newTournamentButton}
      </ContentContainer>
    }

    return (
      <Container>
        <BackButton to={'/'}/>
        <SidebarPanel/>
        {tournamentOverviewPage}
      </Container>
    );
  }
}

TournamentOverviewPage.propTypes = {};

export default TournamentOverviewPage;
