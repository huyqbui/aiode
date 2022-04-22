import { ListItem, LinkBox, LinkOverlay, ListIcon } from '@chakra-ui/layout';
import NextLink from 'next/link';

const Menu = (item) => {
  const { name, route, icon } = item;

  return (
    <ListItem paddingX='20px' fontSize='16px' key={name}>
      <LinkBox>
        <NextLink href={route} passHref>
          <LinkOverlay>
            <ListIcon as={icon} color='white' marginRight='20px' />
            {name}
          </LinkOverlay>
        </NextLink>
      </LinkBox>
    </ListItem>
  );
};

export default Menu;
