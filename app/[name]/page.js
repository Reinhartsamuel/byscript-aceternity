'use client';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { authFirebase } from '../config/firebase';
import { useRouter } from 'next/navigation';
import SubscriptionComponent from './SubscriptionComponent';
import BillingHistoryComponent from './BillingHistoryComponent';
import AutoTradeComponent from './AutoTradeComponent';
import ActivitiesComponent from './ActivitiesComponent';
import AutotraderBotComponent from './AutotraderBotComponent';

const page = ({ params }) => {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(authFirebase, (user) => {
      if (!user) {
        authFirebase.signOut();
        router.push('');
      }
    });
  }, []);

  return (
    <>
      <div className='w-screen min-h-screen flex flex-col mx-auto px-5'>
        <div className='mt-10 mx-2'>
          <h1 className='text-3xl font-bold text-slate-100'>
            Selamat datang, {params?.name?.split('-')?.join(' ')} !
          </h1>
          <h3 className='font-extralight text-sm text-slate-400 leading--5'>
            Selamat datang di dashboard byScript. Kamu dapat mengatur
            subscription dan trading plan.
          </h3>
        </div>

        <div className='grid grid-cols-2 mt-10'>
          <SubscriptionComponent />
          <BillingHistoryComponent />
        </div>
        <AutotraderBotComponent />
        <AutoTradeComponent />
      </div>
      <ActivitiesComponent />
    </>
  );
};

export default page;
