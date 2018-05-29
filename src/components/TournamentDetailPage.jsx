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
import slugParser from '../common/slugParser';

class TournamentDetailPage extends React.Component {
  constructor(props) {
    super(props);
    // Bindings
    this.state = {
      tournament: ``,
      teams: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    let tournament = ``;
    let teams = [];
    if (this.state.tournament.length === 0) {
      firestore.collection('tournaments').where('timestamp', '==', slugParser(this.props.location.pathname)).get()
        .catch((error) => {
          this.setState({error: error});
          this.setState({loading: false});
        })
        .then((tournamentQuerySnapshot) => {
          tournamentQuerySnapshot.forEach((tournamentDocSnapshot) => {
            tournament = tournamentDocSnapshot.data();
          });
          this.setState({tournament: tournament});
          if (this.state.tournament.teams.length > 0) {
            this.state.tournament.teams.forEach((teamId) => {
              firestore.collection('teams').doc(teamId).get()
                .catch((error) => {
                  this.setState({error: error});
                  this.setState({loading: false});
                })
                .then((teamQuerySnapshot) => {
                  teams = this.state.teams;
                  teams.push(teamQuerySnapshot.data());
                  this.setState({teams: teams});
                  if (this.state.teams.length === this.state.tournament.teams.length) {
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
      let teams = this.state.teams.map((team, i) =>
        <PageLink style={{display: 'table'}}
                  to={'/teams/' + team.displayName}
                  key={i}>{team.displayName}</PageLink>
      );
      tournamentDetailPage = <ContentContainer>
        <LoginPanel/>
        <DetailImage src='/images/dota-logo.png'/>
        <DetailTitle>{this.state.tournament.timestamp}</DetailTitle>
        {teams}
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
