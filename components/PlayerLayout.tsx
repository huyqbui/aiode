// build the layout of the app:
// the sidebar, the bottom playbar, the component for the pages

import { Box } from '@chakra-ui/layout';

const PlayerLayout = ({ children }) => {
  return (
    <Box>
      Layout
      {children}
    </Box>
  );
};

export default PlayerLayout;
