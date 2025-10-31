/**
 * Sui 合约配置
 * 请根据实际部署情况更新这些值
 */

// Package ID - 从部署后的信息获取
// https://testnet.suivision.xyz/package/0x5f8fd9b16bda275432e9287ee19aa4f231c91dda19d430b4cbd5a78b6a7ed87d
export const SUI_CONTRACT_CONFIG = {
  // Package ID - 部署合约后获得的 package ID
  PACKAGE_ID: import.meta.env.VITE_SUI_PACKAGE_ID || '0x5f8fd9b16bda275432e9287ee19aa4f231c91dda19d430b4cbd5a78b6a7ed87d',
  
  // Registry Object ID - 部署时创建的共享对象 ID
  // TODO: 需要从部署交易中获取 Registry 共享对象的 ID
  // 可以通过查看部署交易或使用 Sui Explorer 查找创建的共享对象
  REGISTRY_ID: import.meta.env.VITE_SUI_REGISTRY_ID || '0x4bab473700931c08bd96ba8327a02089b8ab4ffc22cd54537cf43e4e4f191b88',
  
  // 合约模块和函数
  MODULE_NAME: 'matrix_sbt',
  FUNCTION_NAME: 'mint_or_update_sbt',
} as const;

