import { Suspense, lazy, useEffect } from 'react';
import Nav from '../components/Nav';
import { Fallback } from '../App';

const Footer = lazy(() => import('../components/Footer'));

function Index() {
  useEffect(() => {
    document.title = 'edukit — Home';
  }, []);

  return (
    <div>
      <Nav />
      <header
        className="md:pb-24 md:pt-16 md:px-24 p-8 gap-1 lg:gap-3 flex flex-col justify-start"
        id="about"
      >
        <h1 className="mb-4 text-5xl lg:text-7xl font-semibold leading-none tracking-tight w-full lg:w-4/5">
          Edukit improves the tutor and tutee experience through quality tools!
        </h1>
        <p className="text-lg lg:text-xl font-normal w-full md:w-4/5 lg:w-2/5">
          We build tools designed to supplement your existing workflows, such as
          matching tutors to tutees.
        </p>
      </header>
      <article className="md:p-24 p-8 py-16 bg-yellow-300 flex flex-col justify-start gap-1 lg:gap-3">
        <h2 className="mb-4 text-5xl lg:text-6xl font-semibold leading-none tracking-tight w-full sm:w-2/5">
          Get started quickly
        </h2>
        <p className="text-lg lg:text-xl font-normal w-full md:w-4/5 lg:w-2/5">
          Our matching tool automatically matches tutors to tutees based on
          common parameters such as subjects, education level and gender.
        </p>
        <a
          href="http://edukit-matching-tool.better.sg/"
          className="hover:underline hover:cursor-pointer text-lg font-semibold leading-7 tracking-tight"
        >
          Try it out →
        </a>
      </article>
      <section className="p-8 md:p-24 grid md:grid-cols-2 grid-cols-1 md:gap-14">
        <div>
          <h1 className="mb-4 text-4xl lg:text-4xl font-semibold leading-none tracking-tight">
            In the subsidised tuition space and looking for other solutions?
          </h1>
        </div>
        <article className="self-center">
          <div>
            <p className="font-normal text-xl text-gray-600 dark:text-gray-500 mb-6">
              We’ll simplify your work processes. Fill up the form below and
              let’s have a no obligations discovery call to see how we can help
              you, for free!
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdgXIM_eCJJdvaZsS_25s_ZzxlI3j7bQ8oe9hZaj3IegShiEA/viewform"
              className="inline-flex items-center font-medium text-yellow-500 dark:text-yellow-500 hover:underline"
            >
              Get in touch
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                aria-hidden="true"
                viewBox="0 0 14 10"
                className="w-4 h-4 ml-2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                ></path>
              </svg>
            </a>
          </div>
        </article>
      </section>
      <section className="md:p-24 p-8 grid md:grid-cols-3 grid-cols-1 md:gap-14 gap-8">
        <article className="flex flex-col justify-start gap-3">
          <img src="/illustration__wrench.png" className="w-20 h-20"></img>
          <h3 className="text-3xl font-normal">Adopt anywhere</h3>
          <p className="text-lg">
            No complex installation required. Simply plug and play.
          </p>
        </article>
        <article className="flex flex-col justify-start gap-3">
          <img src="/illustration__shield.png" className="w-20 h-20"></img>
          <h3 className="text-3xl font-normal">Privacy focused</h3>
          <p className="text-lg">
            We don’t collect or store any of your data as all information is
            processed on your device.
          </p>
        </article>
        <article className="flex flex-col justify-start gap-3">
          <img src="/illustration__clock.png" className="w-20 h-20"></img>
          <h3 className="text-3xl font-normal">Time saving</h3>
          <p className="text-lg">
            Our solution does the matching so you don’t have to.
          </p>
        </article>
      </section>
      <Suspense fallback={<Fallback />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default Index;
