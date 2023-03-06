import type { NextPage } from 'next';
import { useEffect, useContext, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AppContext from '../../context/app';
import Image from 'next/image';
import { gsap } from 'gsap';
import { put } from '../../functions/fetch';

const PaymentStatus: NextPage = () => {
  const context = useContext(AppContext);
  const router = useRouter();
  const counter = useRef<HTMLSpanElement>(null);

  const sendPaymentStatus = async () => {
    try {
      context?.loading.dispatch({type: 'ON'});
      const data = {
        billcode: router.query.billcode,
        status_id: parseInt(router.query.status_id as string)
      };
      await put(`/jobs-quotation-payment-status`, data);
      gsap.to(counter.current, { innerText: 0, ease: 'none', duration: 10, snap: 'innerText', onComplete() {
        router.push('/jobs-accepted');
      }});
      context?.loading.dispatch({type: 'OFF'});
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to update payment status, please refresh page');
    }
  }

  useEffect(() => {
    if (router.isReady) {
      sendPaymentStatus();
    }
  }, [router.isReady]);

  return (
    <main className="flex items-center justify-center flex-col h-screen px-3">
      <Image src={router.query.status_id === '1' ? '/succeed.svg' : '/failed.svg'} alt="icon" width={100} height={100}/>
      <h2 className="mt-2 text-2xl text-primary">{router.query.status_id === '1' ? 'Payment successful' : 'Payment failed'}</h2>
      <p className="text-center mt-1">{router.query.status_id === '1' ? 'Payment successful and quotation had been submitted' : 'Payment failed and quotation failed to submit'}</p>
      <Link className="w-[75%] mt-[1.5em]" href="/jobs-accepted">
        <button className="button">Back to job accepted in <span ref={counter}>10</span></button>
      </Link>
    </main>
  );
}

export default PaymentStatus;