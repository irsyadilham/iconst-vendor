import { useRef } from 'react';
import Back from '../components/back';

export default function ForgotPassword() {
  const emailContactNo = useRef();

  return (
    <main>
      <section className="pt-3 px-2 h-screen">

        <Back text="Login"/>

        <h1 className="text-3xl mt-3">Forgot password</h1>

        <form className="mt-2 space-y-2">

          <div>
            <label className="label">Email or Contact no</label>
            <input className="input" ref={emailContactNo} type="text"/>
          </div>

          <button className="button" type="submit">Retrieve password</button>

        </form>

      </section>
    </main>
  );
}