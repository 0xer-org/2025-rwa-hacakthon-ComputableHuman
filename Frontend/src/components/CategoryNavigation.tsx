import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BingoCategory } from "@/data/bingoGoals";
import { ProgressBar } from "@/components/ProgressBar";
import { WalletConnectButton } from "@/components/WalletConnectButton";

interface CategoryNavigationProps {
  categories: BingoCategory[];
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onCategorySelect: (categoryId: string) => void;
  onSubcategorySelect: (subcategoryId: string) => void;
  onBack: () => void;
  completionStatus: Map<string, { completed: number; total: number }>;
  completedBingos: Set<string>;
}

export const CategoryNavigation = ({
  categories,
  selectedCategory,
  selectedSubcategory,
  onCategorySelect,
  onSubcategorySelect,
  onBack,
  completionStatus,
  completedBingos,
}: CategoryNavigationProps) => {
  const getCategoryIconBg = (categoryId: string) => {
    switch (categoryId) {
      case "finance": return "bg-green-500";
      case "travel": return "bg-blue-500";
      case "lifestyle": return "bg-purple-500";
      case "learning": return "bg-pink-500";
      case "relationships": return "bg-slate-500";
      default: return "bg-blue-500";
    }
  };

  // 主類別選擇畫面
  if (!selectedCategory) {
    // 計算整體進度 - 改為計算賓果表張數
    const getTotalBingoCount = () => {
      let totalCount = 0;
      let completedCount = 0;
      
      categories.forEach(category => {
        if (category.subcategories) {
          // 有子類別的情況 - 每個子類別算一張賓果表
          category.subcategories.forEach(sub => {
            const subKey = `${category.id}-${sub.id}`;
            totalCount += 1; // 每個子類別算一張賓果表
            
            if (completedBingos.has(subKey)) {
              completedCount += 1; // 完成一張賓果表
            }
          });
        } else {
          // 沒有子類別的情況 - 整個類別算一張賓果表
          totalCount += 1; // 每個類別算一張賓果表
          
          if (completedBingos.has(category.id)) {
            completedCount += 1; // 完成一張賓果表
          }
        }
      });
      
      return { totalCount, completedCount };
    };
    
    const { totalCount, completedCount } = getTotalBingoCount();
    const totalCompleted = completedCount;
    const totalBingos = totalCount;

    return (
      <div className="flex flex-col min-h-screen">
        <header className="p-4 bg-black/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-xl font-bold text-white text-center">許願BINGO</h1>
          </div>
          <ProgressBar 
            completed={totalCompleted} 
            total={totalBingos} 
            className="mb-2"
          />
        </header>
        <main className="flex-grow p-4">
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                className={cn(
                  "flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-3xl shadow-sm",
                  "transition-transform active:scale-95 space-y-3 aspect-square",
                  "border border-white/15 hover:bg-white/20"
                )}
                onClick={() => onCategorySelect(category.id)}
              >
                <div className={cn(
                  "flex items-center justify-center w-16 h-16 rounded-full",
                  getCategoryIconBg(category.id)
                )}>
                  <span className="material-icons text-white text-3xl">{category.icon}</span>
                </div>
                <div className="text-center">
                  <p className="font-bold text-white">{category.name}</p>
                  <p className="text-sm text-white/70">
                    {completionStatus.get(category.id)?.completed || 0}/{completionStatus.get(category.id)?.total || (category.subcategories?.length || 1)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </main>
        {/* Wallet Connection Section - Fixed Bottom */}
        <div className="fixed bottom-0 left-0 right-0 z-30 p-4">
          <div className="max-w-md mx-auto">
            <div className="pt-4 border-t border-white/10">
              <div className="flex flex-col items-center gap-3">
                <p className="text-sm text-white/70 mb-1">連接錢包以完成賓果</p>
                <WalletConnectButton />
              </div>
            </div>
          </div>
        </div>
        {/* Add bottom padding to prevent content being hidden behind wallet section */}
        <div className="h-32"></div>
      </div>
    );
  }

  const currentCategory = categories.find(c => c.id === selectedCategory);
  
  // 子類別選擇畫面
  if (currentCategory?.subcategories && !selectedSubcategory) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="text-center flex-grow">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-white hover:bg-white/20 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回主選單
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg flex items-center justify-center gap-3">
              <span className="material-icons text-3xl">{currentCategory.icon}</span>
              {currentCategory.name}
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {currentCategory.subcategories.map((subcategory) => (
              <button
                key={subcategory.id}
                className={cn(
                  "p-6 rounded-2xl font-bold text-lg transition-all duration-300",
                  "border border-white/20 backdrop-blur-sm",
                  "hover:scale-105 hover:shadow-xl",
                  "flex flex-col items-center gap-3",
                  currentCategory.className
                )}
                onClick={() => onSubcategorySelect(subcategory.id)}
              >
                <span>{subcategory.name}</span>
                <span className="text-xs font-medium text-white/70">
                  {completionStatus.get(`${selectedCategory}-${subcategory.id}`)?.completed || 0}/1
                </span>
              </button>
            ))}
          </div>
        </div>
        {/* Wallet Connection Section - Fixed Bottom */}
        <div className="fixed bottom-0 left-0 right-0 z-30 p-4">
          <div className="max-w-md mx-auto">
            <div className="pt-4 border-t border-white/10">
              <div className="flex flex-col items-center gap-3">
                <p className="text-sm text-white/70 mb-1">連接錢包以完成賓果</p>
                <WalletConnectButton />
              </div>
            </div>
          </div>
        </div>
        {/* Add bottom padding to prevent content being hidden behind wallet section */}
        <div className="h-32"></div>
      </div>
    );
  }

  return null;
};