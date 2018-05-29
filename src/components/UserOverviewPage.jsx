import React from 'react';
import SidebarPanel from './SidebarPanel';
import LoginPanel from './LoginPanel';
import Container from '../glamorous/structure/Container';
import ContentContainer from '../glamorous/structure/ContentContainer';
import BackButton from '../glamorous/buttons/BackButton';
import Paragraph from '../glamorous/text/Paragraph';
import PageLink from '../glamorous/text/PageLink';

class UserOverviewPage extends React.Component {
  constructor(props) {
    super(props);
    // Bindings
    this.state = {
      users: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    let users = [];
    if (this.state.users.length === 0) {
      firestore.collection('users').get()
        .catch((error) => {
          this.setState({error: error});
          this.setState({loading: false});
        })
        .then((querySnapshot) => {
          querySnapshot.forEach(function (docSnapshot) {
            if (docSnapshot.id !== 'model') {
              users.push(docSnapshot.data());
            }
          });
          this.setState({users: users});
          this.setState({loading: false});
        });
    }
  }

  render() {
    let userOverviewPage = ``;
    if (this.state.error) {
      userOverviewPage = <ContentContainer>
        <LoginPanel/>
        <Paragraph>{this.state.error.message}</Paragraph>;
      </ContentContainer>;
    } else if (this.state.loading) {
      userOverviewPage = <ContentContainer>
        <LoginPanel/>
        <Paragraph>Loading users...</Paragraph>
      </ContentContainer>;
    } else {
      let users = this.state.users.map((user, i) =>
        <PageLink style={{display: 'table'}}
                  to={'/users/' + user.displayName}
                  key={i}>{user.displayName}</PageLink>
      );
      userOverviewPage = <ContentContainer>
        <LoginPanel/>
        {users}
      </ContentContainer>
    }

    return (
      <Container>
        <BackButton to={'/'}/>
        <SidebarPanel/>
        {userOverviewPage}
      </Container>
    );
  }
}

UserOverviewPage.propTypes = {};

export default UserOverviewPage;
