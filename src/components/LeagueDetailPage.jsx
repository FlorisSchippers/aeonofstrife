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

class LeagueDetailPage extends React.Component {
  constructor(props) {
    super(props);
    // Bindings
    this.state = {
      league: ``,
      teams: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    let league = ``;
    let teams = [];
    if (this.state.league.length === 0) {
      firestore.collection('leagues').where('timestamp', '==', slugParser(this.props.location.pathname)).get()
        .catch((error) => {
          this.setState({error: error});
          this.setState({loading: false});
        })
        .then((leagueQuerySnapshot) => {
          leagueQuerySnapshot.forEach((leagueDocSnapshot) => {
            league = leagueDocSnapshot.data();
          });
          this.setState({league: league});
          if (this.state.league.teams.length > 0) {
            this.state.league.teams.forEach((teamId) => {
              firestore.collection('teams').doc(teamId).get()
                .catch((error) => {
                  this.setState({error: error});
                  this.setState({loading: false});
                })
                .then((teamQuerySnapshot) => {
                  teams = this.state.teams;
                  teams.push(teamQuerySnapshot.data());
                  this.setState({teams: teams});
                  if (this.state.teams.length === this.state.league.teams.length) {
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
    let leagueDetailPage = ``;
    if (this.state.error) {
      leagueDetailPage = <ContentContainer>
        <LoginPanel/>
        <Paragraph>{this.state.error.message}</Paragraph>;
      </ContentContainer>;
    } else if (this.state.loading) {
      leagueDetailPage = <ContentContainer>
        <LoginPanel/>
        <Paragraph>Loading league: {slugParser(this.props.location.pathname)}</Paragraph>
      </ContentContainer>;
    } else {
      let teams = this.state.teams.map((team, i) =>
        <PageLink style={{display: 'table'}}
                  to={'/teams/' + team.displayName}
                  key={i}>{team.displayName}</PageLink>
      );
      leagueDetailPage = <ContentContainer>
        <LoginPanel refresh={false}/>
        <DetailImage src='/images/dota-logo.png'/>
        <DetailTitle>{this.state.league.timestamp}</DetailTitle>
        {teams}
      </ContentContainer>;
    }

    return (
      <Container>
        <BackButton to={'/leagues'}/>
        <SidebarPanel/>
        {leagueDetailPage}
      </Container>
    );
  }
}

LeagueDetailPage.propTypes = {};

export default LeagueDetailPage;
