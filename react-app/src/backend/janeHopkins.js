import { createVendiaClient } from "@vendia/client"

import createACLs from "./utils";

const client = createVendiaClient({
    apiUrl: `https://oe0v146e4b.execute-api.us-west-1.amazonaws.com/graphql/`,
    websocketUrl: `wss://nwis32gxii.execute-api.us-west-1.amazonaws.com/graphql`,
    apiKey: 'CjVR15Bx4tbgh4UUFicZL8Aoca2LDbaKKzuAW9akuSHk',
})

const {entities} = client;

const useJaneHopkins = () => {
    return {entities};
}

// Source: https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
const uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const addPatient = async(name="Unknown", patientPicture="None", dob="1970-01-01", insuranceNumber="None",
                         height="Unknown Inches", weight="Unknown Inches", bloodPressure="Unknown mmHg",
                         temperature="Unknown Fahrenheit", oxygenSaturation="Unknown %",
                         address="Unknown", currentMedications=[], familyHistory="Unknown", currentlyEmployed="Unknown",
                         currentlyInsured="Unknown", icdHealthCodes=[], allergies=[]) => {
    // Exclude ICD-10 Pregnancy codes - O00–O99
    // Exclude DOB greater than 1/1/2005
    const hasPregnancyCode = icdHealthCodes.some(code => code.startsWith('O'));
    const isBefore2005 = new Date(dob) < new Date('2005-01-01');
    const eligibility = !hasPregnancyCode && isBefore2005;
    const currentTotalDoses = 0;
    const currentDoseFid = "";
    const visits = [];
    const uuid = uuidv4();
    // pass all parameters to the add
    const addPatientResponse = await entities.patient.add(
        { name, patientPicture, dob, insuranceNumber, height, weight,
          bloodPressure, temperature, oxygenSaturation, uuid, address, currentMedications,
          familyHistory, currentlyEmployed, currentlyInsured, icdHealthCodes, allergies,
          eligibility, currentTotalDoses, currentDoseFid, visits },
        {
            aclInput: {
                acl: createACLs([[["*"], ["READ"], ["name", "dob"]]])
            }
        }
    );
    console.log("addPatientResponse", addPatientResponse);
}


export { useJaneHopkins, addPatient };
