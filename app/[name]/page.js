'use client';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { authFirebase } from '../config/firebase';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const SubscriptionComponent = dynamic(() => import('./SubscriptionComponent'), {
  ssr: false,
});
const BillingHistoryComponent = dynamic(
  () => import('./BillingHistoryComponent'),
  { ssr: false }
);
const AutoTradeComponent = dynamic(() => import('./AutoTradeComponent'), {
  ssr: false,
});
const ActivitiesComponent = dynamic(() => import('./ActivitiesComponent'), {
  ssr: false,
});
const AutotraderBotComponent = dynamic(
  () => import('./AutotraderBotComponent'),
  { ssr: false }
);
const ExchangesComponent = dynamic(() => import('./ExchangesComponent'), {
  ssr: false,
});

const page = ({ params }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(authFirebase, (user) => {
      if (!user) {
        console.log('no user, signing out!!!!');
        authFirebase.signOut();
        return router.push('/');
      }
      setUser(user);
    });
  }, []);

  return (
    <>
      {user && <></>}
      <div className='w-screen min-h-screen flex flex-col mx-auto px-1 lg:px-6'>
        <div className='mt-10 mx-6'>
          <h1 className='text-3xl font-bold text-slate-100'>
            Selamat datang, {params?.name?.split('-')?.join(' ')}!
          </h1>
          <h3 className='font-extralight text-sm text-gray-300 leading--5'>
            Selamat datang di dashboard byScript. Kamu dapat mengatur
            subscription dan trading plan.
          </h3>
        </div>

        <ExchangesComponent />
        {/* <div className='grid grid-cols-1 mt-10 mx-6 gap-2 lg:grid-cols-2'>
          <SubscriptionComponent />
          <BillingHistoryComponent />
        </div> */}
        <AutotraderBotComponent />
        {/* <AutoTradeComponent /> */}
      </div>
      {/* <ActivitiesComponent /> */}
    </>
  );
};

export default page;
