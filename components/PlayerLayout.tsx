// build the layout of the app:
// the sidebar, the bottom playbar, the component for the pages

import { Box } from '@chakra-ui/layout';
import PlayerBarContainer from './playerBarContainer';
import Sidebar from './Sidebar';

const PlayerLayout = ({ children }) => {
  return (
    <Box width='100vw' height='100vh'>
      <Box position='absolute' top='0' width='250px' left='0'>
        <Sidebar />
      </Box>
      <Box marginLeft='250px' marginBottom='100px'>
        <Box height='calc(100vh - 100px)'>{children}</Box>
      </Box>
      <Box position='absolute' left='0' bottom='0'>
        <PlayerBarContainer />
      </Box>
    </Box>
  );
};

export default PlayerLayout;
