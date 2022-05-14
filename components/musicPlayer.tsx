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

const MusicPlayer = ({ songs, activeSong }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [index, setIndex] = useState(0);
  const [seekVal, setSeekVal] = useState(0.0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const soundRef = useRef(null);

  const setPlayState = (value) => {
    setIsPlaying(value);
  };

  const onShuffle = () => {
    setShuffle((state) => !state);
  };

  const onRepeat = () => {
    setRepeat((state) => !state);
  };

  return (
    <Box>
      <Box>
        <ReactHowler playing={isPlaying} src={activeSong?.url} ref={soundRef} />
      </Box>
      <Center color='gray.600'>
        <ButtonGroup outline='none' variant='link'>
          <IconButton
            aria-label='shuffle'
            fontSize='24px'
            color={shuffle ? 'white' : 'gray.600'}
            icon={<MdShuffle />}
            onClick={onShuffle}
          />
          <IconButton
            aria-label='skip'
            fontSize='24px'
            icon={<MdSkipPrevious />}
          />
          {isPlaying ? (
            <IconButton
              aria-label='pause'
              fontSize='40px'
              color='white'
              icon={<MdPauseCircleFilled />}
              onClick={() => setPlayState(false)}
            />
          ) : (
            <IconButton
              aria-label='play'
              fontSize='40px'
              color='white'
              icon={<MdPlayCircleFilled />}
              onClick={() => setPlayState(true)}
            />
          )}

          <IconButton
            aria-label='pause'
            fontSize='24px'
            icon={<MdSkipNext />}
          />
          <IconButton
            aria-label='pause'
            fontSize='24px'
            color={repeat ? 'white' : 'gray.600'}
            icon={<MdRepeat />}
            onClick={onRepeat}
          />
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
