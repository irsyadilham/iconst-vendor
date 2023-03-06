import type { NextPage } from 'next';
import { FormEvent, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import AppContext from '../context/app';
import { put } from '../functions/fetch';

const ResetPassword: NextPage = () => {
  const context = useContext(AppContext);
  const router = useRouter();
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const resetPassword = async (e: FormEvent) => {
    e.preventDefault();
    const id = router.query.user_id;
    if (password.current?.value !== confirmPassword.current?.value) {
      alert('Password not match, make sure confirm password same as password');
      return;
    }
    try {
      const data = { password: password.current?.value };
      context?.loading.dispatch({type: 'ON'});
      await put(`/reset-password/${id}`, data);
      context?.loading.dispatch({type: 'OFF'});
      alert('Successfully reset password');
      window.close();
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to reset password, please try again later');
    }
  }

  return (
    <main className="mx-3 mt-3">
      <h1 className="text-2xl">Reset password</h1>

      <form onSubmit={resetPassword} className="mt-2">

        <div>
          <label className="label">New password</label>
          <input ref={password} className="input" type="password" />
        </div>

        <div className="mt-[1.5em]">
          <label className="label">Confirm password</label>
          <input ref={confirmPassword} className="input" type="password" />
        </div>

        <button className="button mt-2">Reset password</button>

      </form>
    </main>
  );
}

export default ResetPassword;