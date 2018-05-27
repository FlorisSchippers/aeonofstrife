import React from 'react';
import Container from '../glamorous/structure/Container';
import ContentContainer from '../glamorous/structure/ContentContainer';
import SidebarPanel from './SidebarPanel';
import LoginPanel from './LoginPanel';
import BackButton from '../glamorous/buttons/BackButton';
import Paragraph from '../glamorous/text/Paragraph';
import PageLink from '../glamorous/text/PageLink';

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
      teamOverviewPage = <ContentContainer>
        <LoginPanel refresh={false}/>
        <Paragraph>{error.message}</Paragraph>;
      </ContentContainer>;
    } else if (this.state.loading) {
      teamOverviewPage = <ContentContainer>
        <LoginPanel refresh={false}/>
        <Paragraph>Loading teams...</Paragraph>
      </ContentContainer>;
    } else {
      let teams = this.state.teams.map((team, i) =>
        <PageLink style={{display: 'table'}}
                  to={'/teams/' + team.displayName}
                  key={i}>{team.displayName}</PageLink>
      );
      teamOverviewPage = <ContentContainer>
        <LoginPanel refresh={false}/>
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
