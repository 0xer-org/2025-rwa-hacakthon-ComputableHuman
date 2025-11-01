/**
 * Sui 合約配置
 * 已配置為 testnet 部署
 */

// Package ID - 已部署在 testnet
// https://testnet.suivision.xyz/package/0x5f8fd9b16bda275432e9287ee19aa4f231c91dda19d430b4cbd5a78b6a7ed87d
export const SUI_CONTRACT_CONFIG = {
  // Package ID - 部署合約後獲得的 package ID
  PACKAGE_ID: import.meta.env.VITE_SUI_PACKAGE_ID || '0x5f8fd9b16bda275432e9287ee19aa4f231c91dda19d430b4cbd5a78b6a7ed87d',
  
  // Registry Object ID - 部署時創建的共享對象 ID
  REGISTRY_ID: import.meta.env.VITE_SUI_REGISTRY_ID || '0x4bab473700931c08bd96ba8327a02089b8ab4ffc22cd54537cf43e4e4f191b88',
  
  // 合約模組和函數
  MODULE_NAME: 'matrix_sbt',
  FUNCTION_NAME: 'mint_or_update_sbt',
  
  // 網路配置
  NETWORK: 'testnet',
} as const;

