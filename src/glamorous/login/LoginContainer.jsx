import glamorous from 'glamorous';
import appVars from "../../config/appVars";

export default glamorous.div({
  display: 'none',
  position: 'fixed',
  top: '0',
  right: '0',
  margin: '0',
  padding: '0 0 15px 15px',
  borderRadius: '0 0 0 15px',
  textAlign: 'right',
  background: 'linear-gradient(to left, rgba(10, 10, 10, .25), rgba(10, 10, 10, .75))',

  [appVars.mediaQueries.tablet_portrait]: {
    display: 'inline-block',
  }
});
