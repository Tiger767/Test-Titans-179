import { createVendiaClient } from "@vendia/client"

import { createACLs, uuidv4,} from "./utils";

const client = createVendiaClient({
    apiUrl: `https://05bzvc7wo2.execute-api.us-west-1.amazonaws.com/graphql/`,
    websocketUrl: `wss://4zsow57261.execute-api.us-west-1.amazonaws.com/graphql`,
    apiKey: '61bvxT3xS1sHhFtW2C74XHLsNB3eQN3xcaTXXBRhhxwb',
})

const {entities} = client;


// Doctor
// Need to be able to add a patient and check elgiibility and assign uuid
const addPatient = async({name="Unknown", patientPicture="None", dob="1970-01-01", insuranceNumber="None",
                         height="Unknown Inches", weight="Unknown Inches", bloodPressure="Unknown mmHg",
                         temperature="Unknown Fahrenheit", oxygenSaturation="Unknown %",
                         address="Unknown", currentMedications=[], familyHistory="Unknown", currentlyEmployed="Unknown",
                         currentlyInsured="Unknown", icdHealthCodes=[], allergies=[]}) => {
    // Exclude ICD-10 Pregnancy codes - O00–O99
    // Exclude DOB greater than 1/1/2005
    const hasPregnancyCode = icdHealthCodes.some(code => code.code.startsWith('O'));
    const isBefore2005 = new Date(dob) < new Date('2005-01-01');
    const eligibility = !hasPregnancyCode && isBefore2005;
    const currentTotalDoses = 0;
    const currentDoseFid = "";
    const visits = [];
    const uuid = uuidv4();
    // pass all parameters to the add

    let acl;
    if (eligibility) {
        acl = createACLs([
            [["FDA", "Bavaria"], ["READ"], ["uuid", "visits", "currentTotalDoses"]],
            [["FDA"], ["READ"], ["eligibility", "currentDoseFid"]],
            [["FDA"], ["ALL"], ["placeboReciever"]]
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
                acl:[
                  {
              
                },
              ]
            }
        }
    );
    console.log("addPatientResponse", addPatientResponse);
}

// Doctor
// Need to be able to edit patient information
// Some info cannot be changed mainly uuid. 
// If dob is changed or icdHealthCodes eligibility needs to be recalculated
// HOWEVER, we don't want eligiblity to change and result in patients being kicked out of the study??
// ASK ELLIOT! If not, then no chnages to dob or icdHealthCodes are allowed.

const doctorEditPatient = async ({ ndx, isDoctor = false, name, dob, insuranceNumber, height, weight,
  bloodPressure, temperature, oxygenSaturation, currentMedications,
  icdHealthCodes, allergies }) => {
  console.log(ndx, name, dob, insuranceNumber, height, weight, bloodPressure, temperature, oxygenSaturation, currentMedications, icdHealthCodes, allergies);
  if(!isDoctor) {
  const patients = await getEligiblePatientsJ();
  const patient = patients[ndx];
if (!patient || !patient._id) {
  console.error("Invalid patient");
  return;
}

patient.name = name;
patient.dob = dob;
patient.insuranceNumber = insuranceNumber;
patient.height = height;
patient.weight = weight;
patient.bloodPressure = bloodPressure;
patient.temperature = temperature;
patient.oxygenSaturation = oxygenSaturation;
patient.currentMedications = currentMedications;
patient.icdHealthCodes = icdHealthCodes;
patient.allergies = allergies;



const editPatientResponse = await entities.patient.update(
  {
    _id: patient._id,
    uuid: patient.uuid,
    name: name,
    dob: dob,
    insuranceNumber: insuranceNumber,
    height: height,
    weight: weight,
    bloodPressure: bloodPressure,
    temperature: temperature,
    oxygenSaturation: oxygenSaturation,
    currentMedications: currentMedications,
    icdHealthCodes: icdHealthCodes,
    allergies: allergies,



  },

  {
    UpdateExpression: "SET eligibility = :eligibility",
    ExpressionAttributeValues: {
      ":eligibility": "eligible"
    },
    ConditionExpression: "attribute_exists(uuid)"
  }
);

console.log("editPatientResponse", editPatientResponse);
  }
}
// Doctor
// Need to pair drug and patient, basically like giving the patient a dosage of the drug
// Update currentTotalDoses and currentDoseFid of the patient by searching Drugs for one assigned
// to the patient (patientUuid === patient.uuid) and used is null (doesnt exist) then add with value if true

const addPatientDrug = async (ndx,/*(isDoctor = false*/) => {
  // get all patients
 
  const patients = await getEligiblePatientsJ();
  console.log("patients", patients);
  const patient = patients[ndx];
  console.log("patient", patient);
  //get Uuid of patient

  

// get all drugs assigned to patient
// filter by patientUuid === patient.uuid and used is null (doesnt exist)
const patientDoses = await entities.drug.list({
    filter: {
        patientUuid: {
            eq: patient.uuid
        },
        //Filter usage of drug
       /* used: {
            attributeExists: false, eq: false
        }*/
    }
});
const dose = patientDoses.items[0];

console.log("updatePatientDoses", patientDoses);
//get real patient

const currentTotalDoses = patient.currentTotalDoses + 1;
const currentDoseFid = dose.fid;
const updatePatientDosesResponse = await entities.patient.update(
    { _id: patient._id, currentTotalDoses, currentDoseFid },
    
);
console.log("updatePatientDoses", updatePatientDosesResponse);
}





  
          
                          

 

   

        


    /*
    console.log("addPatientDrugResponse", addPatientDrugResponse);
    const updateDrugResponse = await entities.drug.update(
        { fid: drugFid },
                {
                    updateExpression: "SET used = :used",
                    expressionAttributeValues: {
                        ":used": true

                }

*/

// Doctor view
// Need to add a patient visit/appointment to a patient
// Update visits array of the patient by adding a new visit object
// with the visit date and visit notes
// Doctor view
// Need to add a patient visit/appointment to a patient
// Update visits array of the patient by adding a new visit object
// with the visit date and visit notes
//check for duplicate visits
//works
const addPatientVisit = async ({isDoctor,ndx, dateTime, notes}) => {
  if(!isDoctor) {
  const patients = await getEligiblePatientsJ();
  const patient = patients[ndx];
  if (!patient || !patient._id) {
    console.error("Invalid patient");
    return;
  }
  //check if visit already exists
if(patient.visits && patient.visits.find(visit => visit.dateTime === dateTime)) {
  console.error("Visit of that time and date already exists");
  return;

}
 const visits = patient.visits || [];
  visits.push({
    dateTime: dateTime,
    notes: notes
  });



  const addPatientVisitResponse = await entities.patient.update(
  
    { _id: patient._id ,
    uuid: patient.uuid ,
     visits: visits},
    {

    
      UpdateExpression: "SET visits = :visits",
      ExpressionAttributeValues: {
        ":visits": visits
      },
    }
  );
  
  
  console.log("addPatientVisitResponse", addPatientVisitResponse);
  }
};










// Admin
// Need to be able to update all ELIGIBLE patients (ACLs) so FDA and Bavaria at end of trial can get (READ) extra patient info
// Notify FDA and Bavaria when study is over?
//worrks
const UpdatePatients = async (isAdmin = false) => {

    const allPatients = await entities.patient.list();
    console.log("allPatients", allPatients);
    const eligiblePatients = allPatients.items.filter((patient) => patient.eligibility === true);
    console.log("eligiblePatients", eligiblePatients);  
    if (!isAdmin) {
      const updatePatientResponse = await entities.patient.update(
        { patientUuid: eligiblePatients.uuid },
        {
          aclInput: {
            acl: createACLs([
              //Placebo Boolean (read), Bavaria ID (read)  (not needed but try to do) Assigned Patient uuid (read), FDA ID (read)
              [["placebo","Bavaria"],["READ"]],
              [["patientUuid","FDA"], ["READ"]]

            ])
          }
        }
      );
  
      console.log("updatePatientResponse", updatePatientResponse);
  }
    }
   
  

  const getEligiblePatientsJ = async() => {
    const eligiblePatients = await entities.patient.list();
    console.log("getEligiblePatients", eligiblePatients);
    return eligiblePatients.items;
  }
// Get all patients
// The Admin should be the only one able see eligiblity, but not the doctor (we will soft block this?)
const getAllPatients = async(isAdmin=false) => {    
   const allPatients = await entities.patient.list();    
    if (!isAdmin) {            
      allPatients.items = allPatients.items.map(patient => {            
         patient.eligibility = null;           
          return patient;         
        })       
      }
    console.log("getAllPatients", allPatients);
   }

const getAllDrugs = async() => {
    const allDrugs = await entities.drug.list();
    console.log("getAllDrugs", allDrugs);
    return allDrugs.items;
}


export { addPatient, getAllDrugs, getAllPatients, getEligiblePatientsJ,UpdatePatients, addPatientVisit, doctorEditPatient,addPatientDrug};
