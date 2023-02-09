import Image from 'next/image';
import Back from '../../components/back';

interface coin {
  coin: number;
  validity: string;
  price: number;
}

export default function CoinTopup() {
  const coins: coin[] = [
    {
      coin: 100,
      validity: '60 days',
      price: 100
    },
    {
      coin: 200,
      validity: '90 days',
      price: 150
    },
    {
      coin: 300,
      validity: '150 days',
      price: 250
    },
    {
      coin: 600,
      validity: '150 days',
      price: 500
    },
    {
      coin: 1200,
      validity: '250 days',
      price: 1000
    },
    {
      coin: 1600,
      validity: '1 year',
      price: 1500
    }
  ];

  return (
    <main className="mx-2 pt-3 pb-2">
      <Back text="Back"/>
      <h2 className="text-2xl font-bold mt-2">Coin topup</h2>

      <p className="mt-1 text-sm">Select option below</p>

      <section className="mt-1 space-y-[1.2em]">
        {coins.map((coin, i) => {
          return (
            <button key={i} className="flex w-full justify-between items-center bg-white shadow-normal p-1 rounded-md">
              <div id="left" className="flex items-center">
                <Image className="w-[1.7em]" src="/coin.svg" alt="coin" width={18} height={18}/>
                <div className="ml-[.7em]">
                  <h4 className="text-primary text-start">{coin.coin} coin</h4>
                  <p className="text-xs">Validity: {coin.validity}</p>
                </div>
              </div>

              <h4 className="text-primary">RM{coin.price}</h4>
            </button>
          );
        })}

      </section>
    </main>
  );
}