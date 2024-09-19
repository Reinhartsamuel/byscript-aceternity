'use client';
import Modal from '@/app/components/ui/Modal';
import PairImageComponent from '@/app/components/ui/PairImageComponent';
import Spinner from '@/app/components/ui/Spinner';
import { cn } from '@/lib/util';
import moment from 'moment';
// import { useParams, useRouter } from 'next/navigation';
import { FaBoltLightning } from 'react-icons/fa6';
import { IoEnter, IoExit } from 'react-icons/io5';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { IoMdClose } from 'react-icons/io';
import React, { useState } from 'react';
import PropTypes from 'prop-types'; // ES6
import { updateDocumentFirebase } from '@/app/utils/firebaseApi';

export default function ModalDetailAutotrader({
  detail,
  openModal,
  setOpenModal,
  setDetail,
}) {
  const [loading, setLoading] = useState(false);

  const { handleStartStop } = useStartStopAction({
    setLoading,
    detail,
    setDetail,
  });

  const { handleForce } = useForceAction({ detail, setLoading });

  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className='w-full flex flex-col items-start gap-2 lg:flex-row'>
          <div className='flex flex-col gap-4 w-full'>
            <div className='rounded-lg bg-gray-800 p-4 shadow-md mx-2 font-sans flex flex-col gap-1'>
              <div className='flex flex-col gap-2 divide-y divide-slate-700'>
                <div className='flex w-full justify-between h-10 items-end'>
                  <p className='text-gray-100 font-light text-sm'>Status</p>
                  <p
                    className={cn(
                      'font-bold text-sm',
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
                <div className='flex w-full justify-between h-10 items-end'>
                  <p className='text-gray-100 font-light text-sm'>Created at</p>
                  <p className='text-gray-100 font-light text-sm'>
                    {moment
                      .unix(detail?.createdAt?.seconds)
                      .format('HH:mm DD MMMM YYYY')}
                  </p>
                </div>
                <div className='flex w-full justify-between h-10 items-end'>
                  <p className='text-gray-100 font-light text-sm'>
                    Last updated
                  </p>
                  <p className='text-gray-100 font-light text-sm'>
                    {moment
                      .unix(detail?.lastUpdated?.seconds)
                      .format('HH:mm DD MMMM YYYY')}
                  </p>
                </div>
                <div className='flex w-full justify-between h-10 items-end'>
                  <p className='text-gray-100 font-light text-sm'>Exchange</p>
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
                  <p className='text-gray-100 font-light text-sm'>
                    Trade amount
                  </p>
                  <p className='text-gray-100 font-light text-sm'>
                    USD {detail?.tradeAmount}
                  </p>
                </div>

                <div className='flex w-full justify-between h-10 items-end'>
                  <p className='text-gray-100 font-light text-sm'>
                    Pairs: {detail?.trading_plan_pair?.length}
                  </p>
                  <div className='flex flex-col justify-center'>
                    {detail?.trading_plan_pair?.map((x, i) => (
                      <div key={i} className='flex gap-2 items-center'>
                        <p className='text-gray-100 font-light text-sm'>
                          {x?.split('_')?.shift()}
                        </p>
                        <p className='text-gray-100 font-light text-sm'>
                          {x?.split('_')?.slice(1)?.join('_')}
                        </p>
                        <PairImageComponent
                          pair={x?.split('_')?.slice(1)?.join('_')}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='mt-10 flex flex-col gap-2'>
                <h1>Start / stop autotrader</h1>
                <div className='flex gap-2 '>
                  <button
                    onClick={() => handleStartStop('start')}
                    disabled={detail?.status === 'ACTIVE'}
                    className={cn(
                      'flex items-center w-full justify-center flex-wrap-nowrap gap-2 px-4 py-2 rounded-xl border border-neutral-600 text-white ',
                      detail?.status === 'STOPPED'
                        ? 'cursor-pointer bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-500 transition duration-200'
                        : 'cursor-not-allowed bg-gray-600'
                    )}
                  >
                    <FaBoltLightning />
                    <p className='whitespace-nowrap'>Start autotrader</p>
                  </button>
                  <button
                    onClick={() => handleStartStop('stop')}
                    disabled={detail?.status === 'STOPPED'}
                    className={cn(
                      'flex items-center w-full justify-center flex-wrap-nowrap gap-2 px-4 py-2 rounded-xl border border-neutral-600 text-white',
                      detail?.status === 'ACTIVE'
                        ? 'cursor-pointer bg-red-600 hover:bg-red-700 active:bg-red-500 transition duration-200'
                        : 'cursor-not-allowed  bg-gray-600'
                    )}
                  >
                    <IoMdClose />
                    <p className='whitespace-nowrap'>Stop autotrader</p>
                  </button>
                </div>
              </div>
            </div>
            <div className='rounded-lg bg-gray-800 p-4 shadow-md mx-2 font-sans flex flex-col gap-1 flex-wrap'>
              <h1>Force Entry / Exit</h1>
              <div className='flex flex-col lg:flex-row gap-2'>
                <button
                  onClick={() => handleForce('entry')}
                  disabled={false}
                  className={cn(
                    'flex items-center w-full justify-center flex-wrap-nowrap gap-2 px-4 py-2 rounded-xl border border-neutral-600 text-white cursor-pointer bg-green-600 hover:bg-green-700 active:bg-green-500 transition duration-200'
                  )}
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <IoEnter />
                      <p className='whitespace-nowrap'>Force Entry</p>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleForce('exit')}
                  disabled={false}
                  className={cn(
                    'flex items-center w-full justify-center flex-wrap-nowrap gap-2 px-4 py-2 rounded-xl border border-neutral-600 text-white cursor-pointer bg-red-600 hover:bg-red-700 active:bg-red-500 transition duration-200'
                  )}
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <IoExit />
                      <p className='whitespace-nowrap'>Force Exit</p>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* <div className='flex flex-col gap-4 w-full overflow-scroll'>
            <div className='rounded-lg bg-gray-800 p-4 shadow-md mx-2 font-sans flex flex-col gap-1'>
              <h1>Trade History</h1>
              <TradeHistoryComponent
                bot_id={detail?.bot_id}
                text={'sm'}
                trading_plan_pair={detail?.trading_plan_pair}
              />
            </div>
          </div> */}
        </div>
      </Modal>
    </>
  );
}

function useStartStopAction({ setLoading, detail, setDetail }) {
  async function handleStartStop(action) {
    // return console.log(detail);
    setLoading(true);
    try {
      const body = {
        action,
        bot_id: detail.bot_id,
      };
      const result = await fetch('/api/3commas/bot-activation', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await result.json();
      if (result.status === 200 || res.status === 'success') {
        console.log('id bot:::::::', detail?.id);
        await updateDocumentFirebase('dca_bots', detail?.id, {
          status:
            action === 'start'
              ? 'ACTIVE'
              : action === 'stop'
              ? 'STOPPED'
              : 'invalid status',
        });
        Swal.fire({
          icon: 'success',
          title: `${action} bot success`,
        });
        setDetail({
          ...detail,
          status: action === 'start' ? 'ACTIVE' : 'STOPPED',
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'update bot to 3commas seems failed',
          text: `status code : ${res.status || 'unknown'}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `Error ${action} bot`,
        text: error.message + '!',
      });
    } finally {
      setLoading(false);
    }
  }

  return { handleStartStop };
}

function useForceAction({ detail, setLoading }) {
  const handleForce = async (action) => {
    const { isConfirmed, isDenied } = await Swal.fire({
      title: `Confirm force ${action}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: action,
      denyButtonText: 'cancel',
    });

    if (isDenied || !isConfirmed) return;
    setLoading(true);
    try {
      const resultPromise = await Promise.all(
        detail?.trading_plan_pair?.map(async (x) => {
          const sendBodyTo3Commas = {
            message_type: 'bot',
            bot_id: detail?.bot_id,
            email_token: '52c6860e-5814-47ed-a5ae-663d78446439',
            delay_seconds: 0,
            pair: x?.split('_')?.slice(1)?.join('_'),
          };
          if (action === 'exit') {
            sendBodyTo3Commas.action = 'close_at_market_price';
          }
          console.log(sendBodyTo3Commas, 'body to 3commas');
          const res = await fetch('/api/signal/force-entry', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendBodyTo3Commas),
          });

          return await res.json();
        })
      );
      console.log(resultPromise, 'resultPromise');
      Swal.fire({
        title: 'Success',
        text: `${action} autotrader success`,
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  return { handleForce };
}

ModalDetailAutotrader.propTypes = {
  detail: PropTypes.object,
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.any,
  loading: PropTypes.bool,
  setDetail: PropTypes.any,
};
