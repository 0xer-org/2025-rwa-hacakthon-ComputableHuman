export interface BingoGoal {
  id: string;
  text: string;
  category: string;
  subcategory?: string;
}

export interface BingoCategory {
  id: string;
  name: string;
  icon: string;
  className: string;
  gridSize: number;
  subcategories?: BingoSubcategory[];
}

export interface BingoSubcategory {
  id: string;
  name: string;
  gridSize: number;
  goals: BingoGoal[];
}

// 投資理財 5x5
const financeGoals: BingoGoal[] = [
  { id: "f1", text: "股票", category: "finance" },
  { id: "f2", text: "加密貨幣", category: "finance" },
  { id: "f3", text: "定期存款", category: "finance" },
  { id: "f4", text: "基金", category: "finance" },
  { id: "f5", text: "美股", category: "finance" },
  { id: "f6", text: "房地產", category: "finance" },
  { id: "f7", text: "ETF", category: "finance" },
  { id: "f8", text: "記帳", category: "finance" },
  { id: "f9", text: "期貨交易", category: "finance" },
  { id: "f10", text: "股票配息", category: "finance" },
  { id: "f11", text: "貸款", category: "finance" },
  { id: "f12", text: "儲蓄險", category: "finance" },
  { id: "f13", text: "理財App", category: "finance" },
  { id: "f14", text: "外幣", category: "finance" },
  { id: "f15", text: "信託", category: "finance" },
  { id: "f16", text: "退休基金", category: "finance" },
  { id: "f17", text: "資產配置", category: "finance" },
  { id: "f18", text: "黃金投資", category: "finance" },
  { id: "f19", text: "保險", category: "finance" },
  { id: "f20", text: "數位資產", category: "finance" },
  { id: "f21", text: "當沖", category: "finance" },
  { id: "f22", text: "緊急預備金", category: "finance" },
  { id: "f23", text: "P2P借貸", category: "finance" },
  { id: "f24", text: "債券", category: "finance" },
  { id: "f25", text: "定額定投", category: "finance" },
];

// 夢想旅遊 5x5
const travelGoals: BingoGoal[] = [
  { id: "t1", text: "京都賞櫻", category: "travel" },
  { id: "t2", text: "冰島極光", category: "travel" },
  { id: "t3", text: "巴黎夜景", category: "travel" },
  { id: "t4", text: "高空跳傘", category: "travel" },
  { id: "t5", text: "埃及金字塔", category: "travel" },
  { id: "t6", text: "馬爾地夫蜜月", category: "travel" },
  { id: "t7", text: "非洲動物之旅", category: "travel" },
  { id: "t8", text: "阿爾卑斯滑雪", category: "travel" },
  { id: "t9", text: "土耳其熱氣球", category: "travel" },
  { id: "t10", text: "撒哈拉沙漠", category: "travel" },
  { id: "t11", text: "台灣環島", category: "travel" },
  { id: "t12", text: "大堡礁浮潛", category: "travel" },
  { id: "t13", text: "喜馬拉雅攀登", category: "travel" },
  { id: "t14", text: "聖托里尼拍照", category: "travel" },
  { id: "t15", text: "紐約跨年", category: "travel" },
  { id: "t16", text: "挪威峽灣", category: "travel" },
  { id: "t17", text: "亞馬遜叢林", category: "travel" },
  { id: "t18", text: "加拿大極光", category: "travel" },
  { id: "t19", text: "巴西大瀑布", category: "travel" },
  { id: "t20", text: "紐西蘭湖泊", category: "travel" },
  { id: "t21", text: "羅馬古城", category: "travel" },
  { id: "t22", text: "倫敦眼", category: "travel" },
  { id: "t23", text: "巴塞隆納建築", category: "travel" },
  { id: "t24", text: "上海外灘", category: "travel" },
  { id: "t25", text: "雪梨歌劇院", category: "travel" },
];

// 生活享受子類別
const lifestyleConsumption: BingoGoal[] = [
  { id: "lc1", text: "夢寐奢侈品", category: "lifestyle", subcategory: "consumption" },
  { id: "lc2", text: "擁有自用車", category: "lifestyle", subcategory: "consumption" },
  { id: "lc3", text: "高級家具升級", category: "lifestyle", subcategory: "consumption" },
  { id: "lc4", text: "升級新手機", category: "lifestyle", subcategory: "consumption" },
  { id: "lc5", text: "高級手錶", category: "lifestyle", subcategory: "consumption" },
  { id: "lc6", text: "名牌包包", category: "lifestyle", subcategory: "consumption" },
  { id: "lc7", text: "換全新電腦", category: "lifestyle", subcategory: "consumption" },
  { id: "lc8", text: "高檔餐具", category: "lifestyle", subcategory: "consumption" },
  { id: "lc9", text: "頂級音響", category: "lifestyle", subcategory: "consumption" },
  { id: "lc10", text: "購買大電視", category: "lifestyle", subcategory: "consumption" },
  { id: "lc11", text: "家居裝潢改造", category: "lifestyle", subcategory: "consumption" },
  { id: "lc12", text: "換最新平板", category: "lifestyle", subcategory: "consumption" },
  { id: "lc13", text: "買舒適沙發", category: "lifestyle", subcategory: "consumption" },
  { id: "lc14", text: "擁有咖啡機", category: "lifestyle", subcategory: "consumption" },
  { id: "lc15", text: "升級廚房設備", category: "lifestyle", subcategory: "consumption" },
  { id: "lc16", text: "打造夢幻衣櫥", category: "lifestyle", subcategory: "consumption" },
];

const lifestyleEnjoyment: BingoGoal[] = [
  { id: "le1", text: "精緻餐廳晚餐", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le2", text: "國內小旅行", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le3", text: "季度演唱會", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le4", text: "每月好友聚餐", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le5", text: "年度豪華旅行", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le6", text: "泡溫泉放鬆", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le7", text: "電影首映觀賞", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le8", text: "購物逛街日", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le9", text: "夜市美食之旅", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le10", text: "城市夜景觀光", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le11", text: "探索新餐廳", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le12", text: "週末野餐", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le13", text: "家庭遊樂日", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le14", text: "季節賞花", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le15", text: "戶外健行", category: "lifestyle", subcategory: "enjoyment" },
  { id: "le16", text: "參加音樂會", category: "lifestyle", subcategory: "enjoyment" },
];

const lifestyleHabits: BingoGoal[] = [
  { id: "lh1", text: "每日早起", category: "lifestyle", subcategory: "habits" },
  { id: "lh2", text: "晨間運動", category: "lifestyle", subcategory: "habits" },
  { id: "lh3", text: "每週三次健身", category: "lifestyle", subcategory: "habits" },
  { id: "lh4", text: "每日冥想", category: "lifestyle", subcategory: "habits" },
  { id: "lh5", text: "每週一本書", category: "lifestyle", subcategory: "habits" },
  { id: "lh6", text: "每日靜心五分鐘", category: "lifestyle", subcategory: "habits" },
  { id: "lh7", text: "改善飲食習慣", category: "lifestyle", subcategory: "habits" },
  { id: "lh8", text: "減少糖分攝取", category: "lifestyle", subcategory: "habits" },
  { id: "lh9", text: "增強蔬菜攝取", category: "lifestyle", subcategory: "habits" },
  { id: "lh10", text: "每天八小時睡眠", category: "lifestyle", subcategory: "habits" },
  { id: "lh11", text: "每週一個新食譜", category: "lifestyle", subcategory: "habits" },
  { id: "lh12", text: "每月學新技巧", category: "lifestyle", subcategory: "habits" },
  { id: "lh13", text: "規律運動", category: "lifestyle", subcategory: "habits" },
  { id: "lh14", text: "寫下感恩日記", category: "lifestyle", subcategory: "habits" },
  { id: "lh15", text: "戶外走去走放鬆", category: "lifestyle", subcategory: "habits" },
  { id: "lh16", text: "建立作息規律", category: "lifestyle", subcategory: "habits" },
];

// 學習成長子類別
const learningKnowledge: BingoGoal[] = [
  { id: "lk1", text: "每月讀一本書", category: "learning", subcategory: "knowledge" },
  { id: "lk2", text: "學習新技能", category: "learning", subcategory: "knowledge" },
  { id: "lk3", text: "提升外語會話", category: "learning", subcategory: "knowledge" },
  { id: "lk4", text: "完成線上課程", category: "learning", subcategory: "knowledge" },
  { id: "lk5", text: "了解投資知識", category: "learning", subcategory: "knowledge" },
  { id: "lk6", text: "增強寫作能力", category: "learning", subcategory: "knowledge" },
  { id: "lk7", text: "學習時間管理", category: "learning", subcategory: "knowledge" },
  { id: "lk8", text: "研讀專業期刊", category: "learning", subcategory: "knowledge" },
  { id: "lk9", text: "學習基礎編程", category: "learning", subcategory: "knowledge" },
  { id: "lk10", text: "增進演講技巧", category: "learning", subcategory: "knowledge" },
  { id: "lk11", text: "學習心理學基礎", category: "learning", subcategory: "knowledge" },
  { id: "lk12", text: "提升分析能力", category: "learning", subcategory: "knowledge" },
  { id: "lk13", text: "學習烹飪技巧", category: "learning", subcategory: "knowledge" },
  { id: "lk14", text: "拓展科學知識", category: "learning", subcategory: "knowledge" },
  { id: "lk15", text: "參加讀書會", category: "learning", subcategory: "knowledge" },
  { id: "lk16", text: "建立學習計劃", category: "learning", subcategory: "knowledge" },
];

const learningHealth: BingoGoal[] = [
  { id: "lhc1", text: "完成半馬拉松", category: "learning", subcategory: "health" },
  { id: "lhc2", text: "每週兩次健身", category: "learning", subcategory: "health" },
  { id: "lhc3", text: "減少糖分攝取", category: "learning", subcategory: "health" },
  { id: "lhc4", text: "每天八小時睡眠", category: "learning", subcategory: "health" },
  { id: "lhc5", text: "每日喝足水量", category: "learning", subcategory: "health" },
  { id: "lhc6", text: "戒掉垃圾食品", category: "learning", subcategory: "health" },
  { id: "lhc7", text: "每天散步半小時", category: "learning", subcategory: "health" },
  { id: "lhc8", text: "挑戰無糖一週", category: "learning", subcategory: "health" },
  { id: "lhc9", text: "練習深呼吸放鬆", category: "learning", subcategory: "health" },
  { id: "lhc10", text: "增加蔬果攝取", category: "learning", subcategory: "health" },
  { id: "lhc11", text: "戒菸戒酒", category: "learning", subcategory: "health" },
  { id: "lhc12", text: "固定健檢", category: "learning", subcategory: "health" },
  { id: "lhc13", text: "減少屏幕時間", category: "learning", subcategory: "health" },
  { id: "lhc14", text: "每週瑜伽一次", category: "learning", subcategory: "health" },
  { id: "lhc15", text: "早睡早起作息", category: "learning", subcategory: "health" },
  { id: "lhc16", text: "減少咖啡因", category: "learning", subcategory: "health" },
];

const learningBreakthrough: BingoGoal[] = [
  { id: "lb1", text: "團體中發表演講", category: "learning", subcategory: "breakthrough" },
  { id: "lb2", text: "參加社交活動", category: "learning", subcategory: "breakthrough" },
  { id: "lb3", text: "挑戰一週戒糖", category: "learning", subcategory: "breakthrough" },
  { id: "lb4", text: "寫每日成長日記", category: "learning", subcategory: "breakthrough" },
  { id: "lb5", text: "設立年度目標", category: "learning", subcategory: "breakthrough" },
  { id: "lb6", text: "進行自我反思", category: "learning", subcategory: "breakthrough" },
  { id: "lb7", text: "嘗試新愛好", category: "learning", subcategory: "breakthrough" },
  { id: "lb8", text: "挑戰不抱怨一週", category: "learning", subcategory: "breakthrough" },
  { id: "lb9", text: "克服懼高症", category: "learning", subcategory: "breakthrough" },
  { id: "lb10", text: "嘗試冒險活動", category: "learning", subcategory: "breakthrough" },
  { id: "lb11", text: "主動認識新朋友", category: "learning", subcategory: "breakthrough" },
  { id: "lb12", text: "建立早晨儀式", category: "learning", subcategory: "breakthrough" },
  { id: "lb13", text: "規劃未來五年", category: "learning", subcategory: "breakthrough" },
  { id: "lb14", text: "挑戰自己社交圈", category: "learning", subcategory: "breakthrough" },
  { id: "lb15", text: "完成作品發表", category: "learning", subcategory: "breakthrough" },
  { id: "lb16", text: "建立正念習慣", category: "learning", subcategory: "breakthrough" },
];

// 人際關係 4x4
const relationshipGoals: BingoGoal[] = [
  { id: "r1", text: "定期家庭聚餐", category: "relationships" },
  { id: "r2", text: "陪伴父母旅行", category: "relationships" },
  { id: "r3", text: "與兄妹聯繫", category: "relationships" },
  { id: "r4", text: "參加家庭活動", category: "relationships" },
  { id: "r5", text: "舉辦好友聚會", category: "relationships" },
  { id: "r6", text: "每月與朋友約會", category: "relationships" },
  { id: "r7", text: "關心朋友", category: "relationships" },
  { id: "r8", text: "擴展交友圈", category: "relationships" },
  { id: "r9", text: "安排浪漫約會", category: "relationships" },
  { id: "r10", text: "計劃旅行", category: "relationships" },
  { id: "r11", text: "增進溝通", category: "relationships" },
  { id: "r12", text: "給予驚喜", category: "relationships" },
  { id: "r13", text: "與同事結交", category: "relationships" },
  { id: "r14", text: "感謝上司", category: "relationships" },
  { id: "r15", text: "幫助同事", category: "relationships" },
  { id: "r16", text: "參加團隊活動", category: "relationships" },
];

// 迷因文化 4x4
const memeGoals: BingoGoal[] = [
  { id: "m1", text: "製作原創迷因", category: "memes" },
  { id: "m2", text: "收集經典梗圖", category: "memes" },
  { id: "m3", text: "學會最新網路用語", category: "memes" },
  { id: "m4", text: "參與迷因挑戰", category: "memes" },
  { id: "m5", text: "創作搞笑短影片", category: "memes" },
  { id: "m6", text: "收藏表情包", category: "memes" },
  { id: "m7", text: "追蹤迷因趨勢", category: "memes" },
  { id: "m8", text: "分享爆笑內容", category: "memes" },
  { id: "m9", text: "學習迷因歷史", category: "memes" },
  { id: "m10", text: "參加網路梗圖比賽", category: "memes" },
  { id: "m11", text: "製作GIF動圖", category: "memes" },
  { id: "m12", text: "收集貓咪迷因", category: "memes" },
  { id: "m13", text: "創作諷刺漫畫", category: "memes" },
  { id: "m14", text: "學會迷因製作軟體", category: "memes" },
  { id: "m15", text: "建立迷因資料庫", category: "memes" },
  { id: "m16", text: "成為迷因達人", category: "memes" },
];

// 迷因文化相關的賓果目標
const soloActivities: BingoGoal[] = [
  { id: "sa1", text: "看電影", category: "memes", subcategory: "solo" },
  { id: "sa2", text: "唱歌", category: "memes", subcategory: "solo" },
  { id: "sa3", text: "做家事", category: "memes", subcategory: "solo" },
  { id: "sa4", text: "看演唱會", category: "memes", subcategory: "solo" },
  { id: "sa5", text: "吃火鍋", category: "memes", subcategory: "solo" },
  { id: "sa6", text: "酒吧喝酒", category: "memes", subcategory: "solo" },
  { id: "sa7", text: "看展覽", category: "memes", subcategory: "solo" },
  { id: "sa8", text: "去咖啡廳", category: "memes", subcategory: "solo" },
  { id: "sa9", text: "去逛街", category: "memes", subcategory: "solo" },
  { id: "sa10", text: "吃大餐", category: "memes", subcategory: "solo" },
  { id: "sa11", text: "看夜景", category: "memes", subcategory: "solo" },
  { id: "sa12", text: "看海", category: "memes", subcategory: "solo" },
  { id: "sa13", text: "出國", category: "memes", subcategory: "solo" },
  { id: "sa14", text: "淋雨", category: "memes", subcategory: "solo" },
  { id: "sa15", text: "慶祝節日", category: "memes", subcategory: "solo" },
  { id: "sa16", text: "搬家", category: "memes", subcategory: "solo" },
  { id: "sa17", text: "接觸大自然", category: "memes", subcategory: "solo" },
  { id: "sa18", text: "逛百貨公司", category: "memes", subcategory: "solo" },
  { id: "sa19", text: "看恐怖片", category: "memes", subcategory: "solo" },
  { id: "sa20", text: "買禮物給自己", category: "memes", subcategory: "solo" },
  { id: "sa21", text: "看病", category: "memes", subcategory: "solo" },
  { id: "sa22", text: "跨年倒數", category: "memes", subcategory: "solo" },
  { id: "sa23", text: "KTV開包廂", category: "memes", subcategory: "solo" },
  { id: "sa24", text: "參加婚禮", category: "memes", subcategory: "solo" },
  { id: "sa25", text: "過情人節", category: "memes", subcategory: "solo" },
];

const deadLanguage: BingoGoal[] = [
  { id: "dl1", text: "聽你在吧哺咧！", category: "memes", subcategory: "deadlang" },
  { id: "dl2", text: "臉上三條線", category: "memes", subcategory: "deadlang" },
  { id: "dl3", text: "好瞎趴", category: "memes", subcategory: "deadlang" },
  { id: "dl4", text: "Orz", category: "memes", subcategory: "deadlang" },
  { id: "dl5", text: "ㄘㄟˊ", category: "memes", subcategory: "deadlang" },
  { id: "dl6", text: "謝謝你9527", category: "memes", subcategory: "deadlang" },
  { id: "dl7", text: "LKK", category: "memes", subcategory: "deadlang" },
  { id: "dl8", text: "藍瘦香菇", category: "memes", subcategory: "deadlang" },
  { id: "dl9", text: "架恐怖！", category: "memes", subcategory: "deadlang" },
  { id: "dl10", text: "87分不能再高", category: "memes", subcategory: "deadlang" },
  { id: "dl11", text: "超ㄅㄧㄤˋ", category: "memes", subcategory: "deadlang" },
  { id: "dl12", text: "正港的", category: "memes", subcategory: "deadlang" },
  { id: "dl13", text: "阿娘喂～", category: "memes", subcategory: "deadlang" },
  { id: "dl14", text: "宅宅我來惹", category: "memes", subcategory: "deadlang" },
  { id: "dl15", text: "不跟你哈拉了", category: "memes", subcategory: "deadlang" },
  { id: "dl16", text: "囧", category: "memes", subcategory: "deadlang" },
];

const pickyEater: BingoGoal[] = [
  { id: "pe1", text: "香菜", category: "memes", subcategory: "picky" },
  { id: "pe2", text: "茄子", category: "memes", subcategory: "picky" },
  { id: "pe3", text: "青椒", category: "memes", subcategory: "picky" },
  { id: "pe4", text: "花椰菜", category: "memes", subcategory: "picky" },
  { id: "pe5", text: "皮蛋", category: "memes", subcategory: "picky" },
  { id: "pe6", text: "牛奶", category: "memes", subcategory: "picky" },
  { id: "pe7", text: "薑絲", category: "memes", subcategory: "picky" },
  { id: "pe8", text: "洋蔥", category: "memes", subcategory: "picky" },
  { id: "pe9", text: "蕃茄", category: "memes", subcategory: "picky" },
  { id: "pe10", text: "三色豆", category: "memes", subcategory: "picky" },
  { id: "pe11", text: "苦瓜", category: "memes", subcategory: "picky" },
  { id: "pe12", text: "秋葵", category: "memes", subcategory: "picky" },
  { id: "pe13", text: "雞皮", category: "memes", subcategory: "picky" },
  { id: "pe14", text: "豬血", category: "memes", subcategory: "picky" },
  { id: "pe15", text: "內臟類（肝/腸）", category: "memes", subcategory: "picky" },
  { id: "pe16", text: "榴槤", category: "memes", subcategory: "picky" },
];

const introvertBingo: BingoGoal[] = [
  { id: "ib1", text: "聚會前後悔", category: "memes", subcategory: "introvert" },
  { id: "ib2", text: "群組潛水王", category: "memes", subcategory: "introvert" },
  { id: "ib3", text: "社交完超累", category: "memes", subcategory: "introvert" },
  { id: "ib4", text: "假裝沒看到訊息", category: "memes", subcategory: "introvert" },
  { id: "ib5", text: "喜歡獨處", category: "memes", subcategory: "introvert" },
  { id: "ib6", text: "被點名心慌", category: "memes", subcategory: "introvert" },
  { id: "ib7", text: "出門前想取消", category: "memes", subcategory: "introvert" },
  { id: "ib8", text: "聚會滑手機", category: "memes", subcategory: "introvert" },
  { id: "ib9", text: "被誇尷尬", category: "memes", subcategory: "introvert" },
  { id: "ib10", text: "小聊尬爆", category: "memes", subcategory: "introvert" },
  { id: "ib11", text: "別人講我聽", category: "memes", subcategory: "introvert" },
  { id: "ib12", text: "不接陌生電話", category: "memes", subcategory: "introvert" },
  { id: "ib13", text: "不愛合照", category: "memes", subcategory: "introvert" },
  { id: "ib14", text: "喜歡安靜", category: "memes", subcategory: "introvert" },
  { id: "ib15", text: "拒絕邀約快狠準", category: "memes", subcategory: "introvert" },
  { id: "ib16", text: "假裝忙逃避", category: "memes", subcategory: "introvert" },
];

const extrovertBingo: BingoGoal[] = [
  { id: "eb1", text: "聚會越多越嗨", category: "memes", subcategory: "extrovert" },
  { id: "eb2", text: "認識新朋友快狠準", category: "memes", subcategory: "extrovert" },
  { id: "eb3", text: "秒回訊息", category: "memes", subcategory: "extrovert" },
  { id: "eb4", text: "主動開話題", category: "memes", subcategory: "extrovert" },
  { id: "eb5", text: "超愛群聊", category: "memes", subcategory: "extrovert" },
  { id: "eb6", text: "不怕冷場", category: "memes", subcategory: "extrovert" },
  { id: "eb7", text: "一週沒出門會憂鬱", category: "memes", subcategory: "extrovert" },
  { id: "eb8", text: "被人說很好聊", category: "memes", subcategory: "extrovert" },
  { id: "eb9", text: "喜歡當主揪", category: "memes", subcategory: "extrovert" },
  { id: "eb10", text: "每場都有熟人", category: "memes", subcategory: "extrovert" },
  { id: "eb11", text: "隨口就交朋友", category: "memes", subcategory: "extrovert" },
  { id: "eb12", text: "自來熟達人", category: "memes", subcategory: "extrovert" },
  { id: "eb13", text: "約誰都OK", category: "memes", subcategory: "extrovert" },
  { id: "eb14", text: "被誇開朗會更嗨", category: "memes", subcategory: "extrovert" },
  { id: "eb15", text: "活動魂", category: "memes", subcategory: "extrovert" },
  { id: "eb16", text: "一整天滿行程也不累", category: "memes", subcategory: "extrovert" },
];

const idealBoyfriend: BingoGoal[] = [
  { id: "bf1", text: "180", category: "memes", subcategory: "boyfriend" },
  { id: "bf2", text: "卷毛", category: "memes", subcategory: "boyfriend" },
  { id: "bf3", text: "美式男", category: "memes", subcategory: "boyfriend" },
  { id: "bf4", text: "薄肌", category: "memes", subcategory: "boyfriend" },
  { id: "bf5", text: "體育生", category: "memes", subcategory: "boyfriend" },
  { id: "bf6", text: "年下", category: "memes", subcategory: "boyfriend" },
  { id: "bf7", text: "年上", category: "memes", subcategory: "boyfriend" },
  { id: "bf8", text: "微分碎蓋", category: "memes", subcategory: "boyfriend" },
  { id: "bf9", text: "健身男", category: "memes", subcategory: "boyfriend" },
  { id: "bf10", text: "雙眼皮", category: "memes", subcategory: "boyfriend" },
  { id: "bf11", text: "撒嬌小狗", category: "memes", subcategory: "boyfriend" },
  { id: "bf12", text: "嘻哈男", category: "memes", subcategory: "boyfriend" },
  { id: "bf13", text: "長髮男", category: "memes", subcategory: "boyfriend" },
  { id: "bf14", text: "聽團男", category: "memes", subcategory: "boyfriend" },
  { id: "bf15", text: "動漫男", category: "memes", subcategory: "boyfriend" },
  { id: "bf16", text: "刺青男", category: "memes", subcategory: "boyfriend" },
  { id: "bf17", text: "韓系男", category: "memes", subcategory: "boyfriend" },
  { id: "bf18", text: "陽光暖男", category: "memes", subcategory: "boyfriend" },
  { id: "bf19", text: "搞笑男", category: "memes", subcategory: "boyfriend" },
  { id: "bf20", text: "8+9", category: "memes", subcategory: "boyfriend" },
  { id: "bf21", text: "高冷霸總", category: "memes", subcategory: "boyfriend" },
  { id: "bf22", text: "悶騷男", category: "memes", subcategory: "boyfriend" },
  { id: "bf23", text: "跳舞男", category: "memes", subcategory: "boyfriend" },
  { id: "bf24", text: "爹系", category: "memes", subcategory: "boyfriend" },
  { id: "bf25", text: "黑皮", category: "memes", subcategory: "boyfriend" },
];

export const categories: BingoCategory[] = [
  {
    id: "finance",
    name: "投資理財",
    icon: "savings",
    className: "category-finance",
    gridSize: 5,
  },
  {
    id: "travel",
    name: "夢想旅遊",
    icon: "flight_takeoff",
    className: "category-travel",
    gridSize: 5,
  },
  {
    id: "lifestyle",
    name: "生活享受",
    icon: "restaurant",
    className: "category-lifestyle",
    gridSize: 4,
    subcategories: [
      {
        id: "consumption",
        name: "消費升級",
        gridSize: 4,
        goals: lifestyleConsumption,
      },
      {
        id: "enjoyment",
        name: "生活享受",
        gridSize: 4,
        goals: lifestyleEnjoyment,
      },
      {
        id: "habits",
        name: "生活習慣",
        gridSize: 4,
        goals: lifestyleHabits,
      },
    ],
  },
  {
    id: "learning",
    name: "學習成長",
    icon: "school",
    className: "category-learning",
    gridSize: 4,
    subcategories: [
      {
        id: "knowledge",
        name: "知識增長",
        gridSize: 4,
        goals: learningKnowledge,
      },
      {
        id: "health",
        name: "健康挑戰",
        gridSize: 4,
        goals: learningHealth,
      },
      {
        id: "breakthrough",
        name: "個人突破",
        gridSize: 4,
        goals: learningBreakthrough,
      },
    ],
  },
  {
    id: "relationships",
    name: "人際關係",
    icon: "group",
    className: "category-relationships",
    gridSize: 4,
  },
  {
    id: "memes",
    name: "迷因文化",
    icon: "mood",
    className: "category-memes",
    gridSize: 4,
    subcategories: [
      {
        id: "solo",
        name: "一人完成清單",
        gridSize: 5,
        goals: soloActivities,
      },
      {
        id: "deadlang",
        name: "死語復興",
        gridSize: 4,
        goals: deadLanguage,
      },
      {
        id: "picky",
        name: "挑食bingo",
        gridSize: 4,
        goals: pickyEater,
      },
      {
        id: "introvert",
        name: "i人賓果",
        gridSize: 4,
        goals: introvertBingo,
      },
      {
        id: "extrovert",
        name: "e人賓果",
        gridSize: 4,
        goals: extrovertBingo,
      },
      {
        id: "boyfriend",
        name: "理想型男朋友許願BINGO",
        gridSize: 5,
        goals: idealBoyfriend,
      },
    ],
  },
];

export const getAllGoals = (categoryId: string, subcategoryId?: string): BingoGoal[] => {
  switch (categoryId) {
    case "lifestyle":
      if (subcategoryId === "consumption") return lifestyleConsumption;
      if (subcategoryId === "enjoyment") return lifestyleEnjoyment;
      if (subcategoryId === "habits") return lifestyleHabits;
      return [...lifestyleConsumption, ...lifestyleEnjoyment, ...lifestyleHabits];
    case "learning":
      if (subcategoryId === "knowledge") return learningKnowledge;
      if (subcategoryId === "health") return learningHealth;
      if (subcategoryId === "breakthrough") return learningBreakthrough;
      return [...learningKnowledge, ...learningHealth, ...learningBreakthrough];
    case "memes":
      if (subcategoryId === "solo") return soloActivities;
      if (subcategoryId === "deadlang") return deadLanguage;
      if (subcategoryId === "picky") return pickyEater;
      if (subcategoryId === "introvert") return introvertBingo;
      if (subcategoryId === "extrovert") return extrovertBingo;
      if (subcategoryId === "boyfriend") return idealBoyfriend;
      return [...soloActivities, ...deadLanguage, ...pickyEater, ...introvertBingo, ...extrovertBingo, ...idealBoyfriend];
    case "travel":
      return travelGoals;
    case "relationships":
      return relationshipGoals;
    default:
      return financeGoals;
  }
};