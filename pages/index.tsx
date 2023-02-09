import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      router.push('/login');
    } else {
      router.push('/jobs');
    }
  }, []);

  return <main/>;
}
