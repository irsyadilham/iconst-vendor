import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Back from '../../components/back';

export default function CoverageArea() {
  const router = useRouter();
  const [locations, setLocations] = useState([]);
  const selectAreaContainer = useRef();
  const selectAreaWrapper = useRef();

  const proceed = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/register/password');
  }

  //open areas selection
  //assign to "Add location" button
  const openAreaSelection = () => {
    gsap.timeline()
      .to(selectAreaContainer.current, { display: 'block', duration: 0.1 })
      .to(selectAreaWrapper.current, { y: 0, ease: 'power3.out' });
  }

  //close areas selection
  //assign to "X" or "close" button
  const closeAreaSelection = () => {
    gsap.timeline()
      .to(selectAreaWrapper.current, { y: '100%', ease: 'power3.out' })
      .to(selectAreaContainer.current, { display: 'none', duration: 0.1 }, '-=0.2');
  }

  //remove area in areas array
  const removeArea = (service: string) => {
    const x = locations.indexOf(service);
    setLocations(state => {
      const list = [...state];
      list.splice(x, 1);
      return list;
    });
  }

  useEffect(() => {
    
  }, []);

  return (
    <main>

      <section className="pt-3 pb-2 px-2">

        <Back text="Company address"/>

        <h1 className="text-2xl mt-3">Register account</h1>

        <div className="mt-2 flex justify-between">
          <h2>Locations cover</h2>
          <button onClick={openAreaSelection} className="text-primary font-bold">Add location</button>
        </div>

        <div id="areas-container" className="">
          {(() => {
            if (locations.length === 0) {
              return (
                <div className="flex flex-col items-center mt-4">
                  <h4 className="text-gray text-xl">No locations added</h4>
                  <p className="mt-[.5em] w-5/6 text-center">To add, press <span className="font-bold">Add location</span></p>
                </div>
              )
            } else {
              return (
                <section id="areas" className="mt-2 space-y-1">
                  
                  {locations.map((service, i) => {
                    return (
                      <div key={i} className="px-1 py-[1.2em] bg-white shadow-normal rounded-lg w-full flex justify-between items-center">
                        <h4 className="text-gray text-start font-semibold w-10/12">{service}</h4>
                        <button onClick={() => removeArea(service)}>
                          <Image className="w-1 h-1" src="/cancel.svg" alt="cancel" width={11} height={8}/>
                        </button>
                      </div>
                    )
                  })}

                  <button onClick={proceed} className="button !mt-3">Proceed</button>
      
                </section>
              )
            }
          })()}
        </div>
        {/* #areas-container */}

      </section>

      <section ref={selectAreaContainer} id="areas-selection" className="fixed w-screen top-0 h-screen hidden overflow-y-scroll">

        <section ref={selectAreaWrapper} id="areas-selection-wrapper" className="min-h-screen max-w-[490px] p-2 bg-white box-border translate-y-[100%]">
          
          <div className="flex justify-between">
            <h3 className="text-2xl">Location</h3>
            <button onClick={closeAreaSelection}>
              <Image src="/close.svg" className="w-[1.5em]" alt="close" width={27} height={27}/>
            </button>
          </div>

          <section id="location-search-container" className="mt-2">
            
            <div className="flex w-full bg-input-bg border-[1px] border-light-gray rounded-md py-[.8em] px-1">
              <Image src="/search.svg" alt="search" width={18} height={19}/>
              <input className="ml-[.5em] w-full bg-transparent outline-none text-sm" type="text"  placeholder="Type postcode, city, district, state"/>
            </div>
            <button className="button mt-1">Search</button>

          </section>
          {/* #location-search-container */}

          <section id="areas" className="mt-2 space-y-1">
            
            
          </section>
          {/* #areas */}

          {/* <button onClick={closeAreaSelection} className="button mt-2">Update</button> */}

        </section>
        {/* #areas-selection-wrapper */}

        
      </section>
      {/* #areas-selection */}
    </main>
  );
}