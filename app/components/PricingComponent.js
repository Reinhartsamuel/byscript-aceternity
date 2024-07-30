'use client';
import React, { useEffect, useState } from 'react';
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from './ui/GlowingStars';
import { useRouter } from 'next/navigation';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { priceFormat } from '../utils/priceFormat';

const prices = [{}, {}, {}];

export function PricingComponent() {
  const router = useRouter();
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const getPricing = async () => {
    try {
      const arr = [];
      const productsRef = collection(db, 'products');
      const q = query(
        productsRef,
        where('type', '==', 'plan'),
        orderBy('price', 'asc')
      );
      // const q = query(collection(db, 'products'), where('type', '==', 'plan'));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() });
      });
      setPrices(arr);
      console.log(arr, 'arr');
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPricing();
  }, []);
  return (
    <div className='flex py-20 items-center antialiased overflow-x-scroll'>
      {prices.map((x, i) => (
        <div
          key={i}
          className='bg-[linear-gradient(110deg,#333_0.6%,#222)] flex flex-col items-center p-6 mt-2 mx-1 max-h-[40rem]  min-w-[360px] rounded-xl border border-[#eaeaea]'
        >
          <h2 className='text-white font-bold text-xl'>{x?.name}</h2>
          <h3 className='text-slate-300 font-bold text-3xl'>
            IDR {priceFormat(x?.price)}
          </h3>

          <div className='mt-10 flex flex-col items-center'>
            <ul>
              {x?.features?.map((y, idx) => (
                <li
                  key={idx}
                  className='mt-[5px] text-slate-200 flex items-center gap-2'
                >
                  <svg
                    stroke='currentColor'
                    fill='currentColor'
                    stroke-width='0'
                    viewBox='0 0 512 512'
                    focusable='false'
                    class='css-169zzeb'
                    role='presentation'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z'></path>
                  </svg>
                  {y}
                </li>
              ))}
            </ul>
          </div>
          <button className='mt-[10rem] w-full bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-[2px] h-[5rem] text-xs font-semibold leading-6  text-white inline-block'>
            <span className='absolute inset-0 overflow-hidden rounded-full'>
              <span className='absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
            </span>
            <div className='relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-5 px-4 ring-1 ring-white/10 '>
              <span>Daftar</span>
              <svg
                fill='none'
                height='16'
                viewBox='0 0 24 24'
                width='16'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M10.75 8.75L14.25 12L10.75 15.25'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                />
              </svg>
            </div>
            <span className='absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40' />
          </button>
        </div>
      ))}
    </div>
  );
}
