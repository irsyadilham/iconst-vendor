import type { NextPage } from 'next';
import { FormEvent, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Back from '../../components/back';

const Password: NextPage = () => {
  const router = useRouter();
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const proceed = (e: FormEvent) => {
    e.preventDefault();
    if (password.current?.value !== confirmPassword.current?.value) {
      alert('Password not matching, try again');
      return;
    }
    const register = JSON.parse(localStorage.getItem('register')!);
    register.password = password.current?.value;
    localStorage.setItem('register', JSON.stringify(register));
    router.push('/register/company-details')
  }

  useEffect(() => {
    const register = JSON.parse(localStorage.getItem('register')!);
    if (register.password) {
      password.current!.value = register.password;
      confirmPassword.current!.value = register.password;
    }
  }, [])

  return (
    <main className="pt-3 px-2 pb-2">

      <Back text="Services"/>

      <h1 className="text-2xl mt-3">Register account</h1>

      <form onSubmit={proceed} className="mt-2 space-y-2">

        <div>
          <label className="label">Password</label>
          <input required className="input" ref={password} type="password"/>
        </div>

        <div>
          <label className="label">Confirm password</label>
          <input required className="input" ref={confirmPassword} type="password"/>
        </div>

        <button className="button !mt-3" type="submit">Proceed</button>

      </form>

    </main>
  );
}

export default Password;