import glamorous from 'glamorous';
import appVars from '../../config/appVars';

export default glamorous.h1({
    fontFamily: 'Open Sans',
    fontSize: '30px',
    lineHeight: '1.5',
    margin: '0 auto 25px',
    display: 'inline-block',
    color: appVars.theme.lighter,
});
