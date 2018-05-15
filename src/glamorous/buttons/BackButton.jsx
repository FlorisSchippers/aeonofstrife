import glamorous from 'glamorous';
import appVars from '../../config/appVars';
import {Link} from 'react-router-dom';

export default glamorous(Link)({
  background: appVars.theme.dark,
  color: 'white',
  border: '0px',
  borderRadius: '50%',
  height: '50px',
  width: '50px',
  outline: 'none',
  position: 'fixed',
  left: '15px',
  bottom: '15px',
  zIndex: '1',
  transition: 'background-color 0.25s linear',

  ':after': {
    content: ' ',
    position: 'absolute',
    left: '21px',
    top: '9px',
    height: '10px',
    width: '10px',
    transform: 'rotate(225deg) translate3d(-50%, -50%, 0)',
    borderRight: '3px solid',
    borderTop: '3px solid',
    borderColor: appVars.theme.lighter,
  },

  '&:hover': {
    backgroundColor: appVars.theme.primary,
  },
});

