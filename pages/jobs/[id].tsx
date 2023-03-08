import type { NextPage } from 'next';
import { useEffect, useState, useRef, useContext, FormEvent } from 'react';
import AppContext from '../../context/app';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Back from '../../components/back';
import type { Job } from '../../types/job';
import type { Vendor } from '../../types/vendor';

import { get, postFormData, put } from '../../functions/fetch';
import { gsap } from 'gsap';

type File = {
  file: any;
  url: string;
}

const JobDetails: NextPage = () => {

  const router = useRouter();
  const context = useContext(AppContext);
  const [job, setJob] = useState<Job | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [vendorStatus, setVendorStatus] = useState<boolean>(false);

  const quotationFormContainer = useRef<HTMLDivElement>(null);
  const quotationUpload = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);

  const getJobDetails = async () => {
    try {
      context?.loading.dispatch({type: 'ON'});
      const job: Job = await get(`/jobs/${router.query.id}`);
      context?.loading.dispatch({type: 'OFF'});
      setJob(job);
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to get job details, please try again later');
    }
  }

  const getVendorStatus = async () => {
    try {
      const vendor: Vendor = await get(`/vendors/user/${localStorage.getItem('user_id')}`);
      setVendorStatus(vendor.airtime_status.active);
    } catch (err: any) {

    }
  }

  const clearNotification = async () => {
    try {
      if (router.query.notification === 'true') {
        await put(`/notifications/${router.query.notification_id}/read`, {});
      }
    } catch (err: any) {
      
    }
  }

  useEffect(() => {
    if (router.isReady) {
      getJobDetails();
      getVendorStatus();
      clearNotification();
    }
  }, [router.isReady]);


  const openQuotationSubmission = () => {
    quotationFormContainer.current?.classList.remove('hidden');
    gsap.to(quotationFormContainer.current, { y: 0, ease: 'power3.out' });
  }

  const closeQuotationSubmission = () => {
    gsap.to(quotationFormContainer.current, { y: '100%', ease: 'power3.out', onComplete() {
      quotationFormContainer.current?.classList.add('hidden');
    }});
  }

  const upload = () => {
    if (quotationUpload.current?.files!.length! > 0) {
      const file = quotationUpload.current?.files![0];
      setFile({
        file,
        url: URL.createObjectURL(file!)
      })
    }
  }

  const update = () => {
    quotationUpload.current?.click();
  }

  const fileType = () => {
    const fileUrl = job?.supporting_documents[0].file_url;
    const regex = /(pdf|jpe?g|png)$/i;
    const match = fileUrl?.match(regex);
    if (match) {
      const fileExt = match![0].toLowerCase();
      switch(fileExt) {
        case 'pdf':
          return '/file_icons/pdf.svg';
        case 'jpg':
        case 'jpeg':
          return '/file_icons/jpg.svg';
        case 'png':
          return '/file_icons/png.svg';
      }
    }
  }

  const submitQuotation = async (e: FormEvent) => {
    e.preventDefault();
    if (!file?.file) {
      alert('Please upload quotation');
      return;
    }
    try {
      const data = new FormData();
      data.append('quotation', file.file);
      data.append('price', price.current!.value);
      context?.loading.dispatch({type: 'ON'});
      const res = await postFormData(`/jobs/${router.query.id}/quotation-submit?active=${vendorStatus}`, data);
      context?.loading.dispatch({type: 'OFF'});
      if (vendorStatus) {
        alert('Quotation had been submitted');
        router.push('/jobs-accepted');
        return;
      }
      window.open(`${process.env.TOYYIBPAY_URL}/${res.billcode}`, '_self');
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to submit quotation, please try again later');
    }
  }

  return (
    <main className="container mt-3 px-2 pb-2">
      <Back text="Back"/>

      <div className="flex items-center justify-between mt-2">
        <p className="text-sm">{job?.date}</p>
      </div>

      <h1 className="text-xl text-primary mt-1">{job?.title}</h1>

      <div className="flex mt-[.7em]">
        <Image src="/service.svg" alt="service" width={18} height={16}/>
        <h4 className="font-semibold text-gray ml-[.5em]">{job?.service.name}</h4>
      </div>

      <p className="mt-[.6em]">{job?.description}</p>

      <div id="location" className="mt-[1.5em]">
        <h4 className="text-sm text-gray">Location</h4>
        <p className="mt-[.5em]">{job?.location?.line_1}, {job?.location?.postcode}{job?.location?.city ? `, ${job.location.city}` : ''}, {job?.location?.district}, {job?.location?.state}</p>
      </div>
      {/* #location */}

      {(() => {
        if (job?.supporting_documents.length! > 0) {
          return (
            <div id="supporting-documents" className="mt-[1.5em] inline-block">
              <h4 className="text-gray text-sm">Supporting document</h4>
              <a href={`${process.env.HOST}/${job?.supporting_documents[0].file_url}`} target="_blank" className="mt-1 border-2 p-2 border-neutral-100 flex flex-col items-center justify-center rounded-lg">
                <Image className="w-3" src={fileType()!} alt="file" width={100} height={100}/>
                <p className="text-sm font-semibold mt-[.5em] text-gray">Click here to view</p>
                <p></p>
              </a>
            </div>
          );
        }
      })()}

      <p className="text-xs mt-2">For inactive user the fee for each quotation submission is RM50, activate your account now for unlimited submission</p>

      <button onClick={openQuotationSubmission} className="button mt-1">Submit quotation</button>

      <section ref={quotationFormContainer} className="fixed left-0 top-0 w-full h-screen bg-white p-2 translate-y-[100%] hidden">

        <div className="flex justify-between">
          <h2 className="text-xl text-primary">Quotation submission</h2>
          <button onClick={closeQuotationSubmission}>
            <Image src="/close.svg" alt="cancel" width={27} height={27}/>
          </button>
        </div>

        <form onSubmit={submitQuotation} className="mt-2">

          <div>
            <label className="label">Price</label>
            <input required ref={price} type="number" className="input" />
          </div>

          <div className="mt-[1.5em]">
            <label className="label">Quotation upload</label>
            
            {(() => {
              if (file) {
                return (
                  <div className="relative flex flex-col items-center bg-input-bg border-[1px] border-light-gray rounded-md py-3 mt-1">
                    <div className="absolute top-0 left-0 z-10 w-full h-full flex justify-center items-center flex-col">
                      <h4 className="text-gray">{file.file.name}</h4>
                      <button type="button" onClick={update} className="text-gray mt-[.5em] text-sm">Click to change</button>
                      <a href={file.url} target="_blank" className="text-sm mt-[.5em] text-gray font-semibold">Download</a>
                    </div>
                    <input onChange={upload} ref={quotationUpload} className="opacity-0" type="file"/>
                  </div>
                );
              } else {
                return (
                  <div className="relative flex flex-col items-center bg-input-bg border-[1px] border-light-gray rounded-md py-3 mt-1">
                    <Image src="/upload.svg" alt="upload" width={50} height={53}/>
                    <h4 className="text-gray font-semibold mt-1">Click here to upload</h4>
                    <input onChange={upload} ref={quotationUpload} className="absolute h-full top-0 opacity-0" type="file"/>
                  </div>
                );
              }
            })()}
            
          </div>

          <button className="button mt-2">{vendorStatus ? 'Submit' : 'Pay RM50 & submit quotation'}</button>

        </form>

      </section>

    </main>
  );
}

export default JobDetails;