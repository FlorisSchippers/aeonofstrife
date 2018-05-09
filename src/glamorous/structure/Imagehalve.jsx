import glamorous from 'glamorous';

const mediaQueries = {
    mobile_landscape: '@media only screen and (min-width: 640px)',
    tablet_portrait: '@media only screen and (min-width: 768px)',
    tablet_landscape: '@media only screen and (min-width: 1024px)',
    desktop: '@media only screen and (min-width: 1250px)',
};

export default glamorous.div({
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'fixed',
    top: '65px',
    width: '0px',
    height: 'calc(100% - 65px)',
    display: 'inline-block',

    [mediaQueries.tablet_landscape]: {
        width: '33%',
    },
});