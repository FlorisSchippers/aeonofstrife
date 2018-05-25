import React from 'react';
import Container from '../glamorous/structure/Container';
import ContentContainer from '../glamorous/structure/ContentContainer';
import SidebarPanel from './SidebarPanel';
import LoginPanel from './LoginPanel';
import BackButton from '../glamorous/buttons/BackButton';
import UserTitle from '../glamorous/user/UserTitle';
import Paragraph from '../glamorous/text/Paragraph';
import UserImage from '../glamorous/user/UserImage';
import slugParser from '../common/slugParser';

class UserDetailPage extends React.Component {
  constructor(props) {
    super(props);
    // Bindings
    this.state = {
      user: [],
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
        <LoginPanel refresh={false}/>
        <Paragraph>{error.message}</Paragraph>;
      </ContentContainer>;
    } else if (this.state.loading) {
      userDetailPage = <ContentContainer>
        <LoginPanel refresh={false}/>
        <Paragraph>Loading {slugParser(this.props.location.pathname)}'s profile...</Paragraph>
      </ContentContainer>;
    } else {
      console.log(this.state.user.photoURL);
      userDetailPage = <ContentContainer>
        <LoginPanel refresh={false}/>
        <UserImage src={this.state.user.photoURL}/>
        <UserTitle>{this.state.user.displayName}</UserTitle>
      </ContentContainer>;
    }
    console.log(this.state);

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
