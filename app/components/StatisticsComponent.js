'use client';
import CountUp from 'react-countup';
import React, { useEffect, useState } from 'react';
import ScrollTrigger from 'react-scroll-trigger';
const statistics = [
  {
    title: 'Volume Transaksi',
    value: 40,
    prefix: 'IDR ',
    suffix: 'Miliar',
  },
  { title: 'Jumlah Trade', value: '1000000', prefix: '', suffix: '' },
  { title: 'Jumlah Trader', value: '41', prefix: '', suffix: ' Akun' },
];

const StatisticsComponent = () => {
  const [counterOn, setCounterOn] = useState(false);
  useEffect(() => {}, []);
  return (
    <ScrollTrigger
      onEnter={() => setCounterOn(true)}
      onExit={() => setCounterOn(false)}
    >
      <div className='flex w-screen justify-evenly h-[10rem]'>
        {statistics.map((x, i) => (
          <div className='flex flex-col items-center justify-center' key={i}>
            <h1 className='text-xl font-bold text-white'>
              {/* <CountUp
              start={0}
              end={100}
              duration={5}
              onEnd={() => setCounterOn(true)}
            /> */}
              {counterOn && (
                <CountUp
                  separator={' '}
                  start={0}
                  end={parseInt(x?.value) || 100}
                  delay={0}
                  prefix={x?.prefix ?? 'IDR'}
                  suffix={x?.suffix + '+'}
                />
              )}
            </h1>
            <h3 className='font-md text-slate-300 font-bold'>{x?.title}</h3>
          </div>
        ))}
      </div>
    </ScrollTrigger>
  );
};

export default StatisticsComponent;
