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
      division: ``,
      teams: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    let division = ``;
    if (this.state.division.length === 0) {
      console.log(slugParser(this.props.location.pathname).slice(-1));
      firestore.collection('league').where('division', '==', parseInt(slugParser(this.props.location.pathname).slice(-1))).get()
        .catch((error) => {
          this.setState({error: error});
          this.setState({loading: false});
        })
        .then((leagueQuerySnapshot) => {
          leagueQuerySnapshot.forEach((leagueDocSnapshot) => {
            division = leagueDocSnapshot.data();
          });
          this.setState({division: division});
          this.setState({loading: false});
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
      leagueDetailPage = <ContentContainer>
        <LoginPanel/>
        <DetailImage src={this.state.division.photoURL}/>
        <DetailTitle>{this.state.division.displayName}</DetailTitle>
        <Paragraph>No teams participating yet...</Paragraph>
      </ContentContainer>;
    }

    return (
      <Container>
        <BackButton to={'/league'}/>
        <SidebarPanel/>
        {leagueDetailPage}
      </Container>
    );
  }
}

LeagueDetailPage.propTypes = {};

export default LeagueDetailPage;
