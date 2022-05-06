import { Box, Flex } from '@chakra-ui/layout';
import { Input, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FC, useState } from 'react';
import { useSWRConfig } from 'swr';
import NextImage from 'next/image';
import { auth } from '../lib/mutations';

// useSWRConfig is the hook we'll use to update the local cache of our app
// propagate data we receive across our whole app

const AuthForm: FC<{ mode: 'login' | 'signup' }> = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await auth(mode, { email, password });
    setIsLoading(false);
    router.push('/');
  };

  const handleSignup = (e) => {
    router.push('/signup');
  };
  return (
    <Box height='100vh' width='100vw' bg='black'>
      <Flex
        justify='center'
        align='center'
        height='100px'
        borderBottom='white 1px solid'
      >
        <NextImage src='/aiode-logo-wide.png' height={150} width={300} />
      </Flex>
      <Flex justify='center' align='center' height='calc(100vh - 100px)'>
        <Box padding='50px' bg='gray.900' borderRadius='6px'>
          <form onSubmit={handleSubmit}>
            <Input
              margin='5px'
              placeholder='email'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              margin='5px'
              placeholder='password'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              margin='5px'
              type='submit'
              bg='purple.500'
              isLoading={isLoading}
              sx={{
                '&:hover': {
                  bg: 'purple.400',
                },
              }}
            >
              {mode}
            </Button>
          </form>
          {mode === 'login' ? (
            <h2 style={{ color: 'gray', paddingLeft: '5px' }}>
              <Link href='/signup'>
                <a>Sign up here!</a>
              </Link>
            </h2>
          ) : (
            <h2 style={{ color: 'gray', paddingLeft: '5px' }}>
              <Link href='/login'>
                <a>Login here!</a>
              </Link>
            </h2>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
