import { createVendiaClient } from "@vendia/client"

import { createACLs, uuidv4 } from "./utils";

const client = createVendiaClient({
    apiUrl: `https://36if76jpvg.execute-api.us-west-1.amazonaws.com/graphql/`,
    websocketUrl: `wss://ucwk0orgw5.execute-api.us-west-1.amazonaws.com/graphql`,
    apiKey: 'GiS7E9xVJQLNwP92wTWRfTb4UTUypFiWV3bVjRkK1Fge',
})

const {entities} = client;


const getParticipants = async() => {
    const participants = await entities.patient.list();
    console.log("getParticipants", participants);
    return participants.items;
}


const getAllDrugs = async() => {
    const allDrugs = await entities.drug.list();
    console.log("getAllDrugs", allDrugs);
    return allDrugs.items;
}


const addBatchDrug = async(batchSize, placebo) => {
    const batchNumber = uuidv4();
    const acl = createACLs([
        [["FDA"], ["READ"], ["bid", "placebo"]],
        [["FDA"], ["ALL", "UPDATE_ACL"], ["fid", "patientUuid"]],
    ])
    for (let i = 0; i < batchSize; i++) {
        const addDrugResponse = await entities.drug.add(
            { placebo , batchNumber, bid: uuidv4() },
            {
                aclInput: {
                    acl
                }
            }
        );
        console.log("addDrug", addDrugResponse);
    }
}



export { getParticipants, addBatchDrug, getAllDrugs };
