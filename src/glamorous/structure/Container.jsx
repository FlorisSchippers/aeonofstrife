import glamorous from 'glamorous';

const mediaQueries = {
    mobile_landscape: '@media only screen and (min-width: 640px)',
    tablet_portrait: '@media only screen and (min-width: 768px)',
    tablet_landscape: '@media only screen and (min-width: 1024px)',
    desktop: '@media only screen and (min-width: 1250px)',
};

export default glamorous.div({
    width: '100vw',
    height: '100vh',
    display: 'inline-block',
    position: 'relative',
    backgroundImage: 'url(/images/dota-bg-medium.jpg)',
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
});
