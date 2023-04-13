import { createVendiaClient } from "@vendia/client"
import { useEffect } from 'react';
import { createACLs, uuidv4,} from "./utils";

const client = createVendiaClient({
    apiUrl: `https://tmrzu1evol.execute-api.us-west-1.amazonaws.com/graphql/`,
    websocketUrl: `wss://67d5g30ik1.execute-api.us-west-1.amazonaws.com/graphql`,
    apiKey: '5i94FbphGrv1H7VuUTtunHJPsiEXR1ugp4xfo3TZAZxX',
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




 
    // Doctor
// Need to be able to add a patient and check elgiibility and assign uuid
const addPatient = async({name="Unknown", patientPicture="None", dob="1970-01-01", insuranceNumber="None",
                          height="Unknown Inches", weight="Unknown Inches", bloodPressure="Unknown mmHg",
                          temperature="Unknown Fahrenheit", oxygenSaturation="Unknown %",
                          address="Unknown", currentMedications=[], familyHistory="Unknown", currentlyEmployed="Unknown",
                          currentlyInsured="Unknown", icdHealthCodes=[], allergies=[]}) => {
    // Exclude ICD-10 Pregnancy codes - O00–O99
    // Exclude DOB greater than 1/1/2005
    const hasPregnancyCode = icdHealthCodes.some(code => code.startsWith('O'));
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
const addPatientVisit = async (patient, dateTime, notes) => {

  
  if (!patient.patient || !patient.patient._id) {
    console.log("Invalid patient");
    return;
  }

  const visits = patient.patient.visits;
  const visit = visits.find(visit => visit.dateTime === dateTime);
  if (visit) {
    console.log("Duplicate visit");
    return;
  }

  const newVisit = { dateTime:patient.dateTime, notes:patient.notes};
  //push
  visits.push(newVisit);

  const updatePatientVisitsResponse = await entities.patient.update(
{ _id: patient.patient._id, visits }
  );
  console.log("addPatientVisit", updatePatientVisitsResponse);

  return patient.patient;


 
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
// The Admin should be the only one able see eligiblity, but not the doctor (we will soft block this?)
const getAllPatients = async(isAdmin = false) => {
  const allPatients = await entities.patient.list();    
  if (!isAdmin) {            
    allPatients.items = allPatients.items.map(patient => {            
        patient.eligibility = null;           
        return patient;         
      })       
    }
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


export { addPatient, getAllDrugs, getAllPatients, getEligiblePatients, sharePatients, addPatientVisit, editPatient, addPatientDrug, getPatient, removeAllPatients, givePatientDose };
