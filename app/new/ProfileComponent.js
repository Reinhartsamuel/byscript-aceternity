'use client';
import React from 'react';
import Cities from '../config/cititesAndRegions.json';

const ProfileComponent = ({ setIndex, data, setData }) => {
  const handlePhone = (e) => {
    let phone = '62' + e.target.value;

    if (phone.startsWith('620')) phone = '62' + phone.slice(3);
    if (phone.startsWith('+')) phone = phone.slice(1);

    setData({ ...data, phoneNumber: phone });
  };

  const validate = () => {
    if (!data?.name || !data?.email || !data?.phoneNumber)
      console.log('Data belum lengkap!');

    setIndex((prev) => prev + 1);
  };

  return (
    <div className='max-w-7xl pt-20'>
      <div className='flex flex-col'>
        <p className='text-xl font-bold text-center mt-5'>
          Isi data diri kamu dengan benar:
        </p>

        <div className='mt-10'>
          <div>
            <p>Nama Lengkap</p>
            <input
              className='w-full p-2 pl-10 text-sm text-gray-700'
              placeholder='Masukkan nama anda'
              onChange={(e) => setData({ ...data, name: e.target.value })}
              value={data?.name}
            />
          </div>
          <div>
            <p>Email</p>
            <input
              className='w-full p-2 pl-10 text-sm text-gray-700'
              placeholder='Masukkan email'
              type='email'
              onChange={(e) => setData({ ...data, email: e.target.value })}
              value={data?.email}
            />
          </div>
          <div>
            <p>Nomor Telepon (WA aktif)</p>
            <div className='flex'>
              <span className='bg-gray-100 p-2'>+62</span>
              <input
                className='w-full p-2 pl-10 text-sm text-gray-700'
                type='tel'
                placeholder='Masukkan nomor telepon'
                onChange={handlePhone}
              />
            </div>
          </div>
          <div>
            <p>Kota</p>
            <select
              onChange={(e) => setData({ ...data, city: e.target.value })}
            >
              {Cities?.map((x, i) => (
                <option key={i} value={`${x?.type} ${x?.city_name}`}>
                  {x?.city_name} ({x?.type})
                </option>
              ))}
            </select>
          </div>
          {/* <div>
            <p>Alamat</p>
            <textarea
              className="w-full p-2 pl-10 text-sm text-gray-700"
              placeholder="Alamat lengkap"
              onChange={(e) => setData({ ...data, address: e.target.value })}
              value={data?.address}
            />
          </div> */}
        </div>
        <div className='flex justify-end mt-10'>
          <div className='flex'>
            <button onClick={() => setIndex((prev) => prev - 1)}>
              {'<'}- Kembali
            </button>
            <button onClick={validate}>Lanjut -{'>'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
