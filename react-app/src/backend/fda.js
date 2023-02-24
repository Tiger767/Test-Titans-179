import { createVendiaClient } from "@vendia/client"

import { createACLs, uuidv4 } from "./utils";

const client = createVendiaClient({
    apiUrl: `https://at8pm75l2c.execute-api.us-west-1.amazonaws.com/graphql/`,
    websocketUrl: `wss://f4mqkxkjof.execute-api.us-west-1.amazonaws.com/graphql`,
    apiKey: 'FMmgqq1N5NvE2wvAggySE1z1p7ojh7Rhm5G55gVXnUJB',
})

const {entities} = client;


const getEligiblePatients = async() => {
    const eligiblePatients = await entities.patient.list();
    console.log("getEligiblePatients", eligiblePatients);
    return eligiblePatients.items;
}


const setPatientReceive = async(placebo, ndx) => {
    const patients = await getEligiblePatients();
    const patient = patients[ndx];
    const setPatientReceiveResponse = await entities.patient.update({
        _id: patient._id,
        placeboReciever: placebo
    });
    console.log("setPatientReceive", setPatientReceiveResponse);
}

const getAllDrugs = async() => {
    const allDrugs = await entities.drug.list();
    console.log("getAllDrugs", allDrugs);
    return allDrugs.items;
}


const labelDoses = async() => {
    const unlabeledDoses = await entities.drug.list({
        filter: {
            fid: {
                attributeExists: false
            }
        }
    });

    console.log("getUnlabeledDoses", unlabeledDoses);
    const acl = createACLs([[["JaneHopkins"], ["READ"], ["fid", "patientUuid"]],
                            [["JaneHopkins"], ["ALL"], "used"],
                            [["FDA"], ["READ"], ["bid", "placebo"]],
                            [["FDA"], ["ALL", "UPDATE_ACL"], ["fid", "patientUuid"]]]);
    unlabeledDoses.items.forEach(async(dose) => {
        const fid = uuidv4();
        const labelDosesResponse = await entities.drug.update(
            { _id: dose._id, fid },
            { aclInput: { acl } }
        );
        console.log("labelDoses", labelDosesResponse);
    });
}


const assignDoses = async(placebo) => {
    const patients = await entities.patient.list({
        filter: {
            placeboReciever: {
                eq: placebo
            }
        }
    });
    console.log("assignDoses", patients);

    const doses = await entities.drug.list({
        filter: {
            placebo: {
                eq: placebo
            },
            patientUuid: {
                attributeExists: false
            }
        }
    });
    const dosesCount = doses.items.length;
    const patientsCount = patients.items.length;
    const dosesPerPatient = dosesCount / patientsCount;
    console.log("assignDoses", doses);
    patients.items.forEach(async(patient) => {
        for (let i = 0; i < dosesPerPatient; i++) {
            const dose = doses.items.pop();
            const assignDosesResponse = await entities.drug.update({
                _id: dose._id,
                patientUuid: patient.uuid
            });
            console.log("assignDoses", assignDosesResponse);
        }
    });
}


// NOT WORKING
// Change ACLs for placeboReciever for all patients to be readable by jane hopkins and bavaria
// Change ACLs for patientUuid for all drugs to be readable by jane hopkins and bavaria
// Change ACLs for fid for all drugs to be readable by bavaria
const shareDoseAssignments = async() => {
    /*
    const shareDoseAssignmentsResponse = await entities.patient.update(
        { _id: "*" },
        {
            aclInput: {
                acl
            }
        }
    );*/
    //console.log("shareDoseAssignments", shareDoseAssignmentsResponse);
    const acl = createACLs([[["Bavaria"], ["READ"], ["patientUuid", "fid"]],
                            [["FDA"], ["READ"], ["bid", "placebo"]],
                            [["FDA"], ["ALL", "UPDATE_ACL"], ["fid", "patientUuid"]]]); // EDIT

    // get all drugs
    const drugs = await getAllDrugs();
    
    // for each drug pass _id and update
    drugs.forEach(async(drug) => {
        const shareDoseAssignmentsResponse = await entities.drug.update(
            { _id: drug._id },
            { aclInput: { acl } }
        );
        console.log("shareDoseAssignments", shareDoseAssignmentsResponse);
    });
}


export { getEligiblePatients, setPatientReceive, assignDoses, labelDoses, getAllDrugs, shareDoseAssignments };
