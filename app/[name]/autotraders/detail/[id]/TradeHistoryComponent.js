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

const TradeHistoryComponent = (props) => {
  const { collectionName = '3commas_logs', bot_id } = props;
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
    console.log(bot_id, 'bot_id');
    if (pair !== undefined) {
      setLoading(true);
      let unsubscribe;
      const q = query(
        collection(db, collectionName),
        orderBy('createdAt', 'desc'),
        where('bot_id', '==', bot_id),
        // where('trading_plan_id', '==', trading_plan_id),
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
  }, [pair]);

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
        <table className='w-full overflow-scroll text-xs text-left text-gray-500 dark:text-gray-400 mx-auto'>
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
              {/* <th scope='col' className='px-2 py-1'>
                id
              </th> */}
            </tr>
          </thead>
          <tbody>
            {data?.map((x, i) => {
              const action = () => {
                if (x?.type === 'autotrade') {
                  return x?.requestBody &&
                    JSON.parse(x?.requestBody)?.action ===
                      'close_at_market_price'
                    ? 'SELL'
                    : 'BUY';
                } else if (x?.type === 'force_entry') {
                  return 'FORCE BUY';
                } else if (x?.type === 'force_exit') {
                  return 'FORCE SELL';
                }
              };

              const actionColor = () => {
                if (x?.type === 'autotrade') {
                  return x?.requestBody &&
                    JSON.parse(x?.requestBody)?.action ===
                      'close_at_market_price'
                    ? 'text-red-600'
                    : 'text-green-600';
                } else if (x?.type === 'force_entry') {
                  return 'text-green-600';
                } else if (x?.type === 'force_exit') {
                  return 'text-red-600';
                }
              };
              return (
                <tr
                  className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'
                  key={i}
                >
                  <td
                    scope='row'
                    className='px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-gray-300'
                  >
                    <div className='inline-block items-center justify-center gap-2'>
                      <PairImageComponent pair={x?.pair} width={8} />
                      <p>{x?.pair}</p>
                    </div>
                  </td>
                  <td className='px-2 py-1'>
                    {x?.trading_plan_id?.split('_')[0]}
                  </td>
                  <td className='px-2 py-1'>
                    ${x?.requestBody ? JSON.parse(x?.requestBody)?.price : '-'}
                  </td>
                  <td className='px-2 py-1'>
                    <div className=' flex flex-col justify-center'>
                      <p>
                        {moment
                          .unix(x?.createdAt?.seconds)
                          ?.format('DD MMM YYYY HH:mm:ss')}
                      </p>
                      <p>{moment.unix(x?.createdAt?.seconds).fromNow()}</p>
                    </div>
                  </td>
                  <td className='px-2 py-1'>
                    <p
                      className={`text-center text-md font-bold ${actionColor()}`}
                    >
                      {action()}
                    </p>
                  </td>
                  {/* <td className='px-2 py-1'>
                    <p className='text-xs'>{x?.id}</p>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TradeHistoryComponent;
