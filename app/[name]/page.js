'use client';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { authFirebase } from '../config/firebase';
import { useRouter } from 'next/navigation';
import { IoPersonSharp } from 'react-icons/io5';
import { RiRobot2Fill } from 'react-icons/ri';
import { FaGear } from 'react-icons/fa6';
import { FaCheckCircle } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import PairImageComponent from '../components/ui/PairImageComponent';
import { dummyActiveTradingPlan } from '../dummy';
import moment from 'moment';

const page = ({ params }) => {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(authFirebase, (user) => {
      if (!user) {
        authFirebase.signOut();
        router.push('');
      }
    });
  }, []);

  return (
    <>
      <div className='w-screen min-h-screen flex flex-col mx-auto px-5'>
        <div className='mt-10 mx-2'>
          <h1 className='text-3xl font-bold text-slate-100'>
            Selamat datang, {params?.name?.split('-')?.join(' ')} !
          </h1>
          <h3 className='font-extralight text-sm text-slate-400 leading--5'>
            Selamat datang di dashboard byScript. Kamu dapat mengatur
            subscription dan trading plan.
          </h3>
        </div>
        <div className='grid grid-cols-2 mt-10'>
          <div className='rounded-lg bg-gray-800 p-4 shadow-md mx-2  font-sans flex flex-col gap-1'>
            <h2 className='text-xl text-bold text-slate-200 font-bold'>
              Langgangan
            </h2>
            <p className='text-gray-200 text-sm font-thin'>
              Kamu sendang berlangganan <strong>Subscription 3 Bulan</strong>{' '}
              (berakhir 12 Agustus 2024).
            </p>
            <button className='w-full p-[3px] relative mt-5'>
              <div className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg' />
              <div className='px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white bg-transparent active:bg-violet-700 flex gap-2 items-center justify-center'>
                <FaGear />
                <p>Atur langganan</p>
              </div>
            </button>
          </div>
          <div className='rounded-lg bg-gray-800 p-4 shadow-md mx-2 font-sans flex flex-col gap-1'>
            <h2 className='text-xl text-bold text-slate-200 font-bold'>
              Histori Pembayaran
            </h2>
            <p className='text-gray-200 text-sm font-thin'>
              You are currently subscribed to the 3 Months Plan.
            </p>
            <button className='w-full p-[3px] relative mt-5'>
              <div className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg' />
              <div className='px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white bg-transparent active:bg-violet-700 flex gap-2 items-center justify-center'>
                <FaGear />
                <p>Lihat semua</p>
              </div>
            </button>
          </div>
        </div>
        <div className='mx-6 mt-10'>
          <div className='my-4 block'>
            <h2 className='text-xl text-bold text-slate-200 font-bold'>
              Autotrade Aktif
            </h2>
            <p className='text-[0.75rem] font-light text-slate-200'>
              {dummyActiveTradingPlan?.length === 0
                ? 'Tidak ada autotrade aktif'
                : dummyActiveTradingPlan.length + ' trading plan'}
            </p>
          </div>
          <div class='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {/* trading plan card */}
            {dummyActiveTradingPlan?.map((x, i) => (
              <div
                className='rounded-lg bg-gray-800 p-4 shadow-md font-sans flex flex-col gap-1'
                key={i}
              >
                <div className='flex w-full justify-between'>
                  <div className='flex flex-col'>
                    <h4 className='uppercase font-extrabold text-sm text-slate-200'>
                      {x?.tp_name}
                    </h4>
                    <div className='flex items-center gap-1'>
                      <IoPersonSharp size={8} color='lightgray' />
                      <p className='text-slate-200 text-[0.75rem] font-thin'>
                        {x?.tp_author}
                      </p>
                    </div>
                  </div>
                  <p className='text-slate-200 text-[0.75rem] font-thin'>
                    {moment(x?.createdAt).fromNow()}
                  </p>
                </div>
                <div className='w-full flex justify-between items-center rounded-xl bg-slate-600 p-2 '>
                  <div className='flex gap-1 items-center'>
                    <RiRobot2Fill size={20} color='gray' />
                    <p className='text-slate-200 text-[1rem]'>
                      BOT ID : {x?.bot_id}
                    </p>
                  </div>
                  {x?.status === 'ACTIVE' ? (
                    <FaCheckCircle size={20} color='green' />
                  ) : (
                    <AiFillCloseCircle size={20} color='red' />
                  )}
                </div>
                <div className='flex w-full justify-between mt-5 items-end'>
                  <img
                    alt={'exchange'}
                    src={x?.exchange_image}
                    className='w-[5rem] object-contain'
                  />
                  <p className=' text-[0.5rem] uppercase'>
                    {`${x?.market} ${x?.pair?.split('_')[0]} ${
                      x?.pair?.split('_')[1]
                    }`}
                  </p>
                  <div>
                    <PairImageComponent
                      pair={x?.pair || 'BTC_USDT'}
                      // width='10'
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => router.push(`${params?.name}/autotrade/new`)}
              type='button'
              class='text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-md text-4xl px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
