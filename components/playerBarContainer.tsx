import { Box, Flex, Text } from '@chakra-ui/layout';
import MusicPlayer from './musicPlayer';

const PlayerBarContianer = () => {
  return (
    <Box height='100px' width='100vw' bg='gray.900' padding='10px'>
      <Flex align='center'>
        <Box padding='20px' color='gray.400' width='30%'>
          <Text fontSize='large'>Song Name</Text>
          <Text fontSize='sm'>Artist Name</Text>
        </Box>
        <Box padding='20px' color='gray.400' width='40%'>
          <MusicPlayer />
        </Box>
        <Box padding='20px' color='gray.400' width='30%'>
          <Text fontSize='large' align='right'>VOLUME CONTROLS</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBarContianer;
