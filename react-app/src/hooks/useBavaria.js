import { createVendiaClient } from "@vendia/client"

const client = createVendiaClient({
    apiUrl: `https://sz2afyu4ei.execute-api.us-west-2.amazonaws.com/graphql/`,
    websocketUrl: `wss://yimqwfkysg.execute-api.us-west-2.amazonaws.com/graphql`,
    apiKey: 'Xj8bizQsH4mVCf5UehHtzmRRKG7mHpozfFNmrst9y1H',
})

const {entities} = client;

const useBavaria = () => {
    return {entities};
}


export default useBavaria;
