
import type { OnNameLookupHandler } from '@metamask/snaps-sdk';

import { getWeb3Name, getWeb3PaymentIdName } from './utils';

export const onNameLookup: OnNameLookupHandler = async ({ domain }) => {

  // const web3Name = getWeb3Name();
  if (!domain) return null;


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
        console.log('!tld', tld);
        return null;
      }
      console.log('tld', tld);
      const res = domain.includes('@')
        ? await web3Name.getAddress({ name: domain, chainId: 1 })
        : await web3Name.getAddress();
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

// export const onNameLookup: OnNameLookupHandler = async ({ domain }) => {
//   const web3Name = getWeb3Name();
//   console.log('domain', domain, web3Name);
//   try {
//     if (domain) {
//       const tld = domain.split('.').pop();
//       if (!tld) {
//         console.log('!tld', tld);
//         return null;
//       }
//       console.log('tld', tld);
//       const res = await web3Name.getAddress()
//       console.log('resresres', res);
//       if (res) {
//         return {
//           resolvedAddresses: [
//             { protocol: 'SPACE ID', resolvedAddress: res, domainName: domain },
//           ],
//         };
//       }
//       return null;
//     }
//   } catch (error: any) {
//     return null;
//   }
//   return null;
// };