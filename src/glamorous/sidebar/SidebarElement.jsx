import glamorous from 'glamorous';
import appVars from '../../config/appVars';

export default glamorous.div({
  margin: '0 0 15px 15px',

  '&:before': {
    content: '➤ ',
    color: appVars.theme.lighter,
  }
});
