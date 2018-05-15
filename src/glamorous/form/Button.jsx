import glamorous from 'glamorous';
import appVars from "../../config/appVars";

export default glamorous.button({
  cursor: 'pointer',
  background: 'rgba(1, 1, 1, 0)',
  border: '2px solid',
  borderColor: appVars.theme.dark,
  color: appVars.theme.dark,
  padding: '5px 10px',
  borderRadius: '5px',
  transition: '.5s',

  '&:hover': {
    color: appVars.theme.primary,
    borderColor: appVars.theme.primary,
  }
});
