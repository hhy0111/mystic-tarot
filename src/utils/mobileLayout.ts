export const MOBILE_CONTENT_MAX_WIDTH = 430;
export const MOBILE_CONTENT_FALLBACK_WIDTH = 390;
export const CARD_SELECT_CONTENT_MAX_WIDTH = 720;
export const RESULT_CARD_GAP = 8;

type CardSize = {
  width: number;
  height: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function asContentWidth(width: number) {
  if (!Number.isFinite(width) || width <= 0) {
    return MOBILE_CONTENT_FALLBACK_WIDTH;
  }

  return Math.floor(width);
}

function createCardSize(width: number): CardSize {
  return {
    width,
    height: Math.round(width * 1.5)
  };
}

export function getMobileContentWidth(viewportWidth: number) {
  return Math.min(MOBILE_CONTENT_MAX_WIDTH, asContentWidth(viewportWidth));
}

export function getCardSelectContentWidth(viewportWidth: number) {
  return Math.min(CARD_SELECT_CONTENT_MAX_WIDTH, asContentWidth(viewportWidth));
}

export function getCardSelectCardSize(contentWidth: number): CardSize {
  return createCardSize(clamp(Math.floor((contentWidth - 88) / 4), 64, 82));
}

export function getFanCardSize(contentWidth: number): CardSize {
  return createCardSize(clamp(Math.floor(asContentWidth(contentWidth) * 0.13), 46, 62));
}

export function getFanStageHeight(contentWidth: number) {
  return clamp(Math.floor(asContentWidth(contentWidth) * 0.32), 124, 166);
}

export function getSelectedSlotSize(contentWidth: number): CardSize {
  return createCardSize(clamp(Math.floor((contentWidth - 58) / 3), 96, 118));
}

export function getResultCardSize(contentWidth: number): CardSize {
  const effectBleedWidth = 20;
  const fitWidth = Math.max(80, Math.floor((asContentWidth(contentWidth) - RESULT_CARD_GAP * 2 - effectBleedWidth) / 3));
  const preferredWidth = clamp(fitWidth, 96, 132);

  return createCardSize(Math.min(preferredWidth, fitWidth));
}

export function getFocusedResultCardSize(contentWidth: number): CardSize {
  const width = clamp(Math.floor(asContentWidth(contentWidth) * 0.64), 220, 270);

  return createCardSize(width);
}
