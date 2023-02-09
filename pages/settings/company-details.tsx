import { useRef, useEffect } from 'react';
import Back from '../../components/back';
import { CompanyDetails } from '../../interfaces/profile-interface';

export default function CompanyAddress() {
  const companyName = useRef<HTMLInputElement>(null);
  const line1 = useRef<HTMLInputElement>(null);
  const line2 = useRef<HTMLInputElement>(null);
  const postcode = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);
  const district = useRef<HTMLInputElement>(null);
  const state = useRef<HTMLInputElement>(null);

  const getCompanyDetails = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      const get = await fetch(`${process.env.HOST}/vendors/${userId}`, {
        headers: { 'Accept': 'application/json' }
      });
      const res: CompanyDetails = await get.json();
      companyName.current.value = res.company_name;
      const address = res.address;
      line1.current.value = address.line_1;
      line2.current.value = address.line_2;
      postcode.current.value = address.postcode.toString();
      city.current.value = address.city;
      district.current.value = address.district;
      state.current.value = address.state;
    } catch (err) {
      
    }
  }

  useEffect(() => {
    getCompanyDetails();
  }, []);

  return (
    <main className="mx-2 pt-3 pb-2">
      <Back text="Settings"/>

      <h2 className="mt-2 text-2xl font-bold">Company details</h2>

      <form className="mt-2">

        <div>
          <label className="label">Company name</label>
          <input ref={companyName} className="input" type="text"/>
        </div>

        <h4 className="mt-2">Company address</h4>

        <div className="mt-1">
          <label className="label">Line 1</label>
          <input ref={line1} className="input" type="text"/>
        </div>
        <div className="mt-1">
          <label className="label">Line 2</label>
          <input ref={line2} className="input" type="text"/>
        </div>
        <div className="mt-1">
          <label className="label">Postcode</label>
          <input ref={postcode} className="input" type="number"/>
        </div>
        <div className="mt-1">
          <label className="label">City</label>
          <input ref={city} className="input" type="text"/>
        </div>
        <div className="mt-1">
          <label className="label">District</label>
          <input ref={district} className="input" type="text"/>
        </div>
        <div className="mt-1">
          <label className="label">State</label>
          <input ref={state} className="input" type="text"/>
        </div>
        <button className="button !mt-2">Update</button>
      </form>
    </main>
  );
}