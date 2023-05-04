import { createVendiaClient } from "@vendia/client"
import { useEffect } from 'react';
import { createACLs, uuidv4,} from "./utils";

const client = createVendiaClient({
    apiUrl: `https://tmrzu1evol.execute-api.us-west-1.amazonaws.com/graphql/`,
    websocketUrl: `wss://67d5g30ik1.execute-api.us-west-1.amazonaws.com/graphql`,
    apiKey: 'E75wyXwBpjRrsszknmQyUx9ty3kFgDJjAeG4Ggcbvoqk',
})

const {entities} = client;


//Make this work on the front end
const editPatient = async (updatedPatient) => {

    console.log("editPatient", updatedPatient);
   



    const editPatientResponse = await entities.patient.update(
      {
        _id: updatedPatient._id,
        name: updatedPatient.name,
        patientPicture: updatedPatient.patientPicture,
        dob: updatedPatient.dob,
        insuranceNumber: updatedPatient.insuranceNumber,
        height: updatedPatient.height,
        weight: updatedPatient.weight,
        bloodPressure: updatedPatient.bloodPressure,
        temperature: updatedPatient.temperature,
        oxygenSaturation: updatedPatient.oxygenSaturation,
        uuid: updatedPatient.uuid,
        address: updatedPatient.address,
        currentMedications: updatedPatient.currentMedications,
        familyHistory: updatedPatient.familyHistory,
        currentlyEmployed: updatedPatient.currentlyEmployed,
        currentlyInsured: updatedPatient.currentlyInsured,
        icdHealthCodes: updatedPatient.icdHealthCodes,
        allergies: updatedPatient.allergies,
        eligibility: updatedPatient.eligibility,
        currentTotalDoses: parseInt(updatedPatient.currentTotalDoses),
        currentDoseFid: updatedPatient.currentDoseFid,
        visits: updatedPatient.visits
      },
      {
        ConditionExpression: "attribute_exists(uuid)"
      }
    );
    console.log("editPatient", editPatientResponse);
    }



const CheckTrialComplete = async () => {
    const allPatients = await entities.patient.list();
    if (allPatients.items.length == 0) {
      return false;
    }

    for(let i = 0; i < allPatients.items.length; i++){
        if(allPatients.items[i].currentTotalDoses == 2){  // use 5
            // pass
        } else if (allPatients.items[i].eligibility) {
            return false;
        }
    }
    return true;
}
 
// Doctor
// Need to be able to add a patient and check elgiibility and assign uuid
const addPatient = async({name="Unknown", patientPicture="None", dob="1970-01-01", insuranceNumber="None",
                          height="Unknown Inches", weight="Unknown Inches", bloodPressure="Unknown mmHg",
                          temperature="Unknown Fahrenheit", oxygenSaturation="Unknown %",
                          address="Unknown", currentMedications=[], familyHistory="Unknown", currentlyEmployed="Unknown",
                          currentlyInsured="Unknown", icdHealthCodes=[], allergies=[]}) => {
    // Exclude ICD-10 Pregnancy codes - O00–O99
    // Exclude DOB greater than 1/1/2005
    const hasPregnancyCode = icdHealthCodes.some(code => code.code && code.code.startsWith('O'));
    const isBefore2005 = new Date(dob) < new Date('2005-01-01');
    const eligibility = !hasPregnancyCode && isBefore2005;
    const currentTotalDoses = 0;
    const currentDoseFid = "";
    const visits = [];
    const uuid = uuidv4();

    let acl;
    if (eligibility) {
        acl = createACLs([
            [["FDA", "Bavaria"], ["READ"], ["uuid", "visits", "currentTotalDoses"]],
            [["FDA"], ["READ"], ["eligibility", "currentDoseFid"]],
            [["FDA"], ["ALL", "UPDATE_ACL"], ["placeboReciever"]]
        ])
    } else {
        acl = createACLs([
            [["*"], []]
        ])
    }

    const addPatientResponse = await entities.patient.add(
        { name, patientPicture, dob, insuranceNumber, height, weight,
          bloodPressure, temperature, oxygenSaturation, uuid, address, currentMedications,
          familyHistory, currentlyEmployed, currentlyInsured, icdHealthCodes, allergies,
          eligibility, currentTotalDoses, currentDoseFid, visits },
        {
            aclInput: {
                acl
            }
        }
    );
    console.log("addPatientResponse", addPatientResponse);
    return uuid;
}

// Doctor
// Need to be able to edit patient information
// Some info cannot be changed mainly uuid. 
// If dob is changed or icdHealthCodes eligibility needs to be recalculated
// HOWEVER, we don't want eligiblity to change and result in patients being kicked out of the study??
// ASK ELLIOT! If not, then no chnages to dob or icdHealthCodes are allowed.
/*const editPatient = async ({ ndx,name, patientPicture, dob, insuranceNumber, height, weight,
                             bloodPressure, temperature, oxygenSaturation, address, currentMedications,
                             familyHistory, currentlyEmployed, currentlyInsured, icdHealthCodes,
                             allergies, currentTotalDoses, currentDoseFid, visits }) => {
 try {
  const patient = await getPatient({ ndx });

  if (!patient || !patient._id) {
    console.error("Invalid patient");
    return;
  }

  const editPatientResponse = await entities.patient.update(
    {
      _id: patient._id,
      name, patientPicture, dob, insuranceNumber, height, weight,
      bloodPressure, temperature, oxygenSaturation, address, currentMedications,
      familyHistory, currentlyEmployed, currentlyInsured, icdHealthCodes, allergies,
      currentTotalDoses, currentDoseFid, visits
    },
    {
      ConditionExpression: "attribute_exists(uuid)"
    }
  );
  console.log("editPatient", editPatientResponse);
  } catch (err) {
    console.error("editPatient", err);
  }

}
*/

// Doctor
// Need to pair drug and patient, basically like giving the patient a dosage of the drug
// Update currentTotalDoses and currentDoseFid of the patient by searching Drugs for one assigned
// to the patient (patientUuid === patient.uuid) and used is null (doesnt exist) then add with value if true
const addPatientDrug = async (patient) => {
  if (!patient || !patient._id) {
    console.error("Invalid patient");
    return;
  }

  // get all drugs assigned to patient
  // filter by patientUuid === patient.uuid and used is null (doesnt exist)
  const patientDoses = await entities.drug.list({
    filter: {
        patientUuid: {
          eq: patient.uuid
        },
        used: {
          attributeExists: false
        }
    }
  });
  console.log("addPatientDrug", patientDoses);
  const dose = (patientDoses).items[0];

  if (dose === undefined) {
    console.log("No doses available");
    alert("No doses available");
    return;
  }

  const updateDrugResponse = entities.drug.update(
    { _id: dose._id, used: true }
  );
  console.log("addPatientDrug", updateDrugResponse);

  const currentTotalDoses = patient.currentTotalDoses + 1;
  const currentDoseFid = dose.fid;
  const updatePatientDosesResponse = await entities.patient.update(
    { _id: patient._id, currentTotalDoses, currentDoseFid }
  );
  console.log("addPatientDrug", updatePatientDosesResponse);
  return dose;
}


const givePatientDose = async (drug, patientUuid) => {
  const patient = await getPatient({ uuid: patientUuid });

  if (!patient || !patient._id) {
    console.error("Invalid patient");
    return;
  }

  if (drug.used == true) {
    console.log("Dose already used");
    return;
  }

  const updateDrugResponse = entities.drug.update(
    { _id: drug._id, used: true }
  );
  console.log("givePatientDose", updateDrugResponse);

  const currentTotalDoses = patient.currentTotalDoses + 1;
  const currentDoseFid = drug.fid;
  const updatePatientDosesResponse = await entities.patient.update(
    { _id: patient._id, currentTotalDoses, currentDoseFid }
  );
  console.log("givePatientDose", updatePatientDosesResponse);
}


// Doctor view
// Need to add a patient visit/appointment to a patient
// Update visits array of the patient by adding a new visit object
// with the visit date and visit notes
// Doctor view
// Need to add a patient visit/appointment to a patient
// Update visits array of the patient by adding a new visit object
// with the visit date and visit notes
// check for duplicate visits
const addPatientVisit = async (patient, dateTime, notes, hivViralLoad) => {
  console.log("addPatientVisit", patient);

  if (!patient || !patient._id) {
    console.error("Invalid patient"); 
    return;
  }

  const prevDoseFid = patient.currentDoseFid;
  
  const visit = {
    dateTime: dateTime,
    notes: notes,
    hivViralLoad: hivViralLoad,
    prevDoseFid: prevDoseFid
  
  };
  console.log("addPatientVisit", visit);

  // check for duplicate visits
  const patientVisits = patient.visits;
  console.log("addPatientVisit", patientVisits);
  for (let i = 0; i < patientVisits.length; i++) {
    if (patientVisits[i].dateTime === dateTime) {
      console.log("Duplicate visit");
      return;
    }
  }

  const visits = [...patient.visits, visit];
  console.log("addPatientVisit", visits);



  
  const updatePatientVisitsResponse = await entities.patient.update(
    { _id: patient._id, visits }
  );
  console.log("addPatientVisit", updatePatientVisitsResponse);
  
}










// Admin
// Need to be able to update all ELIGIBLE patients (ACLs) so FDA and Bavaria at end of trial can get (READ) extra patient info
// Notify FDA and Bavaria when study is over?
async function sharePatients(isAdmin = false) {
  const eligiblePatients = await getEligiblePatients();
  if (isAdmin) {

    const acl = createACLs([
      [["Bavaria", "FDA"], ["READ"], ["dob", "height", "weight", "bloodPressure", "temperature", "oxygenSaturation", "uuid", "currentMedications", "familyHistory", "currentlyEmployed", "currentlyInsured", "icdHealthCodes", "allergies", "currentTotalDoses", "currentDoseFid", "visits"]],
      [["FDA"], ["ALL", "UPDATE_ACL"], ["placeboReciever"]],
      [["Bavaria"], ["READ"], ["placeboReciever"]]
    ]);

    eligiblePatients.forEach(async (patient) => {
      const sharePatientsResponse = await entities.patient.update(
        { _id: patient._id },
        {
          aclInput: { acl }
        }
      );
      console.log("sharePatientsResponse", sharePatientsResponse);
    });

    return true;
  }



}
   

const getPatient = async({uuid=null, id=null, ndx=null, eligibility_ndx=null}) => {
  if (id !== null) {
    const patient = await entities.patient.get({ id });
    console.log("getPatient", patient);
    return patient;
  } else if (uuid !== null) {
    const patients = await entities.patient.list({
      filter: {
        uuid: {
          eq: uuid
        }
      }
    });
    console.log("getPatient", patients);
    return (patients).items[0];
  } else if (ndx !== null) {
    const patients = await entities.patient.list();
    console.log("getPatient", patients);
    return (patients).items[ndx];
  } else {
    const patients = await entities.patient.list({
      filter: {
        eligibility: {
          eq: true
        }
      }
    });
    console.log("getPatient", patients);
    return (patients).items[eligibility_ndx]
  }
}

// Get all patients
const getAllPatients = async(isAdmin = false) => {
  const allPatients = await entities.patient.list();    
  /*if (!isAdmin) {            
    allPatients.items = allPatients.items.map(patient => {            
        patient.eligibility = null;           
        return patient;         
      })       
    }*/
  console.log("getAllPatients", allPatients);
  return allPatients.items;
}

const getEligiblePatients = async() => {
  const allPatients = await entities.patient.list(
    {
      filter: {
        eligibility: {
          eq: true
        }
      }
    }
  );
  console.log("getEligiblePatients", allPatients);
  return allPatients.items;
}

const getAllDrugs = async() => {
    const allDrugs = await entities.drug.list();
    console.log("getAllDrugs", allDrugs);
    return allDrugs.items;
}


const removeAllPatients = async() => {
  const patients = await entities.patient.list();

  patients.items.forEach(async(patient) => {
    const removeAllPatientsResponse = await entities.patient.remove(patient._id);
    console.log("removeAllPatientsResponse", removeAllPatientsResponse);
   
  });
}


function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomPatients(numPatients) {
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'James', 'Jessica', 'Robert', 'Ashley'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];

  const patients = [];

  for (let i = 0; i < numPatients; i++) {
    const name = firstNames[Math.floor(Math.random() * firstNames.length)] + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)];
    const dob = randomDate(new Date(1950, 0, 1), new Date(2007, 0, 1)).toISOString().split('T')[0];
    
    const familyHistory = Math.random() < 0.5 ? 'Heart Disease, Diabetes' : 'None';
    const currentlyEmployed = Math.random() < 0.5 ? 'Yes' : 'No';
    const currentlyInsured = Math.random() < 0.5 ? 'Yes' : 'No';
    const insuranceNumber =  currentlyInsured === 'Yes' ? 'INS' + randomInt(100000, 999999) : "";

    const height = randomInt(60, 78) + ' Inches';
    const weight = randomInt(100, 250) + ' Pounds';
    const bloodPressure = randomInt(100, 140) + '/' + randomInt(60, 90) + ' mmHg';
    const temperature = (randomInt(965, 995) / 10).toFixed(1) + ' Fahrenheit';
    const oxygenSaturation = randomInt(90, 100) + ' %';

    const medications = ['Lisinopril', 'Metformin', 'Aspirin', 'Atorvastatin'];
    const currentMedications = medications
      .filter(() => Math.random() < 0.5)
      .map(medication => ({ medication }));

    const healthCodes = ['I10', 'E11', 'J45', 'K21', 'O99'];
    const icdHealthCodes = healthCodes
      .filter(() => Math.random() < 0.3)
      .map(code => ({ code }));

    const allergyList = ['Penicillin', 'Peanuts', 'Shellfish', 'Dust mites'];
    const allergies = allergyList
      .filter(() => Math.random() < 0.5)
      .map(allergy => ({ allergy }));

    patients.push({
      name,
      patientPicture: 'https://example.com/patient' + (i + 1) + '.jpg',
      dob,
      insuranceNumber,
      height,
      weight,
      bloodPressure,
      temperature,
      oxygenSaturation,
      address: "" + (i + 1) + "53 Oak St, Los Angeles, CA 9000",
      currentMedications,
      familyHistory,
      currentlyEmployed,
      currentlyInsured,
      icdHealthCodes,
      allergies,
    });
  }

  return patients;
}


const addTestsPatients = async() => {
  const patients = [
    {
      name: "John Doe",
      patientPicture: "https://example.com/patient1.jpg",
      dob: "1985-06-15",
      insuranceNumber: "INS123456",
      height: "70 Inches",
      weight: "180 Pounds",
      bloodPressure: "120/80 mmHg",
      temperature: "98.6 Fahrenheit",
      oxygenSaturation: "98 %",
      address: "123 Main St, New York, NY 10001",
      currentMedications: [
        {
          medication: "Lisinopril"
        },
        {
          medication: "Metformin"
        }
      ],
      familyHistory: "Heart Disease, Diabetes",
      currentlyEmployed: "Yes",
      currentlyInsured: "Yes",
      icdHealthCodes: [
        {
          code: "I10"
        },
        {
          code: "E11"
        }
      ],
      allergies: [
        {
          allergy: "Penicillin"
        }
      ],
    },
    {
      name: "Jane Smith",
      patientPicture: "https://example.com/patient2.jpg",
      dob: "1990-03-25",
      insuranceNumber: "INS654321",
      height: "65 Inches",
      weight: "140 Pounds",
      bloodPressure: "115/75 mmHg",
      temperature: "98.4 Fahrenheit",
      oxygenSaturation: "97 %",
      uuid: "f0a7e183-2446-11ec-9621-0242ac130002",
      address: "456 Oak St, Los Angeles, CA 90001",
      currentMedications: [
        {
          medication: "Atorvastatin"
        },
        {
          medication: "Levothyroxine"
        }
      ],
      familyHistory: "Hypothyroidism, High Cholesterol",
      currentlyEmployed: "No",
      currentlyInsured: "Yes",
      icdHealthCodes: [
        {
          code: "E03"
        },
        {
          code: "E78"
        }
      ],
      allergies: [
        {
          allergy: "Shellfish"
        }
      ],
    },
    {
      name: "Alice Johnson",
      patientPicture: "https://example.com/patient3.jpg",
      dob: "1980-10-08",
      insuranceNumber: "INS987654",
      height: "63 Inches",
      weight: "135 Pounds",
      bloodPressure: "110/70 mmHg",
      temperature: "98.0 Fahrenheit",
      oxygenSaturation: "99 %",
      uuid: "f0a7e184-2446-11ec-9621-0242ac130002",
      address: "789 Pine St, Chicago, IL 60601",
      currentMedications: [
        {
          medication: "Amlodipine"
        }
      ],
      familyHistory: "Hypertension, Arthritis",
      currentlyEmployed: "Yes",
      currentlyInsured: "No",
      icdHealthCodes: [
        {
          code: "O05"
        }
      ],
      allergies: [
        {
          allergy: "Peanuts"
        }
      ],
    }
  ];
  const all_patients = patients.concat(generateRandomPatients(4));
  

  for (let i = 0; i < all_patients.length; i++) {
    const patient = all_patients[i];
    addPatient(patient);
  }
}


export { addPatient, getAllDrugs, getAllPatients, getEligiblePatients, sharePatients, addPatientVisit, editPatient, addPatientDrug, getPatient, removeAllPatients, givePatientDose, addTestsPatients, CheckTrialComplete };
