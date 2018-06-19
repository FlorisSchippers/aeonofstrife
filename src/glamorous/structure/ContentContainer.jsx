import glamorous from 'glamorous';
import appVars from '../../config/appVars';

export default glamorous.div({
  display: 'inline-block',
  position: 'relative',
  float: 'left',
  width: 'calc(100% - 50px)',
  minHeight: 'calc(100% - 50px)',
  margin: '0',
  padding: '25px',

  fontFamily: 'Open Sans',
  fontSize: '17px',
  lineHeight: '1.5',

  backgroundImage: 'url(/images/dota-bg-medium.jpg)',
  backgroundPosition: 'top',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',

  [appVars.mediaQueries.tablet_portrait]: {
    width: 'calc(100% - 250px - 50px)',
    margin: '0 0 0 250px',
  }
});
