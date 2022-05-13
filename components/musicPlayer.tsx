import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from '@chakra-ui/react';
import ReactHowler from 'react-howler';
import { useEffect, useRef, useState } from 'react';
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdRepeat,
} from 'react-icons/md';
import { useStoreActions } from 'easy-peasy';

const MusicPlayer = () => {
  return (
    <Box>
      <Box>{/* <ReactHowler /> */}</Box>
      <Center color='gray.600'>
        <ButtonGroup outline='none' variant='link'>
          <IconButton
            aria-label='shuffle'
            fontSize='24px'
            icon={<MdShuffle />}
          />
          <IconButton
            aria-label='skip'
            fontSize='24px'
            icon={<MdSkipPrevious />}
          />
          <IconButton
            aria-label='play'
            fontSize='40px'
            color='white'
            icon={<MdPlayCircleFilled />}
          />
          <IconButton
            aria-label='pause'
            fontSize='40px'
            color='white'
            icon={<MdPauseCircleFilled />}
          />
          <IconButton
            aria-label='pause'
            fontSize='24px'
            icon={<MdSkipNext />}
          />
          <IconButton aria-label='pause' fontSize='24px' icon={<MdRepeat />} />
        </ButtonGroup>
      </Center>
      <Box color='gray.600'>
        <Flex justify='center' align='center'>
          <Box width='10%'>
            <Text fontSize='xs'>0:00</Text>
          </Box>
          <Box width='80%'>
            <RangeSlider
              // eslint-disable-next-line jsx-a11y/aria-proptypes
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              max={321}
              id='player-range'
            >
              <RangeSliderTrack bg='gray.800'>
                <RangeSliderFilledTrack bg='gray.600' />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width='10%' textAlign='right'>
            <Text fontSize='xs'>3:00</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default MusicPlayer;
