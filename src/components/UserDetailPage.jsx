import React from 'react';
import Container from '../glamorous/structure/Container';
import ContentContainer from '../glamorous/structure/ContentContainer';
import SidebarPanel from './SidebarPanel';
import LoginPanel from './LoginPanel';
import BackButton from '../glamorous/buttons/BackButton';
import DetailTitle from '../glamorous/detail/DetailTitle';
import Paragraph from '../glamorous/text/Paragraph';
import Accent from '../glamorous/text/Accent';
import DetailImage from '../glamorous/detail/DetailImage';
import slugParser from '../common/slugParser';

class UserDetailPage extends React.Component {
  constructor(props) {
    super(props);
    // Bindings
    this.state = {
      user: ``,
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    let user = ``;
    if (this.state.user.length === 0) {
      firestore.collection('users').where('displayName', '==', slugParser(this.props.location.pathname)).get()
        .catch((error) => {
          this.setState({error: error});
          this.setState({loading: false});
        })
        .then((querySnapshot) => {
          querySnapshot.forEach(function (doc) {
            user = doc.data();
          });
          this.setState({user: user});
          this.setState({loading: false});
        });
    }
  }

  render() {
    let userDetailPage = ``;
    if (this.state.error) {
      userDetailPage = <ContentContainer>
        <LoginPanel/>
        <Paragraph>{this.state.error.message}</Paragraph>;
      </ContentContainer>;
    } else if (this.state.loading) {
      userDetailPage = <ContentContainer>
        <LoginPanel/>
        <Paragraph>Loading {slugParser(this.props.location.pathname)}'s profile...</Paragraph>
      </ContentContainer>;
    } else {
      let captain = ``;
      if (this.state.user.captain) {
        captain = '👑';
      }
      userDetailPage = <ContentContainer>
        <LoginPanel/>
        <DetailImage src={this.state.user.photoURL}/>
        <DetailTitle>{this.state.user.displayName} {captain}</DetailTitle>
        <Paragraph>Skill Rating: <Accent>{this.state.user.skillRating}</Accent> MMR</Paragraph>
      </ContentContainer>;
    }

    return (
      <Container>
        <BackButton to={'/users'}/>
        <SidebarPanel/>
        {userDetailPage}
      </Container>
    );
  }
}

UserDetailPage.propTypes = {};

export default UserDetailPage;
