# Mystic Tarot Card Image Prompts

이 파일은 Mystic Tarot 앱에서 사용할 타로 카드 이미지를 **카드별 완성형 PNG 한 장**으로 생성하기 위한 기준 프롬프트입니다.

기존처럼 프레임과 중앙 일러스트를 나누지 않습니다. 각 앞면 이미지는 **테두리, 카드 표면, 중앙 상징 일러스트, 빛 분위기까지 포함한 2:3 비율의 완성 카드**로 생성합니다. 카드 이름과 설명 텍스트는 앱에서 오버레이하므로 이미지 안에는 절대 넣지 않습니다.

## 생성 규칙

* 권장 크기: `1024x1536 PNG`
* 비율: 세로 `2:3`
* 파일 위치: `assets/cards/`
* 카드 앞면: `imageKey`와 같은 파일명 사용
* 카드 뒷면: `back.png`
* 선택된 카드 뒷면: `back_selected.png`
* 이미지 안에 카드명, 숫자, 문자, 로고, 워터마크 금지
* 실제 Rider-Waite 또는 기존 타로 덱을 복제하지 말고 Mystic Tarot 고유 스타일 유지
* 작은 모바일 화면에서도 중앙 상징이 읽히도록 과도한 디테일 금지

## 공통 스타일

모든 카드 프롬프트 뒤에 붙여도 되는 공통 스타일입니다.

```text
Complete original tarot card artwork, vertical 2:3 ratio, full card image including ornate antique gold border and deep midnight navy to dark violet enamel card surface, premium mystical mobile game tarot deck style, polished digital painting, cinematic soft lighting, antique gold highlights, soft violet glow, subtle starlight particles, centered composition, readable at small mobile size, elegant Korean fortune telling app atmosphere, no text, no letters, no numbers, no title banner, no logo, no watermark, not based on Rider-Waite or any existing tarot deck
```

## 공통 네거티브 프롬프트

```text
text, letters, words, numbers, title, caption, logo, watermark, signature, copied Rider-Waite style, existing tarot deck replica, cropped card, missing border, separate frame only, poster layout, comic panel, modern phone, realistic brand, low quality, blurry, muddy details, messy composition, harsh neon, horror, gore, scary face, distorted hands, extra fingers, unreadable tiny clutter
```

## 파일명 매핑

```text
assets/cards/back.png
assets/cards/back_selected.png
assets/cards/the_fool.png
assets/cards/the_magician.png
assets/cards/the_high_priestess.png
assets/cards/the_empress.png
assets/cards/the_emperor.png
assets/cards/the_hierophant.png
assets/cards/the_lovers.png
assets/cards/the_chariot.png
assets/cards/strength.png
assets/cards/the_hermit.png
```

## 카드 뒷면

### back.png

```text
Complete original tarot card back design, vertical 2:3 ratio, full card image with rounded corners, deep royal purple and midnight navy enamel texture, ornate antique gold border, central crescent moon inside a thin arcane circle, symmetrical star diamond pattern, subtle occult geometry, soft violet outer glow, premium mystical mobile game card back, clean readable design, no text, no letters, no numbers, no logo, no watermark
```

### back_selected.png

```text
Complete original selected tarot card back design, vertical 2:3 ratio, full card image with rounded corners, deep royal purple and midnight navy enamel surface, brighter antique gold border, central crescent moon glowing more strongly, star diamond pattern, soft golden aura around the card edges, subtle violet spark particles, premium magical selected state for mobile tarot game, no text, no letters, no numbers, no logo, no watermark
```

## MVP 카드 앞면 10장

### the_fool.png

```text
Complete original tarot card artwork for The Fool, vertical 2:3 ratio, full card image including ornate antique gold border and dark violet enamel card surface, a young traveler standing at the edge of a moonlit cliff, small lantern in one hand, simple travel bundle, a pale symbolic path opening into the stars, hopeful curious expression, deep indigo night sky, gold starlight, gentle adventurous mood, premium mystical mobile game tarot deck style, polished digital painting, centered composition, readable at small mobile size, no text, no letters, no numbers, no title banner, no logo, no watermark, not based on Rider-Waite or any existing tarot deck
```

### the_magician.png

```text
Complete original tarot card artwork for The Magician, vertical 2:3 ratio, full card image including ornate antique gold border and dark violet enamel card surface, a calm focused figure raising one hand toward a golden star and one hand toward a glowing ritual table, abstract symbolic tools arranged as light shapes on the table, circular arcane geometry behind the figure, confident creative energy, deep navy and violet palette, antique gold highlights, premium mystical mobile game tarot deck style, polished digital painting, centered composition, readable at small mobile size, no text, no letters, no numbers, no title banner, no logo, no watermark, not based on Rider-Waite or any existing tarot deck
```

### the_high_priestess.png

```text
Complete original tarot card artwork for The High Priestess, vertical 2:3 ratio, full card image including ornate antique gold border and dark violet enamel card surface, a serene oracle seated between two shadowed pillars, crescent moon crown, veil of stars behind her, closed book of light resting near her hands without any writing, silver moonlight mixed with antique gold glow, mysterious intuitive atmosphere, deep indigo and violet tones, premium mystical mobile game tarot deck style, polished digital painting, centered composition, readable at small mobile size, no text, no letters, no numbers, no title banner, no logo, no watermark, not based on Rider-Waite or any existing tarot deck
```

### the_empress.png

```text
Complete original tarot card artwork for The Empress, vertical 2:3 ratio, full card image including ornate antique gold border and dark violet enamel card surface, graceful nurturing figure seated in a moonlit garden, golden wheat, roses, soft violet sky, warm aura of abundance and care, crescent moon and small stars woven into the garden light, elegant flowing fabric with antique gold ornaments, premium mystical mobile game tarot deck style, polished digital painting, centered composition, readable at small mobile size, no text, no letters, no numbers, no title banner, no logo, no watermark, not based on Rider-Waite or any existing tarot deck
```

### the_emperor.png

```text
Complete original tarot card artwork for The Emperor, vertical 2:3 ratio, full card image including ornate antique gold border and dark violet enamel card surface, powerful ruler seated on a carved stone throne, dark mountain silhouettes behind him, structured golden arcane geometry, deep navy cloak, refined armor details, stable commanding presence, strong symmetrical composition, antique gold rim light, premium mystical mobile game tarot deck style, polished digital painting, centered composition, readable at small mobile size, no text, no letters, no numbers, no title banner, no logo, no watermark, not based on Rider-Waite or any existing tarot deck
```

### the_hierophant.png

```text
Complete original tarot card artwork for The Hierophant, vertical 2:3 ratio, full card image including ornate antique gold border and dark violet enamel card surface, wise spiritual teacher inside a dark violet temple, holding a glowing golden key, sacred arches and subtle star symbols around the background, calm guidance mood, layered candle-like gold light, refined mystical atmosphere, premium mobile game tarot deck style, polished digital painting, centered composition, readable at small mobile size, no text, no letters, no numbers, no title banner, no logo, no watermark, not based on Rider-Waite or any existing tarot deck
```

### the_lovers.png

```text
Complete original tarot card artwork for The Lovers, vertical 2:3 ratio, full card image including ornate antique gold border and dark violet enamel card surface, two elegant figures facing each other beneath a glowing golden star, soft violet twilight, intertwined light ribbons between them, two subtle paths merging near their feet, atmosphere of harmony, attraction, and meaningful choice, romantic but refined, premium mystical mobile game tarot deck style, polished digital painting, centered composition, readable at small mobile size, no text, no letters, no numbers, no title banner, no logo, no watermark, not based on Rider-Waite or any existing tarot deck
```

### the_chariot.png

```text
Complete original tarot card artwork for The Chariot, vertical 2:3 ratio, full card image including ornate antique gold border and dark violet enamel card surface, determined figure riding a celestial chariot through a deep violet night, golden wheels, controlled star trails, forward motion contained inside a clean symmetrical composition, strong focused energy, antique gold highlights, subtle arcane circle behind the chariot, premium mystical mobile game tarot deck style, polished digital painting, centered composition, readable at small mobile size, no text, no letters, no numbers, no title banner, no logo, no watermark, not based on Rider-Waite or any existing tarot deck
```

### strength.png

```text
Complete original tarot card artwork for Strength, vertical 2:3 ratio, full card image including ornate antique gold border and dark violet enamel card surface, calm figure gently touching a luminous symbolic guardian, soft violet moonlight, warm golden aura around both figures, expression of quiet courage, patience, and compassion, elegant floral and star details kept minimal, premium mystical mobile game tarot deck style, polished digital painting, centered composition, readable at small mobile size, no text, no letters, no numbers, no title banner, no logo, no watermark, not based on Rider-Waite or any existing tarot deck
```

### the_hermit.png

```text
Complete original tarot card artwork for The Hermit, vertical 2:3 ratio, full card image including ornate antique gold border and dark violet enamel card surface, solitary wise figure standing on a snowy dark mountain path, holding a glowing golden lantern, deep navy sky, violet mist, small stars reflected in the snow, introspective calm mood, clear silhouette, premium mystical mobile game tarot deck style, polished digital painting, centered composition, readable at small mobile size, no text, no letters, no numbers, no title banner, no logo, no watermark, not based on Rider-Waite or any existing tarot deck
```

## 78장 확장 템플릿

새 카드를 추가할 때는 아래 템플릿에서 `[CARD_NAME]`, `[CORE_SYMBOL]`, `[SCENE]`, `[MOOD]`만 바꿉니다.

```text
Complete original tarot card artwork for [CARD_NAME], vertical 2:3 ratio, full card image including ornate antique gold border and dark violet enamel card surface, [SCENE], central symbol of [CORE_SYMBOL], [MOOD], deep midnight navy and violet palette, antique gold highlights, soft starlight particles, premium mystical mobile game tarot deck style, polished digital painting, centered composition, readable at small mobile size, no text, no letters, no numbers, no title banner, no logo, no watermark, not based on Rider-Waite or any existing tarot deck
```

## 생성 후 체크리스트

* 카드가 한 장짜리 완성 이미지인가?
* 2:3 비율과 동일한 프레임 톤이 유지되는가?
* 이미지 안에 글자나 숫자가 없는가?
* 작은 크기에서도 카드의 핵심 상징이 보이는가?
* 앱에서 카드명 텍스트를 올려도 중앙 일러스트를 가리지 않는가?
* 기존 타로 덱을 복제한 느낌이 아니라 Mystic Tarot 고유 스타일인가?
