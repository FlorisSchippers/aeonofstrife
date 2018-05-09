import React from 'react';
import Backbutton from '../glamorous/buttons/BackButton.jsx';
import Texthalve from '../glamorous/structure/Texthalve.jsx';
import Imagehalve from '../glamorous/structure/Imagehalve';
import Title from '../glamorous/text/Title.jsx';
import Content from '../glamorous/text/Paragraph.jsx';
import Header from "./Header";
import slugParser from "../common/slugParser";
import componentParser from "../common/componentParser";
import AppVars from "../config/appVars";

class Project extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let image, competentie_title, competentie_slug, project_title, project_body = '';
        for (let i = 0; i < this.props.data.length; i++) {
            if (this.props.location.pathname.includes(this.props.data[i].slug)) {
                image = this.props.data[i].better_featured_image.media_details.sizes.large.source_url;
                competentie_title = this.props.data[i].title.rendered;
                competentie_slug = this.props.data[i].slug;
                for (let j = 0; j < this.props.data[i].acf.project_repeater.length; j++) {
                    let parsedSlug = slugParser(this.props.location.pathname);
                    let replacedParsedSlug = parsedSlug.replace(/-/g, ' ');
                    // console.log('slug', replacedParsedSlug);
                    // console.log('title', this.props.data[i].acf.project_repeater[j].project_title.toLowerCase());
                    if (replacedParsedSlug.includes(this.props.data[i].acf.project_repeater[j].project_title.toLowerCase())) {
                        project_title = this.props.data[i].acf.project_repeater[j].project_title;
                        project_body = componentParser(this.props.data[i].acf.project_repeater[j].project_body);
                    }
                }
            }
        }

        return (
            <div>
                <Header/>
                <Backbutton to={'/' + this.props.leerdoel + '/' + competentie_slug}/>
                <Texthalve>
                    <Title>{competentie_title}</Title>
                    <Title css={{color: AppVars.theme.primary}}>&nbsp; ➤ &nbsp;</Title>
                    <Title>{project_title}</Title>
                    <Content>{project_body}</Content>
                </Texthalve>
                <Imagehalve css={{backgroundImage: 'url(' + image + ')'}}/>
            </div>
        );
    }
}

export default Project;