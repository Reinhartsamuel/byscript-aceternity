'use client';
import {
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getSingleDocumentFirebase } from '../utils/firebaseApi';

const FormsComponent = (props) => {
  const { data: parentData, setData: setParentData, setIndex } = props;
  const [data, setData] = useState({});
  const toast = useToast();
  const getData = async () => {
    try {
      const result = await getSingleDocumentFirebase(
        'forms',
        'S9lUlEkl81fVfty9bJ43'
      );
      setData(result);
      console.log(result, 'result');
    } catch (error) {
      toast({
        status: 'error',
        description: error.message,
        title: 'Error',
        duration: 5000,
      });
    }
  };

  const handleChange = (arg, value) => {
    arg.answer = value;
    let latestAnswer =
      data?.forms?.map((x) => {
        if (x?.id === arg?.id) {
          return arg;
        } else return x;
      }) || [];
    setData({ ...data, forms: latestAnswer });
  };


  const handleDebug = () => {
    console.log(parentData, 'parentData');
    console.log({
        ...parentData, 
        forms : data?.forms || []
    }, 'ini hasilnya');
    setParentData({
        ...parentData, 
        forms : data?.forms || []
    })
  }

  useEffect(() => {
    getData();
  }, []);
  return (
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
        <Text color={'slategray'} fontStyle={'italic'}>
          Lengkapi form di bawah ini
        </Text>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        {data?.forms?.map((x, i) => (
          <Stack
            key={i}
            w={{ base: 'full', md: '80%', lg: '50%' }}
            borderWidth={1}
            borderColor={'gray.700'}
            mt={5}
            rounded={'md'}
            shadow={'lg'}
            p={10}
          >
            <Heading fontWeight={'bold'}>{x?.question}</Heading>
            {x?.type === 'text' && (
              <Input onChange={(e) => handleChange(x, e.target.value)} />
            )}
            {x?.type === 'date' && (
              <Input
                type={'date'}
                onChange={(e) => handleChange(x, e.target.value)}
              />
            )}
            {x?.type === 'datetime' && (
              <Input
                type={'datetime-local'}
                onChange={(e) => handleChange(x, e.target.value)}
              />
            )}
            {x?.type === 'checkbox' && (
              <Stack>
                {x?.options?.map((y, idx) => (
                  <Checkbox
                    key={idx}
                    onChange={(e) => handleChange(x, e.target.value)}
                    value={y}
                  >
                    {y}
                  </Checkbox>
                ))}
              </Stack>
            )}
            {x?.type === 'radio' && (
              <RadioGroup>
                <Stack>
                  {x?.options?.map((y, idx) => (
                    <Radio
                      key={idx}
                      onChange={(e) => handleChange(x, e.target.value)}
                      value={y}
                    >
                      {y}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            )}
          </Stack>
        ))}
      </Stack>
      <Button onClick={handleDebug}>debug</Button>
      <Flex justifyContent={'flex-end'} mt={10}>
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
  );
};

export default FormsComponent;
