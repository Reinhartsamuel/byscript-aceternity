'use client';
import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Fade } from 'react-awesome-reveal';

const ActivitiesComponent = ({ data, options, setIndex, setData }) => {
  return (
    <>
      <Fade direction='up' duration={500}>
        <Container maxW={'7xl'} pt={{ base: 100, lg: '8%' }}>
          <Stack flexDirection={'column'} alignItems={'center'}>
            <Text fontSize={'xl'} fontWeight={'bold'}>
              Aktivitas:
            </Text>
            <Container maxW={'xl'} mt={10}>
              {options?.criterions?.map((item, i) => (
                <Box
                  key={i}
                  p={5}
                  borderColor={'gray'}
                  borderWidth={2}
                  cursor={'pointer'}
                  w={'100%'}
                  _hover={{
                    transition: 'all 0.1s',
                    transform: 'scale(1.01)',
                  }}
                  my={'1rem'}
                  onClick={() => setData((prev) => ({...prev, activity : item?.title }))}
                >
                  <HStack gap={2}>
                    <Checkbox isChecked={data?.activity === item.title} size={'lg'} />
                    <Stack gap={0}>
                      <Text fontWeight={'bold'}>{item?.title}</Text>
                      <Text>{item?.description}</Text>
                    </Stack>
                  </HStack>
                </Box>
              ))}
            </Container>
          </Stack>
          <Flex justifyContent={'flex-end'}>
            <HStack>
              <Button onClick={() => setIndex((prev) => prev - 1)}>
                {'<'}- Kembali
              </Button>
              <Button onClick={() => setIndex((prev) => prev + 1)}>
                Lanjut -{'>'}
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Fade>
    </>
  );
};

export default ActivitiesComponent;
