import type { NextPage } from 'next';
import { useEffect, useContext, useState } from 'react';
import AppContext from '../../context/app';
import type { Job } from '../../types/job';
import { get } from '../../functions/fetch';

import Home from '../../components/home';
import Tab from '../../components/tab';
import JobCard from '../../components/job-card';

const JobsAccepted: NextPage = () => {

  const context = useContext(AppContext);
  const [jobsAccepted, setJobsAccepted] = useState<Job[]>([]);

  const getJobAccepted = async () => {
    try {
      context?.loading.dispatch({type: 'ON'});
      const jobs: Job[] = await get('/vendor-jobs-accepted');
      setJobsAccepted(jobs);
      context?.loading.dispatch({type: 'OFF'});
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to get accepted jobs, please refresh page');
    }
  }

  useEffect(() => {
    getJobAccepted();
  }, []);

  return (
    <Home>
      <Tab page="jobs accepted"/>

      <section id="list-container" className="mt-2 pb-2 space-y-[1.3em]">

        {(() => {
          if (jobsAccepted.length > 0) {
            return jobsAccepted.map((job, i) => {
              return <JobCard key={i} job={job} accepted={true} />;
            })
          } else {
            return <p className="text-center mt-5">No job accepted</p>;
          }
        })()}

      </section>
      {/* #list-container */}
    </Home>
  );
}

export default JobsAccepted;