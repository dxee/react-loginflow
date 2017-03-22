import styled from 'styled-components';
import theme from 'ui/theme';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${theme.navHeight};
  box-shadow: 0 0 2px rgba(0,0,0,.5);
  padding: 1em;
  display: flex;
  align-items: center;
  background-color: ${theme.backgroundColor};
  z-index: 1;
`;

export default Wrapper;
