import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  MdVolumeUp,
  MdQueueMusic,
  MdVolumeDown,
  MdVolumeOff,
} from 'react-icons/md';
import { useStoreActions } from 'easy-peasy';

const VolumeController = ({ volume }) => {
  const setVolume = useStoreActions((state: any) => state.changeVolume);
  const [prevVol, setPrevVol] = useState(volume);

  const onVolChange = (e) => {
    setVolume(parseFloat(e[0]));
    setPrevVol(parseFloat(e[0]));
  };

  return (
    <Box>
      <Center>
        <ButtonGroup outline='none' variant='link' padding='10px'>
          <IconButton
            aria-label='music-queue'
            fontSize='24px'
            color='gray.600'
            icon={<MdQueueMusic />}
          />
          <IconButton
            aria-label='volume'
            fontSize='24px'
            color='gray.600'
            icon={
              // eslint-disable-next-line no-nested-ternary
              volume === 0 ? (
                <MdVolumeOff />
              ) : volume > 0.5 ? (
                <MdVolumeUp />
              ) : (
                <MdVolumeDown />
              )
            }
            onClick={() => {
              if (volume === 0) {
                setVolume(prevVol);
              } else {
                setVolume(0);
              }
            }}
          />
        </ButtonGroup>
        <Box width='100%' className='volume-slider'>
          <RangeSlider
            // eslint-disable-next-line jsx-a11y/aria-proptypes
            aria-label={['min', 'max']}
            width='50%'
            step={0.01}
            min={0.0}
            max={1}
            value={[volume]}
            id='volume-range'
            onChange={onVolChange}
          >
            <RangeSliderTrack bg='gray.800'>
              <RangeSliderFilledTrack
                bg='gray.400'
                _hover={{
                  bg: 'purple.400',
                }}
              />
            </RangeSliderTrack>
            <RangeSliderThumb
              index={0}
              sx={{
                visibility: 'hidden',
                transition: 'all .05s',
                '.volume-slider:hover &': {
                  visibility: 'visible',
                },
              }}
            />
          </RangeSlider>
        </Box>
      </Center>
    </Box>
  );
};

export default VolumeController;
