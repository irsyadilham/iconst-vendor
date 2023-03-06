import type { NextPage } from 'next';
import { useEffect, useContext, useState } from 'react';
import AppContext from '../../context/app';
import Home from '../../components/home';
import Tab from '../../components/tab';
import { get } from '../../functions/fetch';
import type { Job } from '../../types/job';
import JobCard from '../../components/job-card';

const Jobs: NextPage = () => {

  const context = useContext(AppContext);
  const [jobs, setJobs] = useState<Job[]>([]);

  const getJobs = async () => {
    try {
      context?.loading.dispatch({type: 'ON'});
      const jobs: Job[] = await get('/jobs-vendor');
      setJobs(jobs);
      context?.loading.dispatch({type: 'OFF'});
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to retrieve jobs, please try again later');
    }
  }

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <Home>
      <Tab page="jobs"/>

      <section id="list-container" className="mt-2 pb-2 space-y-[1.5em]">
        
        {(() => {
          if (jobs.length > 0) {
            return jobs.map((job, i) => {
              return <JobCard job={job} key={i} />
            })
          } else {
            return <p className="text-center mt-5">No job available</p>;
          }
        })()}
        
      </section>
      {/* #list-container */}
    </Home>
  );
}

export default Jobs;