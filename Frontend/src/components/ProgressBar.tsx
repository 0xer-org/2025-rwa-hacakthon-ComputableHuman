import { cn } from "@/lib/utils";
import { Trophy, Gift } from "lucide-react";
import { useState, useEffect } from "react";
import NotificationModal from "@/components/NotificationModal";

interface ProgressBarProps {
  completed: number;
  total: number;
  className?: string;
}

export const ProgressBar = ({ completed, total, className }: ProgressBarProps) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isComplete = completed === total && total > 0;
  const hasReachedMilestone = completed >= 5; // 達到5/15里程碑
  
  // 通知彈窗狀態
  const [showNotification, setShowNotification] = useState(false);
  
  // 檢查用戶是否已經看過里程碑通知（使用 localStorage 持久化）
  const hasSeenMilestoneNotification = () => {
    return localStorage.getItem('hasSeenMilestoneNotification') === 'true';
  };

  // 標記用戶已看過里程碑通知
  const markMilestoneNotificationAsSeen = () => {
    localStorage.setItem('hasSeenMilestoneNotification', 'true');
  };

  // 監聽達成5格里程碑
  useEffect(() => {
    if (completed >= 5 && !hasSeenMilestoneNotification()) {
      setShowNotification(true);
      markMilestoneNotificationAsSeen();
    }
  }, [completed]);

  // 生成漸層顏色 - 從紅色到紫色的彩虹漸層
  const getSegmentColor = (index: number) => {
    const colors = [
      "from-red-400 to-red-500",      // 第1格 - 紅色
      "from-orange-400 to-orange-500", // 第2格 - 橙色
      "from-yellow-400 to-yellow-500", // 第3格 - 黃色
      "from-lime-400 to-lime-500",     // 第4格 - 青檸色
      "from-green-400 to-green-500",   // 第5格 - 綠色
      "from-emerald-400 to-emerald-500", // 第6格 - 翠綠色
      "from-teal-400 to-teal-500",     // 第7格 - 青綠色
      "from-cyan-400 to-cyan-500",     // 第8格 - 青色
      "from-sky-400 to-sky-500",       // 第9格 - 天藍色
      "from-blue-400 to-blue-500",     // 第10格 - 藍色
      "from-indigo-400 to-indigo-500", // 第11格 - 靛藍色
      "from-violet-400 to-violet-500", // 第12格 - 紫羅蘭色
      "from-purple-400 to-purple-500", // 第13格 - 紫色
      "from-fuchsia-400 to-fuchsia-500", // 第14格 - 紫紅色
      "from-pink-400 to-pink-500"      // 第15格 - 粉色
    ];
    return colors[index] || "from-gray-400 to-gray-500";
  };

  // 生成15格進度條
  const renderProgressSegments = () => {
    const segments = [];
    for (let i = 0; i < total; i++) {
      const isCompleted = i < completed;
      const isMilestone = i === 4; // 第5格（索引4）是里程碑
      const segmentColor = getSegmentColor(i);
      
      segments.push(
        <div
          key={i}
          className={cn(
            "flex-1 h-4 border-r border-white/30 last:border-r-0 transition-all duration-500 relative flex items-center justify-center",
            isCompleted 
              ? `bg-gradient-to-b ${segmentColor}` 
              : "bg-white/20"
          )}
        >
          {isMilestone && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Gift className={cn(
                "w-3 h-3 animate-pulse",
                completed >= 5 ? "text-yellow-300" : "text-white/80"
              )} />
            </div>
          )}
        </div>
      );
    }
    return segments;
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isComplete && <Trophy className="w-6 h-6 text-yellow-500 animate-bounce" />}
          {hasReachedMilestone && !isComplete && <Gift className="w-6 h-6 text-pink-500 animate-pulse" />}
          <span className="text-sm font-medium text-white/90">
            整體進度: {completed}/{total}
          </span>
        </div>
        {isComplete && (
          <div className="text-xs text-white/70 animate-fade-in">
            🎉 恭喜完成所有賓果！
          </div>
        )}
        {hasReachedMilestone && !isComplete && (
          <div className="text-xs text-white/70 animate-fade-in">
            🎁 達成里程碑！
          </div>
        )}
      </div>
      
      {/* 15格分段進度條 */}
      <div className="w-full bg-white/20 rounded-lg h-4 overflow-hidden backdrop-blur-sm border border-white/30 flex relative">
        {renderProgressSegments()}
      </div>
      
      {/* 通知彈窗 */}
      <NotificationModal 
        isOpen={showNotification} 
        onClose={() => setShowNotification(false)} 
      />
    </div>
  );
};