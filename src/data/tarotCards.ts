import type { CardTextSet, DirectionalMeaning, FortuneCategory, TarotCard } from "../types/tarot";
import { tarotImageManifest } from "./tarotImageManifest";

type CategoryFrame = {
  subject: string;
  field: string;
  action: string;
  caution: string;
};

type CardSeed = {
  id: string;
  name: string;
  nameKo: string;
  imageKey: string;
  uprightTheme: string;
  uprightSignal: string;
  uprightAction: string;
  reversedTheme: string;
  reversedSignal: string;
  reversedAction: string;
};

const categoryFrames: Record<FortuneCategory, CategoryFrame> = {
  daily: {
    subject: "오늘 하루",
    field: "일상의 리듬",
    action: "작게 움직이는 선택",
    caution: "기분에 끌려 급히 반응하는 태도"
  },
  love: {
    subject: "마음의 흐름",
    field: "관계의 온도",
    action: "솔직하지만 부드러운 표현",
    caution: "상대의 반응을 앞서 단정하는 습관"
  },
  money: {
    subject: "돈의 흐름",
    field: "소비와 관리",
    action: "현실적인 우선순위 정리",
    caution: "확인 없는 지출이나 성급한 판단"
  },
  work: {
    subject: "일의 방향",
    field: "업무와 성과",
    action: "핵심을 정리한 실행",
    caution: "책임 범위를 흐리는 결정"
  },
  relationship: {
    subject: "사람 사이의 기운",
    field: "대화와 거리감",
    action: "상대의 입장을 듣는 태도",
    caution: "작은 오해를 오래 붙잡는 마음"
  },
  choice: {
    subject: "선택 앞의 마음",
    field: "갈림길의 기준",
    action: "가장 중요한 기준 하나를 세우는 일",
    caution: "모든 가능성을 한 번에 잡으려는 욕심"
  },
  lotto: {
    subject: "카드가 남긴 숫자 기운",
    field: "행운 번호의 상징",
    action: "가볍게 즐기는 숫자 선택",
    caution: "당첨을 확신하거나 무리하게 구매하려는 마음"
  }
};

const cardSeeds: CardSeed[] = [
  {
    id: "the_fool",
    name: "The Fool",
    nameKo: "바보",
    imageKey: "the_fool",
    uprightTheme: "새로운 시작",
    uprightSignal: "가볍게 문이 열리는 신호",
    uprightAction: "완벽함보다 첫걸음을 선택하는 태도",
    reversedTheme: "성급함",
    reversedSignal: "준비보다 마음이 앞서는 신호",
    reversedAction: "충동을 한 번 늦추고 확인하는 태도"
  },
  {
    id: "the_magician",
    name: "The Magician",
    nameKo: "마법사",
    imageKey: "the_magician",
    uprightTheme: "실행력",
    uprightSignal: "가진 도구를 활용할 기회",
    uprightAction: "말보다 결과를 만드는 움직임",
    reversedTheme: "산만함",
    reversedSignal: "능력은 있지만 초점이 흐려지는 신호",
    reversedAction: "할 일을 하나로 좁히는 태도"
  },
  {
    id: "the_high_priestess",
    name: "The High Priestess",
    nameKo: "여사제",
    imageKey: "the_high_priestess",
    uprightTheme: "직감",
    uprightSignal: "겉으로 보이지 않는 힌트",
    uprightAction: "조용히 관찰하며 흐름을 읽는 태도",
    reversedTheme: "불신",
    reversedSignal: "감정과 사실이 뒤섞이는 신호",
    reversedAction: "추측과 확인된 내용을 분리하는 태도"
  },
  {
    id: "the_empress",
    name: "The Empress",
    nameKo: "여황제",
    imageKey: "the_empress",
    uprightTheme: "풍요",
    uprightSignal: "편안함과 성장이 함께 오는 신호",
    uprightAction: "충분히 돌보고 키우는 태도",
    reversedTheme: "과잉",
    reversedSignal: "좋은 마음이 부담으로 커지는 신호",
    reversedAction: "내 몫과 상대의 몫을 나누는 태도"
  },
  {
    id: "the_emperor",
    name: "The Emperor",
    nameKo: "황제",
    imageKey: "the_emperor",
    uprightTheme: "질서",
    uprightSignal: "기준을 세우면 안정되는 신호",
    uprightAction: "계획과 경계를 명확히 하는 태도",
    reversedTheme: "고집",
    reversedSignal: "통제하려 할수록 답답해지는 신호",
    reversedAction: "원칙은 지키되 표현을 부드럽게 하는 태도"
  },
  {
    id: "the_hierophant",
    name: "The Hierophant",
    nameKo: "교황",
    imageKey: "the_hierophant",
    uprightTheme: "조언",
    uprightSignal: "믿을 만한 기준이 도움이 되는 신호",
    uprightAction: "경험 있는 말에 귀를 기울이는 태도",
    reversedTheme: "틀에 갇힘",
    reversedSignal: "남의 기준만 따라가면 답이 흐려지는 신호",
    reversedAction: "조언을 듣되 내 상황에 맞게 고르는 태도"
  },
  {
    id: "the_lovers",
    name: "The Lovers",
    nameKo: "연인",
    imageKey: "the_lovers",
    uprightTheme: "조화",
    uprightSignal: "마음과 선택이 가까워지는 신호",
    uprightAction: "진심을 기준으로 맞춰 가는 태도",
    reversedTheme: "엇갈림",
    reversedSignal: "원하는 것과 말하는 것이 달라지는 신호",
    reversedAction: "감정을 숨기기보다 정확히 표현하는 태도"
  },
  {
    id: "the_chariot",
    name: "The Chariot",
    nameKo: "전차",
    imageKey: "the_chariot",
    uprightTheme: "돌파",
    uprightSignal: "멈췄던 일이 앞으로 움직이는 신호",
    uprightAction: "방향을 정하고 밀고 나가는 태도",
    reversedTheme: "무리한 속도",
    reversedSignal: "의욕이 앞서 균형이 흔들리는 신호",
    reversedAction: "속도보다 조절을 먼저 보는 태도"
  },
  {
    id: "strength",
    name: "Strength",
    nameKo: "힘",
    imageKey: "strength",
    uprightTheme: "부드러운 용기",
    uprightSignal: "차분함이 상황을 이끄는 신호",
    uprightAction: "강하게 밀기보다 꾸준히 버티는 태도",
    reversedTheme: "자신감 저하",
    reversedSignal: "작은 흔들림을 크게 느끼는 신호",
    reversedAction: "지금 가능한 만큼만 시도하는 태도"
  },
  {
    id: "the_hermit",
    name: "The Hermit",
    nameKo: "은둔자",
    imageKey: "the_hermit",
    uprightTheme: "성찰",
    uprightSignal: "혼자 정리할수록 답이 선명해지는 신호",
    uprightAction: "소음에서 물러나 핵심을 보는 태도",
    reversedTheme: "고립",
    reversedSignal: "생각이 길어져 움직임이 줄어드는 신호",
    reversedAction: "혼자 결론 내리기 전에 작은 대화를 여는 태도"
  }
];

type ThemeProfile = {
  uprightTheme: string;
  uprightSignal: string;
  uprightAction: string;
  reversedTheme: string;
  reversedSignal: string;
  reversedAction: string;
};

const generatedMajorProfiles: Record<string, ThemeProfile> = {
  wheel_of_fortune: {
    uprightTheme: "흐름의 전환",
    uprightSignal: "상황이 예상 밖으로 움직이는 신호",
    uprightAction: "변화를 막기보다 타이밍을 읽는 태도",
    reversedTheme: "반복되는 패턴",
    reversedSignal: "같은 문제가 다시 돌아오는 신호",
    reversedAction: "운에 맡기기보다 반복 원인을 끊는 태도"
  },
  justice: {
    uprightTheme: "공정한 판단",
    uprightSignal: "기준을 분명히 세워야 하는 신호",
    uprightAction: "감정보다 사실과 균형을 확인하는 태도",
    reversedTheme: "불균형",
    reversedSignal: "한쪽 입장만 보고 판단하기 쉬운 신호",
    reversedAction: "결론보다 근거를 다시 점검하는 태도"
  },
  the_hanged_man: {
    uprightTheme: "관점 전환",
    uprightSignal: "잠시 멈춰야 답이 보이는 신호",
    uprightAction: "서두르지 않고 다른 각도에서 보는 태도",
    reversedTheme: "답답한 정체",
    reversedSignal: "멈춤이 길어져 피로가 쌓이는 신호",
    reversedAction: "작은 선택으로 흐름을 다시 여는 태도"
  },
  death: {
    uprightTheme: "마무리와 재정리",
    uprightSignal: "끝낼 것을 끝내야 새 흐름이 오는 신호",
    uprightAction: "붙잡던 것을 정리하고 다음 단계로 가는 태도",
    reversedTheme: "변화 저항",
    reversedSignal: "끝난 일을 계속 붙드는 신호",
    reversedAction: "아쉬움과 현실을 분리해 정리하는 태도"
  },
  temperance: {
    uprightTheme: "조절과 회복",
    uprightSignal: "속도와 균형이 맞아지는 신호",
    uprightAction: "극단을 피하고 중간 지점을 찾는 태도",
    reversedTheme: "과열",
    reversedSignal: "감정이나 일정이 한쪽으로 쏠리는 신호",
    reversedAction: "무리한 속도를 낮추고 균형을 회복하는 태도"
  },
  the_devil: {
    uprightTheme: "집착의 자각",
    uprightSignal: "나를 묶는 습관을 알아차리는 신호",
    uprightAction: "끌려가는 선택을 멈추고 기준을 세우는 태도",
    reversedTheme: "유혹과 반복",
    reversedSignal: "알면서도 반복하는 패턴이 강해지는 신호",
    reversedAction: "즉각적인 만족보다 장기적인 손익을 보는 태도"
  },
  the_tower: {
    uprightTheme: "급격한 깨달음",
    uprightSignal: "감춰진 문제가 드러나는 신호",
    uprightAction: "무너진 부분을 인정하고 다시 세우는 태도",
    reversedTheme: "불안한 회피",
    reversedSignal: "문제를 알지만 미루고 싶은 신호",
    reversedAction: "작은 균열부터 현실적으로 고치는 태도"
  },
  the_star: {
    uprightTheme: "희망과 회복",
    uprightSignal: "긴장이 풀리고 가능성이 보이는 신호",
    uprightAction: "작은 희망을 현실 행동으로 이어 가는 태도",
    reversedTheme: "기대 저하",
    reversedSignal: "좋은 신호를 믿기 어려운 상태",
    reversedAction: "큰 확신보다 작은 회복부터 확인하는 태도"
  },
  the_moon: {
    uprightTheme: "불확실한 감정",
    uprightSignal: "사실보다 상상이 커지는 신호",
    uprightAction: "불안을 바로 믿지 않고 확인하는 태도",
    reversedTheme: "혼란",
    reversedSignal: "정보와 감정이 섞여 판단이 흐려지는 신호",
    reversedAction: "분명한 사실부터 다시 정리하는 태도"
  },
  the_sun: {
    uprightTheme: "명확한 활력",
    uprightSignal: "분위기가 밝아지고 자신감이 살아나는 신호",
    uprightAction: "숨기지 말고 밝게 드러내는 태도",
    reversedTheme: "과한 낙관",
    reversedSignal: "좋게만 보고 놓치는 부분이 생기는 신호",
    reversedAction: "기대와 현실 확인을 함께 두는 태도"
  },
  judgement: {
    uprightTheme: "결정과 각성",
    uprightSignal: "미뤄 둔 답을 마주해야 하는 신호",
    uprightAction: "지난 경험을 기준으로 결론을 정리하는 태도",
    reversedTheme: "판단 지연",
    reversedSignal: "알면서도 결정을 미루는 신호",
    reversedAction: "완벽한 확신보다 필요한 결정을 먼저 하는 태도"
  },
  the_world: {
    uprightTheme: "완성과 확장",
    uprightSignal: "한 단계가 마무리되고 시야가 넓어지는 신호",
    uprightAction: "끝낸 것을 인정하고 다음 문을 여는 태도",
    reversedTheme: "미완성",
    reversedSignal: "마무리하지 못한 일이 발목을 잡는 신호",
    reversedAction: "새 시작보다 남은 정리를 끝내는 태도"
  }
};

const suitProfiles: Record<string, Pick<ThemeProfile, "uprightSignal" | "uprightAction" | "reversedSignal" | "reversedAction">> = {
  wands: {
    uprightSignal: "의욕과 추진력이 살아나는 신호",
    uprightAction: "망설임보다 작은 실행을 먼저 고르는 태도",
    reversedSignal: "열정은 있지만 방향이 흔들리는 신호",
    reversedAction: "속도보다 목적을 다시 맞추는 태도"
  },
  cups: {
    uprightSignal: "감정과 관계의 흐름이 부드러워지는 신호",
    uprightAction: "마음을 숨기기보다 편안하게 나누는 태도",
    reversedSignal: "감정이 커져 사실을 흐리기 쉬운 신호",
    reversedAction: "마음과 상황을 분리해 확인하는 태도"
  },
  swords: {
    uprightSignal: "생각과 말이 상황을 정리하는 신호",
    uprightAction: "핵심을 분명히 말하고 판단을 세우는 태도",
    reversedSignal: "생각이 많아져 말과 판단이 날카로워지는 신호",
    reversedAction: "바로 반응하기보다 말을 고르는 태도"
  },
  pentacles: {
    uprightSignal: "현실적인 성과와 안정이 쌓이는 신호",
    uprightAction: "돈, 시간, 체력을 실제 기준으로 관리하는 태도",
    reversedSignal: "현실 부담이나 지출이 커지는 신호",
    reversedAction: "욕심보다 지속 가능한 선택을 고르는 태도"
  }
};

const rankProfiles: Record<string, Pick<ThemeProfile, "uprightTheme" | "reversedTheme">> = {
  ace: { uprightTheme: "새 씨앗", reversedTheme: "시작 지연" },
  two: { uprightTheme: "균형과 선택", reversedTheme: "망설임" },
  three: { uprightTheme: "확장과 협력", reversedTheme: "기대 어긋남" },
  four: { uprightTheme: "안정과 기반", reversedTheme: "정체" },
  five: { uprightTheme: "갈등과 조정", reversedTheme: "소모전" },
  six: { uprightTheme: "회복과 도움", reversedTheme: "불균형한 주고받음" },
  seven: { uprightTheme: "평가와 전략", reversedTheme: "흔들리는 기준" },
  eight: { uprightTheme: "집중과 진행", reversedTheme: "과부하" },
  nine: { uprightTheme: "축적과 점검", reversedTheme: "불안한 마무리" },
  ten: { uprightTheme: "완성의 무게", reversedTheme: "부담 누적" },
  page: { uprightTheme: "새 소식과 배움", reversedTheme: "미숙한 시도" },
  knight: { uprightTheme: "움직임과 추진", reversedTheme: "성급한 전진" },
  queen: { uprightTheme: "돌봄과 영향력", reversedTheme: "감정 소모" },
  king: { uprightTheme: "책임과 통제력", reversedTheme: "고집과 압박" }
};

function buildGeneratedSeed(card: (typeof tarotImageManifest)[number]): CardSeed {
  const existingMajorProfile = generatedMajorProfiles[card.id];

  if (existingMajorProfile) {
    return {
      id: card.id,
      name: card.name,
      nameKo: card.nameKo,
      imageKey: card.imageKey,
      ...existingMajorProfile
    };
  }

  const [rankKey] = card.id.split("_of_");
  const suitProfile = card.suit ? suitProfiles[card.suit] : suitProfiles.wands;
  const rankProfile = rankProfiles[rankKey] ?? rankProfiles.ace;

  return {
    id: card.id,
    name: card.name,
    nameKo: card.nameKo,
    imageKey: card.imageKey,
    uprightTheme: `${card.nameKo}의 ${rankProfile.uprightTheme}`,
    uprightSignal: suitProfile.uprightSignal,
    uprightAction: suitProfile.uprightAction,
    reversedTheme: `${card.nameKo}의 ${rankProfile.reversedTheme}`,
    reversedSignal: suitProfile.reversedSignal,
    reversedAction: suitProfile.reversedAction
  };
}

const cardSeedById = new Map(cardSeeds.map((seed) => [seed.id, seed]));
const tarotCardSeeds = tarotImageManifest.map((card) => cardSeedById.get(card.id) ?? buildGeneratedSeed(card));

function makeCardMeaning(seed: CardSeed, direction: "upright" | "reversed"): string[] {
  const isUpright = direction === "upright";
  const theme = isUpright ? seed.uprightTheme : seed.reversedTheme;
  const signal = isUpright ? seed.uprightSignal : seed.reversedSignal;
  const action = isUpright ? seed.uprightAction : seed.reversedAction;

  if (isUpright) {
    return [
      `${seed.nameKo} 카드가 보여주는 핵심 상징은 ${theme}입니다. 대단한 사건이 갑자기 생긴다는 뜻보다, 이미 내 주변에 있는 사람, 기회, 말 한마디, 작은 행동을 어떻게 쓰느냐가 중요하다는 뜻입니다.`,
      `${seed.nameKo} 카드는 지금 ${signal}라고 말합니다. 상황이 완전히 닫혀 있지 않고, 사용자가 먼저 정리하거나 표현하거나 움직이면 흐름이 조금씩 바뀔 수 있다는 의미입니다.`,
      `이 카드는 추상적인 행운보다 현실적인 태도를 말합니다. 지금은 ${action}가 필요하고, 그 행동이 작아 보여도 분위기를 바꾸는 시작점이 될 수 있습니다.`
    ];
  }

  return [
    `${seed.nameKo} 역방향 카드가 보여주는 조절 지점은 ${theme}입니다. 나쁜 일이 생긴다는 뜻이 아니라, 익숙한 반응 방식이 오히려 상황을 복잡하게 만들 수 있다는 신호입니다.`,
    `${seed.nameKo} 역방향 카드는 지금 ${signal}라고 말합니다. 그래서 바로 결론을 내리기보다, 감정과 사실을 나누고 속도와 판단을 다시 맞추는 편이 좋습니다.`,
    `이 카드는 멈춤의 의미가 강합니다. 지금 필요한 것은 포기라기보다 ${action}이며, 작은 확인이 불필요한 오해나 손해를 줄여 줍니다.`
  ];
}

function makeCurrentSituation(seed: CardSeed, category: FortuneCategory, direction: "upright" | "reversed"): string[] {
  const isUpright = direction === "upright";

  const uprightSituations: Record<FortuneCategory, string[]> = {
    daily: [
      `오늘은 일이 조금씩 풀릴 수 있는 흐름입니다. 지금 바로 끝낼 수 있는 작은 일부터 처리하면 하루가 안정됩니다.`,
      `현재 컨디션이 크게 나쁘지 않습니다. 계획을 복잡하게 늘리기보다 한 가지를 정해 움직이는 편이 좋습니다.`
    ],
    love: [
      `지금 연애운에서는 관계가 조금씩 움직이는 상황입니다. 상대의 말투나 답장 속도만 보고 결론 내리지 말고, 가볍게 안부를 묻는 정도가 좋습니다.`,
      `현재 마음은 열려 있지만 아직 확신까지는 시간이 필요합니다. 부담을 주기보다 자연스럽게 대화 횟수를 늘려 보세요.`
    ],
    money: [
      `현재 금전운은 큰 수익보다 관리가 중요한 흐름입니다. 오늘은 새 지출을 만들기보다 고정비와 잔액을 확인하는 편이 좋습니다.`,
      `지금 돈 문제는 무리한 선택보다 정리가 먼저입니다. 작은 소비를 줄이면 다음 선택지가 더 선명해집니다.`
    ],
    work: [
      `현재 일에서는 할 일이 많아 보여도 우선순위를 잡으면 풀립니다. 가장 급한 업무 하나를 먼저 끝내는 것이 좋습니다.`,
      `지금 직장운은 실행력이 살아나는 흐름입니다. 말로 설명하기보다 작은 결과물을 보여주면 신뢰를 얻기 쉽습니다.`
    ],
    relationship: [
      `현재 인간관계에서는 먼저 부드럽게 말을 걸면 분위기가 풀릴 수 있습니다. 상대의 반응을 단정하지 않는 것이 중요합니다.`,
      `지금은 관계를 크게 정리하기보다 오해를 줄이는 대화가 필요한 시점입니다. 짧게라도 확인하는 말이 도움이 됩니다.`
    ],
    choice: [
      `현재 선택의 고민은 완벽한 답을 찾기보다 첫 기준을 정해야 하는 상황입니다. 가장 잃고 싶지 않은 것을 먼저 골라 보세요.`,
      `지금은 모든 가능성을 비교하느라 마음이 지칠 수 있습니다. 오늘 결정할 수 있는 범위와 미뤄도 되는 범위를 나누세요.`
    ],
    lotto: [
      `오늘의 카드는 숫자를 고르는 재미를 살려도 좋은 흐름입니다. 다만 결과를 맞힌다는 의미보다, 카드의 상징을 번호로 바꿔 가볍게 참고하는 정도가 좋습니다.`,
      `지금은 강한 확신보다 작은 행운 놀이에 어울리는 분위기입니다. 선택한 카드의 이름, 위치, 정역방향을 숫자로 변환해 추천 번호를 만들 수 있습니다.`
    ]
  };

  const reversedSituations: Record<FortuneCategory, string[]> = {
    daily: [
      `오늘은 마음이 급해지면 작은 일도 크게 느껴질 수 있습니다. 지금은 속도를 줄이고 해야 할 일을 하나씩 확인하는 편이 좋습니다.`,
      `현재 흐름은 조금 산만합니다. 갑자기 일정을 바꾸기보다 이미 정해진 일부터 마무리하세요.`
    ],
    love: [
      `지금 연애운에서는 혼자 앞서 생각하거나 상대를 시험하고 싶은 마음이 생길 수 있습니다. 답을 재촉하면 오히려 거리가 생길 수 있습니다.`,
      `현재 관계에서는 오해가 커지기 쉬운 상태입니다. 애매한 말보다 사실 확인이 먼저이고, 감정적인 메시지는 잠시 늦추는 편이 좋습니다.`
    ],
    money: [
      `현재 금전운에서는 충동구매나 성급한 결제가 문제를 만들 수 있습니다. 오늘은 결제 전 한 번 더 필요성을 확인하세요.`,
      `지금 돈 흐름은 새로 벌기보다 새는 부분을 막아야 하는 상황입니다. 작은 자동결제나 반복 지출을 점검해 보세요.`
    ],
    work: [
      `현재 직장운에서는 의욕은 있지만 방향이 흔들릴 수 있습니다. 지금 맡은 일의 범위와 마감부터 다시 확인하세요.`,
      `지금 일에서는 혼자 판단하고 밀어붙이면 다시 수정할 가능성이 큽니다. 짧게라도 확인받고 움직이는 편이 좋습니다.`
    ],
    relationship: [
      `현재 인간관계에서는 서운함을 오래 붙잡기 쉬운 흐름입니다. 지금은 상대의 의도를 단정하기보다 사실만 확인하세요.`,
      `지금 관계에서는 말이 꼬이기 쉽습니다. 중요한 이야기는 짧고 분명하게 하고, 감정적인 해석은 잠시 내려두세요.`
    ],
    choice: [
      `현재 선택의 고민에서는 마음이 조급해져 잘못 고를 수 있습니다. 지금 당장 정하지 않아도 되는 것은 하루 정도 미뤄도 됩니다.`,
      `지금은 장점만 보고 선택하면 놓치는 부분이 생길 수 있습니다. 포기해야 할 비용과 시간을 먼저 확인하세요.`
    ],
    lotto: [
      `지금은 숫자에 의미를 너무 크게 붙이면 기대가 부담으로 바뀔 수 있습니다. 추천 번호는 재미용으로만 보고, 무리한 구매나 반복 확인은 피하는 편이 좋습니다.`,
      `오늘의 흐름은 행운을 시험하기보다 가볍게 즐기는 쪽에 가깝습니다. 번호가 마음에 들지 않아도 좋은 징조나 나쁜 징조로 단정하지 마세요.`
    ]
  };

  return isUpright ? uprightSituations[category] : reversedSituations[category];
}

function makeAdvice(seed: CardSeed, category: FortuneCategory, direction: "upright" | "reversed"): string[] {
  const isUpright = direction === "upright";

  const uprightAdvice: Record<FortuneCategory, string[]> = {
    daily: [
      `오늘은 할 일을 많이 벌리지 말고, 가장 쉬운 일 하나를 끝내면서 리듬을 잡으세요.`,
      `작은 성과를 먼저 만들면 남은 하루의 흐름이 안정됩니다.`
    ],
    love: [
      `상대의 답장 하나로 결론 내리지 말고, 짧고 편안한 메시지로 분위기를 확인해 보세요.`,
      `마음이 있다면 돌려 말하기보다 부담 없는 표현으로 호감을 보여 주세요.`
    ],
    money: [
      `오늘은 새 지출보다 잔액과 고정비 확인이 먼저입니다.`,
      `사고 싶은 것이 있다면 바로 결제하지 말고 하루 뒤에도 필요한지 다시 보세요.`
    ],
    work: [
      `가장 중요한 업무 하나를 먼저 끝내고, 그다음 일을 정하세요.`,
      `설명만 길게 하기보다 확인 가능한 작은 결과물을 만들어 보세요.`
    ],
    relationship: [
      `상대가 어떻게 생각할지 추측하지 말고, 짧게 확인하는 말을 건네세요.`,
      `분위기를 바꾸고 싶다면 먼저 부드러운 톤으로 대화를 시작하세요.`
    ],
    choice: [
      `가장 중요한 기준 하나만 적고, 그 기준에 맞는 선택지를 남기세요.`,
      `오늘은 모든 답을 정하려 하지 말고 버릴 선택지부터 줄이세요.`
    ],
    lotto: [
      `추천 번호는 카드가 만든 재미용 조합으로만 받아들이고, 당첨 예측이나 구매 권유로 받아들이지 마세요.`,
      `번호를 고른 뒤에는 결과에 너무 매달리지 말고, 오늘의 작은 재미로 가볍게 넘기세요.`
    ]
  };

  const reversedAdvice: Record<FortuneCategory, string[]> = {
    daily: [
      `오늘은 즉흥적으로 반응하기보다 잠깐 멈추고 확인한 뒤 움직이세요.`,
      `일이 꼬인다고 느껴지면 새 일을 만들지 말고 하던 일을 마무리하세요.`
    ],
    love: [
      `답을 재촉하거나 떠보는 말은 피하세요. 지금은 차분한 확인이 더 안전합니다.`,
      `감정이 올라온 상태라면 메시지를 바로 보내지 말고 조금 뒤에 다시 읽어 보세요.`
    ],
    money: [
      `충동구매 가능성이 있으니 결제 전 필요성, 금액, 대체 선택지를 확인하세요.`,
      `오늘은 큰돈이 들어가는 결정은 미루고 반복 지출부터 점검하세요.`
    ],
    work: [
      `혼자 확정하지 말고 일정, 범위, 책임자를 한 번 더 확인하세요.`,
      `속도를 내기보다 수정 가능성을 줄이는 방식으로 일하세요.`
    ],
    relationship: [
      `서운함을 바로 표현하기보다 어떤 말이나 행동이 불편했는지 먼저 정리하세요.`,
      `상대를 단정하는 말은 피하고, 확인 질문으로 대화를 여세요.`
    ],
    choice: [
      `지금 당장 결정하지 않아도 되는 선택은 잠시 미루고 조건을 더 확인하세요.`,
      `좋아 보이는 쪽만 보지 말고 감당해야 할 비용과 시간을 함께 보세요.`
    ],
    lotto: [
      `기대가 커질수록 판단이 흐려질 수 있으니, 추천 번호를 보고도 구매 여부와 금액은 현실적으로 제한하세요.`,
      `같은 질문을 반복해서 뽑기보다 한 번 나온 번호를 오늘의 재미용 메시지로만 기록하세요.`
    ]
  };

  return isUpright ? uprightAdvice[category] : reversedAdvice[category];
}

function makeTextSet(seed: CardSeed, category: FortuneCategory, direction: "upright" | "reversed"): CardTextSet {
  const frame = categoryFrames[category];
  const isUpright = direction === "upright";
  const theme = isUpright ? seed.uprightTheme : seed.reversedTheme;
  const signal = isUpright ? seed.uprightSignal : seed.reversedSignal;
  const action = isUpright ? seed.uprightAction : seed.reversedAction;
  const cardMeaning = makeCardMeaning(seed, direction);
  const currentSituation = makeCurrentSituation(seed, category, direction);
  const advice = makeAdvice(seed, category, direction);

  if (isUpright) {
    return {
      cardMeaning,
      currentSituation,
      summary: [
        `${frame.subject}은 조금씩 움직일 가능성이 있습니다.`,
        `${seed.nameKo}는 ${frame.field}에서 지금 활용할 수 있는 힘을 보여 줍니다.`,
        `현재는 무리하게 밀기보다 작은 행동으로 흐름을 여는 시점입니다.`
      ],
      detail: [
        `${currentSituation[0]} ${seed.nameKo} 카드는 이 흐름을 더 안정적으로 쓰라는 뜻입니다.`,
        `${currentSituation[1]} 카드가 말하는 핵심은 ${action}입니다.`,
        `${frame.field}에서 바로 바꿀 수 있는 작은 행동을 고르면 결과가 더 선명해집니다.`
      ],
      advice
    };
  }

  return {
    cardMeaning,
    currentSituation,
    summary: [
      `${frame.subject}에서 성급한 판단은 피하는 편이 좋습니다.`,
      `${seed.nameKo} 역방향은 ${frame.field}에서 다시 확인해야 할 부분을 보여 줍니다.`,
      `현재는 속도를 줄이고 상황을 정리할수록 흐름이 부드러워집니다.`
    ],
    detail: [
      `${currentSituation[0]} ${seed.nameKo} 역방향은 ${signal}를 놓치지 말라는 의미입니다.`,
      `${currentSituation[1]} 지금 필요한 것은 ${action}입니다.`,
      `${frame.caution}에서 한 걸음 떨어지면 판단이 더 또렷해집니다.`
    ],
    advice
  };
}

function makeMeanings(seed: CardSeed): Record<FortuneCategory, DirectionalMeaning> {
  return {
    daily: {
      upright: makeTextSet(seed, "daily", "upright"),
      reversed: makeTextSet(seed, "daily", "reversed")
    },
    love: {
      upright: makeTextSet(seed, "love", "upright"),
      reversed: makeTextSet(seed, "love", "reversed")
    },
    money: {
      upright: makeTextSet(seed, "money", "upright"),
      reversed: makeTextSet(seed, "money", "reversed")
    },
    work: {
      upright: makeTextSet(seed, "work", "upright"),
      reversed: makeTextSet(seed, "work", "reversed")
    },
    relationship: {
      upright: makeTextSet(seed, "relationship", "upright"),
      reversed: makeTextSet(seed, "relationship", "reversed")
    },
    choice: {
      upright: makeTextSet(seed, "choice", "upright"),
      reversed: makeTextSet(seed, "choice", "reversed")
    },
    lotto: {
      upright: makeTextSet(seed, "lotto", "upright"),
      reversed: makeTextSet(seed, "lotto", "reversed")
    }
  };
}

export const tarotCards: TarotCard[] = tarotCardSeeds.map((seed) => {
  const manifestCard = tarotImageManifest.find((card) => card.id === seed.id);

  return {
    id: seed.id,
    name: seed.name,
    nameKo: seed.nameKo,
    imageKey: seed.imageKey,
    arcana: manifestCard?.arcana ?? "major",
    meanings: makeMeanings(seed)
  };
});
