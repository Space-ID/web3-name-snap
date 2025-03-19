
import type { OnNameLookupHandler } from '@metamask/snaps-sdk';

import { getUserAddress, getWeb3Name, getWeb3PaymentIdName, sendGAEvent } from './utils';

export const onNameLookup: OnNameLookupHandler = async ({ domain }) => {
  if (!domain) return null;
  const address = await getUserAddress()
  try {
    let web3Name;
    if (domain.includes('@')) {
      web3Name = getWeb3PaymentIdName();
    } else {
      web3Name = getWeb3Name();
    }
    if (!web3Name) return null;
    if (domain) {
      const tld = domain.split('.').pop();
      if (!tld) {
        return null;
      }
      const res = domain.includes('@')
        ? await web3Name.getAddress({ name: domain, chainId: 1 })
        : await web3Name.getAddress(domain);
      if (res) {

        sendGAEvent('userAddr', { domain, address })
      }
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
