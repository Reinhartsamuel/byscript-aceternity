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
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { coins } from '../dummy';

const PairImageComponent = ({ pair = 'BTC_USDT' }) => {
  const arr = pair.split('_');
  const coinA = arr[0];
  const coinB = arr[1];
  return (
    <div className='flex justify-center'>
      <img
        className='w-10 h-10 z-13 rounded-full'
        src={getImage(coinA)}
        alt={coinA}
      />
      <img
        className='w-10 h-10 rounded-full ml-[-1rem]'
        src={getImage(coinB)}
        alt={coinB}
      />
    </div>
  );
};
const SignalPreviewComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, 'webhooks'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const array = [];
      querySnapshot.forEach((doc) => {
        array.push({ id: doc?.id, ...doc?.data() });
      });
      setData(array);
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

  return (
    <>
      <table class='w-full max-w-3xl bg-white shadow-md rounded-xl mx-auto mt-10 overflow-scroll'>
        <thead>
          <tr class='bg-blue-gray-100 text-gray-700 text-xl'>
            <th class='py-1 px-2 text-center'>Pair</th>
            <th class='py-1 px-2 text-center'>Trading Plan</th>
            <th class='py-1 px-2 text-center'>Price</th>
            <th class='py-1 px-2 text-center'>Timestamp</th>
            <th class='py-1 px-2 text-center'>Action</th>
          </tr>
        </thead>
        <tbody class='text-black text-xs'>
          {data?.map((x, i) => (
            <tr class='border-b text-center' key={i}>
              <td class='py-1 px-2'>
                <div className='inline-block items-center justif-center gap-2'>
                  <PairImageComponent pair={x?.pair} />
                  <p>{x?.pair}</p>
                </div>
              </td>
              <td class='py-1 px-2 text-xl font-bold text-slate-600'>{x?.trading_plan_id?.split('_')[0]}</td>
              <td class='py-1 px-2'>$50.25</td>
              <td class='py-1 px-2'>
                {moment
                  .unix(x?.createdAt?.seconds)
                  ?.format('DD MMM YYYY HH:mm:ss')}
              </td>
              <td class='py-1 px-2'>
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

function getImage(id) {
  return coins.find((x) => x?.symbol === id)?.icon;
}

export default SignalPreviewComponent;
