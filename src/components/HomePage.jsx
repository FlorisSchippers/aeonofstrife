import React from 'react';
import Container from '../glamorous/structure/Container.jsx';
import ContentContainer from '../glamorous/structure/ContentContainer.jsx';
import SidebarPanel from './SidebarPanel';
import Title from '../glamorous/text/Title.jsx';
import LoginPanel from "../glamorous/structure/LoginContainer";
import LoginLink from '../glamorous/text/LoginLink';

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
          <LoginPanel>
            <LoginLink to={'/login'}>Login</LoginLink>
            <LoginLink style={{top: '50px'}} to={'/register'}>Register</LoginLink>
          </LoginPanel>
          <Title>{title}</Title>
        </ContentContainer>
      </Container>
    );
  }
}

HomePage.propTypes = {};

export default HomePage;
