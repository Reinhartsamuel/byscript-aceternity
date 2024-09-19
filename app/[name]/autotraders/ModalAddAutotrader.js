'use client';
import Modal from '@/app/components/ui/Modal';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useExchangeStore } from '@/app/store/exchangesStore';
import { authFirebase } from '@/app/config/firebase';
import Spinner from '@/app/components/ui/Spinner';
import { cn } from '@/lib/util';
import { useAutotraderStore } from '@/app/store/autotraderStore';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { addDocumentFirebase } from '@/app/utils/firebaseApi';

export default function ModalAddAutotrader({ addModal, setAddModal }) {
  const { exchanges_accounts } = useExchangeStore();
  const { getAutotraders } = useAutotraderStore();
  const [data, setData] = useState({
    uid: authFirebase.currentUser?.uid,
    name: authFirebase.currentUser?.displayName,
    email: authFirebase.currentUser?.email,
    tradeAmount: 0,
    exchange_name: '',
    exchange_thumbnail: '',
    status: 'REQUESTED',
    trading_plan_pair: [],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(false);
    if (!data?.exchange_name || !data?.exchange_thumbnail)
      return Swal.fire({ icon: 'warning', text: 'Please select exchange!' });
    if (!data?.tradeAmount)
      return Swal.fire({
        icon: 'warning',
        text: 'Please fill in trade amount!',
      });

    try {
      setLoading(true);
      await addDocumentFirebase('dca_bots', data, 'byScript');
      getAutotraders();
    } catch (error) {
      Swal.fire({ icon: 'error', text: error.message });
    } finally {
      setLoading(false);
      setData({
        ...data,
        tradeAmount: 0,
        exchange_name: '',
        exchange_thumbnail: '',
      });
    }
  };

  return (
    <Modal open={addModal} onClose={() => setAddModal(false)}>
      <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
            Add New Autotrader
          </h3>
          <p className='font-extralight text-sm text-slate-400 whitespace-wrap'>
            Silakan pilih exchange yang sudah tersambung. Jika belum ada, kamu
            bisa menambahkan di menu Exchange
          </p>
        </div>
      </div>

      {/* <pre>{JSON.stringify(detail, null, 2)}</pre> */}
      <div className='flex flex-col gap-2 my-10'>
        <div className='flex flex-col gap-1'>
          <p className='text-gray-100 font-bold'>Exchange</p>
          {Array.isArray(exchanges_accounts) &&
          exchanges_accounts?.length > 0 ? (
            exchanges_accounts?.map((exchange, i) => (
              <div className='flex gap-1 items-center mb-4' key={i}>
                <input
                  onChange={(e) => {
                    setData({
                      ...data,
                      exchange_name: JSON.parse(e.target.value)?.exchange_name,
                      exchange_thumbnail: JSON.parse(e.target.value)
                        ?.exchange_thumbnail,
                    });
                  }}
                  checked={data?.exchange_name === exchange?.exchange_name}
                  id='default-radio-2'
                  type='radio'
                  value={JSON.stringify(exchange)}
                  name='default-radio'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <img
                  className='w-[6rem] object-contain'
                  src={
                    exchange?.exchange_name === 'GATE'
                      ? 'https://static.airpackapp.com/fe-next/homepage/prod/_next/static/media/open_sesame_night.47e06968.png?w=750&q=75'
                      : exchange?.exchange_thumbnail
                  }
                  alt={exchange?.name || 'gate'}
                />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='first_name' className='text-gray-100 font-bold'>
            Trade Amount
          </label>
          <div className='flex'>
            <span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
              <p>USD</p>
            </span>
            <input
              type='number'
              className='rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='100'
              onChange={(e) =>
                setData({ ...data, tradeAmount: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
      </div>
      <div className='flex flex-wrap gap-1 justify-end items-center p-4 md:p-5 border-t border-gray-200 dark:border-gray-600'>
        <button
          onClick={handleSubmit}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-600 text-white bg-green-600 hover:bg-green-700 active:bg-green-500 transition duration-200',
            loading ? 'opacity-50 cursor-not-allowed whitespace-nowrap' : '',
            'whitespace-nowrap' // add this to prevent text from breaking into a new line
          )}
          disabled={loading}
        >
          {loading ? <Spinner /> : <p>Request autotrader</p>}
        </button>
      </div>
    </Modal>
  );
}

ModalAddAutotrader.propTypes = {
  addModal: PropTypes.bool,
  setAddModal: PropTypes.bool,
  loading: PropTypes.bool,
  setLoading: PropTypes.bool,
};
