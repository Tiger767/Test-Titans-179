import { createVendiaClient } from "@vendia/client"

import { createACLs, uuidv4 } from "./utils";

const client = createVendiaClient({
    apiUrl: `https://tzgw4sn810.execute-api.us-west-1.amazonaws.com/graphql/`,
    websocketUrl: `wss://hubar5s936.execute-api.us-west-1.amazonaws.com/graphql`,
    apiKey: 'BmRevkh6aABKZTQK9heeFguqEzWsgfHAzLwXQdgWrUGx',
})

const {entities} = client;


const getEligiblePatients = async() => {
    const eligiblePatients = await entities.patient.list();
    console.log("getEligiblePatients", eligiblePatients);
    return eligiblePatients.items;
}


const setPatientReceive = async(placebo, _id) => {
    //const patient = await getPatient({ _id });
    let acl = createACLs([
        //[["JaneHopkins"], ["READ"], ["placeboReciever"]], // to remove
        [["FDA", "Bavaria"], ["READ"], ["uuid", "visits", "currentTotalDoses"]],
        [["FDA"], ["READ"], ["eligibility", "currentDoseFid"]],
        [["FDA"], ["ALL", "UPDATE_ACL"], ["placeboReciever"]]
    ]);
    const setPatientReceiveResponse = await entities.patient.update({
        _id,
        placeboReciever: placebo
    }, {
        aclInput: { acl }
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
                            [["FDA"], ["READ", "UPDATE_ACL"], ["bid", "placebo"]],
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

    const acl = createACLs([[["JaneHopkins"], ["READ"], ["fid", "patientUuid"]],
                            [["JaneHopkins"], ["ALL"], "used"],
                            [["FDA"], ["READ", "UPDATE_ACL"], ["bid", "placebo"]],
                            [["FDA"], ["ALL", "UPDATE_ACL"], ["fid", "patientUuid"]]]);
    
    console.log("assignDoses", doses);
    patients.items.forEach(async(patient) => {
        for (let i = 0; i < dosesPerPatient; i++) {
            const dose = doses.items.pop();
            const assignDosesResponse = await entities.drug.update({
                _id: dose._id,
                patientUuid: patient.uuid
            }, { aclInput: { acl } });
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

    let acl = createACLs([
        [["Bavaria", "JaneHopkins"], ["READ"], ["placeboReciever"]],
        [["FDA", "Bavaria"], ["READ"], ["uuid", "visits", "currentTotalDoses"]],
        [["FDA"], ["READ"], ["eligibility", "currentDoseFid"]],
        [["FDA"], ["ALL", "UPDATE_ACL"], ["placeboReciever"]]
    ]);

    const patients = await getEligiblePatients();
    patients.forEach(async(patient) => {
        const shareDoseAssignmentsResponse = await entities.patient.update(
            { _id: patient._id, placeboReciever: patient.placeboReciever },
            {
                aclInput: { acl }
            }
        );
        console.log("shareDoseAssignments", shareDoseAssignmentsResponse);
    });


    //console.log("shareDoseAssignments", shareDoseAssignmentsResponse);
    acl = createACLs([[["JaneHopkins", "Bavaria"], ["READ"], ["bid", "placebo", "fid", "patientUuid"]],
                      [["JaneHopkins"], ["ALL"], "used"],
                      [["FDA"], ["READ", "UPDATE_ACL"], ["bid", "placebo"]],
                      [["FDA"], ["ALL", "UPDATE_ACL"], ["fid", "patientUuid"]]]);

    // get all drugs
    const drugs = await getAllDrugs();
    
    // for each drug pass _id and update
    drugs.forEach(async(drug) => {
        const shareDoseAssignmentsResponse = await entities.drug.update(
            { _id: drug._id, fid: drug.fid, patientUuid: drug.patientUuid },
            { aclInput: { acl } }
        );
        console.log("shareDoseAssignments", shareDoseAssignmentsResponse);
    });
}


const getPatient = async({uuid=null, _id=null, ndx=null}) => {
    if (_id !== null) {
      const patient = await entities.patient.get({ _id });
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
    } else {
      const patients = await entities.patient.list();
      console.log("getPatient", patients);
      return (patients).items[ndx];
    }
}


export { getEligiblePatients, setPatientReceive, assignDoses, labelDoses, getAllDrugs, shareDoseAssignments };
