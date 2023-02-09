import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

export default function Home({children}) {

  const router = useRouter();
  const [coin, setCoin] = useState<number>(0);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
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

          <Link href="/coin-topup" id="coin" className="flex items-center ml-1 bg-white shadow-normal px-[.5em] py-[.3em] rounded-full">
            <Image className="w-[1.1em]" src="/coin.svg" alt="coin" width={18} height={18}/>
            <p className="ml-[.3em] text-xs">{coin}</p>
          </Link>
          {/* #coin */}
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
