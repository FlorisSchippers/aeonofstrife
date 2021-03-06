import React from 'react';
import Container from '../glamorous/structure/Container';
import ContentContainer from '../glamorous/structure/ContentContainer';
import SidebarPanel from './SidebarPanel';
import LoginPanel from './LoginPanel';
import OverviewPanel from './OverviewPanel';
import BackButton from '../glamorous/buttons/BackButton';
import Paragraph from '../glamorous/text/Paragraph';

class TeamOverviewPage extends React.Component {
  constructor(props) {
    super(props);
    // Bindings
    this.state = {
      teams: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    let teams = [];
    if (this.state.teams.length === 0) {
      firestore.collection('teams').get()
        .catch((error) => {
          this.setState({error: error});
          this.setState({loading: false});
        })
        .then((querySnapshot) => {
          querySnapshot.forEach(function (docSnapshot) {
            if (docSnapshot.id !== 'model') {
              teams.push(docSnapshot.data());
            }
          });
          this.setState({teams: teams});
          this.setState({loading: false});
        });
    }
  }

  render() {
    let teamOverviewPage = ``;
    if (this.state.error) {
      teamOverviewPage = <ContentContainer css={{backgroundImage: 'url(/images/dota-bg-heroes.jpg)'}}>
        <LoginPanel/>
        <Paragraph>{this.state.error.message}</Paragraph>;
      </ContentContainer>;
    } else if (this.state.loading) {
      teamOverviewPage = <ContentContainer css={{backgroundImage: 'url(/images/dota-bg-heroes.jpg)'}}>
        <LoginPanel/>
        <Paragraph>Loading teams...</Paragraph>
      </ContentContainer>;
    } else {
      let teams = this.state.teams.map((team, i) =>
        <OverviewPanel link={'/teams/' + team.displayName} data={team} index={i} key={i}/>
      );
      teamOverviewPage = <ContentContainer css={{backgroundImage: 'url(/images/dota-bg-heroes.jpg)'}}>
        <LoginPanel/>
        {teams}
      </ContentContainer>
    }

    return (
      <Container>
        <BackButton to={'/'}/>
        <SidebarPanel/>
        {teamOverviewPage}
      </Container>
    );
  }
}

TeamOverviewPage.propTypes = {};

export default TeamOverviewPage;
