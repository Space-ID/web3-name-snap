import type { OnNameLookupHandler } from '@metamask/snaps-sdk';

import { getWeb3Name } from './utils';

export const onNameLookup: OnNameLookupHandler = async ({ domain }) => {
  if (!domain) {
    return null;
  }
  const web3Name = getWeb3Name(domain);
  console.log('domain', domain, web3Name);
  try {
    if (domain) {
      const tld = domain.split('.').pop();
      if (!tld) {
        console.log('!tld', tld);
        return null;
      }
      console.log('tld', tld);
      const res = domain.includes('@')
        ? await web3Name.getAddress({ name: domain, chainId: 1 })
        : await web3Name.getAddress(domain);
      console.log('resresres', res);
      if (res) {
        return {
          resolvedAddresses: [
            { protocol: 'SPACE ID', resolvedAddress: res, domainName: domain },
          ],
        };
      }
      return null;
    }
  } catch (error: any) {
    return null;
  }
  return null;
};
