import glamorous from 'glamorous';

const mediaQueries = {
  mobile_landscape: '@media only screen and (min-width: 640px)',
  tablet_portrait: '@media only screen and (min-width: 768px)',
  tablet_landscape: '@media only screen and (min-width: 1024px)',
  desktop: '@media only screen and (min-width: 1250px)',
};

export default glamorous.div({
  float: 'left',
  fontFamily: 'Open Sans',
  fontSize: '17px',
  lineHeight: '1.5',
  width: 'calc(100% - 50px)',
  height: 'calc(100% - 50px)',
  display: 'inline-block',
  position: 'relative',
  padding: '25px',

  [mediaQueries.tablet_portrait]: {
    float: 'right',
    width: 'calc(100% - 250px - 50px)',
  }
});
