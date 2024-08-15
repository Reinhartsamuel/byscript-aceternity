'use client';

import {
  Button,
  Center,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  useToast,
  Image,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import moment from 'moment';
import { addDocumentFirebase } from '../utils/firebaseApi';

const SummaryComponent = ({ setIndex, data, setData }) => {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    console.log(data);
    setLoading(true);
    try {
      await addDocumentFirebase('customers', { ...data, isNewUser: true, joinedAt: new Date() });
      // const postData = {
      //   ...data,
      //   summary: `Onboarding 1 on 1 ${data?.name} bersama byScript`,
      //   location: 'Online',
      //   description: `Onboarding 1 on 1 ${data?.name} bersama byScript`,
      //   start: { dateTime: data?.conferenceStart, timeZone: 'Asia/Jakarta' },
      //   end: { dateTime: data?.conferenceEnd, timeZone: 'Asia/Jakarta' },
      //   attendees: [
      //     { email: 'edwinfardyanto@gmail.com' },
      //     { email: data?.email },
      //   ],
      // };
      // const res = await fetch('/api/calendar/create', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(postData),
      // });
      // await fetch('/api/email', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     "sender" : {
      //       "email" :"byscript@gmail.com",
      //       "name" : "byScript"
      //     },
      //       "cc": [
      //           {
      //             "name": "Reinhart",
      //             "email": "reinhartsams@gmail.com"
      //           }
      //         ],
      //         "to" : [{
      //           "name" : "Edwin Ardyanto",
      //           "email" : "edwinfardyanto@gmail.com"
      //         }],
      //         "subject" : "Pendaftar Baru",
      //         "htmlContent" : `<p>Seseorang telah mendaftar di byScript nama : <strong>${data?.name}</strong> email : ${data?.email}, onboarding : ${data?.conferenceStart}</p>`
      //   }),
      // })

      // const result = await res.json();
      // if (!result.status) throw new Error(result.message);
      setData({ ...data, response: result?.data });
      setIsSubmitted(true);
      console.log(result, 'result bikin calendar');
      toast({
        title: 'Event successfully created',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Container maxW={'7xl'} pt={{ base: 100, lg: '8%' }}>
        {!isSubmitted && (
          <>
            <Heading>Summary</Heading>
            <Stack mt={10}>
              <HStack>
                <Text color={'gray.500'}>Nama : </Text>
                <Text fontWeight={'bold'} textTransform={'uppercase'}>
                  {data?.name}
                </Text>
              </HStack>
              <HStack>
                <Text color={'gray.500'}>Email : </Text>
                <Text fontWeight={'bold'}>{data?.email}</Text>
              </HStack>
              <HStack>
                <Text color={'gray.500'}>Nomor HP : </Text>
                <Text fontWeight={'bold'}>{data?.phoneNumber}</Text>
              </HStack>
              <HStack>
                <Text color={'gray.500'}>Onboarding: </Text>
                <Text fontWeight={'bold'}>
                  {moment(data?.conferenceStart)?.format(
                    'dddd, D MMMM YYYY HH:mm'
                  )}
                  {' - '}
                  {moment(data?.conferenceEnd)?.format('HH:mm')}
                </Text>
              </HStack>
            </Stack>
            <Button
              bgGradient={'linear(to-r, #FF0080, #7928CA)'}
              mt={10}
              w={'full'}
              onClick={handleSubmit}
              isDisabled={loading}
              isLoading={loading}
            >
              Submit
            </Button>
          </>
        )}

        {/* <Button onClick={() => setIndex((prev) => prev - 1)}>
          {'<'}- Kembali
        </Button> */}

        {isSubmitted && data?.response?.htmlLink && (
          <>
            <Stack alignItems={'center'} justifyContent={'center'}>
              <Text lineHeight={1.2} fontWeight={'bold'} fontSize={30}>
                Terima kasih{' '}
                <Text
                  as={'span'}
                  bgGradient={'linear(to-r, #FF0080, #7928CA)'}
                  bgClip={'text'}
                >
                  {data?.name}
                </Text>
                , untuk mendaftar onboarding, silakan tekan tombol di bawah ini
                untuk konfirmasi ke Whatsapp. Sampai bertemu di onboarding, ya!!
              </Text>
              <Text as={'i'} color={'gray.400'}>
                <sup>*</sup>
                <Text as={'span'} color={'red'} fontWeight={'bold'}>
                  PENTING!!{' '}
                </Text>
                Mohon untuk konfirmasi via Whatsapp pada tombol di bawah, jika
                tidak maka meeting onboarding dapat kami batalkan sepihak.
              </Text>
            </Stack>

            <Stack alignItems={'center'}>
              <Image
                src={
                  'https://i0.wp.com/sifugadget.com/wp-content/uploads/2024/02/Arrows-3-pointing-down-arrow-down-animated.gif?fit=300%2C158&ssl=1'
                }
                w={200}
              />
              <Button
                bg={'#075e54'}
                onClick={() =>
                  window.open(
                    `https://wa.me/6281313383848/?text=Halo kak, saya ${data?.name} sudah mendaftar onboarding byScript dan pada hari ${moment(
                      data?.conferenceStart
                    ).format(
                      'dddd, D MMMM YYYY HH:mm'
                    )} WIB. Mohon dikonfirmasi ya kak. Terima kasih!`
                  )
                }
                size={'lg'}
              >
                <HStack gap={2}>
                  <FaWhatsapp color={'white'} size={20} />
                  <Text>Konfirmasi Whatsapp</Text>
                </HStack>
              </Button>
              <Image
                transform={'rotate(180deg)'}
                src={
                  'https://i0.wp.com/sifugadget.com/wp-content/uploads/2024/02/Arrows-3-pointing-down-arrow-down-animated.gif?fit=300%2C158&ssl=1'
                }
                w={200}
              />
            </Stack>
          </>
        )}
      </Container>
    </>
  );
};

export default SummaryComponent;
