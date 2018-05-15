import glamorous from 'glamorous';

const mediaQueries = {
  mobile_landscape: '@media only screen and (min-width: 640px)',
  tablet_portrait: '@media only screen and (min-width: 768px)',
  tablet_landscape: '@media only screen and (min-width: 1024px)',
  desktop: '@media only screen and (min-width: 1250px)',
};

export default glamorous.img({
  width: '0px',
  margin: '0',

  [mediaQueries.tablet_portrait]: {
    width: '100px',
    margin: '25px calc((250px - 100px) / 2)',
  },
});
