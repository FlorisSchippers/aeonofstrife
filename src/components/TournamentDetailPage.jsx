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
import Accent from '../glamorous/text/Accent';
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
      user: ``,
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
    let data = {
      players: this.state.tournament.players,
    };
    data.players[this.state.user.id] = true;
    firestore.collection('tournaments').doc(this.state.tournament.id).update(data)
      .catch((error) => {
        alert(error.message);
      })
      .then(() => {
        this.props.history.push('/tournaments');
      });
  };

  handleLeaveTourament = event => {
    event.preventDefault();
    let data = {
      players: this.state.tournament.players,
    };
    delete data.players[this.state.user.id];
    firestore.collection('tournaments').doc(this.state.tournament.id).update(data)
      .catch((error) => {
        alert(error.message);
      })
      .then(() => {
        this.props.history.push('/tournaments');
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
            displayName: this.state.tournament.displayName,
            id: this.state.tournament.id,
            photoURL: this.state.tournament.photoURL,
            players: this.state.tournament.players,
            teams: teams,
            timestamp: this.state.tournament.timestamp,
          }
        });
      });
  };

  handleAddAllUsers = event => {
    event.preventDefault();
    let users = [];
    firestore.collection('users').get()
      .catch((error) => {
        this.setState({error: error});
        this.setState({loading: false});
      })
      .then((querySnapshot) => {
        querySnapshot.forEach(function (docSnapshot) {
          if (docSnapshot.id !== 'model') {
            users.push(docSnapshot.id);
          }
        });
        let data = {
          players: this.state.tournament.players,
        };
        for (let user of users) {
          data.players[user] = true;
        }
        data.players[this.state.user.id] = true;
        firestore.collection('tournaments').doc(this.state.tournament.id).update(data)
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            this.props.history.push('/tournaments');
          });
      });
  };

  handleResetTournament = event => {
    event.preventDefault();
    let data = {
      teams: {},
      brackets: {},
    };
    firestore.collection('tournaments').doc(this.state.tournament.id).update(data)
      .catch((error) => {
        alert(error.message);
      })
      .then(() => {
        this.setState({
          tournament: {
            brackets: {},
            displayName: this.state.tournament.displayName,
            id: this.state.tournament.id,
            photoURL: this.state.tournament.photoURL,
            players: this.state.tournament.players,
            teams: {},
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
            displayName: this.state.tournament.displayName,
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
      let joinTournamentButton = ``;
      let leaveTournamentButton = ``;
      if (this.state.currentUser !== ``) {
        let currentlyParticipating = false;
        for (let player of this.state.players) {
          if (this.state.currentUser.displayName === player.displayName) {
            currentlyParticipating = true;
          }
        }
        if (currentlyParticipating) {
          leaveTournamentButton =
            <FormButton css={{display: 'block', marginTop: '15px'}} onClick={this.handleLeaveTourament}>
              Leave Tournament
            </FormButton>;
        } else {
          joinTournamentButton =
            <FormButton css={{display: 'block', marginTop: '15px'}} onClick={this.handleJoinTourament}>
              Join Tournament
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
            <Paragraph>Average Skill Rating: <Accent>{team.averageSkillRating}</Accent> MMR</Paragraph>
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
        bracketsPanel = <Bracket game={this.state.tournament.brackets} gameDimensions={{height: 100, width: 225}}/>;
      }

      let adminTab = <Tab disabled>Admin</Tab>;
      let adminPanel = ``;
      let scoreButtons = ``;
      let resetTournamentButton = ``;
      let addAllUsersButton = ``;
      let generateTournamentButton = ``;
      if (this.state.currentUser !== ``) {
        if (this.state.user.admin) {
          adminTab = <Tab>Admin</Tab>;
          generateTournamentButton =
            <FormButton css={{display: 'block', marginTop: '15px'}} onClick={this.handleGenerateTournament}>
              Generate Tournament
            </FormButton>;
          addAllUsersButton =
            <FormButton css={{display: 'block', marginTop: '15px'}} onClick={this.handleAddAllUsers}>
              Add All Users
            </FormButton>;
          resetTournamentButton =
            <FormButton css={{display: 'block', marginTop: '15px'}} onClick={this.handleResetTournament}>
              Reset Tournament
            </FormButton>;
          if (Object.values(this.state.tournament.brackets).length > 0) {
            scoreButtons = scoreCrawler([this.state.tournament.brackets]).map((match, i) => {
              return <Paragraph key={i}>
                Winner of match {match.id}
                <FormButton css={{margin: '15px'}}
                            onClick={() => this.handleMatchWinner(match.id, match.sides.home.team.id)}>{match.sides.home.team.name}</FormButton>
                <FormButton css={{margin: '15px'}}
                            onClick={() => this.handleMatchWinner(match.id, match.sides.visitor.team.id)}>{match.sides.visitor.team.name}</FormButton>
              </Paragraph>
            });
          }
          adminPanel = <Paragraph>
            {generateTournamentButton}
            {addAllUsersButton}
            {resetTournamentButton}
            {scoreButtons}
          </Paragraph>;
        }
      }

      let dateObject = new Date(this.state.tournament.timestamp * 1000);
      let date = dateObject.getDate() + '-';
      let month = (dateObject.getMonth() + 1);
      if (month < 10) {
        month = '0' + month;
      }
      date += month + '-' + dateObject.getFullYear();
      let time = dateObject.getHours() + ':';
      let minutes = dateObject.getMinutes();
      if (minutes % 10 === 0) {
        minutes += '0';
      }
      time += minutes;

      tournamentDetailPage = <ContentContainer>
        <LoginPanel/>
        <DetailImage src={this.state.tournament.photoURL}/>
        <DetailTitle>{this.state.tournament.displayName}</DetailTitle>
        <Tabs>
          <TabList>
            <Tab>Information</Tab>
            <Tab>Players</Tab>
            {teamsTab}
            {bracketsTab}
            {adminTab}
          </TabList>
          <TabPanel>
            <Paragraph>Tournament will start on <Accent>{date}</Accent> at <Accent>{time}</Accent></Paragraph>
            <Paragraph>With <Accent>{this.state.players.length}</Accent> current participating players</Paragraph>
            <Paragraph>This will result in a tournament draft of <Accent>{Math.floor(this.state.players.length / 5)}</Accent> teams of <Accent>5</Accent> players</Paragraph>
            <Paragraph>Where <Accent>{5 - (this.state.players.length % 5)}</Accent> players are needed to create a <Accent>Team {Math.floor(this.state.players.length / 5) + 1}</Accent></Paragraph>
            {joinTournamentButton}
            {leaveTournamentButton}
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
            {adminPanel}
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
