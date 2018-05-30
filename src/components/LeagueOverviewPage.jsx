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
      divisions: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    let divisions = [];
    if (this.state.divisions.length === 0) {
      firestore.collection('league').get()
        .catch((error) => {
          this.setState({error: error});
          this.setState({loading: false});
        })
        .then((querySnapshot) => {
          querySnapshot.forEach(function (docSnapshot) {
            if (docSnapshot.id !== 'model') {
              divisions.push(docSnapshot.data());
            }
          });
          this.setState({divisions: divisions});
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
        <Paragraph>Loading league...</Paragraph>
      </ContentContainer>;
    } else {
      let divisions = this.state.divisions.map((division, i) =>
        <PageLink to={'/league/division' + division.division.toString()}
                  key={i}>Division {division.division.toString()}</PageLink>
      );
      leagueOverviewPage = <ContentContainer>
        <LoginPanel/>
        {divisions}
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
