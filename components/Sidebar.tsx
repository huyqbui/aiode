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

const Sidebar = () => {
  return (
    <Box // outer content box
      width='100%'
      height='calc(100vh - 100px)'
      bg='black'
      paddingX='5px'
      color='gray'
    >
      <Box paddingY='20px'>
        {/*  // inner div for all the content */}
        <Box width='120px' marginBottom='20px' paddingX='20px'>
          <NextImage src='/logo.png' height={69} width={69} />
          AIODE
        </Box>
        {/* NAV MENU BOX  */}
        <Box marginBottom='20px'>
          <List spacing={2}>
            {navMenu.map((item) => (
              <Menu name={item.name} icon={item.icon} route={item.route} />
            ))}
          </List>
        </Box>
        <Divider color='gray.800' />
        {/* MUSIC MENU BOX */}
        <Box marginTop='20px'>
          <List spacing={2}>
            {musicMenu.map((item) => (
              <Menu name={item.name} icon={item.icon} route={item.route} />
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
