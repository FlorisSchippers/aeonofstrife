import glamorous from 'glamorous';
import appVars from '../../config/appVars';

export default glamorous.div({
    color: appVars.theme.lighter,
    fontFamily: 'Open Sans',
    fontSize: '20px',
    lineHeight: '1.5',
    fontWeight: 'normal',

    ['& a']: {
        color: appVars.theme.light,
        transition: 'color 0.25s linear',

        '&:hover': {
            color: appVars.theme.primary,
        }
    }
});
