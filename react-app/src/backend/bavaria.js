import { createVendiaClient } from "@vendia/client"

import createACLs from "./utils";

const client = createVendiaClient({
    apiUrl: `https://3cb2tlba0h.execute-api.us-west-1.amazonaws.com/graphql/`,
    websocketUrl: `wss://dv7my1rwke.execute-api.us-west-1.amazonaws.com/graphql`,
    apiKey: 'EXcfZ9uxsViXRGUHeRZx7rWu5P5qwc4wLfvD9DTzutcH',
})

const {entities} = client;

const useBavaria = () => {
    return {entities};
}


export { useBavaria };
