import React from 'react';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import HeroHome from '../partials/HeroHome';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import FeaturesZigZag from '../partials/FeaturesZigzag';
import Testimonials from '../partials/Testimonials';
import Newsletter from '../partials/Newsletter';
import Banner from '../partials/Banner';
import Footer from '../partials/Footer';


import { addPatient } from '../backend/janeHopkins';
// import useBavaria from '../backend/bavaria';
// import useFDA from '../backend/fDA';

// Permissions
// https://www.vendia.com/docs/share/fine-grained-data-permissions
// https://www.vendia.com/docs/share/rbac
// CLient SDK https://www.vendia.com/docs/share/vendia-client-sdk

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        {/*  Page sections */}
        <section>
          <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <ul className="flex grow justify-center flex-wrap items-center">
                <li>
                  <button onClick={() => {addPatient("Tom");}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Add Patient Tom</button>
                </li>
                <li>
                  <button onClick={() => {addPatient("Billy");}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Add Patient Billy</button>
                </li>
                <li>
                  <button onClick={() => {addPatient();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Add Patient</button>
                </li>
                <li>
                  <button onClick={() => {addPatient();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Add Patient</button>
                </li>
                <li>
                  <button onClick={() => {addPatient();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Add Patient</button>
                </li>
                <li>
                  <button onClick={() => {addPatient();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Add Patient</button>
                </li>
                <li>
                  <button onClick={() => {addPatient();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Add Patient</button>
                </li>
                <li>
                  <button onClick={() => {addPatient();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Add Patient</button>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Banner />

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Home;