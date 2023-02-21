import React, { useContext, useState, useEffect, useRef } from 'react';
import AppContext from '../../context/app';
import Back from '../../components/back';
import { get, post } from '../../functions/fetch';
import { gsap } from 'gsap';

type airtime = {
  id?: number;
  validity: number;
  price: string;
  promo_active: boolean;
  promo_price: string;
  hide: boolean;
}

export default function CoinTopup() {
  const context = useContext(AppContext);
  const modal = useRef<HTMLDivElement>(null);
  const [airtimes, setAirtimes] = useState<airtime[]>([]);
  const [selectedAirtime, setSelectedAirtime] = useState<airtime | null>(null);

  const getAirtimes = async () => {
    try {
      context.loading.dispatch({type: 'ON'});
      const airtimes: airtime[] = await get('/airtimes');
      setAirtimes(airtimes);
      context.loading.dispatch({type: 'OFF'});
    } catch (err) {
      context.loading.dispatch({type: 'OFF'});
    }
  }

  const selectAirtime = (value: airtime) => {
    setSelectedAirtime(value);
    modal.current.classList.remove('hidden');
    modal.current.classList.add('flex');
    gsap.to(modal.current, { opacity: 1, ease: 'power3.out' })
  }

  const cancelPurchase = () => {
    gsap.to(modal.current, { opacity: 0, ease: 'power3.out', onComplete() {
      setSelectedAirtime(null);
    }});
    setTimeout(() => {
      modal.current.classList.remove('flex');
      modal.current.classList.add('hidden');
    }, 400);
  }

  const confirmPurchase = async () => {
    try {
      context.loading.dispatch({type: 'ON'});
      const res = await post(`/airtimes-purchase`, selectedAirtime);
      const isProd = process.env.NODE_ENV === 'production';
      window.open(`https://${isProd ? 'toyyibpay.com' : 'dev.toyyibpay.com'}/${res.billcode}`);
      cancelPurchase();
      context.loading.dispatch({type: 'OFF'});
    } catch (err) {
      context.loading.dispatch({type: 'OFF'});
      cancelPurchase();
      if (err.status === 400) {
        const data = await err.json();
        alert(data.message);
        return;
      }
      alert('Purchase unsuccessful, please try again later');
    }
  }

  useEffect(() => {
    getAirtimes();
  }, []);

  return (
    <main className="mx-2 pt-3 pb-2">
      <Back text="Back"/>
      <h2 className="text-2xl font-bold mt-2">Airtime topup</h2>

      <p className="mt-1 text-sm">Select option below</p>

      <section className="mt-1 space-y-[1.2em]">
        {airtimes.filter(val => !val.hide).map((airtime, i) => {
          return (
            <button onClick={() => selectAirtime(airtime)} key={i} className="flex w-full justify-between items-center bg-white shadow-normal p-[1.5em] rounded-md">

              <h4 className="text-gray">{airtime.validity} days</h4>

              {(() => {
                if (airtime.promo_active) {
                  return (
                    <div className="flex flex-col">
                      <div className="relative">
                        <p className="text-xs text-left">RM{airtime.price}</p>
                        <div className="w-10/12 h-[2px] bg-red-600 rotate-[8deg] absolute -left-[.5em] top-[.5em]"/>
                      </div>
                      <h4 className="text-primary">RM{airtime.promo_price}</h4>
                    </div>
                  )
                } else {
                  return <h4 className="text-primary">RM{airtime.price}</h4>;
                }
              })()}

            </button>
          );
        })}

      </section>

      <section ref={modal} id="confirm" className="fixed left-0 top-0 bg-black/50 w-full h-screen hidden opacity-0 items-center justify-center">
        
        <div className="p-2 bg-white rounded-md w-8/12">
          <h3 className="text-lg text-primary">Confirm purchase</h3>
          {(() => {
            if (selectedAirtime) {
              return <p className="mt-[.7em]">Are you sure to purchase an airtime validity <span className="font-bold text-primary">{selectedAirtime.validity} days</span> for <span className="font-bold text-primary">RM{selectedAirtime.promo_active ? selectedAirtime.promo_price : selectedAirtime.price}</span></p>;
            }
          })()}

          <div className="flex justify-end space-x-[1.5em] mt-[1.3em]">
            <button onClick={cancelPurchase} className="text-gray text-sm font-semibold">Cancel</button>
            <button onClick={confirmPurchase} className="bg-primary text-white py-[.8em] px-[1.2em] text-sm rounded-md font-semibold">Confirm</button>
          </div>
        </div>

      </section>
      {/* #confirm */}
    </main>
  );
}