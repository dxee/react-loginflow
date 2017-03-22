import styled from 'styled-components';
import theme from 'ui/theme';

const FormFieldIpt = styled.input`
  position: relative;
  padding: 1.625em 16px;
  width: 100%;
  color: ${theme.darkGrey};
  border: none;
  outline: 0;
  letter-spacing: 0.05em;

  &:focus{
    border: none;
  }
`;

export default FormFieldIpt;
