import styled from 'styled-components';
import theme from 'ui/theme';

const P = styled.p`
  background-color: ${theme.errorColor};
  color: white;
  margin: 0;
  padding: 0.5em 1em;
  font-size: 0.8em;
  font-family: ${theme.textFontStack};
  user-select: none;
`;

export default P;
