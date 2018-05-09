import React from 'react';
import Leerdoellist from '../glamorous/header/Leerdoellist.jsx';
import Leerdoelelement from '../glamorous/header/Leerdoelelement.jsx';
import Leerdoellink from '../glamorous/header/Leerdoellink.jsx';
import {Link} from 'react-router-dom';
import Logo from '../glamorous/structure/Logo.jsx';
import appVars from '../config/appVars';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let leerdoelen = ['Logo', 'Ontwikkelen', 'Onderzoeken', 'Ontwerpen', 'Ondernemen', 'Betrokken'];
        const header = leerdoelen.map((leerdoel) => {
            if (leerdoel === 'Logo') {
                return (
                    <Leerdoelelement css={{background: appVars.theme.primary}} key={leerdoelen.indexOf(leerdoel)}>
                        <Link to='/'><Logo src='https://stageverslag.florisschippers.nl/burst-text.png'/></Link>
                    </Leerdoelelement>
                )
            } else if (window.location.pathname.includes(leerdoel.toLowerCase())) {
                return (
                    <Leerdoelelement css={{background: appVars.theme.dark}} key={leerdoelen.indexOf(leerdoel)}>
                        <Leerdoellink to={'/' + leerdoel.toLowerCase()}>{leerdoel}</Leerdoellink>
                    </Leerdoelelement>
                )
            } else {
                return (
                    <Leerdoelelement key={leerdoelen.indexOf(leerdoel)}>
                        <Leerdoellink to={'/' + leerdoel.toLowerCase()}>{leerdoel}</Leerdoellink>
                    </Leerdoelelement>
                )
            }
        });

        return (
            <div>
                <Leerdoellist>{header}</Leerdoellist>
            </div>
        );
    }
}

export default Header;