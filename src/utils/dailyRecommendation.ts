import type { FortuneCategory } from "../types/tarot";

const dailyRecommendationPool: FortuneCategory[] = [
  "daily",
  "love",
  "money",
  "work",
  "relationship",
  "choice",
  "lotto"
];

export const dailyRecommendationMessages: Record<FortuneCategory, string> = {
  daily: "흐트러진 하루의 리듬을 먼저 잡기 좋은 날입니다.",
  love: "말보다 온도를 살피면 마음의 방향이 더 잘 보입니다.",
  money: "새는 돈과 작은 행운을 함께 점검하기 좋은 흐름입니다.",
  work: "가장 중요한 일 하나를 끝내면 압박이 줄어드는 날입니다.",
  relationship: "짧고 부드러운 확인이 관계의 공기를 바꿀 수 있습니다.",
  choice: "답을 늘리기보다 기준 하나를 세우기 좋은 날입니다.",
  lotto: "선택한 카드의 상징을 숫자로 바꿔 가볍게 즐기기 좋은 날입니다."
};

function getLocalDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function hashDateKey(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (Math.imul(hash, 31) + value.charCodeAt(index)) >>> 0;
  }

  return hash;
}

export function getDailyRecommendedCategory(date = new Date()): FortuneCategory {
  const dateKey = getLocalDateKey(date);
  const index = hashDateKey(dateKey) % dailyRecommendationPool.length;

  return dailyRecommendationPool[index];
}
