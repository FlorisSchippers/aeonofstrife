import glamorous from 'glamorous';
import appVars from '../../config/appVars';

export default glamorous.h1({
    fontFamily: 'Open Sans',
    fontSize: '25px',
    lineHeight: '1.5',
    fontStyle: 'italic',
    margin: '15px 0',
    color: appVars.theme.primary,
});
