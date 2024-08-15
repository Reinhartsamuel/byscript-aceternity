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
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { Fade } from 'react-awesome-reveal';
import Cities from '../config/cititesAndRegions.json';

const ProfileComponent = ({ setIndex, data, setData }) => {
  const toast = useToast();
  const handlePhone = (e) => {
    let phone = '62' + e.target.value;

    if (phone.startsWith('620')) phone = '62' + phone.slice(3);
    if (phone.startsWith('+')) phone = phone.slice(1);

    setData({ ...data, phoneNumber: phone });

  };

  const validate = () => {
    if (!data?.name || !data?.email || !data?.phoneNumber)
      return toast({
        title: 'Data belum lengkap!',
        description:
          'Mohon lengkapi semua data sebelum lanjut ke step berikutnya',
        status: 'error',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      });

    setIndex((prev) => prev + 1);
  };
  return (
    <>
      {/* <Fade direction='up' duration={500}> */}
      <Container maxW={'7xl'} pt={{ base: 100, lg: '8%' }}>
        <Stack
          flexDirection={'column'}
          // alignItems={'center'}
          // justifyContent={'center'}
        >
          <Text mt={5} textAlign={'center'} fontSize={'xl'} fontWeight={'bold'}>
            Isi data diri kamu dengan benar:
          </Text>

          <Stack mt={10}>
            <Box>
              <Text>Nama Lengkap</Text>
              <Input
                _placeholder={{ color: 'gray.100' }}
                placeholder={'Masukkan nama anda'}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                value={data?.name}
                defaultValue={data?.name}
              />
            </Box>
            <Box>
              <Text>Email</Text>
              <Input
                _placeholder={{ color: 'gray.100' }}
                placeholder={'Masukkan email'}
                type={'email'}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                value={data?.email}
                defaultValue={data?.email}
              />
            </Box>
            <Box>
              <Text>Nomor Telepon (WA aktif)</Text>
              <InputGroup>
                <InputLeftAddon>+62</InputLeftAddon>
                <Input
                  // bg={'white'}
                  color={'white'}
                  _placeholder={{ color: 'gray.100' }}
                  type={'tel'}
                  placeholder={'Masukkan nomor telepon'}
                  onChange={handlePhone}
                  // value={data?.phoneNumber}
                />
              </InputGroup>
            </Box>
            <Box>
              <Text>Kota</Text>
              <Select
                onChange={(e) => setData({ ...data, city: e.target.value })}
              >
                {Cities?.map((x, i) => (
                  <option key={i} value={`${x?.type} ${x?.city_name}`}>
                    {x?.city_name} ({x?.type})
                  </option>
                ))}
              </Select>
            </Box>
            {/* <Box>
                <Text>Alamat</Text>
                <Textarea
                  _placeholder={{ color: 'gray.100' }}
                  placeholder={'Alamat lengkap'}
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
                  value={data?.address}
                />
              </Box> */}
          </Stack>
        </Stack>
        <Flex justifyContent={'flex-end'} mt={10}>
          <HStack>
            <Button onClick={() => setIndex((prev) => prev - 1)}>
              {'<'}- Kembali
            </Button>
            <Button onClick={validate}>Lanjut -{'>'}</Button>
          </HStack>
        </Flex>
      </Container>
      {/* </Fade> */}
    </>
  );
};

export default ProfileComponent;
