import React from 'react';
import SidebarPanel from './SidebarPanel';
import LoginPanel from './LoginPanel';
import Container from '../glamorous/structure/Container';
import ContentContainer from '../glamorous/structure/ContentContainer';
import BackButton from '../glamorous/buttons/BackButton';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {Bracket} from 'react-tournament-bracket';
import Paragraph from '../glamorous/text/Paragraph';
import DetailTitle from '../glamorous/detail/DetailTitle';
import DetailImage from '../glamorous/detail/DetailImage';
import PageLink from '../glamorous/text/PageLink';
import FormButton from '../glamorous/form/FormButton';
import Icon from '../glamorous/structure/Icon';
import slugParser from '../common/slugParser';
import matchMaker from '../common/matchMaker';
import bracketGenerator from '../common/bracketGenerator';
import scoreCrawler from '../common/scoreCrawler';

class TournamentDetailPage extends React.Component {
  constructor(props) {
    super(props);
    // Bindings
    this.state = {
      tournament: ``,
      players: [],
      teams: [],
      currentUser: ``,
      loading: true,
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
            this.props.history.push('/tournaments');
          });
      });
  };

  handleGenerateTournament = event => {
    event.preventDefault();
    let players = this.state.players;
    let teams = matchMaker(players);
    let brackets = bracketGenerator(teams, this.state.tournament.timestamp);
    let data = {
      teams: {},
      brackets: brackets,
    };
    teams.forEach((team) => {
      data.teams['team' + team.players[0].displayName] = team;
    });
    firestore.collection('tournaments').doc(this.state.tournament.id).update(data)
      .catch((error) => {
        alert(error.message);
      })
      .then(() => {
        this.setState({
          tournament: {
            brackets: brackets,
            id: this.state.tournament.id,
            photoURL: this.state.tournament.photoURL,
            players: this.state.tournament.players,
            teams: teams,
            timestamp: this.state.tournament.timestamp,
          }
        });
      });
  };

  handleMatchWinner(matchId, winnerId) {
    let brackets = scoreCrawler([this.state.tournament.brackets], matchId, winnerId);
    let data = {brackets: brackets};
    firestore.collection('tournaments').doc(this.state.tournament.id).update(data)
      .catch((error) => {
        alert(error.message);
      })
      .then(() => {
        this.setState({
          tournament: {
            brackets: brackets,
            id: this.state.tournament.id,
            photoURL: this.state.tournament.photoURL,
            players: this.state.tournament.players,
            teams: this.state.tournament.teams,
            timestamp: this.state.tournament.timestamp,
          }
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
      let joinButton = ``;
      if (this.state.currentUser !== ``) {
        joinButton = <FormButton css={{display: 'block', marginTop: '15px'}} onClick={this.handleJoinTourament}>
          Join Tournament
        </FormButton>;
      }
      let generateTournamentButton = ``;
      if (this.state.currentUser !== ``) {
        if (this.state.user.admin) {
          generateTournamentButton =
            <FormButton css={{display: 'block', marginTop: '15px'}} onClick={this.handleGenerateTournament}>
              Generate Tournament
            </FormButton>;
        }
      }
      let playerLinks = ``;
      if (this.state.players.length > 0) {
        playerLinks = this.state.players.map((player, i) =>
          <PageLink to={'/users/' + player.displayName}
                    key={i}>{player.displayName}</PageLink>
        );
      }

      let teamsTab = <Tab disabled>Teams</Tab>;
      let teamsTabTabs = ``;
      let teamsTabPanels = ``;
      let teamsPanel = ``;
      if (Object.values(this.state.tournament.teams).length > 0) {
        let teams = [];
        Object.values(this.state.tournament.teams).forEach((team) => {
          teams.push(team);
        });
        teamsTabTabs = teams.map((team, i) =>
          <Tab key={i}>Team {team.players[0].displayName}</Tab>
        );
        let discordChannels = ['C96fjDC', 'BG73rh5', '25W5YMC', '9wA9HYM'];
        teamsTabPanels = teams.map((team, i) =>
          <TabPanel key={i}>
            <Paragraph>Average Skill Rating: {team.averageSkillRating}</Paragraph>
            {team.players.map((player, j) => {
              return <PageLink to={'/users/' + player.displayName}
                               key={j}>{player.displayName}</PageLink>;
            })}
            <Paragraph><a href={'https://discord.gg/' + discordChannels[i]} target='_blank'><Icon
              css={{position: 'unset', margin: '20px 0 -20px 0'}}
              src='/images/discord-logo.png'/></a>Join the Team {team.players[0].displayName} Discord</Paragraph>
          </TabPanel>
        );
        teamsTab = <Tab>Teams</Tab>;
        teamsPanel = <Tabs>
          <TabList>
            {teamsTabTabs}
          </TabList>
          {teamsTabPanels}
        </Tabs>
      }

      let bracketsTab = <Tab disabled>Brackets</Tab>;
      let bracketsPanel = ``;
      if (Object.values(this.state.tournament.brackets).length > 0) {
        bracketsTab = <Tab>Brackets</Tab>;
        bracketsPanel = <Bracket game={this.state.tournament.brackets}/>;
      }
      let dateObject = new Date(this.state.tournament.timestamp * 1000);
      let date = dateObject.getDate() + '-' + dateObject.getMonth() + '-' + dateObject.getFullYear() + ', ' + dateObject.getHours() + ':' + dateObject.getMinutes();

      let scoresTab = <Tab disabled>Scores</Tab>;
      let scoresPanel = ``;
      if (this.state.currentUser !== ``) {
        if (this.state.user.admin) {
          scoresTab = <Tab>Scores</Tab>;
          if (Object.values(this.state.tournament.brackets).length > 0) {
            scoresPanel = scoreCrawler([this.state.tournament.brackets]).map((match, i) => {
              return <Paragraph key={i}>
                Winner of match {match.id}
                <FormButton css={{margin: '15px'}}
                            onClick={() => this.handleMatchWinner(match.id, match.sides.home.team.id)}>{match.sides.home.team.name}</FormButton>
                <FormButton css={{margin: '15px'}}
                            onClick={() => this.handleMatchWinner(match.id, match.sides.visitor.team.id)}>{match.sides.visitor.team.name}</FormButton>
              </Paragraph>
            });
          }
        }
      }

      tournamentDetailPage = <ContentContainer>
        <LoginPanel/>
        <DetailImage src={this.state.tournament.photoURL}/>
        <DetailTitle>{this.state.tournament.id}</DetailTitle>
        <Tabs>
          <TabList>
            <Tab>Information</Tab>
            <Tab>Players</Tab>
            {teamsTab}
            {bracketsTab}
            {scoresTab}
          </TabList>
          <TabPanel>
            <Paragraph>Tournament will start at: {date}</Paragraph>
            <Paragraph>Current amount of players: {this.state.players.length}</Paragraph>
            <Paragraph>This will result in a tournament draft of {Math.floor(this.state.players.length / 5)} teams of 5
              players</Paragraph>
            {joinButton}
            {generateTournamentButton}
          </TabPanel>
          <TabPanel>
            {playerLinks}
          </TabPanel>
          <TabPanel>
            {teamsPanel}
          </TabPanel>
          <TabPanel>
            {bracketsPanel}
          </TabPanel>
          <TabPanel>
            {scoresPanel}
          </TabPanel>
        </Tabs>
      </ContentContainer>;
    }

    return (
      <Container>
        <SidebarPanel/>
        <BackButton to={'/tournaments'}/>
        {tournamentDetailPage}
      </Container>
    );
  }
}

TournamentDetailPage.propTypes = {};

export default TournamentDetailPage;
