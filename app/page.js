import { IconHome, IconMessage, IconUser } from '@tabler/icons-react';
import { Carousel1 } from './components/Carousel1';
import { FlipWords } from './components/ui/FlipWords';
import { FloatingNav } from './components/ui/FloatingNavbar';
import { BackgroundGradientAnimation } from './components/ui/BackgroundGradientAnimation';
import InstagramEmbedComponent from './components/InstagramEmbedComponent';
import { BackgroundGradient } from './components/ui/BackgroundGradient';
import { AuroraBackground } from './components/ui/AuroraBackground';
import StatisticsComponent from './components/StatisticsComponent';
import { HeroHighlightComponent } from './components/HeroHighlightsComponent';
import { ImageGallery } from './components/ImageGallery';
import SignalPreviewComponent from './components/SignalPreviewComponent';
import { StepsComponent } from './components/StepsComponent';
import { PricingComponent } from './components/PricingComponent';
import { TestimonialsComponent } from './components/TestimonialsComponent';
import Navbar from './components/ui/Navbar';
const words = ['algoritma', 'otomatis', 'emotionless'];

export default function Home() {
  return (
    <>
      <Navbar />
      {/* <AuroraBackground> */}
      {/* <div className='h-screen w-full inline-block md:flex items-center justify-center lg:h-[90vh] lg:px-20'>
        <div className='w-full md:w-1/2 text-center items-center justify-center'>
          <div className='xl:text-6xl sm:text-3xl mx-[2rem] font-normal text-neutral-600 dark:text-neutral-400 leading-normal text-center'>
            Trading
            <FlipWords words={words} duration={2000} />
          </div>
          <h1 className='text-4xl font-bold text-white xl:text-7xl'>
            Selamat datang di{' '}
            <span className='bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent font-ecocoding'>
              byScript
            </span>
          </h1>
          <h1 className='text-md align-left text-slate-300 mt-5'>
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
            <div className='hidden md:block'>
              <StatisticsComponent />
            </div>
          </div>
        </div>
        <div className='w-400 md:w-1/2 mx-auto'>
          <BackgroundGradient className='rounded-[22px] p-4 sm:p-10 bg-zinc-900'>
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
              February 17, 2024. Your best opportunity to get these right now is
              by entering raffles and waiting for the official releases.
            </p>
            <button className='rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800'>
              <span>Buy now </span>
              <span className='bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white'>
                $100
              </span>
            </button>
          </BackgroundGradient>
        </div>
      </div> */}

      <div className='h-screen w-full pt-10 inline-block md:flex items-center justify-center lg:h-[90vh] lg:px-20 z-20'>
        <div className='w-full md:w-1/2 text-center items-center justify-center'>
          {/* <div className='sm:text-3xl mx-[2rem] font-normal text-neutral-600 dark:text-neutral-400 leading-normal text-center lg:text-[1.5rem]'>
            Trading
            <FlipWords words={words} duration={2000} className={'lg:text-[1.5rem]'} />
          </div> */}
          <h1 className='text-4xl font-bold text-white xl:text-6xl'>
            Automated Algorithmic Trading with {' '}
            <span className='bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent font-[eco_coding]'>
              byScript
            </span>
          </h1>
          <h1 className='text-md align-left text-slate-300 mt-5'>
            Platform{' '}
            <span className='italic text-slate-100'>Algorithmic Trading</span>{' '}
            pertama di Indonesia, Bantu Kamu Traders Cuan Trading Otomatis Pake Algoritma
          </h1>
          <div className='mt-10'>
            <button className='w-[90%] mx-auto relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'>
              <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
              <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-3 text-sm font-medium text-white backdrop-blur-3xl'>
                Setup Autotrade Sekarang
              </span>
            </button>
            <button className='w-[90%] p-[3px] relative my-5'>
              <div className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg' />
              <div className='px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white bg-transparent active:bg-violet-700'>
                Sign In
              </div>
            </button>
            <div className='hidden md:block'>
              <StatisticsComponent />
            </div>
          </div>
        </div>
        <div className='w-400 md:w-1/2 mx-auto'>
          {/* <BackgroundGradient className='rounded-[22px] p-4 sm:p-10 bg-zinc-900'>
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
            </BackgroundGradient> */}
          {/* <Carousel1 images={['https://byscript-bucket.s3.ap-southeast-2.amazonaws.com/xma.webp']} /> */}
          <div className='w-full h-full flex justify-center'>
            <img
              src={
                'https://byscript-bucket.s3.ap-southeast-2.amazonaws.com/xma.webp'
              }
              className='w-[60%]'
            />
          </div>
        </div>
      </div>

      <div className='mt-40 md:hidden'>
        <StatisticsComponent />
      </div>
      {/* </AuroraBackground> */}
      {/* EXCHANGES LOGO */}
      <div className='w-full mx-auto flex flex-wrap justify-center items-center bg-slate-50 mt-100 xl:px-20'>
        <img
          className='w-[10rem] mt-10'
          src={
            'https://3commas.cdn.prismic.io/3commas/9f0f9956-95a9-4b6c-9ed9-4be570d96e52_gateio_logo.svg'
          }
          alt={'gateio'}
        />
        <img
          className='w-[10rem] mt-10'
          src={
            'https://3commas.cdn.prismic.io/3commas/3671e430-78b2-47d9-ae24-4dfbbbbe3a7d_binance_logo.svg'
          }
          alt={'binance'}
        />
        <img
          className='w-[10rem] mt-10'
          src={
            'https://3commas.cdn.prismic.io/3commas/1e2874ba-6b40-41f6-9a08-cf016fc6e850_okx_logo.svg'
          }
          alt={'okx'}
        />
        <img
          className='w-[10rem] mt-10'
          src={
            'https://3commas.cdn.prismic.io/3commas/f0739090-3719-40a8-9427-a541475733e5_bybit_logo.svg'
          }
          alt={'bybit'}
        />
        <img
          className='w-[10rem] mt-10'
          src={
            'https://images.prismic.io/3commas/de1e3082-4fef-4741-a010-a6ea0cc59c3a_1+1.png?auto=compress,format'
          }
          alt={'bitget'}
        />
        <img
          className='w-[10rem] mt-10'
          src={
            'https://3commas.cdn.prismic.io/3commas/b83d7a6a-46ae-4129-86a2-a25c008ec770_kraken_logo.svg'
          }
          alt={'kraken'}
        />
        <img
          className='w-[10rem] mt-10'
          src={
            '	https://3commas.cdn.prismic.io/3commas/c25996fe-36cd-46de-a500-525650431bad_kucoin_logo.svg'
          }
          alt={'htx'}
        />
        <img
          className='w-[10rem] mt-10'
          src={
            'https://3commas.cdn.prismic.io/3commas/2b94565b-8045-4e46-bd67-382737c72f5c_bitstamp_logo.svg'
          }
          alt={'bitstamp'}
        />
        <img
          className='w-[10rem] mt-10'
          src={
            '	https://3commas.cdn.prismic.io/3commas/d6eee03c-fe78-4a1b-9ec3-7fc76ade66d1_gemini_logo.svg'
          }
          alt={'gemini'}
        />
        <img
          className='w-[10rem] mt-10'
          src={
            'https://3commas.cdn.prismic.io/3commas/386bba0c-1585-456f-ae68-350973d143ca_bitfinex_logo.svg'
          }
          alt={'bitfinex'}
        />
        <img
          className='w-[10rem] mt-10 mb-10'
          src={
            '	https://3commas.cdn.prismic.io/3commas/33f66756-3f61-480a-bdb9-c2e69182efc1_coinbase_logo.svg'
          }
          alt={'coinbase'}
        />
      </div>

      <HeroHighlightComponent />

      <div className='w-full h-screen mt-20 inline-block items-center justify-center mx-auto'>
        <h1 className='text-3xl mt-10 font-bold text-center mx-auto md:text-5xl lg:text-7xl'>
          LIVE SIGNAL 📣📈📉
        </h1>
        <h3 className='text-center mx-auto'>
          Signal live dari trading plan byscript, otomatis dari algoritma yang
          kami kembangkan
        </h3>
        <SignalPreviewComponent />
      </div>

      <div className='w-full my-1000 flex flex-col my-[20rem]'>
        <h1 className='text-2xl mt-10 font-bold text-center mx-auto md:text-6xl'>
          Cara mengaktifkan autotrade
        </h1>
        <StepsComponent />
      </div>

      {/* <div className='w-full h-screen mt-20 flex flex-col items-center justify-center mx-auto'>
        <InstagramEmbedComponent />
      </div> */}
      <div className='w-full mt-20 inline-block items-center justify-center'>
        <h1 className='text-2xl mt-10 font-bold text-center mx-auto md:text-6xl'>
          Gabung komunitas byScript
        </h1>
        <h3 className='text-center mb-10 text-red'>
          50+ member sudah menggunakan trading otomatis, 10 member sudah{' '}
          <i>break-even point</i> (BEP) tinggal kamu
        </h3>
        <ImageGallery />
      </div>
      {/* <div className='w-full h-screen mt-20 flex items-center justify-center mx-auto'>
        <InstagramEmbedComponent id='C3h_mt1P-tV' captioned />
      </div> */}
      <TestimonialsComponent />

      <div className='min-h-screen'>
        <h1 className='text-5xl mt-10 font-bold text-center mx-auto'>
          Pricing
        </h1>
        <h3 className='text-center text-white mt-5'>
          Pendaftar baru dapat promo gratis satu bulan pertama
        </h3>
        <PricingComponent />
      </div>
    </>
  );
}
