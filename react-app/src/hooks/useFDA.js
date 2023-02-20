import { createVendiaClient } from "@vendia/client"

const client = createVendiaClient({
    apiUrl: `https://b7f2pufdwa.execute-api.us-west-2.amazonaws.com/graphql/`,
    websocketUrl: `wss://7b4w23emaj.execute-api.us-west-2.amazonaws.com/graphql`,
    apiKey: '9nwfZDdjGmTv9A1gmUGGZuPXsNfippn1KdhXTFbHevrG',
})

const {entities} = client;

const useFDA = () => {
    return {entities};
}


export default useFDA;
