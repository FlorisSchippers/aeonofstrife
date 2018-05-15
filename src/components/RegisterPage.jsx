import React from 'react';
import Container from '../glamorous/structure/Container.jsx';
import ContentContainer from '../glamorous/structure/ContentContainer.jsx';
import SidebarPanel from './SidebarPanel';
import Title from '../glamorous/text/Title.jsx';
import LoginPanel from './LoginPanel';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    // Bindings
  }

  render() {
    let title = `Welcome to Aeon of Strife`;

    return (
      <Container>
        <SidebarPanel/>
        <ContentContainer>
          <LoginPanel/>
          <Title>{title}</Title>
        </ContentContainer>
      </Container>
    );
  }
}

RegisterPage.propTypes = {};

export default RegisterPage;
