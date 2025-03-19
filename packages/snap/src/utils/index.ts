import { createWeb3Name, createPaymentIdName } from '@web3-name-sdk/core';
import { ethers } from 'ethers';


// export const getUserAddress = async (): Promise<string | null> => {
//   try {
//     if (!(window as any).ethereum) {
//       console.error("MetaMask Snap 没有 `ethereum-provider` 权限");
//       return null;
//     }

//     // 直接请求账户，不要使用 `wallet_requestPermissions`
//     const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });

//     console.error("用户地址:", accounts);

//     return accounts.length > 0 ? accounts[0] : null;
//   } catch (error) {
//     console.error("获取 MetaMask 地址失败了吗:", error);
//     return null;
//   }
// };


export const getUserAddress = async (): Promise<string | null> => {
  try {
    if (!(window as any).ethereum) {
      console.error("MetaMask Snap 没有 `ethereum-provider` 权限");
      return null;
    }

    // 检查是否已有挂起的请求
    const permissions = await (window as any).ethereum.request({
      method: "wallet_getPermissions",
    });

    if (permissions && permissions.some((perm: any) => perm.parentCapability === "eth_accounts")) {
      console.log("已有 eth_accounts 权限，直接获取账户");
    } else {
      console.log("没有权限，发起请求");
    }

    // 请求账户
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log("用户地址:", accounts);
    return accounts.length > 0 ? accounts[0] : null;
  } catch (error: any) {
    if (error.code === -32002) {
      console.warn("已有挂起的请求，请等待用户操作");
    } else {
      console.error("获取 MetaMask 地址失败:", error);
    }
    return null;
  }
};



const sendGAEvent = async (eventName: string, params: Record<string, any>) => {

  try {
    const response = await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=G-H1G00YNWXE&api_secret=Q4cyL5rzTkuRDL2hD1F6KQ`, {
      method: 'POST',
      body: JSON.stringify({
        client_id: '123.456',
        events: [{ name: eventName, params }]
      }),
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors',
    });
    if (!response.ok) {
      console.error('Google Analytics Request Failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error sending Google Analytics event:', error);
  }
};

let web3Name: any;
let paymentIdName: any;

const getWeb3Name = () => {
  if (!web3Name) {
    web3Name = createWeb3Name()
    sendGAEvent('oldVersion', {})
  }
  return web3Name
};

const getWeb3PaymentIdName = () => {
  if (!paymentIdName) {
    paymentIdName = createPaymentIdName()
    sendGAEvent('newVersion', {})
  }
  return paymentIdName
};

export { getWeb3Name, getWeb3PaymentIdName, sendGAEvent };
