import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import OverviewContainer from '../glamorous/tournament/OverviewContainer';
import OverviewImage from '../glamorous/tournament/OverviewImage';
import OverviewLink from '../glamorous/tournament/OverviewLink';

class OverviewPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let images = ['url(/images/dota-bg-dark.jpg)', 'url(/images/dota-bg-long.jpg)', 'url(/images/dota-bg-medium.jpg)', 'url(/images/dota-bg-light.jpg)', 'url(/images/dota-bg-medium.jpg)', 'url(/images/dota-bg-long.jpg)', 'url(/images/dota-bg-dark.jpg)'];
    let index = this.props.index % 7;
    return (
      <OverviewContainer css={{backgroundImage: images[index]}}>
        <Link to={this.props.link}><OverviewImage src={this.props.data.photoURL}/></Link>
        <OverviewLink to={this.props.link}>{this.props.data.displayName}</OverviewLink>
      </OverviewContainer>
    );
  }
}

export default withRouter(OverviewPanel);
