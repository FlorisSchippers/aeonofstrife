import React from 'react';
import slugParser from '../common/slugParser.jsx';
import componentParser from '../common/componentParser.jsx';
import Title from '../glamorous/text/Title.jsx';
import Subtitle from '../glamorous/text/Subtitle.jsx';
import Content from '../glamorous/text/Paragraph.jsx';
import Backbutton from '../glamorous/buttons/BackButton';
import Texthalve from '../glamorous/structure/Texthalve.jsx';
import Imagehalve from '../glamorous/structure/Imagehalve.jsx';
import Header from "./Header";

class Competentie extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let competentie, intro, body, image = '';
        for (let i = 0; i < this.props.data.length; i++) {
            if (this.props.data[i].slug === slugParser(this.props.location.pathname)) {
                competentie = this.props.data[i].title.rendered;
                intro = componentParser(this.props.data[i].content.rendered);
                body = componentParser(this.props.data[i].acf.bewijsmateriaal);
                image = this.props.data[i].better_featured_image.source_url;
                // image = this.props.data[i].better_featured_image.media_details.sizes.large.source_url;
            }
        }

        return (
            <div>
                <Header/>
                <Backbutton to={'/' + this.props.leerdoel}/>
                <Texthalve>
                    <Title>{competentie}</Title>
                    <Subtitle>{intro}</Subtitle>
                    <Content>{body}</Content>
                </Texthalve>
                <Imagehalve css={{backgroundImage: 'url(' + image + ')'}}/>
            </div>
        );
    }
}

export default Competentie;