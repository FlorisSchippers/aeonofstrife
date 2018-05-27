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

class TeamDetailPage extends React.Component {
  constructor(props) {
    super(props);
    // Bindings
    this.state = {
      team: ``,
      players: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    let team = [];
    let players = [];

    if (this.state.team.length === 0) {
      firestore.collection('teams').where('displayName', '==', slugParser(this.props.location.pathname)).get()
        .catch((error) => {
          this.setState({error: error});
          this.setState({loading: false});
        })
        .then((teamQuerySnapshot) => {
          teamQuerySnapshot.forEach((teamDocSnapshot) => {
            team.push(teamDocSnapshot.data());
          });
          this.setState({team: team[0]});
          if (this.state.team.players.length > 0) {
            this.state.team.players.forEach((playerId) => {
              firestore.collection('users').doc(playerId).get()
                .catch((error) => {
                  this.setState({error: error});
                  this.setState({loading: false});
                })
                .then((userQuerySnapshot) => {
                  players = this.state.players;
                  players.push(userQuerySnapshot.data());
                  this.setState({players: players});
                  if (this.state.players.length === this.state.team.players.length) {
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
    let teamDetailPage = ``;
    if (this.state.error) {
      teamDetailPage = <ContentContainer>
        <LoginPanel refresh={false}/>
        <Paragraph>{error.message}</Paragraph>;
      </ContentContainer>;
    } else if (this.state.loading) {
      teamDetailPage = <ContentContainer>
        <LoginPanel refresh={false}/>
        <Paragraph>Loading {slugParser(this.props.location.pathname)}'s profile...</Paragraph>
      </ContentContainer>;
    } else {
      let players = this.state.players.map((player, i) =>
        <PageLink style={{display: 'table'}}
                  to={'/users/' + player.displayName}
                  key={i}>{player.displayName}</PageLink>
      );
      teamDetailPage = <ContentContainer>
        <LoginPanel refresh={false}/>
        <DetailImage src={this.state.team.photoURL}/>
        <DetailTitle>{this.state.team.displayName}</DetailTitle>
        {players}
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

export default TeamDetailPage;
