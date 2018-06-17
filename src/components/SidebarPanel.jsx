import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../glamorous/structure/Logo.jsx';
import Icon from '../glamorous/structure/Icon.jsx';
import SidebarContainer from '../glamorous/sidebar/SidebarContainer.jsx';
import SidebarElement from '../glamorous/sidebar/SidebarElement';
import SidebarLink from '../glamorous/sidebar/SidebarLink.jsx';

class SidebarPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let sidebarItems = ['Users', 'Teams', 'Tournaments', 'League'];
    let sidebar = sidebarItems.map((item, i) =>
      <SidebarElement key={i}>
        <SidebarLink to={'/' + item.toLowerCase()}>{item}</SidebarLink>
      </SidebarElement>
    );

    return (
      <SidebarContainer>
        <Link to={'/'}><Logo src='/images/aos-logo.png'/></Link>
        {sidebar}
        <a href='https://discord.gg/YhWANKE'><Icon src='/images/discord-logo.png'/></a>
      </SidebarContainer>
    );
  }
}

export default SidebarPanel;
