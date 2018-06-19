import glamorous from 'glamorous';
import appVars from '../../config/appVars';

export default glamorous.div({
  display: 'none',
  position: 'fixed',
  float: 'left',
  width: '250px',
  height: '100%',

  background: 'linear-gradient(to right, rgba(10, 10, 10, .25), rgba(10, 10, 10, .75)), url(/images/dota-bg-medium.jpg)',
  backgroundPosition: 'top',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',

  [appVars.mediaQueries.tablet_portrait]: {
    display: 'inline-block',
  }
});
