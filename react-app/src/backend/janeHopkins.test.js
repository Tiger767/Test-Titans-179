
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
        const patientName = "Tom";
        const uuidPatient = await addPatient({ name: "Tom"});
        expect(uuidPatient).toBeTruthy(); // Check if a UUID was returned
       const patient = await getPatient({ uuid: uuidPatient});
       expect(patient.name).toBe(patientName); // Check if the patient name is correct
       
      },16000);
    
  
      test("getAllDrugs", async () => {
        // Test case for getAllDrugs function
        // ... 
       const drugs = await getAllDrugs();
        console.log("all drugs: " + drugs)
        expect(drugs).toBeTruthy();
       
        // all drugs you should be able to see ...
      }, 10000);
    
      test("getAllPatients", async () => {
        // Test case for getAllPatients function
        // ...
        const PatientUuid = await addPatient({ name: "Tom"});
        expect(PatientUuid).toBeTruthy(); // Check if a UUID was returned
        const patient = await getPatient({ uuid: PatientUuid});
        console.log("patient: " + patient)
        const patients = await getAllPatients();
        console.log("all patients: " + patients)
        expect(patients).toBeTruthy(); 
        // all patients you should be able to see ...
  
      }, 10000);
    
      test("getEligiblePatients", async () => {
        // Test case for getEligiblePatients function
        // ...
        const PatientUuid = await addPatient({ name: "Tom"});
        expect(PatientUuid).toBeTruthy(); // Check if a UUID was returned
        const patient = await getPatient({ uuid: PatientUuid});
        console.log("patient: " + patient)
       const patients = await getEligiblePatients();
        console.log("eligible patients: " + JSON.stringify(patients));
        expect(patients).toBeTruthy();
  
      },10000);
    
      test("sharePatients", async () => {
        // Test case for sharePatients function
        // ...
        
        const sharePatients1= await sharePatients({isAdmin: true});
        expect(sharePatients1).toBe(true);

    
    
  
      },10000);
    
    test("addPatientVisit", async () => {
      const PatientUuid = await addPatient({ name: "Tom"});
      console.log("patient uuid: " + PatientUuid);
      const patient = await getPatient({ uuid: PatientUuid});
      expect(PatientUuid).toBeTruthy(); // Check if a UUID was returned
      const patientVisits = await addPatientVisit({ patient:patient ,dateTime: "2012-04-21T18:25:43-05:00", notes: "good"});
      console.log("patient visits: " + JSON.stringify(patientVisits));

      },16000);
    
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
