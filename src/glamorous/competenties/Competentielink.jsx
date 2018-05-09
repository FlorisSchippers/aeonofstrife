import glamorous from 'glamorous';
import appVars from '../../config/appVars';
import {Link} from 'react-router-dom';

export default glamorous(Link)({
    fontFamily: 'Open Sans',
    fontSize: '25px',
    color: appVars.theme.dark,
    textDecoration: 'none',
    borderBottom: '5px solid',
    borderBottomColor: appVars.theme.dark,
});