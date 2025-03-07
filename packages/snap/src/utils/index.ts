import { createWeb3Name, createPaymentIdName } from '@web3-name-sdk/core';

let web3Name: any;
let paymentIdName: any;

const getWeb3Name = () => {
  //   if (domain.includes('@')) {
  //     if (!paymentIdName) {
  //       console.log('paymentIdName', paymentIdName);
  //       paymentIdName = createPaymentIdName();
  //       return paymentIdName;
  //     }
  //   } else if (!web3Name) {
  //     console.log('web3Name', web3Name);
  //     web3Name = createWeb3Name();
  //     return web3Name;
  //   }
  // };
  if (!web3Name) {
    web3Name = createWeb3Name()
  }
  return web3Name
};

export { getWeb3Name };

const getWeb3PaymentIdName = () => {
  //   if (domain.includes('@')) {
  //     if (!paymentIdName) {
  //       console.log('paymentIdName', paymentIdName);
  //       paymentIdName = createPaymentIdName();
  //       return paymentIdName;
  //     }
  //   } else if (!web3Name) {
  //     console.log('web3Name', web3Name);
  //     web3Name = createWeb3Name();
  //     return web3Name;
  //   }
  // };
  if (!paymentIdName) {
    paymentIdName = createPaymentIdName()
  }
  return paymentIdName
};

export { getWeb3PaymentIdName };