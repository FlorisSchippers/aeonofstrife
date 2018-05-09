import glamorous from 'glamorous';
import appVars from '../../config/appVars';

export default glamorous.li({
    margin: '15px 0',

    '&:before': {
        content: '➤ ',
        color: appVars.theme.primary,
    }
});