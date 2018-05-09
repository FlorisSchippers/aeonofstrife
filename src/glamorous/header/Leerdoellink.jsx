import glamorous from 'glamorous';
import appVars from '../../config/appVars';
import {Link} from 'react-router-dom';

const mediaQueries = {
    mobile_landscape: '@media only screen and (min-width: 640px)',
    tablet_portrait: '@media only screen and (min-width: 768px)',
    tablet_landscape: '@media only screen and (min-width: 1024px)',
    desktop: '@media only screen and (min-width: 1250px)',
};

export default glamorous(Link)({
    width: 'calc(100vw / 5)',
    height: '25px',
    color: appVars.theme.lighter,
    cursor: 'pointer',
    border: '0',
    fontFamily: 'Open Sans',
    fontSize: '11px',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'background-color 0.25s linear',
    padding: '15px 0',
    margin: '0 auto',
    display: 'block',

    [mediaQueries.mobile_landscape]: {
        fontSize: '19px',
    },
    [mediaQueries.tablet_portrait]: {
        fontSize: '20px',
        width: 'calc((100vw - 120px) / 5)',
    },
    [mediaQueries.tablet_landscape]: {
        fontSize: '25px',
    },
    [mediaQueries.desktop]: {
        fontSize: '30px',
    },
});