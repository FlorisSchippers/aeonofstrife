import React from 'react';
import Container from '../glamorous/structure/Container.jsx';
import ContentContainer from '../glamorous/structure/ContentContainer.jsx';
import SidebarPanel from './SidebarPanel';
import Title from '../glamorous/text/Title.jsx';
import LoginPanel from '../components/LoginPanel';

class HomePage extends React.Component {
  constructor() {
    super();
    // Bindings
  }

  render() {
    let title = `Welcome to Aeon of Strife`;

    return (
      <Container>
        <SidebarPanel/>
        <ContentContainer>
          <LoginPanel refresh={false}/>
          <Title>{title}</Title>
        </ContentContainer>
      </Container>
    );
  }
}

HomePage.propTypes = {};

export default HomePage;
