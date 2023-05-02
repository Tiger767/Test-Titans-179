
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
    const drugs = await getAllDrugs();
    console.log("all drugs: " + drugs)
    expect(drugs).toBeTruthy();
  }, 10000);

  test("getAllPatients", async () => {
    const PatientUuid = await addPatient({ name: "Tom"});
    expect(PatientUuid).toBeTruthy(); // Check if a UUID was returned
    const patient = await getPatient({ uuid: PatientUuid});
    console.log("patient: " + patient)
    const patients = await getAllPatients();
    console.log("all patients: " + patients)
    expect(patients).toBeTruthy(); 

  }, 10000);

  test("getEligiblePatients", async () => {
    const PatientUuid = await addPatient({ name: "Tom"});
    expect(PatientUuid).toBeTruthy(); // Check if a UUID was returned
    const patient = await getPatient({ uuid: PatientUuid});
    console.log("patient: " + patient)
    const patients = await getEligiblePatients();
    console.log("eligible patients: " + JSON.stringify(patients));
    expect(patients).toBeTruthy();

  },10000);

  test("sharePatients", async () => {
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

  },10000);

  test("editPatient", async () => {
    const PatientUuid = await addPatient({ name: "Tom"});
    expect(PatientUuid).toBeTruthy(); // Check if a UUID was returned
    const patient = await getPatient({ uuid: PatientUuid});
    const patientEdit = await editPatient(patient);
    console.log("patient edit: " + JSON.stringify(patientEdit));
  },10000);

  test("addPatientDrug", async () => {
    const PatientUuid = await addPatient({ name: "Tom"});
    expect(PatientUuid).toBeTruthy(); // Check if a UUID was returned
    const patient = await getPatient({ uuid: PatientUuid});
    const patientDrug = await addPatientDrug({patient: patient});
  }, 10000);

  test("getPatient", async () => {
    const PatientUuid = await addPatient({ name: "Tom"});
    expect(PatientUuid).toBeTruthy(); // Check if a UUID was returned
    const patient = await getPatient({ uuid: PatientUuid});
    console.log("patient: " + patient)
    expect(patient).toBeTruthy();
  }, 10000);

  test("removeAllPatients", async () => {
    const removeAllPatients1= await removeAllPatients();
    expect(removeAllPatients1).toBe(undefined);
  }, 10000);

  test("givePatientDose", async () => {
    const PatientUuid = await addPatient({ name: "Tom"});
    expect(PatientUuid).toBeTruthy(); // Check if a UUID was returned
    const patient = await getPatient({ uuid: PatientUuid});
    const patientDose = await givePatientDose({patient: patient});
    console.log("patient dose: " + JSON.stringify(patientDose));
  }, 10000);
});
