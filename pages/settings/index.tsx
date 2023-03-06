import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Back from '../../components/back';
import Image from 'next/image';
import { get } from '../../functions/fetch';
import { useContext } from 'react';
import AppContext from '../../context/app';

const Settings: NextPage = () => {

  const context = useContext(AppContext);
  const router = useRouter();

  const logout = async () => {
    try {
      context?.loading.dispatch({type: 'ON'});
      await get('/logout');
      localStorage.removeItem('user_id');
      localStorage.removeItem('token');
      router.push('/login');
      context?.loading.dispatch({type: 'OFF'});
    } catch (err) {
      alert('Failed to logout, please try again later');
      context?.loading.dispatch({type: 'OFF'});
    }
  }

  return (
    <main className="mx-2 pt-3 pb-2">
      <Back text="Back"/>
      <h1 className="font-bold text-2xl mt-2">Settings</h1>

      <section id="list-items" className="space-y-[1.3em] mt-2">
        
        <Link href="/settings/profile" className="flex items-center shadow-normal rounded-md px-[1.5rem] py-[1.2rem]">
          <Image src="/settings/profile.svg" alt="profile" width={21} height={22}/>
          <p className="ml-[.9rem]">Profile</p>
        </Link>

        <Link href="/settings/company-details" className="flex items-center shadow-normal rounded-md px-[1.5rem] py-[1.2rem]">
          <Image src="/settings/briefcase.svg" alt="briefcase" width={23} height={23}/>
          <p className="ml-[.9rem]">Company name & address</p>
        </Link>

        <Link href="/settings/services-credential" className="flex items-center shadow-normal rounded-md px-[1.5rem] py-[1.2rem]">
          <Image src="/settings/briefcase.svg" alt="briefcase" width={23} height={23}/>
          <p className="ml-[.9rem]">Services & credential</p>
        </Link>

        <Link href="/settings/change-password" className="flex items-center shadow-normal rounded-md px-[1.5rem] py-[1.2rem]">
          <Image src="/settings/padlock.svg" alt="password" width={21} height={21}/>
          <p className="ml-[.9rem]">Change password</p>
        </Link>

        {/* <Link href="/settings/change-language" className="flex items-center shadow-normal rounded-md px-[1.5rem] py-[1.2rem]">
          <Image src="/settings/language.svg" alt="language" width={18} height={18}/>
          <p className="ml-[.9rem]">Change language</p>
        </Link> */}

        <button onClick={logout} className="flex w-full items-center shadow-normal rounded-md px-[1.5rem] py-[1.2rem]">
          <Image src="/settings/logout.svg" alt="logout" width={21} height={21}/>
          <p className="ml-[.9rem] text-[#F90000]">Logout</p>
        </button>

      </section>
      {/* #list-items */}
    </main>
  );
}

export default Settings;