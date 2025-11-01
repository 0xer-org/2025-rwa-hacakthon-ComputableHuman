import { useState, useEffect } from "react";
import { CategoryNavigation } from "@/components/CategoryNavigation";
import { BingoGrid } from "@/components/BingoGrid";
import { categories, getAllGoals } from "@/data/bingoGoals";
import { useToast } from "@/hooks/use-toast";
import { useSignAndExecuteTransaction, useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { bcs } from "@mysten/sui/bcs";
import { bingoToMatrix, matrixToU8Array } from "@/utils/bingoToMatrix";
import { SUI_CONTRACT_CONFIG } from "@/config/suiContract";
import { diagnoseNetwork, formatDiagnosticMessage } from "@/utils/networkDiagnostic";

// 從 localStorage 載入數據的輔助函數
const loadFromLocalStorage = () => {
  try {
    const savedRatings = localStorage.getItem('bingoGoalRatings');
    const savedCompleted = localStorage.getItem('bingoCompletedBingos');
    
    const ratings = savedRatings ? new Map(JSON.parse(savedRatings)) : new Map();
    const completed = savedCompleted ? new Set(JSON.parse(savedCompleted)) : new Set();
    
    return { ratings, completed };
  } catch (error) {
    console.error('載入數據失敗:', error);
    return { ratings: new Map(), completed: new Set() };
  }
};

// 保存數據到 localStorage 的輔助函數
const saveToLocalStorage = (ratings: Map<string, number>, completed: Set<string>) => {
  try {
    localStorage.setItem('bingoGoalRatings', JSON.stringify(Array.from(ratings.entries())));
    localStorage.setItem('bingoCompletedBingos', JSON.stringify(Array.from(completed)));
  } catch (error) {
    console.error('保存數據失敗:', error);
  }
};

const Index = () => {
  const [goalRatings, setGoalRatings] = useState<Map<string, number>>(new Map());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [completedBingos, setCompletedBingos] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const currentAccount = useCurrentAccount();
  const suiClient = useSuiClient();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  // 頁面載入時從 localStorage 讀取數據
  useEffect(() => {
    const { ratings, completed } = loadFromLocalStorage();
    setGoalRatings(ratings);
    setCompletedBingos(new Set(Array.from(completed).filter((item): item is string => typeof item === 'string')));
  }, []);

  const handleGoalClick = (goalId: string) => {
    const currentRating = goalRatings.get(goalId) || 0;
    const newRating = currentRating >= 3 ? 0 : currentRating + 1;
    
    const newRatings = new Map(goalRatings);
    if (newRating === 0) {
      newRatings.delete(goalId);
    } else {
      newRatings.set(goalId, newRating);
      
      const starText = newRating === 1 ? "1星" : newRating === 2 ? "2星" : "3星";
      toast({
        title: `目標達成 ${starText}！`,
        description: "繼續努力實現更多目標！",
      });
    }
    
    setGoalRatings(newRatings);
    // 保存到 localStorage
    saveToLocalStorage(newRatings, completedBingos);
  };

  // 重新開始：只重置當前賓果表的評分，不返回首頁
  const handleRestart = () => {
    const currentBingoKey = getCurrentBingoKey();
    const goals = getCurrentGoals();
    
    // Only clear ratings for goals in the current bingo
    const newRatings = new Map(goalRatings);
    goals.forEach(goal => {
      newRatings.delete(goal.id);
    });
    
    setGoalRatings(newRatings);
    
    // 從完成記錄中移除當前賓果表（因為重新開始了）
    const newCompleted = new Set(completedBingos);
    newCompleted.delete(currentBingoKey);
    setCompletedBingos(newCompleted);
    
    // 保存到 localStorage
    saveToLocalStorage(newRatings, newCompleted);
    
    toast({
      title: "重新開始",
      description: "已重置當前賓果表，開始新的挑戰！",
    });
  };

  // 再玩一張：返回首頁選擇新的賓果表
  const handleReset = () => {
    const currentBingoKey = getCurrentBingoKey();
    const goals = getCurrentGoals();
    
    // 如果當前賓果表已完成，保留評分記錄；如果未完成，則清除評分
    const isCurrentBingoCompleted = completedBingos.has(currentBingoKey);
    
    const newRatings = new Map(goalRatings);
    if (!isCurrentBingoCompleted) {
      // 只有未完成的賓果表才清除評分
      goals.forEach(goal => {
        newRatings.delete(goal.id);
      });
    }
    // 如果已完成，保留所有評分記錄
    
    setGoalRatings(newRatings);
    // 注意：不要刪除 completedBingos 中的記錄，因為「再玩一張」應該保留完成記錄
    // const newCompleted = new Set(completedBingos);
    // newCompleted.delete(currentBingoKey);
    // setCompletedBingos(newCompleted);
    
    // 保存到 localStorage（保持完成記錄不變）
    saveToLocalStorage(newRatings, completedBingos);
    
    // 返回首頁
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    
    toast({
      title: "重置完成",
      description: "已返回首頁，選擇新的賓果表開始遊戲！",
    });
  };

  const handleComplete = async () => {
    const currentBingoKey = getCurrentBingoKey();
    const goals = getCurrentGoals();
    const gridSize = getCurrentGridSize();
    
    // 检查钱包是否已连接
    if (!currentAccount) {
      toast({
        title: "請先連接錢包",
        description: "完成賓果前需要先連接您的 Sui 錢包。",
        variant: "destructive"
      });
      return;
    }
    
    // 验证 Registry ID 是否已配置
    const registryIdToUse = SUI_CONTRACT_CONFIG.REGISTRY_ID;
    
    if (!registryIdToUse || registryIdToUse === '0xYOUR_REGISTRY_ID' || !registryIdToUse.startsWith('0x') || registryIdToUse.length < 66) {
      toast({
        title: "配置錯誤",
        description: "Registry Object ID 尚未配置。請先設置 REGISTRY_ID。詳見 FIND_REGISTRY_ID.md",
        variant: "destructive",
        duration: 5000,
      });
      
      // 即使没有链上交易，也更新本地状态
      const newCompleted = new Set(completedBingos);
      newCompleted.add(currentBingoKey);
      setCompletedBingos(newCompleted);
      saveToLocalStorage(goalRatings, newCompleted);
      
      toast({
        title: "已保存到本地",
        description: "完成記錄已保存到本地。請配置 Registry ID 後可記錄到鏈上。",
      });
      return;
    }
    
    try {
      // 0. 执行网络诊断
      console.log('執行網路診斷...');
      const diagnostic = await diagnoseNetwork(
        suiClient,
        SUI_CONTRACT_CONFIG.PACKAGE_ID,
        registryIdToUse,
        currentAccount?.address
      );
      
      console.log('診斷結果:', diagnostic);
      console.log('診斷訊息:', formatDiagnosticMessage(diagnostic));
      
      // 如果有嚴重錯誤，顯示詳細診斷資訊
      if (!diagnostic.packageExists || !diagnostic.registryExists) {
        toast({
          title: "網路診斷失敗",
          description: formatDiagnosticMessage(diagnostic),
          variant: "destructive",
          duration: 10000,
        });
        return;
      }
      
      // 1. 将 bingo 数据转换为 16x16 矩阵
      const matrix = bingoToMatrix(goals, goalRatings, gridSize);
      const u8Matrix = matrixToU8Array(matrix);
      
      // 2. 创建交易
      const tx = new Transaction();
      
      // 3. 调用合约的 mint_or_update_sbt 函数
      // 将矩阵转换为 vector<vector<u8>> 格式
      const matrixVector = u8Matrix.map(row => 
        row.map(val => Number(val))
      );
      
      // 使用 BCS 序列化 vector<vector<u8>>
      // 创建嵌套向量类型：vector<vector<u8>>
      const vectorU8Type = bcs.vector(bcs.u8());
      const vectorVectorU8Type = bcs.vector(vectorU8Type);
      const serializedMatrix = vectorVectorU8Type.serialize(matrixVector);
      
      tx.moveCall({
        target: `${SUI_CONTRACT_CONFIG.PACKAGE_ID}::${SUI_CONTRACT_CONFIG.MODULE_NAME}::${SUI_CONTRACT_CONFIG.FUNCTION_NAME}`,
        arguments: [
          // registry: &mut SBTRegistry (共享对象)
          tx.object(registryIdToUse),
          // matrix_data: vector<vector<u8>> (使用 BCS 序列化的数据)
          tx.pure(serializedMatrix.toBytes()),
        ],
      });
      
      // 4. 签名并执行交易
      signAndExecuteTransaction(
        {
          transaction: tx,
        },
        {
          onSuccess: (result) => {
            console.log('链上交易成功:', result);
            
            // 5. 更新本地状态
            const newCompleted = new Set(completedBingos);
            newCompleted.add(currentBingoKey);
            setCompletedBingos(newCompleted);
            
            // 6. 保存到 localStorage
            saveToLocalStorage(goalRatings, newCompleted);
            
            toast({
              title: "恭喜完成賓果！",
              description: "你的完成記錄已成功記錄在鏈上！",
            });
          },
          onError: (error) => {
            console.error('链上交易失败:', error);
            console.error('Error details:', error);
            
            // 更詳細的錯誤訊息
            let errorMessage = "請稍後重試";
            const errorString = error.message || String(error);
            
            if (errorString.includes("object does not exist") || errorString.includes("packaged object doesn't exist")) {
              errorMessage = "合約物件不存在，請檢查網路連線是否為 Testnet";
            } else if (errorString.includes("Insufficient gas")) {
              errorMessage = "Gas 不足，請確保錢包有足夠 SUI";
            } else if (errorString.includes("Transaction rejected")) {
              errorMessage = "交易被拒絕，請重新嘗試";
            } else if (errorString.includes("Network mismatch")) {
              errorMessage = "網路不匹配，請確保錢包連接到 Testnet";
            }
            
            toast({
              title: "鏈上記錄失敗",
              description: errorMessage,
              variant: "destructive"
            });
          },
        }
      );
    } catch (error) {
      console.error('调用合约失败:', error);
      toast({
        title: "保存失敗",
        description: error instanceof Error ? error.message : "請稍後重試",
        variant: "destructive"
      });
    }
  };

  const getCurrentBingoKey = () => {
    if (!selectedCategory) return '';
    return selectedSubcategory ? `${selectedCategory}-${selectedSubcategory}` : selectedCategory;
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
  };

  const handleSubcategorySelect = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
  };

  const handleBack = () => {
    if (selectedSubcategory) {
      setSelectedSubcategory(null);
    } else {
      setSelectedCategory(null);
    }
  };

  const handleBackToHome = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  const currentCategory = selectedCategory ? categories.find(c => c.id === selectedCategory) : null;
  const isShowingGrid = selectedCategory && (!currentCategory?.subcategories || selectedSubcategory);

  const getCurrentGoals = () => {
    if (!selectedCategory) return [];
    return getAllGoals(selectedCategory, selectedSubcategory || undefined);
  };

  const getCurrentGridSize = () => {
    if (!currentCategory) return 5;
    if (selectedSubcategory && currentCategory.subcategories) {
      const subcategory = currentCategory.subcategories.find(s => s.id === selectedSubcategory);
      return subcategory?.gridSize || 4;
    }
    return currentCategory.gridSize;
  };

  const getCurrentSubcategoryName = () => {
    if (!selectedSubcategory || !currentCategory?.subcategories) return undefined;
    const subcategory = currentCategory.subcategories.find(s => s.id === selectedSubcategory);
    return subcategory?.name;
  };

  const getCompletionStatus = () => {
    const status = new Map<string, { completed: number; total: number }>();
    
    categories.forEach(category => {
      if (category.subcategories) {
        let completedSubs = 0;
        category.subcategories.forEach(sub => {
          const subKey = `${category.id}-${sub.id}`;
          const isCompleted = completedBingos.has(subKey);
          status.set(subKey, { completed: isCompleted ? 1 : 0, total: 1 });
          if (isCompleted) completedSubs++;
        });
        status.set(category.id, { completed: completedSubs, total: category.subcategories.length });
      } else {
        const isCompleted = completedBingos.has(category.id);
        status.set(category.id, { completed: isCompleted ? 1 : 0, total: 1 });
      }
    });
    
    return status;
  };

  return (
    <div className="min-h-screen p-4">
      {!isShowingGrid ? (
        <CategoryNavigation
          categories={categories}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          onCategorySelect={handleCategorySelect}
          onSubcategorySelect={handleSubcategorySelect}
          onBack={handleBack}
          completionStatus={getCompletionStatus()}
          completedBingos={completedBingos}
        />
      ) : (
        currentCategory && (
          <BingoGrid
            goals={getCurrentGoals()}
            ratings={goalRatings}
            onGoalClick={handleGoalClick}
            onReset={handleReset}
            onRestart={handleRestart}
            onBack={handleBack}
            onBackToHome={handleBackToHome}
            category={currentCategory}
            subcategoryName={getCurrentSubcategoryName()}
            gridSize={getCurrentGridSize()}
            isCompleted={completedBingos.has(getCurrentBingoKey())}
            onComplete={handleComplete}
          />
        )
      )}
    </div>
  );
};

export default Index;