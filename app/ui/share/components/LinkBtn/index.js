import styled from 'styled-components';
import { Link } from 'react-router';
import theme from 'ui/theme';

const LinkBtn = styled(Link)`
  padding: 0.5em 1.5em;
  color: ${theme.brandColor};
  border: 1px solid ${theme.brandColor};
  border-radius: 3px;
  text-decoration: none;
  user-select: none;
  display: inline-block;

  &:hover, &:focus {
    color: ${theme.darkBrandColor};
    background-color: ${theme.brandColor};
  }
`;

export default LinkBtn;
