import glamorous from 'glamorous';

const mediaQueries = {
  mobile_landscape: '@media only screen and (min-width: 640px)',
  tablet_portrait: '@media only screen and (min-width: 768px)',
  tablet_landscape: '@media only screen and (min-width: 1024px)',
  desktop: '@media only screen and (min-width: 1250px)',
};

export default glamorous.div({
  float: 'left',
  position: 'relative',
  width: '250px',
  height: '100vh',
  background: 'linear-gradient(to right, rgba(10,10,10,0.5), rgba(10,10,10,0.25))',
  display: 'none',

  [mediaQueries.tablet_portrait]: {
    display: 'inline-block',
  }
});
