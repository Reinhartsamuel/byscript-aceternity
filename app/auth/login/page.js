'use client';
import Spinner from '@/app/components/ui/Spinner';
import { authFirebase } from '@/app/config/firebase';
import {
  getCollectionFirebase,
  setDocumentFirebase,
} from '@/app/utils/firebaseApi';
import { cn } from '@/lib/util';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const provider = new GoogleAuthProvider();

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({ email: '', password: '' });
  const [alert, setAlert] = useState({
    message: '',
    status : '',
  });

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(authFirebase, provider);
      console.log(result, 'result');
      const user = result.user;
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const findUser = await getCollectionFirebase('users', [
        { field: 'email', operator: '==', value: result?.user?.email },
      ]);
      const findCustomer = await getCollectionFirebase('customers', [
        { field: 'email', operator: '==', value: result?.user?.email },
      ]);
      const isNewUser = findUser?.length === 0 && findCustomer?.length === 0;
      console.log(isNewUser, 'isNewUser');
      try {
        const dataNew = {
          name: user?.displayName || '',
          lastLogin: new Date(),
          email: user?.email || '',
          photoUrl: user?.photoURL || '',
          token,
          country: 'Indonesia',
          uid: user?.uid || null,
        };
        if (isNewUser) dataNew.createdAt = new Date();
        await setDocumentFirebase('users', user.uid, dataNew);
        if (isNewUser) router.push('/new');
      } catch (error) {
        console.log(error.message, 'error setdoc users');
      }

      try {
        fetch(isNewUser ? '/api/email/login/new-user' : '/api/email/login', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user?.displayName || user?.email || '',
            email: user?.email,
          }),
        });
      } catch (error) {
        console.log(error.message, 'error send emailemail');
      }

      const name = user?.displayName || user?.email?.split('@')[0];
      router.push(`/${name?.toLowerCase()?.split(' ')?.join('-')}`);
    } catch (error) {
      console.error(error.message, ':::this is error login');
    } finally {
      setLoading(false);
    }
  };

  const onLoginEmail = async () => {
    setLoading(true);
    try {
      // search email in firestore users
      const findUser = await getCollectionFirebase('users', [
        { field: 'email', operator: '==', value: info?.email },
      ]);
      if (Array.isArray(findUser) && findUser?.length > 0) {
        // user registered
      } else {
        // user not found
      }
    } catch (error) {
      setAlert({message:error.message, status : 'error'});
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className='h-screen w-full flex'>
      <div className='h-full hidden md:flex flex-col items-center justify-between py-10 w-[50%] bg-[#18181B] bg-slate-900'>
        <p></p>
        <img
          alt='byScript'
          src='https://i.ibb.co.com/RB9rQy3/Whats-App-Image-2024-05-19-at-16-02-06.jpg'
          className='h-20 w-auto rounded-lg'
        />
        <h3>Ubah Trading Manual Jadi Trading Otomatis 🚀 🚀</h3>
      </div>
      <div className='h-full w-full md:w-[50%] bg-white'>
        <div
          className='flex h-full gap-4 flex-col max-w-[75%]
        lg:max-w-[60%] items-center justify-center mx-auto'
        >
          <h3 className='text-3xl text-slate-900 font-bold text-center'>
            Masuk ke byScript
          </h3>
          <p className='text-slate-600 font-extralight leading-5 text-center font-md'>
            Jika kamu sudah memiliki langganan <i>trading plan</i>, harap login
            dengan email yang sama
          </p>
          <div className='flex flex-col w-full gap-2'>
            <input
              type='email'
              className='flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50
                text-slate-800
                '
              id='email'
              placeholder='name@example.com'
              autocapitalize='none'
              autocomplete='email'
              autocorrect='off'
            />
            <button
              className={cn(
                'w-full px-8 py-2 h-11  bg-black text-white text-sm rounded-md hover:bg-black/[0.8] hover:shadow-lg',
                loading && 'disabled'
              )}
            >
              {loading ? <Spinner /> : 'Masuk dengan Email'}
            </button>
          </div>
          <div className='relative my-4 flex w-full items-center text-xs uppercase text-slate-900'>
            <div className='w-full flex h-0 border-[0.5px] border-slate-300' />
            <span className='bg-background wrap-no-wrap px-2 text-muted-foreground whitespace-nowrap'>
              atau masuk dengan
            </span>
            <div className='w-full flex h-0 border-[0.5px] border-slate-300' />
          </div>

          <button
            className={`w-full flex items-center justify-center gap-2 px-8 py-2 h-11 border-[1px] border-slate-300 bg-white text-slate-800 text-sm rounded-md font-semibold  hover:${
              !loading && 'shadow-xl'
            }`}
            disabled={loading}
            cursor={loading ? 'not-allowed' : 'pointer'}
            onClick={() => handleLogin('google')}
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <img
                  className='w-5'
                  src={
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png'
                  }
                />
                <p>Google</p>
              </>
            )}
          </button>
          <p className='text-slate-900 font-extralight  text-center text-sm'>
            Dengan sign in, kamu setuju dengan{' '}
            <u className='cursor-pointer'>Kebijakan Privasi</u> dan{' '}
            <u className='cursor-pointer'>Syarat dan Ketentuan</u> platform
            byScript
          </p>
        </div>
      </div>
      {alert?.message && (
        <div
          class='flex items-center p-4 m-4 text-sm text-blue-800 rounded-lg bg-blue-50 absolute transition ease-in-out'
          role='alert'
        >
          <svg
            class='flex-shrink-0 inline w-4 h-4 me-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
          </svg>
          <span class='sr-only'>Info</span>
          <div>
            <span class='font-medium'>Info alert!</span> Change a few things up
            and try submitting again.
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
