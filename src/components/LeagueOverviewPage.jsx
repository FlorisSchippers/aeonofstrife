import React from 'react';
import SidebarPanel from './SidebarPanel';
import OverviewPanel from './OverviewPanel';
import LoginPanel from './LoginPanel';
import Container from '../glamorous/structure/Container';
import ContentContainer from '../glamorous/structure/ContentContainer';
import BackButton from '../glamorous/buttons/BackButton';
import Paragraph from '../glamorous/text/Paragraph';

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
      leagueOverviewPage = <ContentContainer css={{backgroundImage: 'url(/images/dota-bg-heroes.jpg)'}}>
        <LoginPanel/>
        <Paragraph>{this.state.error.message}</Paragraph>;
      </ContentContainer>;
    } else if (this.state.loading) {
      leagueOverviewPage = <ContentContainer css={{backgroundImage: 'url(/images/dota-bg-heroes.jpg)'}}>
        <LoginPanel/>
        <Paragraph>Loading league...</Paragraph>
      </ContentContainer>;
    } else {
      let divisions = this.state.divisions.map((division, i) =>
        <OverviewPanel link={'/league/division' + division.division} data={division} index={i} key={i}/>
      );
      leagueOverviewPage = <ContentContainer css={{backgroundImage: 'url(/images/dota-bg-heroes.jpg)'}}>
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
