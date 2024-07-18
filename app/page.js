import { IconHome, IconMessage, IconUser } from '@tabler/icons-react';
import { Carousel1 } from './components/Carousel1';
import { FlipWords } from './components/ui/FlipWords';
import { FloatingNav } from './components/ui/FloatingNavbar';
import { BackgroundGradientAnimation } from './components/ui/BackgroundGradientAnimation';

export default function Home() {
  const words = ['algoritma', 'otomatis', 'emotionless'];

  return (
    <>
      {/* <div class='h-screen w-full flex flex-col md:flex-row'>
        <div className='h-[40rem] flex justify-center items-center px-4'>
          <div>
            <div className='xl:text-md sm:text-sm mx-[1rem] font-normal text-neutral-600 dark:text-neutral-400 leading-normal text-center'>
              #Platform algorithmic trading pertama di Indonesia
            </div>
            <div className='xl:text-6xl sm:text-3xl mx-[2rem] font-normal text-neutral-600 dark:text-neutral-400 leading-normal text-center'>
              Bantu kamu trading
              <br /> dengan <FlipWords words={words} duration={2000} />
            </div>
          </div>
          <img
            src={
              'https://public.bnbstatic.com/image/cms/article/body/202107/77dff25762eae3e8f92e42c9d9ae0da5.png'
            }
            className='w-[50%]'
            alt={'signal'}
          />
        </div>
      </div> */}

      <div className='h-screen w-full inline-block md:flex'>
        <div>
          <img
            src={'https://www.byscript.io/backtest.jpeg'}
            className='w-full mx-auto'
            alt={'signal'}
          />
        </div>
        <h3>satu</h3>
        <h3>dua</h3>
      </div>
      <Carousel1 />
    </>
  );
}
