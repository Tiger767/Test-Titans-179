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


import useJaneHopkins from '../hooks/useJaneHopkins';
import useBavaria from '../hooks/useBavaria';
import useFDA from '../hooks/useFDA';

// Permissions
// https://www.vendia.com/docs/share/fine-grained-data-permissions
// https://www.vendia.com/docs/share/rbac
// CLient SDK https://www.vendia.com/docs/share/vendia-client-sdk

function Home() {
  const {entities} = useBavaria();

  const addPatient = async() => {
    console.log(entities)
    const addPatientResponse = await entities.patient.add({
      name: "Billy3"
    }, {
      aclInput: {
        acl: [
          {
            principal: {
              nodes: ["*"]
            },
            operations: [ ]
          }
        ]
      }
    });
    console.log(addPatientResponse);
  };

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
        <button onClick={() => {addPatient();}}>Add Patient</button>
        <HeroHome />
        <FeaturesBlocks />
        <FeaturesZigZag />
        <Testimonials />
        <Newsletter />
      </main>

      <Banner />

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Home;