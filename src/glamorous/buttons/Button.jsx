import glamorous from 'glamorous';
import appVars from '../../config/appVars';

export default glamorous.button({
  backgroundColor: '#7B9F35',
  color: '#DDFAA4',
  cursor: 'pointer',
  border: '0',
  borderRadius: '46px',
  // fontFamily: 'gothammedium',
  fontSize: '18px',
  height: '46px',
  lineHeight: '46px',
  minWidth: '200px',
  outline: 'none',
  transition: 'background-color 0.3s linear',
  boxSizing: 'content-box',

  '&:hover': {
    backgroundColor: '#425B10',
  },
});
