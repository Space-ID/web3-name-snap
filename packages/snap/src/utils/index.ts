import { createWeb3Name, createPaymentIdName } from '@web3-name-sdk/core';

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

export { getWeb3Name, getWeb3PaymentIdName };
