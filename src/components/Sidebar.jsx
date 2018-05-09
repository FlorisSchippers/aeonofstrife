import React from 'react';
import {Link} from 'react-router-dom';
import SidebarContainer from '../glamorous/structure/SidebarContainer.jsx';
import SidebarElement from '../glamorous/structure/SidebarElement';
import SidebarLink from '../glamorous/structure/SidebarLink.jsx';
import Logo from '../glamorous/structure/Logo.jsx';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let sidebarItems = ['Users', 'Leagues', 'Tournaments'];
        const sidebar = sidebarItems.map((sidebarItem) => {
            return (
                <SidebarElement key={sidebarItems.indexOf(sidebarItem)}>
                    <SidebarLink to={'/' + sidebarItem.toLowerCase()}>{sidebarItem}</SidebarLink>
                </SidebarElement>
            )
        });

        return (
            <SidebarContainer>
                <Link to={'/'}><Logo src='/images/dota-logo.png'/></Link>
                {sidebar}
            </SidebarContainer>
        );
    }
}

export default Sidebar;
