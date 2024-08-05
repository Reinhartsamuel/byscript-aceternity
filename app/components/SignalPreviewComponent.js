'use client';

import React, { useEffect, useState } from 'react';
import Spinner from './ui/Spinner';
import moment from 'moment';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
  where,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import PairImageComponent from './ui/PairImageComponent';
import { cn } from '@/lib/util';


const SignalPreviewComponent = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, 'webhooks'),
      orderBy('createdAt', 'desc'),
      // where('trading_plan_name', '==', 'XMA'),
      limit(10)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const array = [];
      querySnapshot.forEach((doc) => {
        array.push({ id: doc?.id, ...doc?.data() });
      });
      setData(array);
      setLoading(false);
    },(error) => {
      console.log(error.message, '::::error onsnapshot');
      setErrorMsg(error.message)
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <div className='w-full flex justify-center items-center'>
        <Spinner />
      </div>
    );
    if (errorMsg)
      return <p>Error! ::: {errorMsg}</p>

  return (
    <>
      <table className='w-full max-w-3xl bg-white shadow-md rounded-xl mx-auto mt-10 overflow-scroll'>
        <thead>
          <tr className={cn('bg-blue-gray-100 text-gray-700 text-xl', props.text && `text-${props.text}`)}>
            <th className='py-1 px-2 text-center'>Pair</th>
            <th className='py-1 px-2 text-center'>Trading Plan</th>
            <th className='py-1 px-2 text-center'>Price</th>
            <th className='py-1 px-2 text-center'>Timestamp</th>
            <th className='py-1 px-2 text-center'>Action</th>
          </tr>
        </thead>
        <tbody className='text-black text-xs'>
          {data?.map((x, i) => (
            <tr className='border-b text-center' key={i}>
              <td className='py-1 px-2'>
                <div className='inline-block items-center justif-center gap-2'>
                  <PairImageComponent pair={x?.pair} />
                  <p>{x?.pair}</p>
                </div>
              </td>
              <td className='py-1 px-2 text-xl font-bold text-slate-600'>{x?.trading_plan_id?.split('_')[0]}</td>
              <td className='py-1 px-2'>$50.25</td>
              <td className='py-1 px-2'>
                {moment
                  .unix(x?.createdAt?.seconds)
                  ?.format('DD MMM YYYY HH:mm:ss')}
              </td>
              <td className='py-1 px-2'>
                <p
                  className={`text-center text-xl font-bold ${
                    x?.action === 'close_at_market_price'
                      ? 'text-red-600'
                      : 'text-green-600'
                  }`}
                >
                  {x?.action === 'close_at_market_price' ? 'SELL' : 'BUY'}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SignalPreviewComponent;
