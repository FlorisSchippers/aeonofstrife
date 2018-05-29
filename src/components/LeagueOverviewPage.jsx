import React from 'react';
import SidebarPanel from './SidebarPanel';
import LoginPanel from './LoginPanel';
import Container from '../glamorous/structure/Container';
import ContentContainer from '../glamorous/structure/ContentContainer';
import BackButton from '../glamorous/buttons/BackButton';
import Paragraph from '../glamorous/text/Paragraph';
import PageLink from '../glamorous/text/PageLink';

class LeagueOverviewPage extends React.Component {
  constructor(props) {
    super(props);
    // Bindings
    this.state = {
      leagues: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    let leagues = [];
    if (this.state.leagues.length === 0) {
      firestore.collection('leagues').get()
        .catch((error) => {
          this.setState({error: error});
          this.setState({loading: false});
        })
        .then((querySnapshot) => {
          querySnapshot.forEach(function (docSnapshot) {
            if (docSnapshot.id !== 'model') {
              leagues.push(docSnapshot.data());
            }
          });
          this.setState({leagues: leagues});
          this.setState({loading: false});
        });
    }
  }

  render() {
    let leagueOverviewPage = ``;
    if (this.state.error) {
      leagueOverviewPage = <ContentContainer>
        <LoginPanel/>
        <Paragraph>{this.state.error.message}</Paragraph>;
      </ContentContainer>;
    } else if (this.state.loading) {
      leagueOverviewPage = <ContentContainer>
        <LoginPanel/>
        <Paragraph>Loading leagues...</Paragraph>
      </ContentContainer>;
    } else {
      let leagues = this.state.leagues.map((league, i) =>
        <PageLink style={{display: 'table'}}
                  to={'/leagues/' + league.timestamp}
                  key={i}>{league.timestamp}</PageLink>
      );
      leagueOverviewPage = <ContentContainer>
        <LoginPanel/>
        {leagues}
      </ContentContainer>
    }

    return (
      <Container>
        <BackButton to={'/'}/>
        <SidebarPanel/>
        {leagueOverviewPage}
      </Container>
    );
  }
}

LeagueOverviewPage.propTypes = {};

export default LeagueOverviewPage;
