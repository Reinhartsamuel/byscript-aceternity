'use client';
import Modal from '@/app/components/ui/Modal';
import PairImageComponent from '@/app/components/ui/PairImageComponent';
import Spinner from '@/app/components/ui/Spinner';
import { cn } from '@/lib/util';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';
import { FaSave, FaTrash } from 'react-icons/fa';
import { FaBoltLightning } from 'react-icons/fa6';
import Swal from 'sweetalert2/dist/sweetalert2.js';

export default function ModalDetailAutotrader({
  detail,
  testModal,
  setTestModal,
  loading,
  setLoading
}) {
  const router = useRouter();
  const params = useParams();


  return (
    <>
      <Modal open={testModal} onClose={() => setTestModal(false)}>
        <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
              Autotrader {detail?.id}
            </h3>
            <p className='font-extralight text-sm text-slate-400'>
              Start bot untuk mengaktifkan autotrade pada exchange yang sudah
              tersambung
            </p>
          </div>
        </div>

        {/* <pre>{JSON.stringify(detail, null, 2)}</pre> */}
        <div className='flex flex-col gap-2 divide-y divide-slate-700'>
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
        <div className='flex flex-wrap gap-1 justify-end items-center p-4 md:p-5 border-t border-gray-200 dark:border-gray-600'>
          <button onClick={() => {}} className='flex flex-wrap-nowrap items-center gap-2 px-4 py-2 rounded-xl border border-neutral-600 text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-500 transition duration-200'>
            <FaBoltLightning />
            <p>Start bot</p>
          </button>
          <button className='flex flex-wrap-nowrap items-center gap-2 px-4 py-2 rounded-xl border border-neutral-600 text-white bg-red-600 hover:bg-red-700 active:bg-red-500 transition duration-200'>
            <FaTrash />
            <p>Delete autotrader</p>
          </button>

          <button
            className={cn(
              'flex items-center flex-wrap-nowrap gap-2 px-4 py-2 rounded-xl border border-neutral-600 text-white bg-transparent hover:bg-transparent active:bg-transparent transition duration-200',
              loading && 'cursor-not-allowed'
            )}
            onClick={() =>
              router.push(`${params.name}/autotraders/detail/${detail.id}`)
            }
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <FaSave />
                <p>Detail</p>
              </>
            )}
          </button>
        </div>
      </Modal>
    </>
  );
}
