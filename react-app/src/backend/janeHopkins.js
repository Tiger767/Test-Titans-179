import { createVendiaClient } from "@vendia/client"

import { createACLs, uuidv4 } from "./utils";

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
                acl
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


// Doctor
// Need to pair drug and patient, basically like giving the patient a dosage of the drug
// Update currentTotalDoses and currentDoseFid of the patient by searching Drugs for one assigned
// to the patient (patientUuid === patient.uuid) and used is null (doesnt exist) then add with value if true

// Doctor
// Need to add a patient visit/appointment to a patient


// Admin
// Need to be able to update all ELIGIBLE patients (ACLs) so FDA and Bavaria at end of trial can get (READ) extra patient info
// Notify FDA and Bavaria when study is over?


// Get all patients
// Admin should be able to also see eligiblity, but not the doctor (we will soft block this?)


const getAllDrugs = async() => {
    const allDrugs = await entities.drug.list();
    console.log("getAllDrugs", allDrugs);
    return allDrugs.items;
}


export { addPatient, getAllDrugs };
