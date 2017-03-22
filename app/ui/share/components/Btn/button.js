import styled from 'styled-components';
import theme from 'ui/theme';

const button = styled.button`
  padding: 0.5em 1.5em;
  color: ${theme.brandColor};
  border: 1px solid ${theme.brandColor};
  border-radius: 3px;
  text-decoration: none;
  user-select: none;
  display: inline-block;

  &:hover, &:focus {
    color: white;
    background-color: ${theme.brandColor};
  }
`;

export default button;
