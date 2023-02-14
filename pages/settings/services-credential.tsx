import React, { useRef, useState, useEffect, useContext } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Back from '../../components/back';
import { get } from '../../functions/fetch';
import AppContext from '../../context/app';
import { CompanyDetails, service } from '../../interfaces/profile-interface';

interface File {
  file?: any;
  url: string;
}

export default function ServicesCredential() {
  const context = useContext(AppContext);
  const [id, setId] = useState<number>(0);
  const [services, setServices] = useState<service[]>([]);
  const listServicesContainer = useRef();
  const listServicesWrapper = useRef();
  const credential = useRef<HTMLInputElement>(null);
  const [credentialFile, setCredentialFile] = useState<File | null>(null);
  const [listServices, setListServices] = useState<service[]>([]);

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
  const removeService = (service: service) => {
    const x = services.indexOf(service);
    setServices(state => {
      const list = [...state];
      list.splice(x, 1);
      return list;
    });
  }

  //select and unselect services
  const select = (service: service) => {
    //check whether 
    const check = services.find(val  => {
      return val.name === service.name;
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
  const serviceTickChecker = (service: service) => {
    const check = services.find(val  => {
      return val.name === service.name;
    });
    return !check ? 'opacity-0' : '';
  }

  const getVendor =  async () => {
    try {
      context.loading.dispatch({type: 'ON'});
      const userId = localStorage.getItem('user_id');
      const data: CompanyDetails = await get(`/vendors/user/${userId}`);
      setServices(data.services);
      if (data.credential_file_url) {
        setCredentialFile({url: `${process.env.HOST}/${data.credential_file_url}`});
      }
      setId(data.id);
      context.loading.dispatch({type: 'OFF'});
    } catch (err) {
      context.loading.dispatch({type: 'OFF'});
    }
  }

  const getServiceTypes = async () => {
    try {
      const services = await get('/service-types');
      setListServices(services);
    } catch (err) {
      
    }
  }

  useEffect(() => {
    getVendor();
    getServiceTypes();
  }, []);

  const upload = () => {
    if (credential.current.files.length > 0) {
      const file = credential.current.files[0];
      setCredentialFile({
        file,
        url: URL.createObjectURL(file)
      });
    }
  }

  const triggerUpload = () => {
    credential.current.click();
  }

  const update = async () => {
    try {
      const formData = new FormData();
      if (credentialFile.file) {
        formData.append('credential', credentialFile.file);
      }
      formData.append('services', JSON.stringify(services));
      context.loading.dispatch({type: 'ON'});
      await fetch(`${process.env.HOST}/vendors/${id}/services-credential`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }});
      context.loading.dispatch({type: 'OFF'});
    } catch (err) {
      context.loading.dispatch({type: 'OFF'});
    }
  }

  return (
    <main>

      <section className="pt-3 pb-2 px-2">

        <Back text="Settings"/>

        <h1 className="text-2xl mt-3">Services & credential</h1>

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
                        <h4 className="text-gray text-start font-semibold w-10/12">{service.name}</h4>
                        <button onClick={() => removeService(service)}>
                          <Image className="w-1 h-1" src="/cancel.svg" alt="cancel" width={11} height={8}/>
                        </button>
                      </div>
                    )
                  })}
      
                </section>
              )
            }
          })()}

          <section id="credential" className="mt-2">
            <h4>Credential</h4>

            <div className="relative flex flex-col items-center bg-input-bg border-[1px] border-light-gray rounded-md py-3 mt-1">
              <div className="absolute top-0 left-0 z-10 w-full h-full flex justify-center items-center flex-col">
                {(() => {
                  if (credentialFile) {
                    return (
                      <>
                      <button onClick={triggerUpload} className="text-gray mt-[.5em] text-sm">Click here to change</button>
                      <a href={credentialFile.url} target="_blank" className="text-sm mt-[1.5em] text-gray font-semibold">View credential</a>
                      </>
                    );
                  } else {
                    return <button onClick={triggerUpload} className="text-gray mt-[.5em] text-sm">Click here to upload</button>;
                  }
                })()}
              </div>
              <input onChange={upload} ref={credential} className="opacity-0" type="file"/>
            </div>
          </section>
          {/* #credential */}

          <button onClick={update} className="button !mt-3">Proceed</button>

        </div>
        {/* #services-container */}

      </section>

      <section ref={listServicesContainer} id="services-selection" className="fixed top-0 h-screen w-screen hidden overflow-y-scroll z-10">

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
                  <h4 className="text-gray text-start font-semibold w-10/12">{service.name}</h4>
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