import Link from 'next/link';

export default function ThankYou() {
  return (
    <main className="flex items-center justify-center h-screen">

      <section>
        <h2 className="text-xl text-gray text-center">Successfully<br/>purchased coin</h2>
        <Link href="/jobs">
          <button className="button mt-1">Back to home</button>
        </Link>
      </section>

    </main>
  );
}