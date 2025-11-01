/**
 * 網路診斷工具
 * 用於檢查錢包和合約的網路狀態
 */

import { SuiClient } from '@mysten/sui/client';

export interface NetworkDiagnostic {
  network: string;
  packageExists: boolean;
  registryExists: boolean;
  walletConnected: boolean;
  walletNetwork?: string;
  errors: string[];
}

export async function diagnoseNetwork(
  suiClient: SuiClient,
  packageId: string,
  registryId: string,
  walletAddress?: string
): Promise<NetworkDiagnostic> {
  const diagnostic: NetworkDiagnostic = {
    network: 'unknown',
    packageExists: false,
    registryExists: false,
    walletConnected: !!walletAddress,
    errors: []
  };

  try {
    // 1. 檢查網路
    const chainId = await suiClient.getChainIdentifier();
    diagnostic.network = chainId;

    // 2. 檢查 Package 是否存在
    try {
      const packageInfo = await suiClient.getObject({
        id: packageId,
        options: { showContent: true }
      });
      diagnostic.packageExists = !!packageInfo.data;
      
      if (!packageInfo.data) {
        diagnostic.errors.push(`Package ${packageId} 不存在於 ${chainId} 網路`);
      }
    } catch (error) {
      diagnostic.errors.push(`無法檢查 Package: ${error}`);
    }

    // 3. 檢查 Registry 是否存在
    try {
      const registryInfo = await suiClient.getObject({
        id: registryId,
        options: { showContent: true }
      });
      diagnostic.registryExists = !!registryInfo.data;
      
      if (!registryInfo.data) {
        diagnostic.errors.push(`Registry ${registryId} 不存在於 ${chainId} 網路`);
      }
    } catch (error) {
      diagnostic.errors.push(`無法檢查 Registry: ${error}`);
    }

    // 4. 檢查錢包餘額（如果連接）
    if (walletAddress) {
      try {
        const balance = await suiClient.getBalance({
          owner: walletAddress,
          coinType: '0x2::sui::SUI'
        });
        
        const suiBalance = Number(balance.totalBalance) / 1_000_000_000; // Convert MIST to SUI
        if (suiBalance < 0.1) {
          diagnostic.errors.push(`錢包餘額不足: ${suiBalance.toFixed(4)} SUI (建議至少 0.1 SUI)`);
        }
      } catch (error) {
        diagnostic.errors.push(`無法檢查錢包餘額: ${error}`);
      }
    }

  } catch (error) {
    diagnostic.errors.push(`網路診斷失敗: ${error}`);
  }

  return diagnostic;
}

export function formatDiagnosticMessage(diagnostic: NetworkDiagnostic): string {
  const messages = [];
  
  messages.push(`🌐 網路: ${diagnostic.network}`);
  messages.push(`📦 Package: ${diagnostic.packageExists ? '✅' : '❌'}`);
  messages.push(`📋 Registry: ${diagnostic.registryExists ? '✅' : '❌'}`);
  messages.push(`👛 錢包: ${diagnostic.walletConnected ? '✅' : '❌'}`);
  
  if (diagnostic.errors.length > 0) {
    messages.push('\n⚠️ 問題:');
    diagnostic.errors.forEach(error => {
      messages.push(`• ${error}`);
    });
  }
  
  return messages.join('\n');
}