import { useSuiClientQuery } from '@mysten/dapp-kit';
import { SUI_CONTRACT_CONFIG } from '@/config/suiContract';

/**
 * 查找 SBTRegistry 共享对象的 ID
 * 可以通过查询 Package 部署时创建的对象来找到
 */
export async function findRegistryId(client: any): Promise<string | null> {
  try {
    // 方法 1: 查询所有共享对象
    const result = await client.queryObjects({
      filter: {
        StructType: `${SUI_CONTRACT_CONFIG.PACKAGE_ID}::${SUI_CONTRACT_CONFIG.MODULE_NAME}::SBTRegistry`
      },
      options: {
        showType: true,
        showOwner: true,
        showContent: true,
      }
    });

    if (result.data && result.data.length > 0) {
      // 查找共享对象（owner 类型为 Shared）
      const sharedRegistry = result.data.find((obj: any) => 
        obj.data?.owner?.Shared !== undefined
      );
      
      if (sharedRegistry) {
        return sharedRegistry.data.objectId;
      }
    }

    // 方法 2: 如果没有找到，返回 null
    return null;
  } catch (error) {
    console.error('查找 Registry ID 失败:', error);
    return null;
  }
}

/**
 * Hook 版本：在组件中使用
 */
export function useFindRegistryId() {
  const { data, isLoading, error } = useSuiClientQuery(
    'queryObjects',
    {
      filter: {
        StructType: `${SUI_CONTRACT_CONFIG.PACKAGE_ID}::${SUI_CONTRACT_CONFIG.MODULE_NAME}::SBTRegistry`
      },
      options: {
        showType: true,
        showOwner: true,
        showContent: true,
      }
    },
    {
      enabled: !!SUI_CONTRACT_CONFIG.PACKAGE_ID && SUI_CONTRACT_CONFIG.PACKAGE_ID !== '0xYOUR_PACKAGE_ID',
    }
  );

  const registryId = data?.data?.find((obj: any) => 
    obj.data?.owner?.Shared !== undefined
  )?.data?.objectId || null;

  return { registryId, isLoading, error };
}

