'use client';

import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import moment from 'moment';
import { addDocumentFirebase } from '../utils/firebaseApi';

const SummaryComponent = ({ setIndex, data, setData }) => {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    // ...
  };

  return (
    <>
      <div className="max-w-7xl pt-20">
        {!isSubmitted && (
          <>
            <h1>Summary</h1>
            <div className="mt-10">
              <div className="flex gap-2">
                <p className="text-gray-500">Nama :</p>
                <p className="font-bold text-uppercase">{data?.name}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-500">Email :</p>
                <p className="font-bold">{data?.email}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-500">Nomor HP :</p>
                <p className="font-bold">{data?.phoneNumber}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-500">Onboarding :</p>
                <p className="font-bold">
                  {moment(data?.conferenceStart)?.format(
                    'dddd, D MMMM YYYY HH:mm'
                  )}
                  {' - '}
                  {moment(data?.conferenceEnd)?.format('HH:mm')}
                </p>
              </div>
            </div>
            <button
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 px-4 rounded mt-10 w-full"
              onClick={handleSubmit}
              disabled={loading}
              isLoading={loading}
            >
              Submit
            </button>
          </>
        )}

        {isSubmitted && data?.response?.htmlLink && (
          <>
            <div className="flex justify-center">
              <p
                className="text-3xl font-bold text-center"
                style={{
                  lineHeight: 1.2,
                }}
              >
                Terima kasih{' '}
                <span
                  className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text"
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {data?.name}
                </span>
                , untuk mendaftar onboarding, silakan tekan tombol di bawah ini
                untuk konfirmasi ke Whatsapp. Sampai bertemu di onboarding, ya!!
              </p>
              <p
                className="text-gray-400"
                style={{
                  fontSize: '0.8rem',
                }}
              >
                <sup>*</sup>
                <span
                  className="text-red-500 font-bold"
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  PENTING!!
                </span>
                Mohon untuk konfirmasi via Whatsapp pada tombol di bawah, jika
                tidak maka meeting onboarding dapat kami batalkan sepihak.
              </p>
            </div>

            <div className="flex justify-center">
              <img
                src={
                  'https://i0.wp.com/sifugadget.com/wp-content/uploads/2024/02/Arrows-3-pointing-down-arrow-down-animated.gif?fit=300%2C158&ssl=1'
                }
                width={200}
              />
              <button
                className="bg-green-500 text-white font-bold py-2 px-4 rounded"
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
                <div className="flex gap-2">
                  <FaWhatsapp color={'white'} size={20} />
                  <p>Konfirmasi Whatsapp</p>
                </div>
              </button>
              <img
                transform={'rotate(180deg)'}
                src={
                  'https://i0.wp.com/sifugadget.com/wp-content/uploads/2024/02/Arrows-3-pointing-down-arrow-down-animated.gif?fit=300%2C158&ssl=1'
                }
                width={200}
              />
            </div>
          </>
        )}
      </div>
    </>
  )}


  export default SummaryComponent;

    