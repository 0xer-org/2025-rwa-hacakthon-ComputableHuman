import { useState, useEffect } from "react";
import { CategoryNavigation } from "@/components/CategoryNavigation";
import { BingoGrid } from "@/components/BingoGrid";
import { categories, getAllGoals } from "@/data/bingoGoals";
import { useToast } from "@/hooks/use-toast";

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

  // 頁面載入時從 localStorage 讀取數據
  useEffect(() => {
    const { ratings, completed } = loadFromLocalStorage();
    setGoalRatings(ratings);
    setCompletedBingos(completed);
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
    
    let newRatings = new Map(goalRatings);
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

  const handleComplete = () => {
    const currentBingoKey = getCurrentBingoKey();
    const newCompleted = new Set(completedBingos);
    newCompleted.add(currentBingoKey);
    setCompletedBingos(newCompleted);
    
    // 保存到 localStorage
    saveToLocalStorage(goalRatings, newCompleted);
    
    toast({
      title: "恭喜完成賓果！",
      description: "你已經完成了這個賓果表！",
    });
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