import { useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import { gsap } from 'gsap';
import { put } from '../../functions/fetch';
import AppContext from '../../context/app';

export default function ThankYou() {
  const router = useRouter();
  const context = useContext(AppContext);
  const counter = useRef<HTMLSpanElement>(null);
  
  const closeWindow = () => {
    router.push('/jobs');
  }

  const submitResult = async () => {
    const orderId = router.query.order_id;
    const statusId = router.query.status_id;
    try {
      context.loading.dispatch({type: 'ON'});
      await put(`/airtimes/${orderId}`, { status_id: parseInt(statusId as string) });
      context.loading.dispatch({type: 'OFF'});
    } catch (err: any) {
      context.loading.dispatch({type: 'OFF'});
    }
  }

  useEffect(() => {
    gsap.to(counter.current, { innerText: 0, snap: 'innerText', duration: 10, ease: 'none', onComplete() {
      closeWindow();
    }});
    if (router.isReady) {
      submitResult();
    }
  }, [router.isReady]);

  return (
    <main className="flex items-center justify-center h-screen">

      <section>

        {(() => {
          if (router.query.status_id === '1') {
            return <h2 className="text-xl text-gray text-center">Successfully purchased airtime</h2>;
          } else {
            return <h2 className="text-xl text-gray text-center">Payment status failed due to technical problem, please contact our support team</h2>;
          }
        })()}

        <button onClick={closeWindow} className="button mt-1">Close in <span ref={counter}>10</span></button>
      </section>

    </main>
  );
}