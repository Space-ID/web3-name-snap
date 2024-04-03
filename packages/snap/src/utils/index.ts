import { createWeb3Name } from '@web3-name-sdk/core';

let web3Name: any;
const getWeb3Name = () => {
  if (!web3Name) {
    web3Name = createWeb3Name();
  }
  return web3Name;
};

export { getWeb3Name };
