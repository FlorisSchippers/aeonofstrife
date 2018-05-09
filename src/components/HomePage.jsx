import React from 'react';
import Container from '../glamorous/structure/Container.jsx';
import ContentContainer from '../glamorous/structure/ContentContainer.jsx';
import Sidebar from './Sidebar';
import Title from '../glamorous/text/Title.jsx';
import Subitle from '../glamorous/text/Subtitle.jsx';
import Content from '../glamorous/text/Paragraph.jsx';

class HomePage extends React.Component {
    constructor() {
        super();
        // Bindings
    }

    render() {
        let content = {};
        content.title = `Welcome to Aeon of Strife`;
        content.subtitle = `By Floris Schippers`;
        content.body = `Body of this page`;

        return (
            <Container>
                <Sidebar/>
                <ContentContainer>
                    <Title>{content.title}</Title>
                    <Subitle>{content.subtitle}</Subitle>
                    <Content>{content.body}</Content>
                </ContentContainer>
            </Container>
        );
    }
}

HomePage.propTypes = {};

export default HomePage;
