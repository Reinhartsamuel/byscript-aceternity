'use client';
import React, { useState } from 'react';
import { authFirebase } from '../config/firebase';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';
import useFetchData from '../hooks/QueryHook';
import useCountDocuments from '../hooks/CountHook';
import Spinner from '../components/ui/Spinner';
import { cn } from '@/lib/util';
import { IoMdClose } from 'react-icons/io';
import { FaSave, FaTrash } from 'react-icons/fa';
import { FaBoltLightning } from 'react-icons/fa6';
import { RiRobot2Fill } from 'react-icons/ri';
import PairImageComponent from '../components/ui/PairImageComponent';
import Modal from '../components/ui/Modal';

const yaitulah = [
  {
    id: 'bUxMrYL8hbnVXldEc8tx',
    createdBy: 'CADyUn6k7qMkhn89ftO4Gr4zGpw2',
    bot_id: '15455557',
    uid: 'RomXA3UVAbMZB55BLWzE42Dh3kz2',
    lastUpdatedBy: {
      email: 'edwinfardyanto@gmail.com',
      uid: 'CADyUn6k7qMkhn89ftO4Gr4zGpw2',
    },
    autotrader_name: '84_045_REIBKS_12/08/24 $335',
    tradeAmount: 335,
    createdAt: {
      seconds: 1726112639,
      nanoseconds: 244000000,
    },
    exchange_name: 'GATE',
    name: 'Reinhart Samuel',
    exchange_thumbnail:
      'https://3commas.cdn.prismic.io/3commas/9f0f9956-95a9-4b6c-9ed9-4be570d96e52_gateio_logo.svg',
    email: 'reinhartsams@gmail.com',
    trading_plan_pair: ['XMA_USDT_ETH'],
    companyId: 'byscript',
    status: 'ACTIVE',
    lastUpdated: {
      seconds: 1726194874,
      nanoseconds: 540000000,
    },
  },
  {
    id: 'bUxMrYL8hbnVXldEc8tx',
    createdBy: 'CADyUn6k7qMkhn89ftO4Gr4zGpw2',
    bot_id: '15455557',
    uid: 'RomXA3UVAbMZB55BLWzE42Dh3kz2',
    lastUpdatedBy: {
      email: 'edwinfardyanto@gmail.com',
      uid: 'CADyUn6k7qMkhn89ftO4Gr4zGpw2',
    },
    autotrader_name: '84_045_REIBKS_12/08/24 $335',
    tradeAmount: 335,
    createdAt: {
      seconds: 1726112639,
      nanoseconds: 244000000,
    },
    exchange_name: 'GATE',
    name: 'Reinhart Samuel',
    exchange_thumbnail:
      'https://3commas.cdn.prismic.io/3commas/9f0f9956-95a9-4b6c-9ed9-4be570d96e52_gateio_logo.svg',
    email: 'reinhartsams@gmail.com',
    trading_plan_pair: ['XMA_USDT_ETH'],
    companyId: 'byscript',
    status: 'ACTIVE',
    lastUpdated: {
      seconds: 1726194874,
      nanoseconds: 540000000,
    },
  },
  {
    id: 'bUxMrYL8hbnVXldEc8tx',
    createdBy: 'CADyUn6k7qMkhn89ftO4Gr4zGpw2',
    bot_id: '15455557',
    uid: 'RomXA3UVAbMZB55BLWzE42Dh3kz2',
    lastUpdatedBy: {
      email: 'edwinfardyanto@gmail.com',
      uid: 'CADyUn6k7qMkhn89ftO4Gr4zGpw2',
    },
    autotrader_name: '84_045_REIBKS_12/08/24 $335',
    tradeAmount: 335,
    createdAt: {
      seconds: 1726112639,
      nanoseconds: 244000000,
    },
    exchange_name: 'GATE',
    name: 'Reinhart Samuel',
    exchange_thumbnail:
      'https://3commas.cdn.prismic.io/3commas/9f0f9956-95a9-4b6c-9ed9-4be570d96e52_gateio_logo.svg',
    email: 'reinhartsams@gmail.com',
    trading_plan_pair: ['XMA_USDT_ETH'],
    companyId: 'byscript',
    status: 'ACTIVE',
    lastUpdated: {
      seconds: 1726194874,
      nanoseconds: 540000000,
    },
  },
  {
    id: 'bUxMrYL8hbnVXldEc8tx',
    createdBy: 'CADyUn6k7qMkhn89ftO4Gr4zGpw2',
    bot_id: '15455557',
    uid: 'RomXA3UVAbMZB55BLWzE42Dh3kz2',
    lastUpdatedBy: {
      email: 'edwinfardyanto@gmail.com',
      uid: 'CADyUn6k7qMkhn89ftO4Gr4zGpw2',
    },
    autotrader_name: '84_045_REIBKS_12/08/24 $335',
    tradeAmount: 335,
    createdAt: {
      seconds: 1726112639,
      nanoseconds: 244000000,
    },
    exchange_name: 'GATE',
    name: 'Reinhart Samuel',
    exchange_thumbnail:
      'https://3commas.cdn.prismic.io/3commas/9f0f9956-95a9-4b6c-9ed9-4be570d96e52_gateio_logo.svg',
    email: 'reinhartsams@gmail.com',
    trading_plan_pair: ['XMA_USDT_ETH'],
    companyId: 'byscript',
    status: 'ACTIVE',
    lastUpdated: {
      seconds: 1726194874,
      nanoseconds: 540000000,
    },
  },
  {
    id: 'bUxMrYL8hbnVXldEc8tx',
    createdBy: 'CADyUn6k7qMkhn89ftO4Gr4zGpw2',
    bot_id: '15455557',
    uid: 'RomXA3UVAbMZB55BLWzE42Dh3kz2',
    lastUpdatedBy: {
      email: 'edwinfardyanto@gmail.com',
      uid: 'CADyUn6k7qMkhn89ftO4Gr4zGpw2',
    },
    autotrader_name: '84_045_REIBKS_12/08/24 $335',
    tradeAmount: 335,
    createdAt: {
      seconds: 1726112639,
      nanoseconds: 244000000,
    },
    exchange_name: 'GATE',
    name: 'Reinhart Samuel',
    exchange_thumbnail:
      'https://3commas.cdn.prismic.io/3commas/9f0f9956-95a9-4b6c-9ed9-4be570d96e52_gateio_logo.svg',
    email: 'reinhartsams@gmail.com',
    trading_plan_pair: ['XMA_USDT_ETH'],
    companyId: 'byscript',
    status: 'ACTIVE',
    lastUpdated: {
      seconds: 1726194874,
      nanoseconds: 540000000,
    },
  },
];

const AutotraderBotComponent = () => {
  const router = useRouter();
  const params = useParams();
  const [detail, setDetail] = useState(null);

  const [testModal, setTestModal] = useState(false);

  const { data, loading, error, loadMore } = useFetchData({
    collectionName: 'dca_bots',
    conditions: [
      {
        field: 'email',
        operator: '==',
        value: authFirebase.currentUser?.email,
      },
    ],
    limitQuery: 5,
    dependencies: [authFirebase.currentUser?.email],
  });

  const { count: counttt } = useCountDocuments({
    collectionName: 'dca_bots',
    conditions: [
      {
        field: 'email',
        operator: '==',
        value: authFirebase.currentUser?.email,
      },
    ],
    dependencies: [authFirebase.currentUser?.email],
  });

  const handleOpenModal = (data) => {
    setDetail(data);
    // setOpenModal(true);
    setTestModal(true);
  };

  if (!authFirebase.currentUser)
    return (
      <div className='w-full h-screen flex flex-col items-center justify-center'>
        <Spinner />
      </div>
    );

  return (
    <div className='mx-6 mt-10'>
      <div className='flex items-center gap-4'>
        <h2 className='text-xl text-bold text-slate-200 font-bold'>
          Autotrader
        </h2>
        <button
          onClick={() => router.push(`${params?.name}/autotraders/new`)}
          type='button'
          className='text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-md text-lg p-2 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 min-w-[3rem]'
        >
          +
        </button>
      </div>
      {/* <p>UID : {authFirebase.currentUser?.uid}</p> */}
      {counttt === 0 ? (
        <p>
          Kamu belum mempunyai akun autotrader, silakan{' '}
          <span className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
            <a href={params?.name + '/autotraders/new'}>buat di sini</a>
          </span>
        </p>
      ) : (
        <>
          <p className='text-[0.75rem] font-light text-slate-200 mb-4'>
            {data?.count} akun autotrader
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {data?.map((x, i) => (
              <div
                className='w-full rounded-lg bg-gray-800 p-4 shadow-md font-sans flex flex-col gap-4 ease-out duration-100 hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer'
                key={i}
                onClick={() => handleOpenModal(x)}
              >
                <div className='flex w-full justify-between'>
                  <div className='flex flex-col'>
                    <h4 className='uppercase font-extrabold text-sm text-slate-200'>
                      {x?.autotrader_name}
                    </h4>
                  </div>
                  <p className='text-slate-200 text-[0.75rem] font-thin'>
                    {moment.unix(x?.createdAt.seconds).fromNow()}
                  </p>
                </div>
                <div className='w-full flex justify-between items-center rounded-xl bg-slate-600 p-2 '>
                  <div className='flex gap-1 items-center'>
                    <RiRobot2Fill size={20} color='white' />
                    <p className='text-slate-200 text-[1rem]'>
                      BOT ID : {x?.bot_id}
                    </p>
                  </div>
                  <p
                    className={cn(
                      'font-bold',
                      x?.status === 'ACTIVE'
                        ? 'text-green-500'
                        : x?.status === 'STOPPED'
                        ? 'text-red-500'
                        : x?.status === 'REQUESTED'
                        ? 'text-orange-500'
                        : 'text-red-100'
                    )}
                  >
                    {x?.status || '-'}
                  </p>
                </div>
                <div className='flex w-full justify-between'>
                  <img
                    alt={'exchange'}
                    src={
                      x?.exchange_name === 'GATE'
                        ? 'https://static.airpackapp.com/fe-next/homepage/prod/_next/static/media/open_sesame_night.47e06968.png?w=750&q=75'
                        : x?.exchange_thumbnail
                    }
                    className='w-[5rem] object-contain'
                  />

                  {x?.trading_plan_pair?.length === 1 ? (
                    <PairImageComponent
                      pair={x?.trading_plan_pair[0]
                        ?.split('_')
                        ?.slice(1)
                        ?.join('_')}
                    />
                  ) : (
                    <p className='uppercase text-gray-200'>
                      {x?.trading_plan_pair?.length || 0} pairs
                    </p>
                  )}
                </div>
              </div>
            ))}
            {data?.length !== counttt && (
              <div className='w-full h-full grid place-items-center'>
                <button>lihat semua</button>
              </div>
            )}
          </div>
        </>
      )}

      <Modal open={testModal} onClose={() => setTestModal(false)}>
        <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
              Autotrader {detail?.autotrader_name}
            </h3>
            <p className='font-extralight text-sm text-slate-400'>
              Start bot untuk mengaktifkan autotrade pada exchange yang sudah tersambung
            </p>
          </div>
        </div>

        {/* <pre>{JSON.stringify(detail, null, 2)}</pre> */}
        <div className='flex flex-col gap-2 divide-y divide-slate-700'>
          <div className='flex w-full justify-between h-10 items-end'>
            <p className='text-gray-100 font-light'>BOT ID</p>
            <p className='text-gray-100 font-bold text-2xl'>
              {detail?.bot_id}
            </p>
          </div>
          <div className='flex w-full justify-between h-10 items-end'>
            <p className='text-gray-100 font-light'>Created at</p>
            <p className='text-gray-100 font-light'>
              {moment
                .unix(detail?.createdAt?.seconds)
                .format('HH:mm DD MMMM YYYY')}
            </p>
          </div>
          <div className='flex w-full justify-between h-10 items-end'>
            <p className='text-gray-100 font-light'>Last updated</p>
            <p className='text-gray-100 font-light'>
              {moment
                .unix(detail?.lastUpdated?.seconds)
                .format('HH:mm DD MMMM YYYY')}
            </p>
          </div>
          <div className='flex w-full justify-between h-10 items-end'>
            <p className='text-gray-100 font-light'>Exchange</p>
            <img
              alt={'exchange'}
              src={
                detail?.exchange_name === 'GATE'
                  ? 'https://static.airpackapp.com/fe-next/homepage/prod/_next/static/media/open_sesame_night.47e06968.png?w=750&q=75'
                  : detail?.exchange_thumbnail
              }
              className='w-[5rem] object-contain'
            />
          </div>
          <div className='flex w-full justify-between h-10 items-end'>
            <p className='text-gray-100 font-light'>Trade amount</p>
            <p className='text-gray-100 font-light'>
              USD {detail?.tradeAmount}
            </p>
          </div>

          <div className='flex w-full justify-between h-10 items-end'>
            <p className='text-gray-100 font-light'>
              Pairs: {detail?.trading_plan_pair?.length}
            </p>
            <div className='flex flex-col justify-center'>
              {detail?.trading_plan_pair?.map((x, i) => (
                <div key={i} className='flex gap-2 items-center'>
                  <p>{x?.split('_')?.shift()}</p>
                  <p>{x?.split('_')?.slice(1)?.join('_')}</p>
                  <PairImageComponent
                    pair={x?.split('_')?.slice(1)?.join('_')}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='flex w-full justify-between h-10 items-end'>
            <p className='text-gray-100 font-light'>Status</p>
            <p
              className={cn(
                'font-bold',
                detail?.status === 'ACTIVE'
                  ? 'text-green-500'
                  : detail?.status === 'STOPPED'
                  ? 'text-red-500'
                  : detail?.status === 'REQUESTED'
                  ? 'text-orange-500'
                  : 'text-red-100'
              )}
            >
              {detail?.status || '-'}
            </p>
          </div>
        </div>
        <div className='flex gap-1 justify-end items-center p-4 md:p-5 border-t border-gray-200 dark:border-gray-600'>
          <button className='flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-600 text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-500 transition duration-200'>
            <FaBoltLightning />
            <p>Start bot</p>
          </button>
          <button className='flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-600 text-white bg-red-600 hover:bg-red-700 active:bg-red-500 transition duration-200'>
            <FaTrash />
            <p>Delete autotrader</p>
          </button>

          <button
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-600 text-white bg-green-600 hover:bg-green-700 active:bg-green-500 transition duration-200',
              loading && 'cursor-not-allowed'
            )}
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <FaSave />
                <p>Save</p>
              </>
            )}
          </button>
          <button
            onClick={() => setTestModal(false)}
            className='flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-600 text-white bg-gray-600 hover:bg-gray-700 active:bg-gray-500 transition duration-200'
          >
            <IoMdClose />
            <p>Close</p>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AutotraderBotComponent;
