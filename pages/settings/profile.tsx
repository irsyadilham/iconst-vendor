import React, { useRef, useContext, useEffect } from 'react';
import Back from '../../components/back';
import AppContext from '../../context/app';
import { PersonalDetails } from '../../interfaces/profile-interface';
import { get, put } from '../../functions/fetch';

export default function Profile() {
  const context = useContext(AppContext);
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const contactNo = useRef<HTMLInputElement>(null);

  const getProfile = async () => {
    try {
      context.loading.dispatch({type: 'ON'});
      const userId = localStorage.getItem('user_id');
      const data: PersonalDetails = await get(`/users/${userId}`);
      name.current.value = data.name;
      email.current.value = data.email;
      contactNo.current.value = data.contact_no;
      context.loading.dispatch({type: 'OFF'});
    } catch (err) {
      console.error(err);
      context.loading.dispatch({type: 'OFF'});
    }
  }

  const update = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      context.loading.dispatch({type: 'ON'});
      const data: PersonalDetails = {
        name: name.current.value,
        email: email.current.value,
        contact_no: contactNo.current.value,
      };
      const userId = localStorage.getItem('user_id');
      await put(`/users/${userId}`, data);
      context.loading.dispatch({type: 'OFF'});
    } catch (err) {
      context.loading.dispatch({type: 'OFF'});
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <main className="mx-2 pt-3 pb-2">
      <Back text="Settings"/>
      <h2 className="mt-2 text-2xl font-bold">Profile</h2>

      <form onSubmit={update} className="space-y-[1.5em] mt-2">
        <div>
          <label className="label">Name</label>
          <input ref={name} className="input" type="text"/>
        </div>
        <div>
          <label className="label">Email</label>
          <input ref={email} className="input" type="email"/>
        </div>
        <div>
          <label className="label">Contact no</label>
          <input ref={contactNo} className="input" type="text" inputMode="tel"/>
        </div>
        <button className="button !mt-2">Update</button>
      </form>
    </main>
  );
}