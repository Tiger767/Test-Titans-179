import { createVendiaClient } from "@vendia/client"

const client = createVendiaClient({
    apiUrl: `https://xdpyap1wjk.execute-api.us-west-2.amazonaws.com/graphql/`,
    websocketUrl: `wss://ziyhsguww6.execute-api.us-west-2.amazonaws.com/graphql`,
    apiKey: 'nSfEHrC9ancJSbbBshwmWDK7fhfrbPKzyAFHkYU6Ltw',
})

const {entities} = client;

const useJaneHopkins = () => {
    return {entities};
}


export default useJaneHopkins;
