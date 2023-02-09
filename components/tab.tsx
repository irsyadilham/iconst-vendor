import Link from 'next/link';
import Hammer from '../public/hammer';
import Clipboard from '../public/clipboard';

interface args {
  page: string;
}

export default function Tab({page}: args) {

  return (
    <main className="flex justify-between w-full">
      <Link href="/jobs" className={`flex items-center ${page === 'jobs' ? 'bg-primary' : 'bg-white'} shadow-normal w-[47%] box-border px-1 py-[.8em] justify-center rounded-md`}>
        <Hammer active={page === 'jobs' ? true : false}/>
        <p className={`ml-[.4em] ${page === 'jobs' ? 'text-white' : 'text-gray'} text-sm`}>Jobs</p>
      </Link>
      <Link href="/jobs-accepted" className={`flex items-center shadow-normal w-[47%] box-border px-1 py-[.8em] justify-center rounded-md ${page === 'jobs accepted' ? 'bg-primary' : 'bg-white'}`}>
        <Clipboard active={page === 'jobs accepted' ? true : false}/>
        <p className={`ml-[.4em] ${page === 'jobs accepted' ? 'text-white' : 'text-gray'} text-sm`}>Job accepted</p>
      </Link>
    </main>
  );
}