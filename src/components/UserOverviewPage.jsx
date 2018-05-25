import React from 'react';
import Container from '../glamorous/structure/Container';
import ContentContainer from '../glamorous/structure/ContentContainer';
import SidebarPanel from './SidebarPanel';
import LoginPanel from './LoginPanel';
import BackButton from '../glamorous/buttons/BackButton';
import Title from '../glamorous/text/Title';
import Paragraph from '../glamorous/text/Paragraph';
import UserLink from '../glamorous/text/PageLink';
import slugParser from "../common/slugParser";

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
          querySnapshot.forEach(function (doc) {
            users.push(doc.data());
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
        <LoginPanel refresh={false}/>
        <Paragraph>{error.message}</Paragraph>;
      </ContentContainer>;
    } else if (this.state.loading) {
      userOverviewPage = <ContentContainer>
        <LoginPanel refresh={false}/>
        <Paragraph>Loading users...</Paragraph>
      </ContentContainer>;
    } else {
      let users = this.state.users;
      users = users.map((user) =>
        <UserLink style={{display: 'table'}} to={'/users/' + user.displayName}
                  key={users.indexOf(user)}>{user.displayName}</UserLink>
      );
      userOverviewPage = <ContentContainer>
        <LoginPanel refresh={false}/>
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
