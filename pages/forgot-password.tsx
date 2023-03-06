import type { NextPage } from 'next';
import { FormEvent, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import Back from '../components/back';
import AppContext from '../context/app';
import { put } from '../functions/fetch';

const ForgotPassword: NextPage = () => {
  const context = useContext(AppContext);
  const router = useRouter();
  const emailContactNo = useRef<HTMLInputElement>(null);

  const requestResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = { email: emailContactNo.current?.value };
      context?.loading.dispatch({type: 'ON'});
      await put('/request-reset-password', data);
      alert('Reset password request had been sent, please check your email. If cannot find in your inbox, check in junk or spam folder');
      router.push('/');
      context?.loading.dispatch({type: 'OFF'});
    } catch (err: any) {
      alert('Failed to change password, please try again later');
      context?.loading.dispatch({type: 'OFF'});
    }
  }

  return (
    <main>
      <section className="pt-3 px-2 h-screen">

        <Back text="Login"/>

        <h1 className="text-3xl mt-3">Forgot password</h1>

        <form onSubmit={requestResetPassword} className="mt-2 space-y-2">

          <div>
            <label className="label">Email</label>
            <input className="input" ref={emailContactNo} type="email"/>
          </div>

          <button className="button" type="submit">Reset password</button>

        </form>

      </section>
    </main>
  );
}

export default ForgotPassword;