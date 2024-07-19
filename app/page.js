import { IconHome, IconMessage, IconUser } from '@tabler/icons-react';
import { Carousel1 } from './components/Carousel1';
import { FlipWords } from './components/ui/FlipWords';
import { FloatingNav } from './components/ui/FloatingNavbar';
import { BackgroundGradientAnimation } from './components/ui/BackgroundGradientAnimation';
import InstagramEmbedComponent from './components/InstagramEmbedComponent';
import { BackgroundGradient } from './components/ui/BackgroundGradient';
import { AuroraBackground } from './components/ui/AuroraBackground';
import StatisticsComponent from './components/StatisticsComponent';

const words = ['algoritma', 'otomatis', 'emotionless'];

export default function Home() {
  return (
    <>
      <AuroraBackground>
        <div className='h-screen w-full inline-block md:flex items-center justify-center mt-[10rem] lg:mt-[-5rem] lg:h-[90vh] lg:px-20'>
          <div className='w-full md:w-1/2 text-center items-center justify-center'>
            <div className='xl:text-6xl sm:text-3xl mx-[2rem] font-normal text-neutral-600 dark:text-neutral-400 leading-normal text-center'>
              Trading
              <FlipWords words={words} duration={2000} />
            </div>
            <h1 className='text-4xl font-bold text-white'>
              Selamat datang di{' '}
              <span className='bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent font-ecocoding'>
                byScript
              </span>
            </h1>
            <h1 className='text-md align-left text-slate-300'>
              Platform{' '}
              <span className='italic text-slate-100'>Algorithmic Trading</span>{' '}
              pertama di Indonesia
            </h1>
            <h3 className='text-slate-500 text-center text-sm italic'>
              Bantu Kamu Traders Cuan Trading Otomatis Pake Algoritma
            </h3>
            <div className='mt-10'>
              <button className='w-[90%] mx-auto relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'>
                <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-3 text-sm font-medium text-white backdrop-blur-3xl'>
                  Daftar sekarang
                </span>
              </button>
              <button className='w-[90%] p-[3px] relative my-5'>
                <div className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg' />
                <div className='px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white bg-transparent active:bg-violet-700'>
                  Sign In
                </div>
              </button>
            </div>
          </div>
          <div className='w-400 md:w-1/2 mx-auto'>
            <BackgroundGradient className='rounded-[22px]  p-4 sm:p-10 bg-zinc-900'>
              <img
                src={
                  'https://byscript-bucket.s3.ap-southeast-2.amazonaws.com/sniper.webp'
                }
                alt='sniper'
                className='w-full'
              />
              <p className='text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200'>
                Air Jordan 4 Retro Reimagined
              </p>

              <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                The Air Jordan 4 Retro Reimagined Bred will release on Saturday,
                February 17, 2024. Your best opportunity to get these right now
                is by entering raffles and waiting for the official releases.
              </p>
              <button className='rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800'>
                <span>Buy now </span>
                <span className='bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white'>
                  $100
                </span>
              </button>
            </BackgroundGradient>
          </div>
        </div>
        <StatisticsComponent />
      </AuroraBackground>

      <div className='w-full h-[5rem] bg-blue-500 mt-100'></div>
      <InstagramEmbedComponent />

      <div className='h-[50rem] mt-[100vh] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative inline-block items-center justify-center'>
        {/* Radial gradient for the container to give a faded look */}
        <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
      </div>
      <Carousel1 />
    </>
  );
}
