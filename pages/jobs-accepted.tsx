import Home from '../components/home';
import Tab from '../components/tab';

export default function JobsAccepted() {
  return (
    <Home>
      <Tab page="jobs accepted"/>

      <section id="list-container" className="mt-[1.5em]">

        <p className="text-center mt-5">No job accepted</p>

      </section>
      {/* #list-container */}
    </Home>
  );
}