import styled from 'styled-components';
import theme from 'ui/theme';

const FormFieldLbl = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  padding-top: 20px;
  padding-bottom: 0;
  margin: 0;
  font-size: .8em;
  color: ${theme.midGrey};
  font-weight: 400;
  user-select: none;
  cursor: text;
`;

export default FormFieldLbl;
