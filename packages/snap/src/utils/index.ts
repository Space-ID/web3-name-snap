import { createWeb3Name, createPaymentIdName } from '@web3-name-sdk/core';

export const getUserAddress = async (): Promise<string | null> => {
  try {
    if (!(window as any).ethereum) {
      return null;
    }
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts.length > 0 ? accounts[0] : null;
  } catch (error: any) {
    console.error("error:", error);
    return null;
  }
};



const sendGAEvent = async (eventName: string, params: Record<string, any>) => {
  try {
    const response = await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=G-H1G00YNWXE&api_secret=Q4cyL5rzTkuRDL2hD1F6KQ`, {
      method: 'POST',
      body: JSON.stringify({
        client_id: '123.456',
        events: [{ name: eventName, params }]
      }),
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors',
    });
    if (!response.ok) {
      console.error('Google Analytics Request Failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error sending Google Analytics event:', error);
  }
};

let web3Name: any;
let paymentIdName: any;

const getWeb3Name = () => {
  if (!web3Name) {
    web3Name = createWeb3Name()
  }
  return web3Name
};

const getWeb3PaymentIdName = () => {
  if (!paymentIdName) {
    paymentIdName = createPaymentIdName()
  }
  return paymentIdName
};

export { getWeb3Name, getWeb3PaymentIdName, sendGAEvent };
