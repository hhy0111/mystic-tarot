# Result Reveal Effects Plan

## 목표

결과 화면에 들어왔을 때 선택한 카드 3장을 순서대로 크게 보여 준 뒤, 각 카드가 자기 자리로 돌아가는 느낌의 연출을 제공한다.

## MVP 구현 방식

이번 구현은 새 이미지 없이 React Native Reanimated와 View 레이어만 사용한다.

* 1번째 카드부터 순서대로 확대 카드가 중앙에 등장
* 잠시 크게 보여 준 뒤 최종 카드 자리로 축소 이동
* 이동이 끝난 카드는 결과 카드 줄에 고정
* 정방향 카드는 따뜻한 금색/초록빛 계열의 긍정 효과
* 역방향 카드는 차가운 보라/남색 계열의 주의 효과

이 방식은 이미지 파일이 없어도 Expo 웹/모바일에서 깨지지 않는다.

## 효과 의미

### Positive Effect

* 대상: 정방향 카드
* 의미: 기회, 회복, 흐름 열림
* 표현: 금색 아우라, 부드러운 확장, 밝은 테두리

### Caution Effect

* 대상: 역방향 카드
* 의미: 조심, 재점검, 속도 조절
* 표현: 차가운 보라/남색 아우라, 낮은 명도, 얇은 경고성 링

## 추후 추가하면 좋은 이미지/VFX 자산

현재 MVP에는 필수가 아니지만, 앱 퀄리티를 올릴 때 아래 자산을 추가하면 좋다.

```text
assets/effects/reveal_positive_rays.png
assets/effects/reveal_positive_particles.png
assets/effects/reveal_caution_mist.png
assets/effects/reveal_caution_ring.png
assets/effects/card_settle_spark.png
```

## 이미지 프롬프트

### reveal_positive_rays.png

```text
Transparent PNG overlay, soft antique gold radial light rays, premium mystical tarot mobile game effect, gentle divine glow, subtle star particles, centered burst, no text, no letters, no logo, no hard edges, alpha background
```

### reveal_positive_particles.png

```text
Transparent PNG overlay, small golden starlight particles and tiny dust sparks, elegant magical tarot reveal effect, sparse readable particles for mobile UI, no text, no letters, no logo, alpha background
```

### reveal_caution_mist.png

```text
Transparent PNG overlay, cool violet and midnight blue magical mist, subtle smoky ring around center, caution mood without horror, premium tarot mobile game effect, no text, no letters, no logo, alpha background
```

### reveal_caution_ring.png

```text
Transparent PNG overlay, thin broken arcane ring in muted violet and pale silver, gentle warning aura, mystical but not scary, centered circular composition, no text, no letters, no numbers, alpha background
```

### card_settle_spark.png

```text
Transparent PNG overlay, small antique gold sparkle burst at card corners, elegant card landing effect, premium mobile tarot UI, subtle and clean, no text, no letters, no logo, alpha background
```
