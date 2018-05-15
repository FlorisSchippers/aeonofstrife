import React from 'react';
import Container from '../glamorous/structure/Container.jsx';
import ContentContainer from '../glamorous/structure/ContentContainer.jsx';
import SidebarPanel from './SidebarPanel';
import BackButton from '../glamorous/buttons/BackButton';
import Title from '../glamorous/text/Title.jsx';
import Paragraph from '../glamorous/text/Paragraph';
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
      firestore.collection('users').where('nickname', '==', slugParser(this.props.location.pathname)).get()
        .then((querySnapshot) => {
          querySnapshot.forEach(function (doc) {
            user = doc.data();
          });
          this.setState({user: user});
          this.setState({loading: false});
        })
        .catch((error) => {
          this.setState({error: error});
          this.setState({loading: false});
        });
    }
  }

  render() {
    let title = ``;
    if (this.state.error) {
      title = <Paragraph>{error.message}</Paragraph>;
    } else if (this.state.loading) {
      title = <Paragraph>Loading ...</Paragraph>;
    } else {
      title = this.state.user.nickname;
    }

    return (
      <Container>
        <BackButton to={'/users'}/>
        <SidebarPanel/>
        <ContentContainer>
          <Title>{title}</Title>
        </ContentContainer>
      </Container>
    );
  }
}

UserDetailPage.propTypes = {};

export default UserDetailPage;
