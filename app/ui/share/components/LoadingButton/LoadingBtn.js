import styled from 'styled-components';
import Btn from '../Btn';
import theme from 'ui/theme';

const LoadingBtn = styled(Btn)`
  color: white;
  background-color: ${theme.brandColor};
`;

export default LoadingBtn;
