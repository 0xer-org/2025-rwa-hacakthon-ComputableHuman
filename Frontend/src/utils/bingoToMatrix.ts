import { BingoGoal } from "@/data/bingoGoals";

/**
 * 将 Bingo 数据转换为 16x16 矩阵
 * 矩阵编码格式：
 * - 前 N 行存储目标完成情况（N = gridSize）
 * - 每个目标占用一个位置，值为 rating (0-3)
 * - 其余位置填充 0
 * 
 * @param goals - 目标列表
 * @param ratings - 目标评分 Map
 * @param gridSize - 网格大小 (4 或 5)
 * @returns 16x16 矩阵 (vector<vector<u8>>)
 */
export function bingoToMatrix(
  goals: BingoGoal[],
  ratings: Map<string, number>,
  gridSize: number
): number[][] {
  // 初始化 16x16 矩阵，所有元素为 0
  const matrix: number[][] = Array(16).fill(null).map(() => Array(16).fill(0));
  
  // 将 bingo 数据编码到矩阵的前 N 行
  for (let i = 0; i < goals.length && i < gridSize * gridSize; i++) {
    const goal = goals[i];
    const rating = ratings.get(goal.id) || 0;
    
    // 计算在矩阵中的位置
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    
    // 确保不超过矩阵范围
    if (row < 16 && col < 16) {
      matrix[row][col] = rating;
    }
  }
  
  // 在矩阵的最后一行存储元数据（可选）
  // 第 15 行：
  // - matrix[15][0] = gridSize (4 或 5)
  // - matrix[15][1] = category ID 的编码
  // - matrix[15][2] = subcategory ID 的编码（如果有）
  
  return matrix;
}

/**
 * 将矩阵转换为 Sui Move 合约需要的格式
 * 确保所有值为 u8 (0-255)
 */
export function matrixToU8Array(matrix: number[][]): number[][] {
  return matrix.map(row => 
    row.map(val => {
      // 确保值在 0-255 范围内
      if (val < 0) return 0;
      if (val > 255) return 255;
      return Math.floor(val);
    })
  );
}

