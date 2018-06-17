import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import TournamentContainer from '../glamorous/tournament/TournamentContainer';
import TournamentImage from '../glamorous/tournament/TournamentImage';
import TournamentLink from '../glamorous/tournament/TournamentLink';

class TournamentPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TournamentContainer>
        <Link to={'/tournaments/' + this.props.tournament.id}><TournamentImage src={this.props.tournament.photoURL}/></Link>
        <TournamentLink to={'/tournaments/' + this.props.tournament.id}>{this.props.tournament.displayName}</TournamentLink>
      </TournamentContainer>
    );
  }
}

export default withRouter(TournamentPanel);
