import useSWR from 'swr';
import fetcher from './fetcher';

// create hook to get the user
export const useMe = () => {
  const { data, error } = useSWR('/me', fetcher);

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};

// create hook to get all the playlists
export const usePlaylist = () => {
  const { data, error } = useSWR('/playlist', fetcher);

  return {
    playlists: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  };
};
