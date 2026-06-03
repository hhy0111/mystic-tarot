import { tarotCards } from "../data/tarotCards";
import {
  directionLabels,
  fortuneCategoryLabels,
  positionLabels,
  type CardDrawCandidate,
  type CardReadingDetail,
  type CardSelection,
  type FortuneCategory,
  type ResolvedCardSelection,
  type TarotCard,
  type TarotPosition,
  type TarotReading
} from "../types/tarot";
import { clamp, pickOne, randomDirection, randomNumber, shuffle, type RandomSource } from "./random";

export const DEFAULT_DRAW_CANDIDATE_COUNT = 78;

const luckyColors: Record<FortuneCategory, string[]> = {
  daily: ["딥 바이올렛", "문라이트 실버", "미드나잇 블루", "샴페인 골드"],
  love: ["로즈 핑크", "와인 퍼플", "크림슨", "라벤더"],
  money: ["앤틱 골드", "에메랄드", "딥 그린", "코퍼"],
  work: ["네이비", "스틸 블루", "차콜", "골드"],
  relationship: ["라일락", "민트", "소프트 골드", "스카이 블루"],
  choice: ["인디고", "화이트 골드", "오팔", "블랙 퍼플"],
  lotto: ["샴페인 골드", "오팔 화이트", "스타 실버", "딥 바이올렛"]
};

const flowPhrases: Record<FortuneCategory, string[]> = {
  daily: [
    "작은 일부터 정리하면 하루의 결이 한결 맑아집니다.",
    "평소보다 감각이 예민하니 일정 사이에 여백을 남겨 두세요."
  ],
  love: [
    "감정을 크게 증명하기보다 편안한 대화가 더 좋은 신호를 만듭니다.",
    "관계의 속도를 맞추면 설렘과 안정감이 함께 살아납니다."
  ],
  money: [
    "큰 결정보다는 새는 부분을 확인하는 태도가 금전운을 지켜 줍니다.",
    "무리한 확신보다 현실적인 기준이 돈의 흐름을 안정시킵니다."
  ],
  work: [
    "우선순위가 분명해질수록 업무의 압박이 줄어듭니다.",
    "성과를 서두르기보다 맡은 범위를 선명하게 잡는 편이 좋습니다."
  ],
  relationship: [
    "말의 양보다 온도가 중요합니다. 짧아도 분명한 표현이 도움이 됩니다.",
    "상대의 반응을 기다리는 여유가 관계의 균형을 회복시킵니다."
  ],
  choice: [
    "모든 답을 한 번에 고르려 하기보다 포기해도 되는 것을 먼저 정리하세요.",
    "마음이 오래 머무는 쪽과 현실적으로 가능한 쪽의 접점을 찾는 흐름입니다."
  ],
  lotto: [
    "카드가 남긴 상징을 숫자로 바꾸되, 결과를 맞힌다는 확신보다 가벼운 재미로 보는 편이 좋습니다.",
    "선택한 세 장의 위치와 방향이 번호의 분위기를 만들지만, 당첨 보장이나 구매 권유의 의미는 아닙니다."
  ]
};

const storyOpeners: Record<FortuneCategory, string[]> = {
  daily: [
    "오늘의 흐름은 한 번에 크게 바뀌기보다 작은 선택들이 쌓이며 방향이 정리되는 모습입니다.",
    "지금 하루의 핵심은 기분을 따라 흔들리기보다 눈앞의 일을 차분히 처리하는 데 있습니다."
  ],
  love: [
    "이번 연애운은 상대의 마음을 단번에 확인하는 흐름보다, 서로의 온도를 조심스럽게 맞춰 가는 흐름에 가깝습니다.",
    "지금 관계의 핵심은 강한 표현보다 부담 없는 접점입니다. 마음은 움직일 수 있지만 속도 조절이 필요합니다."
  ],
  money: [
    "이번 금전운은 큰 한 방보다 지출 흐름을 정리하며 안정감을 회복하는 쪽에 힘이 실립니다.",
    "지금 돈의 흐름은 새 기회를 잡기 전에 새는 부분을 줄이고 기준을 다시 세우라는 신호가 강합니다."
  ],
  work: [
    "이번 직장운은 능력보다 정리력과 우선순위가 결과를 가르는 흐름입니다.",
    "지금 일의 핵심은 많은 일을 동시에 잡는 것이 아니라, 가장 중요한 일부터 확실히 끝내는 데 있습니다."
  ],
  relationship: [
    "이번 인간관계 운은 말의 양보다 말의 온도가 중요합니다. 작은 확인이 오해를 줄이는 역할을 합니다.",
    "지금 관계의 흐름은 급하게 정리하기보다 거리와 표현 방식을 다시 맞추는 쪽에 가깝습니다."
  ],
  choice: [
    "이번 선택의 흐름은 정답을 맞히는 문제가 아니라, 내가 감당할 수 있는 방향을 고르는 문제에 가깝습니다.",
    "지금 선택 앞에서 중요한 것은 모든 가능성을 붙잡는 것이 아니라 가장 중요한 기준을 세우는 일입니다."
  ],
  lotto: [
    "이번 로또 번호 리딩은 선택한 카드의 이름, 위치, 정방향과 역방향을 숫자 흐름으로 바꾸는 재미용 추천에 가깝습니다.",
    "지금 카드가 말하는 핵심은 대박을 예측하는 것이 아니라, 오늘의 작은 행운 놀이를 부담 없이 즐기는 쪽에 있습니다."
  ]
};

const actionPools: Record<FortuneCategory, string[]> = {
  daily: [
    "오늘 끝낼 수 있는 가장 작은 일을 먼저 처리하세요.",
    "중요한 약속이나 일정은 한 번 더 확인해 두세요.",
    "기분이 흔들릴 때는 새 일을 늘리지 말고 하던 일을 마무리하세요."
  ],
  love: [
    "긴 고백보다 짧고 편안한 메시지로 분위기를 확인하세요.",
    "상대의 답장 속도만 보고 결론 내리지 말고 대화의 톤을 함께 보세요.",
    "마음이 있다면 부담 없는 안부나 가벼운 제안으로 접점을 만드세요."
  ],
  money: [
    "오늘은 새 지출보다 잔액과 고정비를 먼저 확인하세요.",
    "사고 싶은 것이 있다면 하루 뒤에도 필요한지 다시 판단하세요.",
    "작은 자동결제나 반복 지출을 하나라도 정리해 보세요."
  ],
  work: [
    "가장 급한 업무 하나를 정하고 먼저 끝내세요.",
    "혼자 확정하기 전에 범위와 마감을 짧게 확인하세요.",
    "설명만 늘리지 말고 확인 가능한 작은 결과물을 만드세요."
  ],
  relationship: [
    "오해가 생긴 부분은 추측보다 짧은 확인 질문으로 풀어 보세요.",
    "상대의 말을 바로 평가하지 말고 먼저 끝까지 들어 보세요.",
    "관계를 바꾸고 싶다면 먼저 부드러운 톤으로 말을 여세요."
  ],
  choice: [
    "가장 잃고 싶지 않은 기준 하나를 먼저 적어 보세요.",
    "미뤄도 되는 선택과 오늘 결정해야 하는 선택을 나누세요.",
    "선택지마다 감당해야 할 시간과 비용을 현실적으로 비교하세요."
  ],
  lotto: [
    "추천 번호를 확인한 뒤 구매 여부와 금액은 현실적으로 제한하세요.",
    "번호가 마음에 들면 오늘의 작은 재미로 기록하고, 마음에 들지 않아도 나쁜 징조로 해석하지 마세요.",
    "같은 질문을 반복해서 뽑기보다 오늘 나온 조합 하나를 가볍게 참고하세요."
  ]
};

const avoidPools: Record<FortuneCategory, string[]> = {
  daily: [
    "기분이 급하다고 즉흥적으로 일정을 바꾸는 행동은 피하세요.",
    "작은 실수를 하루 전체의 실패로 확대해석하지 마세요."
  ],
  love: [
    "답을 재촉하거나 떠보는 말로 상대의 마음을 시험하지 마세요.",
    "혼자 결론을 내리고 차갑게 거리를 두는 행동은 피하세요."
  ],
  money: [
    "확신이 없는 결제나 충동구매는 오늘만큼은 미루세요.",
    "불안하다는 이유로 큰 금전 결정을 한 번에 처리하지 마세요."
  ],
  work: [
    "확인 없이 혼자 범위를 넓히거나 책임을 떠안지 마세요.",
    "속도만 내다가 다시 수정해야 하는 흐름을 만들지 마세요."
  ],
  relationship: [
    "상대의 의도를 단정하고 방어적으로 말하는 태도는 피하세요.",
    "서운함을 오래 묵혀 두었다가 한 번에 터뜨리지 마세요."
  ],
  choice: [
    "모든 조건이 완벽해질 때까지 아무것도 고르지 않는 태도는 피하세요.",
    "좋아 보이는 장점만 보고 비용과 책임을 무시하지 마세요."
  ],
  lotto: [
    "추천 번호를 당첨 예측처럼 받아들이거나 무리하게 구매하는 행동은 피하세요.",
    "번호가 좋게 보여도 현실적인 지출 한도를 넘기지 마세요."
  ]
};

const timingHints: Record<FortuneCategory, string[]> = {
  daily: [
    "오전에는 정리, 오후에는 실행에 힘을 주면 흐름이 안정됩니다.",
    "중요한 결정은 바로 하기보다 한 번 쉬고 다시 보는 편이 좋습니다."
  ],
  love: [
    "오늘은 밤늦은 감정적인 연락보다 낮이나 이른 저녁의 가벼운 대화가 더 좋습니다.",
    "상대의 반응을 기다릴 때는 하루 안에 결론을 내리지 않는 편이 좋습니다."
  ],
  money: [
    "결제나 계약은 바로 진행하기보다 한 번 더 비교한 뒤 결정하세요.",
    "오늘 확인한 지출 내역은 이번 주 안에 정리하면 효과가 큽니다."
  ],
  work: [
    "오전에는 우선순위 정리, 오후에는 결과물 공유에 힘을 주세요.",
    "답변이 필요한 일은 미루지 말고 짧게라도 오늘 안에 확인하세요."
  ],
  relationship: [
    "민감한 대화는 피곤한 시간보다 서로 여유가 있는 시간에 꺼내세요.",
    "오늘 풀리지 않는 관계는 하루 정도 간격을 두면 더 부드러워집니다."
  ],
  choice: [
    "오늘은 최종 결정보다 기준 정리에 더 좋은 날입니다.",
    "마음이 급한 선택은 잠시 미루고, 조건이 분명한 선택부터 처리하세요."
  ],
  lotto: [
    "번호는 오늘 한 번만 가볍게 뽑고, 결과 확인 전까지 과하게 의미를 붙이지 않는 편이 좋습니다.",
    "오늘의 추천 번호는 작은 재미로 남기고, 다른 중요한 결정과 연결하지 마세요."
  ]
};

const moodKeywords: Record<FortuneCategory, string[]> = {
  daily: ["오늘은 정리되는 하루", "작은 전환점이 생기는 날", "차분한 회복이 필요한 날"],
  love: ["천천히 가까워지는 마음", "오해를 줄이는 대화의 흐름", "부담 없는 접점이 필요한 때"],
  money: ["새는 돈을 점검할 타이밍", "현실적인 안정이 필요한 흐름", "지출 균형을 다시 잡는 날"],
  work: ["우선순위를 회복할 타이밍", "작은 결과물이 힘이 되는 흐름", "업무 범위를 확인해야 하는 때"],
  relationship: ["부드러운 확인이 필요한 관계", "거리 조절이 필요한 흐름", "말의 온도가 중요한 때"],
  choice: ["기준을 세워야 하는 선택", "선택지를 정리할 타이밍", "감당 가능한 방향을 찾는 흐름"],
  lotto: ["카드가 고른 오늘의 숫자", "가볍게 즐기는 행운 번호", "세 장이 남긴 숫자 조합"]
};

const situationScenes: Record<FortuneCategory, string[]> = {
  daily: [
    "요즘처럼 해야 할 일은 계속 있는데 마음이 따라오지 않는 날에는, 실제 문제보다 머릿속 체크리스트가 더 크게 느껴질 수 있습니다.",
    "겉으로는 평범한 하루처럼 보여도 작은 연락, 미뤄 둔 일정, 정리하지 못한 생각이 한꺼번에 신경 쓰이는 흐름입니다."
  ],
  love: [
    "연애에서는 답장 속도, 말투, 약속을 잡는 방식 같은 작은 신호가 크게 느껴질 수 있습니다. 그래서 상대가 나를 어떻게 생각하는지 계속 해석하게 되는 상황일 수 있습니다.",
    "좋아하는 마음은 있는데 먼저 다가가면 부담스러워 보일까 걱정되고, 가만히 있자니 놓칠 것 같은 애매한 온도가 느껴집니다."
  ],
  money: [
    "돈 문제는 큰 사건이 없어도 작은 결제와 반복 지출이 쌓일 때 불안이 커집니다. 지금은 수입보다 돈이 어디로 새는지 더 신경 쓰이는 상황일 수 있습니다.",
    "사고 싶은 것과 아껴야 한다는 생각이 동시에 올라와서, 결제 직전마다 마음이 흔들리는 흐름입니다."
  ],
  work: [
    "일에서는 해야 할 일은 많은데 무엇부터 끝내야 할지 흐려질 때 압박이 커집니다. 특히 확인받지 않은 업무나 애매한 마감이 신경 쓰일 수 있습니다.",
    "성과를 내고 싶은 마음은 있지만, 동시에 실수하면 다시 고쳐야 한다는 부담 때문에 손이 느려지는 상황일 수 있습니다."
  ],
  relationship: [
    "사람 사이에서는 한마디가 오래 남을 때가 있습니다. 상대는 별뜻 없이 한 말일 수 있는데, 나는 계속 곱씹으며 거리감을 계산하게 되는 흐름입니다.",
    "관계를 잘 유지하고 싶은 마음과 굳이 먼저 맞춰야 하나 싶은 마음이 동시에 올라와서 대화의 온도를 정하기 어려울 수 있습니다."
  ],
  choice: [
    "선택 앞에서는 어느 쪽이 더 좋은지보다, 선택한 뒤 내가 감당할 수 있을지가 더 중요해집니다. 지금은 장점보다 책임이 먼저 보이는 상황일 수 있습니다.",
    "마음은 한쪽으로 기울지만 현실 조건이 따라오지 않거나, 현실적으로 괜찮은 쪽은 마음이 덜 가는 식의 갈등이 느껴집니다."
  ],
  lotto: [
    "로또 번호를 떠올릴 때는 기대감과 재미가 같이 올라오지만, 동시에 숫자 하나하나에 너무 큰 의미를 붙이기 쉬운 순간도 생깁니다.",
    "오늘의 번호 리딩은 실제 결과를 예측하기보다 선택한 카드가 만든 상징적인 숫자 조합을 보는 놀이에 가깝습니다."
  ]
};

const relatablePatternPools: Record<FortuneCategory, string[]> = {
  daily: [
    "아침에는 괜찮다가도 작은 변수 하나에 하루 전체가 흔들리는 느낌이 들 수 있습니다.",
    "해야 할 일을 알면서도 시작 버튼을 누르기까지 시간이 오래 걸리는 흐름입니다.",
    "새로운 일을 벌리기보다 이미 미뤄 둔 일을 마무리할 때 마음이 가벼워집니다.",
    "누군가의 말보다 내 컨디션과 집중력이 하루 분위기를 더 크게 좌우합니다."
  ],
  love: [
    "상대의 답장 속도를 보며 혼자 기대했다가 실망하는 패턴이 반복될 수 있습니다.",
    "좋아하는 마음을 티 내고 싶지만 너무 급해 보일까 봐 표현을 줄이는 상황이 보입니다.",
    "관계가 끝난 것은 아닌데 확실히 가까워졌다고 말하기도 애매한 구간입니다.",
    "상대의 마음을 확인하고 싶을수록 오히려 자연스러운 대화가 더 중요해집니다."
  ],
  money: [
    "큰돈보다 커피, 구독, 배송비처럼 작게 빠지는 돈이 신경 쓰이는 흐름입니다.",
    "지금은 수익을 크게 늘리는 것보다 불필요한 지출을 줄이는 쪽이 체감 효과가 큽니다.",
    "싸다고 느껴 산 것들이 모여 부담이 되는 패턴을 점검해야 합니다.",
    "돈을 쓰면 안 된다는 압박과 나를 위해 쓰고 싶다는 마음이 부딪칠 수 있습니다."
  ],
  work: [
    "일을 못하는 게 아니라 할 일이 흩어져 있어서 능력이 덜 보이는 상황일 수 있습니다.",
    "상대가 원하는 결과물과 내가 생각한 결과물이 달라 다시 확인이 필요합니다.",
    "급한 일에 끌려다니다가 중요한 일을 뒤로 미루는 패턴이 생길 수 있습니다.",
    "완벽하게 준비한 뒤 시작하려다 오히려 첫 결과물이 늦어지는 흐름입니다."
  ],
  relationship: [
    "상대가 나를 무시한 건지, 내가 예민하게 받아들인 건지 헷갈리는 장면이 있을 수 있습니다.",
    "좋은 관계를 유지하고 싶지만 내 감정까지 계속 미루기는 어려운 상황입니다.",
    "말을 꺼내면 커질까 봐 참다가 마음속에서만 대화가 길어지는 패턴이 보입니다.",
    "관계를 끊는 것보다 거리와 표현 방식을 다시 조절하는 쪽이 현실적입니다."
  ],
  choice: [
    "머리로는 답을 아는데 마음이 따라오지 않아 결정을 미루는 흐름입니다.",
    "좋은 선택지를 고르는 문제보다 포기해야 할 것을 받아들이는 문제가 더 크게 느껴집니다.",
    "남들이 보기 좋은 답과 내가 실제로 버틸 수 있는 답이 다를 수 있습니다.",
    "선택지를 더 모을수록 오히려 기준이 흐려지는 패턴을 조심해야 합니다."
  ],
  lotto: [
    "번호가 마음에 들면 괜히 좋은 일이 생길 것 같고, 마음에 들지 않으면 다시 뽑고 싶어질 수 있습니다.",
    "행운을 확인하고 싶을수록 같은 질문을 반복하기 쉬운데, 오늘은 한 번의 조합을 재미로 받아들이는 편이 좋습니다.",
    "카드가 준 번호를 특별하게 느낄 수는 있지만, 실제 결과는 예측할 수 없다는 점을 분명히 두어야 합니다.",
    "숫자를 고르는 순간의 설렘은 살리되, 현실적인 지출 기준은 따로 잡아 두는 흐름이 안정적입니다."
  ]
};

const practicalStepPools: Record<FortuneCategory, string[]> = {
  daily: [
    "오늘 꼭 해야 하는 일 세 개만 적고, 그중 10분 안에 시작할 수 있는 것부터 처리하세요.",
    "답장, 결제, 정리처럼 5분 안에 끝나는 일을 먼저 마무리해 머릿속 소음을 줄이세요.",
    "하루 계획을 새로 짜기보다 이미 잡힌 일정 중 하나를 확실히 지키는 데 집중하세요."
  ],
  love: [
    "상대에게 긴 의미를 담은 말보다 가벼운 안부나 짧은 질문으로 대화의 문을 여세요.",
    "상대 반응을 해석하기 전에 실제로 들은 말과 내가 상상한 내용을 분리해 보세요.",
    "감정이 커진 밤에는 바로 보내지 말고, 아침에 다시 읽어도 괜찮은 메시지만 남기세요."
  ],
  money: [
    "최근 일주일 결제 내역을 열어 반복 지출 하나만 먼저 줄이세요.",
    "바로 사고 싶은 물건은 장바구니에만 넣고, 내일도 필요한지 다시 확인하세요.",
    "이번 달 반드시 나갈 돈과 미뤄도 되는 돈을 나눠 금전 불안을 숫자로 줄이세요."
  ],
  work: [
    "상대가 원하는 결과물의 형태를 한 문장으로 확인한 뒤 작업을 시작하세요.",
    "오늘 끝낼 수 있는 최소 결과물을 정하고, 완성도보다 제출 가능한 상태를 먼저 만드세요.",
    "업무 범위가 애매하면 혼자 떠안지 말고 마감, 우선순위, 책임자를 짧게 물어보세요."
  ],
  relationship: [
    "서운했던 장면을 바로 따지기보다 '그때 이런 뜻이었어?'처럼 확인 질문으로 시작하세요.",
    "관계를 지키고 싶다면 내 감정을 숨기지 말고 부드러운 표현으로 경계를 알려 주세요.",
    "답을 바로 얻으려 하기보다 서로의 말투가 부드러워지는 시간대를 골라 대화하세요."
  ],
  choice: [
    "각 선택지 옆에 얻는 것 하나와 감당해야 할 것 하나를 나란히 적어 보세요.",
    "오늘 결정할 것과 일주일 뒤 결정해도 되는 것을 분리해 선택 피로를 줄이세요.",
    "가장 중요한 기준이 돈, 시간, 마음 중 무엇인지 먼저 고르면 나머지 선택지가 정리됩니다."
  ],
  lotto: [
    "추천 번호 여섯 개와 보너스 번호를 확인한 뒤, 마음에 드는 숫자 하나가 왜 눈에 띄는지 가볍게 메모해 보세요.",
    "구매를 한다면 정해 둔 한도 안에서만 움직이고, 결과가 어떻든 오늘의 작은 이벤트로 마무리하세요.",
    "번호를 다시 뽑고 싶어질 때는 이번 조합이 선택한 세 카드에서 나온 오늘의 한 번뿐인 메시지라고 생각하세요."
  ]
};

const positionExampleOpeners: Record<TarotPosition, string> = {
  0: "예를 들면 지금 겉으로 보이는 문제는",
  1: "이를테면 겉으로는 별일 아닌 것 같아도 속으로는",
  2: "쉽게 말해 앞으로의 방향에서는"
};

function buildDetailedSummary(
  category: FortuneCategory,
  details: readonly CardReadingDetail[],
  random: RandomSource
) {
  const opener = pickOne(storyOpeners[category], random);
  return `${opener} 현재 흐름의 ${details[0].cardNameKo} 카드는 지금 겉으로 보이는 상황을 말해 주고, 숨은 원인의 ${details[1].cardNameKo} 카드는 그 뒤에서 마음이나 조건을 흔드는 이유를 보여 줍니다. 앞으로의 방향에 놓인 ${details[2].cardNameKo} 카드는 다음 행동의 힌트입니다. 그래서 이번 리딩은 단순히 좋다, 나쁘다로 보는 것보다 실제 생활에서 어떤 장면이 반복되는지 함께 보는 것이 중요합니다.`;
}

function buildConnectionReading(
  category: FortuneCategory,
  details: readonly CardReadingDetail[],
  random: RandomSource
) {
  const bridge = pickOne(flowPhrases[category], random);
  return `${details[0].cardNameKo} 카드가 현재 분위기를 보여주고, ${details[1].cardNameKo} 카드가 숨은 원인을 짚어 주며, ${details[2].cardNameKo} 카드가 다음 방향을 열어 줍니다. 이 세 장이 이어지기 때문에 지금은 한 번에 결론을 내리기보다 상황을 확인하고 움직이는 흐름이 더 자연스럽습니다. ${bridge}`;
}

function buildSituationOverview(
  category: FortuneCategory,
  details: readonly CardReadingDetail[],
  random: RandomSource
) {
  const scene = pickOne(situationScenes[category], random);
  const pattern = pickOne(relatablePatternPools[category], random);
  return `${scene} 이번 리딩에서는 ${details[0].positionLabel}에 ${details[0].cardNameKo}, ${details[1].positionLabel}에 ${details[1].cardNameKo}, ${details[2].positionLabel}에 ${details[2].cardNameKo} 카드가 이어졌습니다. ${pattern} 그래서 지금은 카드 하나의 뜻보다, 지금 느끼는 불편함이 어디서 시작됐고 어떤 행동으로 풀릴 수 있는지를 보는 편이 더 현실적입니다.`;
}

function buildSituationExample(category: FortuneCategory, detail: CardReadingDetail, random: RandomSource) {
  const opener = positionExampleOpeners[detail.position];
  const scene = pickOne(situationScenes[category], random);
  return `${opener} "${detail.currentSituation}"에 가깝습니다. ${scene} ${detail.cardNameKo} ${detail.directionLabel}은 이 장면에서 ${detail.positionLabel}의 역할을 하며, 사용자가 이미 느끼고 있던 애매함을 조금 더 구체적인 행동 기준으로 바꿔 줍니다.`;
}

function buildWhyThisMatters(category: FortuneCategory, detail: CardReadingDetail, random: RandomSource) {
  const pattern = pickOne(relatablePatternPools[category], random);
  return `${detail.cardNameKo} 카드가 중요한 이유는 지금 문제가 카드의 상징 하나로 끝나지 않고 실제 습관이나 반응 방식과 연결되기 때문입니다. ${pattern} 이 흐름을 알아차리면 같은 상황을 반복하기보다 한 번 다르게 반응할 여지가 생깁니다.`;
}

function pickMany<T>(items: readonly T[], count: number, random: RandomSource) {
  return shuffle(items, random).slice(0, count);
}

const lotteryNote =
  "선택한 카드 ID, 위치, 정방향/역방향을 숫자로 바꾼 재미용 추천입니다. 당첨을 보장하거나 구매를 권유하는 의미는 아닙니다.";

function hashCardSignal(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function buildLotteryRecommendation(selections: readonly ResolvedCardSelection[]) {
  let seed = selections.reduce((accumulator, selection, index) => {
    const directionValue = selection.direction === "upright" ? 19 : 37;
    const cardSignal = `${selection.cardId}:${selection.card.name}:${selection.card.nameKo}`;
    return (
      accumulator +
      Math.imul(hashCardSignal(cardSignal), index + 3) +
      directionValue +
      selection.position * 53
    ) >>> 0;
  }, 0x9e3779b9);

  const pickedNumbers: number[] = [];
  const seenNumbers = new Set<number>();

  while (pickedNumbers.length < 7) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const nextNumber = (seed % 45) + 1;

    if (!seenNumbers.has(nextNumber)) {
      seenNumbers.add(nextNumber);
      pickedNumbers.push(nextNumber);
    }
  }

  return {
    numbers: pickedNumbers.slice(0, 6).sort((left, right) => left - right),
    bonusNumber: pickedNumbers[6],
    note: lotteryNote
  };
}

export function createRandomCardSelections(
  count = 3,
  random: RandomSource = Math.random,
  cards: readonly TarotCard[] = tarotCards
): CardSelection[] {
  if (count < 1 || count > 3) {
    throw new Error(`Mystic Tarot readings support 1 to 3 selected cards, not ${count}.`);
  }

  return createRandomCardCandidates(count, random, cards).map((candidate, index) => ({
    ...candidate,
    position: index as TarotPosition
  }));
}

export function createRandomCardCandidates(
  count = DEFAULT_DRAW_CANDIDATE_COUNT,
  random: RandomSource = Math.random,
  cards: readonly TarotCard[] = tarotCards
): CardDrawCandidate[] {
  if (count < 1 || count > cards.length) {
    throw new Error(`Cannot draw ${count} unique cards from a pool of ${cards.length}.`);
  }

  return shuffle(cards, random)
    .slice(0, count)
    .map((card) => ({
      cardId: card.id,
      direction: randomDirection(random)
    }));
}

export function resolveCardSelections(
  selections: readonly CardSelection[],
  cards: readonly TarotCard[] = tarotCards
): ResolvedCardSelection[] {
  const seen = new Set<string>();

  return selections.map((selection) => {
    if (seen.has(selection.cardId)) {
      throw new Error(`Duplicate tarot card in one reading session: ${selection.cardId}`);
    }
    seen.add(selection.cardId);

    const card = cards.find((candidate) => candidate.id === selection.cardId);
    if (!card) {
      throw new Error(`Unknown tarot card: ${selection.cardId}`);
    }

    return {
      ...selection,
      card
    };
  });
}

export function generateReading(
  category: FortuneCategory,
  selections: readonly ResolvedCardSelection[],
  random: RandomSource = Math.random
): TarotReading {
  if (selections.length !== 3) {
    throw new Error("Mystic Tarot readings require exactly three selected cards.");
  }

  const cardDetails: CardReadingDetail[] = selections.map((selection) => {
    const meaning = selection.card.meanings[category][selection.direction];
    const baseDetail: CardReadingDetail = {
      cardId: selection.cardId,
      cardName: selection.card.name,
      cardNameKo: selection.card.nameKo,
      direction: selection.direction,
      directionLabel: directionLabels[selection.direction],
      position: selection.position,
      positionLabel: positionLabels[selection.position],
      cardMeaning: pickOne(meaning.cardMeaning, random),
      currentSituation: pickOne(meaning.currentSituation, random),
      situationExample: "",
      whyThisMatters: "",
      nextStep: "",
      summary: pickOne(meaning.summary, random),
      detail: pickOne(meaning.detail, random),
      advice: pickOne(meaning.advice, random)
    };

    return {
      ...baseDetail,
      situationExample: buildSituationExample(category, baseDetail, random),
      whyThisMatters: buildWhyThisMatters(category, baseDetail, random),
      nextStep: pickOne(practicalStepPools[category], random)
    };
  });

  const uprightCount = selections.filter((selection) => selection.direction === "upright").length;
  const reversedCount = selections.length - uprightCount;
  const score = clamp(58 + uprightCount * 9 - reversedCount * 4 + randomNumber(0, 18, random), 35, 96);
  const keyAdvice = pickOne(cardDetails.map((detail) => detail.advice), random);
  const categoryLabel = fortuneCategoryLabels[category];
  const storyTitle = pickOne(moodKeywords[category], random);
  const detailedSummary = buildDetailedSummary(category, cardDetails, random);
  const situationOverview = buildSituationOverview(category, cardDetails, random);
  const connectionReading = buildConnectionReading(category, cardDetails, random);
  const relatablePatterns = pickMany(relatablePatternPools[category], 3, random);
  const actionItems = pickMany(actionPools[category], 3, random);
  const practicalNextSteps = pickMany(practicalStepPools[category], 3, random);
  const avoidActions = pickMany(avoidPools[category], 2, random);
  const timingHint = pickOne(timingHints[category], random);
  const cautionSource = reversedCount > 0
    ? cardDetails.filter((detail) => detail.direction === "reversed")
    : cardDetails;
  const cautionCard = pickOne(cautionSource, random);
  const lotteryRecommendation = category === "lotto" ? buildLotteryRecommendation(selections) : undefined;

  return {
    storyTitle,
    freeSummary: `${categoryLabel}에서는 ${cardDetails[0].positionLabel}에 ${cardDetails[0].cardNameKo}, ${cardDetails[2].positionLabel}에 ${cardDetails[2].cardNameKo} 카드가 나왔습니다. ${cardDetails[0].currentSituation}`,
    detailedSummary,
    situationOverview,
    score,
    oneLineAdvice: keyAdvice,
    cardDetails,
    connectionReading,
    relatablePatterns,
    actionItems,
    practicalNextSteps,
    avoidActions,
    timingHint,
    overallFlow: `${positionLabels[0]}의 ${cardDetails[0].cardNameKo}, ${positionLabels[1]}의 ${cardDetails[1].cardNameKo}, ${positionLabels[2]}의 ${cardDetails[2].cardNameKo} 카드가 이어지며 ${pickOne(flowPhrases[category], random)}`,
    caution: `${cautionCard.cardNameKo}의 메시지처럼 ${cautionCard.advice}`,
    luckyColor: pickOne(luckyColors[category], random),
    luckyNumber: randomNumber(1, 99, random),
    lotteryNumbers: lotteryRecommendation?.numbers,
    lotteryBonusNumber: lotteryRecommendation?.bonusNumber,
    lotteryNote: lotteryRecommendation?.note
  };
}
