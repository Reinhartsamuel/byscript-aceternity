'use client';
import React, { useEffect, useState } from 'react';
import {
  countDocumentsFirebase,
  getCollectionFirebase,
} from '../utils/firebaseApi';
import { authFirebase } from '../config/firebase';
import { Button, Card } from 'flowbite-react';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';

const AutotraderBotComponent = () => {
  const router = useRouter();
    const params = useParams();
  const [data, setData] = useState({
    dcaBots: [],
    count: 0,
  });

  const getDcaBots = async () => {
    try {
      const conditions = [
        { field: 'uid', operator: '==', value: authFirebase.currentUser.uid },
      ];
      const res = await getCollectionFirebase('dca_bots', conditions, {
        field: 'createdAt',
        direction: 'desc',
      });

      const count = await countDocumentsFirebase('dca_bots', conditions);
      setData({ count, dcaBots: res });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getDcaBots();
  }, []);
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
      {data?.count === 0 ? (
        <p>
          Kamu belum mempunyai akun autotrader, silahkan{' '}
          <span className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
            <a href={params?.name + '/autotraders/new'}>buat di sini</a>
          </span>
        </p>
      ) : (
        <>
          <p className='text-[0.75rem] font-light text-slate-200 mb-4'>
            {data?.count} akun autotrader
          </p>
          {data?.dcaBots?.map((x, i) => (
            <Card href='#' className='max-w-sm bg-gray-800' key={i}>
              <h5 className='text-lg font-bold tracking-tight text-gray-900 dark:text-white'>
                {x?.id}
              </h5>
              <div className='flex w-full justify-between'>
                <p className='font-normal text-sm text-gray-700 dark:text-gray-400'>
                  Created: {moment.unix(x?.createdAt?.seconds).fromNow()}
                </p>
                <p className='font-normal text-sm text-gray-700 dark:text-gray-400'>
                  Status: <span>{x?.status}</span>
                </p>
              </div>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default AutotraderBotComponent;
