type TarotImageManifestCard = {
  id: string;
  imageKey: string;
  filename: string;
  name: string;
  nameKo: string;
  arcana: "major" | "minor";
  suit?: "wands" | "cups" | "swords" | "pentacles";
};

const majorCards: TarotImageManifestCard[] = [
  { id: "the_fool", imageKey: "the_fool", filename: "the_fool.png", name: "The Fool", nameKo: "바보", arcana: "major" },
  { id: "the_magician", imageKey: "the_magician", filename: "the_magician.png", name: "The Magician", nameKo: "마법사", arcana: "major" },
  { id: "the_high_priestess", imageKey: "the_high_priestess", filename: "the_high_priestess.png", name: "The High Priestess", nameKo: "여사제", arcana: "major" },
  { id: "the_empress", imageKey: "the_empress", filename: "the_empress.png", name: "The Empress", nameKo: "여황제", arcana: "major" },
  { id: "the_emperor", imageKey: "the_emperor", filename: "the_emperor.png", name: "The Emperor", nameKo: "황제", arcana: "major" },
  { id: "the_hierophant", imageKey: "the_hierophant", filename: "the_hierophant.png", name: "The Hierophant", nameKo: "교황", arcana: "major" },
  { id: "the_lovers", imageKey: "the_lovers", filename: "the_lovers.png", name: "The Lovers", nameKo: "연인", arcana: "major" },
  { id: "the_chariot", imageKey: "the_chariot", filename: "the_chariot.png", name: "The Chariot", nameKo: "전차", arcana: "major" },
  { id: "strength", imageKey: "strength", filename: "strength.png", name: "Strength", nameKo: "힘", arcana: "major" },
  { id: "the_hermit", imageKey: "the_hermit", filename: "the_hermit.png", name: "The Hermit", nameKo: "은둔자", arcana: "major" },
  { id: "wheel_of_fortune", imageKey: "wheel_of_fortune", filename: "wheel_of_fortune.png", name: "Wheel of Fortune", nameKo: "운명의 수레바퀴", arcana: "major" },
  { id: "justice", imageKey: "justice", filename: "justice.png", name: "Justice", nameKo: "정의", arcana: "major" },
  { id: "the_hanged_man", imageKey: "the_hanged_man", filename: "the_hanged_man.png", name: "The Hanged Man", nameKo: "매달린 사람", arcana: "major" },
  { id: "death", imageKey: "death", filename: "death.png", name: "Death", nameKo: "죽음", arcana: "major" },
  { id: "temperance", imageKey: "temperance", filename: "temperance.png", name: "Temperance", nameKo: "절제", arcana: "major" },
  { id: "the_devil", imageKey: "the_devil", filename: "the_devil.png", name: "The Devil", nameKo: "악마", arcana: "major" },
  { id: "the_tower", imageKey: "the_tower", filename: "the_tower.png", name: "The Tower", nameKo: "탑", arcana: "major" },
  { id: "the_star", imageKey: "the_star", filename: "the_star.png", name: "The Star", nameKo: "별", arcana: "major" },
  { id: "the_moon", imageKey: "the_moon", filename: "the_moon.png", name: "The Moon", nameKo: "달", arcana: "major" },
  { id: "the_sun", imageKey: "the_sun", filename: "the_sun.png", name: "The Sun", nameKo: "태양", arcana: "major" },
  { id: "judgement", imageKey: "judgement", filename: "judgement.png", name: "Judgement", nameKo: "심판", arcana: "major" },
  { id: "the_world", imageKey: "the_world", filename: "the_world.png", name: "The World", nameKo: "세계", arcana: "major" }
];

const minorRanks = [
  { key: "ace", name: "Ace", nameKo: "에이스" },
  { key: "two", name: "Two", nameKo: "2" },
  { key: "three", name: "Three", nameKo: "3" },
  { key: "four", name: "Four", nameKo: "4" },
  { key: "five", name: "Five", nameKo: "5" },
  { key: "six", name: "Six", nameKo: "6" },
  { key: "seven", name: "Seven", nameKo: "7" },
  { key: "eight", name: "Eight", nameKo: "8" },
  { key: "nine", name: "Nine", nameKo: "9" },
  { key: "ten", name: "Ten", nameKo: "10" },
  { key: "page", name: "Page", nameKo: "시종" },
  { key: "knight", name: "Knight", nameKo: "기사" },
  { key: "queen", name: "Queen", nameKo: "여왕" },
  { key: "king", name: "King", nameKo: "왕" }
] as const;

const minorSuits = [
  { key: "wands", name: "Wands", nameKo: "완드" },
  { key: "cups", name: "Cups", nameKo: "컵" },
  { key: "swords", name: "Swords", nameKo: "소드" },
  { key: "pentacles", name: "Pentacles", nameKo: "펜타클" }
] as const;

const minorCards: TarotImageManifestCard[] = minorSuits.flatMap((suit) =>
  minorRanks.map((rank) => {
    const imageKey = `${rank.key}_of_${suit.key}`;

    return {
      id: imageKey,
      imageKey,
      filename: `${imageKey}.png`,
      name: `${rank.name} of ${suit.name}`,
      nameKo: `${suit.nameKo} ${rank.nameKo}`,
      arcana: "minor",
      suit: suit.key
    };
  })
);

export const tarotImageManifest: TarotImageManifestCard[] = [...majorCards, ...minorCards];
