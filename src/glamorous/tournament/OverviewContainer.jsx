import glamorous from 'glamorous';
import appVars from "../../config/appVars";

export default glamorous.div({
  fontFamily: 'Open Sans',
  fontSize: '15px',
  lineHeight: '1.5',
  width: 'fit-content',
  display: 'block',
  position: 'relative',
  marginBottom: '25px',
  padding: '15px',
  border: '2px solid grey',
  borderRadius: '5px',

  background: 'linear-gradient(to right, rgba(10, 10, 10, .25), rgba(10, 10, 10, .75))',
  backgroundPosition: 'top',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});
