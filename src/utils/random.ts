export type RandomSource = () => number;

const defaultRandom: RandomSource = Math.random;

export function pickOne<T>(items: readonly T[], random: RandomSource = defaultRandom): T {
  if (items.length === 0) {
    throw new Error("Cannot pick from an empty list.");
  }

  const index = Math.min(items.length - 1, Math.floor(random() * items.length));
  return items[index];
}

export function shuffle<T>(items: readonly T[], random: RandomSource = defaultRandom): T[] {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

export function randomDirection(random: RandomSource = defaultRandom) {
  return random() < 0.5 ? "upright" : "reversed";
}

export function randomNumber(min: number, max: number, random: RandomSource = defaultRandom) {
  return Math.floor(random() * (max - min + 1)) + min;
}

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
