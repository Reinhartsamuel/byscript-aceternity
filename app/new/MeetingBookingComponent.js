'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Container,
  Flex,
  HStack,
  Stack,
  Text,
  Heading,
  Input,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Image,
  Divider,
  Center,
  useToast,
} from '@chakra-ui/react';
import { Fade } from 'react-awesome-reveal';
import Calendar from 'react-calendar';
import moment from 'moment';
import './calendar.css';
import { localeId } from './momentLocale';
import { FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import { SiGooglemeet } from 'react-icons/si';

const images = [
  'https://firebasestorage.googleapis.com/v0/b/saudagar-staging.appspot.com/o/transfer-receipt%2FKrTqD6lD4yQtTW0SyKe2pFTUFbx2%2FWhatsApp%20Image%202024-07-03%20at%2016.47.07%20(1).jpeg?alt=media&token=adc17bb9-b5fd-4164-ad9a-ffc1f5a4b731',
  'https://firebasestorage.googleapis.com/v0/b/saudagar-staging.appspot.com/o/transfer-receipt%2FKrTqD6lD4yQtTW0SyKe2pFTUFbx2%2FWhatsApp%20Image%202024-07-03%20at%2016.47.07.jpeg?alt=media&token=2ffe2868-5089-4c0e-86e9-4fa1a2cbbcb1',
  'https://firebasestorage.googleapis.com/v0/b/saudagar-staging.appspot.com/o/transfer-receipt%2FKrTqD6lD4yQtTW0SyKe2pFTUFbx2%2Fstory.jpg?alt=media&token=1efc590d-b2d7-4f6f-8402-319cf15b3d82',
  'https://i.ibb.co.com/X7kP5mR/gmeet.jpg'
];
const meet =
  'https://firebasestorage.googleapis.com/v0/b/saudagar-staging.appspot.com/o/transfer-receipt%2FKrTqD6lD4yQtTW0SyKe2pFTUFbx2%2Fgoogle-meet.256x256.png?alt=media&token=34ef05de-b914-4adf-8444-11d27bec8fdc';

const MeetingBookingComponent = ({ setIndex, data, setData }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const inputDateRef = useRef();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast();

  const handleNext = () => {
    console.log(data)
    setIndex((prev) => prev + 1);
    onClose();
  };

  const handleOpenModal = () => {
    // const inTimeWindow = moment(selectedDate).isBetween(moment('11:00', 'HH:mm'), moment('17:00', 'HH:mm'));
    const inTimeWindow = moment(selectedDate).format('HH') >= '11' && moment(selectedDate).format('HH') <= '17' && moment(selectedDate).format('mm') <= '59';
    console.log(moment(selectedDate).format('HH:mm'));
    console.log(inTimeWindow, 'inTimeWindow')
    if (!inTimeWindow) return toast({status : 'error', title : 'Tidak tersedia', description: 'Mohon pilih waktu antara 11:00 - 17:00 WIB', duration: 3000, position:'top-right'})
    onOpen();
    setData({
      ...data,
      conferenceStart : moment(selectedDate).utcOffset(7 * 60).format(),
      conferenceEnd : moment(selectedDate).utcOffset(7 * 60).add(1, 'hours').format()
    })
  }

  useEffect(() => {
    localeId();
  }, []);
  return (
    <>
      {/* <Fade direction='up' duration={500}> */}
      <Container maxW={'7xl'} pt={{ base: 100, lg: '8%' }}>
        <Stack
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          mb={20}
        >
          <HStack mt={5}>
            <Image w={50} src={meet} />
            <Text textAlign={'center'} fontSize={'xl'} fontWeight={'bold'}>
              Pilih tanggal online meeting onboarding 1 on 1 dengan tim kami:
            </Text>
          </HStack>

          <SimpleGrid columns={[1, 2]} gap={[0, 10]} mt={20}>
            <Calendar
              onChange={(e) => setSelectedDate(e)}
              minDate={new Date()}
              maxDate={moment().add(7, 'days').toDate()}
              activeStartDate={new Date()}
            />
            <Stack alignItems={['center', 'flex-start']}>
              <Heading>
                {moment(selectedDate).format('dddd, D MMMM YYYY')}
              </Heading>
              <Heading size={'md'}>
                {moment(selectedDate).format('HH:mm')} WIB
              </Heading>
              <Text>Pilih Jam : </Text>
              {/* <Center> */}
              <Input
                minDate={new Date()}
                maxW={{ base: '50%', lg: '10rem' }}
                fontSize={20}
                fontWeight={'bold'}
                // h={100}
                ref={inputDateRef}
                onChange={(e) => {
                  setSelectedDate((prev) =>
                    moment(prev).set({
                      hour: parseInt(e.target.value.split(':')[0]),
                      minute: parseInt(e.target.value.split(':')[1]),
                    })
                  );
                }}
                value={moment(selectedDate).format('HH:mm')}
                type={'time'}
              />
              <Text color={'yellow'} fontWeight={'bold'}as={'i'}>Harap memilih antara pukul 11:00 - 17:00</Text>
            </Stack>
          </SimpleGrid>
          <Text textAlign={'center'} color={'gray.300'} as={'i'}>
            <sup>*</sup>Kamu akan menerima undangan Google Meet via email untuk
            onboarding auto trade bersama byScript. GRATIS satu bulan
            subscription trading plan untuk satu akun exchange
          </Text>
        </Stack>
        <Flex justifyContent={'flex-end'}>
          <HStack>
            <Button onClick={() => setIndex((prev) => prev - 1)}>
              {'<'}- Kembali
            </Button>
            <Button onClick={handleOpenModal}>Lanjut -{'>'}</Button>
          </HStack>
        </Flex>

        <Divider my={10} />

        <SimpleGrid
          alignItems={'center'}
          justifyContent={'center'}
          columns={[1, 2, 3]}
          mt={10}
        >
          {images.map((x, i) => (
            <Image
              key={i}
              w={'full'}
              // aspectRatio={12 / 9}
              objectFit={'cover'}
              src={x}
              alt={'onboarding'}
            />
          ))}
        </SimpleGrid>
      </Container>
      {/* </Fade> */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: 'full', md: 'lg' }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='lg' fontWeight='bold'>
            <HStack>
              <SiGooglemeet />
              <Heading
                size={'xl'}
                bgGradient={'linear(to-r, #FF0080, white)'}
                bgClip={'text'}
              >
                Pilih jadwal onboarding
              </Heading>
            </HStack>
          </ModalHeader>

          <ModalBody>
            <Stack gap={10}>
              <Stack alignItems={'center'}>
                <Heading size={'md'}>
                  Apakah tanggal onboarding sudah sesuai?
                </Heading>
                <Text>
                  Tanggal onboarding dapat disesuaikan kembali dengan tim kami
                  sesuai ketersediaan kursi
                </Text>
              </Stack>
              <Stack
                alignItems={'center'}
                justifyContent={'center'}
                p={5}
                borderWidth={2}
                borderRadius={10}
              >
                <HStack>
                  <FaRegCalendarCheck size={40} />
                  <Heading color={'aquamarine'} shadow={'xl'}>
                    {moment(selectedDate).format('dddd, D MMMM YYYY')}
                  </Heading>
                </HStack>
                <HStack>
                  <FaRegClock size={40} />
                  <Heading color={'gray.100'}>
                    {moment(selectedDate).format('HH:mm')} WIB
                  </Heading>
                </HStack>
              </Stack>
            </Stack>
            <Center mt={10}>
              <Button
                variant={'outline'}
                colorScheme='red'
                ref={cancelRef}
                onClick={onClose}
              >
                Ganti
              </Button>
              <Button
                variant={'outline'}
                colorScheme='blue'
                onClick={handleNext}
                ml={3}
              >
                Benar {'->'}
              </Button>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MeetingBookingComponent;
