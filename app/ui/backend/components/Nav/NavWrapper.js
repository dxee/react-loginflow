import styled from 'styled-components';
import theme from 'ui/theme';

const NavWrapper = styled.div`
  max-width: ${theme.maxWidth};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`;

export default NavWrapper;
