import React from 'react';
import SidebarPanel from './SidebarPanel';
import LoginPanel from './LoginPanel';
import TournamentPanel from './TournamentPanel';
import Container from '../glamorous/structure/Container';
import ContentContainer from '../glamorous/structure/ContentContainer';
import BackButton from '../glamorous/buttons/BackButton';
import Paragraph from '../glamorous/text/Paragraph';

class TournamentOverviewPage extends React.Component {
  constructor(props) {
    super(props);
    // Bindings
    this.state = {
      tournaments: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({loading: true});
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

  render() {
    let tournamentOverviewPage = ``;
    if (this.state.error) {
      tournamentOverviewPage = <ContentContainer>
        <LoginPanel/>
        <Paragraph>{this.state.error.message}</Paragraph>;
      </ContentContainer>;
    } else if (this.state.loading) {
      tournamentOverviewPage = <ContentContainer>
        <LoginPanel/>
        <Paragraph>Loading tournaments...</Paragraph>
      </ContentContainer>;
    } else {
      let tournaments = this.state.tournaments.map((tournament, i) =>
        <TournamentPanel tournament={tournament} key={i}/>
      );
      tournamentOverviewPage = <ContentContainer>
        <LoginPanel/>
        {tournaments}
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
