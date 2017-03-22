import styled from 'styled-components';
import theme from 'ui/theme';

const Wrapper = styled.div`
  max-width: calc(${theme.maxWidth} + 16px * 2);
  margin: 0 auto;
  display: flex;
  height: 100%;
  padding: 0 16px;
`;

export default Wrapper;
