import glamorous from 'glamorous';

const mediaQueries = {
  mobile_landscape: '@media only screen and (min-width: 640px)',
  tablet_portrait: '@media only screen and (min-width: 768px)',
  tablet_landscape: '@media only screen and (min-width: 1024px)',
  desktop: '@media only screen and (min-width: 1250px)',
};

export default glamorous.div({
  display: 'inline-block',
  position: 'absolute',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  backgroundImage: 'url(/images/dota-bg-medium.jpg)',
  backgroundPosition: 'top',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});
