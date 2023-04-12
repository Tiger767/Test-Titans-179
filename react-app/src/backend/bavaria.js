import { createVendiaClient } from "@vendia/client"

import { createACLs, uuidv4 } from "./utils";

const client = createVendiaClient({
    apiUrl: `https://t5g5kfm6ii.execute-api.us-west-1.amazonaws.com/graphql/`,
    websocketUrl: `wss://svoofq5qql.execute-api.us-west-1.amazonaws.com/graphql`,
    apiKey: 'HWg9YbvREBLXPrCwELciuA5UhmfucTXE8auDXXHZiRU5',
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
        [["FDA"], ["READ", "UPDATE_ACL"], ["bid", "placebo"]],
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

const removeAllDrugs = async() => {
    const drugs = await entities.drug.list();
    drugs.items.forEach(async(drug) => {
        const removeAllDrugsResponse = await entities.drug.remove(drug._id);
        console.log("removeAllDrugsResponse", removeAllDrugsResponse);
    });
}


export { getParticipants, addBatchDrug, getAllDrugs, removeAllDrugs };
