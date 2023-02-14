import React, { useRef, useEffect, useState, useContext } from 'react';
import Profile from '../../interfaces/profile-interface';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Back from '../../components/back';
import AppContext from '../../context/app';

interface File {
  file: any;
  url: string;
}

export default function Credential() {
  const context = useContext(AppContext);
  const router = useRouter();
  const credential = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  interface data extends Profile {
    password: string;
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    const register: data = JSON.parse(localStorage.getItem('register'));
    if (file) {
      formData.append('credential', file.file);
    }
    formData.append('personal_details', JSON.stringify(register.personalDetails));
    formData.append('company_details', JSON.stringify(register.companyDetails));
    formData.append('password', register.password);
    try {
      context.loading.dispatch({type: 'ON'});
      await fetch(`${process.env.HOST}/vendors`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      localStorage.removeItem('register');
      router.push('/login');
      context.loading.dispatch({type: 'OFF'});
    }catch(err) {
      console.error(err);
      context.loading.dispatch({type: 'OFF'});
    }
  }

  const upload = () => {
    if (credential.current.files.length > 0) {
      const file = credential.current.files[0];
      setFile({
        file,
        url: URL.createObjectURL(file)
      })
    }
  }

  const update = () => {
    credential.current.click();
  }

  useEffect(() => {
  }, []);

  return (
    <main className="pt-3 pb-2 px-2">

      <Back text="Personal details"/>

      <h1 className="text-2xl mt-3">Register account</h1>

      <form onSubmit={submit} className="mt-1">

        <div>
          <label className="label">Credential upload (optional)</label>
          <p className="mt-1 text-sm">CIDB or Trading license certificate</p>
          
          {(() => {
            if (file) {
              return (
                <div className="relative flex flex-col items-center bg-input-bg border-[1px] border-light-gray rounded-md py-3 mt-1">
                  <div className="absolute top-0 left-0 z-10 w-full h-full flex justify-center items-center flex-col">
                    <h4 className="text-gray">{file.file.name}</h4>
                    <button onClick={update} className="text-gray mt-[.5em] text-sm">Click to change</button>
                    <a href={file.url} target="_blank" className="text-sm mt-[.5em] text-gray font-semibold">Download</a>
                  </div>
                  <input onChange={upload} ref={credential} className="opacity-0" type="file"/>
                </div>
              );
            } else {
              return (
                <div className="relative flex flex-col items-center bg-input-bg border-[1px] border-light-gray rounded-md py-3 mt-1">
                  <Image src="/upload.svg" alt="upload" width={50} height={53}/>
                  <h4 className="text-gray font-semibold mt-1">Click here to upload</h4>
                  <input onChange={upload} ref={credential} className="absolute h-full top-0 opacity-0" type="file"/>
                </div>
              );
            }
          })()}
          
        </div>

        <button className="button !mt-2" type="submit">Submit</button>

      </form>

    </main>
  );
}