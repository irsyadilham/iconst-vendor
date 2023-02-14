import React, { useRef, useEffect, useContext, useState } from 'react';
import Back from '../../components/back';
import { CompanyDetails, Address } from '../../interfaces/profile-interface';
import AppContext from '../../context/app';
import { get, put } from '../../functions/fetch';

interface data {
  company_name: string;
  address: Address;
}

export default function CompanyAddress() {

  const [id, setId] = useState<number>(0);
  const context = useContext(AppContext);
  const companyName = useRef<HTMLInputElement>(null);
  const line1 = useRef<HTMLInputElement>(null);
  const line2 = useRef<HTMLInputElement>(null);
  const postcode = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);
  const district = useRef<HTMLInputElement>(null);
  const state = useRef<HTMLSelectElement>(null);

  const getCompanyDetails = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      context.loading.dispatch({type: 'ON'});
      const res: CompanyDetails = await get(`/vendors/user/${userId}`);
      context.loading.dispatch({type: 'OFF'});
      setId(res.id);
      companyName.current.value = res.company_name;
      const address = res.address;
      line1.current.value = address.line_1;
      line2.current.value = address.line_2;
      postcode.current.value = address.postcode.toString();
      city.current.value = address.city;
      district.current.value = address.district;
      state.current.value = address.state;
    } catch (err) {
      context.loading.dispatch({type: 'OFF'});
    }
  }

  useEffect(() => {
    getCompanyDetails();
  }, []);

  const update = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: data = {
      company_name: companyName.current.value,
      address: {
        line_1: line1.current.value,
        line_2: line2.current.value,
        postcode: parseInt(postcode.current.value),
        city: city.current.value,
        district: district.current.value,
        state: state.current.value,
      }
    }
    try {
      context.loading.dispatch({type: 'ON'});
      await put(`/vendors/${id}`, data);
      context.loading.dispatch({type: 'OFF'});
    } catch (err) {
      context.loading.dispatch({type: 'OFF'});
      console.error(err);
    }
  }

  return (
    <main className="mx-2 pt-3 pb-2">
      <Back text="Settings"/>

      <h2 className="mt-2 text-2xl font-bold">Company details</h2>

      <form onSubmit={update} className="mt-2">

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
          <select defaultValue="" className="select" ref={state}>
            <option value="">Select state</option>
            <option value="JHR">Johor</option>
            <option value="KDH">Kedah</option>
            <option value="KTN">Kelantan</option>
            <option value="KUL">Kuala Lumpur</option>
            <option value="LBN">Labuan</option>
            <option value="MLK">Melaka</option>
            <option value="NSN">Negeri Sembilan</option>
            <option value="PHG">Pahang</option>
            <option value="PJY">Putrajaya</option>
            <option value="PLS">Perlis</option>
            <option value="PNG">Pulau Pinang</option>
            <option value="PRK">Perak</option>
            <option value="SBH">Sabah</option>
            <option value="SGR">Selangor</option>
            <option value="SRW">Sarawak</option>
            <option value="TRG">Terengganu</option>
          </select>
        </div>
        <button className="button !mt-2">Update</button>
      </form>
    </main>
  );
}