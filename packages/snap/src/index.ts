import type { OnNameLookupHandler } from '@metamask/snaps-sdk';

import { getWeb3Name } from './utils';

export const onNameLookup: OnNameLookupHandler = async ({ domain }) => {
  if (!domain) return null;
  const web3Name = getWeb3Name(domain);
  console.log('domain', domain);
  try {
    if (domain) {
      const tld = domain.split('.').pop();
      if (!tld) {
        return null;
      }
      const res = domain.includes('@') ? await web3Name.getAddress({ name: domain, chainId: 1 }) : await web3Name.getAddress(domain)
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
