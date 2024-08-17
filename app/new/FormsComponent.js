'use client';
import { useState, useEffect } from 'react';
import { getSingleDocumentFirebase } from '../utils/firebaseApi';

const FormsComponent = (props) => {
  const { data: parentData, setData: setParentData, setIndex } = props;
  const [data, setData] = useState({});
  const toast = (message) => {
    console.log(message);
  };

  const getData = async () => {
    try {
      const result = await getSingleDocumentFirebase(
        'forms',
        'S9lUlEkl81fVfty9bJ43'
      );
      setData(result);
      console.log(result, 'result');
    } catch (error) {
      toast({
        status: 'error',
        description: error.message,
        title: 'Error',
        duration: 5000,
      });
    }
  };

  const handleChange = (arg, value) => {
    arg.answer = value;
    let latestAnswer =
      data?.forms?.map((x) => {
        if (x?.id === arg?.id) {
          return arg;
        } else return x;
      }) || [];
    setData({ ...data, forms: latestAnswer });
  };

  const handleDebug = () => {
    console.log(parentData, 'parentData');
    console.log(
      {
        ...parentData,
        forms: data?.forms || [],
      },
      'ini hasilnya'
    );
    setParentData({
      ...parentData,
      forms: data?.forms || [],
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='max-w-7xl pt-20'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl text-center'>
          Selamat datang di{' '}
          <span
            className='bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text'
            style={{ fontFamily: 'EcoCodingWGL4' }}
          >
            byScript
          </span>
        </h1>
        <p className='text-slate-500 italic'>Lengkapi form di bawah ini</p>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        {data?.forms?.map((x, i) => (
          <div
            key={i}
            className='w-full md:w-4/5 lg:w-2/5 mt-5 rounded-md shadow-lg p-10'
          >
            <h2 className='font-bold'>{x?.question}</h2>
            {x?.type === 'text' && (
              <input
                onChange={(e) => handleChange(x, e.target.value)}
                className='w-full p-2 pl-10 text-sm text-gray-700'
              />
            )}
            {x?.type === 'date' && (
              <input
                type='date'
                onChange={(e) => handleChange(x, e.target.value)}
                className='w-full p-2 pl-10 text-sm text-gray-700'
              />
            )}
            {x?.type === 'datetime' && (
              <input
                type='datetime-local'
                onChange={(e) => handleChange(x, e.target.value)}
                className='w-full p-2 pl-10 text-sm text-gray-700'
              />
            )}
            {x?.type === 'checkbox' && (
              <div>
                {x?.options?.map((y, idx) => (
                  <label key={idx} className='flex items-center'>
                    <input
                      type='checkbox'
                      onChange={(e) => handleChange(x, e.target.value)}
                      value={y}
                      // className='mr-2'
                    />
                    {y}
                  </label>
                ))}
              </div>
            )}
            {x?.type === 'radio' && (
              <div>
                {x?.options?.map((y, idx) => (
                  <label key={idx} className='flex items-center'>
                    <input
                      type='radio'
                      onChange={(e) => handleChange(x, e.target.value)}
                      value={y}
                      className='mr-2'
                    />
                    {y}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* <button onClick={handleDebug}>debug</button> */}
      <div className='flex justify-end mt-10'>
        <div className='flex'>
          <button onClick={() => setIndex((prev) => prev - 1)}>
            {'<'}- Kembali
          </button>
          <button onClick={() => setIndex((prev) => prev + 1)}>
            Lanjut -{'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormsComponent;
