import { Card } from 'flowbite-react';
import Nav from '../components/Nav';
import { Suspense, lazy, useEffect } from 'react';
import { Fallback } from '../App';

const Footer = lazy(() => import('../components/Footer'));

function About() {
  useEffect(() => {
    document.title = 'edukit — About Us';
  }, []);
  return (
    <div>
      <Nav />
      <header className="md:pb-24 md:pt-16 md:px-24 p-8 gap-1 lg:gap-3 flex flex-col justify-start items-center text-center bg-yellow-300">
        <h1 className="mb-4 text-5xl lg:text-7xl font-semibold leading-none tracking-tight">
          Our Team
        </h1>
        <p className="text-lg lg:text-xl font-normal w-full">
          Meet the dedicated team of volunteers who make edukit possible.
        </p>
      </header>
      <section className="md:py-16 md:px-32 p-8 gap-6 lg:gap-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  justify-start">
        <Card imgSrc="Anto-ProfilePic.jpg">
          <div>
            <h5 className="text-2xl mb-1 font-bold text-gray-900 dark:text-white">
              <p>Anto Francis</p>
            </h5>
            <h6 className="text-xl text-gray-900 dark:text-white">
              <p>Project Lead</p>
            </h6>
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Software developer experienced in leading big scale projects
            involving large & diverse teams.
          </p>
          <p>
            <a
              href="https://www.linkedin.com/in/er-anto-ponselvan/"
              className="inline-flex items-center font-medium text-yellow-500 dark:text-yellow-500 hover:underline"
            >
              LinkedIn
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
          </p>
        </Card>
        <Card imgSrc="lee_wei.jpg">
          <div>
            <h5 className="text-2xl mb-1 font-bold text-gray-900 dark:text-white">
              <p>Lee Wei</p>
            </h5>
            <h6 className="text-xl text-gray-900 dark:text-white">
              <p>Product Designer & Super-PM </p>
            </h6>
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <p>The go-to guy for UX/UI, discovery calls and meeting notes.</p>
          </p>
          <p>
            <a
              href="https://www.linkedin.com/in/lee-wei/"
              className="inline-flex items-center font-medium text-yellow-500 dark:text-yellow-500 hover:underline"
            >
              LinkedIn
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
          </p>
        </Card>

        <Card imgSrc="anvay.jpg">
          <div>
            <h5 className="text-2xl mb-1 font-bold text-gray-900 dark:text-white">
              <p>Anvay Mathur</p>
            </h5>
            <h6 className="text-xl text-gray-900 dark:text-white">
              <p>The 10X Full-stack Developer</p>
            </h6>
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <p>A 14-year-old student passionate about programming.</p>
          </p>
          <p>
            <a
              href="https://anvaymathur.com/"
              className="inline-flex items-center font-medium text-yellow-500 dark:text-yellow-500 hover:underline"
            >
              Website
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
          </p>
        </Card>
        <Card imgSrc="berwyn-tan.JPG">
          <div>
            <h5 className="text-2xl mb-1 font-bold text-gray-900 dark:text-white">
              <p>Berwyn Tan</p>
            </h5>
            <h6 className="text-xl text-gray-900 dark:text-white">
              <p>Developer</p>
            </h6>
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <p>
              Software Developer with a sharp mind and keen interest in learning
              new technologies & tools
            </p>
          </p>
          <p>
            <a
              href="#"
              className="inline-flex items-center font-medium text-yellow-500 dark:text-yellow-500 hover:underline"
            >
              LinkedIn
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
          </p>
        </Card>
      </section>
      <div className="px-8 md:px-24">
        <hr className="h-px my-8 bg-gray-400 border-0 dark:bg-gray-600" />
      </div>
      <section className="p-8 md:p-24 grid md:grid-cols-2 grid-cols-1 md:gap-14">
        <div>
          <h1 className="mb-4 text-4xl lg:text-6xl font-semibold leading-none tracking-tight">
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
      <Suspense fallback={<Fallback />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default About;
