export type FortuneCategory = "daily" | "love" | "money" | "work" | "relationship" | "choice" | "lotto";

export type CardDirection = "upright" | "reversed";

export type TarotPosition = 0 | 1 | 2;

export type CardTextSet = {
  cardMeaning: string[];
  currentSituation: string[];
  summary: string[];
  detail: string[];
  advice: string[];
};

export type DirectionalMeaning = {
  upright: CardTextSet;
  reversed: CardTextSet;
};

export type TarotCard = {
  id: string;
  name: string;
  nameKo: string;
  imageKey: string;
  arcana: "major" | "minor";
  meanings: Record<FortuneCategory, DirectionalMeaning>;
};

export type CardSelection = {
  cardId: string;
  direction: CardDirection;
  position: TarotPosition;
};

export type CardDrawCandidate = {
  cardId: string;
  direction: CardDirection;
};

export type ResolvedCardSelection = CardSelection & {
  card: TarotCard;
};

export type CardReadingDetail = {
  cardId: string;
  cardName: string;
  cardNameKo: string;
  direction: CardDirection;
  directionLabel: string;
  position: TarotPosition;
  positionLabel: string;
  cardMeaning: string;
  currentSituation: string;
  situationExample: string;
  whyThisMatters: string;
  nextStep: string;
  summary: string;
  detail: string;
  advice: string;
};

export type TarotReading = {
  storyTitle: string;
  freeSummary: string;
  detailedSummary: string;
  situationOverview: string;
  score: number;
  oneLineAdvice: string;
  cardDetails: CardReadingDetail[];
  connectionReading: string;
  relatablePatterns: string[];
  actionItems: string[];
  practicalNextSteps: string[];
  avoidActions: string[];
  timingHint: string;
  overallFlow: string;
  caution: string;
  luckyColor: string;
  luckyNumber: number;
  lotteryNumbers?: number[];
  lotteryBonusNumber?: number;
  lotteryNote?: string;
};

export type RewardAdResult = {
  success: true;
  rewardedAt: number;
};

export const fortuneCategoryLabels: Record<FortuneCategory, string> = {
  daily: "오늘의 운세",
  love: "연애운",
  money: "금전운",
  work: "직장운",
  relationship: "인간관계",
  choice: "선택의 고민",
  lotto: "로또 번호"
};

export const fortuneCategories = Object.keys(fortuneCategoryLabels) as FortuneCategory[];

export const positionLabels: Record<TarotPosition, string> = {
  0: "현재 흐름",
  1: "숨은 원인",
  2: "앞으로의 방향"
};

export const directionLabels: Record<CardDirection, string> = {
  upright: "정방향",
  reversed: "역방향"
};
