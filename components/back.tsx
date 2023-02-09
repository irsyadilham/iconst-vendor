import Image from 'next/image';
import { useRouter } from 'next/router';

interface args {
  text: string;
}

export default function Back({text}: args) {
  const router = useRouter();

  return (
    <section onClick={() => router.back()} className="flex cursor-pointer">
      <Image src="/back.svg" alt="back" width={39} height={22}/>
      <p className="text-primary text-sm ml-[.8em]">{text}</p>
    </section>
  );
}