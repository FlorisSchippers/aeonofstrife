import React from 'react';
import {Link} from 'react-router-dom';
import SidebarContainer from '../glamorous/sidebar/SidebarContainer.jsx';
import SidebarElement from '../glamorous/sidebar/SidebarElement';
import SidebarLink from '../glamorous/sidebar/SidebarLink.jsx';
import Logo from '../glamorous/structure/Logo.jsx';

class SidebarPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let items = ['Users', 'Teams', 'Leagues', 'Tournaments'];
    let sidebar = items.map((item, i) =>
      <SidebarElement key={i}>
        <SidebarLink to={'/' + item.toLowerCase()}>{item}</SidebarLink>
      </SidebarElement>
    );

    return (
      <SidebarContainer>
        <Link to={'/'}><Logo src='/images/dota-logo.png'/></Link>
        {sidebar}
      </SidebarContainer>
    );
  }
}

export default SidebarPanel;
