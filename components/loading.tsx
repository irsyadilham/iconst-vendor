import { useEffect, useRef, useContext } from 'react';
import AppContext from '../context/app';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function Loading() {
  const loadingIcon = useRef<HTMLImageElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const context = useContext(AppContext);

  useEffect(() => {
    const on = context.loading.state;
    if (on) {
      container.current.classList.remove('hidden');
      container.current.classList.add('flex');
      gsap.to(loadingIcon.current, { rotation: '360', repeat: -1, ease: 'none', duration: .7 });
    } else {
      container.current.classList.remove('flex');
      container.current.classList.add('hidden');
    }
  }, [context.loading.state]);

  return (
    <main ref={container} className="fixed top-0 left-0 h-screen w-screen flex-col items-center justify-center bg-white hidden">
      <Image className="w-[70px]" src="/loading-logo.svg" alt="logo" width={79} height={87}/>
      <Image ref={loadingIcon} className="w-[60px] mt-[1.5em]" src="/loading-icon.svg" alt="loading" width={64} height={64}/>
    </main>
  );
}