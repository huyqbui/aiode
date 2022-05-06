import NextImage from 'next/image';
import NextLink from 'next/link'; // allows opt for client side rendering
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  Center,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/layout';

import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from 'react-icons/md';

import Menu from './Menu';

const navMenu = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/',
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search',
  },
  {
    name: 'Your Library',
    icon: MdLibraryMusic,
    route: '/library',
  },
];

const musicMenu = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/',
  },
  {
    name: 'Favorites',
    icon: MdFavorite,
    route: '/favorites',
  },
];

const playlists = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`);

const Sidebar = () => {
  return (
    <Box // outer content box
      width='100%'
      height='calc(100vh - 100px)'
      bg='black'
      paddingX='5px'
      color='gray'
    >
      <Box paddingY='20px' height='100%'>
        {/*  // inner div for all the content */}
        <Box width='120' marginBottom='20px' paddingX='20px'>
          <NextImage src='/aiode-logo-wide.png' height={100} width={200} />
        </Box>
        {/* NAV MENU BOX  */}
        <Box marginBottom='20px'>
          <List spacing={2}>
            {navMenu.map((item) => (
              <Menu name={item.name} icon={item.icon} route={item.route} />
            ))}
          </List>
        </Box>
        {/* MUSIC MENU BOX */}
        <Box marginTop='20px'>
          <List spacing={2}>
            {musicMenu.map((item) => (
              <Menu name={item.name} icon={item.icon} route={item.route} />
            ))}
          </List>
        </Box>
        <Divider color='gray.800' />
        {/* Box for playlists that can scroll */}
        <Box paddingY='20px' height='50%' overflowY='auto'>
          <List spacing={2}>
            {playlists.map((playlist) => (
              <ListItem paddingX='20px' key={playlist}>
                <LinkBox>
                  <NextLink href='/' passHref>
                    <LinkOverlay>{playlist}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
