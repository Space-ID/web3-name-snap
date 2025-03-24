
import type { OnInstallHandler, OnNameLookupHandler } from '@metamask/snaps-sdk';
import { getUserAddress, getWeb3Name, getWeb3PaymentIdName, sendGAEvent } from './utils';

export const onNameLookup: OnNameLookupHandler = async ({ domain }) => {
  if (!domain) return null;
  try {
    let web3Name;
    if (domain.includes('@')) {
      web3Name = getWeb3PaymentIdName();
      sendGAEvent('paymentIdVersion', {})
    } else {
      web3Name = getWeb3Name();
      sendGAEvent('normalVersion', {})
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
        const address = String(await getUserAddress())
        sendGAEvent('ResolveName', { domain, address: `addr_${address}` })
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

export const onInstall: OnInstallHandler = async () => {
  const address = String(await getUserAddress())
  await sendGAEvent('installed', { address: `addr_${address}` })
};