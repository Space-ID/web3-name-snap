import type { OnNameLookupHandler } from '@metamask/snaps-sdk';

import { getWeb3Name } from './utils';

export const onNameLookup: OnNameLookupHandler = async ({
  // chainId,
  domain,
  // address,
}) => {
  const web3Name = getWeb3Name();
  try {
    if (domain) {
      const tld = domain.split('.').pop();
      if (!tld || tld.length < 2) {
        return null;
      }
      const res = await web3Name.getAddress(domain);
      if (res) {
        return {
          resolvedAddresses: [{ protocol: 'SPACE ID', resolvedAddress: res }],
        };
      }
      return null;
    }
  } catch (error: any) {
    return null;
  }
  return null;
};
