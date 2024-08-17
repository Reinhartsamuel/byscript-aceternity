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
    <section className='bg-white dark:bg-gray-900'>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-md text-center mb-8 lg:mb-12'>
          <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
            Pricing
          </h2>
          <p className='mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400'>
            Daftar sekarang gratis trial satu bulan pertama
          </p>
        </div>
        <div className='space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0'>
          {/* <!-- Pricing Card --> */}

          {prices?.length > 0 && prices?.map((x,i) => (
          <div key={i} className='flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white'>
          <h3 className='mb-4 text-2xl font-semibold'>{x?.name}</h3>
          <p className='font-light text-gray-500 sm:text-lg dark:text-gray-400'>
            Gratis satu bulan pertama
          </p>
          <div className='flex justify-center items-baseline my-8'>
            <span className='mr-2 text-5xl font-extrabold'>IDR {priceFormat(x?.price)}</span>
          </div>
          {/* <!-- List --> */}
          <ul role='list' className='mb-8 space-y-4 text-left'>

            {x?.features?.length > 0 && x?.features?.map((feature,j) => (
                          <li className='flex items-center space-x-3' key={j}>
                          {/* <!-- Icon --> */}
                          <svg
                            className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fill-rule='evenodd'
                              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                              clip-rule='evenodd'
                            ></path>
                          </svg>
                          <span>{feature}</span>
                        </li>
            ))}
          </ul>
          <a
            href='#'
            className='text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900'
          >
            Get started
          </a>
        </div>
          ))}
        </div>
      </div>
    </section>
  );
}
