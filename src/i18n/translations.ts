import type { CardDirection, FortuneCategory, TarotCard, TarotPosition } from "../types/tarot";

export type LanguageCode = "ko" | "zh" | "ja" | "en";

type FanGroupText = {
  title: string;
  subtitle: string;
};

type ResultText = {
  title: string;
  resultErrorTitle: string;
  fallbackError: string;
  storyKicker: string;
  totalSummary: string;
  score: string;
  lotteryNumbers: string;
  oneLineAdvice: string;
  loadingAd: string;
  rewardButton: string;
  adError: string;
  detailSummary: string;
  lotteryFlow: string;
  situationOverview: string;
  cardReadingTitle: (index: number, positionLabel: string) => string;
  cardMeaning: string;
  currentFortune: string;
  situationExample: string;
  whyImportant: string;
  advice: string;
  nextAction: string;
  connectionReading: string;
  relatablePatterns: string;
  actionItems: string;
  practicalNextSteps: string;
  avoidActions: string;
  timingHint: string;
  overallFlow: string;
  caution: string;
  luckyColor: string;
  luckyNumber: string;
  retry: string;
  otherFortune: string;
  lotteryFlowBody: (cards: readonly string[]) => string;
};

export type TranslationPack = {
  languageName: string;
  languageNativeName: string;
  categories: Record<FortuneCategory, string>;
  directions: Record<CardDirection, string>;
  positions: Record<TarotPosition, string>;
  slotLabels: Record<TarotPosition, string>;
  common: {
    appName: string;
    settings: string;
    close: string;
    selected: string;
  };
  lobby: {
    kicker: string;
    subtitle: string;
    recommendationLabel: string;
    recommendationHint: string;
    categoryHint: string;
    startButton: string;
    startEnabledHint: string;
    startDisabledHint: string;
    recommendationAccessibility: (categoryLabel: string) => string;
  };
  dailyRecommendationMessages: Record<FortuneCategory, string>;
  cardSelect: {
    title: string;
    deckInfo: (cardCount: number) => string;
    progressAccessibility: (selectedCount: number) => string;
    drawMeta: (shuffleCount: number) => string;
    shuffle: string;
    shuffleEnabledHint: (count: number) => string;
    shuffleDisabledHint: string;
    fanGroups: Record<"major" | "cupsWands" | "swordsPentacles", FanGroupText>;
    fanAccessibilityLabel: (groupTitle: string) => string;
    fanAccessibilityHint: string;
    resultButton: string;
    resultEnabledHint: string;
    resultDisabledHint: string;
  };
  card: {
    selectedOrderLabel: (order: number) => string;
    selectLabel: string;
    hiddenCard: string;
    hiddenArcana: string;
  };
  result: ResultText;
  settings: {
    title: string;
    subtitle: string;
    languageLabel: string;
    selectHint: string;
    previewTitle: string;
    previewBody: string;
    selectLanguage: string;
    currentLanguage: (name: string) => string;
    backButton: string;
  };
};

const majorNames: Record<string, Record<LanguageCode, string>> = {
  the_fool: { ko: "바보", zh: "愚者", ja: "愚者", en: "The Fool" },
  the_magician: { ko: "마법사", zh: "魔术师", ja: "魔術師", en: "The Magician" },
  the_high_priestess: { ko: "여사제", zh: "女祭司", ja: "女教皇", en: "The High Priestess" },
  the_empress: { ko: "여황제", zh: "女皇", ja: "女帝", en: "The Empress" },
  the_emperor: { ko: "황제", zh: "皇帝", ja: "皇帝", en: "The Emperor" },
  the_hierophant: { ko: "교황", zh: "教皇", ja: "法王", en: "The Hierophant" },
  the_lovers: { ko: "연인", zh: "恋人", ja: "恋人", en: "The Lovers" },
  the_chariot: { ko: "전차", zh: "战车", ja: "戦車", en: "The Chariot" },
  strength: { ko: "힘", zh: "力量", ja: "力", en: "Strength" },
  the_hermit: { ko: "은둔자", zh: "隐者", ja: "隠者", en: "The Hermit" },
  wheel_of_fortune: { ko: "운명의 수레바퀴", zh: "命运之轮", ja: "運命の輪", en: "Wheel of Fortune" },
  justice: { ko: "정의", zh: "正义", ja: "正義", en: "Justice" },
  the_hanged_man: { ko: "매달린 사람", zh: "倒吊人", ja: "吊るされた男", en: "The Hanged Man" },
  death: { ko: "죽음", zh: "死神", ja: "死神", en: "Death" },
  temperance: { ko: "절제", zh: "节制", ja: "節制", en: "Temperance" },
  the_devil: { ko: "악마", zh: "恶魔", ja: "悪魔", en: "The Devil" },
  the_tower: { ko: "탑", zh: "高塔", ja: "塔", en: "The Tower" },
  the_star: { ko: "별", zh: "星星", ja: "星", en: "The Star" },
  the_moon: { ko: "달", zh: "月亮", ja: "月", en: "The Moon" },
  the_sun: { ko: "태양", zh: "太阳", ja: "太陽", en: "The Sun" },
  judgement: { ko: "심판", zh: "审判", ja: "審判", en: "Judgement" },
  the_world: { ko: "세계", zh: "世界", ja: "世界", en: "The World" }
};

const rankNames: Record<string, Record<LanguageCode, string>> = {
  ace: { ko: "에이스", zh: "王牌", ja: "エース", en: "Ace" },
  two: { ko: "2", zh: "二", ja: "2", en: "Two" },
  three: { ko: "3", zh: "三", ja: "3", en: "Three" },
  four: { ko: "4", zh: "四", ja: "4", en: "Four" },
  five: { ko: "5", zh: "五", ja: "5", en: "Five" },
  six: { ko: "6", zh: "六", ja: "6", en: "Six" },
  seven: { ko: "7", zh: "七", ja: "7", en: "Seven" },
  eight: { ko: "8", zh: "八", ja: "8", en: "Eight" },
  nine: { ko: "9", zh: "九", ja: "9", en: "Nine" },
  ten: { ko: "10", zh: "十", ja: "10", en: "Ten" },
  page: { ko: "시종", zh: "侍从", ja: "ペイジ", en: "Page" },
  knight: { ko: "기사", zh: "骑士", ja: "ナイト", en: "Knight" },
  queen: { ko: "여왕", zh: "女王", ja: "クイーン", en: "Queen" },
  king: { ko: "왕", zh: "国王", ja: "キング", en: "King" }
};

const suitNames: Record<string, Record<LanguageCode, string>> = {
  wands: { ko: "완드", zh: "权杖", ja: "ワンド", en: "Wands" },
  cups: { ko: "컵", zh: "圣杯", ja: "カップ", en: "Cups" },
  swords: { ko: "소드", zh: "宝剑", ja: "ソード", en: "Swords" },
  pentacles: { ko: "펜타클", zh: "星币", ja: "ペンタクル", en: "Pentacles" }
};

export const languageOptions: { code: LanguageCode; label: string }[] = [
  { code: "ko", label: "한국어" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" }
];

export function getCardDisplayName(card: TarotCard, language: LanguageCode) {
  const majorName = majorNames[card.id]?.[language];
  if (majorName) {
    return majorName;
  }

  const [rankKey, suitKey] = card.id.split("_of_");
  const rank = rankNames[rankKey]?.[language];
  const suit = suitNames[suitKey]?.[language];

  if (!rank || !suit) {
    return language === "ko" ? card.nameKo : card.name;
  }

  if (language === "ko") {
    return `${suit} ${rank}`;
  }

  if (language === "zh") {
    return `${suit}${rank}`;
  }

  if (language === "ja") {
    return `${suit}の${rank}`;
  }

  return `${rank} of ${suit}`;
}

export const translations: Record<LanguageCode, TranslationPack> = {
  ko: {
    languageName: "Korean",
    languageNativeName: "한국어",
    categories: {
      daily: "오늘의 운세",
      love: "연애운",
      money: "금전운",
      work: "직장운",
      relationship: "인간관계",
      choice: "선택의 고민",
      lotto: "로또 번호"
    },
    directions: { upright: "정방향", reversed: "역방향" },
    positions: { 0: "현재 흐름", 1: "숨은 원인", 2: "앞으로의 방향" },
    slotLabels: { 0: "첫 번째 카드", 1: "두 번째 카드", 2: "세 번째 카드" },
    common: { appName: "Mystic Tarot", settings: "설정", close: "닫기", selected: "선택됨" },
    lobby: {
      kicker: "오늘의 카드가 열리는 시간",
      subtitle: "운세를 고르고 세 장을 펼쳐 보세요.",
      recommendationLabel: "오늘의 추천 리딩",
      recommendationHint: "선택하면 추천 운세 항목이 활성화됩니다.",
      categoryHint: "선택하면 카드 뽑기 시작 버튼이 활성화됩니다.",
      startButton: "카드 뽑기 시작",
      startEnabledHint: "선택한 운세의 카드 선택 화면으로 이동합니다.",
      startDisabledHint: "운세 항목을 먼저 선택하세요.",
      recommendationAccessibility: (categoryLabel) => `오늘의 추천 리딩 ${categoryLabel}`
    },
    dailyRecommendationMessages: {
      daily: "흐트러진 하루의 리듬을 먼저 잡기 좋은 날입니다.",
      love: "말보다 온도를 살피면 마음의 방향이 더 잘 보입니다.",
      money: "새는 돈과 작은 행운을 함께 점검하기 좋은 흐름입니다.",
      work: "가장 중요한 일 하나를 끝내면 압박이 줄어드는 날입니다.",
      relationship: "짧고 부드러운 확인이 관계의 공기를 바꿀 수 있습니다.",
      choice: "답을 늘리기보다 기준 하나를 세우기 좋은 날입니다.",
      lotto: "선택한 카드의 상징을 숫자로 바꿔 가볍게 즐기기 좋은 날입니다."
    },
    cardSelect: {
      title: "마음이 가는 카드를 선택하세요",
      deckInfo: (cardCount) => `${cardCount}장 전체 덱을 3개의 부채꼴로 펼쳤습니다`,
      progressAccessibility: (selectedCount) => `카드 선택 진행 ${selectedCount}장 완료, 총 3장`,
      drawMeta: (shuffleCount) => `메이저 22 · 마이너 56 · 전체 펼침 ${shuffleCount}`,
      shuffle: "다시 섞기",
      shuffleEnabledHint: (count) => `선택 전 ${count}장을 다시 섞어 펼칩니다.`,
      shuffleDisabledHint: "이미 카드를 선택해 이번 펼침은 유지됩니다.",
      fanGroups: {
        major: { title: "메이저 아르카나", subtitle: "큰 흐름 22장" },
        cupsWands: { title: "컵 · 완드", subtitle: "감정과 행동 28장" },
        swordsPentacles: { title: "소드 · 펜타클", subtitle: "판단과 현실 28장" }
      },
      fanAccessibilityLabel: (groupTitle) => `${groupTitle} 카드 펼침`,
      fanAccessibilityHint: "부채꼴에서 누른 위치와 가장 가까운 카드를 선택합니다.",
      resultButton: "결과 보기",
      resultEnabledHint: "선택한 세 장의 결과 화면으로 이동합니다.",
      resultDisabledHint: "세 장의 카드를 모두 선택해야 결과를 볼 수 있습니다."
    },
    card: {
      selectedOrderLabel: (order) => `${order}번째로 선택한 타로 카드`,
      selectLabel: "타로 카드 선택",
      hiddenCard: "비밀 카드",
      hiddenArcana: "Hidden Arcana"
    },
    result: {
      title: "당신의 세 장",
      resultErrorTitle: "결과 오류",
      fallbackError: "결과 데이터를 불러오지 못했습니다.",
      storyKicker: "이번 리딩의 핵심",
      totalSummary: "총평",
      score: "운세 점수",
      lotteryNumbers: "카드 추천 번호",
      oneLineAdvice: "한 줄 조언",
      loadingAd: "광고 확인 중...",
      rewardButton: "광고 보고 상세 해석 보기",
      adError: "광고 확인에 실패했습니다. 잠시 후 다시 시도하세요.",
      detailSummary: "상세 총평",
      lotteryFlow: "번호가 나온 흐름",
      situationOverview: "지금 이런 상황일 수 있어요",
      cardReadingTitle: (index, positionLabel) => `카드 ${index + 1} 해석 · ${positionLabel}`,
      cardMeaning: "카드 설명",
      currentFortune: "현재 운세",
      situationExample: "상황 예시",
      whyImportant: "왜 중요할까요",
      advice: "조언",
      nextAction: "현실 행동",
      connectionReading: "세 카드 연결 해석",
      relatablePatterns: "공감 포인트",
      actionItems: "오늘 해볼 행동",
      practicalNextSteps: "상황별 추천 행동",
      avoidActions: "피해야 할 행동",
      timingHint: "타이밍 힌트",
      overallFlow: "종합 흐름",
      caution: "주의할 점",
      luckyColor: "행운의 색상",
      luckyNumber: "행운의 숫자",
      retry: "다시 보기",
      otherFortune: "다른 운세 보기",
      lotteryFlowBody: (cards) =>
        `${cards[0]} 카드는 첫 번호 흐름을 열고, ${cards[1]} 카드는 중간 숫자의 균형을 잡으며, ${cards[2]} 카드는 보너스 번호의 분위기를 만듭니다. 이 조합은 카드 상징을 숫자로 바꾼 재미용 해석이며 실제 결과를 예측하지 않습니다.`
    },
    settings: {
      title: "설정",
      subtitle: "앱에서 보이는 버튼, 안내, 카드 해석 표시 언어를 선택하세요.",
      languageLabel: "언어팩",
      selectHint: "언어 목록을 열어 앱 표시 언어를 바꿉니다.",
      previewTitle: "미리보기",
      previewBody: "선택한 언어는 로비, 카드 선택, 결과 해석 화면에 바로 적용됩니다.",
      selectLanguage: "언어 선택",
      currentLanguage: (name) => `현재 언어: ${name}`,
      backButton: "로비로 돌아가기"
    }
  },
  zh: {
    languageName: "Chinese",
    languageNativeName: "中文",
    categories: {
      daily: "今日运势",
      love: "爱情运",
      money: "财运",
      work: "事业运",
      relationship: "人际关系",
      choice: "选择烦恼",
      lotto: "乐透号码"
    },
    directions: { upright: "正位", reversed: "逆位" },
    positions: { 0: "当前趋势", 1: "隐藏原因", 2: "接下来的方向" },
    slotLabels: { 0: "第一张牌", 1: "第二张牌", 2: "第三张牌" },
    common: { appName: "Mystic Tarot", settings: "设置", close: "关闭", selected: "已选择" },
    lobby: {
      kicker: "今日牌面开启的时间",
      subtitle: "选择一个主题，抽出你的三张牌。",
      recommendationLabel: "今日推荐解读",
      recommendationHint: "选择后会启用推荐主题。",
      categoryHint: "选择后会启用开始抽牌按钮。",
      startButton: "开始抽牌",
      startEnabledHint: "进入所选主题的选牌画面。",
      startDisabledHint: "请先选择一个运势主题。",
      recommendationAccessibility: (categoryLabel) => `今日推荐解读 ${categoryLabel}`
    },
    dailyRecommendationMessages: {
      daily: "适合先整理一天节奏的日子。",
      love: "先观察语气和温度，心意会更清楚。",
      money: "适合检查小支出，也保留一点轻松的幸运感。",
      work: "完成最重要的一件事，压力会明显下降。",
      relationship: "一句温和的确认，能改变关系里的空气。",
      choice: "与其增加答案，不如先定下一个标准。",
      lotto: "把牌面象征换成数字，轻松玩一玩就好。"
    },
    cardSelect: {
      title: "请选择最有感觉的牌",
      deckInfo: (cardCount) => `已将完整 ${cardCount} 张牌分成 3 组扇形展开`,
      progressAccessibility: (selectedCount) => `已选择 ${selectedCount} 张，共 3 张`,
      drawMeta: (shuffleCount) => `大阿卡那 22 · 小阿卡那 56 · 第 ${shuffleCount} 次展开`,
      shuffle: "重新洗牌",
      shuffleEnabledHint: (count) => `选择前重新洗开 ${count} 张牌。`,
      shuffleDisabledHint: "已经选牌，本次展开会保持不变。",
      fanGroups: {
        major: { title: "大阿卡那", subtitle: "人生主线 22 张" },
        cupsWands: { title: "圣杯 · 权杖", subtitle: "情绪与行动 28 张" },
        swordsPentacles: { title: "宝剑 · 星币", subtitle: "判断与现实 28 张" }
      },
      fanAccessibilityLabel: (groupTitle) => `${groupTitle} 牌组展开`,
      fanAccessibilityHint: "会选择扇形中最接近点击位置的一张牌。",
      resultButton: "查看结果",
      resultEnabledHint: "进入三张牌的结果画面。",
      resultDisabledHint: "必须选满三张牌才能查看结果。"
    },
    card: {
      selectedOrderLabel: (order) => `第 ${order} 张选中的塔罗牌`,
      selectLabel: "选择塔罗牌",
      hiddenCard: "秘密之牌",
      hiddenArcana: "Hidden Arcana"
    },
    result: {
      title: "你的三张牌",
      resultErrorTitle: "结果错误",
      fallbackError: "无法读取结果数据。",
      storyKicker: "本次解读重点",
      totalSummary: "总评",
      score: "运势分数",
      lotteryNumbers: "牌面推荐号码",
      oneLineAdvice: "一句建议",
      loadingAd: "正在确认广告...",
      rewardButton: "看广告解锁详细解读",
      adError: "广告确认失败，请稍后再试。",
      detailSummary: "详细总评",
      lotteryFlow: "号码出现的脉络",
      situationOverview: "你现在可能处在这样的情况",
      cardReadingTitle: (index, positionLabel) => `第 ${index + 1} 张解读 · ${positionLabel}`,
      cardMeaning: "牌面说明",
      currentFortune: "当前运势",
      situationExample: "情境例子",
      whyImportant: "为什么重要",
      advice: "建议",
      nextAction: "现实行动",
      connectionReading: "三张牌的连接解读",
      relatablePatterns: "共鸣点",
      actionItems: "今天可以做的事",
      practicalNextSteps: "按情况推荐的行动",
      avoidActions: "需要避免的行动",
      timingHint: "时机提示",
      overallFlow: "整体流向",
      caution: "注意事项",
      luckyColor: "幸运色",
      luckyNumber: "幸运数字",
      retry: "再看一次",
      otherFortune: "选择其他运势",
      lotteryFlowBody: (cards) =>
        `${cards[0]} 打开第一段数字气氛，${cards[1]} 稳住中间号码的平衡，${cards[2]} 为特别号码留下提示。这个组合只是把牌面象征转换成数字的娱乐解读，并不预测实际结果。`
    },
    settings: {
      title: "设置",
      subtitle: "选择按钮、提示、牌面解读等应用内文字的显示语言。",
      languageLabel: "语言包",
      selectHint: "打开语言列表并切换应用显示语言。",
      previewTitle: "预览",
      previewBody: "所选语言会立即应用到大厅、选牌和结果解读画面。",
      selectLanguage: "选择语言",
      currentLanguage: (name) => `当前语言：${name}`,
      backButton: "返回大厅"
    }
  },
  ja: {
    languageName: "Japanese",
    languageNativeName: "日本語",
    categories: {
      daily: "今日の運勢",
      love: "恋愛運",
      money: "金運",
      work: "仕事運",
      relationship: "人間関係",
      choice: "選択の悩み",
      lotto: "ロト番号"
    },
    directions: { upright: "正位置", reversed: "逆位置" },
    positions: { 0: "現在の流れ", 1: "隠れた原因", 2: "これからの方向" },
    slotLabels: { 0: "1枚目のカード", 1: "2枚目のカード", 2: "3枚目のカード" },
    common: { appName: "Mystic Tarot", settings: "設定", close: "閉じる", selected: "選択中" },
    lobby: {
      kicker: "今日のカードが開く時間",
      subtitle: "占いたいテーマを選び、三枚のカードを開きましょう。",
      recommendationLabel: "今日のおすすめリーディング",
      recommendationHint: "選択するとおすすめテーマが有効になります。",
      categoryHint: "選択するとカードを引くボタンが有効になります。",
      startButton: "カードを引く",
      startEnabledHint: "選んだテーマのカード選択画面へ進みます。",
      startDisabledHint: "先に占いテーマを選んでください。",
      recommendationAccessibility: (categoryLabel) => `今日のおすすめリーディング ${categoryLabel}`
    },
    dailyRecommendationMessages: {
      daily: "乱れた一日のリズムを整えるのに向いた日です。",
      love: "言葉より温度を見ると、気持ちの方向が見えやすくなります。",
      money: "小さな支出と小さな幸運を一緒に見直す流れです。",
      work: "一番大事な仕事を一つ終えると、圧が軽くなります。",
      relationship: "短くやわらかな確認が、関係の空気を変えます。",
      choice: "答えを増やすより、基準を一つ決めるのに良い日です。",
      lotto: "カードの象徴を数字に変えて、軽く楽しむのに向いています。"
    },
    cardSelect: {
      title: "心が向くカードを選んでください",
      deckInfo: (cardCount) => `${cardCount}枚のフルデッキを3つの扇形に広げました`,
      progressAccessibility: (selectedCount) => `${selectedCount}枚選択済み、合計3枚`,
      drawMeta: (shuffleCount) => `大アルカナ22 · 小アルカナ56 · 展開 ${shuffleCount}`,
      shuffle: "もう一度混ぜる",
      shuffleEnabledHint: (count) => `選択前に${count}枚をもう一度混ぜて広げます。`,
      shuffleDisabledHint: "すでにカードを選んだため、この展開を維持します。",
      fanGroups: {
        major: { title: "大アルカナ", subtitle: "大きな流れ 22枚" },
        cupsWands: { title: "カップ · ワンド", subtitle: "感情と行動 28枚" },
        swordsPentacles: { title: "ソード · ペンタクル", subtitle: "判断と現実 28枚" }
      },
      fanAccessibilityLabel: (groupTitle) => `${groupTitle}のカード展開`,
      fanAccessibilityHint: "扇形で押した位置に最も近いカードを選びます。",
      resultButton: "結果を見る",
      resultEnabledHint: "選んだ三枚の結果画面へ進みます。",
      resultDisabledHint: "三枚すべて選ぶと結果を見られます。"
    },
    card: {
      selectedOrderLabel: (order) => `${order}枚目に選ばれたタロットカード`,
      selectLabel: "タロットカードを選択",
      hiddenCard: "秘密のカード",
      hiddenArcana: "Hidden Arcana"
    },
    result: {
      title: "あなたの三枚",
      resultErrorTitle: "結果エラー",
      fallbackError: "結果データを読み込めませんでした。",
      storyKicker: "今回のリーディングの核心",
      totalSummary: "総評",
      score: "運勢スコア",
      lotteryNumbers: "カード推薦番号",
      oneLineAdvice: "一言アドバイス",
      loadingAd: "広告を確認中...",
      rewardButton: "広告を見て詳細解釈を開く",
      adError: "広告確認に失敗しました。少し後でもう一度お試しください。",
      detailSummary: "詳細総評",
      lotteryFlow: "番号が出た流れ",
      situationOverview: "今はこんな状況かもしれません",
      cardReadingTitle: (index, positionLabel) => `カード${index + 1}の解釈 · ${positionLabel}`,
      cardMeaning: "カード説明",
      currentFortune: "現在の運勢",
      situationExample: "状況の例",
      whyImportant: "なぜ大事か",
      advice: "アドバイス",
      nextAction: "現実的な行動",
      connectionReading: "三枚のつながり解釈",
      relatablePatterns: "共感ポイント",
      actionItems: "今日試したい行動",
      practicalNextSteps: "状況別のおすすめ行動",
      avoidActions: "避けたい行動",
      timingHint: "タイミングのヒント",
      overallFlow: "総合的な流れ",
      caution: "注意すること",
      luckyColor: "ラッキーカラー",
      luckyNumber: "ラッキーナンバー",
      retry: "もう一度見る",
      otherFortune: "別の運勢を見る",
      lotteryFlowBody: (cards) =>
        `${cards[0]}が最初の番号の流れを開き、${cards[1]}が中間の数字のバランスを整え、${cards[2]}がボーナス番号の雰囲気を作ります。この組み合わせはカードの象徴を数字に変えた遊びの解釈で、実際の結果を予測するものではありません。`
    },
    settings: {
      title: "設定",
      subtitle: "ボタン、案内、カード解釈などアプリ内テキストの表示言語を選びます。",
      languageLabel: "言語パック",
      selectHint: "言語リストを開いて表示言語を切り替えます。",
      previewTitle: "プレビュー",
      previewBody: "選択した言語はロビー、カード選択、結果解釈画面にすぐ反映されます。",
      selectLanguage: "言語を選択",
      currentLanguage: (name) => `現在の言語：${name}`,
      backButton: "ロビーに戻る"
    }
  },
  en: {
    languageName: "English",
    languageNativeName: "English",
    categories: {
      daily: "Daily Fortune",
      love: "Love",
      money: "Money",
      work: "Work",
      relationship: "Relationships",
      choice: "Decision",
      lotto: "Lotto Numbers"
    },
    directions: { upright: "Upright", reversed: "Reversed" },
    positions: { 0: "Current Flow", 1: "Hidden Cause", 2: "Next Direction" },
    slotLabels: { 0: "First Card", 1: "Second Card", 2: "Third Card" },
    common: { appName: "Mystic Tarot", settings: "Settings", close: "Close", selected: "Selected" },
    lobby: {
      kicker: "The cards are ready for today",
      subtitle: "Choose a theme and open your three-card reading.",
      recommendationLabel: "Recommended Today",
      recommendationHint: "Selects the recommended fortune theme.",
      categoryHint: "Selects this theme and enables the start button.",
      startButton: "Start Drawing Cards",
      startEnabledHint: "Moves to the card selection screen for the chosen theme.",
      startDisabledHint: "Choose a fortune theme first.",
      recommendationAccessibility: (categoryLabel) => `Recommended today: ${categoryLabel}`
    },
    dailyRecommendationMessages: {
      daily: "A good day to reset the rhythm of your routine.",
      love: "Read the emotional tone before reading too much into the words.",
      money: "A useful moment to check small spending and enjoy a small luck ritual.",
      work: "Finishing one important task can reduce the pressure.",
      relationship: "A gentle check-in can shift the air between people.",
      choice: "Instead of adding more answers, choose one clear standard.",
      lotto: "Turn card symbols into numbers and enjoy it lightly."
    },
    cardSelect: {
      title: "Choose the card that calls to you",
      deckInfo: (cardCount) => `The full ${cardCount}-card deck is spread into 3 fans`,
      progressAccessibility: (selectedCount) => `${selectedCount} of 3 cards selected`,
      drawMeta: (shuffleCount) => `Major 22 · Minor 56 · Spread ${shuffleCount}`,
      shuffle: "Shuffle Again",
      shuffleEnabledHint: (count) => `Shuffle and spread ${count} cards again before selecting.`,
      shuffleDisabledHint: "A card is already selected, so this spread will stay as it is.",
      fanGroups: {
        major: { title: "Major Arcana", subtitle: "22 big-flow cards" },
        cupsWands: { title: "Cups · Wands", subtitle: "28 emotion and action cards" },
        swordsPentacles: { title: "Swords · Pentacles", subtitle: "28 judgment and reality cards" }
      },
      fanAccessibilityLabel: (groupTitle) => `${groupTitle} card fan`,
      fanAccessibilityHint: "Selects the card closest to the point you tap in the fan.",
      resultButton: "View Result",
      resultEnabledHint: "Moves to the result screen for the three selected cards.",
      resultDisabledHint: "Select all three cards before viewing the result."
    },
    card: {
      selectedOrderLabel: (order) => `Tarot card selected as number ${order}`,
      selectLabel: "Select tarot card",
      hiddenCard: "Hidden Card",
      hiddenArcana: "Hidden Arcana"
    },
    result: {
      title: "Your Three Cards",
      resultErrorTitle: "Result Error",
      fallbackError: "Could not load the result data.",
      storyKicker: "Core of This Reading",
      totalSummary: "Summary",
      score: "Fortune Score",
      lotteryNumbers: "Card Number Picks",
      oneLineAdvice: "One-Line Advice",
      loadingAd: "Checking ad...",
      rewardButton: "Watch Ad for Detailed Reading",
      adError: "Ad confirmation failed. Please try again later.",
      detailSummary: "Detailed Summary",
      lotteryFlow: "How the Numbers Appeared",
      situationOverview: "What Your Situation May Look Like",
      cardReadingTitle: (index, positionLabel) => `Card ${index + 1} Reading · ${positionLabel}`,
      cardMeaning: "Card Meaning",
      currentFortune: "Current Fortune",
      situationExample: "Situation Example",
      whyImportant: "Why It Matters",
      advice: "Advice",
      nextAction: "Practical Action",
      connectionReading: "Three-Card Connection",
      relatablePatterns: "Relatable Points",
      actionItems: "Actions for Today",
      practicalNextSteps: "Situation-Based Next Steps",
      avoidActions: "Actions to Avoid",
      timingHint: "Timing Hint",
      overallFlow: "Overall Flow",
      caution: "Caution",
      luckyColor: "Lucky Color",
      luckyNumber: "Lucky Number",
      retry: "Read Again",
      otherFortune: "Choose Another Fortune",
      lotteryFlowBody: (cards) =>
        `${cards[0]} opens the first number flow, ${cards[1]} balances the middle numbers, and ${cards[2]} shapes the bonus number mood. This is a playful conversion of card symbols into numbers, not a prediction of actual results.`
    },
    settings: {
      title: "Settings",
      subtitle: "Choose the language for buttons, guidance, and card reading text.",
      languageLabel: "Language Pack",
      selectHint: "Open the language list and change the app display language.",
      previewTitle: "Preview",
      previewBody: "The selected language applies immediately to the lobby, card selection, and result reading screens.",
      selectLanguage: "Select Language",
      currentLanguage: (name) => `Current language: ${name}`,
      backButton: "Back to Lobby"
    }
  }
};
