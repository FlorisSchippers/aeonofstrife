import React from 'react';
import SidebarPanel from './SidebarPanel';
import LoginPanel from './LoginPanel';
import Container from '../glamorous/structure/Container.jsx';
import ContentContainer from '../glamorous/structure/ContentContainer.jsx';
import Title from '../glamorous/text/Title.jsx';

class HomePage extends React.Component {
  constructor() {
    super();
    // Bindings
  }

  render() {
    return (
      <Container>
        <SidebarPanel/>
        <ContentContainer>
          <LoginPanel/>
          <Title>Welcome to Aeon of Strife</Title>
        </ContentContainer>
      </Container>
    );
  }
}

HomePage.propTypes = {};

export default HomePage;
