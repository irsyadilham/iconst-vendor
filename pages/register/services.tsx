import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Back from '../../components/back';
import Profile from '../../interfaces/profile-interface';

export default function Services() {
  const router = useRouter();
  const [services, setServices] = useState<string[]>([]);
  const listServicesContainer = useRef();
  const listServicesWrapper = useRef();

  const proceed = (e: React.FormEvent) => {
    e.preventDefault();
    const register: Profile = JSON.parse(localStorage.getItem('register'));
    register.companyDetails.services = services;
    localStorage.setItem('register', JSON.stringify(register));
    router.push('/register/credential');
  }

  const listServices: string[] = [
    'Build a house/building',
    'Home/Office/Building renovation',
    'Electrical wiring works',
    'Mechanical works',
    'Civil/Electrical/Mechanical sub-contractors',
    'Industrial/Commercial cleaning'
  ];

  //open services selection
  //assign to "Add service" button
  const openServiceSelection = () => {
    gsap.timeline()
      .to(listServicesContainer.current, { display: 'block', duration: 0.1 })
      .to(listServicesWrapper.current, { y: 0, ease: 'power3.out' });
  }

  //close services selection
  //assign to "X" or "close" button
  const closeServiceSelection = () => {
    gsap.timeline()
      .to(listServicesWrapper.current, { y: '100%', ease: 'power3.out' })
      .to(listServicesContainer.current, { display: 'none', duration: 0.1 }, '-=0.2');
  }

  //remove service in services array
  const removeService = (service: string) => {
    const x = services.indexOf(service);
    setServices(state => {
      const list = [...state];
      list.splice(x, 1);
      return list;
    });
  }

  //select and unselect services
  const select = (service: string) => {
    //check whether 
    const check = services.find(val  => {
      return val === service;
    });

    //if check found remove clicked item
    if (check) {
      const x = services.indexOf(check);
      setServices(state => {
        const list = [...state];
        list.splice(x, 1);
        return list;
      });
      return;
    }

    //add service
    const totalServices = services.length;
    if (totalServices < 2) {
      setServices(state => {
        return [...state, service];
      });
    }
  }

  //If service selected checked mark appear else opacity set to 0
  const serviceTickChecker = (service: string) => {
    const check = services.find(val  => {
      return val === service;
    });
    return !check ? 'opacity-0' : '';
  }

  useEffect(() => {
    const register: Profile = JSON.parse(localStorage.getItem('register'));
    if (register.companyDetails.services) {
      setServices(register.companyDetails.services);
    }
  }, []);

  return (
    <main>

      <section className="pt-3 pb-2 px-2">

        <Back text="Company details"/>

        <h1 className="text-2xl mt-3">Register account</h1>

        <div className="mt-2 flex justify-between">
          <h2>Service types</h2>
          {(() => {
            if (services.length < 2) {
              return <button onClick={openServiceSelection} className="text-primary font-bold">Add service</button>;
            }
          })()}
        </div>

        <div id="services-container" className="">
          {(() => {
            if (services.length === 0) {
              return (
                <div className="flex flex-col items-center mt-4">
                  <h4 className="text-gray text-xl">No service added</h4>
                  <p className="mt-[.5em] w-5/6 text-center">To add, press <span className="font-bold">Add service</span></p>
                </div>
              )
            } else {
              return (
                <section id="services" className="mt-2 space-y-1">
                  
                  {services.map((service, i) => {
                    return (
                      <div key={i} className="px-1 py-[1.2em] bg-white shadow-normal rounded-lg w-full flex justify-between items-center">
                        <h4 className="text-gray text-start font-semibold w-10/12">{service}</h4>
                        <button onClick={() => removeService(service)}>
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
        {/* #services-container */}

      </section>

      <section ref={listServicesContainer} id="services-selection" className="fixed top-0 h-screen w-screen hidden overflow-y-scroll">

        <section ref={listServicesWrapper} id="service-selection-wrapper" className="max-w-[490px] p-2 bg-white box-border translate-y-[100%]">
          
          <div className="flex justify-between">
            <h3 className="text-2xl">Services</h3>
            <button onClick={closeServiceSelection}>
              <Image className="w-[1.5em]" src="/close.svg" alt="close" width={27} height={27}/>
            </button>
          </div>

          <p className="mt-[.5em] text-sm">You can select up to 2 services only</p>

          <section id="services" className="mt-2 space-y-1">
            
            {listServices.map((service, i) => {
              return (
                <button onClick={() => select(service)} key={i} className="px-1 py-[1.2em] bg-white shadow-normal rounded-lg w-full flex justify-between items-center">
                  <h4 className="text-gray text-start font-semibold w-10/12">{service}</h4>
                  <div className={`bg-primary h-[1.5em] w-[1.5em] rounded-full flex items-center justify-center ${serviceTickChecker(service)}`}>
                    <Image src="/tick.svg" alt="tick" width={11} height={8}/>
                  </div>
                </button>
              )
            })}

          </section>
          {/* #services */}

          <button onClick={closeServiceSelection} className="button mt-2">Update</button>

        </section>
        {/* #service-selection-wrapper */}

        
      </section>
      {/* #service-selection */}
    </main>
  );
}