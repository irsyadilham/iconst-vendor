import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { Job } from '../types/job';
import { jobStatus } from '../functions/job-status';

type args = {
  job: Job;
  accepted?: boolean;
}

const JobCard: NextPage<args> = ({job, accepted = false}) => {

  return (
    <section className="bg-white p-[1.5em] shadow-normal rounded-xl">

      <div className="flex justify-between items-center">
        <p className="text-[.8rem]">{job.date}</p>
        {(() => {
          if (accepted) {
            return <p style={{background: jobStatus(job).color}} className="status">{jobStatus(job).text}</p>
          }
        })()}
      </div>

      <h3 className="mt-[.3em] text-primary">{job.title}</h3>

      <div className="flex mt-[.5em]">
        <Image className="w-1" src="/service.svg" alt="service" width={18} height={16}/>
        <p className="ml-[.5em] text-sm">{job.service.name}</p>
      </div>

      <div id="wrapper" className="flex justify-between items-end mt-1">

        <div className={accepted ? 'opacity-0' : ''}>
          <h3 className="text-lg text-primary">{job.expires_in} days</h3>
          <p className="text-xs">Request expires in</p>
        </div>

        <Link href={accepted ? `/jobs-accepted/${job.id}` : `/jobs/${job.id}`}>
          <button className="bg-primary text-sm font-semibold rounded-md text-white px-1 py-[.7em]">View details</button>
        </Link>

      </div>

    </section>
  );
}

export default JobCard;