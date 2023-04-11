
// TODO: FILLIN and ADAPT TEST

import {
    addPatient,
    getAllDrugs,
    getAllPatients,
    getEligiblePatients,
    sharePatients,
    addPatientVisit,
    editPatient,
    addPatientDrug,
    getPatient,
    removeAllPatients,
    givePatientDose
  } from "./janeHopkins";
  
  describe("JaneHopkins functions", () => {
    test("addPatient", async () => {
      const uuid = await addPatient({'name'});

      const patient = getPatient({ uuid });

      expect(patient.name).toBe('name');
    });
  
    test("getAllDrugs", async () => {
      // Test case for getAllDrugs function
      // ... 
      const drugs = await getAllDrugs();
      // all drugs you should be able to see ...
    }, 10000);
  
    test("getAllPatients", async () => {
      // Test case for getAllPatients function
      // ...
    });
  
    test("getEligiblePatients", async () => {
      // Test case for getEligiblePatients function
      // ...
    });
  
    test("sharePatients", async () => {
      // Test case for sharePatients function
      // ...
    });
  
    test("addPatientVisit", async () => {
      // Test case for addPatientVisit function
      // ...
    });
  
    test("editPatient", async () => {
      // Test case for editPatient function
      // ...
    });
  
    test("addPatientDrug", async () => {
      // Test case for addPatientDrug function
      // ...
    });
  
    test("getPatient", async () => {
      // Test case for getPatient function
      // ...
    });
  
    test("removeAllPatients", async () => {
      // Test case for removeAllPatients function
      // ...
    });
  
    test("givePatientDose", async () => {
      // Test case for givePatientDose function
      // ...
    });
  });
  