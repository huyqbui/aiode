import fetcher from './fetcher';

// a function that will make an API call to either login or signup using the fetcher
export const auth = (
  mode: 'login' | 'signup',
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body);
};
