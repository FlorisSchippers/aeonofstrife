import glamorous from 'glamorous';
import appVars from '../../config/appVars';

export default glamorous.h1({
  fontFamily: 'Open Sans',
  fontSize: '30px',
  lineHeight: '1.5',
  top: '30px',
  left: '140px',
  position: 'absolute',
  display: 'inline-block',
  color: appVars.theme.lighter,
});
