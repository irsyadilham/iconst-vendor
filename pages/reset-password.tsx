import React, { useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import AppContext from '../context/app';

export default function ResetPassword() {
  const context = useContext(AppContext);
  const router = useRouter();
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = router.query.user_id;
    if (password.current.value !== confirmPassword.current.value) {
      alert('Password not match, make sure confirm password same as password');
      return;
    }
    try {
      const data = { password: password.current.value };
      context.loading.dispatch({type: 'ON'});
      await fetch(`${process.env.HOST}/reset-password/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      });
      context.loading.dispatch({type: 'OFF'});
      alert('Successfully reset password');
      window.close();
    } catch (err) {
      context.loading.dispatch({type: 'OFF'});
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