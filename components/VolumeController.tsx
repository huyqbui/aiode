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
import { useEffect, useState } from 'react';
import { MdVolumeUp, MdQueueMusic, MdVolumeDown } from 'react-icons/md';
import { useStoreActions, useStoreState } from 'easy-peasy';

const VolumeController = () => {
  const stateVolume = useStoreState((state: any) => state.volume);
  const changeVolume = useStoreActions((state: any) => state.changeVolume);
  const [volume, setVolume] = useState(stateVolume);

  useEffect(() => {
    changeVolume(volume);
  }, [volume, changeVolume]);

  const onVolChange = (e) => {
    setVolume(parseFloat(e[0]));
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
            icon={volume > 0.5 ? <MdVolumeUp /> : <MdVolumeDown />}
          />
        </ButtonGroup>
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
            <RangeSliderFilledTrack bg='gray.400' />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
        </RangeSlider>
      </Center>
    </Box>
  );
};

export default VolumeController;
