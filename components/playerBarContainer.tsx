import { Box, Flex, Text } from '@chakra-ui/layout';
import { useStoreState } from 'easy-peasy';
import MusicPlayer from './musicPlayer';

const PlayerBarContianer = () => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Box height='100px' width='100vw' bg='gray.900' padding='10px'>
      <Flex align='center'>
        {activeSong ? (
          <Box padding='20px' color='gray.300' width='30%'>
            <Text fontSize='large'>{activeSong.name}</Text>
            <Text fontSize='sm' color='gray.500'>
              {activeSong.artist.name}
            </Text>
          </Box>
        ) : (
          <Box padding='20px' color='gray.400' width='30%' />
        )}
        {activeSong ? (
          <Box padding='20px' color='gray.400' width='40%'>
            <MusicPlayer songs={songs} activeSong={activeSong} />
          </Box>
        ) : (
          <Box padding='20px' color='gray.400' width='40%' />
        )}
        <Box padding='20px' color='gray.400' width='30%'>
          <Text fontSize='large' align='right'>
            VOLUME CONTROLS
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBarContianer;
