import React from 'react';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Banner from '../partials/Banner';
import Footer from '../partials/Footer';


import { addPatient, getAllDrugs as getAllDrugsJ, getAllPatients as getAllPatientsJ, getEligiblePatients as getEligiblePatientsJ, sharePatients, addPatientVisit, editPatient, addPatientDrug, removeAllPatients } from '../backend/janeHopkins';
import { getParticipants, addBatchDrug, getAllDrugs as getAllDrugsB, removeAllDrugs } from '../backend/bavaria';
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
                  <button onClick={() => {addPatient({ name: "Rye" });}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">JH: Add Patient Rye (eligible)</button>
                </li>
                <li>
                  <button onClick={() => {addPatient({ name: "Jill", icdHealthCodes: [{ code: "O05" }]});}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">JH: Add Patient Jill (not eligible)</button>
                </li>
                <li>
                  <button onClick={() => {getAllPatientsJ();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">JH: Get all Patients</button>
                </li>
                <li>
                  <button onClick={() => {getAllPatientsJ(true);}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">JH: Get all Patients (admin)</button>
                </li>
                <li>
                  <button onClick={() => {getEligiblePatients();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">FDA: Get Eligible Patients</button>
                </li>
                <li>
                  <button onClick={() => {getParticipants();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Bavaria: Get Participants</button>
                </li>
                <li>
                  <button onClick={() => {setPatientReceive(true, 0);}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">FDA: Assgin First Eligible Patient to Placebo</button>
                </li>
                <li>
                  <button onClick={() => {setPatientReceive(false, 1);}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">FDA: Assgin Second Eligible Patient to Bavaria</button>
                </li>
                <li>
                  <button onClick={() => {addBatchDrug(1, true);}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Bavaria: Add a Batch of Placebo</button>
                </li>
                <li>
                  <button onClick={() => {addBatchDrug(1, false);}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Bavaria: Add a Batch of Bavaria</button>
                </li>
                <li>
                  <button onClick={() => {labelDoses();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">FDA: Label Unlabeled Drugs with FDA ID</button>
                </li>
                <li>
                  <button onClick={() => {assignDoses(true);}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">FDA: Assign Unassiged Placebos Equally to all Placebo Assigned Patients</button>
                </li>
                <li>
                  <button onClick={() => {assignDoses(false);}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">FDA: Assign Unassiged Bavaria Equally to all Bavaria Assigned Patients</button>
                </li>
                <li>
                  <button onClick={() => {getAllDrugsB();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Bavaria: Get all Drugs</button>
                </li>
                <li>
                  <button onClick={() => {getAllDrugsF();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">FDA: Get all Drugs</button>
                </li>
                <li>
                  <button onClick={() => {getAllDrugsJ();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">JH: Get all Drugs</button>
                </li>
                <li>
                  <button onClick={() => {sharePatients({isAdmin:true});}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">JH: Share Patients (admin)</button>
                </li>
                <li>
                  <button onClick={() => {editPatient({ndx: 1, name: "John Doe",  dob: "1985-01-01", insuranceNumber: "12345", height: "5'10", weight: "160 lbs", bloodPressure: "120/80", temperature: "98.6 F", oxygenSaturation: "98%", currentMedications: [{medication:"medication2"}],  icdHealthCodes: [{ code: "O05" },{code: "003"}], allergies: [{allergy:"allergy1"},{allergy: "allergy2"}]});}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">JH: Doctor Edit Patient</button>
                </li>
                <li>
                  <button onClick={() => {getEligiblePatientsJ();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">JH: Get Patient Eligible Patients</button>
                </li>
                <li>
                  <button onClick={() => {addPatientDrug(1);}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">JH: Give Patient Drug</button>
                </li>
                <li>
                  <button onClick={() => {addPatientVisit({ndx: 0, dateTime: "2023-04-06T14:40:00.000Z", notes: "good" });}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">JH: Add to First Patient a Visit</button>
                </li>
                <li>
                  <button onClick={() => {sharePatients(true)}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">JH: Share Eligible Patient Info (admin) (end of trial)</button>
                </li>
                <li>
                  <button onClick={() => {shareDoseAssignments();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">FDA: Share Assignments (end of trial)</button>
                </li>
                <li>
                  <button onClick={() => {removeAllPatients();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">JH: Remove All Patients</button>
                </li>
                <li>
                  <button onClick={() => {removeAllDrugs();}} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 m-3">Bavaria: Remove All Drugs</button>
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