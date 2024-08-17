'use client';
import React, { useEffect, useRef, useState } from 'react';
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
  'https://i.ibb.co.com/X7kP5mR/gmeet.jpg',
];
const meet =
  'https://firebasestorage.googleapis.com/v0/b/saudagar-staging.appspot.com/o/transfer-receipt%2FKrTqD6lD4yQtTW0SyKe2pFTUFbx2%2Fgoogle-meet.256x256.png?alt=media&token=34ef05de-b914-4adf-8444-11d27bec8fdc';

const MeetingBookingComponent = ({ setIndex, data, setData }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const inputDateRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef(null);
  const toast = (message) => {
    console.log(message);
  };

  const handleNext = () => {
    console.log(data);
    setIndex((prev) => prev + 1);
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    const inTimeWindow =
      moment(selectedDate).format('HH') >= '11' &&
      moment(selectedDate).format('HH') <= '17' &&
      moment(selectedDate).format('mm') <= '59';
    console.log(moment(selectedDate).format('HH:mm'));
    console.log(inTimeWindow, 'inTimeWindow');
    if (!inTimeWindow)
      return toast({
        status: 'error',
        title: 'Tidak tersedia',
        description: 'Mohon pilih waktu antara 11:00 - 17:00 WIB',
        duration: 3000,
        position: 'top-right',
      });
    setIsOpen(true);
    setData({
      ...data,
      conferenceStart: moment(selectedDate)
        .utcOffset(7 * 60)
        .format(),
      conferenceEnd: moment(selectedDate)
        .utcOffset(7 * 60)
        .add(1, 'hours')
        .format(),
    });
  };

  useEffect(() => {
    localeId();
  }, []);

  return (
    <div className='max-w-7xl pt-20'>
      <div className='flex flex-col items-center justify-center mb-20'>
        <div className='flex justify-center mb-5'>
          <img src={meet} alt='meet' className='w-50' />
          <p className='text-xl font-bold text-center'>
            Pilih tanggal online meeting onboarding 1 on 1 dengan tim kami:
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-20'>
          <Calendar
            onChange={(e) => setSelectedDate(e)}
            minDate={new Date()}
            maxDate={moment().add(7, 'days').toDate()}
            activeStartDate={new Date()}
          />
          <div className='flex flex-col items-center'>
            <h2>{moment(selectedDate).format('dddd, D MMMYYYY')}</h2>
            <h2>{moment(selectedDate).format('HH:mm')} WIB</h2>
            <p>Pilih Jam :</p>
            <input
              type='time'
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
              className='w-full p-2 pl-10 text-sm text-gray-700'
            />
            <p className='text-yellow-500 font-bold'>
              Harap memilih antara pukul 11:00 - 17:00
            </p>
          </div>
        </div>
        <p className='text-center text-gray-300 italic'>
          <sup>*</sup>Kamu akan menerima undangan Google Meet via email untuk
          onboarding auto trade bersama byScript. GRATIS satu bulan subscription
          trading plan untuk satu akun exchange
        </p>
      </div>
      <div className='flex justify-end'>
        <div className='flex'>
          <button
            onClick={() => setIndex((prev) => prev - 1)}
            className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
          >
            {'<'}- Kembali
          </button>
          <button
            onClick={handleOpenModal}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Lanjut -{'>'}
          </button>
        </div>
      </div>

      <div className='divider my-10'></div>

      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 mt-10'>
        {images.map((x, i) => (
          <img
            key={i}
            src={x}
            alt='onboarding'
            className='w-full object-cover'
          />
        ))}
      </div>

      <div
        className={`modal ${isOpen ? 'modal-open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsOpen(false);
        }}
      >
        <div className='modal-content'>
          <div className='modal-header'>
            <h2 className='text-lg font-bold'>
              <SiGooglemeet />
              Pilih jadwal onboarding
            </h2>
          </div>

          <div className='modal-body'>
            <div className='flex flex-col gap-10'>
              <div className='flex flex-col items-center'>
                <h2 className='text-md'>
                  Apakah tanggal onboarding sudah sesuai?
                </h2>
                <p>
                  Tanggal onboarding dapat disesuaikan kembali dengan tim kami
                  sesuai ketersediaan kursi
                </p>
              </div>
              <div className='flex flex-col items-center justify-center p-5 border-2 border-gray-300 rounded'>
                <div className='flex'>
                  <FaRegCalendarCheck size={40} />
                  <h2 className='text-lg text-aquamarine'>
                    {moment(selectedDate).format('dddd, D MMMM YYYY')}
                  </h2>
                </div>
                <div className='flex'>
                  <FaRegClock size={40} />
                  <h2 className='text-lg text-gray-100'>
                    {moment(selectedDate).format('HH:mm')} WIB
                  </h2>
                </div>
              </div>
            </div>
            <div className='flex justify-center mt-10'>
              <button
                onClick={() =>setIsOpen(false)}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
              >
                Ganti
              </button>
              <button
                onClick={handleNext}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3'
              >
                Benar {'->'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingBookingComponent;
