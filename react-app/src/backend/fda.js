import { createVendiaClient } from "@vendia/client"

import createACLs from "./utils";

const client = createVendiaClient({
    apiUrl: `https://6la8kgwfyj.execute-api.us-west-1.amazonaws.com/graphql/`,
    websocketUrl: `wss://r3lsh57mye.execute-api.us-west-1.amazonaws.com/graphql`,
    apiKey: 'GeHbtewtbrKY5DabamwCdSVqQbZwcPND4LTYZsDfueL9',
})

const {entities} = client;

const useFDA = () => {
    return {entities};
}


export { useFDA };
