import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';

const gradientLayout = ({
  image,
  title,
  subtitle,
  color,
  children,
  description,
  roundImage,
}) => {
  // create props for image, title, subtitle, description, color, gradient
  return (
    <Box
      height='100%'
      overflowY='auto'
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding='40px' align='end'>
        <Box padding='20px'>
          <Image
            boxSize='160px'
            boxShadow='2xl'
            src={image}
            borderRadius={roundImage ? 'full' : '3px'}
          />
        </Box>
        {/* make container for the elements to the right of image */}
        <Box padding='20px' lineHeight='44px' color='gray.300'>
          <Text fontSize='x-small' fontWeight='bold' casing='uppercase'>
            {subtitle}
          </Text>
          <Text fontSize='6xl'>{title}</Text>
          <Text fontSize='x-small'>{description}</Text>
        </Box>
      </Flex>
      <Box paddingY='50px'>{children}</Box>
    </Box>
  );
};

export default gradientLayout;
