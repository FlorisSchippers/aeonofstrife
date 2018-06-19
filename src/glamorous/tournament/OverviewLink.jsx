import glamorous from 'glamorous';
import appVars from '../../config/appVars';
import {Link} from 'react-router-dom';

export default glamorous(Link)({
  fontFamily: 'Open Sans',
  fontSize: '25px',
  lineHeight: '1.5',
  display: 'inline-block',
  position: 'relative',
  // left: '15px',
  bottom: '25px',
  margin: '0 15px',
  color: appVars.theme.lighter,
  textDecoration: 'none',
  borderBottom: '5px solid',
  borderBottomColor: appVars.theme.dark,
  transition: 'color 0.25s linear',

  '&:hover': {
    color: appVars.theme.light,
  }
});
