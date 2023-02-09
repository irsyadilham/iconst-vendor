import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Back from '../../components/back';
import Profile from '../../interfaces/profile-interface';

export default function CompanyDetails() {
  const router = useRouter();
  const name = useRef<HTMLInputElement>(null);
  const line1 = useRef<HTMLInputElement>(null);
  const line2 = useRef<HTMLInputElement>(null);
  const postcode = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);
  const district = useRef<HTMLInputElement>(null);
  const state = useRef<HTMLInputElement>(null);

  const proceed = (e: React.FormEvent) => {
    e.preventDefault();
    const register: Profile = JSON.parse(localStorage.getItem('register'));
    if (register.companyDetails) {
      register.companyDetails.address = {
        line_1: line1.current.value,
        line_2: line2.current.value,
        postcode: parseInt(postcode.current.value),
        city: city.current.value,
        district: district.current.value,
        state: state.current.value
      };
      register.companyDetails.company_name = name.current.value;
    } else {
      register.companyDetails = {
        company_name: name.current.value,
        address: {
          line_1: line1.current.value,
          line_2: line2.current.value,
          postcode: parseInt(postcode.current.value),
          city: city.current.value,
          district: district.current.value,
          state: state.current.value
        }
      }
    }
    localStorage.setItem('register', JSON.stringify(register));
    router.push('/register/services');
  }

  useEffect(() => {
    const register: Profile = JSON.parse(localStorage.getItem('register'));
    if (register.companyDetails) {
      const compDetails = register.companyDetails;
      name.current.value = compDetails.company_name;
      line1.current.value = compDetails.address.line_1;
      line2.current.value = compDetails.address.line_2;
      postcode.current.value = compDetails.address.postcode.toString();
      city.current.value = compDetails.address.city;
      district.current.value = compDetails.address.district;
      state.current.value = compDetails.address.state;
    }
  }, []);

  return (
    <main className="pt-3 pb-2 px-2">

      <Back text="Personal details"/>

      <h1 className="text-2xl mt-3">Register account</h1>

      <form onSubmit={proceed} className="mt-1">

        <h2 className="mt-2">Company details</h2>

        <div className="mt-1">
          <label className="label">Company name</label>
          <input required className="input" ref={name} type="text"/>
        </div>
{/* 
        <div>
          <label className="label">Credential upload</label>
          <p className="mt-1 text-sm">CIDB or Trading license certificate</p>
          
          <div className="relative flex flex-col items-center bg-input-bg border-[1px] border-light-gray rounded-md py-3 mt-1">
            <Image src="/upload.svg" alt="upload" width={50} height={53}/>
            <h4 className="text-gray font-semibold mt-1">Click here to upload</h4>
            <input ref={credential} className="absolute bg-pink-200 h-full top-0 opacity-0" type="file"/>
          </div>
        </div> */}

        <section id="address">
          <h2 className="mt-2">Company address</h2>

          <div className="mt-1">
            <label className="label">Line 1</label>
            <input required className="input" ref={line1} type="text"/>
          </div>

          <div className="mt-1">
            <label className="label">Line 2</label>
            <input className="input" ref={line2} type="text"/>
          </div>

          <div className="mt-1">
            <label className="label">Postcode</label>
            <input required className="input" ref={postcode} type="number"/>
          </div>

          <div className="mt-1">
            <label className="label">City</label>
            <input required className="input" ref={city} type="text"/>
          </div>

          <div className="mt-1">
            <label className="label">District</label>
            <input required className="input" ref={district} type="text"/>
          </div>

          <div className="mt-1">
            <label className="label">State</label>
            <input required className="input" ref={state} type="text"/>
          </div>

        </section>
        {/* #address */}

        <button className="button !mt-2" type="submit">Proceed</button>

      </form>

    </main>
  );
}