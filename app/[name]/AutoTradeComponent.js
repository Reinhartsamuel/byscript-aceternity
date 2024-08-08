'use client'
import React from 'react'
import { dummyActiveTradingPlan } from '../dummy'
import { IoPersonSharp } from 'react-icons/io5'
import { RiRobot2Fill } from 'react-icons/ri'
import { FaCheckCircle } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import PairImageComponent from '../components/ui/PairImageComponent'
import { useParams, useRouter } from 'next/navigation'
import moment from 'moment'

const AutoTradeComponent = () => {
    const router = useRouter();
    const params = useParams();
  return (
    <div className='mx-6 mt-10'>
    <div className='my-4 block'>
      <div className="flex items-center gap-4">
        <h2 className='text-xl text-bold text-slate-200 font-bold'>
          Autotrade Aktif
        </h2>
        <button
          onClick={() => router.push(`${params?.name}/autotrade/new`)}
          type='button'
          className='text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-md text-lg p-2 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 min-w-[3rem]'
        >
          +
        </button>
      </div>
      <p className='text-[0.75rem] font-light text-slate-200'>
        {dummyActiveTradingPlan?.length === 0
          ? 'Tidak ada autotrade aktif'
          : dummyActiveTradingPlan.length + ' trading plan'}
      </p>
    </div>
    <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
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
        className='text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-md text-4xl px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
      >
        +
      </button>
    </div>
  </div>
  )
}

export default AutoTradeComponent