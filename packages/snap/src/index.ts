import type { OnNameLookupHandler } from '@metamask/snaps-sdk';

import { getWeb3Name } from './utils';

export const onNameLookup: OnNameLookupHandler = async ({
  chainId,
  domain,
  address,
}) => {
  const web3Name = getWeb3Name();
  console.log('onNameLookup22', { chainId, domain, address });
  try {
    if (domain) {
      const tld = domain.split('.').pop();
      if (!tld || tld.length < 3) {
        return null;
      }
      // eslint-disable-next-line no-restricted-globals
      console.log(window.ethereum);
      const res = await web3Name.getAddress('spaceid.bnb', {
        rpcUrl: 'https://arb1.arbitrum.io/rpc',
      });
      console.log('onNameLookup res11', domain, res);
      if (res) {
        return { resolvedAddress: res };
      }
    }
    // if (address) {
    //   return null;
    // }
    return null;
  } catch (error: any) {
    console.log('onNameLookup error', error);
    return null;
  }
};
