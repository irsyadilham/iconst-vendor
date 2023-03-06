import type { Job } from '../types/job';

export const jobStatus = (job: Job) => {
  const userId = localStorage.getItem('user_id');
  const vendor = job?.vendors.find(val => {
    return val.vendor.user_id === parseInt(userId!);
  });
  if (job.status.name === 'Request' || job.status.name === 'Quotation ready' && !vendor?.approved) {
    return {
      text: 'Quotation in review',
      color: '#353CE4'
    };
  } else if (job.status.name === 'Quotation ready' && vendor?.approved) {
    return {
      text: 'Quotation approved',
      color: '#22C0CA'
    };
  } else if (job.status.name === 'Accepted' && vendor?.approved && vendor?.choosen) {
    return {
      text: 'Client accepted',
      color: '#228ECA'
    };
  } else if (job.status.name === 'Completed' && job.vendor_completed && job.client_completed && vendor?.choosen) {
    return {
      text: 'Completed',
      color: '#49D380'
    };
  }
  return {
    text: 'Rejected',
    color: '#E9AC10'
  };
}