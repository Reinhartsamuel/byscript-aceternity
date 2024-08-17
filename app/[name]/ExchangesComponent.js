'use client';
import { cn } from '@/lib/util';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Spinner from '../components/ui/Spinner';
import { authFirebase } from '../config/firebase';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {
  countDocumentsFirebase,
  getCollectionFirebase,
} from '../utils/firebaseApi';
import { useParams } from 'next/navigation';

const ExchangesComponent = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [exchanges, setExchanges] = useState([]);
  const [data, setData] = useState({ exchanges: [{}], count: 0 });
  const name =
    authFirebase.currentUser?.displayName ||
    authFirebase.currentUser?.email?.split('@')[0];
  const params = useParams();

  const handleSubmit = async () => {
    const inTimeWindow =
      moment(selectedDate).format('HH') >= '11' &&
      moment(selectedDate).format('HH') <= '17' &&
      moment(selectedDate).format('mm') <= '59';
    if (!inTimeWindow)
      return Swal.fire({
        icon: 'error',
        text: 'Silakan pilih waktu Senin-Jumat pukul 11.00 - 17.00',
      });
    try {
      setLoading(true);
      // console.log(selectedDate);
      const postData = {
        summary: `Onboarding 1 on 1 ${name} bersama byScript`,
        location: 'Online',
        description: 'Connect Exchange',
        start: {
          dateTime: moment(selectedDate)
            // .utcOffset(7 * 60)
            .format('YYYY-MM-DDTHH:mm:ss'),
          timeZone: 'Asia/Jakarta',
        },
        end: {
          dateTime: moment(selectedDate)
            .utcOffset(7 * 60)
            .add(1, 'hours')
            .format(),
          timeZone: 'Asia/Jakarta',
        },
        attendees: [
          // { email: 'edwinfardyanto@gmail.com' },
          { email: authFirebase.currentUser?.email },
        ],
      };
      const res = await fetch('/api/calendar/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      const result = await res.json();
      if (result?.data?.htmlLink) {
        Swal.fire({
          icon: 'success',
          title: 'Onboarding Dijadwalkan',
          text: `Harap cek email ${
            authFirebase.currentUser?.email
          } dan hadir pada online meeting pada ${moment(
            result?.data?.start?.dateTime
          ).format('dddd, DD MMMM YYYY, HH:mm')}`,
        });
      } else {
        throw new Error('Error while creating event');
      }
      // console.log(result, 'result');
      await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: {
            email: 'byscript@gmail.com',
            name: 'byScript',
          },
          cc: [
            {
              name: 'Reinhart',
              email: 'reinhartsams@gmail.com',
            },
          ],
          to: [
            {
              name: 'Edwin Ardyanto',
              email: 'edwinfardyanto@gmail.com',
            },
          ],
          subject: `Request Add Exchange : ${name}`,
          htmlContent: `
              <div>
                <p>Request Add Exchange : ${name}, 
                onboarding: ${moment(selectedDate).format(
                  'dddd, DD MMMM YYYY, HH:mm'
                )}</p>
                <a target="_blank" noopener noreferrer href="${
                  result?.data?.htmlLink
                }">${result?.data?.htmlLink}</a>
                Sent automatically from byscript backend
              </div>`,
        }),
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
      console.log(error.message, 'error');
    } finally {
      setOpenModal(false);
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      const conditions = [
        { field: 'uid', operator: '==', value: authFirebase.currentUser?.uid },
      ];
      const res = await getCollectionFirebase('exchanges', conditions);
      const count = await countDocumentsFirebase('exchanges', conditions);
      // setData({ count, exchanges: res });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className='mx-6 mt-10'>
        <div className='flex items-center gap-4'>
          <h2 className='text-xl text-bold text-slate-200 font-bold'>
            Exhcange
          </h2>
          <button
            onClick={() => setOpenModal(true)}
            type='button'
            className='text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-md text-lg p-2 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 min-w-[3rem]'
          >
            +
          </button>
        </div>
        {/* {data.exchanges?.length === 0 ? ( */}
        {false ? (
          <p>Kamu belum mempunyai akun autotrader</p>
        ) : (
          <>
            <p className='text-[0.75rem] font-light text-slate-200 mb-4'>
              {data?.count} akun autotrader
            </p>
            {data?.exchanges?.map((y, i) => (
              <div
                key={i}
                className='flex flex-col gap-2 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
              >
                <img
                  className='w-20'
                  src={
                    y?.exchange_thumbnail ||
                    'https://static.airpackapp.com/fe-next/homepage/prod/_next/static/media/open_sesame_night.47e06968.png?w=750&q=75'
                  }
                  alt={y?.name || 'gate'}
                />
                <div className='flex w-full justify-between'>
                <p className='text-gray-200 text-sm font-thin'>
                    Created: {moment.unix(y?.createdAt?.seconds).fromNow()}
                  </p>
                  <p className='text-gray-200 text-sm font-thin'>
                    Status: <span>Connected</span>
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* MODAL */}
      {openModal && (
        <div className='overflow-y-auto overflow-x-hidden  left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
          <div className='relative p-4 w-full max-w-2xl max-h-full'>
            {/* <!-- Modal content --> */}
            <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
              {/* <!-- Modal header --> */}
              <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
                <div className='flex flex-col gap-2'>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                    Connect Exchange
                  </h3>
                  <p className='font-extralight text-sm text-slate-400'>
                    Silakan jadwalkan onboarding untuk connect exhcange, wajib
                    memilih jadwal pukul 11.00 - 17.00 Senin - Jumat
                  </p>
                </div>
                <button
                  type='button'
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                  data-modal-hide='default-modal'
                  onClick={() => setOpenModal(false)}
                >
                  <svg
                    className='w-3 h-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 14'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                    />
                  </svg>
                  <span className='sr-only'>Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className='p-4 md:p-5 space-y-4'>
                <p>
                  Pilih Tanggal dan Waktu:{moment().format('YYYY-MM-DDTHH:mm')}
                </p>
                <input
                  type={'datetime-local'}
                  className='bg-gray-500 rounded text-white px-5 py-2'
                  min={moment().format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              {/* <!-- Modal footer --> */}
              <div className='flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600'>
                <button
                  onClick={handleSubmit}
                  data-modal-hide='default-modal'
                  type='button'
                  className={cn(
                    'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
                    loading && 'cursor-not-allowed opacity-50'
                  )}
                >
                  {loading ? <Spinner /> : 'Request Onboarding'}
                </button>
                <button
                  onClick={() => setOpenModal(false)}
                  type='button'
                  className='py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExchangesComponent;