import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { get } from '../functions/fetch';

interface airtimeStatus {
  active: boolean;
  expired_date: string | null;
}

export default function Home({children}) {

  const router = useRouter();
  const [airtimeStatus, setAirtimeStatus] = useState<airtimeStatus>({active: false, expired_date: null});

  const getVendor = async (userId: string) => {
    try {
      const vendor = await get(`/vendors/user/${userId}`);
      setAirtimeStatus(vendor.airtime_status);
    } catch (err) {
      console.log(err);
      // console.log('error = ', await err.json());
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    getVendor(userId);
    if (!userId) {
      router.push('/login');
    }
  }, []);

  return (
    <main className="mx-2 pt-3">
      <section id="header" className="flex justify-between">

        <div id="logo-coin-container" className="flex items-center">
          <div id="logo" className="flex items-end flex-col w-5">
            <Image className="w-full" src="/logo.svg" alt="logo" width={188} height={46}/>
            <p className="font-bold text-[.7rem]">Vendor</p>
          </div>
          {/* #logo */}

          <Link href="/airtime" id="airtime-status" className="ml-1 bg-white shadow-normal px-1 py-[.5em] rounded-xl">
            <h4 className="text-sm text-primary">{airtimeStatus.active ? 'Active' : 'Inactive'}</h4>
            <p className="text-xs">Expired on {airtimeStatus.expired_date}</p>
          </Link>
          {/* #airtime-status */}

        </div>
        {/* #logo-coin-container */}

        <div id="notification-and-settings" className="flex items-center">
          <Link href="/notifications" className="mr-[.8em]">
            <Image className="w-[1.3em]" src="/notification.svg" alt="notification" width={20} height={21}/>
          </Link>
          <Link href="settings">
            <Image className="w-[1.3em]" src="/settings.svg" alt="settings" width={23} height={23}/>
          </Link>
        </div>
        {/* #notification-and-settings */}

      </section>
      {/* #header */}

      <section id="body" className="mt-2">

        {children}

      </section>
      {/* #body */}
    </main>
  );
}
