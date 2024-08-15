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

const CriterionComponent = ({ options, setIndex, data, setData }) => {
  return (
    <>
      {/* <Fade direction='up' duration={500}> */}
        <Container maxW={'7xl'} pt={{ base: 100, lg: '8%' }}>
          <Stack
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Heading size={'3xl'} textAlign={'center'}>
              Selamat datang di{' '}
              <Heading
                size={'3xl'}
                fontFamily={'EcoCodingWGL4'}
                //   ml={'1rem'}
                as={'span'}
                bgGradient={'linear(to-r, #6EE7B7, #3B82F6)'}
                bgClip={'text'}
              >
                byScript
              </Heading>
            </Heading>
            <Text
              mt={5}
              textAlign={'center'}
              fontSize={'xl'}
              fontWeight={'bold'}
            >
              Pilih kriteria di bawah ini yang paling cocok denganmu:
            </Text>
            <Container maxW={'xl'}>
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
                  onClick={() => setData({...data, profile : item?.title })}
                >
                  <HStack gap={2}>
                    <Checkbox isChecked={data?.profile === item.title} onChange={() => {}} size={'lg'} />
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
              {/* <Button>{'<'}- prev</Button> */}
              <Button onClick={() => setIndex((prev) => prev + 1)}>Lanjut -{'>'}</Button>
            </HStack>
          </Flex>
        </Container>
      {/* </Fade> */}
    </>
  );
};

export default CriterionComponent;
