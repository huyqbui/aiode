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
import { formatTime } from '../lib/formatters';

const MusicPlayer = ({ songs, activeSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(
    songs.findIndex((s) => s.id === activeSong.id)
  );
  const [seekVal, setSeekVal] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const soundRef = useRef(null);
  const repeatRef = useRef(repeat);
  const changeActiveSong = useStoreActions(
    (state: any) => state.changeActiveSong
  );

  // tracks playing state and isSeeking state,
  useEffect(() => {
    let timerId;
    // request only if song is playing, and user is not seeking
    if (isPlaying && !isSeeking) {
      const updateSeek = () => {
        setSeekVal(soundRef.current.seek());
        timerId = requestAnimationFrame(updateSeek);
      };

      timerId = requestAnimationFrame(updateSeek);
      return () => cancelAnimationFrame(timerId);
    }

    cancelAnimationFrame(timerId);
  }, [isPlaying, isSeeking]);

  useEffect(() => {
    changeActiveSong(songs[index]);
  }, [index, changeActiveSong, songs]);

  // track and update repeatRef
  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  // callbacks to handle music controls:
  const setPlayState = (value) => {
    setIsPlaying(value);
  };

  const onShuffle = () => {
    setShuffle((state) => !state);
  };

  const onRepeat = () => {
    setRepeat((state) => !state);
  };

  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1;
    });
  };

  const nextSong = () => {
    setIndex((state) => {
      if (shuffle) {
        // shuffle logic here
        const next = Math.floor(Math.random() * songs.length);
        if (next === state) {
          return nextSong();
        }
        return next;
      }

      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  // callback when song ends
  const onEnd = () => {
    if (repeatRef.current) {
      setSeekVal(0);
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  // callback when loading a song, get the duration
  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e) => {
    // chakra's range component returns an array of values, so we grab the first value
    setSeekVal(parseFloat(e[0]));
    soundRef.current.seek(e[0]);
  };

  return (
    <Box>
      <Box>
        <ReactHowler
          playing={isPlaying}
          src={activeSong?.url}
          ref={soundRef}
          onLoad={onLoad}
          onEnd={onEnd}
        />
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
            aria-label='previous'
            fontSize='24px'
            icon={<MdSkipPrevious />}
            onClick={prevSong}
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
            aria-label='skip next'
            fontSize='24px'
            icon={<MdSkipNext />}
            onClick={nextSong}
          />
          <IconButton
            aria-label='repeat'
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
            <Text fontSize='xs'>{formatTime(seekVal)}</Text>
          </Box>
          <Box width='80%'>
            <RangeSlider
              // eslint-disable-next-line jsx-a11y/aria-proptypes
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              max={duration ? parseFloat(duration.toFixed(2)) : 0}
              id='player-range'
              onChange={onSeek}
              value={[seekVal]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg='gray.800'>
                <RangeSliderFilledTrack bg='gray.600' />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width='10%' textAlign='right'>
            <Text fontSize='xs'>{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default MusicPlayer;
