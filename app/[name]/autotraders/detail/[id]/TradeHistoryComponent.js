'use client';

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
  where,
} from 'firebase/firestore';
import { db } from '@/app/config/firebase';
import Spinner from '@/app/components/ui/Spinner';
import PairImageComponent from '@/app/components/ui/PairImageComponent';


const TradeHistoryComponent
 = (props) => {
  const {collectionName = '3commas_logs'} = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const trading_plan_id = (props.trading_plan_pair || [])[0]
    ?.split('_')
    ?.shift();
  const pair = (props.trading_plan_pair || [])[0]
    ?.split('_')
    ?.slice(1)
    ?.join('_');

  useEffect(() => {
    if (trading_plan_id !== undefined && pair !== undefined) {
      setLoading(true);
      let unsubscribe;
      const q = query(
        collection(db, collectionName),
        orderBy('createdAt', 'desc'),
        where('trading_plan_id', '==', trading_plan_id),
        where('pair', '==', pair),
        limit(10)
      );
  
        unsubscribe = onSnapshot(
          q,
          (querySnapshot) => {
            const array = [];
            querySnapshot.forEach((doc) => {
              array.push({ id: doc?.id, ...doc?.data() });
            });
            setData(array);
            setLoading(false);
          },
          (error) => {
            console.log(error.message, '::::error onsnapshot');
            setErrorMsg(error.message);
            setLoading(false);
          }
        );
      return () => unsubscribe();
    } else {
      // console.log('salah koding');
    }

  }, [trading_plan_id, pair]);

  if (loading)
    return (
      <div className='w-full flex justify-center items-center'>
        <Spinner />
      </div>
    );
  if (errorMsg) return <p>Error! ::: {errorMsg}</p>;

  return (
    <>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full xl:w-3/5 text-xs text-left text-gray-500 dark:text-gray-400 mx-auto'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-2 py-1'>
                Pair
              </th>
              <th scope='col' className='px-2 py-1'>
                Trading Plan
              </th>
              <th scope='col' className='px-2 py-1'>
                Price
              </th>
              <th scope='col' className='px-2 py-1'>
                Timestamp
              </th>
              <th scope='col' className='px-2 py-1'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((x, i) => (
              <tr
                className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'
                key={i}
              >
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  <div className='inline-block items-center justify-center gap-2'>
                    <PairImageComponent pair={x?.pair} width={8} />
                    <p>{x?.pair}</p>
                  </div>
                </th>
                <td className='px-6 py-4'>
                  {x?.trading_plan_id?.split('_')[0]}
                </td>
                <td className='px-6 py-4'>${x?.price}</td>
                <td className='px-6 py-4'>
                  {moment
                    .unix(x?.createdAt?.seconds)
                    ?.format('DD MMM YYYY HH:mm:ss')}
                </td>
                <td className='px-6 py-4'>
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
      </div>
    </>
  );
};

export default TradeHistoryComponent
;
