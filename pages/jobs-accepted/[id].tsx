import type { NextPage } from 'next';
import { useEffect, useState, useContext } from 'react';
import AppContext from '../../context/app';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { jobStatus } from '../../functions/job-status';
import type { JobVendor } from '../../types/job';

import Back from '../../components/back';
import type { Job } from '../../types/job';

import { get, put } from '../../functions/fetch';

const AcceptedJobDetails: NextPage = () => {

  const router = useRouter();
  const context = useContext(AppContext);
  const [job, setJob] = useState<Job | null>(null);
  const [jobVendor, setJobVendor] = useState<JobVendor>();

  const getJobDetails = async () => {
    try {
      context?.loading.dispatch({type: 'ON'});
      const job: Job = await get(`/jobs/${router.query.id}`);
      context?.loading.dispatch({type: 'OFF'});
      setJob(job);
      const jobVendor = job.vendors.find(val => val.vendor.user_id === parseInt(localStorage.getItem('user_id')!));
      setJobVendor(jobVendor);
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to get job details, please try again later');
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
      clearNotification();
    }
  }, [router.isReady]);

  const fileType = (file: string) => {
    const regex = /(pdf|jpe?g|png)$/i;
    const match = file?.match(regex);
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
    return '/file_icons/pdf.svg';
  }

  const offeredPrice = (): string | undefined => {
    if (job) {
      const jobVendor = job.vendors.find(vendor => vendor.vendor.user_id === parseInt(localStorage.getItem('user_id')!));
      return jobVendor?.price;
    }
  }

  const quotation = (): string => {
    if (job) {
      const jobVendor = job.vendors.find(vendor => vendor.vendor.user_id === parseInt(localStorage.getItem('user_id')!));
      return jobVendor?.quotation_url!;
    }
    return '';
  }

  const whatsapp = (phoneNumber: string): string => {
    const phone = phoneNumber.match(/[^0]\d+/)![0];
    return `https://wa.me/${phone}`;
  }

  const jobCompleted = async () => {
    try {
      context?.loading.dispatch({type: 'ON'});
      const job: Job = await put(`/jobs/${router.query.id}/job-completion`, {side: 'vendor'});
      context?.loading.dispatch({type: 'OFF'});
      setJob(job);
    } catch (err: any) {
      console.error(err);
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to submit job completion, please try again later');
    }
  }

  return (
    <main className="container mt-3 px-2 pb-2">
      <Back text="Back"/>

      <div className="flex items-center justify-between mt-2">
        <p className="text-sm">{job?.date}</p>
        {(() => {
          if (job && job.status.name !== 'Cancelled') {
            return <p style={{background: jobStatus(job).color}} className="status">{jobStatus(job).text}</p>;
          } else {
            return <p style={{background: '#EA2518'}} className="status">Cancelled</p>
          }
        })()}
      </div>

      <h1 className="text-xl text-primary mt-1">{job?.title}</h1>

      <div className="flex mt-[.7em]">
        <Image src="/service.svg" alt="service" width={18} height={16}/>
        <h4 className="font-semibold text-gray ml-[.5em]">{job?.service.name}</h4>
      </div>

      <p className="mt-[.6em]">{job?.description}</p>

      <div className="mt-1">
      <h4 className="text-gray text-sm">Offered price</h4>
        <h2 className="text-xl mt-[.3rem] text-primary">RM{parseFloat(offeredPrice()!).toLocaleString('en-US', {minimumFractionDigits: 2})}</h2>
      </div>

      <div id="location" className="mt-[1.5em]">
        <h4 className="text-sm text-gray">Location</h4>
        <p className="mt-[.5em]">{job?.location?.line_1}, {job?.location?.postcode}{job?.location?.city ? `, ${job.location.city}` : ''}, {job?.location?.district}, {job?.location?.state}</p>
      </div>
      {/* #location */}

      <section className="flex flex-col items-start">
        {(() => {
          if (job?.supporting_documents.length! > 0) {
            return (
              <div id="supporting-documents" className="mt-[1.5em]">
                <h4 className="text-gray text-sm">Supporting document</h4>
                <a href={`${process.env.HOST}/${job?.supporting_documents[0].file_url}`} target="_blank" className="mt-1 border-2 p-2 border-neutral-100 flex flex-col items-center justify-center rounded-lg">
                  <Image className="w-3" src={fileType(job?.supporting_documents[0].file_url!)!} alt="file" width={100} height={100}/>
                  <p className="text-sm font-semibold mt-[.5em] text-gray">Click here to view</p>
                  <p></p>
                </a>
              </div>
            );
          }
        })()}

        <div id="quotation" className="mt-[1.5em]">
          <h4 className="text-gray text-sm">Quotation</h4>
          <a href={`${process.env.HOST}/${quotation()}`} target="_blank" className="mt-1 border-2 p-2 border-neutral-100 flex flex-col items-center justify-center rounded-lg">
            <Image className="w-3" src={fileType(quotation()!)!} alt="file" width={100} height={100}/>
            <p className="text-sm font-semibold mt-[.5em] text-gray">Click here to view</p>
            <p></p>
          </a>
        </div>
      </section>

      {(() => {
        if (job) {
          if (jobStatus(job).text === 'Client accepted' && !job.vendor_completed) {
  
            return (
              <div className="mt-2">
  
                <h4 className="text-gray text-sm mb-1">Client</h4>
  
                <div>
  
                  <div className="flex items-center">
                    <Image src="/worker.svg" alt="vendor" width={19} height={19}/>
                    <h4 className="text-gray ml-[.5em]">Client-{job.client.id}</h4>
                  </div>
  
                  <div className="flex mt-[.5em]">
                    <div className="flex">
                      <Image className="w-1" src="/whatsapp.svg" alt="whatsapp" width={16} height={16}/>
                      <a className="ml-[.5em] font-semibold text-gray text-sm" href={whatsapp(job.client.user.contact_no)} target="_blank">Whatsapp</a>
                    </div>
  
                    <div className="flex ml-[1.5em]">
                      <Image className="w-1" src="/phone.svg" alt="phone" width={12} height={12}/>
                      <a className="ml-[.5em] font-semibold text-gray text-sm" href={`tel:${job.client.user.contact_no}`}>Call</a>
                    </div>
                  </div>
  
                </div>
  
              </div>
            );
          }
        }
      })()}

      {(() => {
        if (jobVendor?.choosen) {
          if (job?.vendor_completed && !job.client_completed && jobVendor?.choosen) {
            return (
              <>
                <h4 className="text-center mt-2 text-primary">Congratulations! job completed</h4>
                <p className="text-center mt-[.5em]">waiting for client to give rating</p>
              </>
            );
          } else if (job?.client_completed && job?.status.name === 'Completed') {
            return (
              <>
                <h4 className="mt-2 text-primary font-semibold">Client has given you</h4>
                <div className="flex space-x-[.7em] mt-[.6em]">
                  {Array(job?.rating).fill('').map((_, i) => {
                    return <Image key={i} src="/star.svg" alt="star" width={15} height={15}/>
                  })}
                </div>
              </>
            );
          } else {
            return <button onClick={jobCompleted} className="button !bg-green-500 mt-2">Completed</button>;
          }
        }
      })()}

    </main>
  );
}

export default AcceptedJobDetails;