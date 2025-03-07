import { createWeb3Name, createPaymentIdName } from '@web3-name-sdk/core';


let web3Name: any;
let paymentIdName: any;

const getWeb3Name = (domain: string) => {
  if (domain.includes('@')) {
    if (!paymentIdName) {
      paymentIdName = createPaymentIdName();
      return paymentIdName;
    }

  } else {
    if (!web3Name) {
      web3Name = createWeb3Name();
      return web3Name;
    }

  }
};

export { getWeb3Name };