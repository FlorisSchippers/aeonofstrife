import React from 'react';
import componentParser from '../common/componentParser.jsx'
import Title from '../glamorous/text/Title.jsx';
import Subtitle from '../glamorous/text/Subtitle.jsx';
import Content from '../glamorous/text/Paragraph.jsx';
import Backbutton from '../glamorous/buttons/BackButton.jsx';
import Hrule from '../glamorous/structure/Hrule.jsx';
import Textfull from '../glamorous/structure/Textfull.jsx';
import Competentieelement from '../glamorous/competenties/Competentieelement.jsx';
import Competentielist from '../glamorous/competenties/Competentielist.jsx';
import Competentielink from '../glamorous/competenties/Competentielink.jsx';
import Header from './Header';

class Leerdoel extends React.Component {
    constructor(props) {
        super(props);
    }

    capitalize(string) {
        return string.substr(0, 1).toUpperCase() + string.substr(1);
    }

    render() {
        let intro, content = '';
        let strippedData = [];
        this.props.data.forEach(function (competentie) {
            strippedData.push(competentie);
        });
        for (let i = 0; i < this.props.data.length; i++) {
            if (this.props.data[i].title.rendered === 'Home') {
                intro = componentParser(this.props.data[i].content.rendered);
                content = componentParser(this.props.data[i].acf.bewijsmateriaal);
                strippedData.splice(i, 1);
            }
        }

        const links = strippedData.map((jsonContent) => {
            return (
                <Competentieelement key={jsonContent.id}>
                    <Competentielink to={this.props.leerdoel + '/' + jsonContent.slug} key={jsonContent.id}>
                        {jsonContent.title.rendered}
                    </Competentielink>
                </Competentieelement>
            )
        });

        return (
            <div>
                <Header/>
                <Backbutton to={'/'}/>
                <Textfull>
                    <Title>{this.capitalize(this.props.leerdoel)} leerdoel</Title>
                    <Subtitle>{intro}</Subtitle>
                    <Content>{content}</Content>
                    <Hrule></Hrule>
                    <Title>Competenties</Title>
                    <Competentielist>{links}</Competentielist>
                </Textfull>
            </div>
        );
    }
}

export default Leerdoel;