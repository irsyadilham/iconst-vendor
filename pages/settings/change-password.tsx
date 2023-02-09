import { useRef } from 'react';
import Back from '../../components/back';

export default function ChangePassword() {
  const password = useRef<HTMLInputElement>(null);
  const newPassword = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  return (
    <main className="mx-2 pt-3 pb-2">
      <Back text="Settings"/>
      <h2 className="mt-2 text-2xl font-bold">Change password</h2>

      <form className="space-y-[1.5em] mt-2">
        <div>
          <label className="label">Password</label>
          <input ref={password} className="input" type="password"/>
        </div>
        <div>
          <label className="label">New password</label>
          <input ref={newPassword} className="input" type="password"/>
        </div>
        <div>
          <label className="label">Confirm password</label>
          <input ref={confirmPassword} className="input" type="password"/>
        </div>
        <button className="button !mt-2">Update</button>
      </form>
    </main>
  );
}