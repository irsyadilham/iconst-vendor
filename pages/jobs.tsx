import Home from '../components/home';
import Tab from '../components/tab';

export default function Jobs() {
  return (
    <Home>
      <Tab page="jobs"/>

      <section id="list-container" className="mt-[1.5em]">
        <p className="text-center mt-5">No job available</p>
      </section>
      {/* #list-container */}
    </Home>
  );
}