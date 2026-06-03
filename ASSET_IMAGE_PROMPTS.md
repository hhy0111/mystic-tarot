# Mystic Tarot Image And VFX Prompts

이 문서는 Mystic Tarot 앱의 실행부터 종료 전환까지 필요한 전체 이미지, 이펙트, 애니메이션 생성 프롬프트입니다. 모든 프롬프트는 앱 내부 UI와 합성하기 쉽도록 **텍스트 없는 이미지**를 기준으로 작성했습니다.

## 공통 스타일 프롬프트

```text
Original mystical tarot mobile game art, dark violet and midnight navy palette, antique gold highlights, soft starlight particles, elegant occult geometry, premium fantasy mobile UI mood, cinematic soft lighting, polished digital painting, refined Korean fortune telling app atmosphere, no text, no letters, no logo, no watermark, not based on any existing tarot deck
```

## 공통 네거티브 프롬프트

```text
text, letters, words, logo, watermark, signature, copied Rider-Waite style, existing tarot deck replica, low quality, blurry, messy composition, gore, horror, scary face, modern phone, realistic brand, distorted hands, extra fingers, harsh neon, overcrowded details
```

## 권장 파일 구조

```text
assets/
  app/
  backgrounds/
  cards/
  categories/
  effects/
  ui/
  transitions/
```

## 1. 앱 실행 / 스토어 / 스플래시

### app_icon

* 용도: 앱 아이콘
* 권장 크기: 1024x1024 PNG

```text
A premium mobile app icon for a mystical tarot app, one glowing golden tarot card floating above a dark violet crystal table, crescent moon behind the card, small gold stars around it, deep midnight navy background, antique gold rim light, simple strong silhouette, high contrast, centered composition, luxury fantasy mobile icon, no text, no letters, no logo, no watermark
```

### adaptive_icon_foreground

* 용도: Android adaptive icon foreground
* 권장 크기: 1024x1024 PNG, transparent background

```text
Transparent background, centered glowing golden tarot card symbol, crescent moon and three tiny stars, antique gold outline, dark violet inner enamel, clean readable silhouette for adaptive mobile icon, premium mystical style, no text, no letters, no logo
```

### adaptive_icon_background

* 용도: Android adaptive icon background
* 권장 크기: 1024x1024 PNG

```text
Square abstract background for a mystical tarot mobile app icon, deep midnight navy to dark violet radial gradient, subtle velvet texture, faint star dust, soft golden glow in the center, no objects, no text, no logo
```

### splash_static

* 용도: 앱 실행 스플래시 배경
* 권장 크기: 1080x1920 PNG

```text
Vertical mobile splash screen background for a mystical tarot app, deep midnight navy and dark violet gradient, a single glowing golden tarot card silhouette floating in the center, subtle crescent moon halo, faint star particles, elegant and calm premium oracle mood, generous empty space, no text, no letters, no logo
```

### splash_opening_loop

* 용도: 앱 시작 1.5초 루프/비디오 이펙트
* 권장 크기: 1080x1920, 24fps, 1.5s loop, alpha 가능

```text
Loopable vertical mobile VFX, dark violet mist slowly opening from the center, golden starlight particles drifting outward, a faint tarot card silhouette softly glowing then fading, calm magical app opening animation, seamless loop, no text, no logo, no characters
```

## 2. 전역 배경 / 분위기 레이어

### bg_global_starfield

* 용도: 앱 전역 배경 기본 레이어
* 권장 크기: 1080x1920 PNG

```text
Vertical mobile background, deep midnight navy and dark violet cosmic gradient, sparse tiny gold and lavender stars, very subtle nebula mist, premium tarot fortune app mood, clean center area for UI components, no text, no characters, no foreground objects
```

### bg_soft_violet_mist

* 용도: 화면 위에 얹는 안개 레이어
* 권장 크기: 1080x1920 PNG, transparent background

```text
Transparent background, soft violet mystical mist drifting diagonally, low opacity, subtle magical fog for mobile UI overlay, smooth edges, no hard shapes, no text, no objects
```

### bg_gold_particle_overlay

* 용도: 전역 별빛 파티클 오버레이
* 권장 크기: 1080x1920 PNG, transparent background

```text
Transparent background, sparse golden starlight particles and tiny lavender sparkles, elegant tarot magic dust, distributed mostly around screen edges, clear center space, no text, no logo
```

### bg_ambient_loop

* 용도: 전역 배경 애니메이션 루프
* 권장 크기: 1080x1920, 24fps, 3s loop

```text
Seamless vertical mobile ambient loop, dark violet and midnight navy starfield, slow moving purple mist, tiny gold particles floating upward, premium mystical tarot atmosphere, gentle and non-distracting, no text, no characters, no logo
```

## 3. LobbyScreen 이미지

### lobby_background

* 용도: 로비 화면 배경
* 권장 크기: 1080x1920 PNG

```text
Vertical mobile lobby background for Mystic Tarot, deep violet and midnight navy mystical chamber, faint golden constellation lines, subtle occult circle behind the upper center, soft candle-like edge glow, premium mobile game tarot mood, empty center and lower area for buttons, no text, no characters
```

### lobby_title_aura

* 용도: 앱 제목 뒤 오라
* 권장 크기: 1080x600 PNG, transparent background

```text
Transparent background, soft golden and violet aura glow for a title area, crescent moon halo, faint star dust, elegant mystical shimmer, wide horizontal composition, no text, no logo
```

### lobby_oracle_table

* 용도: 로비 하단 장식 배경
* 권장 크기: 1080x700 PNG, transparent background

```text
Transparent background, dark velvet oracle table edge with antique gold zodiac engraving, soft purple shadows, tiny star reflections, premium tarot app decoration, bottom aligned composition, no text, no hands, no cards
```

### category_daily_icon

* 용도: 오늘의 운세 버튼 아이콘
* 권장 크기: 512x512 PNG, transparent background

```text
Transparent background, mystical sun and crescent moon combined icon, antique gold lines, small violet stars, elegant mobile UI symbol for daily fortune, simple readable silhouette, no text
```

### category_love_icon

* 용도: 연애운 버튼 아이콘
* 권장 크기: 512x512 PNG, transparent background

```text
Transparent background, elegant heart-shaped constellation icon, antique gold line art, small violet glow, mystical tarot UI style, simple premium mobile symbol for love fortune, no text
```

### category_money_icon

* 용도: 금전운 버튼 아이콘
* 권장 크기: 512x512 PNG, transparent background

```text
Transparent background, golden coin with tiny crescent moon engraving and star sparkle, mystical fortune UI icon, antique gold and deep emerald accent, clean readable shape, no text, no currency symbol
```

### category_work_icon

* 용도: 직장운 버튼 아이콘
* 권장 크기: 512x512 PNG, transparent background

```text
Transparent background, elegant golden compass and small star icon, dark violet glow, mystical career fortune symbol, premium mobile UI line art, simple centered composition, no text
```

### category_relationship_icon

* 용도: 인간관계 버튼 아이콘
* 권장 크기: 512x512 PNG, transparent background

```text
Transparent background, three small connected golden stars forming a gentle constellation, lavender aura, mystical relationship fortune UI icon, clean premium line art, no text
```

### category_choice_icon

* 용도: 선택의 고민 버튼 아이콘
* 권장 크기: 512x512 PNG, transparent background

```text
Transparent background, two branching golden paths under a crescent moon, tiny star at each path end, dark violet glow, mystical decision fortune UI icon, simple readable symbol, no text
```

### primary_button_glow

* 용도: 활성 CTA 버튼 배경/글로우
* 권장 크기: 900x180 PNG, transparent background

```text
Transparent background, horizontal rounded button glow, antique gold center light with violet outer aura, subtle star sparkles at the edges, premium mobile game CTA effect, no text, no letters
```

### button_press_shimmer_loop

* 용도: 버튼 터치 shimmer
* 권장 크기: 900x180, 24fps, 1s loop, alpha

```text
Loopable transparent VFX, a thin golden shimmer sweep moving left to right across a rounded mobile button area, tiny star sparkles, elegant mystical tarot UI feedback, no text, no background
```

## 4. 화면 전환 이미지 / 애니메이션

### transition_lobby_to_cardselect

* 용도: 로비에서 카드 선택 화면 이동 전환
* 권장 크기: 1080x1920, 24fps, 1s

```text
Vertical mobile transition VFX, golden tarot portal opens from the center, violet mist pulls inward, star particles swirl clockwise, then reveals dark velvet card table, elegant mystical mobile game transition, no text, no characters, no logo
```

### transition_cardselect_to_result

* 용도: 카드 선택 완료 후 결과 화면 이동
* 권장 크기: 1080x1920, 24fps, 1.2s

```text
Vertical mobile transition VFX, three glowing tarot cards rise from a dark violet table, golden trails connect into an arcane circle, screen fills with soft gold flash and purple mist, premium tarot reveal transition, no text, no characters
```

### transition_back_to_lobby

* 용도: 다른 운세 보기 전환
* 권장 크기: 1080x1920, 24fps, 1s

```text
Vertical mobile transition VFX, crescent moon gate closes gently, gold particles drift downward, violet mist fades back into a calm starfield lobby background, elegant non-distracting transition, no text, no logo
```

## 5. CardSelectScreen 이미지

### card_select_background

* 용도: 카드 선택 화면 배경
* 권장 크기: 1080x1920 PNG

```text
Vertical mobile game background, top-down dark velvet tarot table, deep purple cloth, faint antique gold zodiac ring, tiny star particles, subtle candle-like glow from edges, clean center area for twelve cards, premium mystical fortune app mood, no text, no hands
```

### deck_area_shadow

* 용도: 12장 카드 뒤 바닥 그림자
* 권장 크기: 1080x900 PNG, transparent background

```text
Transparent background, soft oval shadows and violet ambient glow for a grid of tarot cards, subtle golden dust, top-down mobile UI composition, no cards, no text
```

### tarot_card_back

* 용도: 카드 뒷면
* 권장 크기: 768x1152 PNG

```text
Back design of an original tarot card, vertical 2:3 ratio, deep royal purple and midnight navy enamel texture, ornate antique gold border, central crescent moon, star diamond pattern, subtle glowing occult geometry, symmetrical premium mobile game card design, no text, no letters, no logo
```

### tarot_card_back_selected

* 용도: 선택된 카드 뒷면 변형
* 권장 크기: 768x1152 PNG

```text
Back design of an original selected tarot card, vertical 2:3 ratio, deep royal purple surface, brighter antique gold border, glowing crescent moon at center, star diamond pattern, stronger magical aura around edges, premium mobile game card design, no text, no letters
```

### card_hover_aura

* 용도: 카드 터치 전 hover/press glow
* 권장 크기: 512x768 PNG, transparent background

```text
Transparent background, vertical rounded rectangle golden aura matching tarot card shape, soft violet outer glow, small star sparks near the corners, premium magical selection effect, no card body, no text
```

### card_selection_trail

* 용도: 카드가 슬롯으로 이동할 때 잔상
* 권장 크기: 1024x1024 PNG, transparent background

```text
Transparent background, curved golden light trail with violet spark dust, elegant arc path for a tarot card moving animation, soft motion blur, premium magical UI effect, no card, no text
```

### card_move_trail_loop

* 용도: 카드 이동 애니메이션 VFX
* 권장 크기: 1024x1024, 24fps, 0.8s, alpha

```text
Transparent VFX animation, a golden light trail arcs smoothly upward with violet spark particles, designed to follow a moving tarot card, soft motion blur, elegant magical mobile game feedback, no background, no text
```

### selection_slot_empty

* 용도: 하단 선택 슬롯 빈 상태
* 권장 크기: 512x720 PNG, transparent background

```text
Transparent background, empty vertical tarot card slot frame, dashed antique gold outline, soft violet inner glow, subtle star dust, premium mystical mobile UI placeholder, no text, no card illustration
```

### selection_slot_filled_glow

* 용도: 슬롯에 카드가 들어왔을 때 glow
* 권장 크기: 512x720 PNG, transparent background

```text
Transparent background, vertical tarot card slot filled state glow, bright antique gold outline, soft purple aura, tiny starburst at top and bottom, premium magical confirmation effect, no text
```

### selection_complete_burst

* 용도: 3장 선택 완료 효과
* 권장 크기: 1024x1024 PNG, transparent background

```text
Transparent background, elegant circular golden burst, three small star points connected by faint violet lines, magical tarot completion effect, soft radial glow, no text, no background
```

### selection_complete_burst_animation

* 용도: 3장 선택 완료 애니메이션
* 권장 크기: 1024x1024, 24fps, 1s, alpha

```text
Transparent VFX animation, three golden star points appear one by one then connect into a glowing triangle, soft violet ring expands outward, tiny starlight particles fade, premium tarot card selection complete effect, no text
```

## 6. 카드 앞면 / 카드별 이미지

카드 이미지는 이제 프레임과 일러스트를 분리하지 않고, **카드별 완성형 2:3 PNG 한 장**으로 생성합니다.

전용 카드 프롬프트 파일:

```text
CARD_IMAGE_PROMPTS.md
```

이 파일에는 아래 항목이 포함되어 있습니다.

* `back.png`
* `back_selected.png`
* MVP 카드 앞면 10장
* 78장 확장용 템플릿
* 공통 네거티브 프롬프트
* 생성 후 체크리스트

## 7. ResultScreen 이미지

### result_background

* 용도: 결과 화면 배경
* 권장 크기: 1080x1920 PNG

```text
Vertical mystical fortune reading background, dark indigo oracle chamber, glowing antique gold arcane circle behind the center area, subtle purple mist, floating tiny stars, premium tarot result screen mood, calm trustworthy atmosphere, empty areas for result cards and text UI, no text, no characters
```

### result_card_stage

* 용도: 결과 카드 3장 뒤 무대/받침
* 권장 크기: 1080x520 PNG, transparent background

```text
Transparent background, elegant horizontal stage glow for three tarot cards, antique gold arcane circle segments, soft violet shadow underneath, subtle star particles, premium result reveal UI decoration, no cards, no text
```

### result_free_panel_bg

* 용도: 무료 결과 패널 배경
* 권장 크기: 960x520 PNG, transparent background

```text
Transparent background, premium mystical result panel, dark violet glass texture, thin antique gold border, soft inner shadow, tiny star corner ornaments, mobile fortune app UI card, no text, no icons
```

### score_medallion

* 용도: 운세 점수 원형 장식
* 권장 크기: 512x512 PNG, transparent background

```text
Transparent background, ornate circular antique gold medallion frame, dark violet enamel center, subtle star and crescent ornaments, premium tarot score badge, clean center space for number overlay, no text, no number
```

### advice_ribbon

* 용도: 한 줄 조언 배경
* 권장 크기: 960x240 PNG, transparent background

```text
Transparent background, elegant horizontal mystical ribbon panel, dark violet satin texture, antique gold trim, soft lavender glow, tiny star particles, clean center space for Korean advice text overlay, no text
```

### detail_section_bg

* 용도: 상세 해석 섹션 배경
* 권장 크기: 960x420 PNG, transparent background

```text
Transparent background, dark violet oracle parchment panel, thin antique gold border, subtle paper and glass texture hybrid, small crescent moon corner ornaments, premium mobile tarot detail section, no text
```

### lucky_color_orb

* 용도: 행운의 색상 장식
* 권장 크기: 512x512 PNG, transparent background

```text
Transparent background, luminous crystal orb with shifting violet, gold, and indigo color reflections, mystical tarot fortune accessory, soft aura, centered, no text
```

### lucky_number_orb

* 용도: 행운의 숫자 장식
* 권장 크기: 512x512 PNG, transparent background

```text
Transparent background, dark violet crystal orb inside antique gold ring, small star sparks, clean center space for number overlay, mystical fortune UI accessory, no text, no number
```

## 8. 카드 뒤집기 / 공개 이펙트

### card_flip_flash

* 용도: 카드 flip 중간 빛
* 권장 크기: 512x768 PNG, transparent background

```text
Transparent background, vertical thin golden flash shaped like a tarot card edge, bright center line with violet spark dust, suitable for card flip reveal midpoint, elegant magical UI effect, no text
```

### card_flip_animation

* 용도: 카드 flip VFX
* 권장 크기: 768x1152, 24fps, 0.8s, alpha

```text
Transparent VFX animation for a tarot card reveal, vertical golden edge flash rotates from narrow line to full card-shaped aura, violet sparks scatter softly, antique gold glow expands and fades, premium magical card flip effect, no text, no background
```

### reveal_gold_ring

* 용도: 카드 공개 시 원형 빛
* 권장 크기: 1024x1024 PNG, transparent background

```text
Transparent background, antique gold magical ring with subtle occult geometry, soft violet outer glow, tiny star particles, centered reveal effect for tarot card, no text, no letters
```

### reveal_gold_ring_animation

* 용도: 공개 시 원형 빛 확장 애니메이션
* 권장 크기: 1024x1024, 24fps, 1s, alpha

```text
Transparent VFX animation, antique gold arcane ring draws itself clockwise then expands outward, violet mist and tiny star particles fade, elegant tarot card reveal effect, seamless clean alpha edges, no text
```

### card_revealed_glow

* 용도: 공개된 카드 주변 지속 glow
* 권장 크기: 512x768 PNG, transparent background

```text
Transparent background, vertical tarot card aura, soft antique gold glow with lavender outer halo, tiny stars near top corners, refined magical reveal state, no text, no card body
```

### result_aura_loop

* 용도: 결과 카드 공개 후 지속 분위기
* 권장 크기: 1080x700, 24fps, 3s loop, alpha

```text
Loopable transparent VFX, subtle golden particles orbit slowly around three invisible tarot card positions, faint violet mist breathing in and out, premium mystical result screen atmosphere, gentle and non-distracting, no text
```

## 9. 광고 보상 / 상세 해석 공개

### reward_locked_panel

* 용도: 상세 해석 잠금/광고 전 상태
* 권장 크기: 960x520 PNG, transparent background

```text
Transparent background, dark violet mystical locked panel, antique gold keyhole symbol glowing softly, faint veil of purple mist, premium tarot app reward section, clean space for UI text overlay, no text, no letters
```

### reward_ad_loading

* 용도: 광고 확인 중 로딩 이미지
* 권장 크기: 512x512 PNG, transparent background

```text
Transparent background, mystical hourglass made of antique gold and dark violet crystal, golden stardust flowing inside, premium tarot loading icon, centered, no text
```

### reward_ad_loading_loop

* 용도: 광고 확인 중 로딩 애니메이션
* 권장 크기: 512x512, 24fps, 2s loop, alpha

```text
Loopable transparent VFX animation, antique gold and violet crystal hourglass, stardust flowing smoothly from top to bottom, tiny particles orbit slowly, premium mystical loading effect, no text
```

### reward_success_key

* 용도: 보상 성공/상세 해석 잠금 해제
* 권장 크기: 512x512 PNG, transparent background

```text
Transparent background, glowing antique gold key unlocking a violet crystal seal, soft starburst behind it, premium mystical reward success icon, centered, no text
```

### reward_unlock_animation

* 용도: 상세 해석 공개 애니메이션
* 권장 크기: 1080x900, 24fps, 1.2s, alpha

```text
Transparent VFX animation, antique gold key turns inside an invisible lock, dark violet veil dissolves into starlight particles, golden arcane lines open downward like a curtain, premium tarot reward unlock effect, no text
```

## 10. 다시 보기 / 다른 운세 / 종료 전환

### retry_vortex_icon

* 용도: 다시 보기 버튼 아이콘
* 권장 크기: 512x512 PNG, transparent background

```text
Transparent background, circular golden arrow made of starlight around a tiny tarot card silhouette, dark violet glow, premium mystical retry icon, clean mobile UI symbol, no text
```

### other_fortune_gate_icon

* 용도: 다른 운세 보기 버튼 아이콘
* 권장 크기: 512x512 PNG, transparent background

```text
Transparent background, small crescent moon gate opening with golden starlight path, violet aura, premium mystical navigation icon for choosing another fortune, no text
```

### session_end_fade

* 용도: 앱 종료/세션 종료 전환 화면
* 권장 크기: 1080x1920 PNG

```text
Vertical mobile session ending background, dark midnight navy starfield fading into deep violet mist, a few golden particles drifting downward, calm mystical closing mood, empty center space, no text, no characters, no logo
```

### session_end_animation

* 용도: 앱 종료 시 fade out 애니메이션
* 권장 크기: 1080x1920, 24fps, 1.5s

```text
Vertical mobile closing animation, golden starlight particles slowly dim and drift downward, violet mist closes gently toward the center, background fades to deep midnight navy, calm mystical app exit transition, no text, no logo, no characters
```

## 11. UI 장식 요소

### divider_arcane_line

* 용도: 결과 섹션 구분선
* 권장 크기: 960x80 PNG, transparent background

```text
Transparent background, thin horizontal antique gold arcane divider line, tiny crescent moon in the center, small star dots at both ends, elegant mystical mobile UI ornament, no text
```

### corner_ornament

* 용도: 패널 모서리 장식
* 권장 크기: 256x256 PNG, transparent background

```text
Transparent background, antique gold corner ornament with tiny star and crescent motif, dark violet subtle glow, premium tarot mobile UI decoration, no text
```

### empty_state_oracle_crystal

* 용도: 로딩/빈 상태 공통 이미지
* 권장 크기: 512x512 PNG, transparent background

```text
Transparent background, dark violet oracle crystal floating above a small golden arcane circle, soft starlight particles, calm premium mystical UI empty state, centered, no text
```

### error_soft_moon

* 용도: 에러 상태 이미지
* 권장 크기: 512x512 PNG, transparent background

```text
Transparent background, dim crescent moon behind soft violet cloud, small muted gold stars, calm non-scary mystical error state icon, premium mobile UI style, no text
```

## 12. 애니메이션 구현용 모션 가이드

### 카드 idle float

```text
Motion direction: tarot card floats up and down by 4 to 8 pixels over 2 seconds, very slight rotation between -1 and 1 degrees, glow opacity pulses gently from 35% to 70%, easing in-out, loopable, calm and premium
```

### 카드 선택 이동

```text
Motion direction: selected card scales to 0.92, lifts slightly, follows a curved path to the bottom slot over 550 to 700ms, golden trail follows behind, slot glow activates on arrival, spring easing with soft bounce, no harsh movement
```

### 카드 flip

```text
Motion direction: card rotates on Y axis from 0 to 180 degrees over 700ms, at 90 degrees show a thin golden flash, after reveal add 400ms glow pulse and small star particles, stagger three cards by 450 to 550ms each
```

### 결과 상세 공개

```text
Motion direction: after reward success, locked violet veil dissolves upward into golden particles over 900ms, detail sections fade in from bottom with 12px upward motion, each section staggered by 80ms, glow ring fades behind the first section
```

### 앱 종료 전환

```text
Motion direction: screen dims to midnight navy over 600ms, gold particles drift downward and fade over 1200ms, violet mist softly closes toward center, no sudden flash, preserve calm mystical tone
```

## 13. 78장 확장용 카드 템플릿

```text
Original tarot card illustration of [CARD_NAME], representing [CORE_MEANING], dark violet and midnight navy palette, antique gold highlights, soft starlight particles, elegant symbolic composition, premium mystical mobile game tarot art, vertical 2:3 ratio, centered subject, no text, no letters, no logo, not based on any existing tarot deck
```

## 14. 생성 품질 체크리스트

* 모든 앱 내부 이미지는 글자 없이 생성한다.
* 버튼/패널 이미지는 중앙에 UI 텍스트를 얹을 수 있게 여백을 둔다.
* 배경 이미지는 화면 중앙과 하단 CTA 영역을 복잡하게 만들지 않는다.
* 카드 이미지는 2:3 비율을 유지한다.
* 투명 PNG 이펙트는 가장자리에 검은 배경이 남지 않게 alpha 품질을 확인한다.
* 애니메이션은 1초 내외의 반응형 효과와 2~3초 루프형 분위기 효과로 분리한다.
* 실제 타로 카드 덱을 복제한 스타일은 피하고, Mystic Tarot 고유 톤을 유지한다.
