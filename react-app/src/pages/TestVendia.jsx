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


import { addPatient, getAllDrugs as getAllDrugsJ } from '../backend/janeHopkins';
import { getParticipants, addBatchDrug, getAllDrugs as getAllDrugsB } from '../backend/bavaria';
import { getEligiblePatients, setPatientReceive, assignDoses, labelDoses, getAllDrugs as getAllDrugsF, shareDoseAssignments } from '../backend/fda';

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
                  <button onClick={() => {addPatient({ name: "Tom" });}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">JH: Add Patient Tom (eligible)</button>
                </li>
                <li>
                  <button onClick={() => {addPatient({ name: "Jill", icdHealthCodes: [{ code: "O05" }]});}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">JH: Add Patient Jill (not eligible)</button>
                </li>
                <li>
                  <button onClick={() => {getEligiblePatients();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">FDA: Get Eligible Patients</button>
                </li>
                <li>
                  <button onClick={() => {getParticipants();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Bavaria: Get Participants</button>
                </li>
                <li>
                  <button onClick={() => {setPatientReceive(true, 0);}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Assgin First Eligible Patient to Placebo</button>
                </li>
                <li>
                  <button onClick={() => {setPatientReceive(false, 1);}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Assgin Second Eligible Patient to Bavaria</button>
                </li>
                <li>
                  <button onClick={() => {addBatchDrug(1, true);}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Add a Batch of Placebo</button>
                </li>
                <li>
                  <button onClick={() => {addBatchDrug(1, false);}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Add a Batch of Bavaria</button>
                </li>
                <li>
                  <button onClick={() => {labelDoses();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Label Unlabeled Drugs with FDA ID</button>
                </li>
                <li>
                  <button onClick={() => {assignDoses(true);}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Assign Unassiged Placebos Equally to all Placebo Assigned Patients</button>
                </li>
                <li>
                  <button onClick={() => {assignDoses(false);}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Assign Unassiged Bavaria Equally to all Bavaria Assigned Patients</button>
                </li>
                <li>
                  <button onClick={() => {getAllDrugsB();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Get all Drugs B</button>
                </li>
                <li>
                  <button onClick={() => {getAllDrugsF();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Get all Drugs F</button>
                </li>
                <li>
                  <button onClick={() => {getAllDrugsJ();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Get all Drugs J</button>
                </li>
                <li>
                  <button onClick={() => {shareDoseAssignments();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Share Assignments</button>
                </li>
                <li>
                  <button onClick={() => { /* fill this */ }} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Button</button>
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